var app = angular.module('app', ['ui.bootstrap.carousel', 'ui.bootstrap.tpls', 'chieffancypants.loadingBar', 'ui.bootstrap', 'dialogs.main', 'growlNotifications']);
app.config(function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
});
app.controller('LoginCtrl', ['$scope', '$http', '$location', 'dialogs', 'growlNotifications', function ($scope, $http, $location, di, g) {
    function getInternetExplorerVersion() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }
    var IEVersion = getInternetExplorerVersion();
    if (IEVersion <= 8 && IEVersion > -1) {
        window.location = "update.html";
        return;
    }
    $scope.WithError = false;
    $scope.QuestionList = {};
    $http({
        url: "api/DataService/getSecurityQuestion",
        method: "POST",
    }).success(function (results, status, headers, config) {
        if (results.error != undefined) {
            g.add(results.error, "danger", 5000);
        } else {
            $scope.QuestionList = results.data;
        }
    }).error(function (data, status, headers, config) {
    });

    $scope.master = {
        'Username': '',
        'Password': ''
    };

    $scope.forgot_password = {
        'Username': '',
        'ID_SecurityQuestion': '',
        'SecurityAnswer': '',
    }

    $scope.registration = {
        'RegUsername': '',
        'RegPassword': '',
        'RegConfirmPassword': '',
        'RegFirstName': '',
        'RegLastName': ''
    };
    $scope.submitted = 0;
    $scope.register = 1;
    $scope.error_message = '';
    $scope.month = '';
    $scope.error_reg_message = '';
    $scope.success_message = '';
    $scope.IsSubmitting = false;
    $scope.isWait = false;
    $scope.timerTask = null;

    // LOGIN
    $scope.Login = function () {
        $scope.login_form.submitted = true;
        if (!$scope.login_form.txtusername.$invalid) {
            $scope.submitted = 1;
            if (!$scope.IsSubmitting) {
                $http({
                    url: "api/login/Login",
                    method: "POST",
                    data: LZString.compressToEncodedURIComponent(JSON.stringify($scope.master)),
                }).success(function (data, status, headers, config) {
                    if (data.isUserBlock == "False") {
                        if (data.isAuthenticated == "True") {
                            if (data.EnableCompanySelector == 1) {
                                $scope.companyList = {};
                                $http({
                                    url: "api/login/GetCompanies",
                                    method: "POST",
                                    data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                                }).success(function (data2, status, headers, config) {
                                    $scope.companyList = data2.data;
                                    var dlg = di.create('Dialogs/CompanySelector.html', 'cCompanyModal', { data: $scope.companyList }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                    dlg.result.then(function (obj) {
                                        if (obj != undefined) {
                                            $http({
                                                url: "api/login/AuthenticateCompany",
                                                method: "POST",
                                                data: LZString.compressToEncodedURIComponent(JSON.stringify({ "ID_SelectedCompany": obj, "data": data })),
                                            }).success(function (data3, status, headers, config) {
                                                if (data3.data.isAuthenticated == "True") {
                                                    if (data.IsSecretQuestionReady == 0) {
                                                        var dlg2 = di.create('Dialogs/SecurityQuestion.html', 'cSecurityQuestion', { 'data': $scope.QuestionList, 'data2': data }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                                    } else {
                                                        if (data.isFirstLog == "True" || data.isPasswordExpired == "True") {
                                                            var dlg = di.create('Dialogs/ChangePassword.html', 'ChangePassword', { data: data }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                                        }
                                                        else if (data.ID_UserGroup == data.ApplicantUserGroup) {
                                                            window.location = "Index.aspx#/Resume-Bank/" + data.indirectID_Persona;
                                                            //window.location = "Index.aspx#/ApplicantDashboard";
                                                        } else {
                                                            //alert(JSON.stringify($location.url()));
                                                            window.location = "Index.aspx#" + ($location.url() == undefined ? '' : $location.url());
                                                        }
                                                    }
                                                } else {
                                                    $scope.error_message = "Invalid username and/or password.";
                                                }
                                            }).error(function (data3, status, headers, config) {
                                                alert("ERROR");
                                            });
                                        }
                                    });
                                }).error(function (data, status, headers, config) {
                                    alert("ERROR");
                                });
                            } else {
                                if (data.IsSecretQuestionReady == 0) {
                                    var dlg2 = di.create('Dialogs/SecurityQuestion.html', 'cSecurityQuestion', { 'data': $scope.QuestionList, 'data2': data }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                } else {
                                    if (data.isFirstLog == "True" || data.isPasswordExpired == "True") {
                                        var dlg = di.create('Dialogs/ChangePassword.html', 'ChangePassword', { data: data }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                    }
                                    else if (data.ID_UserGroup == data.ApplicantUserGroup) {
                                        window.location = "Index.aspx#/Resume-Bank/" + data.indirectID_Persona;
                                        //window.location = "Index.aspx#/ApplicantDashboard";
                                    } else {
                                        //alert(JSON.stringify($location.url()));
                                        window.location = "Index.aspx#" + ($location.url() == undefined ? '' : $location.url());
                                    }
                                }
                            }
                        } else {
                            if (data.isWebUser == "0") {
                                $scope.error_message = "Account is tagged as desktop user, request permission denied.";
                                $scope.WithError = true;
                            } else {
                                $scope.error_message = "Invalid username/password.";
                                $scope.WithError = true;
                            }
                        }

                    } else {
                        var blDate = new Date(data.BlockedTime);
                        if (!$scope.timerTask) {
                            $scope.timerTask = setInterval(function () {
                                $scope.WithError = true;
                                var crDate = new Date(data.CurrentTime);
                                crDate.setSeconds(crDate.getSeconds() + 1);
                                data.CurrentTime = crDate.toString();
                                var tme = blDate.getTime() - crDate.getTime();
                                var hours = Math.trunc(((tme / 1000) / 60) / 60);
                                var minutes = Math.trunc((tme / 1000) / 60) - (hours * 60);
                                var seconds = Math.round((tme / 1000)) - ((minutes * 60) + ((hours * 60) * 60));
                                if (seconds == 60 ? minutes + 1 : minutes);
                                if (minutes == 60 ? hours + 1 : hours);
                                $scope.error_message = "You are blocked. Please wait " + (hours < 10 ? "0" + hours.toString() : hours.toString()) + ":" + (minutes < 10 ? "0" + minutes.toString() : minutes.toString()) + ":" + (seconds < 10 ? "0" + seconds.toString() : seconds.toString());
                                $scope.$apply();
                                if (hours == 0 && minutes == 0 && seconds == 0) {
                                    clearInterval($scope.timerTask);
                                    $scope.timerTask = null;
                                    $scope.error_message = "";
                                    $scope.WithError = false;
                                    $scope.$apply();
                                }
                            }, 1000);
                        }
                    }
                    $scope.IsSubmitting = false;
                }).error(function (data, status, headers, config) {
                    $scope.error_message = status;
                    $scope.WithError = true;
                    $scope.IsSubmitting = false;
                });
            }
            $scope.IsSubmitting = true;
            $scope.WithError = false;
        }

    };
    // FORGOT PASSWORD
    $scope.toggleForgotPassword = function () {
        $scope.register = 2; $scope.forgot_password.ID_SecurityQuestion = '';
    }
    $scope.ForgotPassword = function () {
        $scope.forgot_password.submitted = true;
        if (!$scope.forgot_password.txtusername.$invalid) {

            if (!$scope.IsSubmitting) {
                $scope.success_message = null;
                $scope.error_message = null;
                $scope.WithError = false;
                $http({
                    url: "api/login/ForgotPassword",
                    method: "POST",
                    data: LZString.compressToEncodedURIComponent(JSON.stringify($scope.forgot_password)),
                }).success(function (data, status, headers, config) {
                    if (data.success) {
                        $scope.success_message = "Email sent.";
                        $scope.forgot_password.Username = '';
                        $scope.forgot_password.ID_SecurityQuestion = '';
                        $scope.forgot_password.SecurityAnswer = '';
                        $scope.forgot_password.submitted = false;
                    }
                    else {
                        $scope.error_message = data.error;
                        $scope.WithError = true;
                    }
                    $scope.IsSubmitting = false;
                }).error(function (data, status, headers, config) {
                    $scope.error_message = status;
                    $scope.WithError = true;
                    $scope.IsSubmitting = false;
                });
            }
            $scope.IsSubmitting = true;
            $scope.WithError = false;
        }
    };

    // REGISTRATION
    $scope.ToggleRegister = function () {
        $scope.register = 3;
    }
    $scope.Register = function () {
        $scope.register_form.submitted = true;
        if (!$scope.register_form.txtRegUsername.$invalid && ($scope.registration.RegPassword == $scope.registration.RegConfirmPassword)) {
            $scope.submitted = 1;
            if (!$scope.IsSubmitting) {
                $http({
                    url: "api/login/Register",
                    method: "POST",
                    data: LZString.compressToEncodedURIComponent(JSON.stringify($scope.registration)),
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    if (data.isAuthenticated == "True") {

                        window.location = "Index.aspx#/Resume-Bank/" + data.indirectID_Persona;

                    } else {
                        console.log('ERROR')
                        $scope.error_reg_message = data.ErrorMessage;
                    }
                    $scope.IsSubmitting = false;
                }).error(function (data, status, headers, config) {
                    $scope.error_reg_message = status;
                    $scope.IsSubmitting = false;
                });
            }
            $scope.IsSubmitting = true;
        } else {
            if (!$scope.register_form.txtRegUsername.$invalid && !$scope.registration.RegPassword.$invalid && !$scope.registration.RegConfirmPassword.$invalid) {
                $scope.error_reg_message = "Error confirming password.";
                $scope.IsSubmitting = false;
            }

        }
    }

    $scope.Back = function () {
        $scope.register = 1;
        $scope.success_message = null;
        $scope.error_message = null;
        $scope.submitted = 0;
        $scope.clearFields();
    }
    $scope.clearFields = function () {
        for (var a in $scope.registration) {
            if ($scope.registration.hasOwnProperty(a)) {
                $scope.registration[a] = '';
            }
        }
    }

    $scope.ChangeForgotPassword = (function () {
        $scope.register = 2 
    })

    $scope.slides = [];
    init();
    function init() {
        $http({
            url: "api/DataService/Banner",
            method: "POST",
        }).success(function (results, status, headers, config) {
            angular.forEach(results.images, function (val) {
                $scope.slides.push({ image: 'Resources/Banner/' + val.image });
            });
        }).error(function (data, status, headers, config) {
        }); 
    }

    $scope.showPword = function (e) {
        $(e.target).removeClass("fa-lock");
        $(e.target).addClass("fa-unlock");
        $("#txtpassword").attr("type", "text");
    }

    $scope.revertPword = function (e) {
        $(e.target).addClass("fa-lock");
        $(e.target).removeClass("fa-unlock");
        $("#txtpassword").attr("type", "password");
    }

}]);

app.controller('cCompanyModal', ['$scope', '$http', '$location', '$modalInstance', 'data', function ($scope, $http, $location, mi, d) {
    $scope.cList = {};
    $scope.cList = d.data;
    $scope.Master = {};
    $scope.Master.ID_SelectedCompany = 0;
    if ($scope.cList.length == 1) {
        $scope.Master.ID_SelectedCompany = $scope.cList[0].ID;
    }
    $scope.close = function () {
        mi.close();
    }
    $scope.selectCompany = function () {
        mi.close($scope.Master.ID_SelectedCompany);
    }
}]);

app.controller('cSecurityQuestion', ['$scope', '$http', '$location', '$modalInstance', 'data', 'dialogs', function ($scope, $http, $location, mi, data, di) {
    $scope.Master = {};
    $scope.Master.ID_SecurityQuestion = "";
    $scope.Master.SecurityAnswer = "";
    $scope.cList = {};
    $scope.Master.IsSubmitted = false;
    $scope.cList = data.data;
    $scope.save = function () {
        $scope.Master.IsSubmitted = true;
        if ($scope.Master.mainform.$valid) {
            $http({
                url: "api/DataService/SaveSecretQuestion",
                method: "POST",
                data: LZString.compressToEncodedURIComponent(JSON.stringify($scope.Master)),
            }).success(function (results, status, headers, config) {
                if (results.data.isAuthenticated) {
                    if (data.data2.isFirstLog == "True" || data.data2.isPasswordExpired == "True") {
                        var dlg = di.create('Dialogs/ChangePassword.html', 'ChangePassword', { data: data }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                        mi.close();
                    } else {
                        if (data.data2.ID_UserGroup == data.data2.ApplicantUserGroup) {
                            window.location = "Index.aspx#/Resume-Bank/" + data.indirectID_Persona;
                            //window.location = "Index.aspx#/ApplicantDashboard";
                        } else {
                            window.location = "Index.aspx#" + ($location.url() == undefined ? '' : $location.url());
                        }
                    }
                } else {
                    alert(results.error);
                }
            }).error(function (data, status, headers, config) {
            });
        }
    }
    $scope.close = function () {
        mi.close();
    }
}]);

app.controller('ChangePassword', ['$scope', '$http', '$location', '$modalInstance', 'data', function ($s, $http, $location, mi, d) {
    $s.Data = {};
    $s.PasswordError = '';
    $s.Params = [];
    $http({
        url: "api/DataService/GetWebParameters",
        method: "POST"
    }).success(function (results, status, headers, config) {
        $s.Params = results;
    })
    $s.close = function () {
        mi.close();
    }
    $s.ChangePass = function () {
        //Match Validation
        if ($s.Data.Password === $s.Data.ConfirmPassword) {
            //Null Validation
            if ($s.Data.Password.length != 0) {
                //lenght validation
                if (parseInt($s.Data.Password.length) >= parseInt($s.Params['PassWordSize'])) {
                    //alphanumeric validation
                    if ($s.Data.Password.match(/^[0-9a-zA-Z]+$/)) {
                        $http({
                            url: "api/DataService/ChangePassword",
                            method: "POST",
                            data: LZString.compressToEncodedURIComponent(JSON.stringify($s.Data)),
                        }).success(function (results, status, headers, config) {
                            window.location = "Index.aspx#" + ($location.url() == undefined ? '' : $location.url());
                        })
                    } else {
                        $s.PasswordError = "Please use an alphanumeric characters only.";
                    }
                } else {
                    $s.PasswordError = "Password minimum required character length is (" + $s.Params['PassWordSize'] + ").";
                }
            } else {
                $s.PasswordError = "Please provide a new password.";
            };
        } else {
            $s.PasswordError = "Password not match!";
        }
    }
}]);