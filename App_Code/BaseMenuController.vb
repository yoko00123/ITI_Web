Imports System.Net
Imports System.Web.Http
Imports GSWEB
Imports GSWEB.Common
Imports GSWEB.Utility
Imports System.Web.Http.Filters
Imports System.Net.Http
Imports System.IO
Imports Newtonsoft.Json.Linq
Imports System.Threading.Tasks
Imports System.Net.Http.Headers
Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Http.Controllers
Imports System.Threading
Imports z.Data

Public Class BaseMenuController
    Inherits ApiController

    Public Q As JObject
    Public Overrides Function ExecuteAsync(ByVal controllerContext As HttpControllerContext, ByVal cancellationToken As CancellationToken) As Task(Of HttpResponseMessage)
        Q = QueryString(controllerContext)
        Return MyBase.ExecuteAsync(controllerContext, cancellationToken)
    End Function

    Protected Overridable Function QueryString(ByVal cntx As HttpControllerContext) As JObject
        Dim h = New JObject()

        Try

            If cntx.Request.Content.IsMimeMultipartContent() OrElse cntx.Request.Content.Headers.ContentLength > 100000000.0 Then
                Return h
            End If

            Dim g As String = Nothing

            If cntx.Request.Method = HttpMethod.Post Then

                Using ms = New MemoryStream()
                    cntx.Request.Content.CopyToAsync(ms).Wait()
                    ms.Seek(0, SeekOrigin.Begin)

                    Using sr = New StreamReader(ms)
                        g = sr.ReadToEnd()
                    End Using
                End Using
            ElseIf cntx.Request.Method = HttpMethod.[Get] Then
                g = cntx.Request.RequestUri.Query
            End If

            If g = "" Or g = "{}" Then Return h
            Dim exc As String() = {"_", "callback"}

            If cntx.Request.Method = HttpMethod.[Get] Then
                For Each j In g.Split("&"c).[Select](Function(i) i.Split("="c))
                    j(0) = j(0).TrimStart("?"c)
                    If exc.Contains(j(0)) OrElse j.Length = 1 Then Continue For
                    h.Add(j(0), HttpUtility.UrlDecode(j(1), Encoding.UTF8))
                Next
            Else
                g = g.CompressFromUriEncoded()
                g.ToObject(Of JObject)().CopyTo(h)
            End If

            Return h
        Catch ex As OutOfMemoryException
            Throw ex
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    <HttpPost>
    <DeflateCompression>
    <CheckCSRFHeader>
    Public Overridable Async Function Save() As Task(Of HttpResponseMessage) ' ByVal obj As Newtonsoft.Json.Linq.JObject
        If IsNull(HttpContext.Current.Session("ID_User"), 0) = 0 Then Return New HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        If Not Request.Content.IsMimeMultipartContent() Then
            Me.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType)
        End If


        Dim root = HttpContext.Current.Server.MapPath("~/Upload/")
        Directory.CreateDirectory(root)
        Dim provider = New MultipartFormDataStreamProvider(root),
            result = Await Request.Content.ReadAsMultipartAsync(provider)
        Dim mID As Integer = result.FormData.Item("mID"),
            rID As Integer = 0,
            btnID As Integer = result.FormData.Item("btnID"),
            drMaster As CaseInsensitiveDictionary = JsonConvert.DeserializeObject(Of CaseInsensitiveDictionary)(result.FormData.Item("Master")),
            ds As DataSet = JsonConvert.DeserializeObject(Of DataSet)(result.FormData.Item("Detail")),
            fileSummary As List(Of fileSummary) = JsonConvert.DeserializeObject(Of List(Of fileSummary))(result.FormData.Item("fileSummary"))
        If result.FormData.Item("rID") <> "0" Then
            Try
                rID = CInt(GetDirectReference(result.FormData.Item("rID"), HttpContext.Current.Session))
            Catch ex As Exception
                logError(ex, mID)
                Return New HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
            End Try
        End If
        If Not UserHasAccessByUserGroup(mCollection.GetMenu(mID)) Then Return New HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
        If Not UserHasAccessByData(mCollection.GetMenu(mID), rID, 0) Then Return New HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
        Dim ret As String = String.Empty,
            message As String = String.Empty,
            messageType As MessageType = MessageType.Success,
            id As Integer = 0,
            r As New JObject

        Try
            Dim m As GSWEB.MenuCollection.Menu = mCollection.GetMenu(mID)

            ' BEFORE EXECUTE
            ExecuteButtonValidation(m, 1, btnID, drMaster, rID, HttpContext.Current.Session)

            id = m.Save(ConnectionString, rID, drMaster, ds, fileSummary, result)
            Dim dr As DataRow = m.dtButtons.Select("ID = " & btnID)(0)
            message = dr("Message").ToString
            messageType = MessageType.Success

            ''ISAMA BA SA TRANSACTION NG SAVE?
            ''COMMAND TEXT
            If dr("CommandText").ToString.Length > 0 Then
                Using sqlConn As New SqlConnection(ConnectionString)
                    sqlConn.Open()
                    Dim btn As DataRow = m.dtButtons.Select("ID = " & btnID)(0)
                    Using sqlCommand As New SqlCommand(btn("CommandText").ToString, sqlConn)
                        Try
                            If Not m.dtButtonParameters(btn("ID")) Is Nothing Then
                                For Each dr2 As DataRow In m.dtButtonParameters(btn("ID")).Rows
                                    Select Case dr2("Value").ToString.Substring(0, 1)
                                        Case "@"
                                            If dr2("Value").ToString = "@ID_WebMenus" Then
                                                sqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, mID.ToString)
                                            Else
                                                sqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, HttpContext.Current.Session(dr2("Value").ToString.Substring(1)).ToString)
                                            End If
                                        Case "#"
                                        Case "$"
                                        Case Else
                                            If dr2("Value").ToString = "ID" Then
                                                sqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, id)
                                            Else
                                                sqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, CTypeDynamic(HttpUtility.HtmlEncode(drMaster(dr2("Value").ToString).ToString.Replace(Chr(160), Chr(32))), GetDataType(m.dtColumns.Select("Name = '" + dr2("Value").ToString + "'")(0).Item("colDataType").ToString)))
                                            End If
                                    End Select
                                Next
                            End If
                            sqlCommand.ExecuteNonQuery()
                        Catch ex As Exception
                            messageType = MessageType.BeforeExecute
                            Throw ex
                        Finally
                            sqlCommand.Dispose()
                        End Try
                    End Using
                    sqlConn.Close()
                End Using
            End If


            ' AFTER EXECUTE
            ExecuteButtonValidation(m, 2, btnID, drMaster, id, HttpContext.Current.Session)

        Catch ee As SqlException
            messageType = MessageType.BeforeExecute
            If ee.Message.Contains("IX_") Or ee.Message.Contains("CK_") Or ee.Message.Contains("FK_") Then
                message = getSystemMessage(ee.Message)
            Else
                message = ee.Message
            End If
        Catch ex As Exception
            messageType = MessageType.BeforeExecute
            message = ex.Message
            logError(ex, mID)
        End Try

        Try
            ret = "{"
            ret &= "message : '" & addStripSlashes(message) & "',"
            ret &= "messageType : '" & messageType & "',"
            'ret &= "ID : '" & GetIndirectReference(id, HttpContext.Current.Session) & "',"
            ret &= "ID : '" & toAnyBase(id) & "',"
            ret &= "}"
            r = JObject.Parse(ret)
        Catch ex As Exception
            logError(ex, mID)
            r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "'}")
        End Try


        Return New HttpResponseMessage() With {
          .Content = New JsonContent(r)
        }
    End Function

    <HttpPost>
    <DeflateCompression>
    <CheckCSRFHeader>
    Public Overridable Function Generate() As HttpResponseMessage
        If IsNull(HttpContext.Current.Session("ID_User"), 0) = 0 Then Return New HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)

        Dim mID As Integer = Q("mID").ToObject(Of Integer)(),
            rID As Integer = 0,
            btnID As Integer = Q("btnID").ToObject(Of Integer)(),
            drMaster As CaseInsensitiveDictionary = JsonConvert.DeserializeObject(Of CaseInsensitiveDictionary)(Q("Master"))
        If Q("rID").ToObject(Of String)() <> "0" Then
            Try
                rID = CInt(GetDirectReference(Q("rID").ToObject(Of String)(), HttpContext.Current.Session))
            Catch ex As Exception
                logError(ex, mID)
                Return New HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
            End Try
        End If
        Dim ret As String = String.Empty,
            message As String = String.Empty,
            messageType As MessageType = MessageType.Success,
            targetmID As Integer = 0,
            Data As String = String.Empty,
            r As New JObject

        If Not UserHasAccessByUserGroup(mCollection.GetMenu(mID)) Then Return New HttpResponseMessage(System.Net.HttpStatusCode.NotFound)
        If Not UserHasAccessByData(mCollection.GetMenu(mID), rID, 0) Then Return New HttpResponseMessage(System.Net.HttpStatusCode.NotFound)

        Try
            Dim m As GSWEB.MenuCollection.Menu = mCollection.GetMenu(mID)

            ' BEFORE EXECUTE
            ExecuteButtonValidation(m, 1, btnID, drMaster, rID, HttpContext.Current.Session)
            'If Not m.dtButtonValidations(btnID) Is Nothing Then
            '    For Each tdr As DataRow In m.dtButtonValidations(btnID).Select("ID_WebMenuButton_Validation_Type = 1 AND ID_ValidationON = 1")
            '        If btnValidation(tdr("CommandText").ToString, drMaster, mID, rID, , HttpContext.Current.Session) Then
            '            messageType = messageType.BeforeExecute
            '            Throw New Exception("<p>" & IsNull(tdr("ValidationMessage"), "Saving has been terminated") & "</p>")
            '        End If

            '    Next
            'End If

            Using sqlConn As New SqlConnection(ConnectionString)
                sqlConn.Open()
                Dim dr3 As DataRow = m.dtButtons.Select("ID = " & btnID)(0)
                Dim cText As String = dr3("CommandText").ToString
                Using SqlCommand As New SqlCommand(dr3("CommandText").ToString, sqlConn)
                    If Not m.dtButtonParameters(dr3("ID").ToString) Is Nothing Then
                        For Each dr2 As DataRow In m.dtButtonParameters(dr3("ID").ToString).Rows
                            Select Case dr2("Value").ToString.Substring(0, 1)
                                Case "@"
                                    If dr2("Value").ToString = "@ID_WebMenus" Then
                                        SqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, mID.ToString)
                                    Else
                                        SqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, HttpContext.Current.Session(dr2("Value").ToString.Substring(1)).ToString)
                                    End If
                                Case "#"
                                Case "$"
                                Case Else
                                    If dr2("Value").ToString = "ID" Then
                                        SqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, rID)
                                    Else
                                        SqlCommand.Parameters.AddWithValue("@" + dr2("Name").ToString, CTypeDynamic(drMaster(dr2("Value").ToString), GetDataType(m.dtColumns.Select("Name = '" + dr2("Value").ToString + "'")(0).Item("colDataType").ToString)))
                                    End If
                            End Select
                        Next
                    End If
                    Data = serialize(SqlCommand.ExecuteReader)
                End Using
                sqlConn.Close()
                message = dr3("Message").ToString
                targetmID = CInt(dr3("ID_TargetWebMenus").ToString)
            End Using


            ' AFTER EXECUTE
            ExecuteButtonValidation(m, 2, btnID, drMaster, rID, HttpContext.Current.Session)
            'If Not m.dtButtonValidations(btnID) Is Nothing Then
            '    For Each tdr As DataRow In m.dtButtonValidations(btnID).Select("ID_WebMenuButton_Validation_Type = 2 AND ID_ValidationON = 1")
            '        If btnValidation(tdr("CommandText").ToString, drMaster, mID, rID, , HttpContext.Current.Session) Then
            '            messageType = messageType.BeforeExecute
            '            Throw New Exception("<p>" & IsNull(tdr("ValidationMessage"), "Saving has been terminated") & "</p>")
            '        End If

            '    Next
            'End If
        Catch ee As SqlException
            messageType = MessageType.BeforeExecute
            message = ee.Message
        Catch ex As Exception
            messageType = MessageType.BeforeExecute
            message = ex.Message
            logError(ex, mID)
        Finally

        End Try
        Try
            ret = "{"
            ret &= "message : '" & addStripSlashes(message) & "',"
            ret &= "messageType : " & messageType & ","
            ret &= "targetmID : " & targetmID & ","
            ret &= "data : " & Data & ""
            ret &= "}"
            r = JObject.Parse(ret)
        Catch ex As Exception
            r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "' }")
            logError(ex, mID)
        End Try

        Return New HttpResponseMessage() With {
          .Content = New JsonContent(r)
        }
    End Function

    Public Function UserHasAccessByUserGroup(m As GSWEB.MenuCollection.Menu) As Boolean
        If m.ColumnValue("ID_WebMenuTypes") = 1 AndAlso Not m.HasAccess(HttpContext.Current.Session("ID_UserGroup")) Then
            Return False
        End If
        Return True
    End Function

    Public Function UserHasAccessByData(m As GSWEB.MenuCollection.Menu, rID As Integer, pID As Integer) As Boolean
        ''DATA
        If rID = 0 AndAlso CBool(m.ColumnValue("HasNew")) Then Return True
        If m.ColumnValue("ID_WebMenuTypes") = 3 OrElse m.ColumnValue("ID_WebMenuTypes") = 5 OrElse m.ColumnValue("ID_WebMenuTypes") = 17 Then
            Using ttCon As New SqlClient.SqlConnection(ConnectionString)
                Dim dataSource As String = "SELECT  CASE WHEN EXISTS(SELECT ID FROM (SELECT ID FROM " &
                                           SetDataSourceFilter(m, pID, rID, HttpContext.Current.Session) & ") xxx WHERE xxx.ID = " & rID &
                                           ") THEN 1 ELSE 0 END",
                    ret As Boolean = True
                ttCon.Open()
                Using ttCmd As New SqlCommand(dataSource, ttCon)
                    ret = ttCmd.ExecuteScalar
                End Using
                ttCon.Close()
                Return ret
            End Using
        End If
        Return True
    End Function

    Public Enum MessageType
        Success = 1
        BeforeExecute = 2
        AfterExecute = 3
    End Enum

