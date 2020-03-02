<%@ Application Language="VB" %>
<%@ Import Namespace="System.Web.Optimization" %>
<%@ Import Namespace="System.Web.SessionState" %>
<%@ Import Namespace="GSWEB.Common" %>
<%@ Import Namespace="System.Web.Http" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="Microsoft.AspNet.SignalR" %>
<%@ Import Namespace="Microsoft.Owin.Host.SystemWeb" %>
<%@ Import Namespace="System.Globalization" %>
<script runat="server">

    'Private Const _WebApiPrefix As String = "api"
    'Private ReadOnly _WebApiExecutionPath As String = String.Format("~/{0}", _WebApiPrefix)

    'Public Class SessionableControllerHandler
    '    Inherits WebHost.HttpControllerHandler
    '    Implements IRequiresSessionState
    '    Public Sub New(routeData As RouteData)
    '        MyBase.New(routeData)
    '    End Sub
    'End Class

    'Public Class SessionStateRouteHandler
    '    Implements IRouteHandler
    '    Private Function IRouteHandler_GetHttpHandler(requestContext As RequestContext) As IHttpHandler Implements IRouteHandler.GetHttpHandler
    '        Return New SessionableControllerHandler(requestContext.RouteData)
    '    End Function
    'End Class

    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application startup
        Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture
        RouteTable.Routes.MapHubs()
        GlobalConfiguration.Configuration.Routes.MapHttpRoute(
               name:="DefaultApi",
               routeTemplate:="api/{controller}/{action}/{id}",
               defaults:=New With {.id = System.Web.Http.RouteParameter.Optional}
        )
        GlobalConfiguration.Configuration.Filters.Add(New AllowCrossSiteAttribute())
        RegisterBundles(BundleTable.Bundles)

        'RouteTable.Routes.MapHttpRoute( _
        '    name:="DefaultApi", _
        '    routeTemplate:="api/{controller}/{id}", _
        '    defaults:=New With {.id = System.Web.Http.RouteParameter.Optional} _
        ').RouteHandler = New SessionStateRouteHandler()

        ''GlobalConfiguration.Configuration.Formatters.JsonFormatter.MediaTypeMappings.Add(New QueryStringMapping("json", "true", "application/json"))
        ''GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedMediaTypes.Add(New MediaTypeHeaderValue("application/json"))
        connServer = ConfigurationManager.AppSettings("Server")
        connUserName = ConfigurationManager.AppSettings("Username")
        connPassword = ConfigurationManager.AppSettings("Password")
        connDatabase = ConfigurationManager.AppSettings("Database")
        connPort = ConfigurationManager.AppSettings("Port")
        ConnectionString = "Server=" & connServer &
                       If(connPort = "1433", "", ", " & ConfigurationManager.AppSettings("Port")) &
                       ";Database=" & connDatabase &
                       ";User ID=" & connUserName &
                       ";Password=" & connPassword &
                       ";Trusted_Connection=False;Max Pool Size=1000;Connect Timeout=300"

        InitMailSender()

        If mCollection Is Nothing OrElse mCollection.Count = 0 Then
            LoadMenuSet()
            LoadSettings()
        End If

    End Sub



    Public Overrides Sub Init()
        AddHandler Me.PostAuthenticateRequest, AddressOf MvcApplication_PostAuthenticateRequest
        MyBase.Init()
    End Sub

    Private Sub MvcApplication_PostAuthenticateRequest(sender As Object, e As EventArgs)
        System.Web.HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required)
    End Sub

    'Protected Sub Application_PostAuthorizeRequest()
    '    If (IsWebApiRequest()) Then
    '        HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required)
    '    End If
    'End Sub
    'Private Function IsWebApiRequest() As Boolean
    '    Return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(_WebApiExecutionPath)
    'End Function

    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application shutdown
    End Sub

    Sub Application_BeginRequest(ByVal sender As Object, ByVal e As EventArgs)
        ' HttpContext.Current.Response.AddHeader("x-frame-options", "ALLOW")
    End Sub

    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when an unhandled error occurs
    End Sub

    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a new session is started
    End Sub

    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a session ends. 
        ' Note: The Session_End event is raised only when the sessionstate mode
        ' is set to InProc in the Web.config file. If session mode is set to StateServer 
        ' or SQLServer, the event is not raised.
    End Sub

</script>