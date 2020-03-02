'use strict';

define(['app'], function (app) {

    var BaseListController = function (s, r, d, u, S, g, SS, Di) {
        var dialogPath = (app.PublishID == 0 || app.PublishID == undefined || app.AllowDebugging ? 'Dialogs' : 'Build/' + app.PublishID + '/Dialogs');
        if (r.error !== undefined) {
            g.add(r.error, 'danger', 5000);
        };
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
        s.Session = SS.data;
        s.gridData = r.gridData;
        s.gridEvents = {};
        s.clearFilter = function (mID) {
            s.filter[mID] = {};
            s.Search(mID);
        };
        s.closeFilter = function (mID) {
            var filter = $("#grid-filter-" + mID);
            $('.aside-backdrop').remove();
            filter.addClass("hide");
        };
        //FILTER CONTROL DATASOURCE  
        s.filter_dropdown_source = r.filter_dropdown_source;
        s.filter_rdb_source = r.filter_rdb_source;
        s.filter_autocomplete_source = r.filter_autocomplete_source;
        s.filter_text_autocomplete_source = r.filter_text_autocomplete_source;
        s.filter_lookup_source = r.filter_lookup_source;
        s.setID = function (data, target, b) {
            data[target] = b.ID;
        };
        s.clearAutoComplete = function (data, target) {
            data[target] = null;
        };
        s.Search = function (mID, IsSearchAll) {
            var gridPagingState = s.gridEvents[mID].getGridPagingState();
            s.refreshGrid(mID, gridPagingState.currentPageSize, gridPagingState.currentPage, gridPagingState.currentSortColumn, gridPagingState.currentSortDirection, s.filter[mID], IsSearchAll);
            //console.log(s.gridOptions[mID].currentPageSize, s.gridOptions[mID].currentPage, s.gridOptions[mID].currentSortColumn, s.gridOptions[mID].currentSortDirection);
            //if (s.pagingOptions[mID].currentPage == 1) {
            //    s.refreshGrid(mID, s.pagingOptions[mID].pageSize, s.pagingOptions[mID].currentPage, s.sortInfo[mID].fields[0], s.sortInfo[mID].directions[0], s.filter[mID]);
            //} else {
            //    s.pagingOptions[mID].currentPage = 1;
            //}
        };

        s.refreshGrid = function (mID, pageSize, currentPage, field, direction, filter, IsSearchAll) {
            d.getPagedData(mID, pageSize, currentPage, field, direction, filter, 0, IsSearchAll).then(function (results) {
                s.gridData[mID] = results.data;
                //s.gridOptions[mID].$gridScope.totalServerItems = results.totalServerItems;
                s.gridOptions[mID].totalServerItems = results.totalServerItems;
                if (!s.$$phase) {
                    s.$apply();
                }
            });
        };

        s.Refresh = function () {
            S.go(S.current, S.params, { reload: true, inherit: false, notify: true });
        };
        //REPORT
        s.RefreshReport = function (mID, rp) {
            if (rp == 1) {
                Di.create(dialogPath + '/ReportPassword.html', 'ReportPassword', { data: { 'mID': mID, 'filter': s.filter[mID], 'checkfilter': s['filter_' + mID] } }, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            } else {
                s.rawData = [];
                s['filter_' + mID].$submitted = true;
                if (!s['filter_' + mID].$valid) { g.add('Fill all the required fields.', "danger", 5000); return; }
                //$.each(s.filter[mID], function (d, v) {
                //    var item = {
                //        'id': 'obj_' + mID + '_' + '0_' + d,
                //        'name': 'obj_' + mID + '_' + '0_' + d,
                //        'value': (v = null ? '' : v),
                //        'menuID': mID,
                //        'refID': 0,
                //        'seq_no': 0,
                //        'columnName': d
                //    };
                //    s.rawData.push(item);
                //});
                //$('#frame_' + mID).attr('src', '../ModulePage/Report.aspx?menuID=' + mID + '&refID=' + 0 + '&params=' + JSON.stringify(s.rawData));
                $('#frame_' + mID).attr('src', '../ModulePage/Report.aspx?menuID=' + mID + '&refID=' + 0 + '&params=' + JSON.stringify(s.filter[mID]));
            }
        };

    }

    app.controller('BaseListController', ['$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'dialogs', BaseListController]);

    var BaseFormController = function (s, r, d, u, S, g, SS, ck, Di) {
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
        s.Session = SS.data;
        s.Master = r.Master;
        s.Parent = r.Parent;
        s.Detail = r.Detail;
        s.dropdown_source = r.dropdown_source;
        s.rdb_source = r.rdb_source;
        s.autocomplete_source = r.autocomplete_source;
        s.text_autocomplete_source = r.text_autocomplete_source;
        s.lookup_source = r.lookup_source;
        s.detailedlookup_source = r.detailedlookup_source;
        //s.detailedValuelookup_source = r.detailedValuelookup_source;
        s.removeRow = function (mID, row, confirmation) {
            if (confirmation === null || confirmation === undefined) {
                var idx = s.Detail[mID].indexOf(row.entity);
                if (row.entity.ID == 0) {
                    s.Detail[mID].splice(idx, 1);
                } else {
                    d.GridDelete(mID, row.entity.ID).then(function (results) {
                        s.Detail[mID].splice(idx, 1);
                    });
                }
            } else {

                var dlg = Di.confirm(undefined, confirmation, { size: 'sm', keyboard: true, backdrop: true });
                dlg.result.then(function (btn) {
                    var idx = s.Detail[mID].indexOf(row.entity);
                    if (row.entity.ID == 0) {
                        s.Detail[mID].splice(idx, 1);
                    } else {
                        d.GridDelete(mID, row.entity.ID).then(function (results) {
                            s.Detail[mID].splice(idx, 1);
                        });
                    }
                });
            }

        };
        s.removeRowByCommand = function (mID, row, confirmation) {
            if (confirmation === null || confirmation === undefined) {
                var idx = s.Detail[mID].indexOf(row.entity);
                if (row.entity.ID == 0) {
                    s.Detail[mID].splice(idx, 1);
                } else {
                    d.GridDeleteByCommand(mID, row.entity.ID).then(function (results) {
                        s.Detail[mID].splice(idx, 1);
                    });
                }
            } else {

                var dlg = Di.confirm(undefined, confirmation, { size: 'sm', keyboard: true, backdrop: true });
                dlg.result.then(function (btn) {
                    var idx = s.Detail[mID].indexOf(row.entity);
                    if (row.entity.ID == 0) {
                        s.Detail[mID].splice(idx, 1);
                    } else {
                        d.GridDeleteByCommand(mID, row.entity.ID).then(function (results) {
                            s.Detail[mID].splice(idx, 1);
                        });
                    }
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
        s.addDays = function (date, nd) {
            var d = new Date(date);
            return moment(d.addDays(nd)).format("MM/DD/YYYY");
        }
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
            //console.log(s.selectedFiles);
        };

        s.onExcelSelect = function ($files, mID, btnID, targetmID, targetTab) {

            if ($files.length > 0) {
                //console.log(mID, s.rID, btnID, s.Master);
                d.ImportExcelTemplate(mID, s.rID, btnID, s.Master, $files[0]).then(function (results) {
                    if (results.messageType == 2) {
                        g.add(results.message, 'anger', 5000);
                    } else {
                        if (targetmID != 0) {
                            s.Detail[targetmID] = results.data;
                            s.tabs.activeTab = targetTab;
                            if (s.loadedTab.indexOf(targetmID) == -1) {
                                s.loadedTab.push(targetmID);
                            }
                            console.log(s.Detail[targetmID]);
                        } else {
                            for (var x = 0; x < results.data.length; x++) {
                                s.Detail[results.data[x].ID] = results.data[x].Data;
                                s.tabs.activeTab = x + 1;
                                if (s.loadedTab.indexOf(results.data[x].ID) == -1) {
                                    s.loadedTab.push(results.data[x].ID);
                                }
                            }
                            s.tabs.activeTab = 0;
                        }
                        g.add(results.message, 'info', 5000);
                    }
                });
            }
        };

        s.CascadingDropdown = function (mID, colID, value, dropdown) {
            d.CascadingDropdown(mID, colID, value).then(function (results) {
                var a = dropdown.split(",");
                for (var i = 0; i < a.length; i++) {
                    s.dropdown_source[a[i]] = results.data[a[i]];
                }
            });
        };

        s.CascadingDropdown2 = function (mID, colID, value, dropdown) {
            d.CascadingDropdown2(mID, colID, value).then(function (results) {
                var a = dropdown.split(",");
                for (var i = 0; i < a.length; i++) {
                    s.dropdown_source[a[i]] = results.data[a[i]];
                }
            });
        };

        s.Refresh = function () {
            S.go(S.current, S.params, { reload: true, inherit: false, notify: true });
        };

        ck.check(s);

        s.goPrevious = function (mID) {
            if (S.params.m != undefined) {
                if (S.params.s != null) {
                    var paramname = JSON.parse('{"ID_' + S.params.m + '": "' + S.params.s + '"}');
                    S.go(S.params.m, paramname, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                } else {
                    S.go(S.params.m, {}, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            } else {
                S.go(mID, {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }
        };
    }

    app.controller('BaseFormController', ['$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', 'ckFormPristine', 'dialogs', BaseFormController]);

    var ScriptController = function (s, mI, d, g) {
        s.Master = {};
        s.Master.scriptText = "";
        s.run = function () {
            d.RunScript(s.Master.scriptText).then(function (results) {
                if (results.message !== "ok") {
                    g.add(results.message, 'danger', 5000);
                    return;
                }

                var data = results.data;
                var columns = [];
                if (data.length > 0) {
                    var obj = data[0];
                    for (var key in obj) {
                        columns.push({ field: key, width: (key.length + 3) * 10 });
                    }
                }
                s.data = data;
                s.gridOptions.columnDefs = columns;

                //s.gridOptions.$gridScope.firstAdjustmentLeft = false;
                //s.gridOptions.ngGrid.lateBoundColumns = false;
                //s.gridOptions.$gridScope.columns.length = 0
                //s.gridOptions.ngGrid.config.columnDefs = s.columnDefs;
                //s.gridOptions.ngGrid.buildColumns();
                //s.gridOptions.ngGrid.eventProvider.assignEvents();
                //s.gridOptions.$gridServices.DomUtilityService.RebuildGrid(s.gridOptions.$gridScope, s.gridOptions.ngGrid);

                g.add("Query executed.", 'info', 3000);

            });
        };

        s.data = [];
        s.gridEvents = {};
        s.columnDefs = [];
        s.gridOptions = {
            data: 'data',
            height: 400,
            columnDefs: s.columnDefs,
            //enableColumnResize: true
            enableColumnResizing: true,
            registerApi: function (events) {
                s.gridEvents = events;
            }
        };

        s.cancel = function () {
            mI.dismiss();
        };

        s.download = function () {
            s.gridEvents.downloadCSV();
        }

    }

    app.controller('ScriptController', ['$scope', '$modalInstance', 'dataService', 'growlNotifications', ScriptController]);

    var FileExplorerController = function (s) {

    }

    app.controller('FileExplorerController', ['$scope', FileExplorerController]);

    var SystemDashboardController = function (s, mI, h, $t) {
        Chart.defaults.global.animation = false;
        Chart.defaults.global.scaleOverride = true;
        Chart.defaults.global.scaleSteps = 10;
        Chart.defaults.global.scaleStepWidth = 10;
        Chart.defaults.global.scaleStartValue = 0;
        Chart.defaults.global.showLabels = false;
        Chart.defaults.global.responsive = true;
        Chart.defaults.global.maintainAspectRatio = true;

        var max = 25;
        var poller = function () {
            h({
                method: 'POST',
                url: 'api/SystemDashboard/GetDashboardResources',
                dataType: "json",
                ignoreLoadingBar: true,
                disableInterceptor: true,
            }).error(function (data, status, headers, config) {
                //console.log(results.data);
            }).then(function (results) {
                if (s.cpuLabels.length < max) {
                    s.cpuLabels.push("");
                }
                if (s.cpuData[0].length >= max) {
                    s.cpuData[0].shift();
                }
                s.currentCPU = results.data.cpu.toFixed(2);
                s.cpuData[0].push(s.currentCPU);

                if (s.memoryLabels.length < max) {
                    s.memoryLabels.push("");
                }
                if (s.memoryData[0].length >= max) {
                    s.memoryData[0].shift();
                }
                s.currentMemory = results.data.memory.toFixed(2);
                s.memoryData[0].push(s.currentMemory);

                if (s.diskLabels.length < max) {
                    s.diskLabels.push("");
                }
                if (s.diskData[0].length >= max) {
                    s.diskData[0].shift();
                }
                s.currentDisk = results.data.disk.toFixed(2);
                s.diskData[0].push(s.currentDisk);

            }).always(function () {
                if (poller !== undefined) {
                    $t(poller, 1);
                };
            });
        };
        poller();

        s.cancel = function () {
            mI.dismiss();
        };

        s.cpuLabels = [];
        s.cpuData = [[]];

        s.memoryLabels = [];
        s.memoryData = [[]];

        s.diskLabels = [];
        s.diskData = [[]];

        s.$on("$destroy", function () {
            poller = undefined;
        });
    }

    app.controller('SystemDashboardController', ['$scope', '$modalInstance', '$http', '$timeout', SystemDashboardController]);

    var ReportPassword = function (s, d, g, mi, data) {
        s.Master = [];
        s.cancel = function () {
            mi.dismiss();
        }
        s.Okay = (function () {
            if (s.Master.Password === undefined) {
                s.Master.Password = '';
            } else {
                s.Master.Password = s.Master.Password;
            }
            data.data.checkfilter.$submitted = true;
            if (!data.data.checkfilter.$valid) { g.add('Fill all the required fields.', "danger", 5000); return; }
            $('#frame_' + data.data.mID).attr('src', '../ModulePage/Report.aspx?menuID=' + data.data.mID + '&refID=' + 0 + '&params=' + JSON.stringify(data.data.filter) + '&ReportPass=' + s.Master.Password);
            setTimeout(function () {
                mi.dismiss();
            }, 2000);
        });
    };

    app.controller('ReportPassword', ['$scope', 'dataService', 'growlNotifications', '$modalInstance', 'data', ReportPassword]);

});