#Region "CLASS HELPERS"

    Public Class JsonContent
        Inherits HttpContent
        Private ReadOnly _value As JToken

        Public Sub New(value As JToken)
            _value = value
            Headers.ContentType = New MediaTypeHeaderValue("application/json")
        End Sub

        Protected Overrides Function SerializeToStreamAsync(stream As Stream, context As TransportContext) As Task
            Dim jw = New JsonTextWriter(New StreamWriter(stream)) With { _
                .Formatting = Formatting.None _
            }
            _value.WriteTo(jw)
            jw.Flush()
            Return Task.FromResult(Of Object)(Nothing)
        End Function

        Protected Overrides Function TryComputeLength(ByRef length As Long) As Boolean
            length = -1
            Return False
        End Function

    End Class

    Public Class CompressionHelper
        Public Shared Function DeflateByte(str As Byte()) As Byte()
            If str Is Nothing Then
                Return Nothing
            End If
            Using output = New MemoryStream()
                Using compressor = New Ionic.Zlib.DeflateStream(output, Ionic.Zlib.CompressionMode.Compress, Ionic.Zlib.CompressionLevel.BestSpeed)
                    compressor.Write(str, 0, str.Length)
                End Using
                Return output.ToArray()
            End Using
        End Function
    End Class

#End Region

