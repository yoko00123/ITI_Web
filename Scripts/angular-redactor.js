(function () {
    'use strict';

    /**
     * usage: <textarea ng-model="content" redactor></textarea>
     *
     *    additional options:
     *      redactor: hash (pass in a redactor options hash)
     *
     */

    var redactorOptions = {};

    angular.module('angular-redactor', [])
        .constant('redactorOptions', redactorOptions)
        .directive('redactor', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {},
                link: function (scope, element, attrs, ngModel) {

                    // Expose scope var with loaded state of Redactor
                    scope.redactorLoaded = false;
                    scope.firstLoad = false;
                    var updateModel = function updateModel(value) {
                        // $timeout to avoid $digest collision
                        $timeout(function () {
                            scope.$apply(function () {

                                ngModel.$setViewValue(value);
                                if (!scope.firstLoad) {
                                    ngModel.$setPristine();
                                    scope.firstLoad = true;
                                    try {
                                        scope.$parent.mainform.$setPristine(); //#EDITED SET FORM TO PRISTINE
                                    } catch (e) {

                                    }
                                }
                            });
                        });
                    },
                        options = {
                            changeCallback: updateModel
                        },
                        additionalOptions = attrs.redactor ?
                            scope.$eval(attrs.redactor) : {},
                        editor,
                        $_element = angular.element(element);

                    angular.extend(options, redactorOptions, additionalOptions);

                    // prevent collision with the constant values on ChangeCallback
                    var changeCallback = additionalOptions.changeCallback || redactorOptions.changeCallback;
                    if (changeCallback) {
                        options.changeCallback = function (value) {
                            updateModel.call(this, value);
                            changeCallback.call(this, value);
                        }
                    }

                    // put in timeout to avoid $digest collision.  call render() to
                    // set the initial value.
                    $timeout(function () {
                        editor = $_element.redactor(options);
                        ngModel.$render();
                    });

                    ngModel.$render = function () {
                        if (angular.isDefined(editor)) {
                            $timeout(function () {
                                $_element.redactor('code.set', ngModel.$viewValue || '');
                                scope.redactorLoaded = true;
                            });
                        }
                    };
                }
            };
        }]);
})();
