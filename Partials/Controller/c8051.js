'use strict';define(['app'],function(app){var c8051=function($c,s,r,d,u,S,g,SS){setTimeout(function(){s.RefreshReport(8052);},1000);s.gridOptions={};for(var i in r.columnDefinitions){if(r.columnDefinitions[i].length>0){s.gridOptions[i].columnDefs=r.columnDefinitions[i];}};for(var i in r.groups){if(r.groups[i].length>0){s.gridOptions[i].groups=r.groups[i];}};setTimeout(function () {s.filter={8052:{'ID_Company': s.Session.ID_Company,'ID_Employee': s.Session.ID_Employee,},};});s.treeViewOptions={};$c('BaseListController',{$scope:s,resources:r});var iframe = $('<iframe />');iframe.attr('style', 'width:100%;height:850px;border: 2px solid #aaa;');iframe.attr('src', '../ModulePage/Report.aspx?menuID=' + 8052 + '&refID=' + 0 + '&params=' + JSON.stringify(s.rawData));iframe.attr('id', 'frame_8052');$('.grid').append(iframe);};app.register.controller('c8051',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session',c8051]);});