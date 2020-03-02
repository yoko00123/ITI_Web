'use strict';
define(['app'], function(app) {
    var c1 = function (s, r, d, u, S, g, T, SS, R, Di, ff, fs) {
        var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
        if (r.error !== undefined) {
            g.add(r.error, 'danger', 5000);
        }
        s.Sum = function(row, field) {
            return u.Sum(row, field);
        };
        s.Max = function(row, field) {
            return u.Max(row, field);
        };
        s.Min = function(row, field) {
            return u.Min(row, field);
        };
        s.Ave = function(row, field) {
            return u.Ave(row, field);
        }; 
        s.mID = 1
        var footerTemplate = '<div ng-show=\'showFooter\' class=\'ngFooterPanel\' ng-style=\'footerStyle()\'>' + '<div class=\'ngTotalSelectContainer\' >' + '<div class=\'ngFooterTotalItems\' ng-class="{\'ngNoMultiSelect\':!multiSelect}">' + '<span class=\'ngLabel\'>View {{(totalServerItems==0?0:pagingOptions.pageSize*(pagingOptions.currentPage-1)+1)}}-{{(totalServerItems<(pagingOptions.pageSize*pagingOptions.currentPage)?totalServerItems:pagingOptions.pageSize*pagingOptions.currentPage)}} of {{totalServerItems}}</span><span ng-show=\'filterText.length>0\' class=\'ngLabel\'>({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>' + '</div></div>' + '<div class=\'ngPagerContainer\' style=\'float:right;margin-top:6px;\' ng-show=\'enablePaging\' ng-class="{\'ngNoMultiSelect\':!multiSelect}">' + '<div style=\'float:left;margin-right:10px;\' class=\'ngRowCountPicker\'>' + '<span style=\'float:left;margin-top:4.5px;\' class=\'ngLabel\'>{{i18n.ngPageSizeLabel}}&nbsp;</span>' + '<select style=\'float:left;height:25px;width:50px\' ng-model=\'pagingOptions.pageSize\'>' + '<option ng-repeat=\'size in pagingOptions.pageSizes\'>{{size}}</option>' + '</select></div>' + '<div style=\'float:left;margin-right:10px;line-height:25px;\' class=\'ngPagerControl\' style=\'float:left;min-width:135px;\'>' + '<button type=\'button\' class=\'ngPagerButton\' ng-click=\'pageToFirst()\' ng-disabled=\'cantPageBackward()\' title=\'{{i18n.ngPagerFirstTitle}}\'><div class=\'ngPagerFirstTriangle\'><div class=\'ngPagerFirstBar\'></div></div></button>' + '<button type=\'button\' class=\'ngPagerButton\' ng-click=\'pageBackward()\' ng-disabled=\'cantPageBackward()\' title=\'{{i18n.ngPagerPrevTitle}}\'><div class=\'ngPagerFirstTriangle ngPagerPrevTriangle\'></div></button>' + '<button type=\'button\' class=\'ngPagerButton\' ng-click=\'pageForward()\' ng-disabled=\'cantPageForward()\' title=\'{{i18n.ngPagerNextTitle}}\'><div class=\'ngPagerLastTriangle ngPagerNextTriangle\'></div></button>' + '<button type=\'button\' class=\'ngPagerButton\' ng-click=\'pageToLast()\' ng-disabled=\'cantPageToLast()\' title=\'{{i18n.ngPagerLastTitle}}\'><div class=\'ngPagerLastTriangle\'><div class=\'ngPagerLastBar\'></div></div></button>' + '</div></div></div>';
        s.Session = SS.data;
        s.$watch(function () { return R.employee; }, function () { s.employee = R.employee; });
        s.gridData = r.gridData; 
        s.tmpData = [];
        
        angular.forEach(s.gridData[4029], function (obj) {
            obj.DateToShow = new Date(obj.DateToShow);
            s.tmpData.push(obj);
        })
        s.gridData[4029] = s.tmpData;

        s.web_menu_links = [];
        s.setActiveTab = function (mID) {
            s.active_tab = mID;
        };
        s.setActiveTab('Home');

        s.menuApprovals = fs.menuApprovals;
        s.menuFiling = fs.menuFiling; 
        //d.getLinks(s.mID).then(function (res) {
        //    s.web_menu_links = res.web_menu_links[0].Table;
        //    console.log(s.web_menu_links);
        //});
        s.IsReadySave = 0;
        $("#EmployeeImage img").mouseover(function () {
            $(".uploadPhoto").attr("style", "display:;");
            if (s.IsReadySave == 1) {
                $(".savePhoto").attr("style", "display:;");
                $(".cancelPhoto").attr("style", "display:;");
            }
        });

        $("#EmployeeImage img").mouseout(function () {
            $(".uploadPhoto").attr("style", "display:none;");
            if (s.IsReadySave == 1) {
                $(".savePhoto").attr("style", "display:none;");
                $(".cancelPhoto").attr("style", "display:none;");
            }
        });
        s.selectedFiles = {};
        s.onFileSelect = function ($files, e) {
            s.selectedFiles = $files;
            var reader = new FileReader();
            if (e.originalEvent.target.files[0].type == "image/jpeg" || e.originalEvent.target.files[0].type == "image/png") {
                reader.onload = function (e) {
                    $('#Img1').attr('src', e.target.result);
                    $('#onlineImage').attr('src', e.target.result);
                    s.IsReadySave = 1;
                }
                reader.readAsDataURL(e.originalEvent.target.files[0]);
            } else {
                g.add("Invalid file format.", "danger", 5000);
            }
        }

        s.toggleUploadFile = function () {
            $("#ImageFile").click();
        }

        s.cancelUploadFile = function () {
            $("#Img1").attr('src', 'Upload/' + s.employee.ImageFile_GUID);
            $("#onlineImage").attr('src', 'Upload/' + s.employee.ImageFile_GUID);
            s.IsReadySave = 0;
            $(".savePhoto").attr("style", "display:none;");
            $(".cancelPhoto").attr("style", "display:none;");
        }

        s.saveUploadFile = function () {
            d.saveUploadPhoto(s.selectedFiles, s.employee.ID_Employee).then(function (data) {
                if (data.error != "" && data.error != undefined) {
                    g.add(data.error, "danger", 5000);
                } else {
                    g.add("Updated successfully.", "info", 5000);
                    s.IsReadySave = 0;
                    $(".savePhoto").attr("style", "display:none;");
                    $(".cancelPhoto").attr("style", "display:none;");
                }
            });
        }

        s.openAttachments = function (rID) {
            Di.create(dialogPath + '/AnnouncementAttachments.html', 'cAnnouncementAttachments', { data: { 'rID': rID } }, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
       }  

        s.setIcon = (function (str) { 
            var abbr = "";
            str = str.split(" ");
            if (str.toString().toLowerCase() == "overtime")
                return "OT"
            for (var i = 0; i < str.length; i++) {
                if (str[i].length >= 3) {
                    abbr += str[i].substr(0, 1);
                }
            }

            if (abbr.length > 2) {
                abbr = abbr.substr(0, 2);
            }

            return abbr.toLowerCase();
        })

        //BirthDateSurprise
        var bday = moment(s.employee.BirthDate)
        var datetoday = new Date();
        var Month = datetoday.getMonth() + 1
        var Day = datetoday.getDate()
        if (bday.format('M') === moment(datetoday).format('M') && bday.format('D') === moment(datetoday).format('D') && SS.data.EffectsMode == 1 && s.employee.BirthDate != null) {
            di.create(dialogPath + '/birthdaysurprise.html', 'birthdaysurprise', { data: { 'employee': s.employee } }, { size: 'md', keyboard: true, backdrop: true, windowclass: 'my-class bday-dialog' });
        }
        //BirthDateSurprise
        //AprilFools  
        if (Month == 4 && Day == 1 && SS.data.EffectsMode == 1) {
        var ap = Di.create(dialogPath + '/AprilFools.html', 'AprilFools', { data: { 'Employee': s.employee, 'PrankMode': 1 } }, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            ap.result.then(function () {
            }, function () {
                setTimeout(function () {
                    Di.create(dialogPath + '/AprilFools.html', 'AprilFools', { data: { 'Employee': s.employee, 'PrankMode': 2 } }, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class aprilfools' });
                },20000)
            })
        }
        //AprilFools
        /*Halloween*/
        s.Halloween = Month == 11 && Day <= 10 ? true : false;
        /*Halloween*/

    };
    app.register.controller('c1', ['$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', '$templateCache', 'Session', '$rootScope', 'dialogs', '$filter', 'filesummary', c1]);

    var cAnnouncementAttachments = function (s, d, g, mi, data) {
        s.close = function () {
            mi.dismiss();
        }

        s.attachments = [];
        d.getAttachments(data.data.rID).then(function (res) {
            s.attachments = res.data;
            for (var x = 0; x < s.attachments.length; x++) {
                var str = s.attachments[x].Name_GUID;
                var sp = str.split(".");
                var f = sp[sp.length - 1];
                console.log(f);
                if (f.toLowerCase() == "jpg" || f.toLowerCase() == "png" || f.toLowerCase() == "jpeg") {
                    s.attachments[x].img = "Upload/" + str;
                } else {
                    s.attachments[x].img = "Resources/System/" + s.fImg(f) + ".png";
                }
            }
        });

        s.fImg = function (str) {
            switch (str) {
                case 'doc':
				case 'docx':
                    return 'word';
                    break;
                case 'xls':
				case 'csv':
				case 'xlsx':
                    return 'xls';
                    break;
                case 'txt':
                    return 'txt';
                    break;
                case 'ppt':
				case 'pptx':
                    return 'powerpoint';
                    break;
                case 'pdf':
                    return 'pdf';
                    break;
                case 'zip':
				case 'rar':
                    return 'zip';
                    break;
                default:
                    return 'file';
                    break;
            }
        }
    };

    app.register.controller('cAnnouncementAttachments', ['$scope', 'dataService', 'growlNotifications', '$modalInstance', 'data', cAnnouncementAttachments]);

    var BirthdaySurprise = function (s, d, g, mi, data) {
        s.FirstName = data.data.Employee.FirstName;
        
    };

    app.register.controller('BirthdaySurprise', ['$scope', 'dataService', 'growlNotifications', '$modalInstance', 'data', BirthdaySurprise]);

    var AprilFools = function (s, d, g, mi, data) {
        s.PM = data.data.PrankMode;
        console.log(s.PM);
        s.Mode = '';
        s.Prank = []
        s.Header = (function () {
            switch (s.Mode.toLowerCase()) {
                case 'success':
                    s.HeaderMessage = 'Congratulation!';
                    return 'my-notify-success';
                    break;
                case 'warning':
                    s.HeaderMessage = 'Consider this a warning!';
                    return 'my-notify-warning';
                    break;
                case 'error':
                    s.HeaderMessage = 'Error Found!';
                    return 'my-notify-error';
                    break;
                default:
                    s.HeaderMessage = 'Good News!';
                    return 'my-notify-info';
                    break;
            }
        }) 
        function RandomPrank(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        s.Init = (function () {
            d.AprilFools().then(function (pr) {
                var item = RandomPrank(1, pr.data.length) - 1 
                s.Prank = pr.data[item].PrankText;
                s.Mode = pr.data[item].Mode;
            })

        })
        s.Okay = (function () {
            mi.dismiss();
        })

    };

    app.register.controller('AprilFools', ['$scope', 'dataService', 'growlNotifications', '$modalInstance', 'data', AprilFools]);


});