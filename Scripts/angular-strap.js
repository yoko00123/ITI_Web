/**
 * angular-strap
 * @version v2.0.5 - 2014-08-07
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, document, undefined) {
    'use strict';
    // Source: module.js
    angular.module('mgcrea.ngStrap', [
      'mgcrea.ngStrap.datepicker',
      'mgcrea.ngStrap.popover',
      'mgcrea.ngStrap.select',
      'mgcrea.ngStrap.tab',
      'mgcrea.ngStrap.timepicker',
      'mgcrea.ngStrap.typeahead'
    ]);

    // Source: datepicker.js
    angular.module('mgcrea.ngStrap.datepicker', [
      'mgcrea.ngStrap.helpers.dateParser',
      'mgcrea.ngStrap.tooltip'
    ]).provider('$datepicker', function () {
        var defaults = this.defaults = {
            animation: 'am-fade',
            prefixClass: 'datepicker',
            placement: 'bottom-left',
            template: 'datepicker.tpl.html',
            trigger: 'focus',
            container: false,
            keyboard: true,
            html: false,
            delay: 0,
            useNative: false,
            dateType: 'date',
            dateFormat: 'shortDate',
            modelDateFormat: null,
            dayFormat: 'dd',
            strictFormat: false,
            autoclose: false,
            minDate: -Infinity,
            maxDate: +Infinity,
            startView: 0,
            minView: 0,
            startWeek: 0,
            daysOfWeekDisabled: '',
            iconLeft: 'glyphicon glyphicon-chevron-left',
            iconRight: 'glyphicon glyphicon-chevron-right'
        };
        this.$get = [
          '$window',
          '$document',
          '$rootScope',
          '$sce',
          '$locale',
          'dateFilter',
          'datepickerViews',
          '$tooltip',
          function ($window, $document, $rootScope, $sce, $locale, dateFilter, datepickerViews, $tooltip) {
              var bodyEl = angular.element($window.document.body);
              var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
              var isTouch = 'createTouch' in $window.document && isNative;
              if (!defaults.lang)
                  defaults.lang = $locale.id;
              function DatepickerFactory(element, controller, config) {
                  var $datepicker = $tooltip(element, angular.extend({}, defaults, config));
                  var parentScope = config.scope;
                  var options = $datepicker.$options;
                  var scope = $datepicker.$scope;
                  if (options.startView)
                      options.startView -= options.minView;
                  // View vars
                  var pickerViews = datepickerViews($datepicker);
                  $datepicker.$views = pickerViews.views;
                  var viewDate = pickerViews.viewDate;
                  scope.$mode = options.startView;
                  scope.$iconLeft = options.iconLeft;
                  scope.$iconRight = options.iconRight;
                  var $picker = $datepicker.$views[scope.$mode];
                  // Scope methods
                  scope.$select = function (date) {
                      $datepicker.select(date);
                  };
                  scope.$selectPane = function (value) {
                      $datepicker.$selectPane(value);
                  };
                  scope.$toggleMode = function () {
                      $datepicker.setMode((scope.$mode + 1) % $datepicker.$views.length);
                  };
                  // Public methods
                  $datepicker.update = function (date) {
                      // console.warn('$datepicker.update() newValue=%o', date);
                      if (angular.isDate(date) && !isNaN(date.getTime())) {
                          $datepicker.$date = date;
                          $picker.update.call($picker, date);
                      }
                      // Build only if pristine
                      $datepicker.$build(true);
                  };
                  $datepicker.updateDisabledDates = function (dateRanges) {
                      options.disabledDateRanges = dateRanges;
                      for (var i = 0, l = scope.rows.length; i < l; i++) {
                          angular.forEach(scope.rows[i], $datepicker.$setDisabledEl);
                      }
                  };
                  $datepicker.select = function (date, keep) {
                      // console.warn('$datepicker.select', date, scope.$mode);
                      if (!angular.isDate(controller.$dateValue))
                          controller.$dateValue = new Date(date);
                      if (!scope.$mode || keep) {
                          controller.$setViewValue(angular.copy(date));
                          controller.$render();
                          if (options.autoclose && !keep) {
                              $datepicker.hide(true);
                          }
                      } else {
                          angular.extend(viewDate, {
                              year: date.getFullYear(),
                              month: date.getMonth(),
                              date: date.getDate()
                          });
                          $datepicker.setMode(scope.$mode - 1);
                          $datepicker.$build();
                      }
                  };
                  $datepicker.setMode = function (mode) {
                      // console.warn('$datepicker.setMode', mode);
                      scope.$mode = mode;
                      $picker = $datepicker.$views[scope.$mode];
                      $datepicker.$build();
                  };
                  // Protected methods
                  $datepicker.$build = function (pristine) {
                      // console.warn('$datepicker.$build() viewDate=%o', viewDate);
                      if (pristine === true && $picker.built)
                          return;
                      if (pristine === false && !$picker.built)
                          return;
                      $picker.build.call($picker);
                  };
                  $datepicker.$updateSelected = function () {
                      for (var i = 0, l = scope.rows.length; i < l; i++) {
                          angular.forEach(scope.rows[i], updateSelected);
                      }
                  };
                  $datepicker.$isSelected = function (date) {
                      return $picker.isSelected(date);
                  };
                  $datepicker.$setDisabledEl = function (el) {
                      el.disabled = $picker.isDisabled(el.date);
                  };
                  $datepicker.$selectPane = function (value) {
                      var steps = $picker.steps;
                      var targetDate = new Date(Date.UTC(viewDate.year + (steps.year || 0) * value, viewDate.month + (steps.month || 0) * value, viewDate.date + (steps.day || 0) * value));
                      angular.extend(viewDate, {
                          year: targetDate.getUTCFullYear(),
                          month: targetDate.getUTCMonth(),
                          date: targetDate.getUTCDate()
                      });
                      $datepicker.$build();
                  };
                  $datepicker.$onMouseDown = function (evt) {
                      // Prevent blur on mousedown on .dropdown-menu
                      evt.preventDefault();
                      evt.stopPropagation();
                      // Emulate click for mobile devices
                      if (isTouch) {
                          var targetEl = angular.element(evt.target);
                          if (targetEl[0].nodeName.toLowerCase() !== 'button') {
                              targetEl = targetEl.parent();
                          }
                          targetEl.triggerHandler('click');
                      }
                  };
                  $datepicker.$onKeyDown = function (evt) {
                      if (!/(38|37|39|40|13)/.test(evt.keyCode) || evt.shiftKey || evt.altKey)
                          return;
                      evt.preventDefault();
                      evt.stopPropagation();
                      if (evt.keyCode === 13) {
                          if (!scope.$mode) {
                              return $datepicker.hide(true);
                          } else {
                              return scope.$apply(function () {
                                  $datepicker.setMode(scope.$mode - 1);
                              });
                          }
                      }
                      // Navigate with keyboard
                      $picker.onKeyDown(evt);
                      parentScope.$digest();
                  };
                  // Private
                  function updateSelected(el) {
                      el.selected = $datepicker.$isSelected(el.date);
                  }
                  function focusElement() {
                      element[0].focus();
                  }
                  // Overrides
                  var _init = $datepicker.init;
                  $datepicker.init = function () {
                      if (isNative && options.useNative) {
                          element.prop('type', 'date');
                          element.css('-webkit-appearance', 'textfield');
                          return;
                      } else if (isTouch) {
                          element.prop('type', 'text');
                          element.attr('readonly', 'true');
                          element.on('click', focusElement);
                      }
                      _init();
                  };
                  var _destroy = $datepicker.destroy;
                  $datepicker.destroy = function () {
                      if (isNative && options.useNative) {
                          element.off('click', focusElement);
                      }
                      _destroy();
                  };
                  var _show = $datepicker.show;
                  $datepicker.show = function () {
                      _show();
                      setTimeout(function () {
                          $datepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
                          if (options.keyboard) {
                              element.on('keydown', $datepicker.$onKeyDown);
                          }
                      });
                  };
                  var _hide = $datepicker.hide;
                  $datepicker.hide = function (blur) {
                      $datepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
                      if (options.keyboard) {
                          element.off('keydown', $datepicker.$onKeyDown);
                      }
                      _hide(blur);
                  };
                  return $datepicker;
              }
              DatepickerFactory.defaults = defaults;
              return DatepickerFactory;
          }
        ];
    }).directive('bsDatepicker', [
      '$window',
      '$parse',
      '$q',
      '$locale',
      'dateFilter',
      '$datepicker',
      '$dateParser',
      '$timeout',
      function ($window, $parse, $q, $locale, dateFilter, $datepicker, $dateParser, $timeout) {
          var defaults = $datepicker.defaults;
          var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
          var isNumeric = function (n) {
              return !isNaN(parseFloat(n)) && isFinite(n);
          };
          return {
              restrict: 'EAC',
              require: 'ngModel',
              link: function postLink(scope, element, attr, controller) {
                  // Directive options
                  var options = {
                      scope: scope,
                      controller: controller
                  };
                  angular.forEach([
                    'placement',
                    'container',
                    'delay',
                    'trigger',
                    'keyboard',
                    'html',
                    'animation',
                    'template',
                    'autoclose',
                    'dateType',
                    'dateFormat',
                    'modelDateFormat',
                    'dayFormat',
                    'strictFormat',
                    'startWeek',
                    'startDate',
                    'useNative',
                    'lang',
                    'startView',
                    'minView',
                    'iconLeft',
                    'iconRight',
                    'daysOfWeekDisabled'
                  ], function (key) {
                      if (angular.isDefined(attr[key]))
                          options[key] = attr[key];
                  });
                  // Visibility binding support
                  attr.bsShow && scope.$watch(attr.bsShow, function (newValue, oldValue) {
                      if (!datepicker || !angular.isDefined(newValue))
                          return;
                      if (angular.isString(newValue))
                          newValue = newValue.match(',?(datepicker),?');
                      newValue === true ? datepicker.show() : datepicker.hide();
                  });
                  // Set expected iOS format
                  if (isNative && options.useNative)
                      options.dateFormat = 'yyyy-MM-dd';
                  // Initialize datepicker
                  var datepicker = $datepicker(element, controller, options);
                  options = datepicker.$options;
                  // Observe attributes for changes
                  angular.forEach([
                    'minDate',
                    'maxDate'
                  ], function (key) {
                      // console.warn('attr.$observe(%s)', key, attr[key]);
                      angular.isDefined(attr[key]) && attr.$observe(key, function (newValue) {
                          // console.warn('attr.$observe(%s)=%o', key, newValue);
                          if (newValue === 'today') {
                              var today = new Date();
                              datepicker.$options[key] = +new Date(today.getFullYear(), today.getMonth(), today.getDate() + (key === 'maxDate' ? 1 : 0), 0, 0, 0, key === 'minDate' ? 0 : -1);
                          } else if (angular.isString(newValue) && newValue.match(/^".+"$/)) {
                              // Support {{ dateObj }}
                              datepicker.$options[key] = +new Date(newValue.substr(1, newValue.length - 2));
                          } else if (isNumeric(newValue)) {
                              datepicker.$options[key] = +new Date(parseInt(newValue, 10));
                          } else if (angular.isString(newValue) && 0 === newValue.length) {
                              // Reset date
                              datepicker.$options[key] = key === 'maxDate' ? +Infinity : -Infinity;
                          } else {
                              datepicker.$options[key] = +new Date(newValue);
                          }
                          // Build only if dirty
                          !isNaN(datepicker.$options[key]) && datepicker.$build(false);
                      });
                  });
                  // Watch model for changes
                  scope.$watch(attr.ngModel, function (newValue, oldValue) {
                      datepicker.update(controller.$dateValue);
                  }, true);
                  // Normalize undefined/null/empty array,
                  // so that we don't treat changing from undefined->null as a change.
                  function normalizeDateRanges(ranges) {
                      if (!ranges || !ranges.length)
                          return null;
                      return ranges;
                  }
                  if (angular.isDefined(attr.disabledDates)) {
                      scope.$watch(attr.disabledDates, function (disabledRanges, previousValue) {
                          disabledRanges = normalizeDateRanges(disabledRanges);
                          previousValue = normalizeDateRanges(previousValue);
                          if (disabledRanges !== previousValue) {
                              datepicker.updateDisabledDates(disabledRanges);
                          }
                      });
                  }
                  var dateParser = $dateParser({
                      format: options.dateFormat,
                      lang: options.lang,
                      strict: options.strictFormat
                  });
                  // viewValue -> $parsers -> modelValue
                  controller.$parsers.unshift(function (viewValue) {
                      // console.warn('$parser("%s"): viewValue=%o', element.attr('ng-model'), viewValue);
                      // Null values should correctly reset the model value & validity
                      if (!viewValue) {
                          controller.$setValidity('date', true);
                          return;
                      }
                      var parsedDate = dateParser.parse(viewValue, controller.$dateValue);
                      if (!parsedDate || isNaN(parsedDate.getTime())) {
                          controller.$setValidity('date', false);
                          return;
                      } else {
                          var isMinValid = isNaN(datepicker.$options.minDate) || parsedDate.getTime() >= datepicker.$options.minDate;
                          var isMaxValid = isNaN(datepicker.$options.maxDate) || parsedDate.getTime() <= datepicker.$options.maxDate;
                          var isValid = isMinValid && isMaxValid;
                          controller.$setValidity('date', isValid);
                          controller.$setValidity('min', isMinValid);
                          controller.$setValidity('max', isMaxValid);
                          // Only update the model when we have a valid date
                          if (isValid)
                              controller.$dateValue = parsedDate;
                      }
                      if (options.dateType === 'string') {
                          return dateFilter(parsedDate, options.modelDateFormat || options.dateFormat);
                      } else if (options.dateType === 'number') {
                          return controller.$dateValue.getTime();
                      } else if (options.dateType === 'iso') {
                          return controller.$dateValue.toISOString();
                      } else {
                          return new Date(controller.$dateValue);
                      }
                  });
                  // modelValue -> $formatters -> viewValue
                  controller.$formatters.push(function (modelValue) {
                      // console.warn('$formatter("%s"): modelValue=%o (%o)', element.attr('ng-model'), modelValue, typeof modelValue);
                      var date;
                      if (angular.isUndefined(modelValue) || modelValue === null) {
                          date = NaN;
                      } else if (angular.isDate(modelValue)) {
                          date = modelValue;
                      } else if (options.dateType === 'string') {
                          date = dateParser.parse(modelValue, null, options.modelDateFormat);
                      } else {
                          date = new Date(modelValue);
                      }
                      // Setup default value?
                      // if(isNaN(date.getTime())) {
                      //   var today = new Date();
                      //   date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
                      // }
                      controller.$dateValue = date;
                      return controller.$dateValue;
                  });
                  // viewValue -> element
                  controller.$render = function () {
                      // console.warn('$render("%s"): viewValue=%o', element.attr('ng-model'), controller.$viewValue);
                      element.val(!controller.$dateValue || isNaN(controller.$dateValue.getTime()) ? '' : dateFilter(controller.$dateValue, options.dateFormat));
                  };
                  // Garbage collection
                  scope.$on('$destroy', function () {
                      if (datepicker)
                          datepicker.destroy();
                      options = null;
                      datepicker = null;
                  });
              }
          };
      }
    ]).provider('datepickerViews', function () {
        var defaults = this.defaults = {
            dayFormat: 'dd',
            daySplit: 7
        };
        // Split array into smaller arrays
        function split(arr, size) {
            var arrays = [];
            while (arr.length > 0) {
                arrays.push(arr.splice(0, size));
            }
            return arrays;
        }
        // Modulus operator
        function mod(n, m) {
            return (n % m + m) % m;
        }
        this.$get = [
          '$locale',
          '$sce',
          'dateFilter',
          function ($locale, $sce, dateFilter) {
              return function (picker) {
                  var scope = picker.$scope;
                  var options = picker.$options;
                  var weekDaysMin = $locale.DATETIME_FORMATS.SHORTDAY;
                  var weekDaysLabels = weekDaysMin.slice(options.startWeek).concat(weekDaysMin.slice(0, options.startWeek));
                  var weekDaysLabelsHtml = $sce.trustAsHtml('<th class="dow text-center">' + weekDaysLabels.join('</th><th class="dow text-center">') + '</th>');
                  var startDate = picker.$date || (options.startDate ? new Date(options.startDate) : new Date());
                  var viewDate = {
                      year: startDate.getFullYear(),
                      month: startDate.getMonth(),
                      date: startDate.getDate()
                  };
                  var timezoneOffset = startDate.getTimezoneOffset() * 60000;
                  var views = [
                      {
                          format: options.dayFormat,
                          split: 7,
                          steps: { month: 1 },
                          update: function (date, force) {
                              if (!this.built || force || date.getFullYear() !== viewDate.year || date.getMonth() !== viewDate.month) {
                                  angular.extend(viewDate, {
                                      year: picker.$date.getFullYear(),
                                      month: picker.$date.getMonth(),
                                      date: picker.$date.getDate()
                                  });
                                  picker.$build();
                              } else if (date.getDate() !== viewDate.date) {
                                  viewDate.date = picker.$date.getDate();
                                  picker.$updateSelected();
                              }
                          },
                          build: function () {
                              var firstDayOfMonth = new Date(viewDate.year, viewDate.month, 1), firstDayOfMonthOffset = firstDayOfMonth.getTimezoneOffset();
                              var firstDate = new Date(+firstDayOfMonth - mod(firstDayOfMonth.getDay() - options.startWeek, 7) * 86400000), firstDateOffset = firstDate.getTimezoneOffset();
                              // Handle daylight time switch
                              if (firstDateOffset !== firstDayOfMonthOffset)
                                  firstDate = new Date(+firstDate + (firstDateOffset - firstDayOfMonthOffset) * 60000);
                              var days = [], day;
                              for (var i = 0; i < 42; i++) {
                                  // < 7 * 6
                                  day = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i);
                                  days.push({
                                      date: day,
                                      label: dateFilter(day, this.format),
                                      selected: picker.$date && this.isSelected(day),
                                      muted: day.getMonth() !== viewDate.month,
                                      disabled: this.isDisabled(day)
                                  });
                              }
                              scope.title = dateFilter(firstDayOfMonth, 'MMMM yyyy');
                              scope.showLabels = true;
                              scope.labels = weekDaysLabelsHtml;
                              scope.rows = split(days, this.split);
                              this.built = true;
                          },
                          isSelected: function (date) {
                              return picker.$date && date.getFullYear() === picker.$date.getFullYear() && date.getMonth() === picker.$date.getMonth() && date.getDate() === picker.$date.getDate();
                          },
                          isDisabled: function (date) {
                              var time = date.getTime();
                              // Disabled because of min/max date.
                              if (time < options.minDate || time > options.maxDate)
                                  return true;
                              // Disabled due to being a disabled day of the week
                              if (options.daysOfWeekDisabled.indexOf(date.getDay()) !== -1)
                                  return true;
                              // Disabled because of disabled date range.
                              if (options.disabledDateRanges) {
                                  for (var i = 0; i < options.disabledDateRanges.length; i++) {
                                      if (time >= options.disabledDateRanges[i].start) {
                                          if (time <= options.disabledDateRanges[i].end)
                                              return true;
                                          // The disabledDateRanges is expected to be sorted, so if time >= start,
                                          // we know it's not disabled.
                                          return false;
                                      }
                                  }
                              }
                              return false;
                          },
                          onKeyDown: function (evt) {
                              var actualTime = picker.$date.getTime();
                              var newDate;
                              if (evt.keyCode === 37)
                                  newDate = new Date(actualTime - 1 * 86400000);
                              else if (evt.keyCode === 38)
                                  newDate = new Date(actualTime - 7 * 86400000);
                              else if (evt.keyCode === 39)
                                  newDate = new Date(actualTime + 1 * 86400000);
                              else if (evt.keyCode === 40)
                                  newDate = new Date(actualTime + 7 * 86400000);
                              if (!this.isDisabled(newDate))
                                  picker.select(newDate, true);
                          }
                      },
                      {
                          name: 'month',
                          format: 'MMM',
                          split: 4,
                          steps: { year: 1 },
                          update: function (date, force) {
                              if (!this.built || date.getFullYear() !== viewDate.year) {
                                  angular.extend(viewDate, {
                                      year: picker.$date.getFullYear(),
                                      month: picker.$date.getMonth(),
                                      date: picker.$date.getDate()
                                  });
                                  picker.$build();
                              } else if (date.getMonth() !== viewDate.month) {
                                  angular.extend(viewDate, {
                                      month: picker.$date.getMonth(),
                                      date: picker.$date.getDate()
                                  });
                                  picker.$updateSelected();
                              }
                          },
                          build: function () {
                              var firstMonth = new Date(viewDate.year, 0, 1);
                              var months = [], month;
                              for (var i = 0; i < 12; i++) {
                                  month = new Date(viewDate.year, i, 1);
                                  months.push({
                                      date: month,
                                      label: dateFilter(month, this.format),
                                      selected: picker.$isSelected(month),
                                      disabled: this.isDisabled(month)
                                  });
                              }
                              scope.title = dateFilter(month, 'yyyy');
                              scope.showLabels = false;
                              scope.rows = split(months, this.split);
                              this.built = true;
                          },
                          isSelected: function (date) {
                              return picker.$date && date.getFullYear() === picker.$date.getFullYear() && date.getMonth() === picker.$date.getMonth();
                          },
                          isDisabled: function (date) {
                              var lastDate = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
                              return lastDate < options.minDate || date.getTime() > options.maxDate;
                          },
                          onKeyDown: function (evt) {
                              var actualMonth = picker.$date.getMonth();
                              var newDate = new Date(picker.$date);
                              if (evt.keyCode === 37)
                                  newDate.setMonth(actualMonth - 1);
                              else if (evt.keyCode === 38)
                                  newDate.setMonth(actualMonth - 4);
                              else if (evt.keyCode === 39)
                                  newDate.setMonth(actualMonth + 1);
                              else if (evt.keyCode === 40)
                                  newDate.setMonth(actualMonth + 4);
                              if (!this.isDisabled(newDate))
                                  picker.select(newDate, true);
                          }
                      },
                      {
                          name: 'year',
                          format: 'yyyy',
                          split: 4,
                          steps: { year: 12 },
                          update: function (date, force) {
                              if (!this.built || force || parseInt(date.getFullYear() / 20, 10) !== parseInt(viewDate.year / 20, 10)) {
                                  angular.extend(viewDate, {
                                      year: picker.$date.getFullYear(),
                                      month: picker.$date.getMonth(),
                                      date: picker.$date.getDate()
                                  });
                                  picker.$build();
                              } else if (date.getFullYear() !== viewDate.year) {
                                  angular.extend(viewDate, {
                                      year: picker.$date.getFullYear(),
                                      month: picker.$date.getMonth(),
                                      date: picker.$date.getDate()
                                  });
                                  picker.$updateSelected();
                              }
                          },
                          build: function () {
                              var firstYear = viewDate.year - viewDate.year % (this.split * 3);
                              var years = [], year;
                              for (var i = 0; i < 12; i++) {
                                  year = new Date(firstYear + i, 0, 1);
                                  years.push({
                                      date: year,
                                      label: dateFilter(year, this.format),
                                      selected: picker.$isSelected(year),
                                      disabled: this.isDisabled(year)
                                  });
                              }
                              scope.title = years[0].label + '-' + years[years.length - 1].label;
                              scope.showLabels = false;
                              scope.rows = split(years, this.split);
                              this.built = true;
                          },
                          isSelected: function (date) {
                              return picker.$date && date.getFullYear() === picker.$date.getFullYear();
                          },
                          isDisabled: function (date) {
                              var lastDate = +new Date(date.getFullYear() + 1, 0, 0);
                              return lastDate < options.minDate || date.getTime() > options.maxDate;
                          },
                          onKeyDown: function (evt) {
                              var actualYear = picker.$date.getFullYear(), newDate = new Date(picker.$date);
                              if (evt.keyCode === 37)
                                  newDate.setYear(actualYear - 1);
                              else if (evt.keyCode === 38)
                                  newDate.setYear(actualYear - 4);
                              else if (evt.keyCode === 39)
                                  newDate.setYear(actualYear + 1);
                              else if (evt.keyCode === 40)
                                  newDate.setYear(actualYear + 4);
                              if (!this.isDisabled(newDate))
                                  picker.select(newDate, true);
                          }
                      }
                  ];
                  return {
                      views: options.minView ? Array.prototype.slice.call(views, options.minView) : views,
                      viewDate: viewDate
                  };
              };
          }
        ];
    });

    // Source: date-parser.js
    angular.module('mgcrea.ngStrap.helpers.dateParser', []).provider('$dateParser', ['$localeProvider', function ($localeProvider) {
        function ParseDate() {
            this.year = 1970;
            this.month = 0;
            this.day = 1;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.milliseconds = 0;
        }
        ParseDate.prototype.setMilliseconds = function (value) {
            this.milliseconds = value;
        };
        ParseDate.prototype.setSeconds = function (value) {
            this.seconds = value;
        };
        ParseDate.prototype.setMinutes = function (value) {
            this.minutes = value;
        };
        ParseDate.prototype.setHours = function (value) {
            this.hours = value;
        };
        ParseDate.prototype.getHours = function () {
            return this.hours;
        };
        ParseDate.prototype.setDate = function (value) {
            this.day = value;
        };
        ParseDate.prototype.setMonth = function (value) {
            this.month = value;
        };
        ParseDate.prototype.setFullYear = function (value) {
            this.year = value;
        };
        ParseDate.prototype.fromDate = function (value) {
            this.year = value.getFullYear();
            this.month = value.getMonth();
            this.day = value.getDate();
            this.hours = value.getHours();
            this.minutes = value.getMinutes();
            this.seconds = value.getSeconds();
            this.milliseconds = value.getMilliseconds();
            return this;
        };
        ParseDate.prototype.toDate = function () {
            return new Date(this.year, this.month, this.day, this.hours, this.minutes, this.seconds, this.milliseconds);
        };
        var proto = ParseDate.prototype;
        function noop() { }
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        function indexOfCaseInsensitive(array, value) {
            var len = array.length;
            var str = value.toString().toLowerCase();
            for (var i = 0; i < len; i++) {
                if (array[i].toLowerCase() === str) {
                    return i;
                }
            }
            return -1;
        }
        var defaults = this.defaults = {
            format: 'shortDate',
            strict: false
        };
        this.$get = ['$locale', 'dateFilter', function ($locale, dateFilter) {
            var DateParserFactory = function (config) {
                var options = angular.extend({}, defaults, config);
                var $dateParser = {};
                var regExpMap = {
                    sss: '[0-9]{3}',
                    ss: '[0-5][0-9]',
                    s: options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
                    mm: '[0-5][0-9]',
                    m: options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
                    HH: '[01][0-9]|2[0-3]',
                    H: options.strict ? '1?[0-9]|2[0-3]' : '[01]?[0-9]|2[0-3]',
                    hh: '[0][1-9]|[1][012]',
                    h: options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
                    a: 'AM|PM',
                    EEEE: $locale.DATETIME_FORMATS.DAY.join('|'),
                    EEE: $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
                    dd: '0[1-9]|[12][0-9]|3[01]',
                    d: options.strict ? '[1-9]|[1-2][0-9]|3[01]' : '0?[1-9]|[1-2][0-9]|3[01]',
                    MMMM: $locale.DATETIME_FORMATS.MONTH.join('|'),
                    MMM: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
                    MM: '0[1-9]|1[012]',
                    M: options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
                    yyyy: '[1]{1}[0-9]{3}|[2]{1}[0-9]{3}',
                    yy: '[0-9]{2}',
                    y: options.strict ? '-?(0|[1-9][0-9]{0,3})' : '-?0*[0-9]{1,4}'
                };
                var setFnMap = {
                    sss: proto.setMilliseconds,
                    ss: proto.setSeconds,
                    s: proto.setSeconds,
                    mm: proto.setMinutes,
                    m: proto.setMinutes,
                    HH: proto.setHours,
                    H: proto.setHours,
                    hh: proto.setHours,
                    h: proto.setHours,
                    EEEE: noop,
                    EEE: noop,
                    dd: proto.setDate,
                    d: proto.setDate,
                    a: function (value) {
                        var hours = this.getHours() % 12;
                        return this.setHours(value.match(/pm/i) ? hours + 12 : hours);
                    },
                    MMMM: function (value) {
                        return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.MONTH, value));
                    },
                    MMM: function (value) {
                        return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.SHORTMONTH, value));
                    },
                    MM: function (value) {
                        return this.setMonth(1 * value - 1);
                    },
                    M: function (value) {
                        return this.setMonth(1 * value - 1);
                    },
                    yyyy: proto.setFullYear,
                    yy: function (value) {
                        return this.setFullYear(2e3 + 1 * value);
                    },
                    y: function (value) {
                        return 1 * value <= 50 && value.length === 2 ? this.setFullYear(2e3 + 1 * value) : this.setFullYear(1 * value);
                    }
                };
                var regex;
                var setMap;
                $dateParser.init = function () {
                    $dateParser.$format = $locale.DATETIME_FORMATS[options.format] || options.format;
                    regex = regExpForFormat($dateParser.$format);
                    setMap = setMapForFormat($dateParser.$format);
                };
                $dateParser.isValid = function (date) {
                    if (angular.isDate(date)) return !isNaN(date.getTime());
                    return regex.test(date);
                };
                $dateParser.parse = function (value, baseDate, format, timezone) {
                    if (format) format = $locale.DATETIME_FORMATS[format] || format;
                    if (angular.isDate(value)) value = dateFilter(value, format || $dateParser.$format, timezone);
                    var formatRegex = format ? regExpForFormat(format) : regex;
                    var formatSetMap = format ? setMapForFormat(format) : setMap;
                    var matches = formatRegex.exec(value);
                    if (!matches) return false;
                    var date = baseDate && !isNaN(baseDate.getTime()) ? new ParseDate().fromDate(baseDate) : new ParseDate().fromDate(new Date(1970, 0, 1, 0));
                    for (var i = 0; i < matches.length - 1; i++) {
                        if (formatSetMap[i]) formatSetMap[i].call(date, matches[i + 1]);
                    }
                    var newDate = date.toDate();
                    if (parseInt(date.day, 10) !== newDate.getDate()) {
                        return false;
                    }
                    return newDate;
                };
                $dateParser.getDateForAttribute = function (key, value) {
                    var date;
                    if (value === 'today') {
                        var today = new Date();
                        date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (key === 'maxDate' ? 1 : 0), 0, 0, 0, key === 'minDate' ? 0 : -1);
                    } else if (angular.isString(value) && value.match(/^".+"$/)) {
                        date = new Date(value.substr(1, value.length - 2));
                    } else if (isNumeric(value)) {
                        date = new Date(parseInt(value, 10));
                    } else if (angular.isString(value) && value.length === 0) {
                        date = key === 'minDate' ? -Infinity : +Infinity;
                    } else {
                        date = new Date(value);
                    }
                    return date;
                };
                $dateParser.getTimeForAttribute = function (key, value) {
                    var time;
                    if (value === 'now') {
                        time = new Date().setFullYear(1970, 0, 1);
                    } else if (angular.isString(value) && value.match(/^".+"$/)) {
                        time = new Date(value.substr(1, value.length - 2)).setFullYear(1970, 0, 1);
                    } else if (isNumeric(value)) {
                        time = new Date(parseInt(value, 10)).setFullYear(1970, 0, 1);
                    } else if (angular.isString(value) && value.length === 0) {
                        time = key === 'minTime' ? -Infinity : +Infinity;
                    } else {
                        time = $dateParser.parse(value, new Date(1970, 0, 1, 0));
                    }
                    return time;
                };
                $dateParser.daylightSavingAdjust = function (date) {
                    if (!date) {
                        return null;
                    }
                    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                    return date;
                };
                $dateParser.timezoneOffsetAdjust = function (date, timezone, undo) {
                    if (!date) {
                        return null;
                    }
                    if (timezone && timezone === 'UTC') {
                        date = new Date(date.getTime());
                        date.setMinutes(date.getMinutes() + (undo ? -1 : 1) * date.getTimezoneOffset());
                    }
                    return date;
                };
                function regExpForFormat(format) {
                    var re = buildDateAbstractRegex(format);
                    return buildDateParseRegex(re);
                }
                function buildDateAbstractRegex(format) {
                    var escapedFormat = escapeReservedSymbols(format);
                    var escapedLiteralFormat = escapedFormat.replace(/''/g, '\\\'');
                    var literalRegex = /('(?:\\'|.)*?')/;
                    var formatParts = escapedLiteralFormat.split(literalRegex);
                    var dateElements = Object.keys(regExpMap);
                    var dateRegexParts = [];
                    angular.forEach(formatParts, function (part) {
                        if (isFormatStringLiteral(part)) {
                            part = trimLiteralEscapeChars(part);
                        } else {
                            for (var i = 0; i < dateElements.length; i++) {
                                part = part.split(dateElements[i]).join('${' + i + '}');
                            }
                        }
                        dateRegexParts.push(part);
                    });
                    return dateRegexParts.join('');
                }
                function escapeReservedSymbols(text) {
                    return text.replace(/\\/g, '[\\\\]').replace(/-/g, '[-]').replace(/\./g, '[.]').replace(/\*/g, '[*]').replace(/\+/g, '[+]').replace(/\?/g, '[?]').replace(/\$/g, '[$]').replace(/\^/g, '[^]').replace(/\//g, '[/]').replace(/\\s/g, '[\\s]');
                }
                function isFormatStringLiteral(text) {
                    return /^'.*'$/.test(text);
                }
                function trimLiteralEscapeChars(text) {
                    return text.replace(/^'(.*)'$/, '$1');
                }
                function buildDateParseRegex(abstractRegex) {
                    var dateElements = Object.keys(regExpMap);
                    var re = abstractRegex;
                    for (var i = 0; i < dateElements.length; i++) {
                        re = re.split('${' + i + '}').join('(' + regExpMap[dateElements[i]] + ')');
                    }
                    return new RegExp('^' + re + '$', ['i']);
                }
                function setMapForFormat(format) {
                    var re = buildDateAbstractRegex(format);
                    return buildDateParseValuesMap(re);
                }
                function buildDateParseValuesMap(abstractRegex) {
                    var dateElements = Object.keys(regExpMap);
                    var valuesRegex = new RegExp('\\${(\\d+)}', 'g');
                    var valuesMatch;
                    var keyIndex;
                    var valueKey;
                    var valueFunction;
                    var valuesFunctionMap = [];
                    while ((valuesMatch = valuesRegex.exec(abstractRegex)) !== null) {
                        keyIndex = valuesMatch[1];
                        valueKey = dateElements[keyIndex];
                        valueFunction = setFnMap[valueKey];
                        valuesFunctionMap.push(valueFunction);
                    }
                    return valuesFunctionMap;
                }
                $dateParser.init();
                return $dateParser;
            };
            return DateParserFactory;
        }];
    }]);

    angular.module('mgcrea.ngStrap.helpers.dateFormatter', []).service('$dateFormatter', ['$locale', 'dateFilter', function ($locale, dateFilter) {
        this.getDefaultLocale = function () {
            return $locale.id;
        };
        this.getDatetimeFormat = function (format, lang) {
            return $locale.DATETIME_FORMATS[format] || format;
        };
        this.weekdaysShort = function (lang) {
            return $locale.DATETIME_FORMATS.SHORTDAY;
        };
        function splitTimeFormat(format) {
            return /(h+)([:\.])?(m+)([:\.])?(s*)[ ]?(a?)/i.exec(format).slice(1);
        }
        this.hoursFormat = function (timeFormat) {
            return splitTimeFormat(timeFormat)[0];
        };
        this.minutesFormat = function (timeFormat) {
            return splitTimeFormat(timeFormat)[2];
        };
        this.secondsFormat = function (timeFormat) {
            return splitTimeFormat(timeFormat)[4];
        };
        this.timeSeparator = function (timeFormat) {
            return splitTimeFormat(timeFormat)[1];
        };
        this.showSeconds = function (timeFormat) {
            return !!splitTimeFormat(timeFormat)[4];
        };
        this.showAM = function (timeFormat) {
            return !!splitTimeFormat(timeFormat)[5];
        };
        this.formatDate = function (date, format, lang, timezone) {
            return dateFilter(date, format, timezone);
        };
    }]);

    // Source: dimensions.js
    angular.module('mgcrea.ngStrap.helpers.dimensions', []).factory('dimensions', [
      '$document',
      '$window',
      function ($document, $window) {
          var jqLite = angular.element;
          var fn = {};
          /**
           * Test the element nodeName
           * @param element
           * @param name
           */
          var nodeName = fn.nodeName = function (element, name) {
              return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
          };
          /**
           * Returns the element computed style
           * @param element
           * @param prop
           * @param extra
           */
          fn.css = function (element, prop, extra) {
              var value;
              if (element.currentStyle) {
                  //IE
                  value = element.currentStyle[prop];
              } else if (window.getComputedStyle) {
                  value = window.getComputedStyle(element)[prop];
              } else {
                  value = element.style[prop];
              }
              return extra === true ? parseFloat(value) || 0 : value;
          };
          /**
           * Provides read-only equivalent of jQuery's offset function:
           * @required-by bootstrap-tooltip, bootstrap-affix
           * @url http://api.jquery.com/offset/
           * @param element
           */
          fn.offset = function (element) {
              var boxRect = element.getBoundingClientRect();
              var docElement = element.ownerDocument;
              return {
                  width: boxRect.width || element.offsetWidth,
                  height: boxRect.height || element.offsetHeight,
                  top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
                  left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
              };
          };
          /**
           * Provides read-only equivalent of jQuery's position function
           * @required-by bootstrap-tooltip, bootstrap-affix
           * @url http://api.jquery.com/offset/
           * @param element
           */
          fn.position = function (element) {
              var offsetParentRect = {
                  top: 0,
                  left: 0
              }, offsetParentElement, offset;
              // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
              if (fn.css(element, 'position') === 'fixed') {
                  // We assume that getBoundingClientRect is available when computed position is fixed
                  offset = element.getBoundingClientRect();
              } else {
                  // Get *real* offsetParentElement
                  offsetParentElement = offsetParent(element);
                  offset = fn.offset(element);
                  // Get correct offsets
                  offset = fn.offset(element);
                  if (!nodeName(offsetParentElement, 'html')) {
                      offsetParentRect = fn.offset(offsetParentElement);
                  }
                  // Add offsetParent borders
                  offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
                  offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
              }
              // Subtract parent offsets and element margins
              return {
                  width: element.offsetWidth,
                  height: element.offsetHeight,
                  top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
                  left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
              };
          };
          /**
           * Returns the closest, non-statically positioned offsetParent of a given element
           * @required-by fn.position
           * @param element
           */
          var offsetParent = function offsetParentElement(element) {
              var docElement = element.ownerDocument;
              var offsetParent = element.offsetParent || docElement;
              if (nodeName(offsetParent, '#document'))
                  return docElement.documentElement;
              while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
                  offsetParent = offsetParent.offsetParent;
              }
              return offsetParent || docElement.documentElement;
          };
          /**
           * Provides equivalent of jQuery's height function
           * @required-by bootstrap-affix
           * @url http://api.jquery.com/height/
           * @param element
           * @param outer
           */
          fn.height = function (element, outer) {
              var value = element.offsetHeight;
              if (outer) {
                  value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
              } else {
                  value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
              }
              return value;
          };
          /**
           * Provides equivalent of jQuery's width function
           * @required-by bootstrap-affix
           * @url http://api.jquery.com/width/
           * @param element
           * @param outer
           */
          fn.width = function (element, outer) {
              var value = element.offsetWidth;
              if (outer) {
                  value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
              } else {
                  value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
              }
              return value;
          };
          return fn;
      }
    ]);


    // Source: select.js
    angular.module('mgcrea.ngStrap.select', [
      'mgcrea.ngStrap.tooltip',
      'mgcrea.ngStrap.helpers.parseOptions'
    ]).provider('$select', function () {
        var defaults = this.defaults = {
            animation: 'am-fade',
            prefixClass: 'select',
            prefixEvent: '$select',
            placement: 'bottom-left',
            template: 'select/select.tpl.html',
            trigger: 'focus',
            container: false,
            keyboard: true,
            html: false,
            delay: 0,
            multiple: false,
            allNoneButtons: false,
            sort: true,
            caretHtml: '&nbsp;<span class="caret"></span>',
            placeholder: '- SELECT -',
            maxLength: 3,
            maxLengthHtml: 'selected',
            iconCheckmark: 'glyphicon glyphicon-ok'
        };
        this.$get = [
          '$window',
          '$document',
          '$rootScope',
          '$tooltip',
          function ($window, $document, $rootScope, $tooltip) {
              var bodyEl = angular.element($window.document.body);
              var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
              var isTouch = 'createTouch' in $window.document && isNative;
              function SelectFactory(element, controller, config) {
                  var $select = {};
                  // Common vars
                  var options = angular.extend({}, defaults, config);
                  options.width = element.prop('offsetWidth');
                  $select = $tooltip(element, options);
                  var scope = $select.$scope;
                  scope.$matches = [];
                  scope.$activeIndex = 0;
                  scope.$isMultiple = options.multiple;
                  scope.$showAllNoneButtons = options.allNoneButtons && options.multiple;
                  scope.$iconCheckmark = options.iconCheckmark;
                  scope.$activate = function (index) {
                      scope.$$postDigest(function () {
                          $select.activate(index);
                      });
                  };
                  scope.$select = function (match, evt) {

                      scope.$$postDigest(function () {
                          $select.select(scope.$matches.indexOf(match));
                      });
                  };
                  scope.$isVisible = function () {
                      return $select.$isVisible();
                  };
                  scope.$isActive = function (index) {
                      return $select.$isActive(index);
                  };
                  scope.$selectAll = function () {
                      for (var i = 0; i < scope.$matches.length; i++) {
                          if (!scope.$isActive(i)) {
                              scope.$select(i);
                          }
                      }
                  };
                  scope.$selectNone = function () {
                      for (var i = 0; i < scope.$matches.length; i++) {
                          if (scope.$isActive(i)) {
                              scope.$select(i);
                          }
                      }
                  };
                  // Public methods
                  $select.update = function (matches) {
                      scope.$matches = matches;
                      scope.$matches.unshift({ "label": "- Select -", "value": null });
                      $select.$updateActiveIndex();
                  };
                  $select.activate = function (index) {
                      if (options.multiple) {
                          scope.$activeIndex.sort();
                          $select.$isActive(index) ? scope.$activeIndex.splice(scope.$activeIndex.indexOf(index), 1) : scope.$activeIndex.push(index);
                          if (options.sort)
                              scope.$activeIndex.sort();
                      } else {
                          scope.$activeIndex = index;
                      }
                      return scope.$activeIndex;
                  };
                  $select.select = function (index) {
                      var value = scope.$matches[index].value;
                      scope.$apply(function () {
                          $select.activate(index);
                          if (options.multiple) {
                              controller.$setViewValue(scope.$activeIndex.map(function (index) {
                                  return scope.$matches[index].value;
                              }));
                          } else {
                              controller.$setViewValue(value);
                              // Hide if single select
                              $select.hide();
                          }
                      });
                      // Emit event
                      scope.$emit(options.prefixEvent + '.select', value, index);
                  };
                  // Protected methods
                  $select.$updateActiveIndex = function () {
                      if (controller.$modelValue && scope.$matches.length) {
                          if (options.multiple && angular.isArray(controller.$modelValue)) {
                              scope.$activeIndex = controller.$modelValue.map(function (value) {
                                  return $select.$getIndex(value);
                              });
                          } else {
                              scope.$activeIndex = $select.$getIndex(controller.$modelValue);
                          }
                      } else if (scope.$activeIndex >= scope.$matches.length) {
                          scope.$activeIndex = options.multiple ? [] : 0;
                      }
                  };
                  $select.$isVisible = function () {
                      if (!options.minLength || !controller) {
                          return scope.$matches.length;
                      }
                      // minLength support
                      return scope.$matches.length && controller.$viewValue.length >= options.minLength;
                  };
                  $select.$isActive = function (index) {

                      if (options.multiple) {
                          return scope.$activeIndex.indexOf(index) !== -1;
                      } else {
                          return scope.$activeIndex === index;
                      }
                  };
                  $select.$getIndex = function (value) {
                      var l = scope.$matches.length, i = l;
                      if (!l)
                          return;
                      for (i = l; i--;) {
                          if (scope.$matches[i].value === value)
                              break;
                      }
                      if (i < 0)
                          return;
                      return i;
                  };
                  $select.$onMouseDown = function (evt) {
                      // Prevent blur on mousedown on .dropdown-menu
                      evt.preventDefault();
                      evt.stopPropagation();
                      // Emulate click for mobile devices
                      if (isTouch) {
                          var targetEl = angular.element(evt.target);
                          targetEl.triggerHandler('click');
                      }
                  };
                  $select.$onKeyDown = function (evt) {
                      if (!/(9|13|38|40)/.test(evt.keyCode))
                          return;
                      evt.preventDefault();
                      evt.stopPropagation();
                      // Select with enter
                      if (!options.multiple && (evt.keyCode === 13 || evt.keyCode === 9)) {
                          return $select.select(scope.$activeIndex);
                      }
                      // Navigate with keyboard
                      if (evt.keyCode === 38 && scope.$activeIndex > 0)
                          scope.$activeIndex--;
                      else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1)
                          scope.$activeIndex++;
                      else if (angular.isUndefined(scope.$activeIndex))
                          scope.$activeIndex = 0;
                      scope.$digest();
                  };
                  // Overrides
                  var _show = $select.show;
                  $select.show = function () {
                      _show();
                      if (options.multiple) {
                          $select.$element.addClass('select-multiple');
                      }
                      setTimeout(function () {
                          $select.$element.on(isTouch ? 'touchstart' : 'mousedown', $select.$onMouseDown);
                          if (options.keyboard) {
                              element.on('keydown', $select.$onKeyDown);
                          }
                      });
                  };
                  var _hide = $select.hide;
                  $select.hide = function () {
                      $select.$element.off(isTouch ? 'touchstart' : 'mousedown', $select.$onMouseDown);
                      if (options.keyboard) {
                          element.off('keydown', $select.$onKeyDown);
                      }
                      _hide(true);
                  };
                  return $select;
              }
              SelectFactory.defaults = defaults;
              return SelectFactory;
          }
        ];
    }).directive('bsSelect', [
      '$window',
      '$parse',
      '$q',
      '$select',
      '$parseOptions',
      function ($window, $parse, $q, $select, $parseOptions) {
          var defaults = $select.defaults;
          return {
              restrict: 'EAC',
              require: 'ngModel',
              link: function postLink(scope, element, attr, controller) {
                  // Directive options
                  var options = { scope: scope };
                  angular.forEach([
                    'placement',
                    'container',
                    'delay',
                    'trigger',
                    'keyboard',
                    'html',
                    'animation',
                    'template',
                    'placeholder',
                    'multiple',
                    'allNoneButtons',
                    'maxLength',
                    'maxLengthHtml'
                  ], function (key) {
                      if (angular.isDefined(attr[key]))
                          options[key] = attr[key];
                  });
                  // Add support for select markup
                  if (element[0].nodeName.toLowerCase() === 'select') {
                      var inputEl = element;
                      inputEl.css('display', 'none');
                      element = angular.element('<button type="button" class="btn btn-default"></button>');
                      inputEl.after(element);
                  }
                  // Build proper ngOptions
                  var parsedOptions = $parseOptions(attr.ngOptions);
                  // Initialize select
                  var select = $select(element, controller, options);
                  // Watch ngOptions values before filtering for changes
                  var watchedOptions = parsedOptions.$match[7].replace(/\|.+/, '').trim();
                  scope.$watch(watchedOptions, function (newValue, oldValue) {
                      // console.warn('scope.$watch(%s)', watchedOptions, newValue, oldValue);
                      parsedOptions.valuesFn(scope, controller).then(function (values) {
                          select.update(values);
                          controller.$render();
                      });
                  }, true);
                  // Watch model for changes
                  scope.$watch(attr.ngModel, function (newValue, oldValue) {
                      // console.warn('scope.$watch(%s)', attr.ngModel, newValue, oldValue);
                      select.$updateActiveIndex();
                      controller.$render();
                  }, true);
                  // Model rendering in view
                  controller.$render = function () {
                      // console.warn('$render', element.attr('ng-model'), 'controller.$modelValue', typeof controller.$modelValue, controller.$modelValue, 'controller.$viewValue', typeof controller.$viewValue, controller.$viewValue);
                      var selected, index;
                      if (options.multiple && angular.isArray(controller.$modelValue)) {
                          selected = controller.$modelValue.map(function (value) {
                              index = select.$getIndex(value);
                              return angular.isDefined(index) ? select.$scope.$matches[index].label : false;
                          }).filter(angular.isDefined);
                          if (selected.length > (options.maxLength || defaults.maxLength)) {
                              selected = selected.length + ' ' + (options.maxLengthHtml || defaults.maxLengthHtml);
                          } else {
                              selected = selected.join(', ');
                          }
                      } else {
                          index = select.$getIndex(controller.$modelValue);
                          selected = angular.isDefined(index) ? select.$scope.$matches[index].label : false;
                      }
                      element.html((selected ? selected : attr.placeholder || defaults.placeholder) + defaults.caretHtml);
                  };
                  // Garbage collection
                  scope.$on('$destroy', function () {
                      select.destroy();
                      options = null;
                      select = null;
                  });
              }
          };
      }
    ]);



    // Source: tab.js
    angular.module('mgcrea.ngStrap.tab', [])

    .provider('$tab', function () {

        var defaults = this.defaults = {
            animation: 'am-fade',
            template: 'tab.tpl.html',
            navClass: 'nav-tabs',
            activeClass: 'active'
        };

        var controller = this.controller = function ($scope, $element, $attrs) {
            var self = this;

            // Attributes options
            self.$options = angular.copy(defaults);
            angular.forEach(['animation', 'navClass', 'activeClass'], function (key) {
                if (angular.isDefined($attrs[key])) self.$options[key] = $attrs[key];
            });

            // Publish options on scope
            $scope.$navClass = self.$options.navClass;
            $scope.$activeClass = self.$options.activeClass;

            self.$panes = $scope.$panes = [];

            self.$viewChangeListeners = [];

            self.$push = function (pane) {
                self.$panes.push(pane);
            };
            //#EDITED
            self.select = function (i) {
                self.$panes[i].onSelect();
            }
            self.$panes.$active = 0;
            self.$setActive = $scope.$setActive = function (value) {
                self.$panes.$active = value;
                self.select(value);
                self.$viewChangeListeners.forEach(function (fn) {
                    fn();
                });
                try {
                    $scope.mainform.$setPristine();
                } catch (e) { }

            };

        };

        this.$get = function () {
            var $tab = {};
            $tab.defaults = defaults;
            $tab.controller = controller;
            return $tab;
        };

    })

    .directive('bsTabs', ["$window", "$animate", "$tab", function ($window, $animate, $tab) {

        var defaults = $tab.defaults;

        return {
            require: ['?ngModel', 'bsTabs'],
            transclude: true,
            scope: true,
            controller: ['$scope', '$element', '$attrs', $tab.controller],
            templateUrl: function (element, attr) {
                return attr.template || defaults.template;
            },
            link: function postLink(scope, element, attrs, controllers) {

                var ngModelCtrl = controllers[0];
                var bsTabsCtrl = controllers[1];

                if (ngModelCtrl) {

                    // Update the modelValue following
                    bsTabsCtrl.$viewChangeListeners.push(function () {
                        ngModelCtrl.$setViewValue(bsTabsCtrl.$panes.$active);
                    });

                    // modelValue -> $formatters -> viewValue
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        // console.warn('$formatter("%s"): modelValue=%o (%o)', element.attr('ng-model'), modelValue, typeof modelValue);
                        bsTabsCtrl.$setActive(modelValue * 1);
                        return modelValue;
                    });

                }

            }
        };

    }])

    .directive('bsPane', ["$window", "$animate", "$sce", "$parse", function ($window, $animate, $sce, $parse) {

        return {
            require: ['^?ngModel', '^bsTabs'],
            //scope: true,
            scope: { //#EDITED
                title: '@',
                ngShow: '@',
                onSelect: '&select',
            },
            link: function postLink(scope, element, attrs, controllers) {

                var ngModelCtrl = controllers[0];
                var bsTabsCtrl = controllers[1];

                // Add base class
                element.addClass('tab-pane in');

                // Observe title attribute for change
                // attrs.$observe('title', function(newValue, oldValue) {
                // scope.title = $sce.trustAsHtml(newValue);
                // });
                if (attrs.ngShow === undefined) {
                    scope.show = true;
                } else {
                    scope.show = attrs.ngShow;
                }
                //attrs.$observe('ngShow', function (newValue, oldValue) {
                //    console.log(attrs.ngShow, newValue);
                //  if(newValue === undefined){
                //	  scope.show = true;
                //  } else {
                //      scope.show = newValue;
                //  }

                //});

                // Add animation class
                if (bsTabsCtrl.$options.animation) {
                    element.addClass(bsTabsCtrl.$options.animation);
                }

                // Push pane to parent bsTabs controller
                bsTabsCtrl.$push(scope);

                function render() {
                    var index = bsTabsCtrl.$panes.indexOf(scope);
                    var active = bsTabsCtrl.$panes.$active;
                    $animate[index === active ? 'addClass' : 'removeClass'](element, bsTabsCtrl.$options.activeClass);
                }


                bsTabsCtrl.$viewChangeListeners.push(function () {
                    render();
                });
                render();

            }
        };

    }]);


    // Source: timepicker.js
    //angular.module('mgcrea.ngStrap.timepicker', [
    //  'mgcrea.ngStrap.helpers.dateParser',
    //  'mgcrea.ngStrap.tooltip'
    //]).provider('$timepicker', function () {
    //    var defaults = this.defaults = {
    //        animation: 'am-fade',
    //        prefixClass: 'timepicker',
    //        placement: 'bottom-left',
    //        template: 'timepicker.tpl.html',
    //        trigger: 'focus',
    //        container: false,
    //        keyboard: true,
    //        html: false,
    //        delay: 0,
    //        useNative: true,
    //        timeType: 'date',
    //        timeFormat: 'shortTime',
    //        modelTimeFormat: null,
    //        autoclose: false,
    //        minTime: -Infinity,
    //        maxTime: +Infinity,
    //        length: 3,
    //        hourStep: 1,
    //        minuteStep: 5,
    //        iconUp: 'glyphicon glyphicon-chevron-up',
    //        iconDown: 'glyphicon glyphicon-chevron-down',
    //        arrowBehavior: 'pager'
    //    };
    //    this.$get = [
    //      '$window',
    //      '$document',
    //      '$rootScope',
    //      '$sce',
    //      '$locale',
    //      'dateFilter',
    //      '$tooltip',
    //      function ($window, $document, $rootScope, $sce, $locale, dateFilter, $tooltip) {
    //          var bodyEl = angular.element($window.document.body);
    //          var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
    //          var isTouch = 'createTouch' in $window.document && isNative;
    //          if (!defaults.lang)
    //              defaults.lang = $locale.id;
    //          function timepickerFactory(element, controller, config) {
    //              var $timepicker = $tooltip(element, angular.extend({}, defaults, config));
    //              var parentScope = config.scope;
    //              var options = $timepicker.$options;
    //              var scope = $timepicker.$scope;
    //              // View vars
    //              var selectedIndex = 0;
    //              var startDate = controller.$dateValue || new Date();
    //              var viewDate = {
    //                  hour: startDate.getHours(),
    //                  meridian: startDate.getHours() < 12,
    //                  minute: startDate.getMinutes(),
    //                  second: startDate.getSeconds(),
    //                  millisecond: startDate.getMilliseconds()
    //              };
    //              var format = $locale.DATETIME_FORMATS[options.timeFormat] || options.timeFormat;
    //              var formats = /(h+)([:\.])?(m+)[ ]?(a?)/i.exec(format).slice(1);
    //              scope.$iconUp = options.iconUp;
    //              scope.$iconDown = options.iconDown;
    //              // Scope methods
    //              scope.$select = function (date, index) {
    //                  $timepicker.select(date, index);
    //              };
    //              scope.$moveIndex = function (value, index) {
    //                  $timepicker.$moveIndex(value, index);
    //              };
    //              scope.$switchMeridian = function (date) {
    //                  $timepicker.switchMeridian(date);
    //              };
    //              // Public methods
    //              $timepicker.update = function (date) {
    //                  // console.warn('$timepicker.update() newValue=%o', date);
    //                  if (angular.isDate(date) && !isNaN(date.getTime())) {
    //                      $timepicker.$date = date;
    //                      angular.extend(viewDate, {
    //                          hour: date.getHours(),
    //                          minute: date.getMinutes(),
    //                          second: date.getSeconds(),
    //                          millisecond: date.getMilliseconds()
    //                      });
    //                      $timepicker.$build();
    //                  } else if (!$timepicker.$isBuilt) {
    //                      $timepicker.$build();
    //                  }
    //              };
    //              $timepicker.select = function (date, index, keep) {
    //                  // console.warn('$timepicker.select', date, scope.$mode);
    //                  if (!controller.$dateValue || isNaN(controller.$dateValue.getTime()))
    //                      controller.$dateValue = new Date(1970, 0, 1);
    //                  if (!angular.isDate(date))
    //                      date = new Date(date);
    //                  if (index === 0)
    //                      controller.$dateValue.setHours(date.getHours());
    //                  else if (index === 1)
    //                      controller.$dateValue.setMinutes(date.getMinutes());
    //                  controller.$setViewValue(controller.$dateValue);
    //                  controller.$render();
    //                  if (options.autoclose && !keep) {
    //                      $timepicker.hide(true);
    //                  }
    //              };
    //              $timepicker.switchMeridian = function (date) {
    //                  var hours = (date || controller.$dateValue).getHours();
    //                  controller.$dateValue.setHours(hours < 12 ? hours + 12 : hours - 12);
    //                  controller.$setViewValue(controller.$dateValue);
    //                  controller.$render();
    //              };
    //              // Protected methods
    //              $timepicker.$build = function () {
    //                  // console.warn('$timepicker.$build() viewDate=%o', viewDate);
    //                  var i, midIndex = scope.midIndex = parseInt(options.length / 2, 10);
    //                  var hours = [], hour;
    //                  for (i = 0; i < options.length; i++) {
    //                      hour = new Date(1970, 0, 1, viewDate.hour - (midIndex - i) * options.hourStep);
    //                      hours.push({
    //                          date: hour,
    //                          label: dateFilter(hour, formats[0]),
    //                          selected: $timepicker.$date && $timepicker.$isSelected(hour, 0),
    //                          disabled: $timepicker.$isDisabled(hour, 0)
    //                      });
    //                  }
    //                  var minutes = [], minute;
    //                  for (i = 0; i < options.length; i++) {
    //                      minute = new Date(1970, 0, 1, 0, viewDate.minute - (midIndex - i) * options.minuteStep);
    //                      minutes.push({
    //                          date: minute,
    //                          label: dateFilter(minute, formats[2]),
    //                          selected: $timepicker.$date && $timepicker.$isSelected(minute, 1),
    //                          disabled: $timepicker.$isDisabled(minute, 1)
    //                      });
    //                  }
    //                  var rows = [];
    //                  for (i = 0; i < options.length; i++) {
    //                      rows.push([
    //                        hours[i],
    //                        minutes[i]
    //                      ]);
    //                  }
    //                  scope.rows = rows;
    //                  scope.showAM = !!formats[3];
    //                  scope.isAM = ($timepicker.$date || hours[midIndex].date).getHours() < 12;
    //                  scope.timeSeparator = formats[1];
    //                  $timepicker.$isBuilt = true;
    //              };
    //              $timepicker.$isSelected = function (date, index) {
    //                  if (!$timepicker.$date)
    //                      return false;
    //                  else if (index === 0) {
    //                      return date.getHours() === $timepicker.$date.getHours();
    //                  } else if (index === 1) {
    //                      return date.getMinutes() === $timepicker.$date.getMinutes();
    //                  }
    //              };
    //              $timepicker.$isDisabled = function (date, index) {
    //                  var selectedTime;
    //                  if (index === 0) {
    //                      selectedTime = date.getTime() + viewDate.minute * 60000;
    //                  } else if (index === 1) {
    //                      selectedTime = date.getTime() + viewDate.hour * 3600000;
    //                  }
    //                  return selectedTime < options.minTime * 1 || selectedTime > options.maxTime * 1;
    //              };
    //              scope.$arrowAction = function (value, index) {
    //                  if (options.arrowBehavior === 'picker') {
    //                      $timepicker.$setTimeByStep(value, index);
    //                  } else {
    //                      $timepicker.$moveIndex(value, index);
    //                  }
    //              };
    //              $timepicker.$setTimeByStep = function (value, index) {
    //                  var newDate = new Date($timepicker.$date);
    //                  var hours = newDate.getHours(), hoursLength = dateFilter(newDate, 'h').length;
    //                  var minutes = newDate.getMinutes(), minutesLength = dateFilter(newDate, 'mm').length;
    //                  if (index === 0) {
    //                      newDate.setHours(hours - parseInt(options.hourStep, 10) * value);
    //                  } else {
    //                      newDate.setMinutes(minutes - parseInt(options.minuteStep, 10) * value);
    //                  }
    //                  $timepicker.select(newDate, index, true);
    //                  parentScope.$digest();
    //              };
    //              $timepicker.$moveIndex = function (value, index) {
    //                  var targetDate;
    //                  if (index === 0) {
    //                      targetDate = new Date(1970, 0, 1, viewDate.hour + value * options.length, viewDate.minute);
    //                      angular.extend(viewDate, { hour: targetDate.getHours() });
    //                  } else if (index === 1) {
    //                      targetDate = new Date(1970, 0, 1, viewDate.hour, viewDate.minute + value * options.length * options.minuteStep);
    //                      angular.extend(viewDate, { minute: targetDate.getMinutes() });
    //                  }
    //                  $timepicker.$build();
    //              };
    //              $timepicker.$onMouseDown = function (evt) {
    //                  // Prevent blur on mousedown on .dropdown-menu
    //                  if (evt.target.nodeName.toLowerCase() !== 'input')
    //                      evt.preventDefault();
    //                  evt.stopPropagation();
    //                  // Emulate click for mobile devices
    //                  if (isTouch) {
    //                      var targetEl = angular.element(evt.target);
    //                      if (targetEl[0].nodeName.toLowerCase() !== 'button') {
    //                          targetEl = targetEl.parent();
    //                      }
    //                      targetEl.triggerHandler('click');
    //                  }
    //              };
    //              $timepicker.$onKeyDown = function (evt) {
    //                  if (!/(38|37|39|40|13)/.test(evt.keyCode) || evt.shiftKey || evt.altKey)
    //                      return;
    //                  evt.preventDefault();
    //                  evt.stopPropagation();
    //                  // Close on enter
    //                  if (evt.keyCode === 13)
    //                      return $timepicker.hide(true);
    //                  // Navigate with keyboard
    //                  var newDate = new Date($timepicker.$date);
    //                  var hours = newDate.getHours(), hoursLength = dateFilter(newDate, 'h').length;
    //                  var minutes = newDate.getMinutes(), minutesLength = dateFilter(newDate, 'mm').length;
    //                  var lateralMove = /(37|39)/.test(evt.keyCode);
    //                  var count = 2 + !!formats[3] * 1;
    //                  // Navigate indexes (left, right)
    //                  if (lateralMove) {
    //                      if (evt.keyCode === 37)
    //                          selectedIndex = selectedIndex < 1 ? count - 1 : selectedIndex - 1;
    //                      else if (evt.keyCode === 39)
    //                          selectedIndex = selectedIndex < count - 1 ? selectedIndex + 1 : 0;
    //                  }
    //                  // Update values (up, down)
    //                  var selectRange = [
    //                      0,
    //                      hoursLength
    //                  ];
    //                  if (selectedIndex === 0) {
    //                      if (evt.keyCode === 38)
    //                          newDate.setHours(hours - parseInt(options.hourStep, 10));
    //                      else if (evt.keyCode === 40)
    //                          newDate.setHours(hours + parseInt(options.hourStep, 10));
    //                      selectRange = [
    //                        0,
    //                        hoursLength
    //                      ];
    //                  } else if (selectedIndex === 1) {
    //                      if (evt.keyCode === 38)
    //                          newDate.setMinutes(minutes - parseInt(options.minuteStep, 10));
    //                      else if (evt.keyCode === 40)
    //                          newDate.setMinutes(minutes + parseInt(options.minuteStep, 10));
    //                      selectRange = [
    //                        hoursLength + 1,
    //                        hoursLength + 1 + minutesLength
    //                      ];
    //                  } else if (selectedIndex === 2) {
    //                      if (!lateralMove)
    //                          $timepicker.switchMeridian();
    //                      selectRange = [
    //                        hoursLength + 1 + minutesLength + 1,
    //                        hoursLength + 1 + minutesLength + 3
    //                      ];
    //                  }
    //                  $timepicker.select(newDate, selectedIndex, true);
    //                  createSelection(selectRange[0], selectRange[1]);
    //                  parentScope.$digest();
    //              };
    //              // Private
    //              function createSelection(start, end) {
    //                  if (element[0].createTextRange) {
    //                      var selRange = element[0].createTextRange();
    //                      selRange.collapse(true);
    //                      selRange.moveStart('character', start);
    //                      selRange.moveEnd('character', end);
    //                      selRange.select();
    //                  } else if (element[0].setSelectionRange) {
    //                      element[0].setSelectionRange(start, end);
    //                  } else if (angular.isUndefined(element[0].selectionStart)) {
    //                      element[0].selectionStart = start;
    //                      element[0].selectionEnd = end;
    //                  }
    //              }
    //              function focusElement() {
    //                  element[0].focus();
    //              }
    //              // Overrides
    //              var _init = $timepicker.init;
    //              $timepicker.init = function () {
    //                  if (isNative && options.useNative) {
    //                      element.prop('type', 'time');
    //                      element.css('-webkit-appearance', 'textfield');
    //                      return;
    //                  } else if (isTouch) {
    //                      element.prop('type', 'text');
    //                      element.attr('readonly', 'true');
    //                      element.on('click', focusElement);
    //                  }
    //                  _init();
    //              };
    //              var _destroy = $timepicker.destroy;
    //              $timepicker.destroy = function () {
    //                  if (isNative && options.useNative) {
    //                      element.off('click', focusElement);
    //                  }
    //                  _destroy();
    //              };
    //              var _show = $timepicker.show;
    //              $timepicker.show = function () {
    //                  _show();
    //                  setTimeout(function () {
    //                      $timepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $timepicker.$onMouseDown);
    //                      if (options.keyboard) {
    //                          element.on('keydown', $timepicker.$onKeyDown);
    //                      }
    //                  });
    //              };
    //              var _hide = $timepicker.hide;
    //              $timepicker.hide = function (blur) {
    //                  $timepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $timepicker.$onMouseDown);
    //                  if (options.keyboard) {
    //                      element.off('keydown', $timepicker.$onKeyDown);
    //                  }
    //                  _hide(blur);
    //              };
    //              return $timepicker;
    //          }
    //          timepickerFactory.defaults = defaults;
    //          return timepickerFactory;
    //      }
    //    ];
    //}).directive('bsTimepicker', [
    //  '$window',
    //  '$parse',
    //  '$q',
    //  '$locale',
    //  'dateFilter',
    //  '$timepicker',
    //  '$dateParser',
    //  '$timeout',
    //  function ($window, $parse, $q, $locale, dateFilter, $timepicker, $dateParser, $timeout) {
    //      var defaults = $timepicker.defaults;
    //      var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
    //      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    //      return {
    //          restrict: 'EAC',
    //          require: 'ngModel',
    //          link: function postLink(scope, element, attr, controller) {
    //              // Directive options
    //              var options = {
    //                  scope: scope,
    //                  controller: controller
    //              };
    //              angular.forEach([
    //                'placement',
    //                'container',
    //                'delay',
    //                'trigger',
    //                'keyboard',
    //                'html',
    //                'animation',
    //                'template',
    //                'autoclose',
    //                'timeType',
    //                'timeFormat',
    //                'modelTimeFormat',
    //                'useNative',
    //                'hourStep',
    //                'minuteStep',
    //                'length',
    //                'arrowBehavior'
    //              ], function (key) {
    //                  if (angular.isDefined(attr[key]))
    //                      options[key] = attr[key];
    //              });
    //              // Visibility binding support
    //              attr.bsShow && scope.$watch(attr.bsShow, function (newValue, oldValue) {
    //                  if (!timepicker || !angular.isDefined(newValue))
    //                      return;
    //                  if (angular.isString(newValue))
    //                      newValue = newValue.match(',?(timepicker),?');
    //                  newValue === true ? timepicker.show() : timepicker.hide();
    //              });
    //              // Initialize timepicker
    //              if (isNative && (options.useNative || defaults.useNative))
    //                  options.timeFormat = 'HH:mm';
    //              var timepicker = $timepicker(element, controller, options);
    //              options = timepicker.$options;
    //              // Initialize parser
    //              var dateParser = $dateParser({
    //                  format: options.timeFormat,
    //                  lang: options.lang
    //              });
    //              // Observe attributes for changes
    //              angular.forEach([
    //                'minTime',
    //                'maxTime'
    //              ], function (key) {
    //                  // console.warn('attr.$observe(%s)', key, attr[key]);
    //                  angular.isDefined(attr[key]) && attr.$observe(key, function (newValue) {
    //                      if (newValue === 'now') {
    //                          timepicker.$options[key] = new Date().setFullYear(1970, 0, 1);
    //                      } else if (angular.isString(newValue) && newValue.match(/^".+"$/)) {
    //                          timepicker.$options[key] = +new Date(newValue.substr(1, newValue.length - 2));
    //                      } else {
    //                          timepicker.$options[key] = dateParser.parse(newValue, new Date(1970, 0, 1, 0));
    //                      }
    //                      !isNaN(timepicker.$options[key]) && timepicker.$build();
    //                  });
    //              });
    //              // Watch model for changes
    //              scope.$watch(attr.ngModel, function (newValue, oldValue) {
    //                  // console.warn('scope.$watch(%s)', attr.ngModel, newValue, oldValue, controller.$dateValue);
    //                  timepicker.update(controller.$dateValue);
    //              }, true);
    //              // viewValue -> $parsers -> modelValue
    //              controller.$parsers.unshift(function (viewValue) {
    //                  // console.warn('$parser("%s"): viewValue=%o', element.attr('ng-model'), viewValue);
    //                  // Null values should correctly reset the model value & validity
    //                  if (!viewValue) {
    //                      controller.$setValidity('date', true);
    //                      return;
    //                  }
    //                  var parsedTime = dateParser.parse(viewValue, controller.$dateValue);
    //                  if (!parsedTime || isNaN(parsedTime.getTime())) {
    //                      controller.$setValidity('date', false);
    //                  } else {
    //                      var isValid = parsedTime.getTime() >= options.minTime && parsedTime.getTime() <= options.maxTime;
    //                      controller.$setValidity('date', isValid);
    //                      // Only update the model when we have a valid date
    //                      if (isValid)
    //                          controller.$dateValue = parsedTime;
    //                  }
    //                  if (options.timeType === 'string') {
    //                      return dateFilter(parsedTime, options.modelTimeFormat || options.timeFormat);
    //                  } else if (options.timeType === 'number') {
    //                      return controller.$dateValue.getTime();
    //                  } else if (options.timeType === 'iso') {
    //                      return controller.$dateValue.toISOString();
    //                  } else {
    //                      return new Date(controller.$dateValue);
    //                  }
    //              });
    //              // modelValue -> $formatters -> viewValue
    //              controller.$formatters.push(function (modelValue) {
    //                  // console.warn('$formatter("%s"): modelValue=%o (%o)', element.attr('ng-model'), modelValue, typeof modelValue);
    //                  var date;
    //                  if (angular.isUndefined(modelValue) || modelValue === null) {
    //                      date = NaN;
    //                  } else if (angular.isDate(modelValue)) {
    //                      date = modelValue;
    //                  } else if (options.timeType === 'string') {
    //                      date = dateParser.parse(modelValue, null, options.modelTimeFormat);
    //                  } else {
    //                      date = new Date(modelValue);
    //                  }

    //                  // Setup default value?
    //                  // if(isNaN(date.getTime())) date = new Date(new Date().setMinutes(0) + 36e5);

    //                  //ROSSU 10/5/2015 fix to wrong selected value when timepicker popsup
    //                  date = new Date(dateFilter(moment(date).utc()).format("YYYY-MM-DD hh:mm:ss A"));
    //                  //END FIX

    //                  controller.$dateValue = date;
    //                  return controller.$dateValue;
    //              });
    //              // viewValue -> element
    //              controller.$render = function () {
    //                  // console.warn('$render("%s"): viewValue=%o', element.attr('ng-model'), controller.$viewValue);
    //                  element.val(!controller.$dateValue || isNaN(controller.$dateValue.getTime()) ? null : dateFilter(moment(controller.$dateValue).format("hh:mm A"), options.timeFormat));
    //              };
    //              // Garbage collection
    //              scope.$on('$destroy', function () {
    //                  timepicker.destroy();
    //                  options = null;
    //                  timepicker = null;
    //              });
    //          }
    //      };
    //  }
    //]);
    angular.module('mgcrea.ngStrap.timepicker', ['mgcrea.ngStrap.helpers.dateParser', 'mgcrea.ngStrap.helpers.dateFormatter', 'mgcrea.ngStrap.tooltip']).provider('$timepicker', function () {
        var defaults = this.defaults = {
            animation: 'am-fade',
            prefixClass: 'timepicker',
            placement: 'bottom-left',
            template: 'timepicker.tpl.html',
            trigger: 'focus',
            container: false,
            keyboard: true,
            html: false,
            delay: 0,
            useNative: true,
            timeType: 'date',
            timeFormat: 'shortTime',
            timezone: null,
            modelTimeFormat: null,
            autoclose: false,
            minTime: -Infinity,
            maxTime: +Infinity,
            length: 3,
            hourStep: 1,
            minuteStep: 5,
            secondStep: 5,
            roundDisplay: false,
            iconUp: 'glyphicon glyphicon-chevron-up',
            iconDown: 'glyphicon glyphicon-chevron-down',
            arrowBehavior: 'pager'
        };
        this.$get = ['$window', '$document', '$rootScope', '$sce', '$dateFormatter', '$tooltip', '$timeout', function ($window, $document, $rootScope, $sce, $dateFormatter, $tooltip, $timeout) {
            var bodyEl = angular.element($window.document.body);
            var isNative = /(ip[ao]d|iphone|android)/gi.test($window.navigator.userAgent);
            var isTouch = 'createTouch' in $window.document && isNative;
            if (!defaults.lang) {
                defaults.lang = $dateFormatter.getDefaultLocale();
            }
            function timepickerFactory(element, controller, config) {
                var $timepicker = $tooltip(element, angular.extend({}, defaults, config));
                var parentScope = config.scope;
                var options = $timepicker.$options;
                var scope = $timepicker.$scope;
                var lang = options.lang;
                var formatDate = function (date, format, timezone) {
                    return $dateFormatter.formatDate(date, format, lang, timezone);
                };
                function floorMinutes(time) {
                    var coeff = 1e3 * 60 * options.minuteStep;
                    return new Date(Math.floor(time.getTime() / coeff) * coeff);
                }
                var selectedIndex = 0;
                var defaultDate = options.roundDisplay ? floorMinutes(new Date()) : new Date();
                var startDate = controller.$dateValue || defaultDate;
                var viewDate = {
                    hour: startDate.getHours(),
                    meridian: startDate.getHours() < 12,
                    minute: startDate.getMinutes(),
                    second: startDate.getSeconds(),
                    millisecond: startDate.getMilliseconds()
                };
                var format = $dateFormatter.getDatetimeFormat(options.timeFormat, lang);
                var hoursFormat = $dateFormatter.hoursFormat(format);
                var timeSeparator = $dateFormatter.timeSeparator(format);
                var minutesFormat = $dateFormatter.minutesFormat(format);
                var secondsFormat = $dateFormatter.secondsFormat(format);
                var showSeconds = $dateFormatter.showSeconds(format);
                var showAM = $dateFormatter.showAM(format);
                scope.$iconUp = options.iconUp;
                scope.$iconDown = options.iconDown;
                scope.$select = function (date, index) {
                    $timepicker.select(date, index);
                };
                scope.$moveIndex = function (value, index) {
                    $timepicker.$moveIndex(value, index);
                };
                scope.$switchMeridian = function (date) {
                    $timepicker.switchMeridian(date);
                };
                $timepicker.update = function (date) {
                    if (angular.isDate(date) && !isNaN(date.getTime())) {
                        $timepicker.$date = date;
                        angular.extend(viewDate, {
                            hour: date.getHours(),
                            minute: date.getMinutes(),
                            second: date.getSeconds(),
                            millisecond: date.getMilliseconds()
                        });
                        $timepicker.$build();
                    } else if (!$timepicker.$isBuilt) {
                        $timepicker.$build();
                    }
                };
                $timepicker.select = function (date, index, keep) {
                    if (!controller.$dateValue || isNaN(controller.$dateValue.getTime())) controller.$dateValue = new Date(1970, 0, 1);
                    if (!angular.isDate(date)) date = new Date(date);
                    if (index === 0) controller.$dateValue.setHours(date.getHours()); else if (index === 1) controller.$dateValue.setMinutes(date.getMinutes()); else if (index === 2) controller.$dateValue.setSeconds(date.getSeconds());
                    controller.$setViewValue(angular.copy(controller.$dateValue));
                    controller.$render();
                    if (options.autoclose && !keep) {
                        $timeout(function () {
                            $timepicker.hide(true);
                        });
                    }
                };
                $timepicker.switchMeridian = function (date) {
                    if (!controller.$dateValue || isNaN(controller.$dateValue.getTime())) {
                        return;
                    }
                    var hours = (date || controller.$dateValue).getHours();
                    controller.$dateValue.setHours(hours < 12 ? hours + 12 : hours - 12);
                    controller.$setViewValue(angular.copy(controller.$dateValue));
                    controller.$render();
                };
                $timepicker.$build = function () {
                    var i;
                    var midIndex = scope.midIndex = parseInt(options.length / 2, 10);
                    var hours = [];
                    var hour;
                    for (i = 0; i < options.length; i++) {
                        hour = new Date(1970, 0, 1, viewDate.hour - (midIndex - i) * options.hourStep);
                        hours.push({
                            date: hour,
                            label: formatDate(hour, hoursFormat),
                            selected: $timepicker.$date && $timepicker.$isSelected(hour, 0),
                            disabled: $timepicker.$isDisabled(hour, 0)
                        });
                    }
                    var minutes = [];
                    var minute;
                    for (i = 0; i < options.length; i++) {
                        minute = new Date(1970, 0, 1, 0, viewDate.minute - (midIndex - i) * options.minuteStep);
                        minutes.push({
                            date: minute,
                            label: formatDate(minute, minutesFormat),
                            selected: $timepicker.$date && $timepicker.$isSelected(minute, 1),
                            disabled: $timepicker.$isDisabled(minute, 1)
                        });
                    }
                    var seconds = [];
                    var second;
                    for (i = 0; i < options.length; i++) {
                        second = new Date(1970, 0, 1, 0, 0, viewDate.second - (midIndex - i) * options.secondStep);
                        seconds.push({
                            date: second,
                            label: formatDate(second, secondsFormat),
                            selected: $timepicker.$date && $timepicker.$isSelected(second, 2),
                            disabled: $timepicker.$isDisabled(second, 2)
                        });
                    }
                    var rows = [];
                    for (i = 0; i < options.length; i++) {
                        if (showSeconds) {
                            rows.push([hours[i], minutes[i], seconds[i]]);
                        } else {
                            rows.push([hours[i], minutes[i]]);
                        }
                    }
                    scope.rows = rows;
                    scope.showSeconds = showSeconds;
                    scope.showAM = showAM;
                    scope.isAM = ($timepicker.$date || hours[midIndex].date).getHours() < 12;
                    scope.timeSeparator = timeSeparator;
                    $timepicker.$isBuilt = true;
                };
                $timepicker.$isSelected = function (date, index) {
                    if (!$timepicker.$date) return false; else if (index === 0) {
                        return date.getHours() === $timepicker.$date.getHours();
                    } else if (index === 1) {
                        return date.getMinutes() === $timepicker.$date.getMinutes();
                    } else if (index === 2) {
                        return date.getSeconds() === $timepicker.$date.getSeconds();
                    }
                };
                $timepicker.$isDisabled = function (date, index) {
                    var selectedTime;
                    if (index === 0) {
                        selectedTime = date.getTime() + viewDate.minute * 6e4 + viewDate.second * 1e3;
                    } else if (index === 1) {
                        selectedTime = date.getTime() + viewDate.hour * 36e5 + viewDate.second * 1e3;
                    } else if (index === 2) {
                        selectedTime = date.getTime() + viewDate.hour * 36e5 + viewDate.minute * 6e4;
                    }
                    return selectedTime < options.minTime * 1 || selectedTime > options.maxTime * 1;
                };
                scope.$arrowAction = function (value, index) {
                    if (options.arrowBehavior === 'picker') {
                        $timepicker.$setTimeByStep(value, index);
                    } else {
                        $timepicker.$moveIndex(value, index);
                    }
                };
                $timepicker.$setTimeByStep = function (value, index) {
                    var newDate = new Date($timepicker.$date || startDate);
                    var hours = newDate.getHours();
                    var minutes = newDate.getMinutes();
                    var seconds = newDate.getSeconds();
                    if (index === 0) {
                        newDate.setHours(hours - parseInt(options.hourStep, 10) * value);
                    } else if (index === 1) {
                        newDate.setMinutes(minutes - parseInt(options.minuteStep, 10) * value);
                    } else if (index === 2) {
                        newDate.setSeconds(seconds - parseInt(options.secondStep, 10) * value);
                    }
                    $timepicker.select(newDate, index, true);
                };
                $timepicker.$moveIndex = function (value, index) {
                    var targetDate;
                    if (index === 0) {
                        targetDate = new Date(1970, 0, 1, viewDate.hour + value * options.length, viewDate.minute, viewDate.second);
                        angular.extend(viewDate, {
                            hour: targetDate.getHours()
                        });
                    } else if (index === 1) {
                        targetDate = new Date(1970, 0, 1, viewDate.hour, viewDate.minute + value * options.length * options.minuteStep, viewDate.second);
                        angular.extend(viewDate, {
                            minute: targetDate.getMinutes()
                        });
                    } else if (index === 2) {
                        targetDate = new Date(1970, 0, 1, viewDate.hour, viewDate.minute, viewDate.second + value * options.length * options.secondStep);
                        angular.extend(viewDate, {
                            second: targetDate.getSeconds()
                        });
                    }
                    $timepicker.$build();
                };
                $timepicker.$onMouseDown = function (evt) {
                    if (evt.target.nodeName.toLowerCase() !== 'input') evt.preventDefault();
                    evt.stopPropagation();
                    if (isTouch) {
                        var targetEl = angular.element(evt.target);
                        if (targetEl[0].nodeName.toLowerCase() !== 'button') {
                            targetEl = targetEl.parent();
                        }
                        targetEl.triggerHandler('click');
                    }
                };
                $timepicker.$onKeyDown = function (evt) {
                    if (!/(38|37|39|40|13)/.test(evt.keyCode) || evt.shiftKey || evt.altKey) return;
                    evt.preventDefault();
                    evt.stopPropagation();
                    if (evt.keyCode === 13) {
                        $timepicker.hide(true);
                        return;
                    }
                    var newDate = new Date($timepicker.$date);
                    var hours = newDate.getHours();
                    var hoursLength = formatDate(newDate, hoursFormat).length;
                    var minutes = newDate.getMinutes();
                    var minutesLength = formatDate(newDate, minutesFormat).length;
                    var seconds = newDate.getSeconds();
                    var secondsLength = formatDate(newDate, secondsFormat).length;
                    var sepLength = 1;
                    var lateralMove = /(37|39)/.test(evt.keyCode);
                    var count = 2 + showSeconds * 1 + showAM * 1;
                    if (lateralMove) {
                        if (evt.keyCode === 37) selectedIndex = selectedIndex < 1 ? count - 1 : selectedIndex - 1; else if (evt.keyCode === 39) selectedIndex = selectedIndex < count - 1 ? selectedIndex + 1 : 0;
                    }
                    var selectRange = [0, hoursLength];
                    var incr = 0;
                    if (evt.keyCode === 38) incr = -1;
                    if (evt.keyCode === 40) incr = +1;
                    var isSeconds = selectedIndex === 2 && showSeconds;
                    var isMeridian = selectedIndex === 2 && !showSeconds || selectedIndex === 3 && showSeconds;
                    if (selectedIndex === 0) {
                        newDate.setHours(hours + incr * parseInt(options.hourStep, 10));
                        hoursLength = formatDate(newDate, hoursFormat).length;
                        selectRange = [0, hoursLength];
                    } else if (selectedIndex === 1) {
                        newDate.setMinutes(minutes + incr * parseInt(options.minuteStep, 10));
                        minutesLength = formatDate(newDate, minutesFormat).length;
                        selectRange = [hoursLength + sepLength, minutesLength];
                    } else if (isSeconds) {
                        newDate.setSeconds(seconds + incr * parseInt(options.secondStep, 10));
                        secondsLength = formatDate(newDate, secondsFormat).length;
                        selectRange = [hoursLength + sepLength + minutesLength + sepLength, secondsLength];
                    } else if (isMeridian) {
                        if (!lateralMove) $timepicker.switchMeridian();
                        selectRange = [hoursLength + sepLength + minutesLength + sepLength + (secondsLength + sepLength) * showSeconds, 2];
                    }
                    $timepicker.select(newDate, selectedIndex, true);
                    createSelection(selectRange[0], selectRange[1]);
                    parentScope.$digest();
                };
                function createSelection(start, length) {
                    var end = start + length;
                    if (element[0].createTextRange) {
                        var selRange = element[0].createTextRange();
                        selRange.collapse(true);
                        selRange.moveStart('character', start);
                        selRange.moveEnd('character', end);
                        selRange.select();
                    } else if (element[0].setSelectionRange) {
                        element[0].setSelectionRange(start, end);
                    } else if (angular.isUndefined(element[0].selectionStart)) {
                        element[0].selectionStart = start;
                        element[0].selectionEnd = end;
                    }
                }
                function focusElement() {
                    element[0].focus();
                }
                var _init = $timepicker.init;
                $timepicker.init = function () {
                    if (isNative && options.useNative) {
                        element.prop('type', 'time');
                        element.css('-webkit-appearance', 'textfield');
                        return;
                    } else if (isTouch) {
                        element.prop('type', 'text');
                        element.attr('readonly', 'true');
                        element.on('click', focusElement);
                    }
                    _init();
                };
                var _destroy = $timepicker.destroy;
                $timepicker.destroy = function () {
                    if (isNative && options.useNative) {
                        element.off('click', focusElement);
                    }
                    _destroy();
                };
                var _show = $timepicker.show;
                $timepicker.show = function () {
                    if (!isTouch && element.attr('readonly') || element.attr('disabled')) return;
                    _show();
                    $timeout(function () {
                        if ($timepicker.$element) $timepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $timepicker.$onMouseDown);
                        if (options.keyboard) {
                            if (element) element.on('keydown', $timepicker.$onKeyDown);
                        }
                    }, 0, false);
                };
                var _hide = $timepicker.hide;
                $timepicker.hide = function (blur) {
                    if (!$timepicker.$isShown) return;
                    if ($timepicker.$element) $timepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $timepicker.$onMouseDown);
                    if (options.keyboard) {
                        if (element) element.off('keydown', $timepicker.$onKeyDown);
                    }
                    _hide(blur);
                };
                return $timepicker;
            }
            timepickerFactory.defaults = defaults;
            return timepickerFactory;
        }];
    }).directive('bsTimepicker', ['$window', '$parse', '$q', '$dateFormatter', '$dateParser', '$timepicker', function ($window, $parse, $q, $dateFormatter, $dateParser, $timepicker) {
        var defaults = $timepicker.defaults;
        var isNative = /(ip[ao]d|iphone|android)/gi.test($window.navigator.userAgent);
        return {
            restrict: 'EAC',
            require: 'ngModel',
            link: function postLink(scope, element, attr, controller) {
                var options = {
                    scope: scope
                };
                angular.forEach(['template', 'templateUrl', 'controller', 'controllerAs', 'placement', 'container', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'autoclose', 'timeType', 'timeFormat', 'timezone', 'modelTimeFormat', 'useNative', 'hourStep', 'minuteStep', 'secondStep', 'length', 'arrowBehavior', 'iconUp', 'iconDown', 'roundDisplay', 'id', 'prefixClass', 'prefixEvent'], function (key) {
                    if (angular.isDefined(attr[key])) options[key] = attr[key];
                });
                var falseValueRegExp = /^(false|0|)$/i;
                angular.forEach(['html', 'container', 'autoclose', 'useNative', 'roundDisplay'], function (key) {
                    if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) {
                        options[key] = false;
                    }
                });
                angular.forEach(['onBeforeShow', 'onShow', 'onBeforeHide', 'onHide'], function (key) {
                    var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
                    if (angular.isDefined(attr[bsKey])) {
                        options[key] = scope.$eval(attr[bsKey]);
                    }
                });
                if (isNative && (options.useNative || defaults.useNative)) options.timeFormat = 'HH:mm';
                var timepicker = $timepicker(element, controller, options);
                options = timepicker.$options;
                var lang = options.lang;
                var formatDate = function (date, format, timezone) {
                    return $dateFormatter.formatDate(date, format, lang, timezone);
                };
                if (attr.bsShow) {
                    scope.$watch(attr.bsShow, function (newValue, oldValue) {
                        if (!timepicker || !angular.isDefined(newValue)) return;
                        if (angular.isString(newValue)) newValue = newValue.match(',?(timepicker),?');
                        if (newValue === true) {
                            timepicker.show();
                        } else {
                            timepicker.hide();
                        }
                    });
                }
                var dateParser = $dateParser({
                    format: options.timeFormat,
                    lang: lang
                });
                angular.forEach(['minTime', 'maxTime'], function (key) {
                    if (angular.isDefined(attr[key])) {
                        attr.$observe(key, function (newValue) {
                            timepicker.$options[key] = dateParser.getTimeForAttribute(key, newValue);
                            if (!isNaN(timepicker.$options[key])) timepicker.$build();
                            validateAgainstMinMaxTime(controller.$dateValue);
                        });
                    }
                });
                scope.$watch(attr.ngModel, function (newValue, oldValue) {
                    timepicker.update(controller.$dateValue);
                }, true);
                function validateAgainstMinMaxTime(parsedTime) {
                    if (!angular.isDate(parsedTime)) return;
                    var isMinValid = isNaN(options.minTime) || new Date(parsedTime.getTime()).setFullYear(1970, 0, 1) >= options.minTime;
                    var isMaxValid = isNaN(options.maxTime) || new Date(parsedTime.getTime()).setFullYear(1970, 0, 1) <= options.maxTime;
                    var isValid = isMinValid && isMaxValid;
                    controller.$setValidity('date', isValid);
                    controller.$setValidity('min', isMinValid);
                    controller.$setValidity('max', isMaxValid);
                    if (!isValid) {
                        return;
                    }
                    controller.$dateValue = parsedTime;
                }
                controller.$parsers.unshift(function (viewValue) {
                    var date;
                    if (!viewValue) {
                        controller.$setValidity('date', true);
                        return null;
                    }
                    var parsedTime = angular.isDate(viewValue) ? viewValue : dateParser.parse(viewValue, controller.$dateValue);
                    if (!parsedTime || isNaN(parsedTime.getTime())) {
                        controller.$setValidity('date', false);
                        return undefined;
                    }
                    validateAgainstMinMaxTime(parsedTime);
                    if (options.timeType === 'string') {
                        date = dateParser.timezoneOffsetAdjust(parsedTime, options.timezone, true);
                        return formatDate(date, options.modelTimeFormat || options.timeFormat);
                    }
                    date = dateParser.timezoneOffsetAdjust(controller.$dateValue, options.timezone, true);
                    if (options.timeType === 'number') {
                        return date.getTime();
                    } else if (options.timeType === 'unix') {
                        return date.getTime() / 1e3;
                    } else if (options.timeType === 'iso') {
                        return date.toISOString();
                    }
                    return new Date(date);
                });
                controller.$formatters.push(function (modelValue) {
                    var date;
                    if (angular.isUndefined(modelValue) || modelValue === null) {
                        date = NaN;
                    } else if (angular.isDate(modelValue)) {
                        date = modelValue;
                    } else if (options.timeType === 'string') {
                        date = dateParser.parse(modelValue, null, options.modelTimeFormat);
                    } else if (options.timeType === 'unix') {
                        date = new Date(modelValue * 1e3);
                    } else {
                        date = new Date(modelValue);
                    }
                    controller.$dateValue = dateParser.timezoneOffsetAdjust(date, options.timezone);
                    return getTimeFormattedString();
                });
                controller.$render = function () {
                    element.val(getTimeFormattedString());
                };
                function getTimeFormattedString() {
                    return !controller.$dateValue || isNaN(controller.$dateValue.getTime()) ? '' : formatDate(controller.$dateValue, options.timeFormat);
                }
                scope.$on('$destroy', function () {
                    if (timepicker) timepicker.destroy();
                    options = null;
                    timepicker = null;
                });
            }
        };
    }]);
    // Popover
    angular.module('mgcrea.ngStrap.popover', ['mgcrea.ngStrap.tooltip'])

      .provider('$popover', function () {

          var defaults = this.defaults = {
              animation: 'am-fade',
              customClass: '',
              container: false,
              target: false,
              placement: 'right',
              template: 'popover.tpl.html',
              contentTemplate: false,
              trigger: 'click',
              keyboard: true,
              html: false,
              title: '',
              content: '',
              delay: 0,
              autoClose: false
          };

          this.$get = ["$tooltip", function ($tooltip) {

              function PopoverFactory(element, config) {

                  // Common vars
                  var options = angular.extend({}, defaults, config);

                  var $popover = $tooltip(element, options);

                  // Support scope as string options [/*title, */content]
                  if (options.content) {
                      $popover.$scope.content = options.content;
                  }

                  return $popover;

              }

              return PopoverFactory;

          }];

      })

      .directive('bsPopover', ["$window", "$sce", "$popover", function ($window, $sce, $popover) {

          var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;

          return {
              restrict: 'EAC',
              scope: true,
              link: function postLink(scope, element, attr) {

                  // Directive options
                  var options = { scope: scope };
                  angular.forEach(['template', 'contentTemplate', 'placement', 'container', 'target', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'customClass', 'autoClose', 'id'], function (key) {
                      if (angular.isDefined(attr[key])) options[key] = attr[key];
                  });

                  // Support scope as data-attrs
                  angular.forEach(['title', 'content'], function (key) {
                      attr[key] && attr.$observe(key, function (newValue, oldValue) {
                          scope[key] = $sce.trustAsHtml(newValue);
                          angular.isDefined(oldValue) && requestAnimationFrame(function () {
                              popover && popover.$applyPlacement();
                          });
                      });
                  });

                  // Support scope as an object
                  attr.bsPopover && scope.$watch(attr.bsPopover, function (newValue, oldValue) {
                      if (angular.isObject(newValue)) {
                          angular.extend(scope, newValue);
                      } else {
                          scope.content = newValue;
                      }
                      angular.isDefined(oldValue) && requestAnimationFrame(function () {
                          popover && popover.$applyPlacement();
                      });
                  }, true);

                  // Visibility binding support
                  attr.bsShow && scope.$watch(attr.bsShow, function (newValue, oldValue) {
                      if (!popover || !angular.isDefined(newValue)) return;
                      if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(popover),?/i);
                      newValue === true ? popover.show() : popover.hide();
                  });

                  // Initialize popover
                  var popover = $popover(element, options);

                  // Garbage collection
                  scope.$on('$destroy', function () {
                      if (popover) popover.destroy();
                      options = null;
                      popover = null;
                  });

              }
          };

      }]);


    // Source: tooltip.js
    angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.helpers.dimensions']).provider('$tooltip', function () {
        var defaults = this.defaults = {
            animation: 'am-fade',
            customClass: '',
            prefixClass: 'tooltip',
            prefixEvent: 'tooltip',
            container: false,
            target: false,
            placement: 'top',
            template: 'tooltip.tpl.html',
            contentTemplate: false,
            trigger: 'hover focus',
            keyboard: false,
            html: false,
            show: false,
            title: '',
            type: '',
            delay: 0
        };
        this.$get = [
          '$window',
          '$rootScope',
          '$compile',
          '$q',
          '$templateCache',
          '$http',
          '$animate',
          'dimensions',
          '$$rAF',
          function ($window, $rootScope, $compile, $q, $templateCache, $http, $animate, dimensions, $$rAF) {
              var trim = String.prototype.trim;
              var isTouch = 'createTouch' in $window.document;
              var htmlReplaceRegExp = /ng-bind="/gi;
              function TooltipFactory(element, config) {
                  var $tooltip = {};
                  // Common vars
                  var nodeName = element[0].nodeName.toLowerCase();
                  var options = $tooltip.$options = angular.extend({}, defaults, config);
                  $tooltip.$promise = fetchTemplate(options.template);
                  var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
                  if (options.delay && angular.isString(options.delay)) {
                      options.delay = parseFloat(options.delay);
                  }
                  // Support scope as string options
                  if (options.title) {
                      $tooltip.$scope.title = options.title;
                  }
                  // Provide scope helpers
                  scope.$hide = function () {
                      scope.$$postDigest(function () {
                          $tooltip.hide();
                      });
                  };
                  scope.$show = function () {
                      //#EDITED $$postDigest inconsistent
                      setTimeout(function () {
                          $tooltip.show();
                      }, 0);
                      // scope.$$postDigest(function () {
                      // $tooltip.show();
                      // });
                  };
                  scope.$toggle = function () {
                      scope.$$postDigest(function () {
                          $tooltip.toggle();
                      });
                  };
                  $tooltip.$isShown = scope.$isShown = false;
                  // Private vars
                  var timeout, hoverState;
                  // Support contentTemplate option
                  if (options.contentTemplate) {
                      $tooltip.$promise = $tooltip.$promise.then(function (template) {
                          var templateEl = angular.element(template);
                          return fetchTemplate(options.contentTemplate).then(function (contentTemplate) {
                              var contentEl = findElement('[ng-bind="content"]', templateEl[0]);
                              if (!contentEl.length)
                                  contentEl = findElement('[ng-bind="title"]', templateEl[0]);
                              contentEl.removeAttr('ng-bind').html(contentTemplate);
                              return templateEl[0].outerHTML;
                          });
                      });
                  }
                  // Fetch, compile then initialize tooltip
                  var tipLinker, tipElement, tipTemplate, tipContainer;
                  $tooltip.$promise.then(function (template) {
                      if (angular.isObject(template))
                          template = template.data;
                      if (options.html)
                          template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
                      template = trim.apply(template);
                      tipTemplate = template;
                      tipLinker = $compile(template);
                      $tooltip.init();
                  });
                  $tooltip.init = function () {
                      // Options: delay
                      if (options.delay && angular.isNumber(options.delay)) {
                          options.delay = {
                              show: options.delay,
                              hide: options.delay
                          };
                      }
                      // Replace trigger on touch devices ?
                      // if(isTouch && options.trigger === defaults.trigger) {
                      //   options.trigger.replace(/hover/g, 'click');
                      // }
                      // Options : container
                      if (options.container === 'self') {
                          tipContainer = element;
                      } else if (angular.isElement(options.container)) {
                          tipContainer = options.container;
                      } else if (options.container) {
                          tipContainer = findElement(options.container);
                      }
                      // Options: trigger
                      var triggers = options.trigger.split(' ');
                      angular.forEach(triggers, function (trigger) {
                          if (trigger === 'click') {
                              element.on('click', $tooltip.toggle);
                              //angular.element('body').on('click',$tooltip.leave);
                          } else if (trigger !== 'manual') {
                              element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
                              element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
                              nodeName === 'button' && trigger !== 'hover' && element.on(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
                          }
                      });
                      // Options: target
                      if (options.target) {
                          options.target = angular.isElement(options.target) ? options.target : findElement(options.target)[0];
                      }
                      // Options: show
                      if (options.show) {
                          scope.$$postDigest(function () {
                              options.trigger === 'focus' ? element[0].focus() : $tooltip.show();
                          });
                      }
                  };
                  $tooltip.destroy = function () {
                      // Unbind events
                      var triggers = options.trigger.split(' ');
                      for (var i = triggers.length; i--;) {
                          var trigger = triggers[i];
                          if (trigger === 'click') {
                              element.off('click', $tooltip.toggle);
                          } else if (trigger !== 'manual') {
                              element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
                              element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
                              nodeName === 'button' && trigger !== 'hover' && element.off(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
                          }
                      }
                      // Remove element
                      if (tipElement) {
                          tipElement.remove();
                          tipElement = null;
                      }
                      // Cancel pending callbacks
                      clearTimeout(timeout);
                      // Destroy scope
                      scope.$destroy();
                  };
                  $tooltip.enter = function () {
                      clearTimeout(timeout);
                      hoverState = 'in';
                      if (!options.delay || !options.delay.show) {
                          return $tooltip.show();
                      }
                      timeout = setTimeout(function () {
                          if (hoverState === 'in')
                              $tooltip.show();
                      }, options.delay.show);
                  };
                  $tooltip.show = function () {
                      scope.$emit(options.prefixEvent + '.show.before', $tooltip);
                      var parent = options.container ? tipContainer : null;
                      var after = options.container ? null : element;
                      // Hide any existing tipElement
                      if (tipElement)
                          tipElement.remove();
                      // Fetch a cloned element linked from template
                      tipElement = $tooltip.$element = tipLinker(scope, function (clonedElement, scope) {
                      });
                      // Set the initial positioning.  Make the tooltip invisible
                      // so IE doesn't try to focus on it off screen.
                      tipElement.css({
                          top: '-9999px',
                          left: '-9999px',
                          display: 'block',
                          visibility: 'hidden'
                      }).addClass(options.placement);
                      // Options: animation
                      if (options.animation)
                          tipElement.addClass(options.animation);
                      // Options: type
                      if (options.type)
                          tipElement.addClass(options.prefixClass + '-' + options.type);
                      // Options: custom classes
                      if (options.customClass)
                          tipElement.addClass(options.customClass);
                      $animate.enter(tipElement, parent, after, function () {
                          scope.$emit(options.prefixEvent + '.show', $tooltip);
                      });
                      $tooltip.$isShown = scope.$isShown = true;
                      scope.$$phase || scope.$root && scope.$root.$$phase || scope.$digest();
                      $$rAF(function () {
                          $tooltip.$applyPlacement();
                          // Once placed, make the tooltip visible
                          tipElement.css({ visibility: 'visible' });
                      });
                      // var a = bodyEl.offsetWidth + 1; ?
                      // Bind events
                      if (options.keyboard) {
                          if (options.trigger !== 'focus') {
                              $tooltip.focus();
                              tipElement.on('keyup', $tooltip.$onKeyUp);
                          } else {
                              element.on('keyup', $tooltip.$onFocusKeyUp);
                          }
                      }
                  };
                  $tooltip.leave = function () {
                      clearTimeout(timeout);
                      hoverState = 'out';
                      if (!options.delay || !options.delay.hide) {
                          return $tooltip.hide();
                      }
                      timeout = setTimeout(function () {
                          if (hoverState === 'out') {
                              $tooltip.hide();
                          }
                      }, options.delay.hide);
                  };
                  $tooltip.hide = function (blur) {
                      if (!$tooltip.$isShown)
                          return;
                      scope.$emit(options.prefixEvent + '.hide.before', $tooltip);
                      $animate.leave(tipElement, function () {
                          scope.$emit(options.prefixEvent + '.hide', $tooltip);
                          // Allow to blur the input when hidden, like when pressing enter key
                          if (blur && options.trigger === 'focus') {
                              return element[0].blur();
                          }
                      });
                      $tooltip.$isShown = scope.$isShown = false;
                      scope.$$phase || scope.$root && scope.$root.$$phase || scope.$digest();
                      // Unbind events
                      if (options.keyboard && tipElement !== null) {
                          tipElement.off('keyup', $tooltip.$onKeyUp);
                      }
                  };
                  $tooltip.toggle = function () {
                      $tooltip.$isShown ? $tooltip.leave() : $tooltip.enter();
                  };
                  $tooltip.focus = function () {
                      tipElement[0].focus();
                  };
                  // Protected methods
                  $tooltip.$applyPlacement = function () {
                      if (!tipElement)
                          return;
                      // Get the position of the tooltip element.
                      var elementPosition = getPosition();
                      // Get the height and width of the tooltip so we can center it.
                      var tipWidth = tipElement.prop('offsetWidth'), tipHeight = tipElement.prop('offsetHeight');
                      // Get the tooltip's top and left coordinates to center it with this directive.
                      var tipPosition = getCalculatedOffset(options.placement, elementPosition, tipWidth, tipHeight);
                      // Now set the calculated positioning.
                      tipPosition.top += 'px';
                      tipPosition.left += 'px';
                      if (options.width) { tipPosition.width = options.width + 'px'; }
                      tipElement.css(tipPosition);
                  };
                  $tooltip.$onKeyUp = function (evt) {
                      evt.which === 27 && $tooltip.hide();
                  };
                  $tooltip.$onFocusKeyUp = function (evt) {
                      evt.which === 27 && element[0].blur();
                  };
                  $tooltip.$onFocusElementMouseDown = function (evt) {
                      evt.preventDefault();
                      evt.stopPropagation();
                      // Some browsers do not auto-focus buttons (eg. Safari)
                      $tooltip.$isShown ? element[0].blur() : element[0].focus();
                  };
                  // Private methods
                  function getPosition() {
                      if (options.container === 'body') {
                          return dimensions.offset(options.target[0] || element[0]);
                      } else {
                          return dimensions.position(options.target[0] || element[0]);
                      }
                  }
                  function getCalculatedOffset(placement, position, actualWidth, actualHeight) {
                      var offset;
                      var split = placement.split('-');
                      switch (split[0]) {
                          case 'right':
                              offset = {
                                  top: position.top + position.height / 2 - actualHeight / 2,
                                  left: position.left + position.width
                              };
                              break;
                          case 'bottom':
                              offset = {
                                  top: position.top + position.height,
                                  left: position.left + position.width / 2 - actualWidth / 2
                              };
                              break;
                          case 'left':
                              offset = {
                                  top: position.top + position.height / 2 - actualHeight / 2,
                                  left: position.left - actualWidth
                              };
                              break;
                          default:
                              offset = {
                                  top: position.top - actualHeight,
                                  left: position.left + position.width / 2 - actualWidth / 2
                              };
                              break;
                      }
                      if (!split[1]) {
                          return offset;
                      }
                      // Add support for corners @todo css
                      if (split[0] === 'top' || split[0] === 'bottom') {
                          switch (split[1]) {
                              case 'left':
                                  offset.left = position.left;
                                  break;
                              case 'right':
                                  offset.left = position.left + position.width - actualWidth;
                          }
                      } else if (split[0] === 'left' || split[0] === 'right') {
                          switch (split[1]) {
                              case 'top':
                                  offset.top = position.top - actualHeight;
                                  break;
                              case 'bottom':
                                  offset.top = position.top + position.height;
                          }
                      }
                      return offset;
                  }
                  return $tooltip;
              }
              // Helper functions
              function findElement(query, element) {
                  return angular.element((element || document).querySelectorAll(query));
              }
              function fetchTemplate(template) {
                  return $q.when($templateCache.get(template) || $http.get(template)).then(function (res) {
                      if (angular.isObject(res)) {
                          $templateCache.put(template, res.data);
                          return res.data;
                      }
                      return res;
                  });
              }
              return TooltipFactory;
          }
        ];
    }).directive('bsTooltip', [
      '$window',
      '$location',
      '$sce',
      '$tooltip',
      '$$rAF',
      function ($window, $location, $sce, $tooltip, $$rAF) {
          return {
              restrict: 'EAC',
              scope: true,
              link: function postLink(scope, element, attr, transclusion) {
                  // Directive options
                  var options = { scope: scope };
                  angular.forEach([
                    'template',
                    'contentTemplate',
                    'placement',
                    'container',
                    'target',
                    'delay',
                    'trigger',
                    'keyboard',
                    'html',
                    'animation',
                    'type',
                    'customClass'
                  ], function (key) {
                      if (angular.isDefined(attr[key]))
                          options[key] = attr[key];
                  });
                  // Observe scope attributes for change
                  angular.forEach(['title'], function (key) {
                      attr.$observe(key, function (newValue, oldValue) {
                          scope[key] = $sce.trustAsHtml(newValue);
                          angular.isDefined(oldValue) && $$rAF(function () {
                              tooltip && tooltip.$applyPlacement();
                          });
                      });
                  });
                  // Support scope as an object
                  attr.bsTooltip && scope.$watch(attr.bsTooltip, function (newValue, oldValue) {
                      if (angular.isObject(newValue)) {
                          angular.extend(scope, newValue);
                      } else {
                          scope.title = newValue;
                      }
                      angular.isDefined(oldValue) && $$rAF(function () {
                          tooltip && tooltip.$applyPlacement();
                      });
                  }, true);
                  // Visibility binding support
                  attr.bsShow && scope.$watch(attr.bsShow, function (newValue, oldValue) {
                      if (!tooltip || !angular.isDefined(newValue))
                          return;
                      if (angular.isString(newValue))
                          newValue = newValue.match(',?(tooltip),?');
                      newValue === true ? tooltip.show() : tooltip.hide();
                  });
                  // Initialize popover
                  var tooltip = $tooltip(element, options);
                  // Garbage collection
                  scope.$on('$destroy', function () {
                      if (tooltip)
                          tooltip.destroy();
                      options = null;
                      tooltip = null;
                  });
              }
          };
      }
    ]);

    //Source typeahead.js
    angular.module('mgcrea.ngStrap.typeahead', [
      'mgcrea.ngStrap.tooltip',
      'mgcrea.ngStrap.helpers.parseOptions'
    ]).provider('$typeahead', function () {
        var defaults = this.defaults = {
            animation: 'am-fade',
            prefixClass: 'typeahead',
            prefixEvent: '$typeahead',
            placement: 'bottom-left',
            template: 'typeahead.tpl.html',
            trigger: 'focus',
            container: false,
            keyboard: true,
            html: false,
            delay: 0,
            minLength: 1,
            filter: 'filter',
            limit: 6
        };
        this.$get = [
          '$window',
          '$rootScope',
          '$tooltip',
          function ($window, $rootScope, $tooltip) {
              var bodyEl = angular.element($window.document.body);
              function TypeaheadFactory(element, controller, config) {
                  var $typeahead = {};
                  // Common vars
                  var options = angular.extend({}, defaults, config);
                  $typeahead = $tooltip(element, options);
                  var parentScope = config.scope;
                  var scope = $typeahead.$scope;
                  scope.$resetMatches = function () {
                      scope.$matches = [];
                      scope.$activeIndex = 0;
                  };
                  scope.$resetMatches();
                  scope.$activate = function (index) {
                      scope.$$postDigest(function () {
                          $typeahead.activate(index);
                      });
                  };
                  scope.$select = function (index, evt) {
                      scope.$$postDigest(function () {
                          $typeahead.select(index);
                      });
                  };
                  scope.$isVisible = function () {
                      return $typeahead.$isVisible();
                  };
                  // Public methods
                  $typeahead.update = function (matches) {
                      scope.$matches = matches;
                      if (scope.$activeIndex >= matches.length) {
                          scope.$activeIndex = 0;
                      }
                  };
                  $typeahead.activate = function (index) {
                      scope.$activeIndex = index;
                  };
                  $typeahead.select = function (index) {
                      var value = scope.$matches[index].value;
                      controller.$setViewValue(value);
                      controller.$render();
                      scope.$resetMatches();
                      if (parentScope)
                          parentScope.$digest();
                      // Emit event
                      scope.$emit(options.prefixEvent + '.select', value, index);
                  };
                  // Protected methods
                  $typeahead.$isVisible = function () {
                      if (!options.minLength || !controller) {
                          return !!scope.$matches.length;
                      }
                      // minLength support
                      return scope.$matches.length && angular.isString(controller.$viewValue) && controller.$viewValue.length >= options.minLength;
                  };
                  $typeahead.$getIndex = function (value) {
                      var l = scope.$matches.length, i = l;
                      if (!l)
                          return;
                      for (i = l; i--;) {
                          if (scope.$matches[i].value === value)
                              break;
                      }
                      if (i < 0)
                          return;
                      return i;
                  };
                  $typeahead.$onMouseDown = function (evt) {
                      // Prevent blur on mousedown
                      evt.preventDefault();
                      evt.stopPropagation();
                  };
                  $typeahead.$onKeyDown = function (evt) {
                      if (!/(38|40|13)/.test(evt.keyCode))
                          return;
                      // Let ngSubmit pass if the typeahead tip is hidden
                      if ($typeahead.$isVisible()) {
                          evt.preventDefault();
                          evt.stopPropagation();
                      }
                      // Select with enter
                      if (evt.keyCode === 13 && scope.$matches.length) {
                          $typeahead.select(scope.$activeIndex);
                      }  // Navigate with keyboard
                      else if (evt.keyCode === 38 && scope.$activeIndex > 0)
                          scope.$activeIndex--;
                      else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1)
                          scope.$activeIndex++;
                      else if (angular.isUndefined(scope.$activeIndex))
                          scope.$activeIndex = 0;
                      scope.$digest();
                  };
                  // Overrides
                  var show = $typeahead.show;
                  $typeahead.show = function () {
                      show();
                      setTimeout(function () {
                          $typeahead.$element.on('mousedown', $typeahead.$onMouseDown);
                          if (options.keyboard) {
                              element.on('keydown', $typeahead.$onKeyDown);
                          }
                      });
                  };
                  var hide = $typeahead.hide;
                  $typeahead.hide = function () {
                      $typeahead.$element.off('mousedown', $typeahead.$onMouseDown);
                      if (options.keyboard) {
                          element.off('keydown', $typeahead.$onKeyDown);
                      }
                      hide();
                  };
                  return $typeahead;
              }
              TypeaheadFactory.defaults = defaults;
              return TypeaheadFactory;
          }
        ];
    }).directive('bsTypeahead', [
      '$window',
      '$parse',
      '$q',
      '$typeahead',
      '$parseOptions',
      function ($window, $parse, $q, $typeahead, $parseOptions) {
          var defaults = $typeahead.defaults;
          return {
              restrict: 'EAC',
              require: 'ngModel',
              link: function postLink(scope, element, attr, controller) {
                  // Directive options
                  var options = { scope: scope };
                  angular.forEach([
                    'placement',
                    'container',
                    'delay',
                    'trigger',
                    'keyboard',
                    'html',
                    'animation',
                    'template',
                    'filter',
                    'limit',
                    'minLength',
                    'watchOptions',
                    'selectMode'
                  ], function (key) {
                      if (angular.isDefined(attr[key]))
                          options[key] = attr[key];
                  });
                  // Build proper ngOptions
                  var filter = options.filter || defaults.filter;
                  var limit = options.limit || defaults.limit;
                  var ngOptions = attr.ngOptions;
                  if (filter)
                      ngOptions += ' | ' + filter + ':$viewValue';
                  if (limit)
                      ngOptions += ' | limitTo:' + limit;
                  var parsedOptions = $parseOptions(ngOptions);
                  // Initialize typeahead
                  var typeahead = $typeahead(element, controller, options);
                  // Watch options on demand
                  if (options.watchOptions) {
                      // Watch ngOptions values before filtering for changes, drop function calls
                      var watchedOptions = parsedOptions.$match[7].replace(/\|.+/, '').replace(/\(.*\)/g, '').trim();
                      scope.$watch(watchedOptions, function (newValue, oldValue) {
                          // console.warn('scope.$watch(%s)', watchedOptions, newValue, oldValue);
                          parsedOptions.valuesFn(scope, controller).then(function (values) {
                              typeahead.update(values);
                              controller.$render();
                          });
                      }, true);
                  }
                  // Watch model for changes
                  scope.$watch(attr.ngModel, function (newValue, oldValue) {
                      // console.warn('$watch', element.attr('ng-model'), newValue);
                      scope.$modelValue = newValue;
                      // Publish modelValue on scope for custom templates
                      parsedOptions.valuesFn(scope, controller).then(function (values) {
                          // Prevent input with no future prospect if selectMode is truthy
                          // @TODO test selectMode
                          if (options.selectMode && !values.length && newValue.length > 0) {
                              controller.$setViewValue(controller.$viewValue.substring(0, controller.$viewValue.length - 1));
                              return;
                          }
                          if (values.length > limit)
                              values = values.slice(0, limit);
                          var isVisible = typeahead.$isVisible();
                          isVisible && typeahead.update(values);
                          // Do not re-queue an update if a correct value has been selected
                          if (values.length === 1 && values[0].value === newValue)
                              return;
                          !isVisible && typeahead.update(values);
                          // Queue a new rendering that will leverage collection loading
                          controller.$render();
                      });
                  });
                  // Model rendering in view
                  controller.$render = function () {
                      // console.warn('$render', element.attr('ng-model'), 'controller.$modelValue', typeof controller.$modelValue, controller.$modelValue, 'controller.$viewValue', typeof controller.$viewValue, controller.$viewValue);
                      if (controller.$isEmpty(controller.$viewValue))
                          return element.val('');
                      var index = typeahead.$getIndex(controller.$modelValue);
                      var selected = angular.isDefined(index) ? typeahead.$scope.$matches[index].label : controller.$viewValue;
                      selected = angular.isObject(selected) ? selected.label : selected;
                      element.val(selected.replace(/<(?:.|\n)*?>/gm, '').trim());
                  };
                  // Garbage collection
                  scope.$on('$destroy', function () {
                      typeahead.destroy();
                      options = null;
                      typeahead = null;
                  });
              }
          };
      }
    ]);

    //HELPER
    angular.module('mgcrea.ngStrap.helpers.parseOptions', []).provider('$parseOptions', function () {
        var defaults = this.defaults = { regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/ };
        this.$get = [
          '$parse',
          '$q',
          function ($parse, $q) {
              function ParseOptionsFactory(attr, config) {
                  var $parseOptions = {};
                  // Common vars
                  var options = angular.extend({}, defaults, config);
                  $parseOptions.$values = [];
                  // Private vars
                  var match, displayFn, valueName, keyName, groupByFn, valueFn, valuesFn;
                  $parseOptions.init = function () {
                      $parseOptions.$match = match = attr.match(options.regexp);
                      displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]);
                  };
                  $parseOptions.valuesFn = function (scope, controller) {
                      return $q.when(valuesFn(scope, controller)).then(function (values) {
                          $parseOptions.$values = values ? parseValues(values, scope) : {};
                          return $parseOptions.$values;
                      });
                  };
                  // Private functions
                  function parseValues(values, scope) {
                      return values.map(function (match, index) {
                          var locals = {}, label, value;
                          locals[valueName] = match;
                          label = displayFn(scope, locals);
                          value = valueFn(scope, locals) || index;
                          return {
                              label: label,
                              value: value
                          };
                      });
                  }
                  $parseOptions.init();
                  return $parseOptions;
              }
              return ParseOptionsFactory;
          }
        ];
    });

    angular.module('mgcrea.ngStrap').run(['$templateCache', function ($templateCache) {
        'use strict';

        $templateCache.put('datepicker.tpl.html',
        '<div class="dropdown-menu datepicker" ng-class="\'datepicker-mode-\' + $mode" style="max-width: 320px;">' +
            '<table style="table-layout: fixed; height: 100%; width: 100%;">' +
                '<thead>' +
                    '<tr class="text-center">' +
                        '<th>' +
                            '<button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$selectPane(-1)">' +
                                '<i class="{{$iconLeft}}"></i>' +
                            '</button>' +
                        '</th>' +
                        '<th colspan="{{ rows[0].length - 2 }}">' +
                            '<button tabindex="-1" type="button" class="btn btn-default btn-block text-strong"  ng-click="$toggleMode()">' +
                                '<strong style="text-transform: capitalize;" ng-bind="title"></strong>' +
                            '</button>' +
                        '</th>' +
                        '<th>' +
                            '<button tabindex="-1" type="button" class="btn btn-default pull-right" ng-click="$selectPane(+1)">' +
                                '<i class="{{$iconRight}}"></i>' +
                            '</button>' +
                        '</th>' +
                    '</tr>' +
                    '<tr ng-show="showLabels" ng-bind-html="labels"></tr>' +
                '</thead>' +
                '<tbody>' +
                    '<tr ng-repeat="(i, row) in rows" height="{{ 100 / rows.length }}%">' +
                        '<td class="text-center" ng-repeat="(j, el) in row">' +
                            '<button tabindex="-1" type="button" class="btn btn-default" style="width: 100%" ng-class="{\'btn-primary\': el.selected}" ng-click="$select(el.date)" ng-disabled="el.disabled">' +
                                '<span ng-class="{\'text-muted\': el.muted}" ng-bind="el.label"></span>' +
                            '</button>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
        '</div>'
        );

        $templateCache.put('popover.tpl.html',
        '<div class="popover">' +
            '<div class="arrow"></div>' +
            '<h3 class="popover-title" ng-bind="title" ng-show="title"></h3>' +
            '<div class="popover-content" ng-bind="content"></div>' +
        '</div>'
        );


        $templateCache.put('select/select.tpl.html',
        '<ul vs-repeat="30" tabindex="-1" style="position:absolute;min-height:20px;max-height:250px;overflow-y:scroll;" class="select dropdown-menu" role="select">' +  //ng-show="$isVisible()"
            // '<li ng-if="$showAllNoneButtons">' +
                // '<div class="btn-group" style="margin-bottom: 5px; margin-left: 5px">' + 
                    // '<button class="btn btn-default btn-xs" ng-click="$selectAll()">All</button>' + 
                    // '<button class="btn btn-default btn-xs" ng-click="$selectNone()">None</button>' + 
                // '</div>' + 
            // '</li>' + 
            '<li ng-repeat="match in $matches track by $index">' +  // role="presentation" // ng-class="{active: $isActive($index)}"
                '<a role="menuitem" tabindex="-1" ng-click="$select(match, $event)">' +
                    '<span>{{match.label}}</span>' + //'<span ng-bind="match.label"></span>' + 
                '</a>' +
                //'<i style="cursor: default" class="{{$iconCheckmark}} pull-right" ng-if="$isMultiple && $isActive($index)" ng-click="$select(match, $event)"></i>' + 
            '</li>' +
        '</ul>'
        );


        $templateCache.put('tab.tpl.html',
        '<ul class="nav" ng-class="$navClass" role="tablist">' +
            '<li ng-repeat="$pane in $panes" ng-show="$pane.show" ng-class="$index == $panes.$active ? $activeClass : \'\'">' +
                '<a role="tab" data-toggle="tab" ng-click="$setActive($index)" data-index="{{ $index }}" ng-bind-html="$pane.title"></a>' +
            '</li>' +
        '</ul>' +
        '<div ng-transclude class="tab-content"></div>'
        );

        $templateCache.put('timepicker.tpl.html',
        '<div class="dropdown-menu timepicker" style="min-width: 0px;width: auto;">' +
            '<table height="100%">' +
              '<thead>' +
                '<tr class="text-center">' +
                  '<th>' +
                    '<button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 0)">' +
                      '<i class="{{ $iconUp }}"></i>' +
                    '</button>' +
                  '</th>' +
                  '<th>&nbsp;</th>' +
                  '<th>' +
                    '<button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 1)">' +
                      '<i class="{{ $iconUp }}"></i>' +
                    '</button>' +
                  '</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr ng-repeat="(i, row) in rows">' +
                  '<td class="text-center">' +
                    '<button tabindex="-1" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[0].selected}" ng-click="$select(row[0].date, 0)" ng-disabled="row[0].disabled">' +
                      '<span ng-class="{\'text-muted\': row[0].muted}" ng-bind="row[0].label"></span>' +
                    '</button>' +
                  '</td>' +
                  '<td>' +
                    '<span ng-bind="i == midIndex ? timeSeparator : \' \'"></span>' +
                  '</td>' +
                  '<td class="text-center">' +
                    '<button tabindex="-1" ng-if="row[1].date" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[1].selected}" ng-click="$select(row[1].date, 1)" ng-disabled="row[1].disabled">' +
                      '<span ng-class="{\'text-muted\': row[1].muted}" ng-bind="row[1].label"></span>' +
                    '</button>' +
                  '</td>' +
                  '<td ng-if="showAM">&nbsp;</td>' +
                  '<td ng-if="showAM">' +
                    '<button tabindex="-1" ng-show="i == midIndex - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !!isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">AM</button>' +
                    '<button tabindex="-1" ng-show="i == midIndex + 1 - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">PM</button>' +
                  '</td>' +
                '</tr>' +
              '</tbody>' +
              '<tfoot>' +
                '<tr class="text-center">' +
                  '<th>' +
                    '<button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 0)">' +
                      '<i class="{{ $iconDown }}"></i>' +
                    '</button>' +
                  '</th>' +
                  '<th>&nbsp;</th>' +
                  '<th>' +
                    '<button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 1)">' +
                      '<i class="{{ $iconDown }}"></i>' +
                    '</button>' +
                  '</th>' +
                '</tr>' +
              '</tfoot>' +
            '</table>' +
        '</div>'
        );

        $templateCache.put('tooltip.tpl.html',
        '<div class="tooltip in" ng-show="title">' +
            '<div class="tooltip-arrow"></div>' +
            '<div class="tooltip-inner" ng-bind="title"></div>' +
        '</div>'
        );

        $templateCache.put('typeahead.tpl.html',
        '<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select">' +
            '<li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}">' +
                '<a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a>' +
            '</li>' +
        '</ul>'
        );


    }]);


})(window, document);

