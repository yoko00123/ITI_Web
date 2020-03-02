'use strict';define(['app'],function(app){var c7049=function($c,s,r,d,u,S,g,SS,ck){$c('BaseFormController',{$scope:s,resources:r});s.mID=7049;s.rID=S.params.ID_7049;s.goBack=function(){s.goPrevious('7047');};s.gridOptions={7050:{data:'Detail[7050]',enableSorting:true,columnDefs:[{field:'ID',width:'*',displayName:'ID'},{field:'ID_Approver',width:'*',displayName:'ID_Approver',visible:false,cellTemplate:'<input type=\'hidden\' name=\'ID_Approver\' class=\'form-control\' ng-model=\'row.entity.ID_Approver\'/>'},{field:'ID_ApprovalLevel',width:'*',displayName:'Approval Level',cellTemplate:'<div ng-form name=\'x\' ><select name=\'ID_ApprovalLevel\' ng-options=\'item.ID as item.Name for item in appScope.dropdown_source[8204]\' class=\'form-control\' ng-model=\'row.entity.ID_ApprovalLevel\'><option value>- Select -</option></select>'},{field:'ID_EmployeeApprover1',width:'*',displayName:'Employee Approver 1',cellTemplate: '<div ng-form name=\'x\' ><div class=\'input-group\'><input target-name=\'row.entity.EmployeeApprover1\' target-value=\'row.entity.ID_EmployeeApprover1\' target-source=\'appScope.lookup_source[8205]\' target-addon=\'ID_EmployeeApprover1_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'text\' cid=\'8205\' placeholder=\'Employee Approver 1\'  ng-form-lookup  class=\'form-control\' ng-model=\'row.entity.EmployeeApprover1\'/><br><input type=\'hidden\'  name=\'ID_EmployeeApprover1\' ng-model=\'row.entity.ID_EmployeeApprover1\' /><span ID=\'ID_EmployeeApprover1_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'input-group-addon\'><i class=\'fa fa-list\'></i></span></div></div>'},{field:'ID_EmployeeApprover2',width:'*',displayName:'Employee Approver 2',cellTemplate: '<div ng-form name=\'x\' ><div class=\'input-group\'><input target-name=\'row.entity.EmployeeApprover2\' target-value=\'row.entity.ID_EmployeeApprover2\' target-source=\'appScope.lookup_source[8206]\' target-addon=\'ID_EmployeeApprover2_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'text\' cid=\'8206\' placeholder=\'Employee Approver 2\'  ng-form-lookup  class=\'form-control\' ng-model=\'row.entity.EmployeeApprover2\'/><br><input type=\'hidden\'  name=\'ID_EmployeeApprover2\' ng-model=\'row.entity.ID_EmployeeApprover2\' /><span ID=\'ID_EmployeeApprover2_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'input-group-addon\'><i class=\'fa fa-list\'></i></span></div></div>'},{field:'ID_EmployeeApprover3',width:'*',displayName:'Employee Approver 3',cellTemplate: '<div ng-form name=\'x\' ><div class=\'input-group\'><input target-name=\'row.entity.EmployeeApprover3\' target-value=\'row.entity.ID_EmployeeApprover3\' target-source=\'appScope.lookup_source[8207]\' target-addon=\'ID_EmployeeApprover3_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'text\' cid=\'8207\' placeholder=\'Employee Approver 3\'  ng-form-lookup  class=\'form-control\' ng-model=\'row.entity.EmployeeApprover3\'/><br><input type=\'hidden\'  name=\'ID_EmployeeApprover3\' ng-model=\'row.entity.ID_EmployeeApprover3\' /><span ID=\'ID_EmployeeApprover3_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'input-group-addon\'><i class=\'fa fa-list\'></i></span></div></div>'},{field:'isPowerApprover',width:'*',displayName:'Power Approver',cellTemplate:'<div class=\'smart-form noselect material-switch\'><input id=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' type=\'checkbox\' name=\'isPowerApprover\' class=\'form-checkbox\' ng-model=\'row.entity.isPowerApprover\'/><label for=\'someSwitchOptionPrimary_r{{row.$$uid}}_c{{column.$$uid}}\' class=\'label-primary\'></label></div>'},],},7051:{data:'Detail[7051]',enableSorting:true,columnDefs:[{field:'$$',width:30,sortable:false,resizable:false,displayName:' ',cellTemplate:'<div class=\'m-grid-cell-contents\' ng-if=\'row.entity.ID > 0\'><span><a ui-sref=\'7049.7051({ ID_7051:row.entity.$$rID})\'><i class=\'fa fa-folder\'></i></a></span></div>'},{field:'ID',width:'*',displayName:'ID'},{field:'ID_Approver',width:'*',displayName:'ID_Approver',visible:false,cellTemplate:'<input type=\'hidden\' name=\'ID_Approver\' class=\'form-control\' ng-model=\'row.entity.ID_Approver\'/>'},{field:'Employee',width:'*',displayName:'Employee',cellTemplate:'<div class=\'ngCellText\'><span class=\'control-label\' ng-bind-html=\'row.entity.Employee | trustedHTML\'></span></div>'},{field:'Department',width:'*',displayName:'Department',cellTemplate:'<div class=\'ngCellText\'><span class=\'control-label\' ng-bind-html=\'row.entity.Department | trustedHTML\'></span></div>'},],},};};app.register.controller('c7049',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session','ckFormPristine',c7049]);});