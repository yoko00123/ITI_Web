Imports System.Data
Imports System.Data.SqlClient
Imports GSWEB.Common
Imports Newtonsoft.Json.Linq
Imports z.Data

Partial Class Index
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim ret As String = String.Empty
        If Request.Url.AbsoluteUri.ToString.Contains("?ITI=") Then
            Dim TokenCheck As String = Request.Url.AbsoluteUri.Remove(0, Request.Url.AbsoluteUri.ToString.IndexOf("=") + 1).ToString
            TokenCheck = TokenCheck.Remove(TokenCheck.IndexOf("SES-ID"))
            Dim isFirstLog As Boolean = False,
                ID_User As Integer = 0,
                isPasswordExpired As Boolean = False,
                IsSecretQuestionReady As Integer = 0,
                WebParams As DataTable = getTable("SELECT cast(ParamValue as int) ParamValue from dbo.tWebParameters where Paramname IN ('ApplicantUserGroup', 'EnableCompanySelector')"),
                EnableCompanySelector As Integer = WebParams.Rows(1)("ParamValue")
            Using sqlconn As New SqlConnection(ConnectionString)
                sqlconn.Open()
                Try
                    Using sqlC As New SqlCommand("SELECT ID,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage,isFirstLog,ApplicantUserGroup,Skins,ISNULL((select ParamValue from dbo.tWebParameters where ParamName = 'TimeOutExpire'), 1800) TimeOutExpire, case when ISNULL(ID_SecretQuestion, 0) = 0 then 0 else 1 end IsSecretQuestionReady,isEffectsEnable,isFirstLogOTD FROM dbo.fIonsLogin(@Token) fil", sqlconn) 'AND ID_UserType = 2 
                        'Using sqlC As New SqlCommand("SELECT ID,ID_Employee,ID_Persona,ID_UserGroup,ID_Company,ID_Branch,ID_Department,ProfileImage FROM vUser WHERE LoginName = @Username AND ISNULL(Password,'') = @Password AND IsActive = 1 ", sqlConn)
                        sqlC.Parameters.AddWithValue("Token", TokenCheck)
                        Using sqlDa As New SqlDataAdapter(sqlC)
                            Dim dt As New DataTable
                            sqlDa.Fill(dt)
                            ID_User = CInt(dt.Rows(0).Item("ID"))
                            IsSecretQuestionReady = CInt(dt.Rows(0).Item("IsSecretQuestionReady"))
                            isFirstLog = Convert.ToBoolean(dt.Rows(0).Item("isFirstLog"))
                            HttpContext.Current.Session.Add("isPasswordExpired", isPasswordExpired)
                            HttpContext.Current.Session("InvalidLogTry") = 0
                            HttpContext.Current.Session.Add("IsPres", 0)
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
                            Dim dictionary As Dictionary(Of String, Object) = SessionToDictionary(HttpContext.Current.Session)
                            dictionary.Add("$$ID_User", """" & toAnyBase(dictionary("ID_User")) & """") 'GetIndirectReference(dictionary("ID_User"), HttpContext.Current.Session)
                            dictionary.Add("$$ID_Employee", """" & toAnyBase(dictionary("ID_Employee")) & """") 'GetIndirectReference(dictionary("ID_Employee"), HttpContext.Current.Session)
                            dictionary.Add("$$ID_Persona", """" & toAnyBase(dictionary("ID_Persona")) & """") ' GetIndirectReference(dictionary("ID_Persona"), HttpContext.Current.Session) 
                            Dim a = dictionary.[Select](Function(d) String.Format("""{0}"":{1}", d.Key, IsNull(d.Value, 0)))

                            ret = "{" & String.Join(",", a) + "}"
                            Dim SessToken As HttpCookie = New HttpCookie("SESS-TOKEN", ret)
                            HttpContext.Current.Response.Cookies.Add(SessToken)
                            SetCsrfCookie()
                            Session.Item("SystemVersion") = ExecScalarNoParams("SELECT dbo.fGetWebParameter('SystemVersion')")
                            Session.Item("ForDevelopment") = ExecScalarNoParams("SELECT dbo.fGetWebParameter('ForDevelopment')")
                            Session.Item("ClientCustomFolder") = ExecScalarNoParams("SELECT dbo.fGetWebParameter('ClientCustomFolder')")
                        End Using
                        Using sqlcmd As New SqlCommand("UPDATE dbo.tUser SET DateLastLog = GETDATE() WHERE ID =" & ID_User.ToString(), sqlconn)
                            sqlcmd.ExecuteNonQuery()
                        End Using
                        Using sqlC1 As New SqlCommand("UPDATE dbo.tSession SET isIonsUsed = 1 WHERE IonsToken = @Token", sqlconn)
                            sqlC1.Parameters.AddWithValue("Token", TokenCheck)
                            sqlC1.ExecuteNonQuery()
                        End Using
                    End Using
                    'Response.Redirect("~/Index.aspx#")
                Catch ex As Exception
                    Me.Response.Redirect("~/Login.aspx")
                End Try
            End Using
        Else
            If Me.Session("ID_User") Is Nothing Or Me.Session("ID_SelectedCompany") Is Nothing Or (Me.Session("IsSecretQuestionReady") Is Nothing Or Me.Session("IsSecretQuestionReady") = 0) Then Me.Response.Redirect("~/Login.aspx")
            Dim dictionary As Dictionary(Of String, Object) = SessionToDictionary(HttpContext.Current.Session)
            dictionary.Add("$$ID_User", """" & toAnyBase(dictionary("ID_User")) & """") 'GetIndirectReference(dictionary("ID_User"), HttpContext.Current.Session)
            dictionary.Add("$$ID_Employee", """" & toAnyBase(dictionary("ID_Employee")) & """") 'GetIndirectReference(dictionary("ID_Employee"), HttpContext.Current.Session)
            dictionary.Add("$$ID_Persona", """" & toAnyBase(dictionary("ID_Persona")) & """") ' GetIndirectReference(dictionary("ID_Persona"), HttpContext.Current.Session) 
            Dim a = dictionary.[Select](Function(d) String.Format("""{0}"":{1}", d.Key, IsNull(d.Value, 0)))

            ret = "{" & String.Join(",", a) + "}"
            Dim SessToken As HttpCookie = New HttpCookie("SESS-TOKEN", ret.CompressUriEncoded())
            HttpContext.Current.Response.Cookies.Add(SessToken)
            SetCsrfCookie()
            Session.Item("SystemVersion") = ExecScalarNoParams("SELECT dbo.fGetWebParameter('SystemVersion')")
            Session.Item("ForDevelopment") = ExecScalarNoParams("SELECT dbo.fGetWebParameter('ForDevelopment')")
            Session.Item("ClientCustomFolder") = ExecScalarNoParams("SELECT dbo.fGetWebParameter('ClientCustomFolder')")
        End If
    End Sub

    Private Sub SetCsrfCookie()
        Dim csrfCookie As HttpCookie = New HttpCookie("XSRF-TOKEN", New GSWEB.Utility.CsrfTokenHelper().GenerateCsrfTokenFromAuthToken(CStr(Me.Session("ID_User")) & "_" & CStr(Me.Session("CSRF-TOKEN"))))
        csrfCookie.HttpOnly = False
        HttpContext.Current.Response.Cookies.Add(csrfCookie)
    End Sub
End Class
