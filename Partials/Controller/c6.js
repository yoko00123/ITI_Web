'use strict';define(['app'],function(app){var c6=function($c,s,r,d,u,S,g,SS){s.gridOptions={7:{data:'gridData[7]',multiSelect:true,multiSelectIf:'row.entity.IsPosted == false && row.entity.ID_FilingStatus == 1',columnDefs:[{field:'$$',width:30,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'m-grid-cell-contents\' ><span><a ui-sref=\'7({ ID_7:row.entity.$$rID})\'><i class=\'fa fa-folder\'></i></a></span></div>'},{field:'ID',width:'*',displayName:'ID'},{field:'FileDate',width:'*',displayName:'Date Filed',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellFilter:'date:\'MM/dd/yyyy\''},{field:'WorkDate',width:'*',displayName:'Work Date',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellFilter:'date:\'MM/dd/yyyy\''},{field:'Reason',width:'*',displayName:'Reason',cellTemplate:'<div class=\'m-grid-cell-contents \'><span class=\'control-label\' ng-bind-html=\'row.entity.Reason | trustedHTML\'></span></div>'},{field:'IsPosted',width:'*',displayName:'Posted',cellTemplate:'<div class=\'m-grid-cell-contents\'><div style=\'margin-top:-3px!important;\' class=\'smart-form noselect for_checkbox material-switch\'><input  id=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'checkbox\' name=\'IsPosted\'  disabled class=\'form-checkbox\' ng-model=\'row.entity.IsPosted\' /><label for=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'label-default\'></label></div></div>'},{field:'FilingStatus',width:'*',displayName:'Filing Status'},{field:'ApproverStatus',width:'*',displayName:'Approver Status'},{field:'ApprovalHistory',width:'*',displayName:'Approval History',cellTemplate:'<div class=\'m-grid-cell-contents \'><span class=\'control-label\' ng-bind-html=\'row.entity.ApprovalHistory | trustedHTML\'></span></div>'},{field:'PreviousApproverComment',width:'*',displayName:'Previous Comment',cellTemplate:'<div class=\'m-grid-cell-contents \'><span class=\'control-label\' ng-bind-html=\'row.entity.PreviousApproverComment | trustedHTML\'></span></div>'},],totalServerItems:r.totalServerItems[7],enableColumnResizing: true,currentSortColumn:'ID',currentSortDirection:'DESC',enableSorting:true,useExternalSorting:true,enablePagination:true,useExternalPagination:true,registerApi : function(events){s.gridEvents[7] = events;s.gridEvents[7].on.sortChange(s,function(opts){s.refreshGrid(7, opts.currentPageSize, opts.currentPage, opts.currentSortColumn, opts.currentSortDirection, s.filter[7]);});s.gridEvents[7].on.pageChange(s, function(opts){s.refreshGrid(7, opts.currentPageSize, opts.currentPage, opts.currentSortColumn, opts.currentSortDirection, s.filter[7]);});},},};for(var i in r.columnDefinitions){if(r.columnDefinitions[i].length>0){s.gridOptions[i].columnDefs=r.columnDefinitions[i];}};for(var i in r.groups){if(r.groups[i].length>0){s.gridOptions[i].groups=r.groups[i];}};setTimeout(function () {s.filter={7:{},};});s.treeViewOptions={};$c('BaseListController',{$scope:s,resources:r});};app.register.controller('c6',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session',c6]);});