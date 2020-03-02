'use strict';
define(['app'], function (app) {
    var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
    var findFormInvalid = function (ngForm) {
        var x = 0;
        for (var i in ngForm) {
            if (ngForm[i] && ngForm[i].hasOwnProperty && ngForm[i].hasOwnProperty('$invalid') && ngForm[i].$name != 'import-excel') {
                if (ngForm[i].$invalid) return x;
                x++;
            }
        }
        return 0;
    }

    var findMasterFormInvalid = function (ngForm) {
        var x = 1;
        for (var i in ngForm) {
            if (ngForm[i] && ngForm[i].hasOwnProperty && ngForm[i].hasOwnProperty('$invalid')) {
                if (String(ngForm[i].$name).indexOf("master") > -1) {
                    if (ngForm[i].$invalid) return x;
                    x++;
                }
            }
        }
        return 0;
    }

    var wDirectivesApp = angular.module('wDirectives', []);

    var menuDirective = function (c, $d, isNotMobile, d, Di) {
        /// <summary>MENU<br/>
        /// How to use: Add menus={data} as attribute to any html element
        /// {data} represents datasource of menu
        /// datasource must contains these properties - Name,ID,Children
        /// </summary>
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: { menus: '=', favourites: '=' },
            template: '<ul>' +
							'<li sly-repeat="menu in menus" ng-class="{ \'open && !isMenuOnTop() \' : menu.Collapsed }" >' + // ng-class="{ \'open\' : menu.Collapsed }"
								'<a href="" ng-if="menu.Children.length > 0" ng-click="collapse(menu)"  >' + // ng-click="collapse(menu)"
									//'<i class="fa fa-lg fa-fw fa-{{menu.ImageFile}}"></i>' +
                                    //'{{menu.Name}}' +
									'<span ng-if="menu.Label == \'\'" class="menu-item-parent">{{menu.Name}}</span>' +
                                    '<span ng-if="menu.Label != \'\'" class="menu-item-parent">{{menu.Label}}</span>' +
									'<b class="collapse-sign" ng-if="!menu.Collapsed && isMenuOnTop()"><em class="fa fa-plus-square-o"></em></b>' +
									'<b class="collapse-sign" ng-if="menu.Collapsed && isMenuOnTop()"><em class="fa fa-minus-square-o"></em></b>' +
								'</a>' +
                                '<a ng-if="menu.ViewCalendar == true" ng-click="loadCalendar()">' +
									//'<i class="fa fa-lg fa-fw fa-{{menu.ImageFile}}"></i>' +
									'<span ng-if="menu.Label == \'\'" class="menu-item-parent" >{{menu.Name}}</span>' +
                                    '<span ng-if="menu.Label != \'\'" class="menu-item-parent">{{menu.Label}}</span>' +
								'</a>'
                                +
								'<a context-menu="({{isfav(menu.ID)}} !== true ? addToFavourites : removeFromFavourites)" ng-if="menu.Children.length == 0 && (menu.Name!=\'Home\' && menu.Name!=\'ApplicantDashboard\') && menu.ViewCalendar == false" ui-sref="{{menu.ID}}" >' +
									//'<i class="fa fa-lg fa-fw fa-{{menu.ImageFile}}"></i>' +
									'<span ng-if="menu.Label == \'\'" class="menu-item-parent">{{menu.Name}}</span>' +
                                    '<span ng-if="menu.Label != \'\'" class="menu-item-parent">{{menu.Label}}</span>' +
								'</a>' +
                                //'<a class="home" ng-if="menu.Children.length == 0 && (menu.Name==\'Home\' || menu.Name==\'ApplicantDashboard\')" ui-sref="{{menu.ID}}" >' +
                                '<a class="home" ng-if="menu.Children.length == 0 && (menu.Name==\'Home\')" ui-sref="{{menu.ID}}" >' +
									'<i class="fa fa-lg fa-fw fa-home"></i>' +
								'</a>' +
								'<div ng-if="menu.Children.length > 0" ng-class="{ \'show\' : menu.Collapsed, \'hide\' : !menu.Collapsed }"  ng-recursive-menu menus="menu.Children" favourites="favourites" class="animate-show" ><div ng-transclude></div></div>' + // ng-class="{ \'show\' : menu.Collapsed }"  // 
							'</li>' +
            			'</ul>',
            compile: function (E, A, transclude) {
                var contents = E.contents().remove();
                var compiledContents;



                return function (s, iE, iA) {
                    s.isfav = function (id) {
                        var cnt = s.favourites.filter(function (x) { return x.mID == id }).length;
                        if (cnt > 0) {
                            return true
                        } else {
                            return false
                        }
                    }
                    s.addToFavourites = [
                        ['Add to bookmark', function ($itemScope, $event, color) {
                            var idx = $itemScope.$parent.$index;
                            var mID = $itemScope.menus[idx].ID;
                            var cnt = s.favourites.filter(function (x) { return x.mID == mID }).length;
                            if (cnt == 0) {
                                d.addToFavourites(mID).then(function (res) {
                                    if (res.data.type == "2") {
                                        g.add(res.data.msg, "danger", 5000);
                                    } else {
                                        s.favourites.push({ 'mID': mID, 'WebMenus': $itemScope.menus[idx].Name, 'url': '#/' + $itemScope.menus[idx].Name.replace(/ /g, '-') + '/', 'bgcolor': 'red', 'color': 'white', 'icon': '<i class="fa fa-music"></i>' });
                                    }
                                });
                            }
                        }]
                    ];
                    s.loadCalendar = function () {
                        //var dlg = Di.create('Dialogs/calendar.html', 'cCalendar', {}, { size: 'xl', keyboard: true, backdrop: true, windowClass: 'my-class calndar' });
                        var dlg = Di.create(dialogPath + '/fullCalendar.html', 'fullCalendar', {}, { size: 'xl', keyboard: true, backdrop: true, windowClass: 'my-class calndar' });
                    };
                    s.removeFromFavourites = [
                        ['Remove from bookmark', function ($itemScope, $event, color) {
                            var idx = $itemScope.$parent.$index;
                            var mID = $itemScope.menus[idx].ID;
                            var cnt = s.favourites.filter(function (x) { return x.mID == mID }).length;
                            if (cnt > 0) {
                                angular.forEach(s.favourites, function (obj, mIdx) {
                                    if (obj.mID == mID) {
                                        d.removeFromFavourites(mID).then(function (res) {
                                            if (res.data.type == "2") {
                                                g.add(res.data.msg, "danger", 5000);
                                            } else {
                                                s.favourites.splice(mIdx, 1);
                                            }
                                        });
                                    }
                                });
                            }
                        }]
                    ];

                    if (!compiledContents) {
                        compiledContents = c(contents, transclude);
                    };

                    s.collapse = function (menu) {
                        console.log(isNotMobile);
                        if (isNotMobile) return;
                        menu.Collapsed = !menu.Collapsed;
                        //if (!angular.element($d[0].body).hasClass("menu-on-top")) {


                        //}
                    };

                    s.isMenuOnTop = function () {
                        return !isNotMobile;
                    }

                    compiledContents(s, function (clone, s) {
                        iE.append(clone);
                    });
                };
            },
        };
    };

    wDirectivesApp.directive('ngRecursiveMenu', ['$compile', '$document', 'isNotMobile', 'dataService', 'dialogs', menuDirective]);

    var toggleHideNavDirective = function (R, $d, w) {
        return {
            restrict: 'A',
            link: function (s, E) {
                var Timer, body, updateClass;
                return body = angular.element($d[0].body), E.on("click", function (e) {
                    e.stopPropagation();
                    return body.hasClass("hidden-menu") ? body.removeClass("hidden-menu") : (body.addClass("hidden-menu"), R.$broadcast("hideNav:enabled")), e.preventDefault();
                }), Timer = void 0, updateClass = function () {
                    var width;
                    return width = w.innerWidth, 768 > width ? body.removeClass("hidden-menu") : void 0
                }, angular.element(w).bind('resize', function () {
                    var t;
                    return clearTimeout(t), t = setTimeout(updateClass, 300)
                })
                //    , angular.element(w).bind('click', function (e) {
                //    e.stopPropagation();
                //    if ($(e.target).closest("#left-panel").length)
                //        return;
                //    return body.hasClass("hidden-menu") ? body.removeClass("hidden-menu") : R.$broadcast("hideNav:enabled"), e.preventDefault();
                //})
            }
        };
    };

    wDirectivesApp.directive('toggleHideNav', ['$rootScope', '$document', '$window', toggleHideNavDirective]);

    var toggleFullScreenDirective = function (R, $d) {
        /// <summary>Toggles Full Screen<br/>
        /// How to use: Add toggle-full-screen as attribute to any html element
        /// </summary>
        return {
            restrict: 'A',
            link: function (s, E) {
                var body, el = document.documentElement;
                return body = angular.element($d[0].body), E.on("click", function (e) {
                    return body.hasClass("full-screen") ? (body.removeClass("full-screen"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : (body.addClass("full-screen"), el.requestFullscreen ? el.requestFullscreen() : el.mozRequestFullScreen ? el.mozRequestFullScreen() : el.webkitRequestFullscreen ? el.webkitRequestFullscreen() : el.msRequestFullscreen && el.msRequestFullscreen());
                });
            }
        };
    };

    wDirectivesApp.directive('toggleFullScreen', ['$rootScope', '$document', toggleFullScreenDirective]);

    var toggleDropdownDirective = function ($d) {
        /// <summary>Toggles Dropdown<br/>
        /// How to use: Add toggle-dropdown as attribute to any html element
        /// Required: html element as next sibling with class 'dropdown-menu'
        /// </summary>
        return {
            restrict: 'A',
            link: function (s, E) {
                var parent;
                return parent = E.parent(), $d.on("click", function (e) {
                    if (parent.hasClass("open")) { parent.removeClass("open"); }
                }), E.on("click", function (e) {
                    return parent.hasClass("open") ? parent.removeClass("open") : parent.addClass("open"), e.stopPropagation();
                });
            }
        };
    };

    wDirectivesApp.directive('toggleDropdown', ['$document', toggleDropdownDirective]);

    var toggleFilter = function () {
        return {
            restrict: 'A',
            link: function (s, E, A) {
                var mID = A.toggleFilter,
                    filter = angular.element("#grid-filter-" + mID),
                    bodyElement = angular.element('body'),
                    backdropElement = angular.element('<div class="aside-backdrop am-fade"/>');

                backdropElement.css({ position: 'fixed', top: '0px', left: '0px', bottom: '0px', right: '0px', 'z-index': '1038', display: 'block', 'background-color': 'rgba(0,0,0,.5)' });
                //<div class="aside-backdrop am-fade" style=""></div>

                function hideBackDrop() {
                    filter.addClass("hide");
                    backdropElement.remove();
                }
                return E.on("click", function (e) {
                    //console.log(E[0].getBoundingClientRect(), filter[0].getBoundingClientRect());
                    backdropElement.on('click', hideBackDrop);
                    bodyElement.append(backdropElement);
                    return filter.hasClass("hide") ? filter.removeClass("hide") : filter.addClass("hide"), filter.css({ 'top': 70 });
                });


            }
        };
    };

    wDirectivesApp.directive('toggleFilter', [toggleFilter]);

    // RIBBON DIRECTIVE
    var ribbonDirective = function (c) {
        return {
            restrict: 'EA',
            link: function (s, E, A) {
                //var options = iAttrs.ngRibbon || 'breadcrumbs';
                var t = '<div id="ribbon">' +
                            '<ol class="breadcrumb bcrumb">' +
                            '<li ng-repeat="breadcrumb in breadcrumbs">{{breadcrumb.name}}</li>' +
                            '</ol>' +
                        '</div>';
                t = c(t)(s)
                E.replaceWith(t);
            }
        };
    };

    wDirectivesApp.directive('ngRibbon', ['$compile', ribbonDirective]);


    // OVERLAY DIRECTIVE
    var wcOverlayDirective = function (q, t, w, httpInterceptor, g) {
        /// <summary>Loading overlay directive<br/>
        /// Description: creates an overlay for every server request exceeding 500 ms
        /// </summary>
        return {
            restrict: 'EA',
            transclude: true,
            s: {
                wcOverlayDelay: "@"
            },
            template: '<div id="overlay-container" class="overlayContainer">' +
						'<div id="overlay-background" class="overlayBackground"></div>' +
						'<div id="overlay-content" class="overlayContent" data-ng-transclude>' +
						'</div>' +
                      '</div>',
            link: function (s, element, A) {
                var overlayContainer = null,
                    timerPromise = null,
                    timerPromiseHide = null,
                    inSession = false,
                    ngRepeatFinished = true,
                    queue = [];

                init();

                function init() {
                    wireUpHttpInterceptor();
                    // if (window.jQuery) wirejQueryInterceptor();
                    overlayContainer = document.getElementById('overlay-container');



                }

                //Hook into httpInterceptor factory request/response/responseError functions                
                function wireUpHttpInterceptor() {

                    httpInterceptor.request = function (config) {
                        if (config.disableInterceptor == undefined || config.disableInterceptor == false) processRequest();
                        return config || q.when(config);
                    };

                    httpInterceptor.response = function (response) {
                        processResponse();
                        return response || q.when(response);
                    };

                    httpInterceptor.responseError = function (rejection) {
                        processResponse();
                        console.log(rejection.data);
                        g.add("Error occurred. Contact system administrator.", "danger", 5000);
                        return rejection || q.when(rejection);
                    };
                }
                //Monitor jQuery Ajax calls in case it's used in an app
                function wirejQueryInterceptor() {

                    $(document).ajaxStart(function () {
                        processRequest();
                    });

                    $(document).ajaxComplete(function () {
                        processResponse();
                    });

                    $(document).ajaxError(function () {
                        processResponse();
                    });

                    var $mylist = $("body");
                    $mylist.livequery('iframe', function (elem) {
                        processRequest();
                        $('iframe').ready(function (e) {
                            processResponse();
                        });
                    });

                }

                function processRequest() {
                    queue.push({});
                    //showOverlay();
                    if (queue.length == 1) {
                        timerPromise = t(function () {
                            if (queue.length) showOverlay();
                        }, s.wcOverlayDelay ? s.wcOverlayDelay : 300); //Delay showing for 300 millis to avoid flicker
                    }
                }
                //s.$on('$repeatFinished', function () {
                //    ngRepeatFinished = false;

                //    var timer = t(function () {
                //        if (!ngRepeatFinished) { ngRepeatFinished = true; }
                //        else { t.cancel(timer); }
                //    }, 50);
                //});
                function processResponse() {
                    queue.pop();
                    if (queue.length == 0) {
                        //Since we don't know if another XHR request will be made,pause before
                        //hiding the overlay. If another XHR request comes in then the overlay
                        //will stay visible which prevents a flicker
                        timerPromiseHide = t(function () {
                            //Make sure queue is still 0 since a new XHR request may have come in
                            //while timer was running
                            if (queue.length == 0) {
                                hideOverlay();
                                if (timerPromiseHide) t.cancel(timerPromiseHide);
                            }
                            //ngRepeatFinished = true;
                        }, s.wcOverlayDelay ? s.wcOverlayDelay : 300);
                    }
                }

                function showOverlay() {
                    var W = 0;
                    var h = 0;
                    if (!w.innerWidth) {
                        if (!(document.documentElement.clientWidth == 0)) {
                            W = document.documentElement.clientWidth;
                            h = document.documentElement.clientHeight;
                        }
                        else {
                            W = document.body.clientWidth;
                            h = document.body.clientHeight;
                        }
                    }
                    else {
                        W = w.innerWidth;
                        h = w.innerHeight;
                    }
                    var content = document.getElementById('overlay-content');
                    var contentWidth = parseInt(getComputedStyle(content, 'width').replace('px', ''));
                    var contentHeight = parseInt(getComputedStyle(content, 'height').replace('px', ''));

                    content.style.top = h / 2 - (isNaN(contentHeight) ? 0 : contentHeight) / 2 + 'px';
                    content.style.left = W / 2 - contentWidth / 2 + 'px';
                    overlayContainer.style.display = 'block';
                }

                function hideOverlay() {
                    if (timerPromise) t.cancel(timerPromise);
                    overlayContainer.style.display = 'none';
                }

                var getComputedStyle = function () {
                    var func = null;
                    if (document.defaultView && document.defaultView.getComputedStyle) {
                        func = document.defaultView.getComputedStyle;
                    } else if (typeof (document.body.currentStyle) !== "undefined") {
                        func = function (element, anything) {
                            return element["currentStyle"];
                        };
                    }

                    return function (element, style) {
                        return func(element, null)[style];
                    }
                }();
            }
        }
    },

    httpProvider = function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    },

    httpInterceptor = function () {
        return {}
    };



    //Empty factory to hook into $httpProvider.interceptors
    //Directive will hookup request,response,and responseError interceptors
    wDirectivesApp.factory('httpInterceptor', httpInterceptor);

    //Hook httpInterceptor factory into the $httpProvider interceptors so that we can monitor XHR calls
    wDirectivesApp.config(['$httpProvider', httpProvider]);

    //Directive that uses the httpInterceptor factory above to monitor XHR calls
    //When a call is made it displays an overlay and a content area 
    //No attempt has been made at this point to test on older browsers
    wDirectivesApp.directive('wcOverlay', ['$q', '$timeout', '$window', 'httpInterceptor', 'growlNotifications', wcOverlayDirective]);

    var authHttpResponseInterceptor = function ($q, $location, t, $injector) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    window.location = 'login.aspx';
                }

                if (rejection.status === 404 || rejection.status === 500) {
                    //console.log(rejection.status);
                    t(function () {
                        $location.path('/404');
                        setTimeout(function () {
                            var $modalStack = $injector.get('$modalStack');//di pde iinject(circular reference). manual injector to.
                            var top = $modalStack.getTop();
                            if (top) {
                                $modalStack.dismiss(top.key);
                            }
                        }, 150);
                    });
                }
                return $q.reject(rejection);
            }
        }
    }, httpAuthProvider = function ($httpProvider) {
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }

    wDirectivesApp.factory('authHttpResponseInterceptor', ['$q', '$location', '$timeout', '$injector', authHttpResponseInterceptor]);
    wDirectivesApp.config(['$httpProvider', httpAuthProvider]);

    var ngFormNew = function (S) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.mid, mType = A.mtype;
                E.on('click', function () {
                    var ID = 'ID_' + mID;
                    var params = {};
                    params[ID] = 0;
                    switch (parseInt(mType)) {
                        case 3:
                            S.go(String(mID), params);
                            break;
                        case 12: //DETAIL PAGE
                            if (S.current.name.split(".").indexOf(mID) == -1) {
                                S.go(S.current.name + '.' + mID, params);
                            } else {
                                S.go(S.current.name, params);
                            }

                            break;
                        default:

                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormNew', ['$state', ngFormNew]);

    var ngFormSave = function (d, g, S, Sp, Di, t) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var btnID = A.btnid, confirm = A.confirm, delay = A.delay;
                E.on('click', function () {
                    s.mainform.$submitted = true;
                    if (s.mainform.$valid) {
                        localStorage.setItem("mID", s.mID);
                        localStorage.setItem("tab", s.tabs.activeTab == undefined ? 0 : s.tabs.activeTab)
                        if (confirm === undefined) {
                            s.mainform.$setPristine();
                            d.Save(s.mID, s.rID, btnID, s.Master, s.Detail, s.selectedFiles, S.params.e)
                             .then(function (results) {
                                 if (results.messageType == 2) {
                                     g.add(results.message, "danger", 5000);
                                 } else {
                                     var ID = 'ID_' + s.mID;
                                     var params = {};
                                     params[ID] = results.ID; //console.log(S.current.name);

                                     for (var p in S.params) {
                                         if (p != ID) {
                                             params[p] = S.params[p]
                                         }
                                     }

                                     S.go(S.current, params, { reload: true, inherit: false, notify: true });
                                     g.add(results.message, "info", 5000);
                                 }
                                 s.mainform.$submitted = false;
                             });
                        } else {
                            var dlg = Di.confirm(undefined, confirm, { size: 'sm', keyboard: true, backdrop: true });
                            dlg.result.then(function (btn) {
                                s.mainform.$setPristine();
                                d.Save(s.mID, s.rID, btnID, s.Master, s.Detail, s.selectedFiles, S.params.e)
                                 .then(function (results) {
                                     if (results.messageType == 2) {
                                         g.add(results.message, "danger", 5000);
                                     } else {
                                         var ID = 'ID_' + s.mID;
                                         var params = {};
                                         params[ID] = results.ID; //console.log(S.current.name);
                                         for (var p in S.params) {
                                             if (p != ID) {
                                                 params[p] = S.params[p]
                                             }
                                         }
                                         S.go(S.current, params, { reload: true, inherit: false, notify: true });
                                         g.add(results.message, "info", 5000);
                                     }
                                     s.mainform.$submitted = false;
                                 });
                            }, function (btn) {
                                //NO
                            });
                        }


                    } else {
                        t(function () {
                            //|| 
                            if (s.mainform.$error.pattern) {
                                g.add('Invalid values on other fields.', "danger", 5000);
                            } else if (s.mainform.$error.minlength) {
                                g.add('Minimum length not reach.', "danger", 5000);
                            } else if (s.mainform.$error.maxlength) {
                                g.add('You have exceeded the max length.', "danger", 5000);
                            } else if (s.mainform.$error.ngMin) {
                                g.add('Input value does not meet the minimum value.', "danger", 5000);
                            } else if (s.mainform.$error.ngMax) {
                                g.add('Input value exceeded the maximum value.', "danger", 5000);
                            } else {
                                g.add('Fill all the required fields.', "danger", 5000);
                            }

                            s.tabs.activeTab = findFormInvalid(s['mainform']) - (delay == undefined ? 0 : delay);
                        });

                    }
                });

                s.$on('destroy', function () {
                    E.off();
                })
            }
        }
    };

    wDirectivesApp.directive('ngFormSave', ['dataService', 'growlNotifications', '$state', '$stateParams', 'dialogs', '$timeout', ngFormSave]);

    var ngFormGenerate = function (d, g, t, Di,sp) {
        return {
            restrict: 'EA',
            link: function (s, E, A) {
                var btnID = A.btnid,
                    targetmID = parseInt(A.targetMid),
                    targetTab = A.targetTab,
                    confirm = A.confirm;

                E.bind('click', function () {
                    s.mainform.$submitted = true;
                    var y = findMasterFormInvalid(s['mainform']);
                    if (y == 0) { //CHECKING   
                        if (confirm === undefined) {
                            d.Generate(s.mID, s.rID, btnID, s.Master, sp.e)
                            .then(function (results) {
                                if (results.messageType == 2) { //BEFORE EXECUTE
                                    g.add(results.message, "danger", 5000);
                                } else {
                                    g.add(results.message, "info", 5000);
                                    s.Detail[targetmID] = results.data;
                                    s.loadedTab.push(targetmID);
                                    s.tabs.activeTab = targetTab;
                                }
                                s.mainform.$submitted = false;
                            });
                        } else {
                            var dlg = Di.confirm(undefined, confirm, { size: 'sm', keyboard: true, backdrop: true });
                            dlg.result.then(function (btn) {
                                d.Generate(s.mID, s.rID, btnID, s.Master)
                                .then(function (results) {
                                    if (results.messageType == 2) { //BEFORE EXECUTE
                                        g.add(results.message, "danger", 5000);
                                    } else {
                                        g.add(results.message, "info", 5000);
                                        s.Detail[targetmID] = results.data;
                                        s.loadedTab.push(targetmID);
                                        s.tabs.activeTab = targetTab;
                                    }
                                    s.mainform.$submitted = false;
                                });
                            }, function (btn) {
                                //NO
                            });
                        }
                    } else {
                        t(function () {
                            g.add('Fill all the required fields.', "danger", 5000);
                            s.tabs.activeTab = y - 1;
                        });
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormGenerate', ['dataService', 'growlNotifications', '$timeout', 'dialogs', '$stateParams', ngFormGenerate]);

    var ngFormSpecialCommand = function (d, g, S, Di, t) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var btnID = A.btnid, confirm = A.confirm;
                E.bind('click', function () {
                    s.mainform.$submitted = true;
                    if (s.mainform.$valid) {
                        localStorage.setItem("mID", s.mID);
                        localStorage.setItem("tab", s.tabs.activeTab == undefined ? 0 : s.tabs.activeTab)
                        if (confirm === undefined) {
                            s.mainform.$setPristine();
                            d.SpecialCommand(s.mID, s.rID, btnID, s.Master, S.params.e)
                             .then(function (results) {
                                 if (results.messageType == 2) {
                                     g.add(results.message, "danger", 5000);
                                 } else {
                                     var ID = 'ID_' + s.mID;
                                     var params = {};
                                     params[ID] = results.ID;
                                     for (var p in S.params) {
                                         if (p != ID) {
                                             params[p] = S.params[p]
                                         }
                                     }
                                     if (results.ID == "0" && S.params.s === null) {
                                         S.go(results.mID, {}, { reload: true });
                                     } else if (results.ID == "0" && S.params.s !== null) {
                                         var paramname = JSON.parse('{"ID_' + S.params.m + '": "' + S.params.s + '"}')
                                         S.go(S.params.m, paramname, { reload: true })
                                     } else {
                                         S.go(S.current.name, params, { reload: true });
                                     }
                                     g.add(results.message, "info", 5000);
                                 }
                                 s.mainform.$submitted = false;
                             });
                        } else {
                            var dlg = Di.confirm(undefined, confirm, { size: 'sm', keyboard: true, backdrop: true });
                            dlg.result.then(function (btn) {
                                s.mainform.$setPristine();
                                d.SpecialCommand(s.mID, s.rID, btnID, s.Master, S.params.e)
                                 .then(function (results) {
                                     if (results.messageType == 2) {
                                         g.add(results.message, "danger", 5000);
                                     } else {
                                         var ID = 'ID_' + s.mID;
                                         var params = {};
                                         params[ID] = results.ID;
                                         for (var p in S.params) {
                                             if (p != ID) {
                                                 params[p] = S.params[p]
                                             }
                                         }
                                         if (results.ID == "0" && S.params.s === null) {
                                             S.go(results.mID, {}, { reload: true });
                                         } else if (S.params.s !== null) {
                                             var paramname = JSON.parse('{"ID_' + S.params.m + '": "' + S.params.s + '"}')
                                             S.go(S.params.m, paramname, { reload: true })
                                         } else {
                                             S.go(S.current.name, params, { reload: true });
                                         }
                                         g.add(results.message, "info", 5000);
                                     }
                                     s.mainform.$submitted = false;
                                 });
                            }, function (btn) {
                                //NO
                            });
                        }
                    } else {
                        t(function () {
                            g.add('Fill all the required fields.', "danger", 5000);
                            s.tabs.activeTab = findFormInvalid(s['mainform']);
                        });
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormSpecialCommand', ['dataService', 'growlNotifications', '$state', 'dialogs', '$timeout', ngFormSpecialCommand]);

    var ngFormPrint = function () {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var ID = A.ngFormPrint;
                E.bind('click', function () {
                    var printContents = document.getElementById(ID).innerHTML;
                    var originalContents = document.body.innerHTML;
                    // if (navigator.userAgent.toLowerCase().indexOf('chrome') < -1) {
                    // var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                    // popupWin.window.focus();
                    // popupWin.document.write('<!DOCTYPE html><html><head>' +
                    // '<link rel="stylesheet" type="text/css" href="Styles/System/bootstrap.3.2.min.css" />' + 
                    // '<link rel="stylesheet" type="text/css" href="Styles/Default/default.css"/>' +
                    // '<link rel="stylesheet" type="text/css" href="Styles/Default/additional.css"/>' +
                    // '<link rel="stylesheet" type="text/css" href="Styles/Skins/green.css"/>' +
                    // '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
                    // popupWin.onbeforeunload = function (event) {
                    // popupWin.close();
                    // return '.\n';
                    // };
                    // popupWin.onabort = function (event) {
                    // popupWin.document.close();
                    // popupWin.close();
                    // }
                    // } else {	
                    var popupWin = window.open('', '_blank', 'width=1200,height=800');
                    popupWin.document.open()
                    popupWin.document.write('<html><head>' +
                                            '<link rel="stylesheet" type="text/css" href="Styles/System/bootstrap.3.2.min.css" />' +
                                            '<link rel="stylesheet" type="text/css" href="Styles/System/ng-grid.css"/>' +
                                             '<link rel="stylesheet" type="text/css" href="Styles/System/font-awesome.min.css"/>' +
                                            '<link rel="stylesheet" type="text/css" href="Styles/Default/default.css"/>' +
                                            '<link rel="stylesheet" type="text/css" href="Styles/Default/additional.css"/>' +
                                            '<link rel="stylesheet" type="text/css" href="Styles/Skins/green.css"/>' +
                                            '</head><body onload="window.print()">' + printContents + '</html>');
                    popupWin.document.close();
                    // }

                });
            }
        }
    };

    wDirectivesApp.directive('ngFormPrint', ngFormPrint);

    var ngLoadColumns = function (d, Di) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.ngLoadColumns;
                E.on('click', function () {
                    var dlg = Di.create(dialogPath + '/LoadColumns.html', 'cLoadColumns', { 'columns': s.gridOptions[mID].columnDefs, 'colException': 'ID' }, { size: 'md', keyboard: true, backdrop: 'static' });
                    dlg.result.then(function (column) {
                        s.gridOptions[mID].columnDefs = column;
                        //s.gridOptions[mID].groups = ['Department'];
                        s.gridOptions[mID].$gridScope.firstAdjustmentLeft = false;
                        s.gridOptions[mID].ngGrid.lateBoundColumns = false;
                        s.gridOptions[mID].$gridScope.columns.length = 0;
                        s.gridOptions[mID].ngGrid.config.columnDefs = column;
                        //s.gridOptions[mID].ngGrid.config.groups = ['Department','JobClass'];
                        s.gridOptions[mID].ngGrid.buildColumns();
                        s.gridOptions[mID].ngGrid.eventProvider.assignEvents();
                        s.gridOptions[mID].$gridServices.DomUtilityService.RebuildGrid(
                            s.gridOptions[mID].$gridScope,
                            s.gridOptions[mID].ngGrid
                        );
                    }, function (result) {
                    });
                });
            }
        }
    };

    wDirectivesApp.directive('ngLoadColumns', ['dataService', 'dialogs', ngLoadColumns]);

    var ngColumnSelection = function (d, Di, g, S) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.ngColumnSelection;
                E.on('click', function () {
                    d.ColumnSelection(mID).then(function (results) {
                        var dlg = Di.create(dialogPath + '/ColumnSelection.html?v=' + Web_System_Version, 'ColumnSelection', { 'columns': results.data }, { size: 'md', keyboard: true, backdrop: 'static' });

                        dlg.result.then(function (columns) {
                            d.SaveColumnSelection(mID, columns).then(function (results) {

                                if (results.error.length > 0) {
                                    g.add(results.error, "danger", 5000);
                                } else {
                                    S.go(S.current, S.params, { reload: true, inherit: false, notify: true });
                                }
                            });
                            //console.log(columns);
                            //s.gridOptions[mID].columnDefs = column;
                            ////s.gridOptions[mID].groups = ['Department'];
                            //s.gridOptions[mID].$gridScope.firstAdjustmentLeft = false;
                            //s.gridOptions[mID].ngGrid.lateBoundColumns = false;
                            //s.gridOptions[mID].$gridScope.columns.length = 0;
                            //s.gridOptions[mID].ngGrid.config.columnDefs = column;
                            ////s.gridOptions[mID].ngGrid.config.groups = ['Department','JobClass'];
                            //s.gridOptions[mID].ngGrid.buildColumns();
                            //s.gridOptions[mID].ngGrid.eventProvider.assignEvents();
                            //s.gridOptions[mID].$gridServices.DomUtilityService.RebuildGrid(
                            //    s.gridOptions[mID].$gridScope,
                            //    s.gridOptions[mID].ngGrid
                            //);
                        }, function (result) {
                            //g.add(result, "danger", 5000);
                        });
                    });

                });
            }
        }
    };

    wDirectivesApp.directive('ngColumnSelection', ['dataService', 'dialogs', 'growlNotifications', '$state', ngColumnSelection]);


    var ngGenerateExcelTemplate = function (d, g, Di) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.mid, btnID = A.btnid, confirm = A.confirm;
                E.bind('click', function () {
                    if (confirm === undefined) {
                        d.GenerateExcelTemplate(mID, btnID, s.rID == undefined ? 0 : s.rID, s.Master);
                    } else {
                        var dlg = Di.confirm(undefined, confirm);
                        dlg.result.then(function (btn) {
                            d.GenerateExcelTemplate(mID, btnID, s.rID == undefined ? 0 : s.rID, s.Master);
                        }, function (btn) {
                            //NO
                        });
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngGenerateExcelTemplate', ['dataService', 'growlNotifications', 'dialogs', ngGenerateExcelTemplate]);

    var ngExportToExcel = function (d) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.mid;
                E.bind('click', function () {
                    var gridPagingState = s.gridEvents[mID].getGridPagingState();
                    d.ExportToExcel(mID, gridPagingState.currentPageSize, gridPagingState.currentPage, gridPagingState.currentSortColumn, gridPagingState.currentSortDirection, s.filter[mID], s.rID);
                });
            }
        }
    };

    wDirectivesApp.directive('ngExportToExcel', ['dataService', ngExportToExcel]);

    var ngAddNewRow = function (d, g, S) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.mid, mType = A.mtype;
                E.bind('click', function () {
                    d.AddNewRow(mID, s.Master, S.params.e)
                    .then(function (results) {
                        if (mType == '17') {
                            s.gridData[mID].push(results.data);
                        } else {
                            s.Detail[mID].push(results.data);
                        }

                        if (!s.$$phase) {
                            s.$apply();
                        }
                    });
                });

            }
        }
    };

    wDirectivesApp.directive('ngAddNewRow', ['dataService', 'growlNotifications', '$state', ngAddNewRow]);

    var ngBatchGridSave = function (d, g, S) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var btnID = A.btnid, mID = parseInt(A.mid);
                E.on('click', function () {
                    s['grid-' + mID].$submitted = true;
                    if (s['grid-' + mID].$valid) {
                        d.BatchGridSave(mID, btnID, s.gridData[mID])
                         .then(function (results) {
                             if (results.messageType == 2) {
                                 g.add(results.message, "danger", 5000);
                             } else {
                                 var ID = 'ID_' + s.mID;
                                 var params = {};
                                 params[ID] = results.ID;
                                 S.go(S.current.name, params, { reload: true });
                                 g.add(results.message, "info", 5000);
                             }
                             s['grid-' + mID].$submitted = false;
                         });
                    } else {
                        g.add('Fill all the required fields.', "danger", 5000);
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngBatchGridSave', ['dataService', 'growlNotifications', '$state', ngBatchGridSave]);

    var ngBatchGridDelete = function (d, g, S, $t, Di) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.mid, confirm = A.confirm;
                E.bind('click', function () {
                    var selectedItems = s.gridEvents[mID].getSelectedRows();
                    if (selectedItems.length == 0) {
                        $t(function () { g.add("Select a record.", "danger", 5000); }, 0);
                    } else {
                        if (confirm === undefined || confirm.length == 0) {
                            BatchDelete();
                        } else {
                            var dlg = Di.confirm(undefined, confirm, { size: 'sm', keyboard: true, backdrop: true });
                            dlg.result.then(function (btn) {
                                BatchDelete();
                            });
                        }

                    }
                });

                function BatchDelete() {
                    var selectedItems = s.gridEvents[mID].getSelectedRows();
                    var iDs = new Array();
                    for (var i = 0; i < selectedItems.length; i++) {
                        iDs.push(selectedItems[i].ID);
                    }
                    d.BatchGridDelete(mID, iDs)
                     .then(function (results) {
                         if (results.message != "") {
                             g.add(results.message, "danger", 5000);
                         } else {
                             S.go(S.current.name, {}, { reload: true });
                             g.add("Record deleted!", "danger", 5000);
                         }
                     });
                }
            }
        }
    };

    wDirectivesApp.directive('ngBatchGridDelete', ['dataService', 'growlNotifications', '$state', '$timeout', 'dialogs', ngBatchGridDelete]);

    var ngBatchGridCommand = function (d, g, S) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var mID = A.mid, btnID = A.btnid;
                E.bind('click', function () {
                    var selectedItems = s.gridEvents[mID].getSelectedRows();
                    if (selectedItems.length == 0) {
                        g.add("Select a record.", "danger", 5000);
                    } else {
                        var iDs = new Array();
                        for (var i = 0; i < selectedItems.length; i++) {
                            iDs.push(selectedItems[i].ID);
                        }

                        d.BatchGridCommand(mID, btnID, iDs)
                        .then(function (results) {
                            S.go(S.current.name, {}, { reload: true });
                            g.add(results.message, "info", 5000);
                        });

                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngBatchGridCommand', ['dataService', 'growlNotifications', '$state', ngBatchGridCommand]);

    var ngPublish = function (d, g) {
        return {
            restrict: 'EA',
            link: function (s, E, A) {
                E.bind('click', function () {
                    d.Publish(s.Master)
                    .then(function (results) {
                        g.add(results.message, "info", 5000);
                    });
                });
            }
        }
    };

    wDirectivesApp.directive('ngPublish', ['dataService', 'growlNotifications', ngPublish]);

    var ngNumericOnly = function () {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                E.bind('keydown', function (e) {
                    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                        return false;
                    }
                });
            }
        }
    }

    wDirectivesApp.directive('ngNumericOnly', [ngNumericOnly]);

    var ngCurrencyOnly = function () {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var fixedDecimal = A.fixedDecimal;

                E.bind('change keydown keyup', function (e) {
                    if (e.which != 8 && e.which != 0 && e.which != 190 && e.which != 110 && (e.which < 48 || e.which > 57)) {
                        return false;
                    }
                    if ((e.which == 190 || e.which == 110) && E.val().split(".").length - 1 >= 1) {
                        return false;
                    }
                });
                if (fixedDecimal != undefined) {
                    E.bind('blur', function (e) {
                        E.val(parseFloat(E.val()).toFixed(fixedDecimal));
                    });
                }

            }
        }
    }

    wDirectivesApp.directive('ngCurrencyOnly', [ngCurrencyOnly]);

    var validatedInput = function ($tooltip, $interval) {
        return {
            restrict: 'A',
            scope: {
                feedbackType: '@',
                label: '@',
                formValidation: '@' //,
                //tooltipMessage: '@'
            },
            link: function (scope, element, attrs) {
                var inputElement = element;
                //inputElement.wrap('<div class="form-group"></div>');
                var formGroup = inputElement.parent();

                //inputElement.before('<label class="control-label"></label>');
                //var formLabel = inputElement.prev();
                //formLabel.attr('for', attrs.id);
                //formLabel.html(scope.label);

                //var myTooltip = $tooltip(inputElement, {
                //    title: scope.tooltipMessage,
                //    trigger: 'manual',
                //    animation: 'am-flip-x',
                //    delay: {
                //        show: 500,
                //        hide: 100
                //    }
                //});

                function calculateFeedback(feedbackType) {
                    function removeAllFeedbackClasses() {
                        formGroup.removeClass('has-feedback');
                        formGroup.removeClass('has-success');
                        formGroup.removeClass('has-warning');
                        formGroup.removeClass('has-error');

                        formGroup.find('.form-control-feedback').remove();
                    }
                    removeAllFeedbackClasses();

                    if (feedbackType === 'SUCCESS') {
                        formGroup.addClass('has-success');
                    } else if (feedbackType === 'WARNING') {
                        formGroup.addClass('has-warning');
                    } else if (feedbackType === 'ERROR') {
                        formGroup.addClass('has-error');
                        //myTooltip.$scope.$show();
                        //$interval(function () {
                        //    myTooltip.$scope.$hide();
                        //}, 5000);
                    }

                }

                //calculateFeedback(scope.feedbackType);


                scope.$on('validateFormEvent', function (event, msg) {
                    //console.log(scope.formValidation);
                    if (scope.formValidation === 'true') {
                        calculateFeedback('SUCCESS');
                    } else {
                        calculateFeedback('ERROR');
                    }
                });


            }
        }
    }

    wDirectivesApp.directive('validatedInput', ['$tooltip', '$interval', validatedInput]);

    var wdraggable = function () {
        return {
            restrict: 'EA',
            link: function (scope, elem, $attr) {
                $(elem).draggable();
            }
        }
    }

    wDirectivesApp.directive('wdraggable', [wdraggable]);


    var dateToIso = function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.push(function (datepickerValue) {
                    return moment(datepickerValue).format("YYYY-MM-DD 00:00:00");
                });
            }
        };
    };

    wDirectivesApp.directive('dateToIso', [dateToIso]);

    var timeToIso = function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.push(function (timepickerValue) {
                    return moment(timepickerValue).format("YYYY-MM-DD HH:mm:ss");
                });
            }
        };
    };

    wDirectivesApp.directive('timeToIso', [timeToIso]);

    var countWatch = function () {
        return {
            restrict: 'A',
            link: function (s, E, A) {
                E.bind('click', function () {
                    //var root = angular.element(document.getElementsByTagName('body'));
                    //var watchers = [];

                    //var f = function (element) {
                    //    if (element.data().hasOwnProperty('$scope')) {
                    //        angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                    //            watchers.push(watcher);
                    //        });
                    //    }

                    //    angular.forEach(element.children(), function (childElement) {
                    //        f(angular.element(childElement));
                    //    });
                    //};

                    //f(root);

                    //console.log(watchers.length);
                    var root = angular.element(document.getElementsByTagName('body'));

                    var watchers = [];

                    var f = function (element) {
                        angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                            if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                                angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                                    watchers.push(watcher);
                                });
                            }
                        });

                        angular.forEach(element.children(), function (childElement) {
                            f(angular.element(childElement));
                        });
                    };

                    f(root);

                    // Remove duplicate watchers
                    var watchersWithoutDuplicates = [];
                    angular.forEach(watchers, function (item) {
                        if (watchersWithoutDuplicates.indexOf(item) < 0) {
                            watchersWithoutDuplicates.push(item);
                        }
                    });

                    console.log(watchersWithoutDuplicates.length);
                });

            }
        }
    };

    wDirectivesApp.directive('countWatch', [countWatch]);

    var fileInput = function () {
        return {
            require: 'ngModel',
            link: function (scope, el, attrs, ngModel) {

                el.bind('change', function (event) {
                    var fileName = el.val().split("\\");
                    scope.$apply(function () {
                        ngModel.$setViewValue(fileName[fileName.length - 1]);
                        ngModel.$render();
                    });
                });

            }
        }
    };

    wDirectivesApp.directive('fileInput', [fileInput]);

    var ngFormUpload = function (d, g, S, Sp) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var btnID = A.btnid;
                E.on('click', function () {
                    s.mainform.$submitted = true;
                    if (s.mainform.$valid) {
                        d.FormUpload(s.mID, s.rID, btnID, s.Master, s.Detail, s.selectedFiles)
                         .then(function (results) {
                             if (results.messageType == 2) {
                                 g.add(results.message, "danger", 5000);
                             } else {
                                 var ID = 'ID_' + s.mID;
                                 var params = {};
                                 params[ID] = results.ID; //console.log(S.current.name);
                                 //S.forceReload();
                                 //S.transitionTo(S.current.name, params, { reload: true });
                                 //S.transitionTo(S.current, params, { reload: true, inherit: true, notify: true });
                                 //S.go(S.current.name, params, { reload: false, inherit: true, notify: true });
                                 S.go(S.current, Sp, { reload: true, inherit: false, notify: true });
                                 g.add(results.message, "info", 5000);
                             }
                             s.mainform.$submitted = false;
                         });
                    } else {
                        g.add('Fill all the required fields.', "danger", 5000);
                        s.tabs.activeTab = findFormInvalid(s['mainform']);
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormUpload', ['dataService', 'growlNotifications', '$state', '$stateParams', ngFormUpload]);


    var downloadFile = function (d) {
        return {
            restrict: 'A',
            link: function (s, E, A) {
                var file = A.downloadFile, filename = A.filename;
                E.on("click", function () {
                    d.downloadFile('Upload/' + file, filename);
                });
            }
        };
    };

    wDirectivesApp.directive('downloadFile', ['dataService', downloadFile]);

    //var ngListing = function () {
    //    return {
    //        restrict: 'EA',
    //        scope: {
    //            data: '='
    //        },
    //        link: function (scope, el, attrs) {

    //            //Object.observe(scope.data, function (changes) {
    //            //    console.log(changes);
    //            //    React.renderComponent(
    //            //        list1010({ data: changes.newValue }),
    //            //        el[0]
    //            //    );
    //            //});

    //            //React.renderComponent(
    //            //    list1010({ data: scope.data }),
    //            //    el[0]
    //            //);


    //            scope.$watchCollection('data', function (newValue, oldValue) {
    //                React.renderComponent(
    //                    list1010({ data: newValue }),
    //                    el[0]
    //                );
    //                //$(el[0]).overscroll({ showThumbs: true, ignoreSizing: true, direction: "vertical" });
    //            });

    //        }
    //    }
    //};

    //wDirectivesApp.directive('ngListing', [ngListing]);

    //var ngReactListing = function () {
    //    return {
    //        restrict: 'E',
    //        scope: {
    //            data: '=',
    //            mid: '='
    //        },
    //        link: function (scope, el, attrs) {

    //            //Object.observe(scope.data, function (changes) {
    //            //    console.log(changes);
    //            //    React.renderComponent(
    //            //        list1010({ data: changes.newValue }),
    //            //        el[0]
    //            //    );
    //            //});

    //            //React.renderComponent(
    //            //    list1010({ data: scope.data }),
    //            //    el[0]
    //            //);

    //            if (scope.mid == "4091") {
    //                scope.$watchCollection('data', function (newValue, oldValue) {
    //                    React.renderComponent(
    //                        list4091({ data: newValue }),
    //                        el[0]
    //                    );
    //                });
    //            } else if (scope.mid == "4092") {
    //                scope.$watchCollection('data', function (newValue, oldValue) {
    //                    React.renderComponent(
    //                        list4092({ data: newValue }),
    //                        el[0]
    //                    );
    //                });
    //            }

    //        }
    //    }
    //};

    //wDirectivesApp.directive('ngReactListing', [ngReactListing]);

    //var ngOrgChart = function () {
    //    return {
    //        restrict: 'EA',
    //        scope: {
    //            data: '='
    //        },
    //        link: function (scope, el, attrs) {

    //            var a = scope.$watchCollection('data', function (newValue, oldValue) {
    //                React.renderComponent(
    //                    OrgChart({ data: newValue }),
    //                    el[0]
    //                );
    //                console.log(el[0], 'OrgChart');
    //                //$(el[0]).overscroll({ showThumbs: true });
    //                a();
    //            });

    //        }
    //    }
    //};

    //wDirectivesApp.directive('ngOrgChart', [ngOrgChart]);

    var overScroll = function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var defaults = {
                    showThumbs: true,
                    ignoreSizing: true
                };
                var options = ['direction'];
                angular.forEach(options, function (c) {
                    if (angular.isDefined(attrs[c])) {
                        defaults[c] = attrs[c];
                    }
                });

                setTimeout(function () {
                    $(el[0]).overscroll(defaults);
                }, 0);

            }

        }
    };

    wDirectivesApp.directive('overScroll', [overScroll]);

    var comparisonScroll = function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var p = angular.element(el).parent().children(".pull-left");
                el.bind("scroll", function ($event) {
                    $(p).scrollTop(angular.element(el).prop('scrollTop'));
                    //TODO: PALITAN NG PURE JAVASCRIPT LANG
                });

            }

        }
    };

    wDirectivesApp.directive('comparisonScroll', [comparisonScroll]);


    var ngFormPrintReport = function (d, g, S, Sp, Di, t) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                E.on('click', function () {

                    var mid = A.mid;
                    var iDs = new Array();
                    if (s.gridOptions != undefined) {
                        if (s.gridOptions[mid] != undefined) {
                            for (var i = 0; i < s.gridOptions[mid].selectedItems.length; i++) {
                                iDs.push(s.gridOptions[mid].selectedItems[i].ID);
                            }
                        } else {
                            if (A.customrefid != undefined) {
                                iDs.push(A.customrefid);
                            } else {
                                iDs.push(s.Master.ID);
                            }
                        }
                    } else {
                        if (A.customrefid != undefined) {
                            iDs.push(A.customrefid);
                        } else {
                            iDs.push(s.Master.ID);
                        }
                    }

                    var dlg = Di.create(dialogPath + '/PrintReport.html', 'PrintReport', { 'rID': iDs, 'mID': mid }, { size: 'xl', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormPrintReport', ['dataService', 'growlNotifications', '$state', '$stateParams', 'dialogs', '$timeout', ngFormPrintReport]);

    function measureTime() {
        var startTimeList = new Date().getTime();
        t(function () {
            var time = (new Date().getTime() - startTimeList) + " ms";
            console.log("ANGULAR - List updated in: " + time);
        });
    };

    var LookUp = function (s, d, mI, data, g) {
        var cid = data.cid;
        var filter = data.filter.toLowerCase();
        s.lookupdata = {};
        s.tmpData = {};
        s.tmpData.data = [];
        s.lookupdata.data = [];
        s.targetDisplay = data.display;

        var i = 0, j;
        var col = [];
        var key = i;
        var val = data.lookup_source[i];
        for (j in val) {

            var sub_key = j;
            var sub_val = val.j;
            col.push(sub_key);

        }
        if (filter.length > 0) {
            angular.forEach(data.lookup_source, function (obj) {
                var ix = col.indexOf(s.targetDisplay);
                if (ix == -1) { ix = 1; s.targetDisplay = col[ix] }
                var v = (obj[col[ix]] == null || obj[col[ix]] == undefined ? "" : obj[col[ix]].toLowerCase());
                if (v.indexOf(filter) >= 0) {
                    s.lookupdata.data.push(obj);
                }
            });
        } else {
            var ix = col.indexOf(s.targetDisplay);
            if (ix == -1) { ix = 1; s.targetDisplay = col[ix] }
            s.lookupdata.data = data.lookup_source;
        }

        s.lookupdata.col = col;

        s.lookupdata.name = data.label;
        s.cancel = function () {
            mI.dismiss();
        }

        s.getVal = function (val, Name) {
            var obj = {};
            obj.Name = Name;
            obj.Value = val;
            mI.close(obj);

        }
        var x = 0;
        var y = 0;
        for (x; x < 20; x++) {
            if (s.lookupdata.data[x] != undefined) {
                s.tmpData.data.push(s.lookupdata.data[x]);
            }
        }

        setTimeout(function () {
            $("#lookupContainer").on("scroll", function () {
                if (($(this).scrollTop() + $(this).innerHeight() - 10) == $(this)[0].scrollHeight || ($(this).scrollTop() + $(this).innerHeight()) == $(this)[0].scrollHeight && ($(this).innerHeight() - 10) != $(this)[0].scrollHeight) {
                    var tmpX = x + 10;
                    if (x <= s.lookupdata.data.length) {
                        if (x >= 30) {
                            y = y + 9;
                            for (var z = 0; z < 9; z++) {
                                s.tmpData.data.shift(z);
                                s.$apply();
                            }
                        }
                        for (x; x < tmpX; x++) {
                            if (x <= s.lookupdata.data.length) {
                                s.tmpData.data.push(s.lookupdata.data[x]);
                                s.$apply();
                                s.rebuildColumns();
                            } else {
                                g.add("No new record.", "info", 5000);
                                break;
                            }
                        }
                    } else {
                        g.add("No new record.", "info", 5000);
                    }
                } else if ($(this).scrollTop() == 0) {
                    var tmpX = (x - y) - 10;
                    var tmpX2 = x - y;
                    var tmpY = y - 9;
                    if (x >= 30) {
                        if (y > 0) {
                            for (tmpX2; tmpX2 > tmpX; tmpX2--) {
                                s.tmpData.data.splice(tmpX2 - 1, 1);
                            }
                            x = x - 10;
                            for (y; y > tmpY; y--) {
                                s.tmpData.data.unshift(s.lookupdata.data[y - 1]);
                                s.$apply();
                                s.rebuildColumns();
                            }
                        }
                    }
                }
            });
        }, 200);

        s.rebuildColumns = function () {
            setTimeout(function () {
                $(".lookupgrid th").each(function () {
                    var l = $(this).html().length;
                    var tw = (l * 10) + 20;
                    $(this).css("min-width", tw);
                });

                $(".lookupgrid td div").each(function () {
                    var l = $(this).html().length;
                    var tw = (l * 5) + 20;
                    $(this).css("min-width", tw);
                });
            }, 200)
        }

        s.rebuildColumns();

    }

    var ngFormLookup = function (d, g, S, Sp, Di, t) {
        app.register.controller('LookUp', ['$scope', 'dataService', '$modalInstance', 'data', 'growlNotifications', LookUp]);
        return {
            restrict: 'A',
            scope: {
                targetName: '=',
                targetValue: '=',
                targetSource: '=',
                targetDisplay: '='
            },
            link: function (s, E, A) {
                var addon = '#' + A.targetAddon;
                var cntrlID = A.cid;
                E.on('keyup', function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (s.targetName == "" || s.targetName == null || s.targetName == undefined) {
                        s.targetValue = null;
                        s.$apply();
                    }
                    if (e.keyCode == 9) {
                        var collection = s.targetSource;
                        var obj = collection.filter(function (x) { return x[(s.targetDisplay == "" || s.targetDisplay == null || s.targetDisplay == undefined ? "Name" : s.targetDisplay)] == s.targetName });
                        if (obj.length == 1) {
                            s.targetValue = obj[0].ID;
                            s.$apply();
                        } else {
                            var dlg = Di.create(dialogPath + '/LookUp.html', 'LookUp', { 'lookup_source': s.targetSource, 'display': (s.targetDisplay == null || s.targetDisplay == undefined || s.targetDisplay == "" ? "Name" : s.targetDisplay), 'label': A.placeholder, 'cid': cntrlID, 'filter': (s.targetName == null || s.targetName == undefined ? "" : s.targetName) }, { size: 'md', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                            dlg.result.then(function (obj) {
                                s.targetName = obj.Name;
                                s.targetValue = obj.Value;
                            });
                        }
                    }
                });
                E.on('keydown', function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode == 9) {
                        e.preventDefault();
                        var cntrlID = A.cid;
                        var model = A.ngModel;
                    }

                });
                setTimeout(function () {
                    $(addon).on('click', function () {
                        var cntrlID = A.cid;
                        var model = A.ngModel;
                        var dlg = Di.create(dialogPath + '/LookUp.html', 'LookUp', { 'lookup_source': s.targetSource, 'display': (s.targetDisplay == null || s.targetDisplay == undefined || s.targetDisplay == "" ? "Name" : s.targetDisplay), 'label': A.placeholder, 'cid': cntrlID, 'filter': (s.targetName == null || s.targetName == undefined ? "" : s.targetName) }, { size: 'lg', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                        dlg.result.then(function (obj) {
                            s.targetName = obj.Name;
                            s.targetValue = obj.Value;
                        });
                    });
                }, 100);
            }
        }
    };

    wDirectivesApp.directive('ngFormLookup', ['dataService', 'growlNotifications', '$state', '$stateParams', 'dialogs', '$timeout', ngFormLookup]);

    var DetailedLookUp = function (s, d, mI, data) {
        var cid = data.cid;
        s.detailedlookupdata = {};
        s.detailedlookupdata.data = data.detailedlookup_source;
        s.detailedValuelookup = [];
        if (data.targetValue != undefined && data.targetValue != "") {
            data.targetValue = data.targetValue.split(",");
        }
        if (data.targetValue != undefined && data.targetValue != "") {
            for (var x = 0; data.targetValue.length > x; x++) {
                var xobj = s.detailedlookupdata.data.filter(function (z) {
                    return z.ID == data.targetValue[x];
                });
                //console.log(xobj);
                s.detailedValuelookup.push({ "ID": data.targetValue[x], "Name": xobj[0].Name });
            }
        }
        //s.detailedValuelookup = data.detailedValuelookup_source;

        angular.forEach(s.detailedValuelookup, function (l, index) {
            var a = s.detailedlookupdata.data.filter(function (x) {
                return x.ID == l.ID;
            });
            s.detailedlookupdata.data.map(function (d, i) {
                if (d.ID == a[0].ID) {
                    s.detailedlookupdata.data[i].selected = true;
                }
            });
        });

        var i = 1, j;
        var col = [];
        var key = i;
        var val = s.detailedlookupdata.data[i];
        for (j in val) {

            var sub_key = j;
            var sub_val = val.j;
            if (sub_key != "selected") {
                col.push(sub_key);
            }

        }
        s.detailedlookupdata.col = col;

        s.detailedlookupdata.name = data.label;
        s.cancel = function () {
            mI.close(obj);
        }

        var obj = {};
        obj.Value = [];
        angular.forEach(s.detailedValuelookup, function (l) {
            obj.Value.push(l.ID);
        });
        //obj.Value = s.detailedValuelookup;
        s.getVal = function (val) {
            if ($("#cbox_" + val).is(":checked")) {
                obj.Value.push(val);
            } else {
                var index = -1;
                if (obj.Value.indexOf(String(val)) > -1) {
                    index = obj.Value.indexOf(String(val));
                } else {
                    index = obj.Value.indexOf(val);
                }
                if (index > -1) {
                    obj.Value.splice(index, 1);
                }
            }
        }

        setTimeout(function () {
            $(".lookupgrid th").each(function () {
                var l = $(this).html().length;
                var tw = (l * 10) + 20;
                $(this).css("min-width", tw);
            });

            $(".lookupgrid td div").each(function () {
                var l = $(this).html().length;
                var tw = (l * 5) + 20;
                $(this).css("min-width", tw);
            });
        }, 200);

        s.checkAll = function ($event) {
            var checkbox = $event.target;
            var ischecked = checkbox.checked;
            if (ischecked) {
                obj.Value = [];
            }
            angular.forEach(s.detailedlookupdata.data, function (l) {
                l.selected = ischecked;
                if (ischecked) {
                    obj.Value.push(l.ID);
                } else {
                    var index = obj.Value.indexOf(l.ID);
                    if (index > -1) {
                        obj.Value.splice(index, 1);
                    }
                }
            });
        }

    }

    var ngFormDetailedLookup = function (d, g, S, Sp, Di, t) {
        app.register.controller('DetailedLookUp', ['$scope', 'dataService', '$modalInstance', 'data', DetailedLookUp]);
        return {
            restrict: 'A',
            scope: {
                targetValue: '=',
                targetName: '=',
                targetSource: '='
            },
            link: function (s, E, A) {
                E.on('click', function () {
                    var cntrlID = A.cid;
                    var model = A.ngModel;
                    var dlg = Di.create(dialogPath + '/DetailedLookUp.html', 'DetailedLookUp', { 'targetValue': s.targetValue, 'detailedlookup_source': s.targetSource, 'label': A.placeholder, 'cid': cntrlID }, { size: 'xl', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                    dlg.result.then(function (obj) {
                        var a = '';
                        s.targetDetailSource = [];
                        angular.forEach(obj.Value, function (id) {
                            a += String(id) + ',';
                        });
                        if (obj.Value != undefined) {
                            s.targetName = "";
                            for (var x = 0; obj.Value.length > x; x++) {
                                var xobj = s.targetSource.filter(function (z) {
                                    return z.ID == obj.Value[x];
                                });
                                s.targetName += xobj[0].Name + ", ";
                            }
                        }
                        var repStr = s.targetName;
                        s.targetName = repStr.substr(0, repStr.length - 2);
                        s.targetValue = a.substr(0, a.length - 1);
                    });
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormDetailedLookup', ['dataService', 'growlNotifications', '$state', '$stateParams', 'dialogs', '$timeout', ngFormDetailedLookup]);

    var ngDetailedLookupGrid = function (c) {
        return {
            restrict: 'A',
            scope: {
                targetDetailSource: '=',
                targetSource: '='
            },
            link: function (s, E, A) {
                var cntrlID = A.cid;
                var str = "";
                s.detailedlookupdata = {};
                s.detailedlookupdata.data = s.targetSource;
                var i = 1, j;
                var col = [];
                var key = i;
                var val = s.detailedlookupdata.data[i];
                for (j in val) {

                    var sub_key = j;
                    var sub_val = val.j;
                    if (sub_key != "selected") {
                        col.push(sub_key);
                    }

                }
                s.detailedlookupdata.col = col;

                str += "<table width='100%' align='center' ng-if='targetDetailSource.length > 0' class='lookupgrid'>";
                str += "<thead>";
                //str += "<th ng-repeat='title in detailedlookupdata.col'>{{title}}</th>";
                str += "<th>ID</th>";
                str += "<th>Name</th>";
                str += "</thead>";
                str += "<tbody>";
                str += "<tr ng-repeat='d in detailedValuelookup_source[" + cntrlID + "]'>";
                str += "<td ng-repeat='t in detailedlookupdata.col' ng-lookup-filter-result filter-source='detailedlookup_source[" + cntrlID + "]' filter-source-column='t' filter-source-value='d.ID'></td>";
                //str += "<td ng-lookup-filter-result filter-source='targetSource' filter-source-column='ID' filter-source-value='d.ID'></td>";
                //str += "<td ng-lookup-filter-result filter-source='targetSource' filter-source-column='Name' filter-source-value='d.ID'></td>";
                str += "</tr>";
                str += "</tbody>";
                str += "</table>";
                E.append(c(str)(s));

            }
        }
    };

    wDirectivesApp.directive('ngDetailedLookupGrid', ['$compile', ngDetailedLookupGrid]);

    var ngLookupFilterResult = function (c) {
        return {
            restrict: 'A',
            scope: {
                filterSourceColumn: '=',
                filterSourceValue: '=',
                filterSource: '='
            },
            link: function (s, E, A) {
                var a = s.filterSource.filter(function (x) {
                    return x.ID == s.filterSourceValue;
                });
                var col = "";
                angular.forEach(a[0], function (c, i, k) {
                    if (i == s.filterSourceColumn) {
                        col = c;
                    }
                });
                E.append(col);
            }
        }
    };

    wDirectivesApp.directive('ngLookupFilterResult', ['$compile', ngLookupFilterResult]);

    var ngMin = function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                function isEmpty(value) {
                    return angular.isUndefined(value) || value === '' || value === null || value !== value;
                }
                //scope.$watch(attr.ngMin, function () {
                //    ctrl.$setViewValue(ctrl.$viewValue);
                //});
                var minValidator = function (value) {
                    var min = scope.$eval(attr.ngMin) || 0;
                    if (!isEmpty(value) && value < min) {
                        ctrl.$setValidity('ngMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('ngMin', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
            }
        };
    }

    wDirectivesApp.directive('ngMin', ngMin);

    var ngMax = function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                function isEmpty(value) {
                    return angular.isUndefined(value) || value === '' || value === null || value !== value;
                }
                //scope.$watch(attr.ngMax, function () {
                //    ctrl.$setViewValue(ctrl.$viewValue);
                //});
                var maxValidator = function (value) {
                    var max = scope.$eval(attr.ngMax) || Infinity;
                    if (!isEmpty(value) && value > max) {
                        ctrl.$setValidity('ngMax', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('ngMax', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    }

    wDirectivesApp.directive('ngMax', ngMax);

    var ngCapitalize = function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: { ngModel: '=?' },
            link: function (s, e, a, c) {
                e.on("keyup", function () {
                    var str = e[0].value;
                    var a = str.split(" ");
                    for (var i = 0; i < a.length; i++) {
                        var b = a[i].charAt(0).toUpperCase();
                        a[i] = b + a[i].substr(1).toLowerCase();
                    }
                    s.$apply(function () {
                        s.ngModel = a.join(" ");
                    });
                });
            }
        };
    }

    wDirectivesApp.directive('ngCapitalize', ngCapitalize);


    var ngEnter = function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngEnter', ngEnter);


    var ngScrollEnds = function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var threshold = 0;

                element.scroll(function () {
                    var visibleHeight = element.height();
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;
                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        scope.$apply(attrs.ngScrollEnds);
                    }
                });
            }
        };
    };
    wDirectivesApp.directive('ngScrollEnds', ngScrollEnds);

    var ddTextCollapse = function ($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {

                // start collapsed
                scope.collapsed = false;

                // create the function to toggle the collapse
                scope.toggle = function () {
                    scope.collapsed = !scope.collapsed;
                };

                // wait for changes on the text
                attrs.$observe('ddTextCollapseText', function (text) {

                    // get the length from the attributes
                    var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                    if (text.length > maxLength) {
                        // split the text in two parts, the first always showing
                        var firstPart = String(text).substring(0, maxLength);
                        var secondPart = String(text).substring(maxLength, text.length);

                        // create some new html elements to hold the separate info
                        var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                        var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                        var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                        var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                        var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "less" : "more"}}</span>')(scope);

                        // remove the current contents of the element
                        // and add the new ones we created
                        element.empty();
                        element.append(firstSpan);
                        element.append(secondSpan);
                        element.append(moreIndicatorSpan);
                        element.append(lineBreak);
                        element.append(toggleButton);
                    }
                    else {
                        element.empty();
                        element.append(text);
                    }
                });
            }
        };
    };
    wDirectivesApp.directive('ddTextCollapse', ["$compile", ddTextCollapse]);

    var ngLoadList = function (d) {
        return {
            restrict: 'A',
            //scope: '=',
            link: function (s, E, A) {
                var mID = parseInt(A.mid);
                E.on('click', function () {
                    d.loadList(s.rID, mID).then(function (results) {
                        s.Detail[mID] = s.Detail[mID].concat(results.data);
                        //if (!s.$$phase) s.$apply(); //DI KO RIN ALAM KUNG BAKIT
                    });



                });

                s.$on('destroy', function () {
                    E.off();
                })
            }
        }
    };

    wDirectivesApp.directive('ngLoadList', ['dataService', ngLoadList]);

    var ngFormAsyncCommand = function (d, g, S, Di, t, q) {
        return {
            restrict: 'A',
            scope: '=',
            link: function (s, E, A) {
                var btnID = A.btnid, confirm = A.confirm, arr = [];
                E.bind('click', function () {
                    s.mainform.$submitted = true;
                    if (s.mainform.$valid) {
                        localStorage.setItem("mID", s.mID);
                        localStorage.setItem("tab", s.tabs.activeTab == undefined ? 0 : s.tabs.activeTab)
                        if (confirm === undefined) {
                            s.mainform.$setPristine();
                            d.AsyncCommand(s.mID, s.rID, btnID, s.Master)
                             .then(function (results) {
                                 $("#hubNotification .notifications .alert").empty();
                                 $("#hubNotification").attr("style", "display:none;");
                                 if (results.messageType == 2) {
                                     g.add(results.message, "danger", 5000);
                                 } else {
                                     var ID = 'ID_' + s.mID;
                                     var params = {};
                                     params[ID] = results.ID;
                                     for (var p in S.params) {
                                         if (p != ID) {
                                             params[p] = S.params[p]
                                         }
                                     }
                                     if (results.ID == "0") {
                                         S.go(results.mID, {}, { reload: true });
                                     } else {
                                         S.go(S.current.name, params, { reload: true });
                                     }
                                     g.add(results.message, "info", 5000);
                                 }
                                 s.mainform.$submitted = false;
                             });

                        } else {
                            var dlg = Di.confirm(undefined, confirm, { size: 'sm', keyboard: true, backdrop: true });
                            dlg.result.then(function (btn) {
                                s.mainform.$setPristine();
                                d.AsyncCommand(s.mID, s.rID, btnID, s.Master)
                                 .then(function (results) {
                                     $("#hubNotification .notifications .alert").empty();
                                     $("#hubNotification").attr("style", "display:none;");
                                     if (results.messageType == 2) {
                                         g.add(results.message, "danger", 5000);
                                     } else {
                                         var ID = 'ID_' + s.mID;
                                         var params = {};
                                         params[ID] = results.ID;
                                         for (var p in S.params) {
                                             if (p != ID) {
                                                 params[p] = S.params[p]
                                             }
                                         }
                                         if (results.ID == "0") {
                                             S.go(results.mID, {}, { reload: true });
                                         } else {
                                             S.go(S.current.name, params, { reload: true });
                                         }
                                         g.add(results.message, "info", 5000);
                                     }
                                     s.mainform.$submitted = false;
                                 });
                            }, function (btn) {
                                //NO
                            });
                        }
                    } else {
                        t(function () {
                            g.add('Fill all the required fields.', "danger", 5000);
                            s.tabs.activeTab = findFormInvalid(s['mainform']);
                        });
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormAsyncCommand', ['dataService', 'growlNotifications', '$state', 'dialogs', '$timeout', '$q', ngFormAsyncCommand]);

    var myFab = function (c, $d, d) {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: { favourites: '=' },
            template: '<div context-menu="(IsLockFab ? unlockFab : lockFab)" id="main_fab">' +
                        '<div class="sub_fab_btns_wrapper slideUp kc_fab_pop_top kc_fab_left">' +
                            '<div sly-repeat="fav in favourites | orderBy: \'WebMenus\'">' +
                                '<div context-menu="removeFromFavourites" class="sub_fab_btn" style="background:#337ab7;" title="{{fav.WebMenus}}">' +
                                    '<span style="color:white;">' +
                                        '<a href="{{fav.url}}">{{fav.WebMenus}}</a>' +
                                    '</span>' +
                                '</div>' +
                            '</div>' +
                            '<div ng-if="favourites.length == 0" class="sub_fab_btn" style="background:#337ab7;" title="Add your most used menu.">' +
                                '<span style="color:white;font-style:italic;">Add your most used menu.</span>' +
                            '</div>' +
                        '</div>' +
                        '<button class="kc_fab_main_btn" ng-click="toggleFab()" style="background-color:#337ab7;"><i class="kc-icon fa {{hasOpen == false || hasOpen == null || hasOpen == undefined ? \'fa-star\' : \'fa-times\' }}"></span></button>' +
                      '</div>',
            compile: function (E, A, transclude) {
                var contents = E.contents().remove();
                var compiledContents;

                return function (s, iE, iA) {

                    s.IsLockFab = false;

                    s.lockFab = [
                        ['Disable dragging', function ($itemScope, $event, color) {
                            $('#main_fab').draggable('disable');
                            s.IsLockFab = true;
                        }],
                        ['Change text alignment', [
                            ['Align left', function () {
                                $('.sub_fab_btns_wrapper').addClass('kc_fab_left');
                                $('.sub_fab_btns_wrapper').removeClass('kc_fab_right');

                            }],
                            ['Align right', function () {
                                $('.sub_fab_btns_wrapper').addClass('kc_fab_right');
                                $('.sub_fab_btns_wrapper').removeClass('kc_fab_left');
                            }]
                        ]],
                        ['Show on...', [
                            ['Top', function () {
                                $('.sub_fab_btns_wrapper').addClass('kc_fab_pop_top');
                                $('.sub_fab_btns_wrapper').addClass('slideUp');
                                $('.sub_fab_btns_wrapper').removeClass('slideDown');
                            }],
                            ['Bottom', function () {
                                $('.sub_fab_btns_wrapper').removeClass('kc_fab_pop_top');
                                $('.sub_fab_btns_wrapper').addClass('slideDown');
                                $('.sub_fab_btns_wrapper').removeClass('slideUp');
                            }]
                        ]]
                    ];

                    s.unlockFab = [
                        ['Enable dragging', function ($itemScope, $event, color) {
                            $('#main_fab').draggable('enable');
                            s.IsLockFab = false;
                        }],
                        ['Change text alignment', [
                            ['Align left', function () {
                                $('.sub_fab_btns_wrapper').addClass('kc_fab_left');
                                $('.sub_fab_btns_wrapper').removeClass('kc_fab_right');
                            }],
                            ['Align right', function () {
                                $('.sub_fab_btns_wrapper').addClass('kc_fab_right');
                                $('.sub_fab_btns_wrapper').removeClass('kc_fab_left');
                            }]
                        ]],
                        ['Show on...', [
                            ['Top', function () {
                                $('.sub_fab_btns_wrapper').addClass('kc_fab_pop_top');
                                $('.sub_fab_btns_wrapper').addClass('slideUp');
                                $('.sub_fab_btns_wrapper').removeClass('slideDown');
                            }],
                            ['Bottom', function () {
                                $('.sub_fab_btns_wrapper').removeClass('kc_fab_pop_top');
                                $('.sub_fab_btns_wrapper').addClass('slideDown');
                                $('.sub_fab_btns_wrapper').removeClass('slideUp');
                            }]
                        ]]
                    ];

                    s.removeFromFavourites = [
                        ['Remove from bookmark', function ($itemScope, $event, color) {
                            if ($itemScope.fav != undefined) {
                                var mID = $itemScope.fav.mID;
                                var cnt = s.favourites.filter(function (x) { return x.mID == mID }).length;
                                if (cnt > 0) {
                                    angular.forEach(s.favourites, function (obj, mIdx) {
                                        if (obj.mID == mID) {
                                            d.removeFromFavourites(mID).then(function (res) {
                                                if (res.data.type == "2") {
                                                    g.add(res.data.msg, "danger", 5000);
                                                } else {
                                                    s.favourites.splice(mIdx, 1);
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }]
                    ];

                    if (!compiledContents) {
                        compiledContents = c(contents, transclude);
                    };

                    compiledContents(s, function (clone, s) {
                        iE.append(clone);
                    });
                    s.hasOpen = null;
                    var main_fab_btn = $("#main_fab").find(".kc_fab_main_btn");
                    var sub_fab_btns = $("#main_fab").find(".sub_fab_btns_wrapper");
                    setTimeout(function () {
                        $('#main_fab').draggable({
                            cancel: false,
                            stop: function (event, ui) {
                                $(event.toElement).one('click', function (e) { e.stopImmediatePropagation(); });
                            }
                        });
                    }, 1000);


                    s.toggleFab = function () {
                        if (sub_fab_btns.hasClass('show')) {
                            s.hasOpen = false;
                        } else {
                            s.hasOpen = true;
                            $('.kc_fab_main_btn i').addClass('fa-times');
                            $('.kc_fab_main_btn i').removeClass('fa-star');
                        }
                    }

                    main_fab_btn.click(function (e) { 
                        sub_fab_btns.toggleClass('show');
                        if ($(".kc_fab_overlay").length > 0) {
                            $(".kc_fab_overlay").remove();
                            main_fab_btn.removeClass('kc_fab_main_btn_focus');

                        } else {

                            $('body').append('<div class="kc_fab_overlay" ng-click="toggleFab()"></div>');
                            main_fab_btn.addClass('kc_fab_main_btn_focus');
                            $('.kc_fab_overlay').on('click', function () {
                                s.hasOpen = false;
                                sub_fab_btns.removeClass('show');
                                var overlay = $(".kc_fab_overlay");
                                main_fab_btn.removeClass('kc_fab_main_btn_focus');
                                overlay.remove();
                                $('.kc_fab_main_btn i').removeClass('fa-times');
                                $('.kc_fab_main_btn i').addClass('fa-star');
                            });

                        }
                    });
                };
            },
        };
    };

    wDirectivesApp.directive('ngFab', ['$compile', '$document', 'dataService', myFab]);

    var makeDatetimePickerDetail = function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                setTimeout(function () {
                    ngModelCtrl.$setViewValue(moment(ngModelCtrl.$viewValue).format('MM/DD/YYYY h:mm A'));
                    ngModelCtrl.$render();
                    $(function () {
                        $('#' + attrs.id).datetimepicker({ sideBySide: true, debug: true }).on('dp.change', function (a) {
                            if (a.date._d != undefined) {
                                ngModelCtrl.$setViewValue(moment(a.date._d).format('MM/DD/YYYY h:mm A'));
                                ngModelCtrl.$render();
                            }
                        }).on('dp.show', function () {
                            $('.bootstrap-datetimepicker-widget').removeClass('top').addClass('bottom').addClass('detailBottom');
                            $('.bootstrap-datetimepicker-widget').css('top', '');
                        });
                    });
                }, 200);
            }
        };
    };

    wDirectivesApp.directive('makeDatetimePickerDetail', [makeDatetimePickerDetail]);

    var makeDatetimePicker = function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                setTimeout(function () {
                    ngModelCtrl.$setViewValue(moment(ngModelCtrl.$viewValue).format('MM/DD/YYYY h:mm A'));
                    ngModelCtrl.$render();
                    $(function () {
                        $('#' + attrs.id).datetimepicker({ sideBySide: true, debug: true }).on('dp.change', function (a) {
                            if (a.date._d != undefined) {
                                ngModelCtrl.$setViewValue(moment(a.date._d).format('MM/DD/YYYY h:mm A'));
                                ngModelCtrl.$render();
                            }
                        }).on('dp.show', function () {
                            $('.bootstrap-datetimepicker-widget').addClass('top');
                            $('.bootstrap-datetimepicker-widget').css('bottom', '28px!important');
                        });
                    });
                }, 200);
            }
        };
    };

    wDirectivesApp.directive('makeDatetimePicker', [makeDatetimePicker]);

    var imageExist = function (d) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('ngSrc', function (ngSrc) {
                    if (ngSrc.toString().toLowerCase().indexOf('jpg') > -1 || ngSrc.toString().toLowerCase().indexOf('jpeg') > -1 || ngSrc.toString().toLowerCase().indexOf('png') > -1) {
                        d.ImageExist(ngSrc).then(function (a) {
                            if (a.message == 'NotExist') {
                                element.attr('src', '/Upload/avatar.png');
                            }
                        });
                    }
                });
            }
        };
    }

    wDirectivesApp.directive('imageExist', ['dataService', imageExist]);

    var LookUpbtn = function (s, d, mI, data, g) {
        var cid = data.cid;
        var filter = data.filter.toLowerCase();
        s.lookupdata = {};
        s.tmpData = {};
        s.tmpData.data = [];
        s.lookupdata.data = [];
        s.targetDisplay = data.display;

        var i = 0, j;
        var col = [];
        var key = i;
        var val = data.lookup_source[i];
        for (j in val) {

            var sub_key = j;
            var sub_val = val.j;
            col.push(sub_key);

        }
        if (filter.length > 0) {
            angular.forEach(data.lookup_source, function (obj) {
                var ix = col.indexOf(s.targetDisplay);
                if (ix == -1) { ix = 1; s.targetDisplay = col[ix] }
                var v = (obj[col[ix]] == null || obj[col[ix]] == undefined ? "" : obj[col[ix]].toLowerCase());
                if (v.indexOf(filter) >= 0) {
                    s.lookupdata.data.push(obj);
                }
            });
        } else {
            var ix = col.indexOf(s.targetDisplay);
            if (ix == -1) { ix = 1; s.targetDisplay = col[ix] }
            s.lookupdata.data = data.lookup_source;
        }

        s.lookupdata.col = col;

        s.lookupdata.name = data.label;
        s.cancel = function () {
            mI.dismiss();
        }

        s.selectedValues = [];
        s.getVal = function () {
            var objSelected = Enumerable.From(s.lookupdata.data).Where(function (x) { return x.IsSelected }).ToArray();
            if (objSelected.length == 0) {
                g.add('No record selected.', 'warning', 5000);
            } else {
                mI.close(objSelected);
            }
        }
        s.checkUse = function (l) {
            //l.IsUsedForOffset = !l.IsUsedForOffset;
        }

        //s.getVal = function (val, Name) {
        //    var obj = {};
        //    obj.Name = Name;
        //    obj.Value = val;
        //    mI.close(obj);
        //}

        var x = 0;
        var y = 0;
        for (x; x < 20; x++) {
            if (s.lookupdata.data[x] != undefined) {
                s.tmpData.data.push(s.lookupdata.data[x]);
            }
        }

        setTimeout(function () {
            $("#lookupContainer").on("scroll", function () {
                if (($(this).scrollTop() + $(this).innerHeight() - 10) == $(this)[0].scrollHeight || ($(this).scrollTop() + $(this).innerHeight()) == $(this)[0].scrollHeight && ($(this).innerHeight() - 10) != $(this)[0].scrollHeight) {
                    var tmpX = x + 10;
                    if (x <= s.lookupdata.data.length) {
                        if (x >= 30) {
                            y = y + 9;
                            for (var z = 0; z < 9; z++) {
                                s.tmpData.data.shift(z);
                                s.$apply();
                            }
                        }
                        for (x; x < tmpX; x++) {
                            if (x <= s.lookupdata.data.length) {
                                s.tmpData.data.push(s.lookupdata.data[x]);
                                s.$apply();
                                s.rebuildColumns();
                            } else {
                                g.add("No new record.", "info", 5000);
                                break;
                            }
                        }
                    } else {
                        g.add("No new record.", "info", 5000);
                    }
                } else if ($(this).scrollTop() == 0) {
                    var tmpX = (x - y) - 10;
                    var tmpX2 = x - y;
                    var tmpY = y - 9;
                    if (x >= 30) {
                        if (y > 0) {
                            for (tmpX2; tmpX2 > tmpX; tmpX2--) {
                                s.tmpData.data.splice(tmpX2 - 1, 1);
                            }
                            x = x - 10;
                            for (y; y > tmpY; y--) {
                                s.tmpData.data.unshift(s.lookupdata.data[y - 1]);
                                s.$apply();
                                s.rebuildColumns();
                            }
                        }
                    }
                }
            });
        }, 200);

        s.rebuildColumns = function () {
            setTimeout(function () {
                $(".lookupgrid th").each(function (idx) {
                    if (idx != 0) {
                        var l = $(this).html().length;
                        var tw = (l * 10) + 20;
                        $(this).css("min-width", tw);
                    }
                });

                $(".lookupgrid td div").each(function (idx) {
                    if (idx != 0) {
                        var l = $(this).html().length;
                        var tw = (l * 5) + 20;
                        $(this).css("min-width", tw);
                    }
                });
            }, 200)
        }

        s.rebuildColumns();

    }
 
    var ngFormLookupbtn = function (d, g, t, Di, sp) {
        app.register.controller('LookUpbtn', ['$scope', 'dataService', '$modalInstance', 'data', 'growlNotifications', LookUpbtn]);
        return {
            restrict: 'EA',
            link: function (s, E, A) {
                var btnID = A.btnid,
                    targetmID = parseInt(A.targetMid),
                    targetTab = A.targetTab,
                    confirm = A.confirm;

                E.bind('click', function () {
                    s.mainform.$submitted = true;
                    var y = findMasterFormInvalid(s['mainform']);
                    if (y == 0) { //CHECKING   
                        if (confirm === undefined) {
                            d.LoadListSource(btnID, sp.e).then(function (data) {
                                var dlg = Di.create(dialogPath + '/LookUpBtn.html', 'LookUpbtn', { 'lookup_source': data.data, 'display': (s.targetDisplay == null || s.targetDisplay == undefined || s.targetDisplay == "" ? "Name" : s.targetDisplay), 'label': A.placeholder, 'cid': null, 'filter': (s.targetName == null || s.targetName == undefined ? "" : s.targetName) }, { size: 'lg', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                dlg.result.then(function (obj) {
                                    s.Detail[targetmID] = obj;
                                    s.loadedTab.push(targetmID);
                                    s.tabs.activeTab = targetTab;
                                    s.mainform.$submitted = false;
                                });
                            });
                        } else {
                            var dlg = Di.confirm(undefined, confirm, { size: 'sm', keyboard: true, backdrop: true });
                            dlg.result.then(function (btn) {
                                d.LoadListSource(btnID, sp.e).then(function (data) {
                                    var dlg = Di.create(dialogPath + '/LookUpBtn.html', 'LookUpbtn', { 'lookup_source': data.data, 'display': (s.targetDisplay == null || s.targetDisplay == undefined || s.targetDisplay == "" ? "Name" : s.targetDisplay), 'label': A.placeholder, 'cid': null, 'filter': (s.targetName == null || s.targetName == undefined ? "" : s.targetName) }, { size: 'lg', keyboard: true, backdrop: 'static', windowClass: 'my-class' });
                                    dlg.result.then(function (obj) {
                                        s.Detail[targetmID] = obj;
                                        s.loadedTab.push(targetmID);
                                        s.tabs.activeTab = targetTab;
                                        s.mainform.$submitted = false;
                                    });
                                });
                            }, function (btn) {
                                //NO
                            });
                        }
                    } else {
                        t(function () {
                            g.add('Fill all the required fields.', "danger", 5000);
                            s.tabs.activeTab = y - 1;
                        });
                    }
                });
            }
        }
    };

    wDirectivesApp.directive('ngFormLookupbtn', ['dataService', 'growlNotifications', '$timeout', 'dialogs', '$stateParams', ngFormLookupbtn]);

});