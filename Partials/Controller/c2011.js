'use strict';define(['app'],function(app){var c2011=function($c,s,r,d,u,S,mI,g,SS,ck){$c('BaseFormController',{$scope:s,resources:r});s.mID=2011;s.rID=S.params.ID_2011;s.close=function(){mI.dismiss('close');S.go('^',{reload:true});};s.goPrevious=function(){S.go('^',{reload:true});};s.$watch('Master.ID_NewSched', function(nv,ov){if(nv !== null){if (nv == undefined || nv == null) {s.Master.ID_NewSched = null;s.Master.NewSched = null;} else {var obj = s.lookup_source[3029].filter(function (x) { return x.ID == nv });s.Master.ID_NewSched = obj[0]['ID'];s.Master.NewSched = obj[0]['Name'];}}});s.gridOptions={};};app.register.controller('c2011',['$controller','$scope','resources','dataService','utilService','$state','$modalInstance','growlNotifications','Session','ckFormPristine',c2011]);});