'use strict';define(['app'],function(app){var c2010=function($c,s,r,d,u,S,g,SS,ck){$c('BaseFormController',{$scope:s,resources:r});s.mID=2010;s.rID=S.params.ID_2010;s.goBack=function(){s.goPrevious('2009');};s.gridOptions={2011:{data:'Detail[2011]',enableSorting:true,columnDefs:[{field:'ID',width:'*',displayName:'ID'},{field:'ID_EmployeeChangeOfSchedule',width:'*',displayName:'ID_EmployeeChangeOfSchedule',visible:false,cellTemplate:'<input type=\'hidden\' name=\'ID_EmployeeChangeOfSchedule\' class=\'form-control\' ng-model=\'row.entity.ID_EmployeeChangeOfSchedule\'/>'},{field:'SchedDate',width:'*',displayName:'Date',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellTemplate:'<div ng-form name=\'x\' ><div class=\'input-group\'><input type=\'text\' name=\'SchedDate\' date-format=\'MM/dd/yyyy\' placeholder=\'Date\'  required  disabled  bs-datepicker data-container=\'body\' date-to-iso class=\'form-control\' ng-model=\'row.entity.SchedDate\'/><span class=\'input-group-addon\'><i class=\'fa fa-calendar\'></i></span></div></div>'},{field:'OldSched',width:'*',displayName:'Old Schedule',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'OldSched\' placeholder=\'Old Schedule\'  disabled  class=\'form-control\' ng-model=\'row.entity.OldSched\'/></div>'},{field:'ID_NewSched',width:'*',displayName:'New Schedule',cellTemplate: '<div ng-form name=\'x\' ng-class="{ \'has-error\' : x.ID_NewSched.$invalid && appScope.mainform.$submitted }" ><div class=\'input-group\'><input target-name=\'row.entity.NewSched\' target-value=\'row.entity.ID_NewSched\' target-source=\'appScope.lookup_source[3029]\' target-addon=\'ID_NewSched_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'text\' cid=\'3029\' placeholder=\'New Schedule\'  ng-form-lookup  class=\'form-control\' ng-model=\'row.entity.NewSched\'/><br><input type=\'hidden\'  required  name=\'ID_NewSched\' ng-model=\'row.entity.ID_NewSched\' /><span ID=\'ID_NewSched_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'input-group-addon\'><i class=\'fa fa-list\'></i></span></div></div>'},{field:'ID_ForRDSD',width:'*',displayName:'RD/SD',cellTemplate:'<div ng-form name=\'x\' ><select name=\'ID_ForRDSD\' ng-options=\'item.ID as item.Name for item in appScope.dropdown_source[3030]\' class=\'form-control\' ng-model=\'row.entity.ID_ForRDSD\'><option value>- Select -</option></select>'},{field:'Comment',width:'*',displayName:'Comment',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'Comment\' placeholder=\'Comment\'  class=\'form-control\' ng-model=\'row.entity.Comment\'/></div>'},{field:'$delete',width:20,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRow(2011,row,"Are you sure?")\'  ng-show=\'appScope.Master.IsPosted == false\'  ><i class=\'fa fa-times\'></i></a></span></div>'},],},5029:{data:'Detail[5029]',enableSorting:true,columnDefs:[{field:'ID',width:'*',displayName:'ID'},{field:'Name',width:'*',displayName:'File',cellTemplate:'<div class=\'smart-form input-group\' style=\'width:100%\' ng-form name=\'x\' ng-class="{ \'has-error\' : x.Name.$invalid && appScope.mainform.$submitted }" ><label for=\'file\' class=\'input input-file\'><div class=\'button\' ng-if=\'row.entity.Name == null\'><input type=\'file\' name=\'Name\'  required file-input ng-file-select=\'appScope.onFileSelect($files,5029,"Name",row.$$rowIndex)\'ng-model=\'row.entity.Name\'/>Browse</div><input type=\'text\' ng-model=\'row.entity.Name\' placeholder=\'Select files...\' readonly></label><span class=\'input-group-addon\' ng-if=\'row.entity.ID > 0 && row.entity.Name !== null\' download-file=\'{{row.entity.Name_GUID}}\' filename=\'{{row.entity.Name}}\'><i class=\'fa fa-download\'></i></span></div>'},{field:'$delete',width:20,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRow(5029,row,"Are you sure?")\'  ng-show=\'appScope.Master.IsPosted == false && (appScope.Master.ID_FilingStatus == 1 || appScope.Master.ID_FilingStatus == 4)\'  ><i class=\'fa fa-times\'></i></a></span></div>'},],},};};app.register.controller('c2010',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session','ckFormPristine',c2010]);});