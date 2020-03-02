'use strict';

define(['app'], function (app) {
    var _isNotMobile = (function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return !check;
    })();

    app.constant('isNotMobile', _isNotMobile);

    app.config(['$stateProvider', '$stickyStateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'cfpLoadingBarProvider', function ($stateProvider, $stickyStateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, cfpLoadingBarProvider) {
        //var c = (app.forDev == 1 ? '' : 'Build/' + app.SystemVersion + '/') + (app.ClientCustomFolder == '' ? 'CustomPartials/' : 'ClientCustomPartials/' + app.ClientCustomFolder + '/') + 'Controller/',
        //    v = (app.forDev == 1 ? '' : 'Build/' + app.SystemVersion + '/') + (app.ClientCustomFolder == '' ? 'CustomPartials/' : 'ClientCustomPartials/' + app.ClientCustomFolder + '/') + 'View/';
        var c = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? '' : 'Build/' + app.PublishID + '/') + 'CustomPartials/Controller/',
            v = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? '' : 'Build/' + app.PublishID + '/') + 'CustomPartials/View/';
        //LOADING PROVIDER
        cfpLoadingBarProvider.includeSpinner = false;
        
        if (!_isNotMobile) {
            angular.element("body").addClass("mobile-detected mobile-view-activated");
        } else {
            angular.element("body").addClass("menu-on-top desktop-detected");
        }

        function rD(q, R, dependencies) {
            var d = q.defer();
            require(dependencies, function () {
                d.resolve();
                R.$apply();
            });
            return d.promise;
        };

        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

        var PrintReport = function (s, d, mI, data) {
            //console.log(data.rID);
            var cUrl = window.location.href;
            //console.log(cUrl);
            var iframe = $("<iframe class='iframe_report col-md-12' />");
            iframe.attr("style", "height:850px;"); //width:1000px;
            iframe.attr("src", "ModulePage/Report.aspx?menuID=" + data.mID + "&refID=" + data.rID + "&params=");
            iframe.attr("id", "frame_" + data.mID);
            setTimeout(function () {
                //$(".modal-dialog").attr("style", "width:1100px;");
                $("#modal-report").attr("align", "center");
                $("#modal-report").append(iframe);
            }, 500);
            s.cancel = function () {
                mI.dismiss();
            }
        }
        app.register.controller('PrintReport', ['$scope', 'dataService', '$modalInstance', 'data', PrintReport]);


        var cLoadColumns = function (s, mI, data) {
            s.columns = data.columns;
            angular.forEach(s.columns, function (cols) {
                if (cols.visible === undefined) {
                    cols.visible = true;
                }
            });
            s.colException = data.colException;
            var c = s.colException.split(",");
            s.check = false;
            s.checkAll = function () {
                s.check = !s.check;
                angular.forEach(s.columns, function (cols) {
                    if (c.indexOf(cols.field) == -1) {
                        cols.visible = s.check;
                    }
                });
            }

            s.Cancel = function () {
                mI.dismiss('Canceled');
            };

            s.Load = function () {
                mI.close(s.columns);
            };
        };
        app.register.controller('cLoadColumns', ['$scope', '$modalInstance', 'data', cLoadColumns]);

        var ColumnSelection = function (s, mI, data) {
            s.columns = data.columns;
            angular.forEach(s.columns, function (cols) {
                if (cols.ID > 0) {
                    cols.visible = true;
                }
            });

            s.check = false;
            s.checkAll = function () {
                s.check = !s.check;
                angular.forEach(s.columns, function (cols) {
                    if (c.indexOf(cols.field) == -1) {
                        cols.visible = s.check;
                    }
                });
            }

            s.Cancel = function () {
                mI.dismiss('Canceled');
            };

            s.Load = function () {
                mI.close(s.columns.filter(function (col) { return col.visible === true; }));
            };
            s.kanbanSortOptions = {
                itemMoved: function (event) {
                    console.log(event);
                    //event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
                },
                orderChanged: function (event) {
                },
                containment: '#column-selection'
            };

        };
        app.register.controller('ColumnSelection', ['$scope', '$modalInstance', 'data', ColumnSelection]);
        var S = [];

        // DO NOT REMOVE 
        // 404
        S.push({
            name: 'Unauthorized',
            stateName: 'Unauthorized',
            url: '/404',
            templateUrl: v + 'Unauthorized.html',
            controller: ['$scope', '$state', '$rootScope', function (s, S, R) {
                s.GoBack = function () {
                    if (R.prevState == undefined) {
                        window.location = 'index.aspx';
                    } else {
                        S.go(R.prevState.name, R.prevParams, { reload: true, inherit: false, notify: true });
                    }

                }

            }]
        });

        // Update
        S.push({
            name: 'Update',
            stateName: 'Update',
            url: '/Update',
            templateUrl: v + 'Update.html',
            controller: ['$scope', '$state', '$rootScope', function (s, S, R) {
                //s.GoBack = function () {
                //    if (R.prevState == undefined) {
                //        window.location = 'index.aspx';
                //    } else {
                //        S.go(R.prevState.name, R.prevParams, { reload: true, inherit: false, notify: true });
                //    }

                //}

            }]
        });

        //CUSTOM ROUTES STARTS HERE

        S.push({
            name: '1',
            stateName: 'Home',
            url: '/Home',
            controller: 'c1',
            templateUrl: v + 'c1.html',
            mID: 1,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    var d = [c + 'c1.js'];
                    return rD(q, R, d);
                }],
                resources: ['dataService', function (d) {
                    return d.getAllResources(1, 0, 0);
                }],
                filesummary: ['dataService', function (d) {
                    return d.getIonsFileSummary();
                }]
            }
        });

        //S.push({
        //    name: '5009',
        //    stateName: 'Accounts',
        //    url: '/Accounts/{ID_5009}', //:[0-9]+
        //    controller: 'c5009',
        //    templateUrl: v + 'c5009.html',
        //    mID: 5009,
        //    resolve: {
        //        load: ['$q', '$rootScope', function (q, R) {
        //            return rD(q, R, [c + 'c5009.js']);
        //        }],
        //        resources: ['dataService', '$stateParams', function (d, S) {
        //            return d.getResources(5009, S.ID_5009, 0);//(S.ID_5009 ? parseInt(S.ID_5009) : 0)
        //        }],
        //        parameters: ['dataService', '$stateParams', function (d, S) {

        //            return d.GetWebParameters().then(function (results) {
        //                return results;
        //            });
        //        }]
        //    }
        //});

        S.push({
            name: '5018',
            stateName: 'Skins',
            url: '/Skins/{ID_5018}',
            controller: 'c5018',
            templateUrl: v + 'c5018.html',
            mID: 5018,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c5018.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.getResources(5018, S.ID_5018, 0);
                }]
            }
        });

        S.push({
            name: '5042',
            stateName: 'Users',
            url: '/Users/{ID_5042}',
            controller: 'c5042',
            templateUrl: v + 'c5042.html',
            mID: 5042,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c5042.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.getResources(5042, S.ID_5042, 0);
                }],
                parameters: ['dataService', '$stateParams', function (d, S) {

                    return d.GetWebParameters().then(function (results) {
                        return results;
                    });
                }]
            }
        });

        //S.push({
        //    name: '5024',
        //    stateName: 'Personal Info',
        //    url: '/{ID_5024}',
        //    controller: 'c5019',
        //    templateUrl: v + 'c5019.html',
        //    mID: 5024,
        //    resolve: {
        //        load: ['$q', '$rootScope', function (q, R) {
        //            return rD(q, R, [c + 'c5019.js']);
        //        }],
        //        resources: ['dataService', '$stateParams', 'Session', function (d, S, Session) { 
        //            return d.getResources(5019, Session.data.$$ID_Employee, 0);
        //        }]
        //    }
        //});


        S.push({
            name: '5019',
            stateName: 'Info',
            url: '/Personal Info/{ID_5019}',
            controller: 'c5019',
            templateUrl: v + 'c5019.html',
            mID: 5019,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c5019.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.getResources(5019, S.ID_5019, 0);
                }]
            }
        });

        S.push({
            name: '8070',
            stateName: 'MyApproval',
            url: '/{ID_8070}',
            controller: 'c8070',
            templateUrl: v + 'c8070.html',
            mID: 8070,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c8070.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.getResources(8070, S.ID_8070, 0);
                }]
            }
        });

        S.push({
            name: '8071',
            stateName: 'My Approvals',
            url: '/MyApproval/{ID_8071}?m',
            controller: 'c8071',
            templateUrl: v + 'c8071.html',
            mID: 8071,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c8071.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.getResources(8071, S.ID_8071, 0);
                }]
            }
        });

        S.push({
            name: '8084',
            stateName: 'My Direct Reports',
            url: '/My-Direct-Reports/{ID_8084}?m&s',
            controller: 'c8084',
            templateUrl: v + 'c8084.html',
            mID: 8084,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c8084.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.DirectReportDataSource(8084);
                }]
            }
        });

        S.push({
            name: '4031',
            stateName: 'Announcement Maintenance',
            url: '/Announcement-Maintenance/{ID_4031}?m&s&e',
            controller: 'c4031',
            templateUrl: v + 'c4031.html',
            mID: 4031,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c4031.js']);
                }],
                resources: ['dataService', '$stateParams', function (d, S) {
                    return d.getResources(4031, S.ID_4031, 0);
                }]
            }
        });

        S.push({
            name: '5011',
            stateName: 'Employee Info',
            url: '/Employee-Info/{Filter_5011}',
            controller: 'c5011',
            templateUrl: v + 'c5011.html',
            mID: 5011,
            resolve: {
                load: ['$q', '$rootScope', function (q, R) {
                    return rD(q, R, [c + 'c5011.js']);
                }],
                resources: ['dataService', '$stateParams', 'Session', function (d, S, Session) {
                    return d.getResources(5011, Session.data.$$ID_Employee, 0);
                }]
            }
        });

        angular.forEach(S, function (state) {
            try {
                $stateProvider.state(state);
            } catch (e) {
                console.log('Duplicate states - ', state.mID);
            }
        });

        $urlRouterProvider.otherwise("/Home");

    }]);

    app.factory('Session', ['dataService', function (dataService) {
        var Session = {
            data: {},
            updateSession: function () {
                return dataService.getSession().then(function (result) {
                    return result.session;
                });
            }
        };
        return Session;
    }]).factory('ckFormPristine', ['$rootScope', 'dialogs', '$state', '$timeout', function ($rootScope, dialogs, $state, $timeout) {
        var a = function ($scope) {
            var removeListener = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (!$scope.mainform) return;
                if ($scope.mainform.$pristine) return;

                if ((toState == fromState && angular.toJson(toParams) == angular.toJson(fromParams))) return;
                if (toState.name == "Unauthorized") return;
                for (var a in toParams) {
                    for (var b in fromParams) {
                        if (parseInt(fromParams[b]) == 0 && parseInt(toParams[a]) > 0) return;
                        break;
                    }
                    break;
                }


                var dlg = dialogs.confirm(undefined, "There are some changes. Do you want to proceed?", { size: 'sm', keyboard: true, backdrop: true });
                dlg.result.then(function (btn) {
                    $state.go(toState.name, toParams, { notify: false }).then(function () {
                        $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
                    });
                    //return;
                }, function (btn) {

                });

                event.preventDefault();
            });

            $scope.$on("$destroy", removeListener);
            $scope.$on('$viewContentLoaded', function () {
                try {
                    $timeout(function () { $scope.mainform.$setPristine(); });
                } catch (e) {
                    console.log(e);
                    console.log('Mainform does not exists.');
                }
            });
        };
        return { check: a };
    }]).service('browser', ['$window', function ($window) {

        return {
            test: function () {

                var userAgent = $window.navigator.userAgent;

                var browsers = { chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i };

                for (var key in browsers) {
                    if (browsers[key].test(userAgent)) {
                        return key;
                    }
                };

                return 'unknown';
            }
        }

    }]);

    app.run(['$rootScope', 'dataService', '$modalStack', 'Session', '$http', '$cookies', '$state', '$timeout', '$document', function ($rootScope, dataService, $modalStack, Session, $http, $cookies, $state, $timeout, $document) {
        //#TODO
        //POSSIBLE NA MAHULI UNG PAG LOAD NG SESSION.. FOR TESTING
        //console.log($cookies);
        $http.defaults.headers.post['X-CSRF-Token'] = $cookies['XSRF-TOKEN'];
        //Session.updateSession().then(function (results) { Session.data = results; });
        var sess = LZString.decompressFromEncodedURIComponent($cookies['SESS-TOKEN']); //console.log(sess);
        var json = JSON.parse(sess);
        Session.data = json;
        //if (Session.data.ID_UserGroup == Session.data.ApplicantUserGroup) {
        //    if (Session.data.isFirstLog) {
        //        $state.go("1061", { ID_1061: Session.data.$$ID_Persona });
        //    } else {
        //        //$state.go("4197", {});
        //        $state.go("1061", { ID_1061: Session.data.$$ID_Persona });
        //    }
        //} else {
        //if (Session.data.isFirstLog) {
        //$state.go("5009", { ID_5009: Session.data.$$ID_User });
        //}
        //else {
        //    $state.go("1", {});
        //}
        //}
        var TimeOutTimerValue = json.TimeOutExpire * 1000;

        // Start a timeout
        var TimeOut_Thread = $timeout(function () { LogoutByTimer() }, TimeOutTimerValue);
        var bodyElement = angular.element($document);

        /// Keyboard Events
        bodyElement.bind('keydown', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('keyup', function (e) { TimeOut_Resetter(e) });

        /// Mouse Events	
        bodyElement.bind('click', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('mousemove', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('DOMMouseScroll', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('mousewheel', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('mousedown', function (e) { TimeOut_Resetter(e) });

        /// Touch Events
        bodyElement.bind('touchstart', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('touchmove', function (e) { TimeOut_Resetter(e) });

        /// Common Events
        bodyElement.bind('scroll', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('focus', function (e) { TimeOut_Resetter(e) });


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name !== 'Unauthorized') { $rootScope.prevState = fromState; $rootScope.prevParams = fromParams; }
            if (!dataService.HasAccess(toState.mID)) {
                event.preventDefault();
                return false;
            }
        });

        function LogoutByTimer() {
            window.location.href = "logout.aspx";
        }

        function TimeOut_Resetter(e) {

            /// Stop the pending timeout
            $timeout.cancel(TimeOut_Thread);

            /// Reset the timeout
            TimeOut_Thread = $timeout(function () { LogoutByTimer() }, TimeOutTimerValue);
        }


        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name == "") { $rootScope.prevSuccessState = fromState; $rootScope.prevSuccessParams = fromParams; }
            else { $rootScope.prevSuccessState = null; $rootScope.prevSuccessParams = null; }
            //console.log('$stateChangeSuccess', toState.name == fromState.name ,toParams != fromParams)
            if (toState.name == fromState.name && toParams != fromParams) {
                var top = $modalStack.getTop();
                if (top) {
                    $modalStack.dismiss(top.key);
                }
            }
        });
    }]);

});