Imports System.Net
Imports System.Web.Http
Imports System.Data.SqlClient
Imports System.Data
Imports GSWEB.Common
Imports System.Net.Http
Imports Newtonsoft.Json.Linq
Imports Newtonsoft.Json
Imports System.Activities.Statements
Imports BaseMenuController
Imports System.Web.Http.Cors
Imports System.Web.Http.Filters
Imports GSWEB.Utility
Imports System.Collections.Generic
Imports System.Collections
Imports z.Data
Imports GSWEB
Imports System.Web.Http.Controllers
Imports System.Threading
Imports System.IO
Imports System.Threading.Tasks

Public Class LoginController
    Inherits ApiController

    ' GET api/<controller>
    Public Function GetValues() As IEnumerable(Of String)
        Return New String() {"value1", "value2"}
    End Function

    ' GET api/<controller>/5
    Public Function GetValue(ByVal id As Integer) As String
        Return "value"
    End Function

    ' POST api/<controller>
    Public Sub PostValue(<FromBody()> ByVal value As String)

    End Sub

    ' PUT api/<controller>/5
    Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As String)

    End Sub

    ' DELETE api/<controller>/5
    Public Sub DeleteValue(ByVal id As Integer)

    End Sub
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
    Public Function Login() As HttpResponseMessage
        Dim username As String = Q("Username").ToObject(Of String)()
        Dim password As String = Q("Password").ToObject(Of String)()

        Dim isAuthenticated As Boolean = False,
                isFirstLog As Boolean = False,
                ret As String = String.Empty,
                r As New Newtonsoft.Json.Linq.JObject,
                ID_User As Integer = 0,
                isUserBlock As Boolean = False,
                isPasswordExpired As Boolean = False,
                isApplicant As Boolean = False,
                ApplicantUserGroup As Integer = 0,
                IsSecretQuestionReady As Integer = 0,
                WebParams As DataTable = getTable("SELECT cast(ParamValue as int) ParamValue from dbo.tWebParameters where Paramname IN ('ApplicantUserGroup', 'EnableCompanySelector')"),
                ID_ApplicantUserGroup As Integer = WebParams.Rows(0)("ParamValue"),
                EnableCompanySelector As Integer = WebParams.Rows(1)("ParamValue"),
                blockedTime As String = "",
                currentServerTime As String = ""
        'If getTable("SELECT ID FROM dbo.tUser where BINARY_CHECKSUM(LoginName) = BINARY_CHECKSUM('" & username & "') and BINARY_CHECKSUM(ISNULL(Password, '')) = BINARY_CHECKSUM('" & Common.Encrypt(password, 41) & "_BJTGLR" & "')").Rows.Count > 0 Then
        '    ApplicantUserGroup = getTable("SELECT ID_UserGroup FROM dbo.tUser where BINARY_CHECKSUM(LoginName) = BINARY_CHECKSUM('" & username & "') and BINARY_CHECKSUM(ISNULL(Password, '')) = BINARY_CHECKSUM('" & Common.Encrypt(password, 41) & "_BJTGLR" & "')").Rows(0)("ID_UserGroup")
        'End If
        Using sqlConn As New SqlConnection(ConnectionString)
            sqlConn.Open()
            Try
                If username.ToLower = "system" Then
                    Using SqlCommand As New SqlCommand("SELECT CASE WHEN EXISTS(SELECT ID FROM dbo.tUser WHERE  LoginName = @Username AND BINARY_CHECKSUM(ISNULL(Password,'')) = BINARY_CHECKSUM(@Password)) THEN 1 ELSE 0 END", sqlConn)
                        SqlCommand.Parameters.AddWithValue("Username", username)
                        SqlCommand.Parameters.AddWithValue("Password", IIf(password <> "", Common.Encrypt(password, 41) & "_BJTGLR", ""))
                        isAuthenticated = SqlCommand.ExecuteScalar()
                    End Using
                ElseIf ApplicantUserGroup = ID_ApplicantUserGroup Then
                    Using SqlCommand As New SqlCommand("SELECT CASE WHEN EXISTS(SELECT ID FROM dbo.tUser WHERE LoginName = @Username AND BINARY_CHECKSUM(ISNULL(Password,'')) = BINARY_CHECKSUM(@Password)) THEN 1 ELSE 0 END", sqlConn)
                        SqlCommand.Parameters.AddWithValue("Username", username)
                        SqlCommand.Parameters.AddWithValue("Password", IIf(password <> "", Common.Encrypt(password, 41) & "_BJTGLR", ""))
                        isAuthenticated = SqlCommand.ExecuteScalar()
                        isApplicant = True
                    End Using
                Else
                    'Using SqlCommand As New SqlCommand("SELECT CASE WHEN EXISTS(SELECT ID FROM dbo.tUser WHERE BINARY_CHECKSUM(LoginName) = BINARY_CHECKSUM(@Username) AND BINARY_CHECKSUM(ISNULL(Password,'')) = BINARY_CHECKSUM(@Password) AND ID_UserType = 2 AND ID_Employee IS NOT NULL ) THEN 1 ELSE 0 END", sqlConn)
                    Using SqlCommand As New SqlCommand("SELECT CASE WHEN EXISTS(SELECT ID FROM dbo.tUser WHERE LoginName = @Username AND BINARY_CHECKSUM(ISNULL(Password,'')) = BINARY_CHECKSUM(@Password) AND ID_UserType = 2 AND ID_Employee IS NOT NULL ) THEN 1 ELSE 0 END", sqlConn)
                        SqlCommand.Parameters.AddWithValue("Username", username)
                        SqlCommand.Parameters.AddWithValue("Password", IIf(password <> "", Common.Encrypt(password, 41) & "_BJTGLR", ""))
                        isAuthenticated = SqlCommand.ExecuteScalar()
                    End Using
                End If

                'validate if blocked
                Using sqlCmd As New SqlCommand("SELECT IsBlocked, (case when getdate() <= BlockedDate then 1 else 0 end) IsBlocked2, BlockedDate, GETDATE() currentServerTime FROM dbo.tUser u WHERE u.LogInName = @username", sqlConn)
                    sqlCmd.Parameters.AddWithValue("Username", username)
                    'isUserBlock = sqlCmd.ExecuteScalar()
                    Dim dt As New DataTable
                    Using sqlDa As New SqlDataAdapter(sqlCmd)
                        sqlDa.Fill(dt)
                    End Using
                    If dt.Rows(0)("IsBlocked2") Then
                        isUserBlock = True
                        blockedTime = dt.Rows(0)("BlockedDate")
                        currentServerTime = dt.Rows(0)("currentServerTime")
                    Else
                        isUserBlock = False
                    End If

                End Using
                If isAuthenticated Then
                    If Not isUserBlock Then
                        'validate if the password is expired, then if true update the user table
                        Using SqlCmd As New SqlCommand("EXEC pIsPasswordExpired @Username", sqlConn)
                            SqlCmd.Parameters.AddWithValue("Username", username)
                            isPasswordExpired = SqlCmd.ExecuteScalar()
                            HttpContext.Current.Session.Add("isPasswordExpired", isPasswordExpired)
                        End Using
                        Using sqlC As New SqlCommand("SELECT ID,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage,isFirstLog,ApplicantUserGroup,Skins,ISNULL((select ParamValue from dbo.tWebParameters where ParamName = 'TimeOutExpire'), 1800) TimeOutExpire, case when ISNULL(ID_SecretQuestion, 0) = 0 then 0 else 1 end IsSecretQuestionReady,isEffectsEnable,isFirstLogOTD FROM vUser WHERE LoginName = @Username AND BINARY_CHECKSUM(ISNULL(Password,'')) = BINARY_CHECKSUM(@Password) AND IsActive = 1 and ((ID_UserGroup <> 1 and ID_UserType = 2) OR ID_UserGroup = 1) ", sqlConn) 'AND ID_UserType = 2 
                            sqlC.Parameters.AddWithValue("Username", username)
                            sqlC.Parameters.AddWithValue("Password", IIf(password <> "", Common.Encrypt(password, 41) & "_BJTGLR", ""))
                            Using sqlDa As New SqlDataAdapter(sqlC)
                                Dim dt As New DataTable
                                sqlDa.Fill(dt)

                                ID_User = CInt(dt.Rows(0).Item("ID"))
                                IsSecretQuestionReady = CInt(dt.Rows(0).Item("IsSecretQuestionReady"))
                                isFirstLog = Convert.ToBoolean(dt.Rows(0).Item("isFirstLog"))

                                HttpContext.Current.Session.Add("isFirstLog", isFirstLog)
                                HttpContext.Current.Session.Add("ID_User", ID_User)
                                HttpContext.Current.Session.Add("ID_Employee", IsNull(dt.Rows(0).Item("ID_Employee"), 0))
                                HttpContext.Current.Session.Add("ID_Persona", IsNull(dt.Rows(0).Item("ID_Persona"), 0))
                                HttpContext.Current.Session.Add("ID_UserGroup", dt.Rows(0).Item("ID_UserGroup"))
                                HttpContext.Current.Session.Add("ApplicantUserGroup", IsNull(dt.Rows(0).Item("ApplicantUserGroup"), 0))

                                HttpContext.Current.Session.Add("ID_Company", IsNull(dt.Rows(0).Item("ID_Company"), 0))
                                HttpContext.Current.Session.Add("ID_Branch", IsNull(dt.Rows(0).Item("ID_Branch"), 0))
                                HttpContext.Current.Session.Add("ID_Department", IsNull(dt.Rows(0).Item("ID_Department"), 0))
                                HttpContext.Current.Session.Add("ProfileImage", dt.Rows(0).Item("ProfileImage"))
                                HttpContext.Current.Session.Add("Skins", dt.Rows(0).Item("Skins").ToString.Replace(" ", "-"))
                                HttpContext.Current.Session.Add("TimeOutExpire", IsNull(dt.Rows(0).Item("TimeOutExpire"), 1500))
                                HttpContext.Current.Session.Add("IsSecretQuestionReady", dt.Rows(0).Item("IsSecretQuestionReady"))
                                HttpContext.Current.Session.Add("isEffectsEnable", dt.Rows(0).Item("isEffectsEnable"))
                                HttpContext.Current.Session.Add("EffectsMode", dt.Rows(0).Item("isFirstLogOTD"))
                                ''DO NOT REMOVE FOR CSRF TOKEN
                                HttpContext.Current.Session.Add("CSRF-TOKEN", generateRand(10))
                                If Not IsNothing(HttpContext.Current.Session("InvalidLogTry")) Then
                                    HttpContext.Current.Session("InvalidLogTry") = 0
                                End If

                                If Not CBool(EnableCompanySelector) Then
                                    HttpContext.Current.Session.Add("ID_SelectedCompany", IsNull(dt.Rows(0).Item("ID_Company"), 0))
                                End If
                                HttpContext.Current.Session.Add("EnableCompanySelector", IsNull(EnableCompanySelector, 0))
                                ''DO NOT REMOVE 
                                ' HttpContext.Current.Session.Add("Salt", GSWEB.StaticReferenceMap.GetRandomSaltValue(CInt(dt.Rows(0).Item("ID"))))
                            End Using
                        End Using
                        Using sqlcmd As New SqlCommand("UPDATE dbo.tUser SET DateLastLog = GETDATE() WHERE ID =" & ID_User.ToString(), sqlConn)
                            sqlcmd.ExecuteNonQuery()
                        End Using
                        Using sqlcmd As New SqlCommand("EXEC dbo.pCheckIsPres " & IsNull(HttpContext.Current.Session.Item("ID_Employee"), 0), sqlConn)
                            Dim isPres As Integer = IsNull(sqlcmd.ExecuteScalar(), 0)
                            HttpContext.Current.Session.Add("IsPres", isPres)

                        End Using

                    End If

                Else
                    If Not IsNothing(HttpContext.Current.Session("InvalidLogTry")) Then
                        Dim webParamInvalidLogCount As String() = getTable("select ParamValue from dbo.tWebParameters where ParamName = 'UserLoginBlocking'").Rows(0)("ParamValue").ToString.Split(",")
                        If Not isUserBlock Then
                            HttpContext.Current.Session("InvalidLogTry") += 1
                            If HttpContext.Current.Session("InvalidLogTry") = CInt(webParamInvalidLogCount(0)) Then
                                Using cmd As New SqlCommand("update tuser set BlockedDate = dateadd(Minute,@minute,getdate()) where LoginName = @username", sqlConn)
                                    cmd.Parameters.AddWithValue("minute", CInt(webParamInvalidLogCount(1)))
                                    cmd.Parameters.AddWithValue("username", username)
                                    cmd.ExecuteNonQuery()
                                End Using
                                HttpContext.Current.Session("InvalidLogTry") = 0
                            End If
                        End If
                    Else
                        HttpContext.Current.Session.Add("InvalidLogTry", 1)
                    End If
                End If
            Catch ex As Exception
                isAuthenticated = False
            Finally
                sqlConn.Close()
                sqlConn.Dispose()
            End Try



            Try
                ret = "{"
                ret &= "isAuthenticated : '" & addStripSlashes(isAuthenticated) & "',"
                ret &= "isFirstLog : '" & addStripSlashes(isFirstLog) & "',"
                ret &= "ID_Persona : '" & IsNull(HttpContext.Current.Session.Item("ID_Persona"), 0) & "',"
                If isApplicant Then
                    'ret &= "indirectID_Persona : '" & Common.GetIndirectReference(IsNull(HttpContext.Current.Session.Item("ID_Persona"), 0), HttpContext.Current.Session) & "',"
                    ret &= "indirectID_Persona : '" & Common.toAnyBase(IsNull(HttpContext.Current.Session.Item("ID_Persona"), 0)) & "',"
                End If
                ret &= "ID_UserGroup : '" & IsNull(HttpContext.Current.Session.Item("ID_UserGroup"), 0) & "',"
                ret &= "ApplicantUserGroup : '" & IsNull(HttpContext.Current.Session.Item("ApplicantUserGroup"), 0) & "',"
                ret &= "ID_User : '" & toAnyBase(ID_User) & "',"
                ret &= "isUserBlock : '" & addStripSlashes(isUserBlock) & "',"
                ret &= "isPasswordExpired : '" & addStripSlashes(isPasswordExpired) & "',"
                ret &= "IsSecretQuestionReady : " & IsSecretQuestionReady & ","
                ret &= "EnableCompanySelector : " & IsNull(EnableCompanySelector, 0) & ","
                ret &= "BlockedTime : '" & addStripSlashes(blockedTime) & "',"
                ret &= "CurrentTime : '" & addStripSlashes(currentServerTime) & "'"
                ret &= "}"

                r = JObject.Parse(ret)
            Catch ex As Exception
                r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "' }")
            End Try

        End Using
        Return New HttpResponseMessage() With {.Content = New DataServiceController.JsonContent(r)}

    End Function

    <HttpPost>
    Public Function ForgotPassword() As HttpResponseMessage
        Dim username As String = Q("Username").ToObject(Of String)(),
            ID_SecretQuestion As String = Q("ID_SecurityQuestion").ToObject(Of Integer)(),
            SecretAnswer As String = Q("SecurityAnswer").ToObject(Of String)()
        Dim ret As String = String.Empty,
            r As New Newtonsoft.Json.Linq.JObject,
            ok As Boolean = True,
            err As String = String.Empty

        Try
            Using sqlConn As New SqlConnection(ConnectionString)
                sqlConn.Open()
                Try
                    Using sqlcmd As New SqlCommand("EXEC dbo.pForgotPassword @Username, @ID_SecretQuestion, @SecretAnswer", sqlConn)
                        sqlcmd.Parameters.AddWithValue("Username", username)
                        sqlcmd.Parameters.AddWithValue("ID_SecretQuestion", ID_SecretQuestion)
                        sqlcmd.Parameters.AddWithValue("SecretAnswer", SecretAnswer)
                        sqlcmd.ExecuteNonQuery()
                    End Using

                Catch ex As Exception
                    ok = False
                    err = ex.Message
                Finally
                    sqlConn.Close()
                    sqlConn.Dispose()
                End Try
            End Using
            ret = "{"
            ret &= "success : " & If(ok, "true", "false") & ","
            ret &= "error : '" & addStripSlashes(err) & "',"
            ret &= "}"

            r = JObject.Parse(ret)
        Catch ex As Exception
            r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "' }")
        End Try
        Return New HttpResponseMessage() With {.Content = New DataServiceController.JsonContent(r)}

    End Function

    <HttpPost>
    Public Function Register() As HttpResponseMessage
        Dim username As String = Q("RegUsername").ToObject(Of String)()
        Dim password As String = Q("RegPassword").ToObject(Of String)()
        Dim fname As String = Q("RegFirstName").ToObject(Of String)()
        Dim lname As String = Q("RegLastName").ToObject(Of String)()


        '   Dim sqlConn As SqlConnection = New SqlConnection(ConnectionString)

        Dim isAuthenticated As Boolean = False,
                isFirstLog As Boolean = False,
                ret As String = String.Empty,
                r As New Newtonsoft.Json.Linq.JObject,
                ID_User As Integer = 0,
                ErrorMessage As String = String.Empty,
                ID_Persona As Integer = 0


        Using sqlConn As New SqlConnection(ConnectionString)
            sqlConn.Open()
            Try
                Using SqlCommand As New SqlCommand("EXEC dbo.pValidateUsername @Username", sqlConn)
                    SqlCommand.Parameters.AddWithValue("Username", username)
                    isAuthenticated = SqlCommand.ExecuteScalar
                End Using


                If isAuthenticated Then
                    Using SqlRegister As New SqlCommand("EXEC dbo.pRegister @Username, @Password, @FirstName, @LastName", sqlConn)
                        SqlRegister.Parameters.AddWithValue("Username", username)
                        SqlRegister.Parameters.AddWithValue("Password", Encrypt(password, 41) & "_BJTGLR")
                        SqlRegister.Parameters.AddWithValue("FirstName", fname)
                        SqlRegister.Parameters.AddWithValue("LastName", lname)
                        ID_Persona = SqlRegister.ExecuteScalar
                    End Using

                    If ID_Persona > 0 Then
                        Using sqlC As New SqlCommand("SELECT ID,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage,isFirstLog,ApplicantUserGroup FROM vUser WHERE LoginName = @Username AND ISNULL(Password,'') = @Password AND IsActive = 1 AND ID_UserType = 2", sqlConn)
                            'Using sqlC As New SqlCommand("SELECT ID,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage FROM vUser WHERE LoginName = @Username AND ISNULL(Password,'') = @Password AND IsActive = 1 ", sqlConn)
                            sqlC.Parameters.AddWithValue("Username", username)
                            sqlC.Parameters.AddWithValue("Password", IIf(password <> "", Common.Encrypt(password, 41) & "_BJTGLR", ""))
                            Using sqlDa As New SqlDataAdapter(sqlC)
                                Dim dt As New DataTable
                                sqlDa.Fill(dt)

                                ID_User = CInt(dt.Rows(0).Item("ID"))
                                isFirstLog = Convert.ToBoolean(dt.Rows(0).Item("isFirstLog"))

                                HttpContext.Current.Session.Add("ID_User", dt.Rows(0).Item("ID"))
                                HttpContext.Current.Session.Add("ID_Employee", IsNull(dt.Rows(0).Item("ID_Employee"), 0))
                                HttpContext.Current.Session.Add("ID_Persona", IsNull(dt.Rows(0).Item("ID_Persona"), 0))
                                HttpContext.Current.Session.Add("ID_UserGroup", dt.Rows(0).Item("ID_UserGroup"))
                                HttpContext.Current.Session.Add("ApplicantUserGroup", IsNull(dt.Rows(0).Item("ApplicantUserGroup"), 0))
                                HttpContext.Current.Session.Add("ID_Company", IsNull(dt.Rows(0).Item("ID_Company"), 0))
                                HttpContext.Current.Session.Add("ID_Branch", IsNull(dt.Rows(0).Item("ID_Branch"), 0))
                                HttpContext.Current.Session.Add("ID_Department", IsNull(dt.Rows(0).Item("ID_Department"), 0))
                                HttpContext.Current.Session.Add("ProfileImage", dt.Rows(0).Item("ProfileImage"))
                                HttpContext.Current.Session.Add("isFirstLog", dt.Rows(0).Item("isFirstLog"))
                                HttpContext.Current.Session.Add("isPasswordExpired", False)
                                ''DO NOT REMOVE FOR CSRF TOKEN
                                HttpContext.Current.Session.Add("CSRF-TOKEN", generateRand(10))
                                HttpContext.Current.Session.Add("IsPres", 0)
                            End Using
                        End Using

                        Using sqlcmd As New SqlCommand("SELECT u.IsFirstLog FROM dbo.tUser u WHERE u.ID = @ID", sqlConn)
                            sqlcmd.Parameters.AddWithValue("ID", ID_User)

                            isFirstLog = sqlcmd.ExecuteScalar()
                        End Using
                    Else
                        ErrorMessage = "Error Registration"
                    End If

                End If
            Catch ex As Exception
                isAuthenticated = False
                ErrorMessage = addStripSlashes(ex.Message)
            Finally
                sqlConn.Close()
                sqlConn.Dispose()
            End Try


            Try
                ret &= "{"
                ret &= "isAuthenticated : '" & addStripSlashes(isAuthenticated) & "',"
                ret &= "isFirstLog : '" & addStripSlashes(isFirstLog) & "',"
                If ErrorMessage <> "" Then
                    ret &= "ErrorMessage : '" & ErrorMessage & "',"
                End If
                If ID_Persona > 0 Then
                    ret &= "ID_Persona : '" & ID_Persona & "',"
                    ret &= "indirectID_Persona : '" & Common.toAnyBase(ID_Persona) & "',"
                End If
                ret &= "ID_User : " & addStripSlashes(ID_User)
                ret &= "}"
                r = JObject.Parse(ret)
            Catch ex As Exception
                r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "' }")
            End Try


        End Using

        Return New HttpResponseMessage() With {.Content = New DataServiceController.JsonContent(r)}

    End Function

    <HttpPost>
    Public Function GetCompanies() As HttpResponseMessage
        Dim ID_User As String = 0
        If Q("ID_User").ToObject(Of String)() <> "undefined" Then
            ID_User = Q("ID_User").ToObject(Of String)()
        End If
        If IsNull(ID_User, "0") = "0" Then Return New HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        Dim ID_UserGroup As String = Q("ID_UserGroup").ToObject(Of String)(),
            message As String = String.Empty, ret As String = String.Empty,
            r As New JObject, data As String = String.Empty

        Try
            data = getJSONTable("select ID_Company as ID, Company as Name from dbo.vUserGroupCompany where ID_UserGroup = cast(" & ID_UserGroup & " as int)")
        Catch ex As Exception
            message = ex.Message
        End Try

        Try
            ret = "{"
            ret &= "data : " & data & ""
            ret &= "}"
            r = JObject.Parse(ret)
        Catch ex As Exception
            r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "'}")
        End Try
        Return New HttpResponseMessage() With {
            .Content = New JsonContent(r)
        }
    End Function

    <HttpPost>
    Public Function AuthenticateCompany() As HttpResponseMessage
        Dim ID_User As String = 0
        Dim ID_SelectedCompany As Integer = Q("ID_SelectedCompany").ToObject(Of String)()
        Dim obj2 As Newtonsoft.Json.Linq.JObject = Q("data").ToObject(Of JObject)()
        If obj2("ID_User").ToObject(Of String)() <> "undefined" Then
            ID_User = obj2("ID_User").ToObject(Of String)()
        End If
        If IsNull(ID_User, "0") = "0" Then Return New HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        Dim message As String = String.Empty, ret As String = String.Empty,
            r As New JObject, data As String = String.Empty,
            isAuthenticate As Boolean = False

        Try
            HttpContext.Current.Session.Add("ID_SelectedCompany", ID_SelectedCompany)
            isAuthenticate = True
        Catch ex As Exception
            message = ex.Message
        End Try

        Try
            ret = "{"
            ret &= "data : {'isAuthenticated':'" & isAuthenticate & "'}"
            ret &= "}"
            r = JObject.Parse(ret)
        Catch ex As Exception
            r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "'}")
        End Try
        Return New HttpResponseMessage() With {
            .Content = New JsonContent(r)
        }
    End Function
    Function RandomString(s As String, min As Integer, max As Integer) As String
        Dim r As New Random
        Dim sb As New StringBuilder
        Dim cnt As Integer = r.Next(min, max)
        For i As Integer = 1 To cnt
            Dim idx As Integer = r.Next(0, s.Length)
            sb.Append(s.Substring(idx, 1))
        Next
        Return sb.ToString()
    End Function

    <HttpPost>
    Public Function Login2() As HttpResponseMessage
        Dim up = Q("x").ToObject(Of String).CompressFromUriEncoded().ToObject(Of LoginModel)
        Dim isAuthenticated As Boolean = False,
                ret As String = String.Empty,
                r As New Newtonsoft.Json.Linq.JObject,
                LogInToken As String = ""
        Using sqlConn As New SqlConnection(ConnectionString)
            sqlConn.Open()
            Try
                Using sqlC As New SqlCommand("SELECT ID,Name,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage,isFirstLog,ApplicantUserGroup,Skins,ISNULL((select ParamValue from dbo.tWebParameters where ParamName = 'TimeOutExpire'), 1800) TimeOutExpire, case when ISNULL(ID_SecretQuestion, 0) = 0 then 0 else 1 end IsSecretQuestionReady FROM vUser WHERE LoginName = @Username AND BINARY_CHECKSUM(ISNULL(Password,'')) = BINARY_CHECKSUM(@Password) AND IsActive = 1 and ((ID_UserGroup <> 1 and ID_UserType = 2) OR ID_UserGroup = 1) ", sqlConn) 'AND ID_UserType = 2 
                    'Using sqlC As New SqlCommand("SELECT ID,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage FROM vUser WHERE LoginName = @Username AND ISNULL(Password,'') = @Password AND IsActive = 1 ", sqlConn)
                    sqlC.Parameters.AddWithValue("Username", up.Username)
                    sqlC.Parameters.AddWithValue("Password", IIf(up.Password <> "", Common.Encrypt(up.Password, 41) & "_BJTGLR", ""))
                    Using sqlDa As New SqlDataAdapter(sqlC)
                        Dim dt As New DataTable
                        sqlDa.Fill(dt)
                        If Not IsDBNull(dt) Then
                            isAuthenticated = True
                            LogInToken = "?ITI="
                            LogInToken &= CInt(dt.Rows(0).Item("ID")).ToString + RandomString(IsNull(dt.Rows(0).Item("Name"), 0), 1, 2)
                            LogInToken &= IsNull(dt.Rows(0).Item("ID_Employee"), 0).ToString + RandomString(IsNull(dt.Rows(0).Item("Name"), 0), 1, 2)
                            LogInToken &= DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss.fff").Replace("/", "").Replace(":", "").Replace(".", "")
                            LogInToken &= RandomString(IsNull(dt.Rows(0).Item("Name"), 0), 8, 10)
                            Using sqlcmd As New SqlCommand("EXEC dbo.pInsertToken @Token, @ID_User", sqlConn)
                                sqlcmd.Parameters.AddWithValue("Token", LogInToken.Replace(" ", ""))
                                sqlcmd.Parameters.AddWithValue("ID_User", CInt(dt.Rows(0).Item("ID")))
                                sqlcmd.ExecuteNonQuery()
                            End Using
                        Else
                            isAuthenticated = False
                        End If
                    End Using
                End Using
            Catch ex As Exception
                isAuthenticated = False
            Finally
                sqlConn.Close()
                sqlConn.Dispose()
            End Try
            Try
                ret = "{"
                ret &= "isAuthenticated : '" & addStripSlashes(isAuthenticated) & "',"
                ret &= "LogInToken : '" & addStripSlashes(LogInToken.Replace(" ", "")) & "',"
                ret &= "}"

                r = JObject.Parse(ret)
            Catch ex As Exception
                r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "' }")
                UnificationError(ex, "Login2")
            End Try
        End Using
        Return New HttpResponseMessage() With {.Content = New DataServiceController.JsonContent(r)}
    End Function
End Class
