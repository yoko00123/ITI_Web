'use strict';define(['app'],function(app){var c6047=function($c,s,r,d,u,S,g,SS){s.gridOptions={6048:{data:'gridData[6048]',columnDefs:[{field:'$$',width:30,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'m-grid-cell-contents\' ><span><a ui-sref=\'6048({ ID_6048:row.entity.$$rID})\'><i class=\'fa fa-folder\'></i></a></span></div>'},{field:'ID',width:'*',displayName:'ID'},{field:'Name',width:'*',displayName:'Name',cellTemplate:'<div class=\'m-grid-cell-contents \'><span class=\'control-label\' ng-bind-html=\'row.entity.Name | trustedHTML\'></span></div>'},{field:'FilingType',width:'*',displayName:'Filing Type'},{field:'LeavePayrollItem',width:'*',displayName:'LeavePayroll Item'},{field:'IsActive',width:'*',displayName:'Active',cellTemplate:'<div class=\'m-grid-cell-contents\'><div style=\'margin-top:-3px!important;\' class=\'smart-form noselect for_checkbox material-switch\'><input  id=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'checkbox\' name=\'IsActive\' class=\'form-checkbox\' ng-model=\'row.entity.IsActive\' /><label for=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'label-default\'></label></div></div>'},{field:'DaysLate',width:'*',displayName:'Days Late'},{field:'DaysAdvance',width:'*',displayName:'Days Advance'},{field:'MinimumAdvanceFiling',width:'*',displayName:'Minimum Advance Filing'},{field:'IsAllowedCurrentWorkDate',width:'*',displayName:'Allowed Current Work Date',cellTemplate:'<div class=\'m-grid-cell-contents\'><div style=\'margin-top:-3px!important;\' class=\'smart-form noselect for_checkbox material-switch\'><input  id=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'checkbox\' name=\'IsAllowedCurrentWorkDate\' class=\'form-checkbox\' ng-model=\'row.entity.IsAllowedCurrentWorkDate\' /><label for=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'label-default\'></label></div></div>'},{field:'$delete',width:20,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRow(6048,row,"")\'  ><i class=\'fa fa-times\'></i></a></span></div>'},],totalServerItems:r.totalServerItems[6048],enableColumnResizing: false,currentSortColumn:'ID',currentSortDirection:'DESC',registerApi : function(events){s.gridEvents[6048] = events;s.gridEvents[6048].on.sortChange(s,function(opts){s.refreshGrid(6048, opts.currentPageSize, opts.currentPage, opts.currentSortColumn, opts.currentSortDirection, s.filter[6048]);});s.gridEvents[6048].on.pageChange(s, function(opts){s.refreshGrid(6048, opts.currentPageSize, opts.currentPage, opts.currentSortColumn, opts.currentSortDirection, s.filter[6048]);});},},};for(var i in r.columnDefinitions){if(r.columnDefinitions[i].length>0){s.gridOptions[i].columnDefs=r.columnDefinitions[i];}};for(var i in r.groups){if(r.groups[i].length>0){s.gridOptions[i].groups=r.groups[i];}};setTimeout(function () {s.filter={6048:{},};});s.treeViewOptions={};$c('BaseListController',{$scope:s,resources:r});};app.register.controller('c6047',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session',c6047]);});