'use strict';define(['app'],function(app){var c8111=function($c,s,r,d,u,S,g,SS,ck){$c('BaseFormController',{$scope:s,resources:r});s.mID=8111;s.rID=S.params.ID_8111;s.goBack=function(){s.goPrevious('8110');};s.$watch('Master.ID_UnificationProjects', function(nv,ov){if(nv !== null){d.ReloadLookup(s.mID,11443, s.Master ).then(function(result){s.lookup_source[6187] = [];angular.forEach(result.data, function (item) {s.lookup_source[6187].push(item);});if(result.data.length == 1){s.Master[result.data[0].ColumnName] = result.data[0].ID;s.Master[result.data[0].ColumnName.substring(3, result.data[0].ColumnName.length)] = result.data[0].Name;}});if (nv == undefined || nv == null) {s.Master.ID_UnificationProjects = null;s.Master.UnificationProjects = null;} else {var obj = s.lookup_source[11443].filter(function (x) { return x.ID == nv });s.Master.ID_UnificationProjects = obj[0]['ID'];s.Master.UnificationProjects = obj[0]['Name'];}}});s.gridOptions={};};app.register.controller('c8111',['$controller','$scope','resources','dataService','utilService','$state','growlNotifications','Session','ckFormPristine',c8111]);});