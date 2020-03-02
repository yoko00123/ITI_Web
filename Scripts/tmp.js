'use strict';
define([], function() {
    var A = angular.module('app', ['ui.bootstrap.modal', 'ui.bootstrap.tpls', 'ngGrid', 'ui.bootstrap', 'wDirectives', 'ct.ui.router.extras', 'growlNotifications', 'ngSanitize', 'ngAnimate', 'dnTimepicker', 'mgcrea.ngStrap']);
    A.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
        var c = 'Partials/Controller/',
            v = 'Partials/View/';

        function rD(q, R, dependencies) {
            var d = q.defer();
            require(dependencies, function() {
                d.resolve();
                R.$apply();
            });
            return d.promise;
        };
        A.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
        var S = [];
        S.push({
            name: '2105',
            url: '/Daily-Tasks',
            controller: 'c2105',
            templateUrl: v + 'c2105.html',
            mID: 2105,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2105.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2105);
                    }
                ]
            }
        });
        S.push({
            name: '2106',
            url: '/Daily-Tasks/{ID_2106:[0-9]+}',
            controller: 'c2106',
            templateUrl: v + 'c2106.html',
            mID: 2106,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2106.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2106);
                    }
                ]
            }
        });
        S.push({
            name: '3181',
            url: '/Onboarding-Checklist-Group/{ID_3181:[0-9]+}',
            controller: 'c3181',
            templateUrl: v + 'c3181.html',
            mID: 3181,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3181.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3181);
                    }
                ]
            }
        });
        S.push({
            name: '3179',
            url: '/Onboarding-Checklist/{ID_3179:[0-9]+}',
            controller: 'c3179',
            templateUrl: v + 'c3179.html',
            mID: 3179,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3179.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3179);
                    }
                ]
            }
        });
        S.push({
            name: '1920',
            url: '/Applicant-Dashboard',
            controller: 'c1920',
            templateUrl: v + 'c1920.html',
            mID: 1920,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1920.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1920);
                    }
                ]
            }
        });
        S.push({
            name: '1921',
            url: '/Job-Openings/{ID_1921:[0-9]+}',
            controller: 'c1921',
            templateUrl: v + 'c1921.html',
            mID: 1921,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1921.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1921);
                    }
                ]
            }
        });
        S.push({
            name: '1991',
            url: '/Applicant-Profile',
            controller: 'c1991',
            templateUrl: v + 'c1991.html',
            mID: 1991,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1991.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1991);
                    }
                ]
            }
        });
        S.push({
            name: '2110',
            url: '/My-Evaluations',
            controller: 'c2110',
            templateUrl: v + 'c2110.html',
            mID: 2110,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2110.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2110);
                    }
                ]
            }
        });
        S.push({
            name: '2111',
            url: '/Annual-Performance-Evaluations/{ID_2111:[0-9]+}',
            controller: 'c2111',
            templateUrl: v + 'c2111.html',
            mID: 2111,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2111.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2111);
                    }
                ]
            }
        });
        S.push({
            name: '2111.2113',
            mID: 2113,
            url: '/State_2113/{ID_2113:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2113.html',
                    controller: 'c2113',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2113.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2111.2114',
            mID: 2114,
            url: '/State_2114/{ID_2114:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2114.html',
                    controller: 'c2114',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2114.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2111.2115',
            mID: 2115,
            url: '/State_2115/{ID_2115:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2115.html',
                    controller: 'c2115',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2115.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2090',
            url: '/Performance-Evaluations',
            controller: 'c2090',
            templateUrl: v + 'c2090.html',
            mID: 2090,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2090.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2090);
                    }
                ]
            }
        });
        S.push({
            name: '2091',
            url: '/Performance-Evaluation-List/{ID_2091:[0-9]+}',
            controller: 'c2091',
            templateUrl: v + 'c2091.html',
            mID: 2091,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2091.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2091);
                    }
                ]
            }
        });
        S.push({
            name: '2091.2092',
            mID: 2092,
            url: '/State_2092/{ID_2092:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2092.html',
                    controller: 'c2092',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2092.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2091.2094',
            mID: 2094,
            url: '/State_2094/{ID_2094:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2094.html',
                    controller: 'c2094',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2094.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2091.2095',
            mID: 2095,
            url: '/State_2095/{ID_2095:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2095.html',
                    controller: 'c2095',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2095.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '871',
            url: '/Perspectives',
            controller: 'c871',
            templateUrl: v + 'c871.html',
            mID: 871,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c871.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(871);
                    }
                ]
            }
        });
        S.push({
            name: '872',
            url: '/Perspectives/{ID_872:[0-9]+}',
            controller: 'c872',
            templateUrl: v + 'c872.html',
            mID: 872,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c872.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(872);
                    }
                ]
            }
        });
        S.push({
            name: '873',
            url: '/Goal',
            controller: 'c873',
            templateUrl: v + 'c873.html',
            mID: 873,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c873.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(873);
                    }
                ]
            }
        });
        S.push({
            name: '874',
            url: '/Goal/{ID_874:[0-9]+}',
            controller: 'c874',
            templateUrl: v + 'c874.html',
            mID: 874,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c874.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(874);
                    }
                ]
            }
        });
        S.push({
            name: '877',
            url: '/Strategies',
            controller: 'c877',
            templateUrl: v + 'c877.html',
            mID: 877,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c877.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(877);
                    }
                ]
            }
        });
        S.push({
            name: '878',
            url: '/Strategies/{ID_878:[0-9]+}',
            controller: 'c878',
            templateUrl: v + 'c878.html',
            mID: 878,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c878.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(878);
                    }
                ]
            }
        });
        S.push({
            name: '2036',
            url: '/Key-Result-Areas',
            controller: 'c2036',
            templateUrl: v + 'c2036.html',
            mID: 2036,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2036.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2036);
                    }
                ]
            }
        });
        S.push({
            name: '2037',
            url: '/Key-Result-Areas/{ID_2037:[0-9]+}',
            controller: 'c2037',
            templateUrl: v + 'c2037.html',
            mID: 2037,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2037.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2037);
                    }
                ]
            }
        });
        S.push({
            name: '2038',
            url: '/Corporate-Balanced-Scorecards',
            controller: 'c2038',
            templateUrl: v + 'c2038.html',
            mID: 2038,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2038.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2038);
                    }
                ]
            }
        });
        S.push({
            name: '2039',
            url: '/Corporate-Balanced-ScoreCards/{ID_2039:[0-9]+}',
            controller: 'c2039',
            templateUrl: v + 'c2039.html',
            mID: 2039,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2039.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2039);
                    }
                ]
            }
        });
        S.push({
            name: '2039.2041',
            mID: 2041,
            url: '/State_2041/{ID_2041:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2041.html',
                    controller: 'c2041',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2041.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2039.2041.2043',
            mID: 2043,
            url: '/State_2043/{ID_2043:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2043.html',
                    controller: 'c2043',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2043.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2039.2041.2044',
            mID: 2044,
            url: '/State_2044/{ID_2044:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2044.html',
                    controller: 'c2044',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2044.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2050',
            url: '/Team-Balanced-Scorecards',
            controller: 'c2050',
            templateUrl: v + 'c2050.html',
            mID: 2050,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2050.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2050);
                    }
                ]
            }
        });
        S.push({
            name: '2051',
            url: '/Team-Balanced-Scorecards/{ID_2051:[0-9]+}',
            controller: 'c2051',
            templateUrl: v + 'c2051.html',
            mID: 2051,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2051.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2051);
                    }
                ]
            }
        });
        S.push({
            name: '2051.2053',
            mID: 2053,
            url: '/State_2053/{ID_2053:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2053.html',
                    controller: 'c2053',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2053.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2051.2053.2056',
            mID: 2056,
            url: '/State_2056/{ID_2056:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2056.html',
                    controller: 'c2056',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2056.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2060',
            url: '/Individual-Balanced-Scorecards',
            controller: 'c2060',
            templateUrl: v + 'c2060.html',
            mID: 2060,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2060.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2060);
                    }
                ]
            }
        });
        S.push({
            name: '2061',
            url: '/Individual-Balanced-Scorecards/{ID_2061:[0-9]+}',
            controller: 'c2061',
            templateUrl: v + 'c2061.html',
            mID: 2061,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2061.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2061);
                    }
                ]
            }
        });
        S.push({
            name: '2064',
            url: '/Appraisal-Rater-Groups',
            controller: 'c2064',
            templateUrl: v + 'c2064.html',
            mID: 2064,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2064.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2064);
                    }
                ]
            }
        });
        S.push({
            name: '2065',
            url: '/Raters/{ID_2065:[0-9]+}',
            controller: 'c2065',
            templateUrl: v + 'c2065.html',
            mID: 2065,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2065.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2065);
                    }
                ]
            }
        });
        S.push({
            name: '2066',
            url: '/Appraisal-Ratee-Groups',
            controller: 'c2066',
            templateUrl: v + 'c2066.html',
            mID: 2066,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2066.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2066);
                    }
                ]
            }
        });
        S.push({
            name: '2067',
            url: '/Ratee-Groups/{ID_2067:[0-9]+}',
            controller: 'c2067',
            templateUrl: v + 'c2067.html',
            mID: 2067,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2067.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2067);
                    }
                ]
            }
        });
        S.push({
            name: '2070',
            url: '/Appraisal-Forms',
            controller: 'c2070',
            templateUrl: v + 'c2070.html',
            mID: 2070,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2070.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2070);
                    }
                ]
            }
        });
        S.push({
            name: '2071',
            url: '/Appraisal-Forms/{ID_2071:[0-9]+}',
            controller: 'c2071',
            templateUrl: v + 'c2071.html',
            mID: 2071,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2071.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2071);
                    }
                ]
            }
        });
        S.push({
            name: '2071.2073',
            mID: 2073,
            url: '/State_2073/{ID_2073:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2073.html',
                    controller: 'c2073',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2073.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2071.2072',
            mID: 2072,
            url: '/State_2072/{ID_2072:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2072.html',
                    controller: 'c2072',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2072.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2071.2074',
            mID: 2074,
            url: '/State_2074/{ID_2074:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2074.html',
                    controller: 'c2074',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2074.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2076',
            url: '/Settings',
            controller: 'c2076',
            templateUrl: v + 'c2076.html',
            mID: 2076,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2076.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2076);
                    }
                ]
            }
        });
        S.push({
            name: '2080',
            url: '/Performance-Evaluations/{ID_2080:[0-9]+}',
            controller: 'c2080',
            templateUrl: v + 'c2080.html',
            mID: 2080,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2080.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2080);
                    }
                ]
            }
        });
        S.push({
            name: '2077',
            url: '/Evaluations-Rating-Scale/{ID_2077:[0-9]+}',
            controller: 'c2077',
            templateUrl: v + 'c2077.html',
            mID: 2077,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2077.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2077);
                    }
                ]
            }
        });
        S.push({
            name: '2079',
            url: '/Scorecard-DOC-Scale/{ID_2079:[0-9]+}',
            controller: 'c2079',
            templateUrl: v + 'c2079.html',
            mID: 2079,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2079.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2079);
                    }
                ]
            }
        });
        S.push({
            name: '2081',
            url: '/Scorecard-Types/{ID_2081:[0-9]+}',
            controller: 'c2081',
            templateUrl: v + 'c2081.html',
            mID: 2081,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2081.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2081);
                    }
                ]
            }
        });
        S.push({
            name: '2081.2088',
            mID: 2088,
            url: '/State_2088/{ID_2088:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2088.html',
                    controller: 'c2088',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2088.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2081.2089',
            mID: 2089,
            url: '/State_2089/{ID_2089:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2089.html',
                    controller: 'c2089',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2089.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2081.2087',
            mID: 2087,
            url: '/State_2087/{ID_2087:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2087.html',
                    controller: 'c2087',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2087.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '2078',
            url: '/Performance-Management-Setup/{ID_2078:[0-9]+}',
            controller: 'c2078',
            templateUrl: v + 'c2078.html',
            mID: 2078,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2078.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2078);
                    }
                ]
            }
        });
        S.push({
            name: '782',
            url: '/Employee-201-File',
            controller: 'c782',
            templateUrl: v + 'c782.html',
            mID: 782,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c782.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(782);
                    }
                ]
            }
        });
        S.push({
            name: '784',
            url: '/Employee-201-File/{ID_784:[0-9]+}',
            controller: 'c784',
            templateUrl: v + 'c784.html',
            mID: 784,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c784.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(784);
                    }
                ]
            }
        });
        S.push({
            name: '784.801',
            mID: 801,
            url: '/State_801/{ID_801:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c801.html',
                    controller: 'c801',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c801.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '783',
            url: '/Employment-Information',
            controller: 'c783',
            templateUrl: v + 'c783.html',
            mID: 783,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c783.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(783);
                    }
                ]
            }
        });
        S.push({
            name: '785',
            url: '/Employee-Movement',
            controller: 'c785',
            templateUrl: v + 'c785.html',
            mID: 785,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c785.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(785);
                    }
                ]
            }
        });
        S.push({
            name: '834',
            url: '/Employee-Movement/{ID_834:[0-9]+}',
            controller: 'c834',
            templateUrl: v + 'c834.html',
            mID: 834,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c834.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(834);
                    }
                ]
            }
        });
        S.push({
            name: '769',
            url: '/Organizational-Chart',
            controller: 'c769',
            templateUrl: v + 'c769.html',
            mID: 769,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c769.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(769);
                    }
                ]
            }
        });
        S.push({
            name: '789',
            url: '/Job-Descriptions',
            controller: 'c789',
            templateUrl: v + 'c789.html',
            mID: 789,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c789.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(789);
                    }
                ]
            }
        });
        S.push({
            name: '790',
            url: '/Job-Descriptions/{ID_790:[0-9]+}',
            controller: 'c790',
            templateUrl: v + 'c790.html',
            mID: 790,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c790.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(790);
                    }
                ]
            }
        });
        S.push({
            name: '790.793',
            mID: 793,
            url: '/State_793/{ID_793:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c793.html',
                    controller: 'c793',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c793.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '790.793.795',
            mID: 795,
            url: '/State_795/{ID_795:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c795.html',
                    controller: 'c795',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c795.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '790.793.795.797',
            mID: 797,
            url: '/State_797/{ID_797:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c797.html',
                    controller: 'c797',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c797.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '819',
            url: '/Additional-Manpower',
            controller: 'c819',
            templateUrl: v + 'c819.html',
            mID: 819,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c819.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(819);
                    }
                ]
            }
        });
        S.push({
            name: '818',
            url: '/Additional-Manpower/{ID_818:[0-9]+}',
            controller: 'c818',
            templateUrl: v + 'c818.html',
            mID: 818,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c818.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(818);
                    }
                ]
            }
        });
        S.push({
            name: '818.824',
            mID: 824,
            url: '/State_824/{ID_824:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c824.html',
                    controller: 'c824',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c824.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '821',
            url: '/Replacement',
            controller: 'c821',
            templateUrl: v + 'c821.html',
            mID: 821,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c821.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(821);
                    }
                ]
            }
        });
        S.push({
            name: '833',
            url: '/Replacement/{ID_833:[0-9]+}',
            controller: 'c833',
            templateUrl: v + 'c833.html',
            mID: 833,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c833.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(833);
                    }
                ]
            }
        });
        S.push({
            name: '835',
            url: '/New-Position',
            controller: 'c835',
            templateUrl: v + 'c835.html',
            mID: 835,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c835.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(835);
                    }
                ]
            }
        });
        S.push({
            name: '822',
            url: '/New-Position/{ID_822:[0-9]+}',
            controller: 'c822',
            templateUrl: v + 'c822.html',
            mID: 822,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c822.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(822);
                    }
                ]
            }
        });
        S.push({
            name: '823',
            url: '/Seasonal-/-Temporary',
            controller: 'c823',
            templateUrl: v + 'c823.html',
            mID: 823,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c823.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(823);
                    }
                ]
            }
        });
        S.push({
            name: '836',
            url: '/Seasonal-/-Temporary/{ID_836:[0-9]+}',
            controller: 'c836',
            templateUrl: v + 'c836.html',
            mID: 836,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c836.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(836);
                    }
                ]
            }
        });
        S.push({
            name: '777',
            url: '/Job-Posting',
            controller: 'c777',
            templateUrl: v + 'c777.html',
            mID: 777,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c777.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(777);
                    }
                ]
            }
        });
        S.push({
            name: '866',
            url: '/Job-Posting/{ID_866:[0-9]+}',
            controller: 'c866',
            templateUrl: v + 'c866.html',
            mID: 866,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c866.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(866);
                    }
                ]
            }
        });
        S.push({
            name: '778',
            url: '/Application-for-Employment',
            controller: 'c778',
            templateUrl: v + 'c778.html',
            mID: 778,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c778.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(778);
                    }
                ]
            }
        });
        S.push({
            name: '2134',
            url: '/Application-for-Employment/{ID_2134:[0-9]+}',
            controller: 'c2134',
            templateUrl: v + 'c2134.html',
            mID: 2134,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2134.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2134);
                    }
                ]
            }
        });
        S.push({
            name: '779',
            url: '/Resume-Bank',
            controller: 'c779',
            templateUrl: v + 'c779.html',
            mID: 779,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c779.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(779);
                    }
                ]
            }
        });
        S.push({
            name: '2132',
            url: '/Resume-Bank/{ID_2132:[0-9]+}',
            controller: 'c2132',
            templateUrl: v + 'c2132.html',
            mID: 2132,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2132.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2132);
                    }
                ]
            }
        });
        S.push({
            name: '780',
            url: '/Applicant-Screening-and-Processing',
            controller: 'c780',
            templateUrl: v + 'c780.html',
            mID: 780,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c780.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(780);
                    }
                ]
            }
        });
        S.push({
            name: '912',
            url: '/Scheduled-Screening/{ID_912:[0-9]+}',
            controller: 'c912',
            templateUrl: v + 'c912.html',
            mID: 912,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c912.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(912);
                    }
                ]
            }
        });
        S.push({
            name: '912.2102',
            mID: 2102,
            url: '/State_2102/{ID_2102:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2102.html',
                    controller: 'c2102',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2102.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '915',
            url: '/Approval-for-Hiring',
            controller: 'c915',
            templateUrl: v + 'c915.html',
            mID: 915,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c915.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(915);
                    }
                ]
            }
        });
        S.push({
            name: '2103',
            url: '/Aproval-for-Hiring/{ID_2103:[0-9]+}',
            controller: 'c2103',
            templateUrl: v + 'c2103.html',
            mID: 2103,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2103.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2103);
                    }
                ]
            }
        });
        S.push({
            name: '2103.2104',
            mID: 2104,
            url: '/State_2104/{ID_2104:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c2104.html',
                    controller: 'c2104',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c2104.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '867',
            url: '/Pre-Employment-Requirements',
            controller: 'c867',
            templateUrl: v + 'c867.html',
            mID: 867,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c867.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(867);
                    }
                ]
            }
        });
        S.push({
            name: '868',
            url: '/Pre-Employment-Requirements/{ID_868:[0-9]+}',
            controller: 'c868',
            templateUrl: v + 'c868.html',
            mID: 868,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c868.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(868);
                    }
                ]
            }
        });
        S.push({
            name: '899',
            url: '/Onboarding',
            controller: 'c899',
            templateUrl: v + 'c899.html',
            mID: 899,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c899.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(899);
                    }
                ]
            }
        });
        S.push({
            name: '900',
            url: '/Onboarding/{ID_900:[0-9]+}',
            controller: 'c900',
            templateUrl: v + 'c900.html',
            mID: 900,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c900.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(900);
                    }
                ]
            }
        });
        S.push({
            name: '3176',
            url: '/Employee-Separation-Clearance',
            controller: 'c3176',
            templateUrl: v + 'c3176.html',
            mID: 3176,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3176.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3176);
                    }
                ]
            }
        });
        S.push({
            name: '3177',
            url: '/Employee-Separation-Clearance/{ID_3177:[0-9]+}',
            controller: 'c3177',
            templateUrl: v + 'c3177.html',
            mID: 3177,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3177.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3177);
                    }
                ]
            }
        });
        S.push({
            name: '2046',
            url: '/Interview',
            controller: 'c2046',
            templateUrl: v + 'c2046.html',
            mID: 2046,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2046.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2046);
                    }
                ]
            }
        });
        S.push({
            name: '2047',
            url: '/Template/{ID_2047:[0-9]+}',
            controller: 'c2047',
            templateUrl: v + 'c2047.html',
            mID: 2047,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2047.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2047);
                    }
                ]
            }
        });
        S.push({
            name: '2048',
            url: '/Criteria/{ID_2048:[0-9]+}',
            controller: 'c2048',
            templateUrl: v + 'c2048.html',
            mID: 2048,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2048.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2048);
                    }
                ]
            }
        });
        S.push({
            name: '841',
            url: '/Scale/{ID_841:[0-9]+}',
            controller: 'c841',
            templateUrl: v + 'c841.html',
            mID: 841,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c841.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(841);
                    }
                ]
            }
        });
        S.push({
            name: '843',
            url: '/Pre-Employment-Requirements',
            controller: 'c843',
            templateUrl: v + 'c843.html',
            mID: 843,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c843.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(843);
                    }
                ]
            }
        });
        S.push({
            name: '844',
            url: '/Pre-Employment-Requirements/{ID_844:[0-9]+}',
            controller: 'c844',
            templateUrl: v + 'c844.html',
            mID: 844,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c844.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(844);
                    }
                ]
            }
        });
        S.push({
            name: '885',
            url: '/Onboarding',
            controller: 'c885',
            templateUrl: v + 'c885.html',
            mID: 885,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c885.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(885);
                    }
                ]
            }
        });
        S.push({
            name: '887',
            url: '/Onboarding-Checklist-Group/{ID_887:[0-9]+}',
            controller: 'c887',
            templateUrl: v + 'c887.html',
            mID: 887,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c887.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(887);
                    }
                ]
            }
        });
        S.push({
            name: '886',
            url: '/Onboarding-Checklist/{ID_886:[0-9]+}',
            controller: 'c886',
            templateUrl: v + 'c886.html',
            mID: 886,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c886.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(886);
                    }
                ]
            }
        });
        S.push({
            name: '6233',
            url: '/Onboarding-Type/{ID_6233:[0-9]+}',
            controller: 'c6233',
            templateUrl: v + 'c6233.html',
            mID: 6233,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c6233.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(6233);
                    }
                ]
            }
        });
        S.push({
            name: '859',
            url: '/Requirements-Per-Designation',
            controller: 'c859',
            templateUrl: v + 'c859.html',
            mID: 859,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c859.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(859);
                    }
                ]
            }
        });
        S.push({
            name: '860',
            url: '/Requirements-Per-Designation/{ID_860:[0-9]+}',
            controller: 'c860',
            templateUrl: v + 'c860.html',
            mID: 860,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c860.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(860);
                    }
                ]
            }
        });
        S.push({
            name: '889',
            url: '/Position',
            controller: 'c889',
            templateUrl: v + 'c889.html',
            mID: 889,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c889.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(889);
                    }
                ]
            }
        });
        S.push({
            name: '888',
            url: '/Position/{ID_888:[0-9]+}',
            controller: 'c888',
            templateUrl: v + 'c888.html',
            mID: 888,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c888.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(888);
                    }
                ]
            }
        });
        S.push({
            name: '2032',
            url: '/Applicant-Processing',
            controller: 'c2032',
            templateUrl: v + 'c2032.html',
            mID: 2032,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2032.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2032);
                    }
                ]
            }
        });
        S.push({
            name: '2033',
            url: '/Phase-List/{ID_2033:[0-9]+}',
            controller: 'c2033',
            templateUrl: v + 'c2033.html',
            mID: 2033,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2033.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2033);
                    }
                ]
            }
        });
        S.push({
            name: '1957',
            url: '/Folders/{ID_1957:[0-9]+}',
            controller: 'c1957',
            templateUrl: v + 'c1957.html',
            mID: 1957,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1957.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1957);
                    }
                ]
            }
        });
        S.push({
            name: '2018',
            url: '/Process-List/{ID_2018:[0-9]+}',
            controller: 'c2018',
            templateUrl: v + 'c2018.html',
            mID: 2018,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2018.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2018);
                    }
                ]
            }
        });
        S.push({
            name: '2020',
            url: '/Result/{ID_2020:[0-9]+}',
            controller: 'c2020',
            templateUrl: v + 'c2020.html',
            mID: 2020,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2020.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2020);
                    }
                ]
            }
        });
        S.push({
            name: '3154',
            url: '/Template',
            controller: 'c3154',
            templateUrl: v + 'c3154.html',
            mID: 3154,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3154.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3154);
                    }
                ]
            }
        });
        S.push({
            name: '3155',
            url: '/Template-List/{ID_3155:[0-9]+}',
            controller: 'c3155',
            templateUrl: v + 'c3155.html',
            mID: 3155,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3155.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3155);
                    }
                ]
            }
        });
        S.push({
            name: '3173',
            url: '/Onboarding-Matrix',
            controller: 'c3173',
            templateUrl: v + 'c3173.html',
            mID: 3173,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3173.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3173);
                    }
                ]
            }
        });
        S.push({
            name: '3174',
            url: '/Onboarding-Matrix/{ID_3174:[0-9]+}',
            controller: 'c3174',
            templateUrl: v + 'c3174.html',
            mID: 3174,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c3174.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(3174);
                    }
                ]
            }
        });
        S.push({
            name: '848',
            url: '/Personal-Request-Form',
            controller: 'c848',
            templateUrl: v + 'c848.html',
            mID: 848,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c848.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(848);
                    }
                ]
            }
        });
        S.push({
            name: '858',
            url: '/Personal-Request-Approval/{ID_858:[0-9]+}',
            controller: 'c858',
            templateUrl: v + 'c858.html',
            mID: 858,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c858.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(858);
                    }
                ]
            }
        });
        S.push({
            name: '891',
            url: '/Inventory-Vacancies-Report',
            controller: 'c891',
            templateUrl: v + 'c891.html',
            mID: 891,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c891.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(891);
                    }
                ]
            }
        });
        S.push({
            name: '893',
            url: '/Plantilla-Vacancy-Report',
            controller: 'c893',
            templateUrl: v + 'c893.html',
            mID: 893,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c893.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(893);
                    }
                ]
            }
        });
        S.push({
            name: '895',
            url: '/Comparative-Plantilla-Report',
            controller: 'c895',
            templateUrl: v + 'c895.html',
            mID: 895,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c895.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(895);
                    }
                ]
            }
        });
        S.push({
            name: '897',
            url: '/Comparative-Plantilla-Detail',
            controller: 'c897',
            templateUrl: v + 'c897.html',
            mID: 897,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c897.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(897);
                    }
                ]
            }
        });
        S.push({
            name: '883',
            url: '/School-Verification',
            controller: 'c883',
            templateUrl: v + 'c883.html',
            mID: 883,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c883.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(883);
                    }
                ]
            }
        });
        S.push({
            name: '906',
            url: '/Phone-Interview(Previous-Employer)',
            controller: 'c906',
            templateUrl: v + 'c906.html',
            mID: 906,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c906.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(906);
                    }
                ]
            }
        });
        S.push({
            name: '910',
            url: '/Onboarding-Checklist',
            controller: 'c910',
            templateUrl: v + 'c910.html',
            mID: 910,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c910.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(910);
                    }
                ]
            }
        });
        S.push({
            name: '917',
            url: '/Interview-Rating-Sheet',
            controller: 'c917',
            templateUrl: v + 'c917.html',
            mID: 917,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c917.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(917);
                    }
                ]
            }
        });
        S.push({
            name: '902',
            url: '/Autorization-To-Check-',
            controller: 'c902',
            templateUrl: v + 'c902.html',
            mID: 902,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c902.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(902);
                    }
                ]
            }
        });
        S.push({
            name: '904',
            url: '/Phone-Interview(Character-Reference)',
            controller: 'c904',
            templateUrl: v + 'c904.html',
            mID: 904,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c904.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(904);
                    }
                ]
            }
        });
        S.push({
            name: '908',
            url: '/Reference-Check-Report',
            controller: 'c908',
            templateUrl: v + 'c908.html',
            mID: 908,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c908.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(908);
                    }
                ]
            }
        });
        S.push({
            name: '1925',
            url: '/Company-Profile',
            controller: 'c1925',
            templateUrl: v + 'c1925.html',
            mID: 1925,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1925.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1925);
                    }
                ]
            }
        });
        S.push({
            name: '1936',
            url: '/Company-Profile/{ID_1936:[0-9]+}',
            controller: 'c1936',
            templateUrl: v + 'c1936.html',
            mID: 1936,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1936.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1936);
                    }
                ]
            }
        });
        S.push({
            name: '1926',
            url: '/Branch',
            controller: 'c1926',
            templateUrl: v + 'c1926.html',
            mID: 1926,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1926.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1926);
                    }
                ]
            }
        });
        S.push({
            name: '1939',
            url: '/Branch/{ID_1939:[0-9]+}',
            controller: 'c1939',
            templateUrl: v + 'c1939.html',
            mID: 1939,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1939.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1939);
                    }
                ]
            }
        });
        S.push({
            name: '1927',
            url: '/Division',
            controller: 'c1927',
            templateUrl: v + 'c1927.html',
            mID: 1927,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1927.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1927);
                    }
                ]
            }
        });
        S.push({
            name: '1941',
            url: '/Division/{ID_1941:[0-9]+}',
            controller: 'c1941',
            templateUrl: v + 'c1941.html',
            mID: 1941,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1941.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1941);
                    }
                ]
            }
        });
        S.push({
            name: '1928',
            url: '/Department',
            controller: 'c1928',
            templateUrl: v + 'c1928.html',
            mID: 1928,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1928.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1928);
                    }
                ]
            }
        });
        S.push({
            name: '1944',
            url: '/Department/{ID_1944:[0-9]+}',
            controller: 'c1944',
            templateUrl: v + 'c1944.html',
            mID: 1944,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1944.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1944);
                    }
                ]
            }
        });
        S.push({
            name: '1929',
            url: '/Section',
            controller: 'c1929',
            templateUrl: v + 'c1929.html',
            mID: 1929,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1929.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1929);
                    }
                ]
            }
        });
        S.push({
            name: '1947',
            url: '/Section/{ID_1947:[0-9]+}',
            controller: 'c1947',
            templateUrl: v + 'c1947.html',
            mID: 1947,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1947.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1947);
                    }
                ]
            }
        });
        S.push({
            name: '1930',
            url: '/Job-Class-Group',
            controller: 'c1930',
            templateUrl: v + 'c1930.html',
            mID: 1930,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1930.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1930);
                    }
                ]
            }
        });
        S.push({
            name: '1949',
            url: '/Job-Class-Group/{ID_1949:[0-9]+}',
            controller: 'c1949',
            templateUrl: v + 'c1949.html',
            mID: 1949,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1949.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1949);
                    }
                ]
            }
        });
        S.push({
            name: '1931',
            url: '/Job-Class',
            controller: 'c1931',
            templateUrl: v + 'c1931.html',
            mID: 1931,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1931.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1931);
                    }
                ]
            }
        });
        S.push({
            name: '1950',
            url: '/Job-Class/{ID_1950:[0-9]+}',
            controller: 'c1950',
            templateUrl: v + 'c1950.html',
            mID: 1950,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1950.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1950);
                    }
                ]
            }
        });
        S.push({
            name: '1932',
            url: '/Position',
            controller: 'c1932',
            templateUrl: v + 'c1932.html',
            mID: 1932,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1932.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1932);
                    }
                ]
            }
        });
        S.push({
            name: '1960',
            url: '/Position/{ID_1960:[0-9]+}',
            controller: 'c1960',
            templateUrl: v + 'c1960.html',
            mID: 1960,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1960.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1960);
                    }
                ]
            }
        });
        S.push({
            name: '1933',
            url: '/Bank-Accounts',
            controller: 'c1933',
            templateUrl: v + 'c1933.html',
            mID: 1933,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1933.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1933);
                    }
                ]
            }
        });
        S.push({
            name: '1951',
            url: '/Bank-Accounts/{ID_1951:[0-9]+}',
            controller: 'c1951',
            templateUrl: v + 'c1951.html',
            mID: 1951,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1951.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1951);
                    }
                ]
            }
        });
        S.push({
            name: '1934',
            url: '/Cost-Center',
            controller: 'c1934',
            templateUrl: v + 'c1934.html',
            mID: 1934,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1934.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1934);
                    }
                ]
            }
        });
        S.push({
            name: '1954',
            url: '/Cost-Center/{ID_1954:[0-9]+}',
            controller: 'c1954',
            templateUrl: v + 'c1954.html',
            mID: 1954,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1954.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1954);
                    }
                ]
            }
        });
        S.push({
            name: '1935',
            url: '/Organizational-Chart',
            controller: 'c1935',
            templateUrl: v + 'c1935.html',
            mID: 1935,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1935.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1935);
                    }
                ]
            }
        });
        S.push({
            name: '1955',
            url: '/Organizational-Chart/{ID_1955:[0-9]+}',
            controller: 'c1955',
            templateUrl: v + 'c1955.html',
            mID: 1955,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c1955.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(1955);
                    }
                ]
            }
        });
        S.push({
            name: '2006',
            url: '/Payroll-Item',
            controller: 'c2006',
            templateUrl: v + 'c2006.html',
            mID: 2006,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2006.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2006);
                    }
                ]
            }
        });
        S.push({
            name: '2015',
            url: '/Payroll-Item/{ID_2015:[0-9]+}',
            controller: 'c2015',
            templateUrl: v + 'c2015.html',
            mID: 2015,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2015.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2015);
                    }
                ]
            }
        });
        S.push({
            name: '2024',
            url: '/Payroll-Item-Group',
            controller: 'c2024',
            templateUrl: v + 'c2024.html',
            mID: 2024,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2024.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2024);
                    }
                ]
            }
        });
        S.push({
            name: '2007',
            url: '/Payroll-Item-Group/{ID_2007:[0-9]+}',
            controller: 'c2007',
            templateUrl: v + 'c2007.html',
            mID: 2007,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2007.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2007);
                    }
                ]
            }
        });
        S.push({
            name: '2025',
            url: '/Payroll-Parameter',
            controller: 'c2025',
            templateUrl: v + 'c2025.html',
            mID: 2025,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2025.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2025);
                    }
                ]
            }
        });
        S.push({
            name: '2008',
            url: '/Payroll-Parameter/{ID_2008:[0-9]+}',
            controller: 'c2008',
            templateUrl: v + 'c2008.html',
            mID: 2008,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2008.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2008);
                    }
                ]
            }
        });
        S.push({
            name: '2009',
            url: '/Tax-Exemption',
            controller: 'c2009',
            templateUrl: v + 'c2009.html',
            mID: 2009,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2009.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2009);
                    }
                ]
            }
        });
        S.push({
            name: '2026',
            url: '/Tax-Exemption/{ID_2026:[0-9]+}',
            controller: 'c2026',
            templateUrl: v + 'c2026.html',
            mID: 2026,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2026.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2026);
                    }
                ]
            }
        });
        S.push({
            name: '2010',
            url: '/SSS-Table',
            controller: 'c2010',
            templateUrl: v + 'c2010.html',
            mID: 2010,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2010.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2010);
                    }
                ]
            }
        });
        S.push({
            name: '2027',
            url: '/SSS-Table/{ID_2027:[0-9]+}',
            controller: 'c2027',
            templateUrl: v + 'c2027.html',
            mID: 2027,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2027.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2027);
                    }
                ]
            }
        });
        S.push({
            name: '2011',
            url: '/Philhealth-Table',
            controller: 'c2011',
            templateUrl: v + 'c2011.html',
            mID: 2011,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2011.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2011);
                    }
                ]
            }
        });
        S.push({
            name: '2028',
            url: '/Philhealth-Table/{ID_2028:[0-9]+}',
            controller: 'c2028',
            templateUrl: v + 'c2028.html',
            mID: 2028,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2028.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2028);
                    }
                ]
            }
        });
        S.push({
            name: '2012',
            url: '/HDMF-Table',
            controller: 'c2012',
            templateUrl: v + 'c2012.html',
            mID: 2012,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2012.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2012);
                    }
                ]
            }
        });
        S.push({
            name: '2029',
            url: '/HDMF-Table/{ID_2029:[0-9]+}',
            controller: 'c2029',
            templateUrl: v + 'c2029.html',
            mID: 2029,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2029.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2029);
                    }
                ]
            }
        });
        S.push({
            name: '2013',
            url: '/Income-Tax-Table',
            controller: 'c2013',
            templateUrl: v + 'c2013.html',
            mID: 2013,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2013.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2013);
                    }
                ]
            }
        });
        S.push({
            name: '2030',
            url: '/Income-Tax-Table/{ID_2030:[0-9]+}',
            controller: 'c2030',
            templateUrl: v + 'c2030.html',
            mID: 2030,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2030.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2030);
                    }
                ]
            }
        });
        S.push({
            name: '2014',
            url: '/Income-Tax-Exemption',
            controller: 'c2014',
            templateUrl: v + 'c2014.html',
            mID: 2014,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2014.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2014);
                    }
                ]
            }
        });
        S.push({
            name: '2031',
            url: '/Income-Tax-Exemption/{ID_2031:[0-9]+}',
            controller: 'c2031',
            templateUrl: v + 'c2031.html',
            mID: 2031,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c2031.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(2031);
                    }
                ]
            }
        });
        S.push({
            name: '4182',
            url: '/Employee-Movement-Type',
            controller: 'c4182',
            templateUrl: v + 'c4182.html',
            mID: 4182,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4182.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4182);
                    }
                ]
            }
        });
        S.push({
            name: '4183',
            url: '/Employee-Movement-Type/{ID_4183:[0-9]+}',
            controller: 'c4183',
            templateUrl: v + 'c4183.html',
            mID: 4183,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4183.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4183);
                    }
                ]
            }
        });
        S.push({
            name: '4184',
            url: '/Employee-Status',
            controller: 'c4184',
            templateUrl: v + 'c4184.html',
            mID: 4184,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4184.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4184);
                    }
                ]
            }
        });
        S.push({
            name: '4185',
            url: '/Employee-Status/{ID_4185:[0-9]+}',
            controller: 'c4185',
            templateUrl: v + 'c4185.html',
            mID: 4185,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4185.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4185);
                    }
                ]
            }
        });
        S.push({
            name: '4186',
            url: '/Leave-Parameter',
            controller: 'c4186',
            templateUrl: v + 'c4186.html',
            mID: 4186,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4186.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4186);
                    }
                ]
            }
        });
        S.push({
            name: '4187',
            url: '/Leave-Parameter/{ID_4187:[0-9]+}',
            controller: 'c4187',
            templateUrl: v + 'c4187.html',
            mID: 4187,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4187.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4187);
                    }
                ]
            }
        });
        S.push({
            name: '4187.4188',
            mID: 4188,
            url: '/State_4188/{ID_4188:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c4188.html',
                    controller: 'c4188',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c4188.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '4190',
            url: '/Onboarding-Checklist',
            controller: 'c4190',
            templateUrl: v + 'c4190.html',
            mID: 4190,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4190.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4190);
                    }
                ]
            }
        });
        S.push({
            name: '4191',
            url: '/Onboarding-Checklist/{ID_4191:[0-9]+}',
            controller: 'c4191',
            templateUrl: v + 'c4191.html',
            mID: 4191,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4191.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4191);
                    }
                ]
            }
        });
        S.push({
            name: '4194',
            url: '/Holiday',
            controller: 'c4194',
            templateUrl: v + 'c4194.html',
            mID: 4194,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4194.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4194);
                    }
                ]
            }
        });
        S.push({
            name: '4195',
            url: '/Holiday/{ID_4195:[0-9]+}',
            controller: 'c4195',
            templateUrl: v + 'c4195.html',
            mID: 4195,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4195.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4195);
                    }
                ]
            }
        });
        S.push({
            name: '4195.4196',
            mID: 4196,
            url: '/State_4196/{ID_4196:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c4196.html',
                    controller: 'c4196',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c4196.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '4197',
            url: '/Daily-Schedule',
            controller: 'c4197',
            templateUrl: v + 'c4197.html',
            mID: 4197,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4197.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4197);
                    }
                ]
            }
        });
        S.push({
            name: '4198',
            url: '/Daily-Schedule/{ID_4198:[0-9]+}',
            controller: 'c4198',
            templateUrl: v + 'c4198.html',
            mID: 4198,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4198.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4198);
                    }
                ]
            }
        });
        S.push({
            name: '4200',
            url: '/Weekly-Schedule',
            controller: 'c4200',
            templateUrl: v + 'c4200.html',
            mID: 4200,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4200.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4200);
                    }
                ]
            }
        });
        S.push({
            name: '4201',
            url: '/Weekly-Schedule/{ID_4201:[0-9]+}',
            controller: 'c4201',
            templateUrl: v + 'c4201.html',
            mID: 4201,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4201.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4201);
                    }
                ]
            }
        });
        S.push({
            name: '4205',
            url: '/Quarter',
            controller: 'c4205',
            templateUrl: v + 'c4205.html',
            mID: 4205,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4205.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4205);
                    }
                ]
            }
        });
        S.push({
            name: '4206',
            url: '/Quarter/{ID_4206:[0-9]+}',
            controller: 'c4206',
            templateUrl: v + 'c4206.html',
            mID: 4206,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4206.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4206);
                    }
                ]
            }
        });
        S.push({
            name: '4207',
            url: '/Religion',
            controller: 'c4207',
            templateUrl: v + 'c4207.html',
            mID: 4207,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4207.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4207);
                    }
                ]
            }
        });
        S.push({
            name: '4208',
            url: '/Religion/{ID_4208:[0-9]+}',
            controller: 'c4208',
            templateUrl: v + 'c4208.html',
            mID: 4208,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4208.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4208);
                    }
                ]
            }
        });
        S.push({
            name: '4209',
            url: '/Degree',
            controller: 'c4209',
            templateUrl: v + 'c4209.html',
            mID: 4209,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4209.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4209);
                    }
                ]
            }
        });
        S.push({
            name: '4210',
            url: '/Degree/{ID_4210:[0-9]+}',
            controller: 'c4210',
            templateUrl: v + 'c4210.html',
            mID: 4210,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4210.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4210);
                    }
                ]
            }
        });
        S.push({
            name: '4211',
            url: '/City/Province',
            controller: 'c4211',
            templateUrl: v + 'c4211.html',
            mID: 4211,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4211.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4211);
                    }
                ]
            }
        });
        S.push({
            name: '4212',
            url: '/City/Province/{ID_4212:[0-9]+}',
            controller: 'c4212',
            templateUrl: v + 'c4212.html',
            mID: 4212,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4212.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4212);
                    }
                ]
            }
        });
        S.push({
            name: '4213',
            url: '/City-Address',
            controller: 'c4213',
            templateUrl: v + 'c4213.html',
            mID: 4213,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4213.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4213);
                    }
                ]
            }
        });
        S.push({
            name: '4214',
            url: '/City-Address/{ID_4214:[0-9]+}',
            controller: 'c4214',
            templateUrl: v + 'c4214.html',
            mID: 4214,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4214.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4214);
                    }
                ]
            }
        });
        S.push({
            name: '4215',
            url: '/Region',
            controller: 'c4215',
            templateUrl: v + 'c4215.html',
            mID: 4215,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4215.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4215);
                    }
                ]
            }
        });
        S.push({
            name: '4216',
            url: '/Region/{ID_4216:[0-9]+}',
            controller: 'c4216',
            templateUrl: v + 'c4216.html',
            mID: 4216,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4216.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4216);
                    }
                ]
            }
        });
        S.push({
            name: '4217',
            url: '/Filing-Status',
            controller: 'c4217',
            templateUrl: v + 'c4217.html',
            mID: 4217,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4217.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4217);
                    }
                ]
            }
        });
        S.push({
            name: '4218',
            url: '/Filing-Status/{ID_4218:[0-9]+}',
            controller: 'c4218',
            templateUrl: v + 'c4218.html',
            mID: 4218,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4218.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4218);
                    }
                ]
            }
        });
        S.push({
            name: '4220',
            url: '/Employee-Info',
            controller: 'c4220',
            templateUrl: v + 'c4220.html',
            mID: 4220,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4220.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4220);
                    }
                ]
            }
        });
        S.push({
            name: '4221',
            url: '/Employee-Info/{ID_4221:[0-9]+}',
            controller: 'c4221',
            templateUrl: v + 'c4221.html',
            mID: 4221,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4221.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4221);
                    }
                ]
            }
        });
        S.push({
            name: '4231',
            url: '/Employee-Records-(201-File)',
            controller: 'c4231',
            templateUrl: v + 'c4231.html',
            mID: 4231,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4231.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4231);
                    }
                ]
            }
        });
        S.push({
            name: '4232',
            url: '/Employee-Records-(201-File)/{ID_4232:[0-9]+}',
            controller: 'c4232',
            templateUrl: v + 'c4232.html',
            mID: 4232,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c4232.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(4232);
                    }
                ]
            }
        });
        S.push({
            name: '4232.4238',
            mID: 4238,
            url: '/State_4238/{ID_4238:[0-9]+}',
            onEnter: function($modal, $state, $stateParams) {
                $modal.open({
                    templateUrl: v + 'c4238.html',
                    controller: 'c4238',
                    backdrop: 'static',
                    keyboard: true,
                    size: 'xl',
                    draggable: true,
                    resolve: {
                        load: ['$q', '$rootScope',
                            function(q, R) {
                                var d = [c + 'c4238.js'];
                                return rD(q, R, d);
                            }
                        ]
                    }
                }).result.then(function(result) {}, function() {
                    $state.go('^')
                });
            }
        });
        S.push({
            name: '5234',
            url: '/Separated-Employees',
            controller: 'c5234',
            templateUrl: v + 'c5234.html',
            mID: 5234,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c5234.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(5234);
                    }
                ]
            }
        });
        S.push({
            name: '5235',
            url: '/Separated-Employees/{ID_5235:[0-9]+}',
            controller: 'c5235',
            templateUrl: v + 'c5235.html',
            mID: 5235,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c5235.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(5235);
                    }
                ]
            }
        });
        S.push({
            name: '5238',
            url: '/Salary-Adjustment',
            controller: 'c5238',
            templateUrl: v + 'c5238.html',
            mID: 5238,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c5238.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(5238);
                    }
                ]
            }
        });
        S.push({
            name: '5239',
            url: '/Salary-Adjustment/{ID_5239:[0-9]+}',
            controller: 'c5239',
            templateUrl: v + 'c5239.html',
            mID: 5239,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c5239.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(5239);
                    }
                ]
            }
        });
        S.push({
            name: '5241',
            url: '/Employee-Movement',
            controller: 'c5241',
            templateUrl: v + 'c5241.html',
            mID: 5241,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c5241.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(5241);
                    }
                ]
            }
        });
        S.push({
            name: '5242',
            url: '/Employee-Movement/{ID_5242:[0-9]+}',
            controller: 'c5242',
            templateUrl: v + 'c5242.html',
            mID: 5242,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c5242.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(5242);
                    }
                ]
            }
        });
        S.push({
            name: '259',
            url: '/Official-Business-Approvals',
            controller: 'c259',
            templateUrl: v + 'c259.html',
            mID: 259,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c259.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(259);
                    }
                ]
            }
        });
        S.push({
            name: '127',
            url: '/Official-Business-Approvals/{ID_127:[0-9]+}',
            controller: 'c127',
            templateUrl: v + 'c127.html',
            mID: 127,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c127.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(127);
                    }
                ]
            }
        });
        S.push({
            name: '260',
            url: '/Missed-Log-Approvals',
            controller: 'c260',
            templateUrl: v + 'c260.html',
            mID: 260,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c260.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(260);
                    }
                ]
            }
        });
        S.push({
            name: '128',
            url: '/Missed-Log-Approvals/{ID_128:[0-9]+}',
            controller: 'c128',
            templateUrl: v + 'c128.html',
            mID: 128,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c128.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(128);
                    }
                ]
            }
        });
        S.push({
            name: '261',
            url: '/Leave-Approvals',
            controller: 'c261',
            templateUrl: v + 'c261.html',
            mID: 261,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c261.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(261);
                    }
                ]
            }
        });
        S.push({
            name: '129',
            url: '/Leave-Approvals/{ID_129:[0-9]+}',
            controller: 'c129',
            templateUrl: v + 'c129.html',
            mID: 129,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c129.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(129);
                    }
                ]
            }
        });
        S.push({
            name: '262',
            url: '/Overtime-Approvals',
            controller: 'c262',
            templateUrl: v + 'c262.html',
            mID: 262,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c262.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(262);
                    }
                ]
            }
        });
        S.push({
            name: '130',
            url: '/Overtime-Approvals/{ID_130:[0-9]+}',
            controller: 'c130',
            templateUrl: v + 'c130.html',
            mID: 130,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c130.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(130);
                    }
                ]
            }
        });
        S.push({
            name: '264',
            url: '/Undertime-Approvals',
            controller: 'c264',
            templateUrl: v + 'c264.html',
            mID: 264,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c264.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(264);
                    }
                ]
            }
        });
        S.push({
            name: '132',
            url: '/Undertime-Approvals/{ID_132:[0-9]+}',
            controller: 'c132',
            templateUrl: v + 'c132.html',
            mID: 132,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c132.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(132);
                    }
                ]
            }
        });
        S.push({
            name: '265',
            url: '/Schedule-Approvals',
            controller: 'c265',
            templateUrl: v + 'c265.html',
            mID: 265,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c265.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(265);
                    }
                ]
            }
        });
        S.push({
            name: '161',
            url: '/Schedule/{ID_161:[0-9]+}',
            controller: 'c161',
            templateUrl: v + 'c161.html',
            mID: 161,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c161.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(161);
                    }
                ]
            }
        });
        S.push({
            name: '760',
            url: '/COS-Approvals',
            controller: 'c760',
            templateUrl: v + 'c760.html',
            mID: 760,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c760.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(760);
                    }
                ]
            }
        });
        S.push({
            name: '761',
            url: '/COS-Approvals/{ID_761:[0-9]+}',
            controller: 'c761',
            templateUrl: v + 'c761.html',
            mID: 761,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c761.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(761);
                    }
                ]
            }
        });
        S.push({
            name: '19',
            url: '/Official-Business',
            controller: 'c19',
            templateUrl: v + 'c19.html',
            mID: 19,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c19.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(19);
                    }
                ]
            }
        });
        S.push({
            name: '92',
            url: '/Official-Business-Application/{ID_92:[0-9]+}',
            controller: 'c92',
            templateUrl: v + 'c92.html',
            mID: 92,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c92.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(92);
                    }
                ]
            }
        });
        S.push({
            name: '20',
            url: '/Missed-Log',
            controller: 'c20',
            templateUrl: v + 'c20.html',
            mID: 20,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c20.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(20);
                    }
                ]
            }
        });
        S.push({
            name: '94',
            url: '/Missed-Log-Application/{ID_94:[0-9]+}',
            controller: 'c94',
            templateUrl: v + 'c94.html',
            mID: 94,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c94.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(94);
                    }
                ]
            }
        });
        S.push({
            name: '21',
            url: '/Leave',
            controller: 'c21',
            templateUrl: v + 'c21.html',
            mID: 21,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c21.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(21);
                    }
                ]
            }
        });
        S.push({
            name: '106',
            url: '/Leave-Application/{ID_106:[0-9]+}',
            controller: 'c106',
            templateUrl: v + 'c106.html',
            mID: 106,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c106.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(106);
                    }
                ]
            }
        });
        S.push({
            name: '22',
            url: '/Overtime',
            controller: 'c22',
            templateUrl: v + 'c22.html',
            mID: 22,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c22.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(22);
                    }
                ]
            }
        });
        S.push({
            name: '93',
            url: '/Overtime-Application/{ID_93:[0-9]+}',
            controller: 'c93',
            templateUrl: v + 'c93.html',
            mID: 93,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c93.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(93);
                    }
                ]
            }
        });
        S.push({
            name: '23',
            url: '/Change-of-Schedule',
            controller: 'c23',
            templateUrl: v + 'c23.html',
            mID: 23,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c23.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(23);
                    }
                ]
            }
        });
        S.push({
            name: '107',
            url: '/Change-of-Schedule-Application/{ID_107:[0-9]+}',
            controller: 'c107',
            templateUrl: v + 'c107.html',
            mID: 107,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c107.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(107);
                    }
                ]
            }
        });
        S.push({
            name: '24',
            url: '/Undertime',
            controller: 'c24',
            templateUrl: v + 'c24.html',
            mID: 24,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c24.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(24);
                    }
                ]
            }
        });
        S.push({
            name: '108',
            url: '/Undertime-Application/{ID_108:[0-9]+}',
            controller: 'c108',
            templateUrl: v + 'c108.html',
            mID: 108,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c108.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(108);
                    }
                ]
            }
        });
        S.push({
            name: '26',
            url: '/Schedule',
            controller: 'c26',
            templateUrl: v + 'c26.html',
            mID: 26,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c26.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(26);
                    }
                ]
            }
        });
        S.push({
            name: '109',
            url: '/Schedule-File-Application/{ID_109:[0-9]+}',
            controller: 'c109',
            templateUrl: v + 'c109.html',
            mID: 109,
            resolve: {
                load: ['$q', '$rootScope',
                    function(q, R) {
                        var d = [c + 'c109.js'];
                        return rD(q, R, d);
                    }
                ],
                resources: ['dataService',
                    function(d) {
                        return d.getResources(109);
                    }
                ]
            }
        });
        angular.forEach(S, function(state) {
            $stateProvider.state(state);
        });
    });
    A.run(function($rootScope, dataService) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (!dataService.HasAccess(toState.mID)) {
                event.preventDefault();
                return false;
            }
        })
    });
    return A;
});