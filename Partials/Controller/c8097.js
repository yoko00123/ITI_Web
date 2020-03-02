'use strict';define(['app'],function(app){var c8097=function($c,s,r,d,u,S,g,SS,ck){$c('BaseFormController',{$scope:s,resources:r});s.mID=8097;s.rID=S.params.ID_8097;s.goBack=function(){s.goPrevious('8096');};s.gridOptions={8098:{data:'Detail[8098]',enableSorting:true,columnDefs:[{field:'ID',width:'*',displayName:'ID'},{field:'Date',width:'*',displayName:'Date',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellTemplate:'<div ng-form name=\'x\' ng-class="{ \'has-error\' : x.Date.$invalid && appScope.mainform.$submitted }" ><div class=\'input-group\'><input type=\'text\' name=\'Date\' date-format=\'MM/dd/yyyy\' placeholder=\'Date\'  required  disabled  bs-datepicker data-container=\'body\' date-to-iso class=\'form-control\' ng-model=\'row.entity.Date\'/><span class=\'input-group-addon\'><i class=\'fa fa-calendar\'></i></span></div></div>'},{field:'ID_HalfDay',width:'*',displayName:'Duration',cellTemplate:'<div ng-form name=\'x\' ng-class="{ \'has-error\' : x.ID_HalfDay.$invalid && appScope.mainform.$submitted }" ><select name=\'ID_HalfDay\' ng-options=\'item.ID as item.Name for item in appScope.dropdown_source[11340]\' required  class=\'form-control\' ng-model=\'row.entity.ID_HalfDay\'><option value>- Select -</option></select>'},{field:'WithPay',width:'*',displayName:'With Pay',cellTemplate:'<div class=\'smart-form noselect material-switch\'><input id=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'checkbox\' name=\'WithPay\'  disabled class=\'form-checkbox\' ng-model=\'row.entity.WithPay\'/><label for=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'label-default\'></label></div>'},{field:'Days',width:'*',displayName:'Days'},{field:'Comment',width:'*',displayName:'Comment',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'Comment\' placeholder=\'Comment\'  class=\'form-control\' ng-model=\'row.entity.Comment\'/></div>'},{field:'ID_Leave',width:'*',displayName:'ID_Leave',visible:false,cellTemplate:'<input type=\'hidden\' name=\'ID_Leave\' class=\'form-control\' ng-model=\'row.entity.ID_Leave\'/>'},{field:'$delete',width:20,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRow(8098,row,"Are you sure?")\'  ng-show=\'appScope.Master.IsPosted == false\'  ><i class=\'fa fa-times\'></i></a></span></div>'},],},8099:{data:'Detail[8099]',enableSorting:true,columnDefs:[{field:'ID',width:'*',displayName:'ID'},{field:'IsUsedForOffset',width:'*',displayName:'IsUsedForOffset',visible:false,cellTemplate:'<input type=\'hidden\' name=\'IsUsedForOffset\' class=\'form-control\' ng-model=\'row.entity.IsUsedForOffset\'/>'},{field:'FileDate',width:'*',displayName:'File Date',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellTemplate:'<div ng-form name=\'x\' ><div class=\'input-group\'><input type=\'text\' name=\'FileDate\' date-format=\'MM/dd/yyyy\' placeholder=\'File Date\'  required  disabled  bs-datepicker data-container=\'body\' date-to-iso class=\'form-control\' ng-model=\'row.entity.FileDate\'/><span class=\'input-group-addon\'><i class=\'fa fa-calendar\'></i></span></div></div>'},{field:'WorkDate',width:'*',displayName:'Work Date',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellTemplate:'<div ng-form name=\'x\' ><div class=\'input-group\'><input type=\'text\' name=\'WorkDate\' date-format=\'MM/dd/yyyy\' placeholder=\'Work Date\'  required  disabled  bs-datepicker data-container=\'body\' date-to-iso class=\'form-control\' ng-model=\'row.entity.WorkDate\'/><span class=\'input-group-addon\'><i class=\'fa fa-calendar\'></i></span></div></div>'},{field:'StartTime',width:'*',displayName:'Start Time',headerCellTemplateUrl:'mgrid/headerCellTemplateTime.html',cellTemplate:'<div ng-form name=\'x\' ><div class=\'input-group\'><input type=\'text\' name=\'StartTime\' placeholder=\'Start Time\'  required  disabled  bs-timepicker time-to-iso data-container=\'body\' class=\'form-control\' ng-model=\'row.entity.StartTime\'/><span class=\'input-group-addon\'><i class=\'fa fa-clock-o\'></i></span></div></div>'},{field:'EndTime',width:'*',displayName:'End Time',headerCellTemplateUrl:'mgrid/headerCellTemplateTime.html',cellTemplate:'<div ng-form name=\'x\' ><div class=\'input-group\'><input type=\'text\' name=\'EndTime\' placeholder=\'End Time\'  required  disabled  bs-timepicker time-to-iso data-container=\'body\' class=\'form-control\' ng-model=\'row.entity.EndTime\'/><span class=\'input-group-addon\'><i class=\'fa fa-clock-o\'></i></span></div></div>'},{field:'ExpirationDate',width:'*',displayName:'Expiration Date',headerCellTemplateUrl:'mgrid/headerCellTemplateDate.html',cellTemplate:'<div ng-form name=\'x\' ><div class=\'input-group\'><input type=\'text\' name=\'ExpirationDate\' date-format=\'MM/dd/yyyy\' placeholder=\'Expiration Date\'  disabled  bs-datepicker data-container=\'body\' date-to-iso class=\'form-control\' ng-model=\'row.entity.ExpirationDate\'/><span class=\'input-group-addon\'><i class=\'fa fa-calendar\'></i></span></div></div>'},{field:'ComputedHours',width:'*',displayName:'Computed Hours',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'ComputedHours\' placeholder=\'Computed Hours\'  required  disabled  class=\'form-control\' ng-model=\'row.entity.ComputedHours\'/></div>'},{field:'ConsideredHours',width:'*',displayName:'Considered Hours',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'ConsideredHours\' placeholder=\'Considered Hours\'  required  disabled  class=\'form-control\' ng-model=\'row.entity.ConsideredHours\'/></div>'},{field:'ApprovedHours',width:'*',displayName:'Approved Hours',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'ApprovedHours\' placeholder=\'Approved Hours\'  required  disabled  class=\'form-control\' ng-model=\'row.entity.ApprovedHours\'/></div>'},{field:'DayType',width:'*',displayName:'Day Type',cellTemplate:'<div class=\'ngCellText\'><span class=\'control-label\' ng-bind-html=\'row.entity.DayType | trustedHTML\'></span></div>'},{field:'FollowingDay',width:'*',displayName:'Following Day',cellTemplate:'<div class=\'smart-form noselect material-switch\'><input id=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'checkbox\' name=\'FollowingDay\'  disabled class=\'form-checkbox\' ng-model=\'row.entity.FollowingDay\'/><label for=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'label-default\'></label></div>'},{field:'Reason',width:'*',displayName:'Reason',cellTemplate:'<div ng-form name=\'x\' ><input type=\'text\' name=\'Reason\' placeholder=\'Reason\'  disabled  class=\'form-control\' ng-model=\'row.entity.Reason\'/></div>'},{field:'$delete',width:20,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRowByCommand(8099,row,"Are you sure?")\'  ng-show=\'appScope.Master.IsPosted == false && appScope.Master.ID_FilingStatus != 4\'  ><i class=\'fa fa-times\'></i></a></span></div>'},],},};};app.register.controller('c8097',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session','ckFormPristine',c8097]);});