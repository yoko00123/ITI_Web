(function (window, document, undefined) {
    'use strict';

    angular.module('ng.calendar', []);

    angular.module("ng.calendar")
		.run(["$templateCache", function ($templateCache) {
		    $templateCache.put("templates/day.html",
				"<div class=\"cal-day-box\">" +
					"<div class=\"row-fluid clearfix cal-row-head\">" +
						"<div class=\"span1 col-xs-1 cal-cell\">Time</div>" +
						"<div class=\"span11 col-xs-11 cal-cell\">Events</div>" +
					"</div>" +
					"<div class=\"cal-day-panel\" style=\"height: 960px;\">" +
						"<div class=\"cal-day-panel-hour\">" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>06:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>06:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>07:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>07:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>08:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>08:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>09:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>09:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>10:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>10:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>11:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>11:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>12:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>12:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>13:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>13:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>14:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>14:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>15:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>15:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>16:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>16:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>17:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>17:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>18:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>18:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>19:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>19:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>20:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>20:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
							"<div class=\"cal-day-hour\">" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>21:00</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
								"<div class=\"row-fluid cal-day-hour-part\">" +
									"<div class=\"span1 col-xs-1\"><b>21:30</b></div>" +
									"<div class=\"span11 col-xs-11\"></div>" +
								"</div>" +
							"</div>" +
						"</div>" +
						"<div class=\"pull-left day-event day-highlight dh-event-{{ event.type }}\" ng-repeat=\"event in view track by $index\" ng-style=\"{top: event.top + \'px\', left: event.left + 60 + \'px\', height: event.height + \'px\'}\">" +
							"<ng-calendar-day-cell calendar-event=\"event\" calendar-cell-template=\"cellTemplate\"></ng-calendar-day-cell>" +
						"</div>" +
					"</div>" +
				"</div>");
		    $templateCache.put("templates/main.html",
				// "<div class=\"col-md-8 col-md-offset-2\">" +
					// "<h2 class=\"text-center\">{{ control.getTitle() }}</h2>" +
					// "<div class=\"row\">" +
						// "<div class=\"col-md-6 text-center\">" +
							// "<div class=\"btn-group\">" +
								// "<button class=\"btn btn-primary\" ng-click=\"control.prev()\">Previous</button>" +
								// "<button class=\"btn btn-default\" ng-click=\"setCalendarToToday()\">Today</button>" +
								// "<button class=\"btn btn-primary\" ng-click=\"control.next()\">Next</button>" + 
							// "</div>" +
						// "</div>" +
						// "<br class=\"visible-xs visible-sm\">" +
						// "<div class=\"col-md-6 text-center\" ng-show=\"showChangeView\" >" +
							// "<div class=\"btn-group\">" +
								// "<label class=\"btn btn-primary\" ng-model=\"view\" btn-radio=\"'year'\">Year</label>" +
								// "<label class=\"btn btn-primary\" ng-model=\"view\" btn-radio=\"'month'\">Month</label>" +
								// "<label class=\"btn btn-primary\" ng-model=\"view\" btn-radio=\"'week'\">Week</label>" +
								// "<label class=\"btn btn-primary\" ng-model=\"view\" btn-radio=\"'day'\">Day</label>" +
							// "</div>" +
						// "</div>" +
					// "</div>" +
					// "<br>" +
					"<div class=\"cal-context\" style=\"width: 100%;\">" +
						"<ng-calendar-year calendar-events=\"events\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-edit-event-click=\"eventEditClick\" calendar-delete-event-click=\"eventDeleteClick\" calendar-edit-event-html=\"editEventHtml\" calendar-delete-event-html=\"deleteEventHtml\" calendar-auto-open=\"autoOpen\" ng-if=\"view == \'year\'\"></ng-calendar-year>" +
						"<ng-calendar-month calendar-events=\"events\" calendar-main-event=\"mainEvent\" calendar-cell-template=\"cellTemplate\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-edit-event-click=\"eventEditClick\" calendar-delete-event-click=\"eventDeleteClick\" calendar-edit-event-html=\"editEventHtml\" calendar-delete-event-html=\"deleteEventHtml\" calendar-auto-open=\"autoOpen\" calendar-use-iso-week=\"useIsoWeek\" ng-if=\"view == \'month\'\"></ng-calendar-month>" +
						"<ng-calendar-week calendar-events=\"events\" calendar-cell-template=\"cellTemplate\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" calendar-use-iso-week=\"useIsoWeek\" ng-if=\"view == \'week\'\"></ng-calendar-week>" +
						"<ng-calendar-day calendar-events=\"events\" calendar-cell-template=\"cellTemplate\" calendar-current-day=\"currentDay\" calendar-event-click=\"eventClick\" ng-if=\"view == \'day\'\"></ng-calendar-day>" +
					"</div>"
				//"</div>"
				);
		    $templateCache.put("templates/month.html",
				"<div class=\"cal-row-fluid cal-row-head\">" +
					"<div class=\"cal-cell1\" ng-repeat=\"day in weekDays track by $index\">{{ day }}</div>" +
				"</div>" +
				"<div class=\"cal-month-box\">" +
					"<div ng-repeat=\"week in view track by $index\">" +
						"<div class=\"cal-row-fluid cal-before-eventlist\">" +
							"<div class=\"cal-cell1 cal-cell {{ day.highlightClass }}\" ng-repeat=\"day in week\"  ng-class=\"{pointer: day.events.length > 0}\">" + //ng-click=\"dayClicked($parent.$index, $index)\"
								"<div class=\"cal-month-day\" ng-class=\"getClassName(day.label, day.isToday, day.inMonth)\">" +
                                //ng-click=\"drillDown(day.label)\"
									"<span data-cal-date=\"\">{{ day.label }}</span>" +
									"<div class=\"cal-day-cell\" m-scrollbar m-scrollbar-height=\"70\" >" +
										"<div ng-repeat=\"event in day.events track by $index\">" +
											"<ng-calendar-day-cell calendar-event=\"event\" calendar-cell-template=\"cellTemplate\"></ng-calendar-day-cell>" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>");
		    $templateCache.put("templates/week.html",
				"<div class=\"cal-week-box\">" +
					"<div class=\"cal-row-fluid cal-row-head\">" +
						"<div class=\"cal-cell1\" ng-repeat=\"column in view.columns track by $index\" ng-class=\"{\'cal-day-weekend\': $index > 4, \'cal-day-today\': column.isToday}\">" +
							"{{ column.weekDay }}" +
							"<br>" +
							"<small>" +
                            //ng-click=\"drillDown(column.day)\"
								"<span data-cal-date=\"\" class=\"pointer\">{{ column.date }}</span>" +
							"</small>" +
						"</div>" +
					"</div>" +
					"<hr>" +
					"<div class=\"cal-row-fluid\" ng-repeat=\"event in view.events track by $index\">" +
						"<div class=\"cal-cell{{ event.daySpan }} cal-offset{{ event.dayOffset }} day-highlight dh-event-{{ event.type }}\" data-event-class=\"\">" +
							"<ng-calendar-day-cell calendar-event=\"event\" calendar-cell-template=\"cellTemplate\"></ng-calendar-day-cell>" +

						"</div>" +
					"</div>" +
				"</div>");
		    $templateCache.put("templates/daycell.html",
				"<span>{{event.title | truncateEventTitle:12:10}}</span>"
				);
		    $templateCache.put("templates/year.html",
				"<div class=\"cal-year-box\">" +
					"<div ng-repeat=\"year in view track by $index\">" +
						"<div class=\"row cal-before-eventlist\">" +
							"<div class=\"span3 col-md-3 col-xs-6 cal-cell\" ng-repeat=\"month in year track by $index\" ng-click=\"monthClicked($parent.$index, $index)\" ng-class=\"{pointer: month.events.length > 0, \'cal-day-today\': month.isToday}\">" +
                            //ng-click=\"drillDown(month.monthIndex)\"
								"<span class=\"pull-right\" data-cal-date=\"\">{{ month.label }}</span> " +
								"<small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"month.events.length > 0\">{{ month.events.length }}</small>" +
								"<div class=\"cal-day-tick\" ng-show=\"month.isOpened\">" +
									"<i class=\"glyphicon glyphicon-chevron-up\"></i> " +
									"<i class=\"fa fa-chevron-up\"></i>" +
								"</div>" +
							"</div>" +
						"</div>" +
						"<div class=\"cal-slide-box\" collapse=\"!year.isOpened\">" +
							"<span class=\"cal-slide-tick\"></span>" +
							"<div class=\"cal-slide-content\">" +
								"<ul class=\"unstyled list-unstyled\">" +
									"<li ng-repeat=\"event in openEvents track by $index\">" +
										"<span class=\"pull-left event\" ng-class=\"\'event-\' + event.type\"></span> &nbsp; " +
										"<a href=\"javascript:;\" class=\"event-item\" ng-click=\"eventClick({$event: event})\">{{ event.title }}</a> " +
										"<a href=\"javascript:;\" class=\"event-item-edit\" ng-if=\"editEventHtml && event.editable !== false\" ng-bind-html=\"$sce.trustAsHtml(editEventHtml)\" ng-click=\"eventEditClick({$event: event})\"></a> " +
										"<a href=\"javascript:;\" class=\"event-item-delete\" ng-if=\"deleteEventHtml && event.deletable !== false\" ng-bind-html=\"$sce.trustAsHtml(deleteEventHtml)\" ng-click=\"eventDeleteClick({$event: event})\"></a>" +
									"</li>" +
								"</ul>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>");
		}]);

    angular.module('ng.calendar')
	  .constant('moment', window.moment);


    angular.module('ng.calendar')
	  .service('calendarHelper', ["$filter", "moment", function calendarHelper($filter, moment) {

	      var self = this;

	      function isISOWeekBasedOnLocale() {
	          return moment().startOf('week').day() === 1;
	      }

	      function isISOWeek(userValue) {
	          //If a manual override has been set in the directive, use that
	          if (angular.isDefined(userValue)) return userValue;
	          //Otherwise fallback to the locale
	          return isISOWeekBasedOnLocale();
	      }

	      this.getMonthNames = function (short) {

	          var format = short ? 'MMM' : 'MMMM';

	          var months = [];
	          for (var i = 0; i <= 11; i++) {
	              months.push($filter('date')(new Date(2014, i), format));
	          }

	          return months;

	      };

	      this.getWeekDayNames = function (short, useISOWeek) {

	          var format = short ? 'EEE' : 'EEEE';

	          var weekdays = [];
	          var startDay = isISOWeek(useISOWeek) ? 22 : 21;
	          for (var i = 0; i <= 6; i++) {
	              weekdays.push($filter('date')(new Date(2014, 8, startDay + i), format));
	              //console.log(startDay)
	          }
	          //console.log(moment(new Date(2015, 9)).format('MMMM'),moment().startOf('isoweek').format('dddd'),moment().endOf('week'));
	          return weekdays;

	      };

	      this.eventIsInPeriod = function (eventStart, eventEnd, periodStart, periodEnd) {

	          return (
                  moment(eventStart).isAfter(moment(periodStart)) &&
                  moment(eventStart).isBefore(moment(periodEnd))
                ) || (
                  moment(eventEnd).isAfter(moment(periodStart)) &&
                  moment(eventEnd).isBefore(moment(periodEnd))
                ) || (
                  moment(eventStart).isBefore(moment(periodStart)) &&
                  moment(eventEnd).isAfter(moment(periodEnd))
                ) || (
                  moment(eventStart).isSame(moment(periodStart))
                ) || (
                  moment(eventEnd).isSame(moment(periodEnd))
              );

	      };

	      this.getYearView = function (events, currentDay) {

	          var grid = [];
	          var months = self.getMonthNames();

	          for (var i = 0; i < 3; i++) {
	              var row = [];
	              for (var j = 0; j < 4; j++) {
	                  var monthIndex = 12 - months.length;
	                  var startPeriod = new Date(moment(currentDay).format('YYYY'), monthIndex, 1);
	                  var endPeriod = moment(startPeriod).add(1, 'month').subtract(1, 'second').toDate();

	                  row.push({
	                      label: months.shift(),
	                      monthIndex: monthIndex,
	                      isToday: moment(startPeriod).startOf('month').isSame(moment().startOf('month')),
	                      events: events.filter(function (event) {
	                          return self.eventIsInPeriod(event.starts_at, event.ends_at, startPeriod, endPeriod);
	                      })
	                  });
	              }
	              grid.push(row);
	          }

	          return grid;

	      };

	      this.getMonthView = function (events, currentDay, useISOWeek) {

	          var dateOffset = isISOWeek(useISOWeek) ? 1 : 0;

	          function getWeekDayIndex() {
	              var day = startOfMonth.day() - dateOffset;
	              if (day < 0) day = 6;
	              return day;
	          }

	          var startOfMonth = moment(currentDay).startOf('month');
	          var numberOfDaysInMonth = moment(currentDay).endOf('month').date();

	          var grid = [];
	          var buildRow = new Array(7);
	          var eventsWithIds = events.map(function (event, index) {
	              event.$id = index;
	              return event;
	          });

	          for (var i = 1; i <= numberOfDaysInMonth; i++) {

	              if (i == 1) {
	                  var weekdayIndex = getWeekDayIndex(startOfMonth);
	                  var prefillMonth = startOfMonth.clone();
	                  while (weekdayIndex > 0) {
	                      weekdayIndex--;
	                      prefillMonth = prefillMonth.subtract(1, 'day');
	                      buildRow[weekdayIndex] = {
	                          label: prefillMonth.date(),
	                          date: prefillMonth.clone(),
	                          inMonth: false,
	                          events: []
	                      };
	                  }
	              }

	              buildRow[getWeekDayIndex(startOfMonth)] = {
	                  label: startOfMonth.date(),
	                  inMonth: true,
	                  isToday: moment().startOf('day').isSame(startOfMonth),
	                  date: startOfMonth.clone(),
	                  events: eventsWithIds.filter(function (event) {
	                      return self.eventIsInPeriod(event.starts_at, event.ends_at, startOfMonth.clone().startOf('day'), startOfMonth.clone().endOf('day'));
	                  })
	              };

	              if (i == numberOfDaysInMonth) {
	                  var weekdayIndex = getWeekDayIndex(startOfMonth);
	                  var postfillMonth = startOfMonth.clone();
	                  while (weekdayIndex < 6) {
	                      weekdayIndex++;
	                      postfillMonth = postfillMonth.add(1, 'day');
	                      buildRow[weekdayIndex] = {
	                          label: postfillMonth.date(),
	                          date: postfillMonth.clone(),
	                          inMonth: false,
	                          events: []
	                      };
	                  }
	              }

	              if (getWeekDayIndex(startOfMonth) === 6 || i == numberOfDaysInMonth) {
	                  grid.push(buildRow);
	                  buildRow = new Array(7);
	              }

	              startOfMonth = startOfMonth.add(1, 'day');

	          }

	          return grid;

	      };

	      this.getWeekView = function (events, currentDay, useISOWeek) {

	          var dateOffset = isISOWeek(useISOWeek) ? 1 : 0;
	          var columns = new Array(7);
	          var weekDays = self.getWeekDayNames(false, useISOWeek);
	          var currentWeekDayIndex = currentDay.getDay();
	          var beginningOfWeek, endOfWeek;

	          for (var i = currentWeekDayIndex; i >= 0; i--) {
	              var date = moment(currentDay).subtract(currentWeekDayIndex - i, 'days').add(dateOffset, 'day').toDate();
	              columns[i] = {
	                  weekDay: weekDays[i],
	                  day: $filter('date')(date, 'd'),
	                  date: $filter('date')(date, 'd MMM'),
	                  isToday: moment(date).startOf('day').isSame(moment().startOf('day'))
	              };
	              if (i == 0) {
	                  beginningOfWeek = date;
	              } else if (i == 6) {
	                  endOfWeek = date;
	              }
	          }

	          for (var i = currentWeekDayIndex + 1; i < 7; i++) {
	              var date = moment(currentDay).add(i - currentWeekDayIndex, 'days').add(dateOffset, 'day').toDate();
	              columns[i] = {
	                  weekDay: weekDays[i],
	                  day: $filter('date')(date, 'd'),
	                  date: $filter('date')(date, 'd MMM'),
	                  isToday: moment(date).startOf('day').isSame(moment().startOf('day'))
	              };
	              if (i == 0) {
	                  beginningOfWeek = date;
	              } else if (i == 6) {
	                  endOfWeek = date;
	              }
	          }

	          endOfWeek = moment(endOfWeek).endOf('day').toDate();
	          beginningOfWeek = moment(beginningOfWeek).startOf('day').toDate();

	          var eventsSorted = events.filter(function (event) {
	              return self.eventIsInPeriod(event.starts_at, event.ends_at, beginningOfWeek, endOfWeek);
	          }).map(function (event) {
	              var span = moment(event.ends_at).startOf('day').diff(moment(event.starts_at).startOf('day'), 'days') + 1;
	              if (span >= 7) {
	                  span = 7;
	                  if (moment(event.ends_at).startOf('day').diff(moment(endOfWeek).startOf('day'), 'days') < 0) {
	                      span += moment(event.ends_at).startOf('day').diff(moment(endOfWeek).startOf('day'), 'days') + dateOffset;
	                  }
	              }

	              var offset = moment(event.starts_at).startOf('day').diff(moment(beginningOfWeek).startOf('day'), 'days');
	              if (offset < 0) offset = 0;
	              if (offset > 6) offset = 6;

	              if (span - offset > 0) {
	                  span -= offset;
	              }

	              event.daySpan = span;
	              event.dayOffset = offset;
	              return event;
	          });

	          return { columns: columns, events: eventsSorted };

	      };

	      this.getDayView = function (events, currentDay) {

	          var calendarStart = moment(currentDay).startOf('day').add(6, 'hours');
	          var calendarEnd = moment(currentDay).startOf('day').add(22, 'hours');
	          var calendarHeight = 16 * 60;
	          var buckets = [];

	          return events.filter(function (event) {
	              return self.eventIsInPeriod(event.starts_at, event.ends_at, moment(currentDay).startOf('day').toDate(), moment(currentDay).endOf('day').toDate());
	          }).map(function (event) {
	              if (moment(event.starts_at).isBefore(calendarStart)) {
	                  event.top = 0;
	              } else {
	                  event.top = moment(event.starts_at).startOf('minute').diff(calendarStart.startOf('minute'), 'minutes') - 2;
	              }

	              if (moment(event.ends_at).isAfter(calendarEnd)) {
	                  event.height = calendarHeight - event.top;
	              } else {
	                  var diffStart = event.starts_at;
	                  if (moment(event.starts_at).isBefore(calendarStart)) {
	                      diffStart = calendarStart.toDate();
	                  }
	                  event.height = moment(event.ends_at).diff(diffStart, 'minutes');
	              }

	              if (event.top - event.height > calendarHeight) {
	                  event.height = 0;
	              }

	              event.left = 0;

	              return event;
	          }).filter(function (event) {
	              return event.height > 0;
	          }).map(function (event) {

	              var cannotFitInABucket = true;
	              buckets.forEach(function (bucket, bucketIndex) {
	                  var canFitInThisBucket = true;

	                  bucket.forEach(function (bucketItem) {
	                      if (self.eventIsInPeriod(event.starts_at, event.ends_at, bucketItem.starts_at, bucketItem.ends_at) || self.eventIsInPeriod(bucketItem.starts_at, bucketItem.ends_at, event.starts_at, event.ends_at)) {
	                          canFitInThisBucket = false;
	                      }
	                  });

	                  if (canFitInThisBucket && cannotFitInABucket) {
	                      cannotFitInABucket = false;
	                      event.left = bucketIndex * 150;
	                      buckets[bucketIndex].push(event);
	                  }

	              });

	              if (cannotFitInABucket) {
	                  event.left = buckets.length * 150;
	                  buckets.push([event]);
	              }

	              return event;

	          });

	      };

	      this.toggleEventBreakdown = function (view, rowIndex, cellIndex) {

	          var openEvents = [];

	          if (view[rowIndex][cellIndex].events.length > 0) {

	              var isCellOpened = view[rowIndex][cellIndex].isOpened;

	              view = view.map(function (row) {
	                  row.isOpened = false;
	                  return row.map(function (cell) {
	                      cell.isOpened = false;
	                      return cell;
	                  });
	              });

	              view[rowIndex][cellIndex].isOpened = !isCellOpened;
	              view[rowIndex].isOpened = !isCellOpened;
	              openEvents = view[rowIndex][cellIndex].events;
	          }

	          return { view: view, openEvents: openEvents };

	      };

	  }]);


    angular.module('ng.calendar')
	  .filter('truncateEventTitle', function () {

	      return function (string, length, boxHeight) {
	          if (!string) return '';
	          //Only truncate if if actually needs truncating
	          if (string.length >= length && string.length / 20 > boxHeight / 30) {
	              return string.substr(0, length) + '...';
	          } else {
	              return string;
	          }
	      };

	  });



    angular.module('ng.calendar')
	  .directive('ngCalendarYear', ["$sce", "$timeout", "calendarHelper", "moment", function ($sce, $timeout, calendarHelper, moment) {
	      return {
	          templateUrl: 'templates/year.html',
	          priority: 1,
	          restrict: 'EA',
	          require: '^ngCalendar',
	          scope: {
	              events: '=calendarEvents',
	              currentDay: '=calendarCurrentDay',
	              eventClick: '=calendarEventClick',
	              eventEditClick: '=calendarEditEventClick',
	              eventDeleteClick: '=calendarDeleteEventClick',
	              editEventHtml: '=calendarEditEventHtml',
	              deleteEventHtml: '=calendarDeleteEventHtml',
	              autoOpen: '=calendarAutoOpen'
	          },
	          link: function postLink(scope, element, attrs, calendarCtrl) {

	              var firstRun = false;

	              scope.$sce = $sce;

	              calendarCtrl.titleFunctions.year = function (currentDay) {
	                  return moment(currentDay).format('YYYY');
	              };

	              function updateView() {
	                  scope.view = calendarHelper.getYearView(scope.events, scope.currentDay);

	                  //Auto open the calendar to the current day if set
	                  if (scope.autoOpen && !firstRun) {
	                      scope.view.forEach(function (row, rowIndex) {
	                          row.forEach(function (year, cellIndex) {
	                              if (year.label == moment(scope.currentDay).format('MMMM')) {
	                                  scope.monthClicked(rowIndex, cellIndex);
	                                  $timeout(function () {
	                                      firstRun = false;
	                                  });
	                              }
	                          });
	                      });
	                  }
	              }

	              scope.$watch('currentDay', updateView);
	              scope.$watch('events', updateView, true);

	              scope.monthClicked = function (yearIndex, monthIndex) {

	                  var handler = calendarHelper.toggleEventBreakdown(scope.view, yearIndex, monthIndex);
	                  scope.view = handler.view;
	                  scope.openEvents = handler.openEvents;

	              };

	              scope.drillDown = function (month) {
	                  calendarCtrl.changeView('month', moment(scope.currentDay).clone().month(month).toDate());
	              };

	          }
	      };
	  }]);




    angular.module('ng.calendar')
	  .directive('ngCalendarWeek', ["moment", "calendarHelper", function (moment, calendarHelper) {
	      return {
	          templateUrl: 'templates/week.html',
	          restrict: 'EA',
	          require: '^ngCalendar',
	          scope: {
	              events: '=calendarEvents',
	              currentDay: '=calendarCurrentDay',
	              eventClick: '=calendarEventClick',
	              useIsoWeek: '=calendarUseIsoWeek',
	              cellTemplate: '=calendarCellTemplate',
	          },
	          link: function postLink(scope, element, attrs, calendarCtrl) {

	              calendarCtrl.titleFunctions.week = function (currentDay) {
	                  return 'Week ' + moment(currentDay).week() + ' of ' + moment(currentDay).format('YYYY');
	              };

	              function updateView() {
	                  scope.view = calendarHelper.getWeekView(scope.events, scope.currentDay, scope.useIsoWeek);
	              }

	              scope.drillDown = function (day) {
	                  calendarCtrl.changeView('day', moment(scope.currentDay).clone().date(day).toDate());
	              };

	              scope.$watch('currentDay', updateView);
	              scope.$watch('events', updateView, true);

	          }
	      };
	  }]);

    angular.module('ng.calendar')
	  .directive('ngCalendarMonth', ["$sce", "$timeout", "calendarHelper", function ($sce, $timeout, calendarHelper) {
	      return {
	          templateUrl: 'templates/month.html',
	          restrict: 'EA',
	          require: '^ngCalendar',
	          //priority : 990,
	          scope: {
	              events: '=calendarEvents',
	              currentDay: '=calendarCurrentDay',
	              eventClick: '=calendarEventClick',
	              eventEditClick: '=calendarEditEventClick',
	              eventDeleteClick: '=calendarDeleteEventClick',
	              editEventHtml: '=calendarEditEventHtml',
	              deleteEventHtml: '=calendarDeleteEventHtml',
	              autoOpen: '=calendarAutoOpen',
	              useIsoWeek: '=calendarUseIsoWeek',
	              cellTemplate: '=calendarCellTemplate',
	              mainEvent: '=calendarMainEvent'
	          },
	          link: function postLink(scope, element, attrs, calendarCtrl) {
	              var firstRun = false;

	              scope.$sce = $sce;

	              calendarCtrl.titleFunctions.month = function (currentDay) {
	                  return moment(currentDay).format('MMMM YYYY');
	              };

	              function updateView() {
	                  scope.view = calendarHelper.getMonthView(scope.events, scope.currentDay, scope.useIsoWeek);
	                  //Auto open the calendar to the current day if set
	                  if (scope.autoOpen && !firstRun) {
	                      scope.view.forEach(function (week, rowIndex) {
	                          week.forEach(function (day, cellIndex) {
	                              if (day.inMonth && moment(scope.currentDay).startOf('day').isSame(day.date.startOf('day'))) {
	                                  scope.dayClicked(rowIndex, cellIndex);
	                                  $timeout(function () {
	                                      firstRun = false;
	                                  });
	                              }
	                          });
	                      });
	                  }

	              }

	              function updateMainEvent(v) {
	                  scope.mainEvent = v;
	              }

	              scope.getClassName = function (day, istoday, dayinmonth) {
	                  var a = [];
	                  if (istoday && dayinmonth) {
	                      return "dh-event-CD";
	                  } else {
	                      a = scope.mainEvent.filter(function (x) { return x.Day == day });
	                      if (a.length > 0) {
	                          if (a[0].DayType === "LH" && dayinmonth) {
	                              return "dh-event-LH";
	                          } else if (a[0].DayType === "SH" && dayinmonth) {
	                              return "dh-event-SH";
	                          } else if (a[0].DayType === "RD" && dayinmonth) {
	                              return "dh-event-RD";
	                          }
	                      } else if (dayinmonth) {
	                          return "dh-event-RG";
	                      }
	                  }
	              }

	              scope.$watch('currentDay', updateView);
	              scope.$watch('events', updateView, true);
	              scope.$watch('mainEvent', updateMainEvent, true);

	              scope.weekDays = calendarHelper.getWeekDayNames(false, scope.useIsoWeek);

	              scope.dayClicked = function (rowIndex, cellIndex) {

	                  var handler = calendarHelper.toggleEventBreakdown(scope.view, rowIndex, cellIndex);
	                  scope.view = handler.view;
	                  scope.openEvents = handler.openEvents;

	              };

	              scope.drillDown = function (day) {
	                  calendarCtrl.changeView('day', moment(scope.currentDay).clone().date(day).toDate());
	              };

	              scope.highlightEvent = function (event, shouldAddClass) {

	                  scope.view = scope.view.map(function (week) {

	                      week.isOpened = false;

	                      return week.map(function (day) {

	                          delete day.highlightClass;
	                          day.isOpened = false;

	                          if (shouldAddClass) {
	                              var dayContainsEvent = day.events.filter(function (e) {
	                                  return e.$id == event.$id;
	                              }).length > 0;

	                              if (dayContainsEvent) {
	                                  day.highlightClass = 'day-highlight dh-event-' + event.type;
	                              }
	                          }

	                          return day;

	                      });

	                  });

	              };

	          }
	      };
	  }]);

    angular.module('ng.calendar')
	  .directive('ngCalendarDay', ["calendarHelper", function (calendarHelper) {
	      return {
	          templateUrl: 'templates/day.html',
	          restrict: 'EA',
	          require: '^ngCalendar',
	          scope: {
	              events: '=calendarEvents',
	              currentDay: '=calendarCurrentDay',
	              eventClick: '=calendarEventClick',
	              cellTemplate: '=calendarCellTemplate',
	          },
	          link: function postLink(scope, element, attrs, calendarCtrl) {

	              calendarCtrl.titleFunctions.day = function (currentDay) {
	                  return moment(currentDay).format('dddd DD MMMM, YYYY');
	              };

	              function updateView() {
	                  scope.view = calendarHelper.getDayView(scope.events, scope.currentDay);
	              }

	              scope.$watch('currentDay', updateView);
	              scope.$watch('events', updateView, true);

	          }
	      };
	  }]);

    angular.module('ng.calendar')
    .directive('ngCalendarDayCell', ['$compile', '$templateCache', '$http', '$q', function ($compile, $templateCache, $http, $q) {
        return {
            //templateUrl: 'templates/daycell.html',
            restrict: 'EA',
            //replace: true,
            priority: 1,
            scope: {
                cellTemplate: '=calendarCellTemplate',
                event: '=calendarEvent'
            },
            compile: function () {
                return {
                    pre: function (scope, element, attrs, calendarCtrl) {

                        function fetchTemplate(template) {
                            return $q.when($templateCache.get(template) || $http.get(template)).then(function (res) {

                                if (angular.isObject(res)) {
                                    $templateCache.put(template, res.data);
                                    return res.data;
                                }
                                return res;
                            });
                        }
                        var promise = fetchTemplate(scope.cellTemplate)
                        promise.then(function (results) {
                            element.replaceWith($compile(results)(scope));
                        });

                    }
                }
            }
        };
    }]);

    angular.module('ng.calendar')
	  .directive('ngCalendar', ["moment", "calendarHelper", function (moment, calendarHelper) {
	      return {
	          templateUrl: 'templates/main.html',
	          restrict: 'EA',
	          scope: {
	              events: '=calendarEvents',
	              view: '=calendarView',
	              currentDay: '=calendarCurrentDay',
	              control: '=calendarControl',
	              eventClick: '&calendarEventClick',
	              eventEditClick: '&calendarEditEventClick',
	              eventDeleteClick: '&calendarDeleteEventClick',
	              editEventHtml: '=calendarEditEventHtml',
	              deleteEventHtml: '=calendarDeleteEventHtml',
	              autoOpen: '=calendarAutoOpen',
	              useIsoWeek: '=calendarUseIsoWeek',
	              showChangeView: '=?calendarShowChangeView',
	              cellTemplate: '=?calendarCellTemplate',
	              mainEvent: '=calendarMainEvent'
	          },
	          controller: ["$scope", function ($scope) {
	              var self = this;

	              this.titleFunctions = {};
	              if ($scope.showChangeView == undefined) $scope.showChangeView = true;
	              this.changeView = function (view, newDay) {
	                  $scope.view = view;
	                  $scope.currentDay = newDay;
	              };

	              $scope.control = $scope.control || {};

	              $scope.control.prev = function () {
	                  $scope.currentDay = moment($scope.currentDay).subtract(1, $scope.view).toDate();

	              };

	              $scope.control.next = function () {
	                  $scope.currentDay = moment($scope.currentDay).add(1, $scope.view).toDate();
	              };

	              $scope.control.getTitle = function () {
	                  if (!self.titleFunctions[$scope.view]) return '';
	                  return self.titleFunctions[$scope.view]($scope.currentDay);
	              };
	              $scope.control.setCalendarToToday = function () {
	                  $scope.currentDay = new Date();
	              };
	              $scope.control.getCurrentDay = function () {
	                  return $scope.currentDay;
	              };

	              $scope.control.getFirstDayOfMonth = function () {
	                  var year = moment($scope.currentDay).year(), month = moment($scope.currentDay).month() + 1;
	                  var startDate = moment([year, month - 1]);
	                  return moment([year, month - 1]).toDate();
	              };
	              $scope.control.getLastDayOfMonth = function () {
	                  var year = moment($scope.currentDay).year(), month = moment($scope.currentDay).month() + 1;
	                  var startDate = moment([year, month - 1]);
	                  return moment(startDate).endOf('month').toDate();
	              };

	              $scope.control.goToMonth = function (month) {
	                  var year = moment($scope.currentDay).year();

	                  $scope.currentDay = moment([year, month - 1, 1]).toDate();

	              }

	              $scope.control.goToYear = function (year) {
	                  var month = moment($scope.currentDay).month();
	                  $scope.currentDay = moment([year, month, 1]).toDate();

	              }

	          }]
	      };
	  }]);
})(window, document);