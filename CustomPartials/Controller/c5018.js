'use strict';
define(['app'], function(app) {
    var c5018 = function(s, r, d, u, S, g, T, SS, ck) {
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
        s.mID = 5018;
        s.rID = S.params.ID_5018;
        s.goPrevious = function() {
            S.go('5017', {}, {
                reload: true,
                inherit: false,
                notify: true
            });
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
        s.detailedValuelookup_source = r.detailedValuelookup_source;
        s.gridOptions = {};
        s.removeRow = function(mID, row) {
            var idx = s.Detail[mID].indexOf(row.entity);
            if (row.entity.ID == 0) {
                s.Detail[mID].splice(idx, 1);
            } else {
                d.GridDelete(mID, row.entity.ID).then(function(results) {
                    s.Detail[mID].splice(idx, 1);
                });
            }
        };
        s.setID = function(data, target, b) {
            data[target.substring(3)] = b.Name;
            data[target] = b.ID;
        };
        s.getAutoCompleteItems = function(mID, colID, value) {
            return d.getAutoCompleteItems(mID, colID, value).then(function(results) {
                return results.items;
            });
        };
        s.tabs = [];
        s.tabs.activeTab = (localStorage.getItem("mID") == s.mID ? (localStorage.getItem("tab") == undefined ? 0 : localStorage.getItem("tab")) : 0);
        localStorage.removeItem("mID");
        localStorage.removeItem("tab");
        s.loadedTab = [];
        s.loadTab = function(mID) {
            if (s.loadedTab.indexOf(mID) == -1) {
                d.loadTab(mID, s.rID).then(function(results) {
                    s.Detail[mID] = results.data;
                    s.loadedTab.push(mID);
                });
            }
        };
        s.selectedFiles = [];
        s.onFileSelect = function($files, mID, name, idx) {
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
        };
        s.CascadingDropdown = function(mID, colID, value, dropdown) {
            d.CascadingDropdown(mID, colID, value).then(function(results) {
                var a = dropdown.split(",");
                for (var i = 0; i < a.length; i++) {
                    s.dropdown_source[a[i]] = results.data[a[i]];
                }
            });
        };
        ck.check(s);
		
		s.CreateTheme = function(){
			d.CreateTheme(s.rID).then(function(results){
				g.add(results.message, "info", 5000);
			});
		};
		s.ApplyTheme = function () {
		    d.ApplyTheme(s.rID).then(function (results) {
		        g.add(results.message, "info", 5000);
		    });
		};
    };
    app.register.controller('c5018', ['$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', '$templateCache', 'Session', 'ckFormPristine', c5018]);
});