'use strict';
define(['app'], function (app) {
    var c4031 = function ($c, s, r, d, u, S, g, SS, ck) {
        $c('BaseFormController', {
            $scope: s,
            resources: r
        });
        s.mID = 4031;
        s.rID = S.params.ID_4031;
        s.goBack = function () {
            s.goPrevious('4032');
        };
        s.BName = s.Master.isPosted ? 'Save' : 'Post';
        s.gridOptions = {
            5039: {
                data: 'Detail[5039]',
                enableSorting: true,
                columnDefs: [{
                    field: 'ID',
                    width: '*',
                    displayName: 'ID'
                }, {
                    field: 'Name',
                    width: '*',
                    displayName: 'File',
                    cellTemplate: '<div class=\'smart-form input-group\' style=\'width:100%\' ng-form name=\'x\' ng-class="{ \'has-error\' : x.Name.$invalid && appScope.mainform.$submitted }" ><label for=\'file\' class=\'input input-file\'><div class=\'button\' ng-if=\'row.entity.Name == null\'><input type=\'file\' name=\'Name\'  required file-input ng-file-select=\'appScope.onFileSelect($files,5039,"Name",row.$$rowIndex)\'ng-model=\'row.entity.Name\'/>Browse</div><input type=\'text\' ng-model=\'row.entity.Name\' placeholder=\'Select files...\' readonly></label><span class=\'input-group-addon\' ng-if=\'row.entity.ID > 0 && row.entity.Name !== null\' download-file=\'{{row.entity.Name_GUID}}\' filename=\'{{row.entity.Name}}\'><i class=\'fa fa-download\'></i></span></div>'
                }, {
                    field: '$delete',
                    width: 20,
                    sortable: false,
                    resizable: false,
                    displayName: ' ',
                    cellTemplate: '<div class=\'ngCellText row-del\'><span><a class=\'row-delete\' ng-click=\'appScope.removeRow(5039,row,"Are you sure, you want to delete the attachment?")\'  ><i class=\'fa fa-times\'></i></a></span></div>'
                }, ],
            },
        };
    };
    app.register.controller('c4031', ['$controller', '$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'ckFormPristine', c4031]);
});