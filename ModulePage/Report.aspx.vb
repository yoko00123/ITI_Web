Imports CrystalDecisions.CrystalReports.Engine
Imports CrystalDecisions.Web
Imports CrystalDecisions.Shared
Imports GSWEB.Common
Imports GSWEB.SQL
Imports System.IO
Imports CrystalDecisions
Imports System.Data
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.Web.Script.Serialization
Imports System.Web.Script.Services
Imports GSWEB.Utility
Imports Newtonsoft.Json
Imports System.Data.SqlClient
Partial Class ModulePage_Report
    Inherits System.Web.UI.Page

    Private tmpReportFileName As String
    Private ok As Boolean = False
    Private columnsToBeRemoved As New List(Of String)
    Protected Sub ModulePage_Report_Init(sender As Object, e As EventArgs) Handles Me.Init

    End Sub

    Protected Sub ModulePage_Report_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim refID As List(Of String) = Me.Request.QueryString("refID").Split(",").ToList
            Dim menuID As Integer = Me.Request.QueryString("menuID")
            If Me.Request.QueryString("params").ToString = "undefined" Then Return

            Dim filter As CaseInsensitiveDictionary = JsonConvert.DeserializeObject(Of CaseInsensitiveDictionary)(Me.Request.QueryString("params"))
            If filter.Count = 0 Then Return

            Dim menu As GSWEB.MenuCollection.Menu = mCollection.GetMenu(menuID)
            Dim mdt As DataTable = mCollection.GetMenu(menuID).dtColumns
            Dim dt As New DataTable
            Dim EnabledPassword As Boolean = menu.ColumnValue("EnabledReportPassword")
            Dim rptSource As String = replaceWithSession(menu.ColumnValue("ReportDataSource"), Me.Session),
            defaultParams As List(Of String) = New List(Of String)


            getDefaultParams(rptSource, defaultParams)
            rptSource = rptSource.Replace(":", "@")

            If EnabledPassword Then
                Dim password As String = Me.Request.QueryString("ReportPass").ToString(),
                Authentication As Boolean = CheckPassword(password)
                If Authentication = False Then Throw New Exception("Invalid Password!")
            End If


            Dim tmp As String = String.Empty,
            filterString As New List(Of String)

            For Each x In filter '.Where(Function(i) Not i.Value Is Nothing AndAlso Not IsDBNull(i.Value) AndAlso Trim(i.Value.ToString).Length > 0)
                If defaultParams.Contains(x.Key) Then Continue For

                Dim dataType As String = String.Empty

                If x.Key.Contains("From_") OrElse x.Key.Contains("To_") Then
                    dataType = GetDataType(menu.dtColumns.Select("Name = '" & x.Key.Replace("From_", "").Replace("To_", "") & "'")(0).Item("colDataType").ToString).FullName.ToString()
                Else
                    Try
                        dataType = GetDataType(menu.dtColumns.Select("Name = '" & x.Key & "'")(0).Item("colDataType").ToString).FullName.ToString()
                    Catch ex As Exception
                        dataType = Nothing
                    End Try
                End If
                If x.Key.ToString.Contains("ID_") AndAlso IsNull(x.Value.ToString, "") = "" Then
                    If dataType = "System.String" Then
                        filterString.Add(x.Key & " LIKE '%'+@" & x.Key & "+'%'")
                    ElseIf dataType = "System.DateTime" OrElse dataType = "System.Int32" OrElse dataType = "System.Decimal" Then
                        If x.Key.Contains("From_") Then
                            filterString.Add(x.Key.Replace("From_", "") & " >= @" & x.Key)
                        ElseIf x.Key.Contains("To_") Then
                            filterString.Add(x.Key.Replace("To_", "") & " <= @" & x.Key)
                        Else
                            If x.Key.ToString.ToLower.Contains("start") Or x.Key.ToString.ToLower.Contains("end") Then
                                If x.Key.ToString.ToLower.Contains("start") Then
                                    filterString.Add(x.Key & " >= @" & x.Key)
                                Else
                                    filterString.Add(x.Key & " <= @" & x.Key)
                                End If
                            Else
                                filterString.Add(x.Key & " = @" & x.Key)
                            End If
                        End If
                    Else
                        If Not dataType Is Nothing Then
                            filterString.Add(x.Key & " = @" & x.Key)
                        End If
                    End If
                End If
            Next

            Using sqlConn As New SqlClient.SqlConnection(ConnectionString)
                Try
                    sqlConn.Open()
                    Using sqlCmd As New SqlCommand("SELECT * FROM " & rptSource & If(filterString.Count = 0, "", " WHERE " & String.Join(" AND ", filterString)), sqlConn)

                        For Each x In filter '.Where(Function(i) Not i.Value Is Nothing AndAlso Not IsDBNull(i.Value) AndAlso Trim(i.Value.ToString).Length > 0)
                            'If x.Value.ToString.Contains("@") Or x.Key.ToString.Contains("From") Or x.Key.ToString.Contains("To") Then
                            Dim dataType As System.Type
                            If x.Key.Contains("From_") OrElse x.Key.Contains("To_") Then
                                dataType = GetDataType(menu.dtColumns.Select("Name = '" & x.Key.Replace("From_", "").Replace("To_", "") & "'")(0).Item("colDataType").ToString)
                            Else
                                'dataType = GetDataType(menu.dtColumns.Select("Name = '" & x.Key & "'")(0).Item("colDataType").ToString)
                                Try
                                    dataType = GetDataType(menu.dtColumns.Select("Name = '" & x.Key & "'")(0).Item("colDataType").ToString)
                                Catch ex As Exception
                                    dataType = Nothing
                                End Try
                            End If
                            If Not IsNothing(dataType) Then
                                sqlCmd.Parameters.AddWithValue("@" & x.Key, If(x.Value Is Nothing, DBNull.Value, CTypeDynamic(x.Value.ToString.Replace(Chr(160), Chr(32)), dataType)))
                            End If
                            'End If
                        Next

                        'NULL VALUES

                        For Each param In defaultParams
                            If Not filter.ContainsKey(param) Then
                                sqlCmd.Parameters.AddWithValue("@" & param, DBNull.Value)
                            End If
                        Next
                        Using da As New SqlDataAdapter(sqlCmd)
                            da.Fill(dt)
                        End Using
                    End Using
                Catch ex As Exception
                    logError(ex, menu.MenuID)
                Finally

                    sqlConn.Close()
                End Try
            End Using


            'Dim reportPath As String = getTable("select Value from dbo.tsetting where Name = 'ReportPath'").Rows(0)("Value")
            Dim reportPath As String = Server.MapPath("..\Contents\Reports\")


            If System.IO.File.Exists(reportPath + menu.ColumnValue("ReportPath").ToString) Then

                Dim rptName As String = menu.ColumnValue("ReportPath").ToString
                Dim root = Server.MapPath("..\Contents\Reports\tmp\")
                Directory.CreateDirectory(root)
                tmpReportFileName = Server.MapPath("..\Contents\Reports\") & "tmp\" & rptName.Replace(".rpt", "") & "_" & Date.Now.Ticks.ToString() & ".rpt"
                File.Copy(reportPath + menu.ColumnValue("ReportPath").ToString, tmpReportFileName, True)
                'File.Copy(Server.MapPath("..\Contents\Reports\") + menu.ColumnValue("ReportPath").ToString, tmpReportFileName, True)

                Dim rep As New CrystalReports.Engine.ReportDocument

                rep.Load(tmpReportFileName)
                rep.SetDatabaseLogon(connUserName, connPassword, connServer, connDatabase)
                rep.SetDataSource(dt)

                Dim d2 As New DataSource
                Dim subDataSource As DataTable = menu.dtSubDataSource()
                Dim cntRefID As Integer = refID.Count
                If Not subDataSource Is Nothing Then
                    For Each dr In subDataSource.Select
                        Dim ctext As String = "",
                        subDefaultParams As New List(Of String)

                        ctext = replaceWithSession(dr("DataSource").ToString, Me.Session)

                        getDefaultParams(ctext, subDefaultParams)
                        ctext = ctext.Replace(":", "@")

                        Using sqlConn As New SqlConnection(ConnectionString)
                            sqlConn.Open()

                            Try
                                Using sqlCmd As New SqlCommand(If(ctext.ToString.ToUpper.Contains("SELECT"), ctext, "SELECT * From " + ctext), sqlConn)
                                    For Each param In subDefaultParams
                                        If Not filter.ContainsKey(param) Then
                                            sqlCmd.Parameters.AddWithValue("@" & param, DBNull.Value)
                                        Else
                                            sqlCmd.Parameters.AddWithValue("@" & param, filter.Item(param))
                                        End If
                                    Next
                                    Using sqlDa As New SqlDataAdapter(sqlCmd)
                                        Dim tmpDt As New DataTable
                                        sqlDa.Fill(tmpDt)
                                        rep.OpenSubreport(dr("Name").ToString).SetDataSource(tmpDt)

                                    End Using
                                End Using

                            Catch ex As Exception
                                logError(ex)
                            Finally
                                sqlConn.Close()
                            End Try
                        End Using


                    Next
                Else
                    For Each rd As CrystalReports.Engine.ReportDocument In rep.Subreports

                        For Each dsc As CrystalDecisions.Shared.IConnectionInfo In rd.DataSourceConnections
                            dsc.SetConnection(connServer, connDatabase, connUserName, connPassword)
                        Next
                    Next
                End If


                Dim stream As System.IO.Stream = rep.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat)


                rep.Dispose()


                Dim PDFByteArray(stream.Length) As Byte
                ''= New Byte()

                stream.Position = 0

                stream.Read(PDFByteArray, 0, Convert.ToInt32(stream.Length))

                Context.Response.ClearContent()

                Context.Response.ClearHeaders()

                Context.Response.AddHeader("content-disposition", "filename=Report.pdf")

                Context.Response.ContentType = "application/pdf"

                Context.Response.AddHeader("content-length", PDFByteArray.Length.ToString())

                Context.Response.BinaryWrite(PDFByteArray)

                Try
                    Context.Response.Flush()
                    Context.Response.End()

                Catch ex As Exception

                Finally
                    File.Delete(tmpReportFileName)
                End Try
                'Dim oStream As New MemoryStream

                'oStream = rep.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat)
                'Response.Clear()
                'Response.Buffer = True
                'Response.ContentType = "application/pdf"
                ''---------------------------------------

                'Try
                '    Response.BinaryWrite(oStream.ToArray())
                '    Response.Flush()
                '    'Response.End()
                'Catch ex As Exception
                '    'Me.Session.Add("ErrorTable", errorHandler(ex.Message.ToString))
                '    'Me.Server.Transfer("~/ErrorPage.aspx")
                '    'Response.Write(err.Message.ToString)
                'Finally
                '    rep.Close()
                '    rep.Dispose()
                'End Try

            End If

        Catch ex As Exception
            'Me.Session.Add("ErrorTable", errorHandler(ex.Message.ToString))
            'Me.Server.Transfer("~/ErrorPage.aspx")
            Me.Response.Write(ex.Message)
        Finally
            '     ds.Disconnect()
        End Try
    End Sub

    Public Sub getDefaultParams(ByVal reportSource As String, ByRef defaultParams As List(Of String))

        While reportSource.Contains(":")
            Dim tmpStr As String = reportSource.Substring(reportSource.IndexOf(":"), (reportSource.Length) - reportSource.IndexOf(":"))
            tmpStr.Trim()
            If tmpStr.Contains(",") Then tmpStr = tmpStr.Substring(0, tmpStr.IndexOf(","))
            If tmpStr.Contains(")") Then tmpStr = tmpStr.Substring(0, tmpStr.IndexOf(")"))
            tmpStr = tmpStr.Replace(":", "")
            defaultParams.Add(tmpStr)
            reportSource = reportSource.Replace(":" + tmpStr, "")

        End While

    End Sub

    Public Function CheckPassword(ByVal Password As String) As Boolean
        Dim User As Integer = IsNull(HttpContext.Current.Session("ID_User"), 0)
        If Password = "" Then
            Password = "IS NULL"
        Else
            Password = "= dbo.fEncrypt('" + Password + "',41) + '_BJTGLR'"
        End If
        Using ttCon As New SqlClient.SqlConnection(ConnectionString)
            Dim checkuser As String = "SELECT CASE WHEN EXISTS(SELECT ID FROM dbo.tUser u WHERE u.ID = " + User.ToString() + " AND u.Password " + Password + ") THEN 1 ELSE 0 END",
                ret As Boolean = True
            ttCon.Open()
            Using ttCmd As New SqlCommand(checkuser, ttCon)
                ret = ttCmd.ExecuteScalar
            End Using
            ttCon.Close()
            Return ret
        End Using
    End Function


    Protected Sub ModulePage_Report_Unload(sender As Object, e As EventArgs) Handles Me.Unload
        Try
            GC.Collect()
            If ok Then File.Delete(tmpReportFileName)
        Catch ex As Exception
            'Me.Session.Add("ErrorTable", errorHandler(ex.Message.ToString))
            'Me.Server.Transfer("~/ErrorPage.aspx")

        End Try
    End Sub
End Class
