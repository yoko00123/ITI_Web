'use strict';
define(['app'], function (app) {
    var c5011 = function ($c, s, r, d, u, S, g, SS, Di) {
        var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
        s.Master = {};
        s.Info = {}
        s.Master.Employee = SS.data.ID_Employee; 
        s.PersonaAddress = [];
        s.PersonaDependents = [];
        s.PersonaEmergencyContact = [];

        s.EmployeeChange = (function (id) {
            d.EmployeeInfo(id).then(function (empinfo) {
                s.Info = empinfo.data[0];
                d.GetTableData('1', 'Address,City,AddressType', 'ID_Persona', s.Info.ID_Persona).then(function (tabledata) {
                    s.PersonaAddress = tabledata.data;
                })
                d.GetTableData('2', 'Name,Relationship,BirthDate,Age', 'ID_Persona', s.Info.ID_Persona).then(function (tabledata) {
                    s.PersonaDependents = tabledata.data;
                })
                d.GetTableData('3', 'Name,Address,ContactNo,Relationship', 'ID_Persona', s.Info.ID_Persona).then(function (tabledata) {
                    s.PersonaEmergencyContact = tabledata.data;
                })
            })
        })

        s.IsNull = (function (data, dt) {
            if (data == null)
                return '-'
            else if (data != null && dt == 1)
                return moment(data).format('ll');
            else
                return data

        })
        s.ListEmployee = (function () {
            var dlg = Di.create(dialogPath + '/ListEmployee.html', 'ListEmployee', { 'Employee': s.EmployeeSource }, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function (ID) {
                s.EmployeeChange(ID)
            })
        });
        
        s.AddSpace = (function (colname) {
            return colname.replace(/([a-z])([A-Z])/g, '$1 $2')
        })

        s.Init = (function () {
            d.GetApproverEmployee(s.Master.Employee).then(function (result) {
                s.EmployeeSource = result.data;
            });
            s.EmployeeChange(s.Master.Employee);
        });
    };
    app.register.controller('c5011', ['$controller', '$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'dialogs', c5011]);

    var ListEmployee = function (s, d, mI, data, g, Di) {
        s.EmployeeSource = data.Employee;
        s.Select = (function (ID) {
            mI.close(ID);
        })
    };
    app.register.controller('ListEmployee', ['$scope', 'dataService', '$modalInstance', 'data', 'growlNotifications', 'dialogs', ListEmployee]);
});