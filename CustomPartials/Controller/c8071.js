'use strict';
define(['app'], function (app) {
    var c8071 = function ($c, s, r, d, u, S, g, SS) {
        s.FilingType = []
        s.Approve = []
        s.SelectedRows = []
        s.NameSelectAll = 'Select All'
        s.gridOptions = {
            8070: {
                data: 'gridData[8070]',
                columnDefs: [{
                    field: '$$',
                    width: 30,
                    sortable: false,
                    resizable: false,
                    displayName: ' ',
                    cellTemplate: '<div class=\'m-grid-cell-contents\' ><span><a ui-sref=\'8070({ ID_8070:row.entity.$$rID})\'><i class=\'fa fa-folder\'></i></a></span></div>'
                }, {
                    field: 'ID',
                    width: '*',
                    displayName: 'ID'
                }, {
                    field: 'Name',
                    width: '*',
                    displayName: 'Name',
                    cellTemplate: '<div class=\'m-grid-cell-contents \'><span class=\'control-label\' ng-bind-html=\'row.entity.Name | trustedHTML\'></span></div>'
                }, {
                    field: 'Employee',
                    width: '*',
                    displayName: 'Employee'
                }, {
                    field: 'StartDate',
                    width: '*',
                    displayName: 'StartDate',
                    headerCellTemplateUrl: 'mgrid/headerCellTemplateDate.html',
                    cellFilter: 'date:\'MM/dd/yyyy\''
                }, {
                    field: 'EndDate',
                    width: '*',
                    displayName: 'EndDate',
                    headerCellTemplateUrl: 'mgrid/headerCellTemplateDate.html',
                    cellFilter: 'date:\'MM/dd/yyyy\''
                }, {
                    field: 'FilingStatus',
                    width: '*',
                    displayName: 'Filing Status'
                }, {
                    field: 'ApproverStatus',
                    width: '*',
                    displayName: 'Approver Status'
                }, ]
            },
        };

        $c('BaseListController', {
            $scope: s,
            resources: r
        });
        s.Init = (function () {
            var f = Enumerable.From(s.gridData[8070]).Select(function (x) { return { ID: x.ID_Name, Name: x.Name } }).Distinct(function (x) { return x.Name }).ToArray()
            s.FilingType = f;
            s.gridData[8070].sort(function (a, b) {
                return b.ID - a.ID
            });
        });

        s.FilingFilter = (function (ID_Name) {
            return function (ft) {
                return ft.ID_Name === ID_Name;
            }
        })

        s.SelectToggle = (function (ID, FT) {
            if (window.event.currentTarget.checked)
                s.SelectedRows.push({ ID: ID, FilingType: FT })
            else
                vcl.Array.Remove(s.SelectedRows, function (x) { return x.ID === ID && x.FilingType === FT });
        });


        s.SelectAll = (function (ID) {
            var checkbox = $('.gridcbox');
            if ($('#gridmbox' + ID).prop('checked')) {
                Enumerable.From(s.gridData[8070]).Where(function (x) { return x.ID_Name === ID }).ForEach(function (x) {
                    s.SelectToggle(x.ID, ID)
                })
                $('.gridcbox' + ID).prop('checked', true);
            } else {
                Enumerable.From(s.gridData[8070]).Where(function (x) { return x.ID_Name === ID }).ForEach(function (x) {
                    s.SelectToggle(x.ID, ID)
                })
                $('.gridcbox' + ID).prop('checked', false);
            }
        })
        s.BApprove = (function (Mode) {
            if (Mode === 0) {
                d.ApprovalBatch(s.SelectedRows, Mode).then(function (a) {
                    g.add(a.message, "info", 2000);

                })
            } else {
                d.ApprovalBatch(s.SelectedRows, Mode).then(function (a) {
                    g.add(a.message, "danger", 2000);
                })
            }
            setTimeout(function () {
                s.Refresh()
            }, 2000)
        })

        s.SelectAllFT = (function () {
            if (s.NameSelectAll === 'Select All') {
                Enumerable.From(s.FilingType).ForEach(function (x) {
                    $('#gridmbox' + x.ID).prop('checked', true)
                    $('.gridcbox' + x.ID).prop('checked', true);
                })
                Enumerable.From(s.gridData[8070]).ForEach(function (x) {
                    if (x.ID_Name != 1) {
                        s.SelectedRows.push({ ID: x.ID, FilingType: x.ID_Name })
                    }
                    //s.SelectedRows.push({ ID: x.ID, FilingType: x.ID_Name })
                })
                s.NameSelectAll = 'UnSelect All'
            } else {
                Enumerable.From(s.FilingType).ForEach(function (x) {
                    $('#gridmbox' + x.ID).prop('checked', false)
                    $('.gridcbox' + x.ID).prop('checked', false);
                })
                Enumerable.From(s.gridData[8070]).ForEach(function (y) {
                    vcl.Array.Remove(s.SelectedRows, function (x) { return x.ID === y.ID && x.FilingType === y.ID_Name });
                })
                s.NameSelectAll = 'Select All'
            }
        })
 
         
    };
    app.register.controller('c8071', ['$controller', '$scope', 'resources', 'dataService', 'utilService', '$state', 'growlNotifications', 'Session', c8071]);
});