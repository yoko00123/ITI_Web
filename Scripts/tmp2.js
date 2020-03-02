'use strict';
define(['app'], function(app) {
    var c2051 = function(s, r, d, u, S) {
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
        s.rID = (S.params.ID_2051) ? parseInt(S.params.ID_2051) : 0;
        s.formButtons = r.formButtons;
        s.Parent = r.Parent;
        s.Detail = r.Detail;
        s.dropdown_source = r.dropdown_source;
        s.rdb_source = r.rdb_source;
        s.dynamicTabOptions = {
            tabs: [{
                "ID": 2052,
                "Name": "Distribution of Weight by Key Result Area",
                "Visible": true,
                "mType": 14,
                "VisibleIf": ""
            }, {
                "ID": 2053,
                "Name": "Distribution of Weight by Measure",
                "Visible": true,
                "mType": 14,
                "VisibleIf": "Parent.TotalKRAWeightAssigned2 = 100"
            }],
            gridButtons: {
                2053: [{
                    ID: 0,
                    Name: 'New',
                    Label: 'New',
                    Visible: true,
                    mID: 2053,
                    mType: 14,
                    VisibleIf: 'Parent.TotalKRAWeightAssigned2 = 100'
                }],
            },
            gridOptions: {
                2052: {
                    data: 'Detail[2052]',
                    enablePinning: true,
                    virtualizationThreshold: 50,
                    enableColumnResize: true,
                    columnDefs: [{
                        field: 'ID',
                        width: '*',
                        displayName: 'ID'
                    }, {
                        field: 'PerformanceKeyResultAreas',
                        width: '*',
                        displayName: 'KRA'
                    }, {
                        field: 'PercentWeight',
                        width: '*',
                        displayName: '% Weight'
                    }, {
                        field: 'TotalMeasuresWeight',
                        width: '*',
                        displayName: '% Weight Assigned'
                    }, {
                        field: 'Comment',
                        width: '*',
                        displayName: 'Comment'
                    }, ],
                },
                2053: {
                    data: 'Detail[2053]',
                    enablePinning: true,
                    virtualizationThreshold: 50,
                    enableColumnResize: true,
                    columnDefs: [{
                        field: 'ID',
                        width: 40,
                        pinned: true,
                        displayName: '',
                        cellTemplate: '<div class=\'ngCellText ng-scope pinned col2 colt2\' ng-class=\'col.colIndex()\'><span><a ui-sref=\'2053({ ID_2053 : row.entity.ID})\' ><i class=\'fa fa-folder\'></i></a></span></div>'
                    }, {
                        field: 'ID',
                        width: '*',
                        displayName: 'ID'
                    }, {
                        field: 'ParentCode',
                        width: '*',
                        displayName: 'Code'
                    }, {
                        field: 'SeqNo',
                        width: '15',
                        displayName: 'No.'
                    }, {
                        field: 'Name',
                        width: '200',
                        displayName: 'Name'
                    }, {
                        field: 'ID_PerformanceTBSKeyResultAreas',
                        width: '*',
                        displayName: 'KRA',
                        visible: false,
                        cellTemplate: '<input type=\'hidden\' name=\'ID_PerformanceTBSKeyResultAreas\' class=\'form-control\' ng-model=\'row.entity.ID_PerformanceTBSKeyResultAreas\'/>'
                    }, {
                        field: 'Formula',
                        width: '150',
                        displayName: 'Formula'
                    }, {
                        field: 'ScoringParameter',
                        width: '130',
                        displayName: 'Scoring Parameter'
                    }, {
                        field: 'Entities',
                        width: '80',
                        displayName: 'Entity to Cascade to'
                    }, {
                        field: 'IsCascadeToAllDesignations',
                        width: '50',
                        displayName: 'Cascade to All Positions',
                        cellTemplate: '<div ng-class=\'for_checkbox\'><input type=\'checkbox\' name=\'IsCascadeToAllDesignations\' class=\'form-checkbox\' ng-model=\'row.entity.IsCascadeToAllDesignations\'/></div>'
                    }, {
                        field: 'PerformanceAppraisalScoring',
                        width: '40',
                        displayName: 'Target Rating'
                    }, {
                        field: 'PercentWeight',
                        width: '30',
                        displayName: 'CBS % Wt.'
                    }, {
                        field: 'KRAPercentWeight',
                        width: '30',
                        displayName: 'KRA % Wt.'
                    }, {
                        field: 'FinalPercentWeight',
                        width: '30',
                        displayName: 'Final % Wt.'
                    }, {
                        field: 'ID_PerformanceDOCScale',
                        width: '50',
                        displayName: 'DOC',
                        cellTemplate: '<div ng-form name=\'x\'><label ng-repeat=\'rdb in rdb_source[10591]\'><input type=\'radio\' name=\'ID_PerformanceDOCScale\' class=\'form-control\' ng-model=\'row.entity.ID_PerformanceDOCScale\' ng-value=\'rdb.ID\'/>{{rdb.Name}}</label></div>},{ field: '
                        AdjRating ',width:'
                        30 ',displayName : '
                        Adj.Rating '},{ field: '
                        AuditDocView ',width:'
                        80 ',displayName : '
                        Audit Doc.
                        '},{ field: '
                        ID_PerformanceCBSMeasures ',width:' * ',displayName : '
                        CBS Measure ',visible : false,cellTemplate : ' < input type = \'hidden\' name=\'ID_PerformanceCBSMeasures\' class=\'form-control\' ng-model=\'row.entity.ID_PerformanceCBSMeasures\'/>'
                    }, ],
                },
            }
        };
    };
    app.register.controller('c2051', ['$scope', 'resources', 'dataService', 'utilService', '$state', c2051]);
});