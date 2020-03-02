Imports System.Net
Imports System.Web.Http
Imports System.Net.Http
Imports GSWEB
Imports GSWEB.Common
Imports System.IO
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq
Imports GSWEB.Utility
Imports System.Threading.Tasks

Public Class SystemDashboardController
    Inherits BaseMenuController

    Private cpuUsage As System.Diagnostics.PerformanceCounter = New System.Diagnostics.PerformanceCounter("Processor", "% Processor Time", "_Total")
    Private diskUsage As System.Diagnostics.PerformanceCounter = New System.Diagnostics.PerformanceCounter("LogicalDisk", "% Disk Time", "C:") ''TODO:  ALL DRIVES
    Private ramUsage As System.Diagnostics.PerformanceCounter = New System.Diagnostics.PerformanceCounter("Memory", "Available MBytes", True)
    Private totalMemory As Double = New Microsoft.VisualBasic.Devices.ComputerInfo().TotalPhysicalMemory / 1048576
    <HttpPost>
    <DeflateCompression>
    <CheckCSRFHeader>
    Public Function GetDashboardResources(ByVal obj As Newtonsoft.Json.Linq.JObject) As HttpResponseMessage
        If IsNull(HttpContext.Current.Session("ID_User"), 0) <> 1 Then Return New HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)

        Dim ret As String, r As New JObject

        cpuUsage.NextValue()
        diskUsage.NextValue()
        ramUsage.NextValue()
        System.Threading.Thread.Sleep(1000)
        'Dim cpu As Double = diskUsage.NextValue() 'cpuUsage.NextValue()

        Try
            ret = "{"
            ret &= "cpu : " & cpuUsage.NextValue().ToString & ","
            ret &= "disk : " & diskUsage.NextValue().ToString & ","
            ret &= "memory : " & ((totalMemory - ramUsage.NextValue()) / totalMemory) * 100 & ","
            ret &= "}"
            r = JObject.Parse(ret)
        Catch ex As Exception
            logError(ex)
            r = JObject.Parse("{ error : '" & addStripSlashes(ex.Message) & "'}")
        End Try


        Return New HttpResponseMessage() With { _
          .Content = New JsonContent(r) _
        }
    End Function

End Class
