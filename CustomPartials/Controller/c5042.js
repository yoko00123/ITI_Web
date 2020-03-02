'use strict';
define(['app'], function (app) {
    var c5042 = function ($c, s, r, d, u, S, g, SS, ck, Di, p) {
        var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
        $c('BaseFormController', {
            $scope: s,
            resources: r
        });
        
        s.mID = 5042;
        s.rID = S.params.ID_5042;
        s.goPrevious = function () {
            S.go('5041', {}, {
                reload: true,
                inherit: false,
                notify: true
            });
        }; 
        s.$watch('Master.ID_Employee', function (nv, ov) {
            if (nv !== ov) {
                if (nv == undefined || nv == null) {
                    s.Master.Employee = '';
                } else {
                    var obj = s.lookup_source[6182].filter(function (x) {
                        return x.ID == nv
                    });
                    s.Master.Employee = obj[0]['Name'];
                }
            }
        }); 
      
        s.ChangePassword = function () { 
            var dlg = Di.create(dialogPath + '/UserPassword.html',
                'UserPassword',
                { 'id': s.rID, 'isFirstLog': s.Master.IsFirstLog, 'id_session': s.Session.ID_User, 'p': p, 'Di': Di },
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
        };

        s.gridOptions = {};
    };
    app.register.controller('c5042', ['$controller', '$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'ckFormPristine', 'dialogs', 'parameters', c5042]);

    var UserPassword = function (s, d, mI, data, g, Di) {
       
        s.typechange = 'password'
        s.keyupchange = function () {
            s.typechange = 'password';
        }
        s.keydownchange = function () {
            s.typechange = 'text';
        }
        s.Title = "Password";
        s.Data = {
            'ID': data.id,
            'ID_Session': data.id_session,
            'Password': null,
            'NewPassword': null,
            'ConfirmPassword': null,
            'IsFirstLog': data.isFirstLog
        };
        d.GetPassword(s.Data).then(function (results) {
            s.Data.Password = results.message
        });

        s.cancel = function () {
            mI.dismiss('Canceled');
        };

        s.savedPassword = function () { 
            var dlg = Di.notify("Password", "Successfully changed password.",
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function (results) {
                g.add("Password Changed.", "", 5000);
            }); 
        };

        s.save = function () {
            //null validation
            if (s.Data.NewPassword.length != 0 && s.Data.ConfirmPassword.length != 0) {
                //matching validation
                if (s.Data.NewPassword == s.Data.ConfirmPassword) {
                    //lenght validation
                    if (parseInt(s.Data.NewPassword.length) >= parseInt(data.p['PassWordSize'])) {
                        //alphanumeric validation
                        if (s.Data.NewPassword.match(/^[0-9a-zA-Z]+$/)) {
                            d.SavePassword(s.Data).then(function (results) {
                                if (results.message.length > 0) {
                                    g.add(results.message, "danger", 5000);
                                } else {
                                    s.cancel();
                                    s.savedPassword();
                                }
                            });
                        } else {
                            g.add("Please use an alphanumeric characters only.", 'danger', 5000);
                        }
                    } else {
                        g.add("Password minimum required character length is (" + data.p['PassWordSize'] + ").", 'danger', 5000);
                    }
                } else {
                    g.add("New password and confirm password did not match.", 'danger', 5000);
                }
            } else {
                g.add("Please provide a new password.", "", 5000);
            };
        };
    };

    app.register.controller('UserPassword', ['$scope', 'dataService', '$modalInstance', 'data', 'growlNotifications', 'dialogs', UserPassword]);
});