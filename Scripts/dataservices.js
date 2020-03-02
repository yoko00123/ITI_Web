'use strict';

define(['app'], function (app) {


    var dataService = function (h, q, u) {
        var serviceBase = 'api/DataService/', //http://' + l.host() + (l.port() ? ":" + l.port() : "") + '/
			dataFactory = {};

        dataFactory.loadMenus = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'loadMenu',
                dataType: "json"
            }).error(function (data, status, headers, config) {
                console.log(data);
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getSession = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'getSession',
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getPagedData = function (mID, pageSize, currentPage, field, direction, filter, rID, IsSearchAll) {
            return h({
                method: 'POST',
                url: serviceBase + 'getPagedData',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'pageSize': pageSize, 'currentPage': currentPage, 'field': field, 'direction': direction, 'filter': angular.toJson(filter), 'rID': (rID == undefined ? 0 : rID), 'IsSearchAll': (IsSearchAll == undefined ? 0 : IsSearchAll) })),
                dataType: "json"
            }).error(function (data, status, headers, config) {

            }).then(function (results) {
                //console.log(results.data);
                return results.data;
            });
        }

        dataFactory.getResources = function (mID, rID, pID, filter, Param_ID_Employee, customMenu) {
            if (!filter) { filter = "" }
            if (!Param_ID_Employee) { Param_ID_Employee = "" }
            if (!customMenu) { customMenu = 0 }
            return h({
                method: 'POST',
                url: serviceBase + 'getResources',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'pID': pID, 'filter': filter, 'Param_ID_Employee': Param_ID_Employee, 'customMenu': customMenu })),
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        };

        dataFactory.getAllResources = function (mID, rID, pID) {
            return h({
                method: 'POST',
                url: serviceBase + 'getAllResources',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'pID': pID })),
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        };

        dataFactory.loadTab = function (mID, rID, Param_ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'loadTab',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'Param_ID_Employee': Param_ID_Employee })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
                console.log(data, status);
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GetWebTable = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'loadTab',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
                console.log(data, status);
            }).then(function (results) {
                return results.data;
            });
        }

        //BUTTON COMMANDS
        dataFactory.Save = function (mID, rID, btnID, Master, Detail, selectedFiles, Param_ID_Employee) {
            var files = [], fileSummary = [];

            if (selectedFiles !== undefined) {
                for (var i = 0; i < selectedFiles.length; i++) {
                    files.push(selectedFiles[i].file);
                    fileSummary.push({ 'mID': selectedFiles[i].mID, 'name': selectedFiles[i].name, 'idx': selectedFiles[i].idx })
                }
            }
            return u.upload({
                method: 'POST',
                url: serviceBase + 'Save',
                data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'btnID': btnID, 'Master': angular.toJson(Master), 'Detail': angular.toJson(Detail), 'fileSummary': angular.toJson(fileSummary), 'Param_ID_Employee': Param_ID_Employee })) },
                file: files,
                //dataType: "json"
            }).error(function (data, status, headers, config) {
                return data;
            }).then(function (results) {
                return results.data;
            });


        }

        dataFactory.SpecialCommand = function (mID, rID, btnID, Master, Param_ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'SpecialCommand',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'btnID': btnID, 'Master': angular.toJson(Master), 'Param_ID_Employee': Param_ID_Employee })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.Generate = function (mID, rID, btnID, Master,Param_ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'Generate',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'btnID': btnID, 'Master': angular.toJson(Master), 'Param_ID_Employee': Param_ID_Employee })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GenerateExcelTemplate = function (mID, btnID, rID, Master) {
            if (rID == undefined) {
                rID = 0;
            }
            var iframe = document.createElement("iframe");
            iframe.src = encodeURI(serviceBase + "GenerateExcelTemplate?mID=" + mID + "&btnID=" + btnID + "&ID=" + rID + "&Master=" + escape(angular.toJson(Master)));
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            $(iframe).ready(function () {
                setTimeout(function () {
                    $(iframe).remove();
                }, 2e4 * 5)
            });
        }

        dataFactory.ImportExcelTemplate = function (mID, rID, btnID, Master, files) {
            return u.upload({
                method: 'POST',
                url: serviceBase + 'ImportExcelTemplate',
                data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'btnID': btnID, 'Master': angular.toJson(Master) })) },
                file: files,
            }).error(function (data, status, headers, config) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ExportToExcel = function (mID, pageSize, currentPage, field, direction, filter, rID) {
            if (rID == undefined) {
                rID = 0;
            }

            var iframe = document.createElement("iframe");
            iframe.src = encodeURI(serviceBase + "ExportToExcel?mID=" + mID + "&pageSize=" + pageSize + "&currentPage=" + currentPage + "&field=" + field + "&direction=" + direction + "&filter=" + encodeURIComponent(angular.toJson(filter)) + "&rID=" + rID);
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            $(iframe).ready(function () {
                setTimeout(function () {
                    $(iframe).remove();
                }, 2e3);
            });
        }

        dataFactory.ColumnSelection = function (mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'ColumnSelection',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SaveColumnSelection = function (mID, columns) {
            return h({
                method: 'POST',
                url: serviceBase + 'SaveColumnSelection',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'columns': columns })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        };

        // GRID BUTTON
        dataFactory.BatchGridSave = function (mID, btnID, gridData) {
            return h({
                method: 'POST',
                url: serviceBase + 'BatchGridSave',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'btnID': btnID, 'gridData': angular.toJson(gridData) })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.BatchGridCommand = function (mID, btnID, iDs) {
            return h({
                method: 'POST',
                url: serviceBase + 'BatchGridCommand',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'btnID': btnID, 'iDs': String(iDs) })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.BatchGridDelete = function (mID, iDs) {
            return h({
                method: 'POST',
                url: serviceBase + 'BatchGridDelete',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'iDs': String(iDs) })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GridDelete = function (mID, iD) {
            return h({
                method: 'POST',
                url: serviceBase + 'GridDelete',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'iD': iD })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GridDeleteByCommand = function (mID, iD) {
            return h({
                method: 'POST',
                url: serviceBase + 'GridDeleteByCommand',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'iD': iD })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.Publish = function (Master) {
            return h({
                method: 'POST',
                url: serviceBase + 'Publish',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'Master': angular.toJson(Master) })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.AddNewRow = function (mID, master, Param_ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'AddNewRow',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'Master': angular.toJson(master), 'Param_ID_Employee': Param_ID_Employee })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getAutoCompleteItems = function (mID, colID, value) {
            return h({
                method: 'POST',
                url: serviceBase + 'getAutoCompleteItems',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'colID': colID, 'value': value })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        };

        //RESOLVER 
        //AUTHENTICATE IF USER HAS ACCESS TO MENU
        dataFactory.HasAccess = function (route, mID) {
            var deferred = q.defer();
            // return $http({
            // method: 'POST',
            // url: serviceBase + 'HasAccess',
            // data: "{'mID':'" + mID + "'}",
            // dataType: "json"
            // }).error(function (data,status,headers,config) {
            // console.log(status);
            // }).then(function (results) {
            // console.log(angular.toJson(results.data));
            // if (Boolean(results.data)) {
            // deferred.resolve(); // ACCEPTED
            // } else {
            // deferred.reject(route); //REJECTED
            // }
            // return deferred.promise;
            // });

            return true;
        }

        dataFactory.PublishWebsite = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'PublishWebsite',
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ClearMenu = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'ClearMenu',
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        //dataFactory.FormUpload = function (mID, rID, btnID, Master, Detail, selectedFiles) {
        //    var files = [];
        //    for (var i = 0; i < selectedFiles.length; i++) {
        //        files.push(selectedFiles[i].file);
        //    }
        //    console.log(angular.toJson(files));
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'FormUpload',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'btnID': btnID, 'Master': angular.toJson(Master), 'Detail': angular.toJson(Detail) })) },
        //        file: files,
        //    }).error(function (data, status, headers, config) {
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.getPositionDetails = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'getPositionDetails',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getComboBoxItems = function (mID, DisplayMember, DisplayValue) {
            return h({
                method: 'POST',
                url: serviceBase + 'getComboBoxItems',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'DisplayMember': DisplayMember, 'DisplayValue': DisplayValue })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.loadData = function (filter) {
            return h({
                method: 'POST',
                url: serviceBase + 'loadData',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'filter': filter })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ExportResumeFile = function (pID) {
            return h({
                method: 'POST',
                url: serviceBase + 'ExportResumeFile',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'pID': pID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        //dataFactory.UploadJsonFile = function (selectedFiles, mID) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'UploadJsonFile',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'file': selectedFiles, 'mID': mID })) },
        //        file: selectedFiles,
        //        //dataType: "json"
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.MoveTo = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'MoveTo',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SaveComment = function (ID, refID, Comment, mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'SaveComment',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'Comment': Comment, 'mID': mID, 'refID': refID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SaveSchedule = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'SaveSchedule',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.RequestDropdownSource = function (cols, tableName, filter) {
            return h({
                method: 'POST',
                url: serviceBase + 'RequestDropdownSource',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'columns': cols, 'tableName': tableName, 'filter': filter })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SaveBatchEndorse = function (ids, ID_ManpowerRequest) {
            return h({
                method: 'POST',
                url: serviceBase + 'SaveBatchEndorse',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ids': String(ids), 'ID_ManpowerRequest': ID_ManpowerRequest })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.downloadFile = function (dfile, filename) {
            var iframe = document.createElement("iframe");
            iframe.src = encodeURI(serviceBase + "downloadFile?dfile=" + dfile + "&filename=" + filename);
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            $(iframe).ready(function () {
                setTimeout(function () {
                    $(iframe).remove();
                }, 5000)
            });
        }

        //dataFactory.ImportJobDescriptionTemplate = function (files) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'ImportJobDescriptionTemplate',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({})) },
        //        file: files,
        //    }).error(function (data, status, headers, config) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        //dataFactory.UploadMRFFile = function (selectedFiles, ID, SBAR) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'UploadMRFFile',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'file': selectedFiles, 'ID': ID, 'SBAR': SBAR })) },
        //        file: selectedFiles,
        //        //dataType: "json"
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        //dataFactory.UploadAssessmentFile = function (selectedFiles, ID) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'UploadAssessmentFile',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'file': selectedFiles, 'ID': ID })) },
        //        file: selectedFiles,
        //        //dataType: "json"
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.ApproveModule = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'ApproveModule',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        //dataFactory.UploadInterviewFile = function (selectedFiles, ID) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'UploadInterviewFile',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'file': selectedFiles, 'ID': ID })) },
        //        file: selectedFiles,
        //        //dataType: "json"
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.removeAttachment = function (ID, filename) {
            return h({
                method: 'POST',
                url: serviceBase + 'removeAttachment',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'filename': filename })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        //dataFactory.UploadAttachments = function (selectedFiles, ID_Persona) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'UploadAttachments',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'file': selectedFiles, 'ID_Persona': ID_Persona })) },
        //        file: selectedFiles,
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.SendMail = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'SendMail',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.EndorseTo = function (ID, stageID) {
            return h({
                method: 'POST',
                url: serviceBase + 'EndorseTo',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'stageID': stageID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        //dataFactory.SaveForHiring = function (selectedFiles, data) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'SaveForHiring',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'FileData': selectedFiles, 'data': data })) },
        //        file: selectedFiles,
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.CancelApplication = function (ID, ModuleID) {
            return h({
                method: 'POST',
                url: serviceBase + 'CancelApplication',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'ModuleID': ModuleID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.OnHoldApplication = function (ID, ModuleID) {
            return h({
                method: 'POST',
                url: serviceBase + 'OnHoldApplication',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'ModuleID': ModuleID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.CascadingDropdown = function (mID, colID, value) {
            return h({
                method: 'POST',
                url: serviceBase + 'CascadingDropdown',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'colID': colID, 'value': value })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.RemoveFiles = function (guid, path, ID_Persona) {
            return h({
                method: 'POST',
                url: serviceBase + 'RemoveFiles',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'guid': guid, 'path': path, 'ID_Persona': ID_Persona })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.removeMRFAttachment = function (ID, filename, ID_Parent) {
            return h({
                method: 'POST',
                url: serviceBase + 'removeMRFAttachment',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'filename': filename, 'ID_Parent': ID_Parent })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.OpenApplication = function (ID, ModuleID) {
            return h({
                method: 'POST',
                url: serviceBase + 'OnHoldApplication',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'ModuleID': ModuleID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GetManpowerPlanComments = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetManpowerPlanComments',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GetEmployeeList = function (ID, ID_Company, Group, mpid) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetEmployeeList',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID, 'ID_Company': ID_Company, 'Group': Group, 'mpid': mpid })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.HRMSBatchApproval = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'HRMSBatchApproval',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.loadOrgChart = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'loadOrgChart',
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }


        dataFactory.SetStatusAndComment = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'SetStatusAndComment',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ListTemplates = function (menuID) {
            return h({
                method: 'POST',
                url: serviceBase + 'ListTemplates',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'menuID': menuID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GetCalendarSource = function (StartDate, EndDate, ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetCalendarSource',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'StartDate': StartDate, 'EndDate': EndDate, 'ID_Employee': ID_Employee })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.EndorseCandidate = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'EndorseCandidate',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        //dataFactory.UploadForHiringDocument = function (data) {
        //    return u.upload({
        //        method: 'POST',
        //        url: serviceBase + 'UploadForHiringDocument',
        //        data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify(data)) },
        //        file: data.File,
        //        //dataType: "json"
        //    }).error(function (data) {
        //        return data;
        //    }).then(function (results) {
        //        return results.data;
        //    });
        //}

        dataFactory.getMenuDropdownSources = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'getMenuDropdownSources',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.LoadEmploymentTemplates = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'LoadEmploymentTemplates',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GenerateEmploymentProcessingTemplate = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'GenerateEmploymentProcessingTemplate',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SavePassword = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'SavePassword',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GetWebParameters = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetWebParameters',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SavePasswordReset = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'SavePasswordReset',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }
        dataFactory.LoadDetailsFromOtherForm = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'LoadDetailsFromOtherForm',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {

            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.LoadDetailsFromOtherFormList = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'LoadDetailsFromOtherFormList',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ValidateFilterReport = function (mID, data) {
            return h({
                method: 'POST',
                url: serviceBase + 'ValidateFilterReport',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'data': data, 'menuID': mID })),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.MinifyScripts = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'MinifyScripts',
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.CreateTheme = function (rID) {
            return h({
                method: 'POST',
                url: serviceBase + 'CreateTheme',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'rID': rID })),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ApplyTheme = function (rID) {
            return h({
                method: 'POST',
                url: serviceBase + 'ApplyTheme',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'rID': rID })),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.LoadDoneNotifications = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'LoadDoneNotifications',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getManpowerPlan = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'getManpowerPlan',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getJobDescription = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'getJobDescription',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: 'json'
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.AddMRFApprovers = function (mID, ID, rID) {
            return h({
                method: 'POST',
                url: serviceBase + 'AddMRFApprovers',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'ID': ID, 'rID': rID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SetDone = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'SetDone',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.UpdateAllJobDescriptions = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'UpdateAllJobDescriptions',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.UpdateEmployeeStatus = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'UpdateEmployeeStatus',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getCurrentDate = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'getCurrentDate',
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.RunScript = function (scriptText) {
            return h({
                method: 'POST',
                url: 'api/Deep/RunScript',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'script': scriptText })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getIonsFileSummary = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'getIonsFileSummary',
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getNotification = function () {
            return {
                poll: function (TotalCnt, refID) {
                    return h({
                        method: 'POST',
                        url: serviceBase + 'getNotification',
                        data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'TotalCnt': TotalCnt, 'refID': refID })),
                        dataType: 'json',
                        disableInterceptor: true,
                        ignoreLoadingBar: true
                    }).error(function (data, status, headers, config) {
                        console.log(data);
                    }).then(function (results) {
                        return results.data;
                    });
                }
            }
        }

        dataFactory.updateNotification = function (refID) {
            return h({
                method: 'POST',
                url: serviceBase + 'updateNotification',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ "refID": refID })),
                dataType: "json",
                disableInterceptor: true,
                ignoreLoadingBar: true
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.saveUploadPhoto = function (selectedFiles, empid) {
            return u.upload({
                method: 'POST',
                url: serviceBase + 'saveUploadPhoto',
                data: { Data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'file': selectedFiles, 'empid': empid })) },
                file: selectedFiles,
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getAttachments = function (refID) {
            return h({
                method: 'POST',
                url: serviceBase + 'getAttachments',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ "refID": refID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.loadList = function (rID, mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'loadList',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ "rID": rID, "mID": mID })),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.GetApproverEmployee = function (eID) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetApproverEmployee',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'eID': eID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getSecurityQuestion = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'getSecurityQuestion',
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.SaveSQ = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'SaveSQ',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.AsyncCommand = function (mID, rID, btnID, Master) {
            return h({
                method: 'POST',
                url: serviceBase + 'AsyncCommand',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'rID': rID, 'btnID': btnID, 'Master': angular.toJson(Master) })),
                dataType: "json"
                //disableInterceptor: true,
                //ignoreLoadingBar: true
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getColumnValues = function (ID_WebMenus, colID, v) {
            return h({
                method: 'POST',
                url: serviceBase + 'getColumnValues',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ "val": v, "ID_WebMenus": ID_WebMenus, "colID": colID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.addToFavourites = function (mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'addToFavourites',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID })),
                dataType: "json",
                disableInterceptor: true,
                ignoreLoadingBar: true
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.getAllFavourites = function (mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'getAllFavourites',
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.removeFromFavourites = function (mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'removeFromFavourites',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID })),
                dataType: "json",
                disableInterceptor: true,
                ignoreLoadingBar: true
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.CascadingDropdown2 = function (mID, colID, value) {
            return h({
                method: 'POST',
                url: serviceBase + 'CascadingDropdown2',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'colID': colID, 'value': value })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.getMoreRecord = function (lastID, colID) {
            return h({
                method: 'POST',
                url: serviceBase + 'getMoreRecord',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'lastID': lastID, 'colID': colID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }
        dataFactory.GetPassword = function (data) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetPassword',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json"
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                return results.data;
            });
        }

        dataFactory.ReloadLookup = function (mID, colID, master) {
            return h({
                method: 'POST',
                url: serviceBase + 'ReloadLookup',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID, 'colID': colID, 'master': master })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.GetPhotoEmployee = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetPhotoEmployee',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.AccountData = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'AccountData',
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.ApprovalBatch = function (App, Mode) {
            return h({
                method: 'POST',
                url: serviceBase + 'ApprovalBatch',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'App': App, 'Mode': Mode })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.ImageExist = function (Path) {
            return h({
                method: 'POST',
                url: serviceBase + 'ImageExist',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'Path': Path })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.EmployeeInfo = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'EmployeeInfo',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.GetTableData = function (TableCode, Columns, Filter, FilterParam) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetTableData',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'TableCode': TableCode, 'Columns': Columns, 'Filter': Filter, 'FilterParam': FilterParam })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.EmployeeApprovers = function (ID) {
            return h({
                method: 'POST',
                url: serviceBase + 'EmployeeApprovers',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': ID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }
        dataFactory.UpdateEffects = function (Effects) {
            return h({
                method: 'POST',
                url: serviceBase + 'UpdateEffects',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'Effects': Effects })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }
        dataFactory.AprilFools = function () {
            return h({
                method: 'POST',
                url: serviceBase + 'AprilFools',
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }
        dataFactory.DirectReportDataSource = function (mID) {
            return h({
                method: 'POST',
                url: serviceBase + 'DirectReportDataSource',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': mID })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.EmployeeLeaveCredit = function (eid) {
            return h({
                method: 'POST',
                url: serviceBase + 'EmployeeLeaveCredit',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': eid })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.LoadListSource = function (btnID, Param_ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'LoadListSource',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': btnID, 'Param_ID_Employee': Param_ID_Employee })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.ValidateUser = function (id) {
            return h({
                method: 'POST',
                url: serviceBase + 'ValidateUser',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'ID': id })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });

        }

        dataFactory.GetCalendarSource2 = function (StartDate, EndDate, ID_Employee) {
            return h({
                method: 'POST',
                url: serviceBase + 'GetCalendarSource2',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'StartDate': StartDate, 'EndDate': EndDate, 'ID_Employee': ID_Employee })),
                dataType: "json"
            }).error(function (data) {
                return data;
            }).then(function (results) {
                return results.data;
            });
        }

        return dataFactory;
    }


    app.factory('dataService', ['$http', '$q', '$upload', dataService]);

});