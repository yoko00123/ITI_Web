'use strict';
define(['app'],function (app) {
    var menuCtrl = function (s, d, u, g, S, R, SS, Di, h, $filter, ti, $compile) {
        try {
            var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
            R.employee = {};
            s.notification = {};
            s.notification.Msg = [];
            s.notification.Cnt = 0;
            s.notification.NewMsg = [];
            s.notification.fData = "";
            s.LastID = 0;
            var stateCollection = S.get();
            s.Master = {};
            s.Master.favourites = [];
            //FAVOURITES 
            d.getAllFavourites().then(function (res) {
                if (res.data.type == "2") {
                    g.add(res.data.msg, "danger", 5000);
                }
                s.Master.favourites = res.data.menus;
                //FAVOURITE MENU EVENTS
                s.isfav = function (id) {
                    var cnt = s.Master.favourites.filter(function (x) { return x.mID == id }).length;
                    if (cnt > 0) {
                        return true
                    } else {
                        return false
                    }
                }

                s.addToFavourites = [
                    ['Add to bookmark', function ($itemScope, $event, color, model) {
                        var mID = parseInt($event.target.id);
                        var cnt = s.Master.favourites.filter(function (x) { return x.mID == mID }).length;
                        if (cnt == 0) {
                            d.addToFavourites(mID).then(function (res) {
                                if (res.data.type == "2") {
                                    g.add(res.data.msg, "danger", 5000);
                                } else {
                                    s.Master.favourites.push({ 'mID': mID, 'WebMenus': $event.target.name, 'url': '#/' + $event.target.name.replace(/ /g, '-') + '/', 'bgcolor': 'red', 'color': 'white', 'icon': '<i class="fa fa-music"></i>' });
                                }
                            });
                        }
                    }]
                ];

                s.removeFromFavourites = [
                    ['Remove from bookmark', function ($itemScope, $event, color) {
                        var mID = parseInt($event.target.id);
                        var cnt = s.Master.favourites.filter(function (x) { return x.mID == mID }).length;
                        if (cnt > 0) {
                            angular.forEach(s.Master.favourites, function (obj, mIdx) {
                                if (obj.mID == mID) {
                                    d.removeFromFavourites(mID).then(function (res) {
                                        if (res.data.type == "2") {
                                            g.add(res.data.msg, "danger", 5000);
                                        } else {
                                            s.Master.favourites.splice(mIdx, 1);
                                        }
                                    });
                                }
                            });
                        }
                    }]
                ];
                //PARENT MENUS
                s.createParent = function (ds, isFiltered) {
                    var str = '';
                    var parentWebMenus = ds.filter(function (x) { return x.ID_WebMenus == 0 });
                    var parentWebMenus2 = ds.filter(function (x) { return x.ID_WebMenus != 0 });
                    str += '<ul data-menu="main" class="menu__level">';
                    angular.forEach(parentWebMenus, function (obj) {
                        str += '<li class="menu__item">';
                        if (obj.Children.length > 0) {
                            str += '<a class="menu__link" data-submenu="submenu-' + obj.ID + '" href="#">' + (obj.Label == '' ? obj.Name : obj.Label) + '</a>';
                        } else {
                            str += '<a name="' + obj.Name + '" id="' + obj.ID + '" context-menu="(isfav(' + obj.ID + ') !== true ? addToFavourites : removeFromFavourites)" class="menu__link" href="#/' + obj.Name.replace(/ /g, '-') + '/">' + (obj.Label == '' ? obj.Name : obj.Label) + '</a>';
                        }
                        str += '</li>';
                    });
                    if (isFiltered) {
                        angular.forEach(parentWebMenus2, function (obj) {
                            str += '<li class="menu__item">';
                            if (obj.Children.length > 0) {
                                str += '<a class="menu__link" data-submenu="submenu-' + obj.ID + '" href="#">' + (obj.Label == '' ? obj.Name : obj.Label) + '</a>';
                            } else {
                                str += '<a name="' + obj.Name + '" id="' + obj.ID + '" context-menu="(isfav(' + obj.ID + ') !== true ? addToFavourites : removeFromFavourites)" class="menu__link" href="#/' + obj.Name.replace(/ /g, '-') + '/">' + (obj.Label == '' ? obj.Name : obj.Label) + '</a>';
                            }
                            str += '</li>';
                        });
                    }
                    str += '</ul>';
                    angular.forEach(parentWebMenus, function (obj) {
                        str += s.createChild(obj, obj.ID);
                    });
                    if (isFiltered) {
                        angular.forEach(parentWebMenus2, function (obj) {
                            str += s.createChild(obj, obj.ID);
                        });
                    }
                    return str;
                }
                //CHILD MENUS
                s.createChild = function (ds, ID_WebMenus) {
                    var str = '';
                    str += '<ul data-menu="submenu-' + ID_WebMenus + '" class="menu__level">';
                    angular.forEach(ds.Children, function (obj) {
                        str += '<li class="menu__item">';
                        if (obj.Children.length > 0) {
                            str += '<a class="menu__link" data-submenu="submenu-' + obj.ID + '" href="#">' + (obj.Label == '' ? obj.Name : obj.Label) + '</a>';
                        } else {
                            str += '<a name="' + obj.Name + '" id="' + obj.ID + '" context-menu="(isfav(' + obj.ID + ') !== true ? addToFavourites : removeFromFavourites)" class="menu__link" href="#/' + obj.Name.replace(/ /g, '-') + '/">' + (obj.Label == '' ? obj.Name : obj.Label) + '</a>';
                        }
                        str += '</li>';
                    });
                    str += '</ul>';
                    angular.forEach(ds.Children, function (obj) {
                        str += s.createChild(obj, obj.ID);
                    });
                    return str;
                }

                //LOAD MENUS
                d.loadMenus().then(function (results) {
                    s.menus = results.menus;
                    function disableOther(button) {
                        if (button !== 'showLeft') {
                            classie.toggle(showLeft, 'disabled');
                        }
                    }
                    if (results.UseMenu == 1) {
                        var menuBuilder = '';
                        menuBuilder = '<div class="menu__wrap">' + s.createParent(s.menus, false) + '</div>';
                        angular.element($("#menuContainer").append($compile(menuBuilder)(s)));

                        var menuLeft = document.getElementById('ml-menu'),
                            showLeft = $(".btnOpen");
                        showLeft.on('click', function () {
                            var isActive = $(this).hasClass('active');
                            classie.toggle(this, 'active');
                            classie.toggle(menuLeft, 'cbp-spmenu-open');
                            $(".btnOpen i").attr('class', (isActive ? 'fa fa-arrow-right' : 'fa fa-arrow-left'));
                            $(".btnOpen").attr('style', (isActive ? 'opacity:.5;right:-40px!important;' : 'opacity:1;right:-200px!important;'));
                            $("#menuSearch").attr('style', (isActive ? 'opacity:.5;right:0px!important;' : 'opacity:1;right:-160px!important;'));
                            $(".btnOpen").attr('title', (isActive ? 'Open Menu' : 'Close Menu'));
                            disableOther('showLeft');
                        });
                        (function () {
                            var menuEl = document.getElementById('ml-menu'),
                                mlmenu = new MLMenu(menuEl, {
                                    backCtrl: false
                                });
                            var openMenuCtrl = document.querySelector('.action--open'),
                                closeMenuCtrl = document.querySelector('.action--close');

                            openMenuCtrl.addEventListener('click', openMenu);
                            closeMenuCtrl.addEventListener('click', closeMenu);

                            function openMenu() {
                                classie.add(menuEl, 'menu--open');
                            }

                            function closeMenu() {
                                classie.remove(menuEl, 'menu--open');
                            }
                        })();
                    }

                    $("#menuSearch input").on("keydown", function (e) {
                        if (e.keyCode == 13) {
                            var v = $(this).val();
                            var filteredMenu = s.menus.filter(function (x) { return x.Label.toLowerCase().indexOf(v.toLowerCase()) > -1 || x.Name.toLowerCase().indexOf(v.toLowerCase()) > -1 });
                            if (v != "" && v != undefined) {
                                menuBuilder = '<div class="menu__wrap">' + s.createParent(filteredMenu, true) + '</div>';
                            } else {
                                menuBuilder = '<div class="menu__wrap">' + s.createParent(s.menus, false) + '</div>';
                            }
                            $(".menu__breadcrumbs").remove();
                            $("#menuContainer").empty();
                            angular.element($("#menuContainer").append($compile(menuBuilder)(s)));
                            (function () {
                                var menuEl = document.getElementById('ml-menu'),
                                    mlmenu = new MLMenu(menuEl, {
                                        backCtrl: false
                                    });
                                var openMenuCtrl = document.querySelector('.action--open'),
                                    closeMenuCtrl = document.querySelector('.action--close');

                                openMenuCtrl.addEventListener('click', openMenu);
                                closeMenuCtrl.addEventListener('click', closeMenu);

                                function openMenu() {
                                    classie.add(menuEl, 'menu--open');
                                }

                                function closeMenu() {
                                    classie.remove(menuEl, 'menu--open');
                                }
                            })();
                        }
                    });

                    s.employee = R.employee = results.employee;
                    s.CompanyUpper = s.employee.Company.toString().toUpperCase();
                    var size = results.employee.CompanyLogoSize;
                    s.width = size.split(";")[0];
                    s.height = size.split(";")[1];
                    s.EnableNotification = results.EnableNotification;
                    s.TotalCnt = 10;
                    //NOTIFICATIONS
                    if (Boolean(s.EnableNotification)) {
                        d.getNotification().poll(s.TotalCnt, 0).then(function (res) {
                            s.notification.Msg = res.Msg;
                            s.notification.Cnt = res.CntRecord;
                            angular.forEach(s.notification.Msg, function (value, key) {
                                angular.forEach(value, function (value2, key2) {
                                    if (key2 == "ID") {
                                        if (s.LastID < value2) {
                                            s.LastID = value2;
                                        }
                                    }
                                })
                            });
                        });

                        var repeater = function () {
                            s.$apply(function () {
                                d.getNotification().poll(s.TotalCnt, s.LastID).then(function (res) {
                                    if (res.Msg != undefined) {
                                        s.notification.Msg = res.Msg;
                                        $("#notificationLoading").html('See more notification <i class="fa fa-angle-right"></i>');
                                        s.notification.Cnt = res.CntRecord;
                                        s.notification.NewMsg = res.NewMsg;
                                        s.notification.fData = res.fData;
                                        s.notifyMessage(s.notification.NewMsg);
                                        angular.forEach(s.notification.Msg, function (value, key) {
                                            angular.forEach(value, function (value2, key2) {
                                                if (key2 == "ID") {
                                                    if (s.LastID < value2) {
                                                        s.LastID = value2;
                                                    }
                                                }
                                            })
                                        });
                                    }
                                });
                            });
                        }

                        var timer;
                        clearInterval(timer);
                        timer = setInterval(repeater, 5000);
                    }
                });
            });

            s.AddMoreNotification = function (e) {
                s.TotalCnt = s.TotalCnt + 10;
                $("#notificationLoading").html('<img src="Resources/System/notificationLoading.gif" />');
            }

            s.viewNotification = function (obj) {
                var notificationDialog = Di.create(dialogPath + '/notification.html', 'cNotification', { data: obj }, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
                s.UpdateReadNotification(obj);
            }

            s.UpdateReadNotification = function (obj) {
                if (!obj.IsView) {
                    d.updateNotification(obj.ID).then(function (res) {
                        if (res.message != "") {
                            g.add("There was an error updating your notification", "danger", 5000);
                        } else {
                            obj.IsView = res.IsView;
                            s.notification.Cnt = s.notification.Cnt - 1;
                        }
                    });
                }
            }
            _.groupByMulti = function (obj, values, context) {
                if (!values.length)
                    return obj;
                var byFirst = _.groupBy(obj, values[0], context),
                    rest = values.slice(1);
                for (var prop in byFirst) {
                    byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
                }
                return byFirst;
            };

            s.notifyMessage = function (obj) {
                angular.forEach(obj, function (value, key) {
                    angular.forEach(value, function (value2, key2) {
                        var menuState = stateCollection.filter(function (x) { return x.mID == value2.ID_Parent });
                        angular.forEach(value2.Employee, function (value3, key3) {
                            var notifMsg = "<a href='#/" + menuState[0].stateName.replace(/ /g, "-") + "/" + value3.fData + "'>You have " + String(value3.CNT) + " " + key2 + " from " + value3.Sender + "</a>";
                            g.add(notifMsg, "info", 5000);
                        });
                    });
                });
            }

            s.replaceTimeSpan = function (obj) {
                if (obj.WeekSpan > 8) {
                    return moment(obj.DateTimeCreated).format("MM/DD/YYYY hh:mm A");
                } else if (obj.DaySpan > 7) {
                    return "About " + String(obj.WeekSpan) + " week(s) ago...";
                } else if (obj.HourSpan > 24) {
                    return "About " + String(obj.DaySpan) + " day(s) ago...";
                } else if (obj.MinuteSpan > 60) {
                    return "About " + String(obj.HourSpan) + " hour(s) ago...";
                } else {
                    return "About " + String(obj.MinuteSpan) + " minute(s) ago...";
                }
            }
            //END NOTIFICATIONS

            s.Session = SS.data;
            s.PublishWebsite = function () {
                d.PublishWebsite().then(function (results) {
                    g.add(results.message, "info", 5000);
                });
            }

            s.ClearMenu = function () {
                d.ClearMenu().then(function (results) {
                    g.add(results.message, "info", 5000);
                    S.reload();
                });
            }
            s.MinifyScripts = function () {
                d.MinifyScripts().then(function (results) {
                    g.add(results.message, "info", 5000);
                    S.reload();
                });
            }

            s.Run = function () {
                var dlg = Di.create(dialogPath + '/RunScript.html', 'ScriptController', {}, { size: 'xl', keyboard: true, backdrop: 'static' });
            };

            s.ShowFileExplorer = function () {
                Di.create(dialogPath + '/FileExplorer.html', 'FileExplorerController', {}, { size: 'xl', keyboard: true, backdrop: 'static' });
            };

            s.ShowSystemDashboard = function () {
                Di.create(dialogPath + '/SystemDashboard.html', 'SystemDashboardController', {}, { size: 'xl', keyboard: true, backdrop: 'static' });

            }; 

            h.bindTo(s).add({
                combo: 'alt+shift+s+q+l',
                callback: function () {
                    d.ValidateUser(SS.data.ID_Employee).then(function (a) {
                        if (a.IsValid == "true") s.Run();
                    });
                }
            }).add({
                combo: 'alt+shift+f+e',
                callback: function () {
                    s.ShowFileExplorer();
                }
            }).add({
                combo: 'alt+l',
                callback: function () {
                    window.location.href = 'Logout.aspx';
                }
            }).add({
                combo: 'alt+shift+s+d',
                callback: function () {
                    if (SS.data.ID_User == 1) s.ShowSystemDashboard();
                }
            });



            s.loadCalendar = function () {
                //var dlg = Di.create('Dialogs/calendar.html', 'cCalendar', {}, { size: 'xl', keyboard: true, backdrop: true, windowClass: 'my-class calndar' });
                var dlg = Di.create(dialogPath + '/fullCalendar.html', 'fullCalendar', {}, { size: 'xl', keyboard: true, backdrop: true, windowClass: 'my-class calndar' });
            };

            s.Account = function () { 
                var dlg = Di.create(dialogPath + '/Account.html', 'aAccount', {}, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            }

            s.GetLocation = (function () {
                var dlg = Di.create(dialogPath + '/Location.html', 'Location', {}, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            })

            //Valentines Effect
          
            //Valentines Effect

            $(document).on('client.onLogOut', function (d, e) {
                console.log('Ions Logout',d ,e)
                window.location.href = 'Logout.aspx';
            });

        }catch (ex){
        console.log(ex)
        }
	}
    app.controller('menuCtrl', ['$scope', 'dataService', 'utilService', 'growlNotifications', '$state', '$rootScope', 'Session', 'dialogs', 'hotkeys', '$filter', '$timeout', '$compile', menuCtrl]);

    var cCalendar = function (s, d, mI, S, ss) { 
        s.Master = {};
        s.calendarView = 'month';
        s.calendarDay = new Date();
        s.events = [];
        s.mainEvent = [];
        s.Master.calendarMonth = moment(s.calendarDay).month() + 1;
        s.Master.calendarYear = moment(s.calendarDay).year();
        s.Master.calendarEmployee = ss.data.ID_Employee;
        s.EmployeeSource = [];

        d.GetApproverEmployee(ss.data.ID_Employee).then(function (result) {
            s.EmployeeSource = result.data;
        });

        var year = s.Master.calendarYear, month = s.Master.calendarMonth - 1;
        var startDate = moment([year, month]).toDate();
        refreshCalendar(startDate, moment(startDate).endOf('month').toDate(), s.Master.calendarEmployee);

        /*
            Modified - Sandeep 03-21-2016
            Added close function for calendar
        */
        s.closeDg = function () {
            mI.close();
        }
        
        s.gotoMonth = function () {
            startDate = moment([s.Master.calendarYear, s.Master.calendarMonth - 1]).toDate();
            refreshCalendar(startDate, moment(startDate).endOf('month').toDate(), s.Master.calendarEmployee);
            s.Master.calendarControl.goToMonth(s.Master.calendarMonth);
        }

        s.gotoYear = function () {
            startDate = moment([s.Master.calendarYear, s.Master.calendarMonth - 1]).toDate();
            refreshCalendar(startDate, moment(startDate).endOf('month').toDate(), s.Master.calendarEmployee);
            s.Master.calendarControl.goToYear(s.Master.calendarYear);
        }

        s.prev = function () {
            s.Master.calendarControl.prev();
            refreshCalendar(s.Master.calendarControl.getFirstDayOfMonth(), s.Master.calendarControl.getLastDayOfMonth(), s.Master.calendarEmployee);
            s.Master.calendarMonth = moment(s.Master.calendarControl.getFirstDayOfMonth()).month() + 1;
            s.Master.calendarYear = moment(s.Master.calendarControl.getFirstDayOfMonth()).year();
        }
        s.next = function () {
            s.Master.calendarControl.next();
            refreshCalendar(s.Master.calendarControl.getFirstDayOfMonth(), s.Master.calendarControl.getLastDayOfMonth(), s.Master.calendarEmployee);
            s.Master.calendarMonth = moment(s.Master.calendarControl.getFirstDayOfMonth()).month() + 1;
            s.Master.calendarYear = moment(s.Master.calendarControl.getFirstDayOfMonth()).year();
        }
        s.setCalendarToToday = function () {
            s.Master.calendarControl.setCalendarToToday();
            refreshCalendar(s.Master.calendarControl.getFirstDayOfMonth(), s.Master.calendarControl.getLastDayOfMonth(), s.Master.calendarEmployee);
            s.Master.calendarMonth = moment(s.Master.calendarControl.getFirstDayOfMonth()).month() + 1;
            s.Master.calendarYear = moment(s.Master.calendarControl.getFirstDayOfMonth()).year();
        }

        function refreshCalendar(startDate, endDate, ID_Employee) {
            d.GetCalendarSource(startDate, endDate, ID_Employee).then(function (result) {
                s.events = result.data;
                angular.forEach(s.events, function (obj, idx) {
                    var sdDate = new Date(s.events[idx].starts_at)
                    var edDate = new Date(s.events[idx].ends_at)
                    var start = moment(sdDate).format("MM/DD/YYYY hh:mm:ss a");
                    var end = moment(edDate).format("MM/DD/YYYY hh:mm:ss a");
                    s.events[idx].starts_at = start;
                    s.events[idx].ends_at = end;
                });
                s.mainEvent = [];
                var dates = [];
                var d2 = [];
                //distinct date in events
                $.each(result.data, function (indx, val) {
                    if ($.inArray(val.starts_at, d2) === -1) {
                        d2.push(val.starts_at);
                        dates.push(val);
                    }
                });
                $.each(dates, function (idx, obj) {
                    var a1 = [];
                    //if Legal Holiday
                    $.each(result.data.filter(function (x) { return x.starts_at == obj.starts_at && x.DayType == "LH" }), function (idx, obj) {
                        a1.push(obj);
                    });
                    if (a1.length > 0) {
                        $.each(a1, function (idx, obj) {
                            s.mainEvent.push(obj);
                        });
                    } else {
                        //if Special Holiday
                        $.each(result.data.filter(function (x) { return x.starts_at == obj.starts_at && x.DayType == "SH" }), function (idx, obj) {
                            a1.push(obj);
                        });
                        if (a1.length > 0) {
                            $.each(a1, function (idx, obj) {
                                s.mainEvent.push(obj);
                            });
                        } else {
                            //if Rest Day
                            $.each(result.data.filter(function (x) { return x.starts_at == obj.starts_at && x.DayType == "RD" }), function (idx, obj) {
                                a1.push(obj);
                            });
                            if (a1.length > 0) {
                                $.each(a1, function (idx, obj) {
                                    s.mainEvent.push(obj);
                                });
                            }
                        }
                    }
                });

            });
        }

        s.months = [
            { ID: 1, Name: "January" },
            { ID: 2, Name: "February" },
            { ID: 3, Name: "March" },
            { ID: 4, Name: "April" },
            { ID: 5, Name: "May" },
            { ID: 6, Name: "June" },
            { ID: 7, Name: "July" },
            { ID: 8, Name: "August" },
            { ID: 9, Name: "September" },
            { ID: 10, Name: "October" },
            { ID: 11, Name: "November" },
            { ID: 12, Name: "December" }
        ];
        s.years = [];
        for (var i = 0; i < 41; i++) {
            s.years.push({ ID: (year - 20) + i, Name: String((year - 20) + i) });
        }

    }
    app.controller('cCalendar', ['$scope', 'dataService', '$modalInstance', '$state', 'Session', cCalendar]);

    var cNotification = function (s, d, mI, S, data) {
        s.dataNotification = data.data;
        s.closeDg = function () {
            mI.close();
        }
    }
    app.controller('cNotification', ['$scope', 'dataService', '$modalInstance', '$state', 'data', cNotification]);

    var aAccount = function (s, d, mI, S, ss,g) {
        s.EnableEffects = function (a) {
            mI.result.then(function () { 
            }, function () {
                d.UpdateEffects(s.Master.isEffectsEnable).then(function (a) {
                    setTimeout(function () {
                        location.reload();
                    })
                    ss.updateSession();
                })
            })
        } 
        d.AccountData().then(function (ret) {
            s.Master = ret.Master[0];
        })  
    }
    app.controller('aAccount', ['$scope', 'dataService', '$modalInstance', '$state', 'Session', 'growlNotifications', aAccount]);

    var Location = function (s, d, mI, S, ss, g) {
      
    }
    app.controller('Location', ['$scope', 'dataService', '$modalInstance', '$state', 'Session', 'growlNotifications', Location]);

    var fullCalendar = function ($s, ds, ss, dlg) {
        var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
        $s.renderData = function (start, end, id_emp) {
            var dsd = $.Deferred();
            ds.GetCalendarSource2(start, end, id_emp).then(function (data) {
                var eventData = [];
                var eventSchedData = [];
                var eventLogsData = [];
                var eventLeaveData = [];
                var eventOBData = [];
                var eventOTData = [];
                var eventCOSData = [];
                var eventUTData = [];
                Enumerable.From(data.data).ForEach(function (obj, idx) {
                    //sched
                    var ev = {};
                    if (Enumerable.From(eventSchedData).Where(function (x) { return x.Date == obj.Date }).ToArray().length == 0) {
                        if (obj.ID_DayType == 2) {
                            ev.title = 'Rest Day'
                        } else if (obj.ID_DayType == 1) {
                            ev.title = obj.Sched
                        } else {
                            if (obj.Holiday != null) ev.title = obj.Holiday
                            else
                                ev.title = obj.Sched
                        }
                        ev.Date = obj.Date;
                        ev.start = obj.Date;
                        ev.allDay = true;
                        ev.ID_DayType = obj.ID_DayType;
                        ev.DayType = obj.DayType;
                        ev.Tooltip = "Schedule";
                        if (obj.ID_DayType != 1 && obj.ID_DayType != 2) {
                            ev.color = "#e600ac";
                            ev.Tooltip = obj.DayType;
                        }
                        eventSchedData.push(ev);

                        //Geo Location
                        if (obj.Location != null) {
                            var xLocations = obj.Location.split("<br/>");
                            for (var xL = 0; xL < (xLocations.length - 1) ; xL++) {
                                var xLTime = xLocations[xL].substr(0, 8);
                                var xLTime2 = xLocations[xL].split(")")[0];
                                ev = {};
                                ev.title = xLTime2.toString() + ") - Geo Location"; //xLocations[xL];
                                ev.Date = obj.Date;
                                ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + xLTime).format("hh:mm A");
                                ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + xLTime).format("hh:mm A");
                                ev.allDay = false;
                                ev.ID_DayType = obj.ID_DayType;
                                ev.DayType = obj.DayType;
                                ev.color = "gray";
                                var aa = xLocations[xL].split(")");
                                aa.splice(0, 1);
                                var bb = aa.join(")");
                                ev.Tooltip = bb;
                                eventSchedData.push(ev);
                            }
                        }

                        //attendance
                        var currDate = new Date();
                        if (moment(currDate).format("YYYY-MM-DD") >= moment(obj.Date).format("YYYY-MM-DD") && obj.Leave == null) {
                            ev = {};
                            ev.start = obj.IN;
                            ev.end = obj.OUT;
                            ev.allDay = false;
                            ev.ID_DayType = obj.ID_DayType;
                            ev.DayType = obj.DayType;
                            ev.Tooltip = "Attendance Date: " + moment(obj.Date).format("MMM D, YYYY");
                            if (obj.IN != null && obj.OUT != null) {
                                if (obj.IN == obj.OUT) {
                                    ev.title = moment((obj.IN != null ? obj.IN : obj.OUT)).format("hh:mm A") + " (Missing Log)";
                                    ev.color = "#b10a0a";
                                } else {
                                    ev.title = moment(obj.IN).format("hh:mm A") + " - " + moment(obj.OUT).format("hh:mm A");
                                    ev.color = "#ef7e1c";
                                }
                            } else {
                                var s = obj.Sched.split("-");
                                var s2 = parseInt(s[1].replace(" PM ", "").replace(":00", ""));
                                if (s2 >= 1 && s2 <= 11) {
                                    s2 = s2 + 12;
                                } else {
                                    s2 = s2;
                                }
                                ev.start = new Date(moment(obj.Date).format("YYYY-MM-DD") + "T" + s[0].replace(" AM ", ""));
                                ev.allDay = true;
                                ev.title = "No Logs";
                                ev.color = "#b10a0a";
                            }
                            if (obj.ID_DayType != 1 && ev.title != "No Logs") {
                                eventLogsData.push(ev);
                            } else if(obj.ID_DayType == 1) {
                                eventLogsData.push(ev);
                            }
                        }
                    }
                    //Leave
                    if (obj.Leave != null && Enumerable.From(eventLeaveData).Where(function (x) { return x.ID == obj.Leave_ID }).ToArray().length == 0) {
                        ev = {};
                        ev.ID = obj.Leave_ID;
                        ev.Date = obj.Date
                        ev.title = obj.Leave;
                        if (obj.Leave.toString().toLowerCase().replace(/ /g, "").indexOf("firsthalf") > -1) {
                            ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.FirstTimeIn).format("hh:mm:ss A");
                            ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.FirstHalfTimeOut).format("hh:mm:ss A");
                        } else if (obj.Leave.toString().toLowerCase().replace(/ /g, "").indexOf("secondhalf") > -1) {
                            ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.SecondHalfTimeIn).format("hh:mm:ss A");
                            ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.SecondTimeOut).format("hh:mm:ss A");
                        } else {
                            ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.FirstTimeIn).format("hh:mm:ss A");
                            ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.SecondTimeOut).format("hh:mm:ss A");
                        }
                        ev.allDay = false;
                        ev.ID_DayType = obj.ID_DayType;
                        ev.DayType = obj.DayType;
                        ev.color = "#B10DC9"
                        ev.Tooltip = "Leave";
                        eventLeaveData.push(ev);
                    }
                    //OB
                    if (obj.OB != null && Enumerable.From(eventOBData).Where(function (x) { return x.ID == obj.OB_ID }).ToArray().length == 0) {
                        ev = {};
                        ev.ID = obj.OB_ID;
                        ev.Date = obj.Date
                        ev.title = obj.OB;
                        var ob = obj.OB.split(" - ");
                        var obStart = ob[0], obEnd = ob[1];
                        ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + obStart).format("hh:mm:ss A");
                        if (obEnd.indexOf("AM") > -1) {
                            var z = parseInt(moment(moment(obj.Date).format("YYYY-MM-DD") + " " + obEnd).format("H"))
                            var z2 = parseInt(moment(moment(obj.Date).format("YYYY-MM-DD") + " " + obStart).format("H"))
                            if (z < z2) {
                                ev.end = moment(obj.Date).add(1, "days").format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + obEnd).format("hh:mm:ss A");
                            } else {
                                ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + obEnd).format("hh:mm:ss A");
                            }
                        } else {
                            ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + obEnd).format("hh:mm:ss A");
                        }
                        ev.allDay = false;
                        ev.ID_DayType = obj.ID_DayType;
                        ev.DayType = obj.DayType;
                        ev.color = "#b37700";
                        ev.Tooltip = "Official Business";
                        eventOBData.push(ev);
                    }
                    //OT
                    if (obj.OT != null && Enumerable.From(eventOTData).Where(function (x) { return x.ID == obj.OT_ID }).ToArray().length == 0) {
                        ev = {};
                        ev.ID = obj.OT_ID;
                        ev.Date = obj.Date
                        ev.title = obj.OT;
                        var ot = obj.OT.split(" - ");
                        var otStart = ot[0], otEnd = ot[1];
                        ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + otStart).format("hh:mm:ss A");
                        if (otEnd.indexOf("AM") > -1) {
                            var z = parseInt(moment(moment(obj.Date).format("YYYY-MM-DD") + " " + otEnd).format("H"))
                            var z2 = parseInt(moment(moment(obj.Date).format("YYYY-MM-DD") + " " + otStart).format("H"))
                            if (z < z2) {
                                ev.end = moment(obj.Date).add(1, "days").format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + otEnd).format("hh:mm:ss A");
                            } else {
                                ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + otEnd).format("hh:mm:ss A");
                            }
                        } else {
                            ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + otEnd).format("hh:mm:ss A");
                        }
                        ev.allDay = false;
                        ev.ID_DayType = obj.ID_DayType;
                        ev.DayType = obj.DayType;
                        ev.color = "#3333cc";
                        ev.Tooltip = "Overtime";
                        eventOTData.push(ev);
                    }
                    //UT
                    if (obj.UT != null && Enumerable.From(eventUTData).Where(function (x) { return x.ID == obj.UT_ID }).ToArray().length == 0) {
                        ev = {};
                        ev.ID = obj.UT_ID;
                        ev.Date = obj.Date
                        ev.title = obj.UT;
                        var ut = obj.UT.split(" - ");
                        var utStart = ut[0], utEnd = ut[1];
                        ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + utStart).format("hh:mm:ss A");
                        if (utEnd.indexOf("AM") > -1) {
                            var z = parseInt(moment(moment(obj.Date).format("YYYY-MM-DD") + " " + utEnd).format("H"))
                            var z2 = parseInt(moment(moment(obj.Date).format("YYYY-MM-DD") + " " + utStart).format("H"))
                            if (z < z2) {
                                ev.end = moment(obj.Date).add(1, "days").format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + utEnd).format("hh:mm:ss A");
                            } else {
                                ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + utEnd).format("hh:mm:ss A");
                            }
                        } else {
                            ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(moment(obj.Date).format("YYYY-MM-DD") + " " + utEnd).format("hh:mm:ss A");
                        }
                        ev.allDay = false;
                        ev.ID_DayType = obj.ID_DayType;
                        ev.DayType = obj.DayType;
                        ev.color = "#86592d";
                        ev.Tooltip = "Undertime";
                        eventUTData.push(ev);
                    }
                    //COS
                    if (obj.COS != null && Enumerable.From(eventCOSData).Where(function (x) { return x.ID == obj.COS_ID }).ToArray().length == 0) {
                        ev = {};
                        ev.ID = obj.COS_ID;
                        ev.Date = obj.Date;
                        ev.title = obj.COS;
                        ev.start = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.COSTimeIn).format("hh:mm:ss A");
                        ev.end = moment(obj.Date).format("YYYY-MM-DD") + " " + moment(obj.COSTimeOut).format("hh:mm:ss A");
                        ev.allDay = false;
                        ev.ID_DayType = obj.ID_DayType;
                        ev.DayType = obj.DayType;
                        ev.color = "#5c5c8a";
                        ev.Tooltip = "Change of Schedule";
                        eventCOSData.push(ev);
                    }
                });
                dsd.resolve(eventSchedData.concat(eventLogsData).concat(eventLeaveData).concat(eventOBData).concat(eventOTData).concat(eventCOSData).concat(eventUTData));
            });
            return dsd.promise();
        }

        $s.getCurrentYear = new Date().getFullYear();
        $s.getCurrentMonth = new Date().getMonth() + 1;
        $s.getCurrentEmployee = ss.data.ID_Employee;
        $s.months = [
            { ID: 1, Name: "January" },
            { ID: 2, Name: "February" },
            { ID: 3, Name: "March" },
            { ID: 4, Name: "April" },
            { ID: 5, Name: "May" },
            { ID: 6, Name: "June" },
            { ID: 7, Name: "July" },
            { ID: 8, Name: "August" },
            { ID: 9, Name: "September" },
            { ID: 10, Name: "October" },
            { ID: 11, Name: "November" },
            { ID: 12, Name: "December" }
        ];
        $s.years = [];
        for (var i = 0; i < 41; i++) {
            $s.years.push({ ID: ($s.getCurrentYear - 20) + i, Name: String(($s.getCurrentYear - 20) + i) });
        }

        $s.updateCalendar = function (v1, v2, v3) {
            var fcDate = moment([v2, v1 - 1]).toDate();
            $s.getCurrentEmployee = v3;
            $("#fullCalendar").fullCalendar('gotoDate', fcDate);
        }

        $s.refetchCalendar = function (v1, v2, v3) {
            $s.getCurrentEmployee = v3;
            $("#fullCalendar").fullCalendar('refetchEvents');
        }

        $s.EmployeeSource = [];

        ds.GetApproverEmployee(ss.data.ID_Employee).then(function (result) {
            $s.EmployeeSource = result.data;
        });
        setTimeout(function () {
            $("#fullCalendar").fullCalendar({
                height: 700,
                header: {
                    left: '',
                    center: '',
                    right: 'today prev,next month,agendaWeek'
                },
                eventRender: function (event, element) {
                    $(element).tooltip({ title: event.Tooltip });
                    $(element).html(event.title);
                },
                events: function (start, end, timezone, callback) {
                    $s.renderData(moment(start._d).toDate(), moment(end._d).toDate(), $s.getCurrentEmployee).then(function (cdata) {
                        callback(cdata);
                    });
                },
                eventLimit: true,
                views: {
                    month: {
                        eventLimit: 4
                    }
                }
            });

            $('.fc-prev-button').click(function () {
                var date = $("#fullCalendar").fullCalendar('getDate');
                var month_int = date._d.getMonth();
                var year_int = date._d.getFullYear();
                $s.getCurrentMonth = month_int + 1;
                $s.getCurrentYear = year_int;
                $("#cmonth").val($s.getCurrentMonth -1);
                var cy = Enumerable.From($s.years).Select(function (x) { return x.ID }).IndexOf(year_int);
                $("#cyear").val(cy);
            });

            $('.fc-next-button').click(function () {
                var date = $("#fullCalendar").fullCalendar('getDate');
                var month_int = date._d.getMonth();
                var year_int = date._d.getFullYear();
                $s.getCurrentMonth = month_int + 1;
                $s.getCurrentYear = year_int;
                $("#cmonth").val($s.getCurrentMonth -1);
                var cy = Enumerable.From($s.years).Select(function (x) { return x.ID }).IndexOf(year_int);
                $("#cyear").val(cy);
            });
        }, 500);
        

        $s.showLegend = function () {
            var legend = dlg.create(dialogPath + '/CalendarLegend.html', '', {}, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
        }
    }
    app.controller('fullCalendar', ['$scope', 'dataService', 'Session', 'dialogs', fullCalendar]);
});
