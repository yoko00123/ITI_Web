'use strict';define(['app'],function(app){var c8090=function($c,s,r,d,u,S,g,SS){s.gridOptions={8091:{data:'gridData[8091]',columnDefs:[{field:'$$',width:30,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'m-grid-cell-contents\' ><span><a ui-sref=\'8091({ ID_8091:row.entity.$$rID})\'><i class=\'fa fa-folder\'></i></a></span></div>'},{field:'ID',width:'*',displayName:'ID'},{field:'Name',width:'*',displayName:'Name',cellTemplate:'<div class=\'m-grid-cell-contents \'><span class=\'control-label\' ng-bind-html=\'row.entity.Name | trustedHTML\'></span></div>'},{field:'$delete',width:20,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRow(8091,row,"")\'  ><i class=\'fa fa-times\'></i></a></span></div>'},],totalServerItems:r.totalServerItems[8091],enableColumnResizing: false,currentSortColumn:'ID',currentSortDirection:'DESC',registerApi : function(events){s.gridEvents[8091] = events;s.gridEvents[8091].on.sortChange(s,function(opts){s.refreshGrid(8091, opts.currentPageSize, opts.currentPage, opts.currentSortColumn, opts.currentSortDirection, s.filter[8091]);});s.gridEvents[8091].on.pageChange(s, function(opts){s.refreshGrid(8091, opts.currentPageSize, opts.currentPage, opts.currentSortColumn, opts.currentSortDirection, s.filter[8091]);});},},};for(var i in r.columnDefinitions){if(r.columnDefinitions[i].length>0){s.gridOptions[i].columnDefs=r.columnDefinitions[i];}};for(var i in r.groups){if(r.groups[i].length>0){s.gridOptions[i].groups=r.groups[i];}};setTimeout(function () {s.filter={8091:{},};});s.treeViewOptions={};$c('BaseListController',{$scope:s,resources:r});};app.register.controller('c8090',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session',c8090]);});