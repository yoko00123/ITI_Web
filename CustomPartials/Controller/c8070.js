'use strict';
define(['app'], function (app) {
    var c8070 = function ($c, s, r, d, u, S, g, SS, ck) {
        $c('BaseFormController', {
            $scope: s,
            resources: r
        });
        s.mID = 8070;
        s.rID = S.params.ID_8070;
        s.goPrevious = function () {
            S.go('8071', {}, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        s.gridOptions = {};
        s.Init = (function () {
            d.GetPhotoEmployee(s.Master.ID_Employee).then(function (a) {
                s.EmployeePhoto = a.message;
            });
        });
        var __construct = (function () {
            s.Init();
        }(s));
    };
    app.register.controller('c8070', ['$controller', '$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'ckFormPristine', c8070]);
});