#Region "CUSTOM ATTRIBUTES"

    Public Class DeflateCompressionAttribute
        Inherits ActionFilterAttribute
        Public Overrides Sub OnActionExecuted(actContext As HttpActionExecutedContext)
            Dim content = actContext.Response.Content
            Dim bytes = If(content Is Nothing, Nothing, content.ReadAsByteArrayAsync().Result)
            Dim zlibbedContent = If(bytes Is Nothing, New Byte(-1) {}, CompressionHelper.DeflateByte(bytes))
            actContext.Response.Content = New ByteArrayContent(zlibbedContent)
            actContext.Response.Content.Headers.Remove("Content-Type")
            actContext.Response.Content.Headers.Add("Content-encoding", "deflate")
            actContext.Response.Content.Headers.Add("Content-Type", "application/json")
            GC.Collect()
            GC.SuppressFinalize(Me)
            MyBase.OnActionExecuted(actContext)
        End Sub
    End Class

    Public Class CheckCSRFHeaderAttribute
        Inherits AuthorizeAttribute

        Protected Overrides Function IsAuthorized(context As Controllers.HttpActionContext) As Boolean
            Dim ID_User As String = HttpContext.Current.Session("ID_User")
            If String.IsNullOrEmpty(ID_User) Then Return False
            Dim authToken As String = CStr(HttpContext.Current.Session("ID_User")) + "_" + CStr(HttpContext.Current.Session("CSRF-TOKEN"))
            Dim csrfToken As String = context.Request.Headers.GetValues("X-CSRF-Token").FirstOrDefault()
            If (String.IsNullOrEmpty(csrfToken)) Then Return False
            Return New CsrfTokenHelper().DoesCsrfTokenMatchAuthToken(csrfToken, authToken)
        End Function

    End Class
#End Region

End Class
