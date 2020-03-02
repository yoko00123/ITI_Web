'use strict';
define(['app'], function (app) {
    var c8084 = function ($c, s, r, d, u, S, g, SS, ck) {
        $c('BaseFormController', {
            $scope: s,
            resources: r
        }); 
        s.mID = 8084;
        s.rID = S.params.ID_8084; 
        s.EmployeeList = [];
        s.Employee = [];
        s.EmployeeLeaveCredit = [];
        s.EmployeeList = r.DirectReport;  
        s.SearchEmployee = (function (e) {
            return (function (d) {
                if (d.Name.toLowerCase().indexOf(e) >= 0 || e == undefined || d.Department.toLowerCase().indexOf(e) >= 0) {
                    return d;
                }
            });
        });
        s.SelectEmployee = (function (e) {
            s.Employee = e;
            d.EmployeeLeaveCredit(e.ID_Employee).then(function (a) { 
                s.EmployeeLeaveCredit = a.data;
            })
        })

        s.Init = (function () {
            var winsize = window.screen.availHeight;
            $(".left-panel-dr").height(winsize - 218);
            $(".Employee-Data").height(winsize - 238);
            $(".emp-list-container > ul").height(winsize - 318);
        })
    };
    app.register.controller('c8084', ['$controller', '$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'ckFormPristine', c8084]);
});