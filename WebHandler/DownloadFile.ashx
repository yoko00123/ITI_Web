<%@ WebHandler Language="VB" Class="DownloadFile" %>

Imports System
Imports System.Web
Imports GSWEB.Common
Imports System.IO
Public Class DownloadFile : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim id As Integer = context.Request.Params("ID")
        Dim path As String = context.Request.Params("path")
        Dim file As FileInfo = Nothing
        If id = 0 Then
            file = New FileInfo(context.Server.MapPath(path))
        Else
            Dim filepath As String = ExecScalarNoParams("SELECT FilePath FROM vDocumentFiles WHERE ID = " & id)
            file = New FileInfo(filepath.Substring(0, filepath.Length - 1))
        End If
        Try
            If (file.Exists) Then
                context.Response.ClearHeaders()
                context.Response.ClearContent()
                context.Response.AppendHeader("Content-Disposition", "attachment; filename=" + file.Name)
                context.Response.AppendHeader("Content-Length", file.Length.ToString())
                context.Response.ContentType = "application/octet-stream"
                context.Response.TransmitFile(file.FullName)
                context.Response.Flush()
            End If
        Catch ex As Exception
            context.Response.ContentType = "text/plain"
            context.Response.Write(ex.Message)
        
        Finally
        
            context.Response.End()
        End Try
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class