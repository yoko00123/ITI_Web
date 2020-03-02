Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports Microsoft.AspNet.SignalR
Imports Microsoft.AspNet.SignalR.Hubs
Imports System.Threading.Tasks
Imports System.Collections.Concurrent
Imports System.Object
Imports GSWEB.SQL
Imports System.Data
Imports System.Threading
Imports GSWEB.Common
Imports System.Web.Script.Serialization
Imports System.Data.SqlClient

Namespace SignalRHub
    <HubName("SignalRHub")>
    Public Class SignalRHub
        Inherits Hub
        Public Shared users As New List(Of UserCredentials)

        'Shared Sub sendMessage(connectionID As String, message As String, menuName As String, type As Integer)
        '    Dim context As IHubContext = GlobalHost.ConnectionManager.GetHubContext("SignalRHub")
        '    context.Clients.Client(connectionID).getMessage(menuName, message, type)
        'End Sub

        'Shared Sub reloadContent(connectionID As String, menuRef As String, refID As Integer)
        '    Dim context As IHubContext = GlobalHost.ConnectionManager.GetHubContext("SignalRHub")
        '    context.Clients.Client(connectionID).reloadContent(menuRef, refID)
        'End Sub

        Overloads Shared Sub ShowNotifications(ID_User As Integer, Message As String)
            Dim context As IHubContext = GlobalHost.ConnectionManager.GetHubContext("SignalRHub")
            Dim list_of_user As New List(Of Integer)

            Dim userCredential As List(Of UserCredentials) = users.Where(Function(x) x.UserID = ID_User).ToList()
            If list_of_user.IndexOf(ID_User) = -1 AndAlso users.Where(Function(x) x.UserID = ID_User).Count() > 0 Then
                list_of_user.Add(ID_User)
            End If

            For Each user In userCredential
                context.Clients.Client(user.ConnectionID).NewUserNotification(Message)
            Next

        End Sub

        Public Overrides Function OnReconnected() As Task
            Dim connectionID As UserCredentials = getUserCredentials()

            SyncLock users
                If users.Where(Function(x) x.ConnectionID = connectionID.ConnectionID).Count = 0 Then
                    users.Add(connectionID)
                End If
            End SyncLock

            Return MyBase.OnReconnected()
        End Function

        Public Overrides Function OnConnected() As Task
            Dim connectionID As UserCredentials = getUserCredentials()
            SyncLock users
                If users.Where(Function(x) x.ConnectionID = connectionID.ConnectionID).Count = 0 Then
                    users.Add(connectionID)
                End If
            End SyncLock

            Dim context As IHubContext = GlobalHost.ConnectionManager.GetHubContext("SignalRHub")
            For Each user In users.Where(Function(x) x.UserID = connectionID.UserID And x.ConnectionID <> connectionID.ConnectionID And x.SessionID <> connectionID.SessionID)
                context.Clients.Client(user.ConnectionID).logout()
            Next


            Return MyBase.OnConnected()
        End Function

        Public Overrides Function OnDisconnected() As Task
            Dim connectionID As UserCredentials = getUserCredentials()

            SyncLock users
                If users.Where(Function(x) x.ConnectionID = connectionID.ConnectionID).Count > 0 Then
                    Dim tmp As UserCredentials = users.Where(Function(x) x.ConnectionID = connectionID.ConnectionID).FirstOrDefault
                    users.Remove(tmp)
                End If
            End SyncLock


            Return MyBase.OnDisconnected()
        End Function

        Private Function getUserCredentials() As UserCredentials
            Dim UserCredentials As New UserCredentials(Context.ConnectionId, Context.QueryString("UserID"), Context.QueryString("SessionID"))
            Return UserCredentials
        End Function

    End Class

    Public Class UserCredentials

        Public Sub New()

        End Sub

        Public Sub New(ByVal ConnectionID As String, ByVal UserID As Integer, ByVal SessionID As String)
            Me.ConnectionID = ConnectionID
            Me.UserID = UserID
            Me.SessionID = SessionID
        End Sub

        Public Property ConnectionID As String
        Public Property UserID As Integer
        Public Property SessionID As String
    End Class

End Namespace