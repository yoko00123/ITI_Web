
Partial Class Logout
    Inherits System.Web.UI.Page

    Protected Sub Page_Init(sender As Object, e As EventArgs) Handles Me.Init
        Me.Session.RemoveAll()
        HttpContext.Current.Response.Cookies.Remove("XSRF-TOKEN")
        Response.Redirect("~/Login.aspx")
    End Sub
End Class
