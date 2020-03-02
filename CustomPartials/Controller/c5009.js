'use strict';
define(['app'], function (app) {
    var c5009 = function (s, r, d, u, S, g, T, SS, ck, Di, p) {
        var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
        if (r.error !== undefined) {
            g.add(r.error, 'danger', 5000);
        }
        s.Sum = function (row, field) {
            return u.Sum(row, field);
        };
        s.Max = function (row, field) {
            return u.Max(row, field);
        };
        s.Min = function (row, field) {
            return u.Min(row, field);
        };
        s.Ave = function (row, field) {
            return u.Ave(row, field);
        };
        s.mID = 5009;
        s.rID = S.params.ID_5009;//(S.params.ID_5009) ? parseInt(S.params.ID_5009) : 0;
        s.goPrevious = function () {
            S.go('5008', {}, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        s.Session = SS.data;
        s.Master = r.Master;
        s.Parent = r.Parent;
        s.Detail = r.Detail;
        s.dropdown_source = r.dropdown_source;
        s.rdb_source = r.rdb_source;
        s.autocomplete_source = r.autocomplete_source;
        s.text_autocomplete_source = r.text_autocomplete_source;
        s.gridOptions = {};
        s.removeRow = function (mID, row) {
            if (row.entity.ID == 0) {
                s.Detail[mID].splice(row.rowIndex, 1);
            } else {
                d.GridDelete(mID, row.entity.ID).then(function (results) {
                    s.Detail[mID].splice(row.rowIndex, 1);
                });
            }
        };
        s.setID = function (data, target, b) {
            data[target.substring(3)] = b.Name;
            data[target] = b.ID;
        };
        s.getAutoCompleteItems = function (mID, colID, value) {
            return d.getAutoCompleteItems(mID, colID, value).then(function (results) {
                return results.items;
            });
        };
        s.tabs = [];
        s.tabs.activeTab = (localStorage.getItem("mID") == s.mID ? (localStorage.getItem("tab") == undefined ? 0 : localStorage.getItem("tab")) : 0);
        localStorage.removeItem("mID");
        localStorage.removeItem("tab");
        s.loadedTab = [];
        s.loadTab = function (mID) {
            if (s.loadedTab.indexOf(mID) == -1) {
                d.loadTab(mID, s.rID, S.params.e).then(function (results) {
                    s.Detail[mID] = results.data;
                    s.loadedTab.push(mID);
                });
            }
        };
        s.selectedFiles = [];
        s.onFileSelect = function ($files, mID, name, idx) {
            for (var i = 0; i < s.selectedFiles.length; i++) {
                if (s.selectedFiles[i].mID == mID && s.selectedFiles[i].name == name && s.selectedFiles[i].idx == idx) {
                    s.selectedFiles.splice(i, 1);
                    break;
                }
            }
            s.selectedFiles.push({
                'file': $files[0],
                'mID': mID,
                'name': name,
                'idx': idx
            });
        };

        s.loadPasswordDialog = function () {
            var dlg = Di.create(dialogPath +'/c5009Dialog.html',
                'c5009Dialog',
                { 'id': s.rID, 'isFirstLog': s.Master.IsFirstLog, 'id_session': s.Session.ID_User, 'p': p, 'Di': Di },
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
        };

        s.loadSecurityQuestionDialog = function () {
            s.SecretQuestion = {};
            d.getSecurityQuestion().then(function (res) {
                s.SecretQuestion = res.data;
                var dlg = Di.create(dialogPath + '/c5009SQDialog.html', 'c5009SQDialog',
                { 'id': s.rID, 'SecretQuestion': s.SecretQuestion, 'p': p, 'Di': Di },
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            });
        };

        s.CascadingDropdown = function (mID, colID, value, dropdown) {
            d.CascadingDropdown(mID, colID, value).then(function (results) {
                var a = dropdown.split(",");
                for (var i = 0; i < a.length; i++) {
                    s.dropdown_source[a[i]] = results.data[a[i]];
                }
            });
        };

        s.notifyExpiredPassword = function () {

            var dlg = Di.notify("Password", "Password is expired, please change your password.",
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function (results) {
            }, function () {
            });
        };
        
        if (s.Session.isPasswordExpired) {
            s.notifyExpiredPassword();
        };
        
        ck.check(s);

    };
    app.register.controller('c5009', ['$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', '$templateCache', 'Session', 'ckFormPristine', 'dialogs', 'parameters', c5009]);

    var c5009Dialog = function (s, d, mI, data, g, Di) {

        s.Title = "Password";
        s.Data = {
            'ID': data.id,
            'ID_Session': data.id_session,
            'Password': null,
            'NewPassword': null,
            'ConfirmPassword': null,
            'IsFirstLog': data.isFirstLog
        };

        s.cancel = function () {
            mI.dismiss('Canceled');
        };
        
        s.savedPassword = function () {
            
            var dlg = Di.notify("Password", "Successfully changed password.",
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function (results) {
                window.location = "LogOut.aspx";
            }, function () {
                
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

    app.register.controller('c5009Dialog', ['$scope', 'dataService', '$modalInstance', 'data', 'growlNotifications', 'dialogs', c5009Dialog]);

    var c5009SQDialog = function (s, d, mI, data, g, Di) {
        s.general = {};
        s.general.mainform = {};
        setTimeout(function () {
            s.general.mainform.$submitted = 1;
        },100);
        s.Title = "Security Question";
        s.SecretQuestion = data.SecretQuestion;
        s.Data = {
            'ID': data.id,
            'ID_SecretQuestion': null,
            'SecretAnswer': null,
            'NewID_SecretQuestion': null,
            'NewSecretAnswer': null
        };

        s.cancel = function () {
            mI.dismiss('Canceled');
        };

        s.saveSQ = function () {

            var dlg = Di.notify("Password", "Successfully changed security question.",
                { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function (results) {
                window.location.reload();
            }, function () {

            });

        };

        s.save = function () {
            if (s.general.mainform.$valid) {
                d.SaveSQ(s.Data).then(function (results) {
                    if (results.message.length > 0) {
                        g.add(results.message, "danger", 5000);
                    } else {
                        s.cancel();
                        s.saveSQ();
                    }
                });
            }
        };
    };

    app.register.controller('c5009SQDialog', ['$scope', 'dataService', '$modalInstance', 'data', 'growlNotifications', 'dialogs', c5009SQDialog]);
    
});