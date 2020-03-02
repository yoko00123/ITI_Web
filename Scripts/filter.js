'use strict';

define(['app'],function (app) {

    app.filter('trustedHTML', ['$sce', function ($sce) {
        return function (v) {
            var r = /<script>.*(<\/?script>?)?/gi;
            //return (v == null ? null : v.replace("<", "&lt;").replace(">", "&gt;"));
            //console.log(typeof v, v);
            //return $sce.trustAsHtml((v == null || v.length == 0 ? null : v.replace(/<script>/g, "&lt;script&gt;").replace(/<\/script>/g, "&lt;/script&gt;"))); //v.replace(r,'')

            return $sce.trustAsHtml((v == null || v.length == 0 ? null : v.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&lt;br&gt;|&lt;br\/&gt;/g, "<br>") ));
        }
    }]).filter('sum', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }
            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                sum = sum + data[i][key];
            }
            return sum;
        }
    }).filter('filteredData', ['$parse', function ($parse) {
        return function (data, filter) {
            if (typeof (filter) === 'undefined' || filter == null) {
                return data;
            }

            var d = [], f = filter.replace('row.', '');
            angular.forEach(data, function (item) {
                if ($parse(f)(item)) {
                    d.push(item);
                }
            });
            return d;
        }
    }]).filter('SortInGrouping', function () {
        return function (data, ColumnToSort) {
            console.log(data);
            return data;
        }
    }).filter('filterColumns', function () {
        return function (data, columns) {
            var cols = columns.split(",");
            var filtered = [];
            angular.forEach(data, function (item) {
                if (cols.indexOf(item.field) == -1) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    }).filter('filterColumnsByVisible', function () {
        return function (data, columns) {
            var cols = columns.split(",");
            var filtered = [];
            angular.forEach(data, function (item) {
                if (cols.indexOf(item.field) == -1 && item.visible === true) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    }).filter('dynamicFilter',['$interpolate', function (i) {
        return function (value, filterName) {
            if (filterName === undefined || filterName === null) {
                return value;
            }
            return i('{{value | ' + arguments[1] + '}}')({ value: arguments[0] });
        }
    }]).filter('daterange', function () {
        return function (data, column, start_date, end_date) {
            var result = [];

            var start_date = (start_date && !isNaN(Date.parse(start_date))) ? Date.parse(start_date) : 0;
            var end_date = (end_date && !isNaN(Date.parse(end_date))) ? Date.parse(end_date) : 0;
            if (data.length > 0) {
                $.each(data, function (index, datarow) {
                    var rMonth = new Date(datarow[column]).getMonth() + 1;
                    var rDay = new Date(datarow[column]).getDate();
                    var rYear = new Date(datarow[column]).getFullYear();
                    var dataDate = Date.parse( new Date(rMonth + '/' + rDay + '/' + rYear));
                    if ((dataDate >= start_date && dataDate <= end_date) || start_date == 0) {
                        result.push(datarow);
                    }
                });
                return result;
            }
        };
    });;

});