//OLD angular-strap.min.js
//timepicker issue with required on detail
//!function(e,t,n){"use strict";angular.module("mgcrea.ngStrap",["mgcrea.ngStrap.datepicker","mgcrea.ngStrap.popover","mgcrea.ngStrap.select","mgcrea.ngStrap.tab","mgcrea.ngStrap.timepicker","mgcrea.ngStrap.typeahead"]),angular.module("mgcrea.ngStrap.datepicker",["mgcrea.ngStrap.helpers.dateParser","mgcrea.ngStrap.tooltip"]).provider("$datepicker",function(){var e=this.defaults={animation:"am-fade",prefixClass:"datepicker",placement:"bottom-left",template:"datepicker.tpl.html",trigger:"focus",container:!1,keyboard:!0,html:!1,delay:0,useNative:!1,dateType:"date",dateFormat:"shortDate",modelDateFormat:null,dayFormat:"dd",strictFormat:!1,autoclose:!1,minDate:-(1/0),maxDate:+(1/0),startView:0,minView:0,startWeek:0,daysOfWeekDisabled:"",iconLeft:"glyphicon glyphicon-chevron-left",iconRight:"glyphicon glyphicon-chevron-right"};this.$get=["$window","$document","$rootScope","$sce","$locale","dateFilter","datepickerViews","$tooltip",function(t,n,a,i,o,r,s,l){function u(t,n,a){function i(e){e.selected=r.$isSelected(e.date)}function o(){t[0].focus()}var r=l(t,angular.extend({},e,a)),u=a.scope,p=r.$options,g=r.$scope;p.startView&&(p.startView-=p.minView);var m=s(r);r.$views=m.views;var $=m.viewDate;g.$mode=p.startView,g.$iconLeft=p.iconLeft,g.$iconRight=p.iconRight;var f=r.$views[g.$mode];g.$select=function(e){r.select(e)},g.$selectPane=function(e){r.$selectPane(e)},g.$toggleMode=function(){r.setMode((g.$mode+1)%r.$views.length)},r.update=function(e){angular.isDate(e)&&!isNaN(e.getTime())&&(r.$date=e,f.update.call(f,e)),r.$build(!0)},r.updateDisabledDates=function(e){p.disabledDateRanges=e;for(var t=0,n=g.rows.length;n>t;t++)angular.forEach(g.rows[t],r.$setDisabledEl)},r.select=function(e,t){angular.isDate(n.$dateValue)||(n.$dateValue=new Date(e)),!g.$mode||t?(n.$setViewValue(angular.copy(e)),n.$render(),p.autoclose&&!t&&r.hide(!0)):(angular.extend($,{year:e.getFullYear(),month:e.getMonth(),date:e.getDate()}),r.setMode(g.$mode-1),r.$build())},r.setMode=function(e){g.$mode=e,f=r.$views[g.$mode],r.$build()},r.$build=function(e){e===!0&&f.built||(e!==!1||f.built)&&f.build.call(f)},r.$updateSelected=function(){for(var e=0,t=g.rows.length;t>e;e++)angular.forEach(g.rows[e],i)},r.$isSelected=function(e){return f.isSelected(e)},r.$setDisabledEl=function(e){e.disabled=f.isDisabled(e.date)},r.$selectPane=function(e){var t=f.steps,n=new Date(Date.UTC($.year+(t.year||0)*e,$.month+(t.month||0)*e,$.date+(t.day||0)*e));angular.extend($,{year:n.getUTCFullYear(),month:n.getUTCMonth(),date:n.getUTCDate()}),r.$build()},r.$onMouseDown=function(e){if(e.preventDefault(),e.stopPropagation(),d){var t=angular.element(e.target);"button"!==t[0].nodeName.toLowerCase()&&(t=t.parent()),t.triggerHandler("click")}},r.$onKeyDown=function(e){if(/(38|37|39|40|13)/.test(e.keyCode)&&!e.shiftKey&&!e.altKey){if(e.preventDefault(),e.stopPropagation(),13===e.keyCode)return g.$mode?g.$apply(function(){r.setMode(g.$mode-1)}):r.hide(!0);f.onKeyDown(e),u.$digest()}};var h=r.init;r.init=function(){return c&&p.useNative?(t.prop("type","date"),void t.css("-webkit-appearance","textfield")):(d&&(t.prop("type","text"),t.attr("readonly","true"),t.on("click",o)),void h())};var v=r.destroy;r.destroy=function(){c&&p.useNative&&t.off("click",o),v()};var w=r.show;r.show=function(){w(),setTimeout(function(){r.$element.on(d?"touchstart":"mousedown",r.$onMouseDown),p.keyboard&&t.on("keydown",r.$onKeyDown)})};var b=r.hide;return r.hide=function(e){r.$element.off(d?"touchstart":"mousedown",r.$onMouseDown),p.keyboard&&t.off("keydown",r.$onKeyDown),b(e)},r}var c=(angular.element(t.document.body),/(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)),d="createTouch"in t.document&&c;return e.lang||(e.lang=o.id),u.defaults=e,u}]}).directive("bsDatepicker",["$window","$parse","$q","$locale","dateFilter","$datepicker","$dateParser","$timeout",function(e,t,n,a,i,o,r,s){var l=(o.defaults,/(ip(a|o)d|iphone|android)/gi.test(e.navigator.userAgent)),u=function(e){return!isNaN(parseFloat(e))&&isFinite(e)};return{restrict:"EAC",require:"ngModel",link:function(e,t,n,a){function s(e){return e&&e.length?e:null}var c={scope:e,controller:a};angular.forEach(["placement","container","delay","trigger","keyboard","html","animation","template","autoclose","dateType","dateFormat","modelDateFormat","dayFormat","strictFormat","startWeek","startDate","useNative","lang","startView","minView","iconLeft","iconRight","daysOfWeekDisabled"],function(e){angular.isDefined(n[e])&&(c[e]=n[e])}),n.bsShow&&e.$watch(n.bsShow,function(e,t){d&&angular.isDefined(e)&&(angular.isString(e)&&(e=e.match(",?(datepicker),?")),e===!0?d.show():d.hide())}),l&&c.useNative&&(c.dateFormat="yyyy-MM-dd");var d=o(t,a,c);c=d.$options,angular.forEach(["minDate","maxDate"],function(e){angular.isDefined(n[e])&&n.$observe(e,function(t){if("today"===t){var n=new Date;d.$options[e]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()+("maxDate"===e?1:0),0,0,0,"minDate"===e?0:-1)}else angular.isString(t)&&t.match(/^".+"$/)?d.$options[e]=+new Date(t.substr(1,t.length-2)):u(t)?d.$options[e]=+new Date(parseInt(t,10)):angular.isString(t)&&0===t.length?d.$options[e]="maxDate"===e?+(1/0):-(1/0):d.$options[e]=+new Date(t);!isNaN(d.$options[e])&&d.$build(!1)})}),e.$watch(n.ngModel,function(e,t){d.update(a.$dateValue)},!0),angular.isDefined(n.disabledDates)&&e.$watch(n.disabledDates,function(e,t){e=s(e),t=s(t),e!==t&&d.updateDisabledDates(e)});var p=r({format:c.dateFormat,lang:c.lang,strict:c.strictFormat});a.$parsers.unshift(function(e){if(!e)return void a.$setValidity("date",!0);var t=p.parse(e,a.$dateValue);if(!t||isNaN(t.getTime()))return void a.$setValidity("date",!1);var n=isNaN(d.$options.minDate)||t.getTime()>=d.$options.minDate,o=isNaN(d.$options.maxDate)||t.getTime()<=d.$options.maxDate,r=n&&o;return a.$setValidity("date",r),a.$setValidity("min",n),a.$setValidity("max",o),r&&(a.$dateValue=t),"string"===c.dateType?i(t,c.modelDateFormat||c.dateFormat):"number"===c.dateType?a.$dateValue.getTime():"iso"===c.dateType?a.$dateValue.toISOString():new Date(a.$dateValue)}),a.$formatters.push(function(e){var t;return t=angular.isUndefined(e)||null===e?NaN:angular.isDate(e)?e:"string"===c.dateType?p.parse(e,null,c.modelDateFormat):new Date(e),a.$dateValue=t,a.$dateValue}),a.$render=function(){t.val(!a.$dateValue||isNaN(a.$dateValue.getTime())?"":i(a.$dateValue,c.dateFormat))},e.$on("$destroy",function(){d&&d.destroy(),c=null,d=null})}}}]).provider("datepickerViews",function(){function e(e,t){for(var n=[];e.length>0;)n.push(e.splice(0,t));return n}function t(e,t){return(e%t+t)%t}this.defaults={dayFormat:"dd",daySplit:7};this.$get=["$locale","$sce","dateFilter",function(n,a,i){return function(o){var r=o.$scope,s=o.$options,l=n.DATETIME_FORMATS.SHORTDAY,u=l.slice(s.startWeek).concat(l.slice(0,s.startWeek)),c=a.trustAsHtml('<th class="dow text-center">'+u.join('</th><th class="dow text-center">')+"</th>"),d=o.$date||(s.startDate?new Date(s.startDate):new Date),p={year:d.getFullYear(),month:d.getMonth(),date:d.getDate()},g=(6e4*d.getTimezoneOffset(),[{format:s.dayFormat,split:7,steps:{month:1},update:function(e,t){!this.built||t||e.getFullYear()!==p.year||e.getMonth()!==p.month?(angular.extend(p,{year:o.$date.getFullYear(),month:o.$date.getMonth(),date:o.$date.getDate()}),o.$build()):e.getDate()!==p.date&&(p.date=o.$date.getDate(),o.$updateSelected())},build:function(){var n=new Date(p.year,p.month,1),a=n.getTimezoneOffset(),l=new Date(+n-864e5*t(n.getDay()-s.startWeek,7)),u=l.getTimezoneOffset();u!==a&&(l=new Date(+l+6e4*(u-a)));for(var d,g=[],m=0;42>m;m++)d=new Date(l.getFullYear(),l.getMonth(),l.getDate()+m),g.push({date:d,label:i(d,this.format),selected:o.$date&&this.isSelected(d),muted:d.getMonth()!==p.month,disabled:this.isDisabled(d)});r.title=i(n,"MMMM yyyy"),r.showLabels=!0,r.labels=c,r.rows=e(g,this.split),this.built=!0},isSelected:function(e){return o.$date&&e.getFullYear()===o.$date.getFullYear()&&e.getMonth()===o.$date.getMonth()&&e.getDate()===o.$date.getDate()},isDisabled:function(e){var t=e.getTime();if(t<s.minDate||t>s.maxDate)return!0;if(-1!==s.daysOfWeekDisabled.indexOf(e.getDay()))return!0;if(s.disabledDateRanges)for(var n=0;n<s.disabledDateRanges.length;n++)if(t>=s.disabledDateRanges[n].start)return t<=s.disabledDateRanges[n].end?!0:!1;return!1},onKeyDown:function(e){var t,n=o.$date.getTime();37===e.keyCode?t=new Date(n-864e5):38===e.keyCode?t=new Date(n-6048e5):39===e.keyCode?t=new Date(n+864e5):40===e.keyCode&&(t=new Date(n+6048e5)),this.isDisabled(t)||o.select(t,!0)}},{name:"month",format:"MMM",split:4,steps:{year:1},update:function(e,t){this.built&&e.getFullYear()===p.year?e.getMonth()!==p.month&&(angular.extend(p,{month:o.$date.getMonth(),date:o.$date.getDate()}),o.$updateSelected()):(angular.extend(p,{year:o.$date.getFullYear(),month:o.$date.getMonth(),date:o.$date.getDate()}),o.$build())},build:function(){for(var t,n=(new Date(p.year,0,1),[]),a=0;12>a;a++)t=new Date(p.year,a,1),n.push({date:t,label:i(t,this.format),selected:o.$isSelected(t),disabled:this.isDisabled(t)});r.title=i(t,"yyyy"),r.showLabels=!1,r.rows=e(n,this.split),this.built=!0},isSelected:function(e){return o.$date&&e.getFullYear()===o.$date.getFullYear()&&e.getMonth()===o.$date.getMonth()},isDisabled:function(e){var t=+new Date(e.getFullYear(),e.getMonth()+1,0);return t<s.minDate||e.getTime()>s.maxDate},onKeyDown:function(e){var t=o.$date.getMonth(),n=new Date(o.$date);37===e.keyCode?n.setMonth(t-1):38===e.keyCode?n.setMonth(t-4):39===e.keyCode?n.setMonth(t+1):40===e.keyCode&&n.setMonth(t+4),this.isDisabled(n)||o.select(n,!0)}},{name:"year",format:"yyyy",split:4,steps:{year:12},update:function(e,t){!this.built||t||parseInt(e.getFullYear()/20,10)!==parseInt(p.year/20,10)?(angular.extend(p,{year:o.$date.getFullYear(),month:o.$date.getMonth(),date:o.$date.getDate()}),o.$build()):e.getFullYear()!==p.year&&(angular.extend(p,{year:o.$date.getFullYear(),month:o.$date.getMonth(),date:o.$date.getDate()}),o.$updateSelected())},build:function(){for(var t,n=p.year-p.year%(3*this.split),a=[],s=0;12>s;s++)t=new Date(n+s,0,1),a.push({date:t,label:i(t,this.format),selected:o.$isSelected(t),disabled:this.isDisabled(t)});r.title=a[0].label+"-"+a[a.length-1].label,r.showLabels=!1,r.rows=e(a,this.split),this.built=!0},isSelected:function(e){return o.$date&&e.getFullYear()===o.$date.getFullYear()},isDisabled:function(e){var t=+new Date(e.getFullYear()+1,0,0);return t<s.minDate||e.getTime()>s.maxDate},onKeyDown:function(e){var t=o.$date.getFullYear(),n=new Date(o.$date);37===e.keyCode?n.setYear(t-1):38===e.keyCode?n.setYear(t-4):39===e.keyCode?n.setYear(t+1):40===e.keyCode&&n.setYear(t+4),this.isDisabled(n)||o.select(n,!0)}}]);return{views:s.minView?Array.prototype.slice.call(g,s.minView):g,viewDate:p}}}]}),angular.module("mgcrea.ngStrap.helpers.dateParser",[]).provider("$dateParser",["$localeProvider",function(e){var t=Date.prototype,n=this.defaults={format:"shortDate",strict:!1};this.$get=["$locale","dateFilter",function(e,a){var i=function(i){function o(e){var t,n=Object.keys(g),a=[],i=[],o=e;for(t=0;t<n.length;t++)if(e.split(n[t]).length>1){var r=o.search(n[t]);e=e.split(n[t]).join(""),g[n[t]]&&(a[r]=g[n[t]])}return angular.forEach(a,function(e){e&&i.push(e)}),i}function r(e){return e.replace(/\//g,"[\\/]").replace("/-/g","[-]").replace(/\./g,"[.]").replace(/\\s/g,"[\\s]")}function s(e){var t,n=Object.keys(p),a=e;for(t=0;t<n.length;t++)a=a.split(n[t]).join("${"+t+"}");for(t=0;t<n.length;t++)a=a.split("${"+t+"}").join("("+p[n[t]]+")");return e=r(e),new RegExp("^"+a+"$",["i"])}var l,u,c=angular.extend({},n,i),d={},p={sss:"[0-9]{3}",ss:"[0-5][0-9]",s:c.strict?"[1-5]?[0-9]":"[0-9]|[0-5][0-9]",mm:"[0-5][0-9]",m:c.strict?"[1-5]?[0-9]":"[0-9]|[0-5][0-9]",HH:"[01][0-9]|2[0-3]",H:c.strict?"1?[0-9]|2[0-3]":"[01]?[0-9]|2[0-3]",hh:"[0][1-9]|[1][012]",h:c.strict?"[1-9]|1[012]":"0?[1-9]|1[012]",a:"AM|PM",EEEE:e.DATETIME_FORMATS.DAY.join("|"),EEE:e.DATETIME_FORMATS.SHORTDAY.join("|"),dd:"0[1-9]|[12][0-9]|3[01]",d:c.strict?"[1-9]|[1-2][0-9]|3[01]":"0?[1-9]|[1-2][0-9]|3[01]",MMMM:e.DATETIME_FORMATS.MONTH.join("|"),MMM:e.DATETIME_FORMATS.SHORTMONTH.join("|"),MM:"0[1-9]|1[012]",M:c.strict?"[1-9]|1[012]":"0?[1-9]|1[012]",yyyy:"[1]{1}[0-9]{3}|[2]{1}[0-9]{3}",yy:"[0-9]{2}",y:c.strict?"-?(0|[1-9][0-9]{0,3})":"-?0*[0-9]{1,4}"},g={sss:t.setMilliseconds,ss:t.setSeconds,s:t.setSeconds,mm:t.setMinutes,m:t.setMinutes,HH:t.setHours,H:t.setHours,hh:t.setHours,h:t.setHours,dd:t.setDate,d:t.setDate,a:function(e){var t=this.getHours();return this.setHours(e.match(/pm/i)?t+12:t)},MMMM:function(t){return this.setMonth(e.DATETIME_FORMATS.MONTH.indexOf(t))},MMM:function(t){return this.setMonth(e.DATETIME_FORMATS.SHORTMONTH.indexOf(t))},MM:function(e){return this.setMonth(1*e-1)},M:function(e){return this.setMonth(1*e-1)},yyyy:t.setFullYear,yy:function(e){return this.setFullYear(2e3+1*e)},y:t.setFullYear};return d.init=function(){d.$format=e.DATETIME_FORMATS[c.format]||c.format,l=s(d.$format),u=o(d.$format)},d.isValid=function(e){return angular.isDate(e)?!isNaN(e.getTime()):l.test(e)},d.parse=function(e,t,n){angular.isDate(e)&&(e=a(e,n||d.$format));var i=n?s(n):l,r=n?o(n):u,c=i.exec(e);if(!c)return!1;for(var p=t||new Date(0,0,1),g=0;g<c.length-1;g++)r[g]&&r[g].call(p,c[g+1]);return p},d.init(),d};return i}]}]),angular.module("mgcrea.ngStrap.helpers.dimensions",[]).factory("dimensions",["$document","$window",function(t,n){var a=(angular.element,{}),i=a.nodeName=function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()};a.css=function(t,n,a){var i;return i=t.currentStyle?t.currentStyle[n]:e.getComputedStyle?e.getComputedStyle(t)[n]:t.style[n],a===!0?parseFloat(i)||0:i},a.offset=function(t){var n=t.getBoundingClientRect(),a=t.ownerDocument;return{width:n.width||t.offsetWidth,height:n.height||t.offsetHeight,top:n.top+(e.pageYOffset||a.documentElement.scrollTop)-(a.documentElement.clientTop||0),left:n.left+(e.pageXOffset||a.documentElement.scrollLeft)-(a.documentElement.clientLeft||0)}},a.position=function(e){var t,n,r={top:0,left:0};return"fixed"===a.css(e,"position")?n=e.getBoundingClientRect():(t=o(e),n=a.offset(e),n=a.offset(e),i(t,"html")||(r=a.offset(t)),r.top+=a.css(t,"borderTopWidth",!0),r.left+=a.css(t,"borderLeftWidth",!0)),{width:e.offsetWidth,height:e.offsetHeight,top:n.top-r.top-a.css(e,"marginTop",!0),left:n.left-r.left-a.css(e,"marginLeft",!0)}};var o=function(e){var t=e.ownerDocument,n=e.offsetParent||t;if(i(n,"#document"))return t.documentElement;for(;n&&!i(n,"html")&&"static"===a.css(n,"position");)n=n.offsetParent;return n||t.documentElement};return a.height=function(e,t){var n=e.offsetHeight;return t?n+=a.css(e,"marginTop",!0)+a.css(e,"marginBottom",!0):n-=a.css(e,"paddingTop",!0)+a.css(e,"paddingBottom",!0)+a.css(e,"borderTopWidth",!0)+a.css(e,"borderBottomWidth",!0),n},a.width=function(e,t){var n=e.offsetWidth;return t?n+=a.css(e,"marginLeft",!0)+a.css(e,"marginRight",!0):n-=a.css(e,"paddingLeft",!0)+a.css(e,"paddingRight",!0)+a.css(e,"borderLeftWidth",!0)+a.css(e,"borderRightWidth",!0),n},a}]),angular.module("mgcrea.ngStrap.select",["mgcrea.ngStrap.tooltip","mgcrea.ngStrap.helpers.parseOptions"]).provider("$select",function(){var e=this.defaults={animation:"am-fade",prefixClass:"select",prefixEvent:"$select",placement:"bottom-left",template:"select/select.tpl.html",trigger:"focus",container:!1,keyboard:!0,html:!1,delay:0,multiple:!1,allNoneButtons:!1,sort:!0,caretHtml:'&nbsp;<span class="caret"></span>',placeholder:"- SELECT -",maxLength:3,maxLengthHtml:"selected",iconCheckmark:"glyphicon glyphicon-ok"};this.$get=["$window","$document","$rootScope","$tooltip",function(t,n,a,i){function o(t,n,a){var o={},r=angular.extend({},e,a);r.width=t.prop("offsetWidth"),o=i(t,r);var l=o.$scope;l.$matches=[],l.$activeIndex=0,l.$isMultiple=r.multiple,l.$showAllNoneButtons=r.allNoneButtons&&r.multiple,l.$iconCheckmark=r.iconCheckmark,l.$activate=function(e){l.$$postDigest(function(){o.activate(e)})},l.$select=function(e,t){l.$$postDigest(function(){o.select(l.$matches.indexOf(e))})},l.$isVisible=function(){return o.$isVisible()},l.$isActive=function(e){return o.$isActive(e)},l.$selectAll=function(){for(var e=0;e<l.$matches.length;e++)l.$isActive(e)||l.$select(e)},l.$selectNone=function(){for(var e=0;e<l.$matches.length;e++)l.$isActive(e)&&l.$select(e)},o.update=function(e){l.$matches=e,l.$matches.unshift({label:"- Select -",value:null}),o.$updateActiveIndex()},o.activate=function(e){return r.multiple?(l.$activeIndex.sort(),o.$isActive(e)?l.$activeIndex.splice(l.$activeIndex.indexOf(e),1):l.$activeIndex.push(e),r.sort&&l.$activeIndex.sort()):l.$activeIndex=e,l.$activeIndex},o.select=function(e){var t=l.$matches[e].value;l.$apply(function(){o.activate(e),r.multiple?n.$setViewValue(l.$activeIndex.map(function(e){return l.$matches[e].value})):(n.$setViewValue(t),o.hide())}),l.$emit(r.prefixEvent+".select",t,e)},o.$updateActiveIndex=function(){n.$modelValue&&l.$matches.length?r.multiple&&angular.isArray(n.$modelValue)?l.$activeIndex=n.$modelValue.map(function(e){return o.$getIndex(e)}):l.$activeIndex=o.$getIndex(n.$modelValue):l.$activeIndex>=l.$matches.length&&(l.$activeIndex=r.multiple?[]:0)},o.$isVisible=function(){return r.minLength&&n?l.$matches.length&&n.$viewValue.length>=r.minLength:l.$matches.length},o.$isActive=function(e){return r.multiple?-1!==l.$activeIndex.indexOf(e):l.$activeIndex===e},o.$getIndex=function(e){var t=l.$matches.length,n=t;if(t){for(n=t;n--&&l.$matches[n].value!==e;);if(!(0>n))return n}},o.$onMouseDown=function(e){if(e.preventDefault(),e.stopPropagation(),s){var t=angular.element(e.target);t.triggerHandler("click")}},o.$onKeyDown=function(e){if(/(9|13|38|40)/.test(e.keyCode)){if(e.preventDefault(),e.stopPropagation(),!r.multiple&&(13===e.keyCode||9===e.keyCode))return o.select(l.$activeIndex);38===e.keyCode&&l.$activeIndex>0?l.$activeIndex--:40===e.keyCode&&l.$activeIndex<l.$matches.length-1?l.$activeIndex++:angular.isUndefined(l.$activeIndex)&&(l.$activeIndex=0),l.$digest()}};var u=o.show;o.show=function(){u(),r.multiple&&o.$element.addClass("select-multiple"),setTimeout(function(){o.$element.on(s?"touchstart":"mousedown",o.$onMouseDown),r.keyboard&&t.on("keydown",o.$onKeyDown)})};var c=o.hide;return o.hide=function(){o.$element.off(s?"touchstart":"mousedown",o.$onMouseDown),r.keyboard&&t.off("keydown",o.$onKeyDown),c(!0)},o}var r=(angular.element(t.document.body),/(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)),s="createTouch"in t.document&&r;return o.defaults=e,o}]}).directive("bsSelect",["$window","$parse","$q","$select","$parseOptions",function(e,t,n,a,i){var o=a.defaults;return{restrict:"EAC",require:"ngModel",link:function(e,t,n,r){var s={scope:e};if(angular.forEach(["placement","container","delay","trigger","keyboard","html","animation","template","placeholder","multiple","allNoneButtons","maxLength","maxLengthHtml"],function(e){angular.isDefined(n[e])&&(s[e]=n[e])}),"select"===t[0].nodeName.toLowerCase()){var l=t;l.css("display","none"),t=angular.element('<button type="button" class="btn btn-default"></button>'),l.after(t)}var u=i(n.ngOptions),c=a(t,r,s),d=u.$match[7].replace(/\|.+/,"").trim();e.$watch(d,function(t,n){u.valuesFn(e,r).then(function(e){c.update(e),r.$render()})},!0),e.$watch(n.ngModel,function(e,t){c.$updateActiveIndex(),r.$render()},!0),r.$render=function(){var e,a;s.multiple&&angular.isArray(r.$modelValue)?(e=r.$modelValue.map(function(e){return a=c.$getIndex(e),angular.isDefined(a)?c.$scope.$matches[a].label:!1}).filter(angular.isDefined),e=e.length>(s.maxLength||o.maxLength)?e.length+" "+(s.maxLengthHtml||o.maxLengthHtml):e.join(", ")):(a=c.$getIndex(r.$modelValue),e=angular.isDefined(a)?c.$scope.$matches[a].label:!1),t.html((e?e:n.placeholder||o.placeholder)+o.caretHtml)},e.$on("$destroy",function(){c.destroy(),s=null,c=null})}}}]),angular.module("mgcrea.ngStrap.tab",[]).provider("$tab",function(){var e=this.defaults={animation:"am-fade",template:"tab.tpl.html",navClass:"nav-tabs",activeClass:"active"},t=this.controller=function(t,n,a){var i=this;i.$options=angular.copy(e),angular.forEach(["animation","navClass","activeClass"],function(e){angular.isDefined(a[e])&&(i.$options[e]=a[e])}),t.$navClass=i.$options.navClass,t.$activeClass=i.$options.activeClass,i.$panes=t.$panes=[],i.$viewChangeListeners=[],i.$push=function(e){i.$panes.push(e)},i.select=function(e){i.$panes[e].onSelect()},i.$panes.$active=0,i.$setActive=t.$setActive=function(e){i.$panes.$active=e,i.select(e),i.$viewChangeListeners.forEach(function(e){e()});try{t.mainform.$setPristine()}catch(n){}}};this.$get=function(){var n={};return n.defaults=e,n.controller=t,n}}).directive("bsTabs",["$window","$animate","$tab",function(e,t,n){var a=n.defaults;return{require:["?ngModel","bsTabs"],transclude:!0,scope:!0,controller:["$scope","$element","$attrs",n.controller],templateUrl:function(e,t){return t.template||a.template},link:function(e,t,n,a){var i=a[0],o=a[1];i&&(o.$viewChangeListeners.push(function(){i.$setViewValue(o.$panes.$active)}),i.$formatters.push(function(e){return o.$setActive(1*e),e}))}}}]).directive("bsPane",["$window","$animate","$sce","$parse",function(e,t,a,i){return{require:["^?ngModel","^bsTabs"],scope:{title:"@",ngShow:"@",onSelect:"&select"},link:function(e,a,i,o){function r(){var n=s.$panes.indexOf(e),i=s.$panes.$active;t[n===i?"addClass":"removeClass"](a,s.$options.activeClass)}var s=(o[0],o[1]);a.addClass("tab-pane in"),i.ngShow===n?e.show=!0:e.show=i.ngShow,s.$options.animation&&a.addClass(s.$options.animation),s.$push(e),s.$viewChangeListeners.push(function(){r()}),r()}}}]),angular.module("mgcrea.ngStrap.timepicker",["mgcrea.ngStrap.helpers.dateParser","mgcrea.ngStrap.tooltip"]).provider("$timepicker",function(){var e=this.defaults={animation:"am-fade",prefixClass:"timepicker",placement:"bottom-left",template:"timepicker.tpl.html",trigger:"focus",container:!1,keyboard:!0,html:!1,delay:0,useNative:!0,timeType:"date",timeFormat:"shortTime",modelTimeFormat:null,autoclose:!1,minTime:-(1/0),maxTime:+(1/0),length:3,hourStep:1,minuteStep:5,iconUp:"glyphicon glyphicon-chevron-up",iconDown:"glyphicon glyphicon-chevron-down",arrowBehavior:"pager"};this.$get=["$window","$document","$rootScope","$sce","$locale","dateFilter","$tooltip",function(t,n,a,i,o,r,s){function l(t,n,a){function i(e,n){if(t[0].createTextRange){var a=t[0].createTextRange();a.collapse(!0),a.moveStart("character",e),a.moveEnd("character",n),a.select()}else t[0].setSelectionRange?t[0].setSelectionRange(e,n):angular.isUndefined(t[0].selectionStart)&&(t[0].selectionStart=e,t[0].selectionEnd=n)}function l(){t[0].focus()}var d=s(t,angular.extend({},e,a)),p=a.scope,g=d.$options,m=d.$scope,$=0,f=n.$dateValue||new Date,h={hour:f.getHours(),meridian:f.getHours()<12,minute:f.getMinutes(),second:f.getSeconds(),millisecond:f.getMilliseconds()},v=o.DATETIME_FORMATS[g.timeFormat]||g.timeFormat,w=/(h+)([:\.])?(m+)[ ]?(a?)/i.exec(v).slice(1);m.$iconUp=g.iconUp,m.$iconDown=g.iconDown,m.$select=function(e,t){d.select(e,t)},m.$moveIndex=function(e,t){d.$moveIndex(e,t)},m.$switchMeridian=function(e){d.switchMeridian(e)},d.update=function(e){angular.isDate(e)&&!isNaN(e.getTime())?(d.$date=e,angular.extend(h,{hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds(),millisecond:e.getMilliseconds()}),d.$build()):d.$isBuilt||d.$build()},d.select=function(e,t,a){(!n.$dateValue||isNaN(n.$dateValue.getTime()))&&(n.$dateValue=new Date(1970,0,1)),angular.isDate(e)||(e=new Date(e)),0===t?n.$dateValue.setHours(e.getHours()):1===t&&n.$dateValue.setMinutes(e.getMinutes()),n.$setViewValue(n.$dateValue),n.$render(),g.autoclose&&!a&&d.hide(!0)},d.switchMeridian=function(e){var t=(e||n.$dateValue).getHours();n.$dateValue.setHours(12>t?t+12:t-12),n.$setViewValue(n.$dateValue),n.$render()},d.$build=function(){var e,t,n=m.midIndex=parseInt(g.length/2,10),a=[];for(e=0;e<g.length;e++)t=new Date(1970,0,1,h.hour-(n-e)*g.hourStep),a.push({date:t,label:r(t,w[0]),selected:d.$date&&d.$isSelected(t,0),disabled:d.$isDisabled(t,0)});var i,o=[];for(e=0;e<g.length;e++)i=new Date(1970,0,1,0,h.minute-(n-e)*g.minuteStep),o.push({date:i,label:r(i,w[2]),selected:d.$date&&d.$isSelected(i,1),disabled:d.$isDisabled(i,1)});var s=[];for(e=0;e<g.length;e++)s.push([a[e],o[e]]);m.rows=s,m.showAM=!!w[3],m.isAM=(d.$date||a[n].date).getHours()<12,m.timeSeparator=w[1],d.$isBuilt=!0},d.$isSelected=function(e,t){return d.$date?0===t?e.getHours()===d.$date.getHours():1===t?e.getMinutes()===d.$date.getMinutes():void 0:!1},d.$isDisabled=function(e,t){var n;return 0===t?n=e.getTime()+6e4*h.minute:1===t&&(n=e.getTime()+36e5*h.hour),n<1*g.minTime||n>1*g.maxTime},m.$arrowAction=function(e,t){"picker"===g.arrowBehavior?d.$setTimeByStep(e,t):d.$moveIndex(e,t)},d.$setTimeByStep=function(e,t){var n=new Date(d.$date),a=n.getHours(),i=(r(n,"h").length,n.getMinutes());r(n,"mm").length;0===t?n.setHours(a-parseInt(g.hourStep,10)*e):n.setMinutes(i-parseInt(g.minuteStep,10)*e),d.select(n,t,!0),p.$digest()},d.$moveIndex=function(e,t){var n;0===t?(n=new Date(1970,0,1,h.hour+e*g.length,h.minute),angular.extend(h,{hour:n.getHours()})):1===t&&(n=new Date(1970,0,1,h.hour,h.minute+e*g.length*g.minuteStep),angular.extend(h,{minute:n.getMinutes()})),d.$build()},d.$onMouseDown=function(e){if("input"!==e.target.nodeName.toLowerCase()&&e.preventDefault(),e.stopPropagation(),c){var t=angular.element(e.target);"button"!==t[0].nodeName.toLowerCase()&&(t=t.parent()),t.triggerHandler("click")}},d.$onKeyDown=function(e){if(/(38|37|39|40|13)/.test(e.keyCode)&&!e.shiftKey&&!e.altKey){if(e.preventDefault(),e.stopPropagation(),13===e.keyCode)return d.hide(!0);var t=new Date(d.$date),n=t.getHours(),a=r(t,"h").length,o=t.getMinutes(),s=r(t,"mm").length,l=/(37|39)/.test(e.keyCode),u=2+1*!!w[3];l&&(37===e.keyCode?$=1>$?u-1:$-1:39===e.keyCode&&($=u-1>$?$+1:0));var c=[0,a];0===$?(38===e.keyCode?t.setHours(n-parseInt(g.hourStep,10)):40===e.keyCode&&t.setHours(n+parseInt(g.hourStep,10)),c=[0,a]):1===$?(38===e.keyCode?t.setMinutes(o-parseInt(g.minuteStep,10)):40===e.keyCode&&t.setMinutes(o+parseInt(g.minuteStep,10)),c=[a+1,a+1+s]):2===$&&(l||d.switchMeridian(),c=[a+1+s+1,a+1+s+3]),d.select(t,$,!0),i(c[0],c[1]),p.$digest()}};var b=d.init;d.init=function(){return u&&g.useNative?(t.prop("type","time"),void t.css("-webkit-appearance","textfield")):(c&&(t.prop("type","text"),t.attr("readonly","true"),t.on("click",l)),void b())};var y=d.destroy;d.destroy=function(){u&&g.useNative&&t.off("click",l),y()};var D=d.show;d.show=function(){D(),setTimeout(function(){d.$element.on(c?"touchstart":"mousedown",d.$onMouseDown),g.keyboard&&t.on("keydown",d.$onKeyDown)})};var x=d.hide;return d.hide=function(e){d.$element.off(c?"touchstart":"mousedown",d.$onMouseDown),g.keyboard&&t.off("keydown",d.$onKeyDown),x(e)},d}var u=(angular.element(t.document.body),/(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)),c="createTouch"in t.document&&u;return e.lang||(e.lang=o.id),l.defaults=e,l}]}).directive("bsTimepicker",["$window","$parse","$q","$locale","dateFilter","$timepicker","$dateParser","$timeout",function(e,t,n,a,i,o,r,s){var l=o.defaults,u=/(ip(a|o)d|iphone|android)/gi.test(e.navigator.userAgent);e.requestAnimationFrame||e.setTimeout;return{restrict:"EAC",require:"ngModel",link:function(e,t,n,a){var s={scope:e,controller:a};angular.forEach(["placement","container","delay","trigger","keyboard","html","animation","template","autoclose","timeType","timeFormat","modelTimeFormat","useNative","hourStep","minuteStep","length","arrowBehavior"],function(e){angular.isDefined(n[e])&&(s[e]=n[e])}),n.bsShow&&e.$watch(n.bsShow,function(e,t){c&&angular.isDefined(e)&&(angular.isString(e)&&(e=e.match(",?(timepicker),?")),e===!0?c.show():c.hide())}),u&&(s.useNative||l.useNative)&&(s.timeFormat="HH:mm");var c=o(t,a,s);s=c.$options;var d=r({format:s.timeFormat,lang:s.lang});angular.forEach(["minTime","maxTime"],function(e){angular.isDefined(n[e])&&n.$observe(e,function(t){"now"===t?c.$options[e]=(new Date).setFullYear(1970,0,1):angular.isString(t)&&t.match(/^".+"$/)?c.$options[e]=+new Date(t.substr(1,t.length-2)):c.$options[e]=d.parse(t,new Date(1970,0,1,0)),!isNaN(c.$options[e])&&c.$build()})}),e.$watch(n.ngModel,function(e,t){c.update(a.$dateValue)},!0),a.$parsers.unshift(function(e){if(!e)return void a.$setValidity("date",!0);var t=d.parse(e,a.$dateValue);if(!t||isNaN(t.getTime()))a.$setValidity("date",!1);else{var n=t.getTime()>=s.minTime&&t.getTime()<=s.maxTime;a.$setValidity("date",n),n&&(a.$dateValue=t)}return"string"===s.timeType?i(t,s.modelTimeFormat||s.timeFormat):"number"===s.timeType?a.$dateValue.getTime():"iso"===s.timeType?a.$dateValue.toISOString():new Date(a.$dateValue)}),a.$formatters.push(function(e){var t;return t=angular.isUndefined(e)||null===e?NaN:angular.isDate(e)?e:"string"===s.timeType?d.parse(e,null,s.modelTimeFormat):new Date(e),t=new Date(i(moment(t).utc()).format("YYYY-MM-DD hh:mm:ss A")),a.$dateValue=t,a.$dateValue}),a.$render=function(){t.val(!a.$dateValue||isNaN(a.$dateValue.getTime())?"":i(moment(a.$dateValue).format("hh:mm A"),s.timeFormat))},e.$on("$destroy",function(){c.destroy(),s=null,c=null})}}}]),angular.module("mgcrea.ngStrap.popover",["mgcrea.ngStrap.tooltip"]).provider("$popover",function(){var e=this.defaults={animation:"am-fade",customClass:"",container:!1,target:!1,placement:"right",template:"popover.tpl.html",contentTemplate:!1,trigger:"click",keyboard:!0,html:!1,title:"",content:"",delay:0,autoClose:!1};this.$get=["$tooltip",function(t){function n(n,a){var i=angular.extend({},e,a),o=t(n,i);return i.content&&(o.$scope.content=i.content),o}return n}]}).directive("bsPopover",["$window","$sce","$popover",function(e,t,n){var a=e.requestAnimationFrame||e.setTimeout;return{restrict:"EAC",scope:!0,link:function(e,i,o){var r={scope:e};angular.forEach(["template","contentTemplate","placement","container","target","delay","trigger","keyboard","html","animation","customClass","autoClose","id"],function(e){angular.isDefined(o[e])&&(r[e]=o[e])}),angular.forEach(["title","content"],function(n){o[n]&&o.$observe(n,function(i,o){e[n]=t.trustAsHtml(i),angular.isDefined(o)&&a(function(){s&&s.$applyPlacement()})})}),o.bsPopover&&e.$watch(o.bsPopover,function(t,n){angular.isObject(t)?angular.extend(e,t):e.content=t,angular.isDefined(n)&&a(function(){s&&s.$applyPlacement()})},!0),o.bsShow&&e.$watch(o.bsShow,function(e,t){s&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|,?(popover),?/i)),e===!0?s.show():s.hide())});var s=n(i,r);e.$on("$destroy",function(){s&&s.destroy(),r=null,s=null})}}}]),angular.module("mgcrea.ngStrap.tooltip",["mgcrea.ngStrap.helpers.dimensions"]).provider("$tooltip",function(){var e=this.defaults={animation:"am-fade",customClass:"",prefixClass:"tooltip",prefixEvent:"tooltip",container:!1,target:!1,placement:"top",template:"tooltip.tpl.html",contentTemplate:!1,trigger:"hover focus",keyboard:!1,html:!1,show:!1,title:"",type:"",delay:0};this.$get=["$window","$rootScope","$compile","$q","$templateCache","$http","$animate","dimensions","$$rAF",function(n,a,i,o,r,s,l,u,c){function d(t,n){function o(){return"body"===h.container?u.offset(h.target[0]||t[0]):u.position(h.target[0]||t[0])}function r(e,t,n,a){var i,o=e.split("-");switch(o[0]){case"right":i={top:t.top+t.height/2-a/2,left:t.left+t.width};break;case"bottom":i={top:t.top+t.height,left:t.left+t.width/2-n/2};break;case"left":i={top:t.top+t.height/2-a/2,left:t.left-n};break;default:i={top:t.top-a,left:t.left+t.width/2-n/2}}if(!o[1])return i;if("top"===o[0]||"bottom"===o[0])switch(o[1]){case"left":i.left=t.left;break;case"right":i.left=t.left+t.width-n}else if("left"===o[0]||"right"===o[0])switch(o[1]){case"top":i.top=t.top-a;break;case"bottom":i.top=t.top+t.height}return i}var s={},d=t[0].nodeName.toLowerCase(),h=s.$options=angular.extend({},e,n);s.$promise=g(h.template);var v=s.$scope=h.scope&&h.scope.$new()||a.$new();h.delay&&angular.isString(h.delay)&&(h.delay=parseFloat(h.delay)),h.title&&(s.$scope.title=h.title),v.$hide=function(){v.$$postDigest(function(){s.hide()})},v.$show=function(){setTimeout(function(){s.show();
//},0)},v.$toggle=function(){v.$$postDigest(function(){s.toggle()})},s.$isShown=v.$isShown=!1;var w,b;h.contentTemplate&&(s.$promise=s.$promise.then(function(e){var t=angular.element(e);return g(h.contentTemplate).then(function(e){var n=p('[ng-bind="content"]',t[0]);return n.length||(n=p('[ng-bind="title"]',t[0])),n.removeAttr("ng-bind").html(e),t[0].outerHTML})}));var y,D,x,M;return s.$promise.then(function(e){angular.isObject(e)&&(e=e.data),h.html&&(e=e.replace(f,'ng-bind-html="')),e=m.apply(e),x=e,y=i(e),s.init()}),s.init=function(){h.delay&&angular.isNumber(h.delay)&&(h.delay={show:h.delay,hide:h.delay}),"self"===h.container?M=t:angular.isElement(h.container)?M=h.container:h.container&&(M=p(h.container));var e=h.trigger.split(" ");angular.forEach(e,function(e){"click"===e?t.on("click",s.toggle):"manual"!==e&&(t.on("hover"===e?"mouseenter":"focus",s.enter),t.on("hover"===e?"mouseleave":"blur",s.leave),"button"===d&&"hover"!==e&&t.on($?"touchstart":"mousedown",s.$onFocusElementMouseDown))}),h.target&&(h.target=angular.isElement(h.target)?h.target:p(h.target)[0]),h.show&&v.$$postDigest(function(){"focus"===h.trigger?t[0].focus():s.show()})},s.destroy=function(){for(var e=h.trigger.split(" "),n=e.length;n--;){var a=e[n];"click"===a?t.off("click",s.toggle):"manual"!==a&&(t.off("hover"===a?"mouseenter":"focus",s.enter),t.off("hover"===a?"mouseleave":"blur",s.leave),"button"===d&&"hover"!==a&&t.off($?"touchstart":"mousedown",s.$onFocusElementMouseDown))}D&&(D.remove(),D=null),clearTimeout(w),v.$destroy()},s.enter=function(){return clearTimeout(w),b="in",h.delay&&h.delay.show?void(w=setTimeout(function(){"in"===b&&s.show()},h.delay.show)):s.show()},s.show=function(){v.$emit(h.prefixEvent+".show.before",s);var e=h.container?M:null,n=h.container?null:t;D&&D.remove(),D=s.$element=y(v,function(e,t){}),D.css({top:"-9999px",left:"-9999px",display:"block",visibility:"hidden"}).addClass(h.placement),h.animation&&D.addClass(h.animation),h.type&&D.addClass(h.prefixClass+"-"+h.type),h.customClass&&D.addClass(h.customClass),l.enter(D,e,n,function(){v.$emit(h.prefixEvent+".show",s)}),s.$isShown=v.$isShown=!0,v.$$phase||v.$root&&v.$root.$$phase||v.$digest(),c(function(){s.$applyPlacement(),D.css({visibility:"visible"})}),h.keyboard&&("focus"!==h.trigger?(s.focus(),D.on("keyup",s.$onKeyUp)):t.on("keyup",s.$onFocusKeyUp))},s.leave=function(){return clearTimeout(w),b="out",h.delay&&h.delay.hide?void(w=setTimeout(function(){"out"===b&&s.hide()},h.delay.hide)):s.hide()},s.hide=function(e){s.$isShown&&(v.$emit(h.prefixEvent+".hide.before",s),l.leave(D,function(){return v.$emit(h.prefixEvent+".hide",s),e&&"focus"===h.trigger?t[0].blur():void 0}),s.$isShown=v.$isShown=!1,v.$$phase||v.$root&&v.$root.$$phase||v.$digest(),h.keyboard&&null!==D&&D.off("keyup",s.$onKeyUp))},s.toggle=function(){s.$isShown?s.leave():s.enter()},s.focus=function(){D[0].focus()},s.$applyPlacement=function(){if(D){var e=o(),t=D.prop("offsetWidth"),n=D.prop("offsetHeight"),a=r(h.placement,e,t,n);a.top+="px",a.left+="px",h.width&&(a.width=h.width+"px"),D.css(a)}},s.$onKeyUp=function(e){27===e.which&&s.hide()},s.$onFocusKeyUp=function(e){27===e.which&&t[0].blur()},s.$onFocusElementMouseDown=function(e){e.preventDefault(),e.stopPropagation(),s.$isShown?t[0].blur():t[0].focus()},s}function p(e,n){return angular.element((n||t).querySelectorAll(e))}function g(e){return o.when(r.get(e)||s.get(e)).then(function(t){return angular.isObject(t)?(r.put(e,t.data),t.data):t})}var m=String.prototype.trim,$="createTouch"in n.document,f=/ng-bind="/gi;return d}]}).directive("bsTooltip",["$window","$location","$sce","$tooltip","$$rAF",function(e,t,n,a,i){return{restrict:"EAC",scope:!0,link:function(e,t,o,r){var s={scope:e};angular.forEach(["template","contentTemplate","placement","container","target","delay","trigger","keyboard","html","animation","type","customClass"],function(e){angular.isDefined(o[e])&&(s[e]=o[e])}),angular.forEach(["title"],function(t){o.$observe(t,function(a,o){e[t]=n.trustAsHtml(a),angular.isDefined(o)&&i(function(){l&&l.$applyPlacement()})})}),o.bsTooltip&&e.$watch(o.bsTooltip,function(t,n){angular.isObject(t)?angular.extend(e,t):e.title=t,angular.isDefined(n)&&i(function(){l&&l.$applyPlacement()})},!0),o.bsShow&&e.$watch(o.bsShow,function(e,t){l&&angular.isDefined(e)&&(angular.isString(e)&&(e=e.match(",?(tooltip),?")),e===!0?l.show():l.hide())});var l=a(t,s);e.$on("$destroy",function(){l&&l.destroy(),s=null,l=null})}}}]),angular.module("mgcrea.ngStrap.typeahead",["mgcrea.ngStrap.tooltip","mgcrea.ngStrap.helpers.parseOptions"]).provider("$typeahead",function(){var e=this.defaults={animation:"am-fade",prefixClass:"typeahead",prefixEvent:"$typeahead",placement:"bottom-left",template:"typeahead.tpl.html",trigger:"focus",container:!1,keyboard:!0,html:!1,delay:0,minLength:1,filter:"filter",limit:6};this.$get=["$window","$rootScope","$tooltip",function(t,n,a){function i(t,n,i){var o={},r=angular.extend({},e,i);o=a(t,r);var s=i.scope,l=o.$scope;l.$resetMatches=function(){l.$matches=[],l.$activeIndex=0},l.$resetMatches(),l.$activate=function(e){l.$$postDigest(function(){o.activate(e)})},l.$select=function(e,t){l.$$postDigest(function(){o.select(e)})},l.$isVisible=function(){return o.$isVisible()},o.update=function(e){l.$matches=e,l.$activeIndex>=e.length&&(l.$activeIndex=0)},o.activate=function(e){l.$activeIndex=e},o.select=function(e){var t=l.$matches[e].value;n.$setViewValue(t),n.$render(),l.$resetMatches(),s&&s.$digest(),l.$emit(r.prefixEvent+".select",t,e)},o.$isVisible=function(){return r.minLength&&n?l.$matches.length&&angular.isString(n.$viewValue)&&n.$viewValue.length>=r.minLength:!!l.$matches.length},o.$getIndex=function(e){var t=l.$matches.length,n=t;if(t){for(n=t;n--&&l.$matches[n].value!==e;);if(!(0>n))return n}},o.$onMouseDown=function(e){e.preventDefault(),e.stopPropagation()},o.$onKeyDown=function(e){/(38|40|13)/.test(e.keyCode)&&(o.$isVisible()&&(e.preventDefault(),e.stopPropagation()),13===e.keyCode&&l.$matches.length?o.select(l.$activeIndex):38===e.keyCode&&l.$activeIndex>0?l.$activeIndex--:40===e.keyCode&&l.$activeIndex<l.$matches.length-1?l.$activeIndex++:angular.isUndefined(l.$activeIndex)&&(l.$activeIndex=0),l.$digest())};var u=o.show;o.show=function(){u(),setTimeout(function(){o.$element.on("mousedown",o.$onMouseDown),r.keyboard&&t.on("keydown",o.$onKeyDown)})};var c=o.hide;return o.hide=function(){o.$element.off("mousedown",o.$onMouseDown),r.keyboard&&t.off("keydown",o.$onKeyDown),c()},o}angular.element(t.document.body);return i.defaults=e,i}]}).directive("bsTypeahead",["$window","$parse","$q","$typeahead","$parseOptions",function(e,t,n,a,i){var o=a.defaults;return{restrict:"EAC",require:"ngModel",link:function(e,t,n,r){var s={scope:e};angular.forEach(["placement","container","delay","trigger","keyboard","html","animation","template","filter","limit","minLength","watchOptions","selectMode"],function(e){angular.isDefined(n[e])&&(s[e]=n[e])});var l=s.filter||o.filter,u=s.limit||o.limit,c=n.ngOptions;l&&(c+=" | "+l+":$viewValue"),u&&(c+=" | limitTo:"+u);var d=i(c),p=a(t,r,s);if(s.watchOptions){var g=d.$match[7].replace(/\|.+/,"").replace(/\(.*\)/g,"").trim();e.$watch(g,function(t,n){d.valuesFn(e,r).then(function(e){p.update(e),r.$render()})},!0)}e.$watch(n.ngModel,function(t,n){e.$modelValue=t,d.valuesFn(e,r).then(function(e){if(s.selectMode&&!e.length&&t.length>0)return void r.$setViewValue(r.$viewValue.substring(0,r.$viewValue.length-1));e.length>u&&(e=e.slice(0,u));var n=p.$isVisible();n&&p.update(e),(1!==e.length||e[0].value!==t)&&(!n&&p.update(e),r.$render())})}),r.$render=function(){if(r.$isEmpty(r.$viewValue))return t.val("");var e=p.$getIndex(r.$modelValue),n=angular.isDefined(e)?p.$scope.$matches[e].label:r.$viewValue;n=angular.isObject(n)?n.label:n,t.val(n.replace(/<(?:.|\n)*?>/gm,"").trim())},e.$on("$destroy",function(){p.destroy(),s=null,p=null})}}}]),angular.module("mgcrea.ngStrap.helpers.parseOptions",[]).provider("$parseOptions",function(){var e=this.defaults={regexp:/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/};this.$get=["$parse","$q",function(t,n){function a(a,i){function o(e,t){return e.map(function(e,n){var a,i,o={};return o[c]=e,a=u(t,o),i=g(t,o)||n,{label:a,value:i}})}var r={},s=angular.extend({},e,i);r.$values=[];var l,u,c,d,p,g,m;return r.init=function(){r.$match=l=a.match(s.regexp),u=t(l[2]||l[1]),c=l[4]||l[6],d=l[5],p=t(l[3]||""),g=t(l[2]?l[1]:c),m=t(l[7])},r.valuesFn=function(e,t){return n.when(m(e,t)).then(function(t){return r.$values=t?o(t,e):{},r.$values})},r.init(),r}return a}]}),angular.module("mgcrea.ngStrap").run(["$templateCache",function(e){e.put("datepicker.tpl.html",'<div class="dropdown-menu datepicker" ng-class="\'datepicker-mode-\' + $mode" style="max-width: 320px;"><table style="table-layout: fixed; height: 100%; width: 100%;"><thead><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$selectPane(-1)"><i class="{{$iconLeft}}"></i></button></th><th colspan="{{ rows[0].length - 2 }}"><button tabindex="-1" type="button" class="btn btn-default btn-block text-strong"  ng-click="$toggleMode()"><strong style="text-transform: capitalize;" ng-bind="title"></strong></button></th><th><button tabindex="-1" type="button" class="btn btn-default pull-right" ng-click="$selectPane(+1)"><i class="{{$iconRight}}"></i></button></th></tr><tr ng-show="showLabels" ng-bind-html="labels"></tr></thead><tbody><tr ng-repeat="(i, row) in rows" height="{{ 100 / rows.length }}%"><td class="text-center" ng-repeat="(j, el) in row"><button tabindex="-1" type="button" class="btn btn-default" style="width: 100%" ng-class="{\'btn-primary\': el.selected}" ng-click="$select(el.date)" ng-disabled="el.disabled"><span ng-class="{\'text-muted\': el.muted}" ng-bind="el.label"></span></button></td></tr></tbody></table></div>'),e.put("popover.tpl.html",'<div class="popover"><div class="arrow"></div><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div>'),e.put("select/select.tpl.html",'<ul vs-repeat="30" tabindex="-1" style="position:absolute;min-height:20px;max-height:250px;overflow-y:scroll;" class="select dropdown-menu" role="select"><li ng-repeat="match in $matches track by $index"><a role="menuitem" tabindex="-1" ng-click="$select(match, $event)"><span>{{match.label}}</span></a></li></ul>'),e.put("tab.tpl.html",'<ul class="nav" ng-class="$navClass" role="tablist"><li ng-repeat="$pane in $panes" ng-show="$pane.show" ng-class="$index == $panes.$active ? $activeClass : \'\'"><a role="tab" data-toggle="tab" ng-click="$setActive($index)" data-index="{{ $index }}" ng-bind-html="$pane.title"></a></li></ul><div ng-transclude class="tab-content"></div>'),e.put("timepicker.tpl.html",'<div class="dropdown-menu timepicker" style="min-width: 0px;width: auto;"><table height="100%"><thead><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 0)"><i class="{{ $iconUp }}"></i></button></th><th>&nbsp;</th><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 1)"><i class="{{ $iconUp }}"></i></button></th></tr></thead><tbody><tr ng-repeat="(i, row) in rows"><td class="text-center"><button tabindex="-1" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[0].selected}" ng-click="$select(row[0].date, 0)" ng-disabled="row[0].disabled"><span ng-class="{\'text-muted\': row[0].muted}" ng-bind="row[0].label"></span></button></td><td><span ng-bind="i == midIndex ? timeSeparator : \' \'"></span></td><td class="text-center"><button tabindex="-1" ng-if="row[1].date" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[1].selected}" ng-click="$select(row[1].date, 1)" ng-disabled="row[1].disabled"><span ng-class="{\'text-muted\': row[1].muted}" ng-bind="row[1].label"></span></button></td><td ng-if="showAM">&nbsp;</td><td ng-if="showAM"><button tabindex="-1" ng-show="i == midIndex - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !!isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">AM</button><button tabindex="-1" ng-show="i == midIndex + 1 - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">PM</button></td></tr></tbody><tfoot><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 0)"><i class="{{ $iconDown }}"></i></button></th><th>&nbsp;</th><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 1)"><i class="{{ $iconDown }}"></i></button></th></tr></tfoot></table></div>'),e.put("tooltip.tpl.html",'<div class="tooltip in" ng-show="title"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="title"></div></div>'),e.put("typeahead.tpl.html",'<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select"><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}"><a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a></li></ul>')}])}(window,document);