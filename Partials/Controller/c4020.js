'use strict';define(['app'],function(app){var c4020=function($c,s,r,d,u,S,mI,g,SS,ck){$c('BaseFormController',{$scope:s,resources:r});s.mID=4020;s.rID=S.params.ID_4020;s.close=function(){mI.dismiss('close');S.go('^',{reload:true});};s.goPrevious=function(){S.go('^',{reload:true});};s.gridOptions={};};app.register.controller('c4020',['$controller','$scope','resources','dataService','utilService','$state','$modalInstance','growlNotifications','Session','ckFormPristine',c4020]);});