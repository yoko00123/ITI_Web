! function () {
    "use strict";
    angular.module("mGrid", [])
}(),
function () {
    "use strict";
    angular.module("mGrid").factory("GridColumn", ["mGridUtil", "$compile", "$templateCache", function (a, b, c) {
        var d = function (b, c, d) {
            var e = this;
            e.grid = d, e.colDef = b, e.$$uid = c, e.field = b.field, e.displayName = b.displayName, e.width = a.isNullOrUndefined(b.width) || "*" == b.width ? 10 * ((e.displayName ? e.displayName.length : e.field.length) + 3) : parseInt(b.width), angular.forEach(["sortable", "visible", "resizable"], function (c) {
                e[c] = a.isNullOrUndefined(b[c]) ? !0 : b[c]
            }), angular.forEach(["pinned"], function (c) {
                e[c] = a.isNullOrUndefined(b[c]) ? !1 : b[c]
            }), e.cellFilter = e.colDef.cellFilter, e.headerCellTemplate = e.colDef.headerCellTemplate, e.cellTemplate = e.colDef.cellTemplate, e.preCompileTemplates(), e.colDef.aggregateTypes && (e.aggregateTypes = e.colDef.aggregateTypes)
        };
        return d.prototype.preCompileTemplates = function () {
            var a = this;
            !a.headerCellTemplate && a.colDef.headerCellTemplateUrl ? a.headerCellTemplate = c.get(a.colDef.headerCellTemplateUrl) : a.headerCellTemplate || (a.headerCellTemplate = c.get("mgrid-templates/headercell.html")), a.headerCompiledElementFn = b(a.headerCellTemplate), a.cellTemplate || (a.cellTemplate = c.get("mgrid-templates/mgridcell.html")), a.grid.hasGrouping() && a.grid.options.hideGroupedValues && a.colDef.grouping && (a.cellTemplate = c.get("mgrid-templates/mgridcell-noop.html")), a.cellTemplate = a.cellTemplate.replace(/COL_FIELD/g, "row.entity." + a.field).replace(/CELL_FILTER/g, a.cellFilter ? "|" + a.cellFilter : ""), a.compiledElementFn = b(a.cellTemplate), a.grid.hasGrouping() && a.grid.options.hideGroupedValues && a.colDef.grouping && (a.cellTemplate = c.get("mgrid-templates/mgridcell-noop.html")), a.grid.hasGrouping() && (a.groupCellTemplate = c.get("mgrid-templates/mgridcell.html").replace(/COL_FIELD/g, "row.entity." + a.field).replace(/CELL_FILTER/g, a.cellFilter ? "|" + a.cellFilter : ""), a.groupCompiledElementFn = b(a.groupCellTemplate))
        }, d.prototype.aggregateText = function (a) {
            return a.toUpperCase() + " : "
        }, d.prototype.aggregateValues = function (a) {
            var b = this,
                c = function () {
                    var a = [];
                    return _.each(b.grid.rows, function (c) {
                        null === c.entity[b.field] || void 0 === c.entity[b.field] || isNaN(c.entity[b.field]) || a.push(parseInt(c.entity[b.field]))
                    }), a
                };
            return "count" === a ? b.grid.rows.length : "sum" === a ? _.reduce(c(), function (a, b) {
                return a + b
            }, 0) : "max" === a ? Math.max.apply(null, c()) : "min" === a ? Math.min.apply(null, c()) : "avg" === a ? _.reduce(c(), function (a, b) {
                return a + b
            }, 0) / b.grid.rows.length : null
        }, d
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridCell", ["$compile", "$templateCache", function (a, b) {
        return {
            restrict: "EA",
            require: "?^mGrid",
            scope: !1,
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        function e() {
                            h(a, function (c, d) {
                                b.replaceWith(c), f.options.allowCellNavigation && (c.bind("click", function (b) {
                                    f.events.raise.cellNav(b, {
                                        row: a.row,
                                        column: a.column
                                    })
                                }), f.events.on.cellNav(a, function (b, d) {
                                    d.row === a.row && d.column === a.column ? a.focused = !a.focused : a.focused = !1, a.focused ? c.addClass("m-grid-cell-focus") : c.removeClass("m-grid-cell-focus")
                                }))
                            })
                        }
                        var f = d.grid;
                        a.appScope = f.appScope, a.focused = !1;
                        var g = ["$$selectedRowHeader", "$$grpRowHeader"],
                            h = a.row.$$group && -1 == g.indexOf(a.column.field) ? a.column.groupCompiledElementFn : a.column.compiledElementFn;
                        try {
                            e()
                        } catch (i) {
                            console.log("ERROR")
                        }
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridCellSelect", ["$parse", function (a) {
        return {
            restrict: "EA",
            require: "^mGrid",
            scope: !0,
            compile: function () {
                return {
                    post: function (b, c, d, e) {
                        function f(b) {
                            if (void 0 === h || 0 == h.length) return !0;
                            try {
                                return a(h.replace(/row.entity./g, ""))(b)
                            } catch (c) {
                                return !1
                            }
                            return !0
                        }
                        var g = e.grid,
                            h = g.options.multiSelectIf;
                        b.selectClass = function (b) {
                            return h ? b.$$group || 0 != a(h.replace(/row.entity./g, ""))(b.entity) ? "" : "row-unselectable" : ""
                        }, c.bind("click", function (a) {
                            a.stopPropagation();
                            var c = g.visibleRows.indexOf(b.row);
                            if (a.shiftKey)
                                for (var d = g.lastSelectedRow < c ? g.lastSelectedRow : c, e = g.lastSelectedRow > c ? g.lastSelectedRow : c, h = d; e >= h; h++) f(g.visibleRows[h].entity) && (g.visibleRows[h].$$selected = !0);
                            else (f(b.row.entity) || g.hasGrouping() && b.row.$$group) && (g.lastSelectedRow = c, b.row.$$selected = b.row.$$selected ? !1 : !0), g.hasGrouping() && b.row.$$group && i(g.rows, g.groups, g.groupCache, b.row, !1);
                            g.refresh()
                        });
                        var i = function (a, b, c, d, e) {
                            if (!b.length) {
                                if (!e) return;
                                return void _.each(a, function (a, b) {
                                    f(a.entity) && (a.$$selected = d.$$selected)
                                })
                            }
                            var g = _.chain(a).groupBy(function (a) {
                                return a.entity[b[0].field]
                            }).value(),
                                h = b.slice(1);
                            if (e)
                                for (var j in c) c[j].row.$$selected = d.$$selected;
                            var k = _.keys(g);
                            for (var j in k) {
                                var l = k[j];
                                c[l].row.$$uid == d.$$uid || e ? i(g[l], h, c[l].children, d, !0) : d.$$groupLevel < b.length && !e && i(g[l], h, c[l].children, d, !1)
                            }
                        }
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridColumnFooter", ["$compile", function (a) {
        return {
            templateUrl: "mgrid-templates/m-grid-column-footer.html",
            restrict: "A",
            replace: !0,
            require: "^mGrid",
            scope: {
                columns: "=mGridColumnFooter",
                container: "=mGridColumnContainer"
            },
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        var e = d.grid;
                        a.grid = e
                    },
                    post: function (a, b, c, d) { }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridContainer", function () {
        return {
            templateUrl: "mgrid-templates/rendercontainer.html",
            restrict: "EA",
            replace: !0,
            require: ["^mGrid"],
            scope: !1,
            link: function (a, b, c, d) { }
        }
    })
}(),
function () {
    "use strict";
    angular.module("mGrid").controller("mGridController", ["$scope", "Grid", "$timeout", "$rootScope", "$parse", "$templateCache", "$compile", function (a, b, c, d, e, f, g) {
        var h = this;
        a.grid = h.grid = new b(a.mGrid), a.grid.data = angular.isString(a.mGrid.data) ? a.$parent.$eval(a.mGrid.data) ? a.$parent.$eval(a.mGrid.data) : [] : a.mGrid.data, a.grid.currentPage = 0 == a.grid.data.length ? 0 : 1, a.grid.initializeColumns(), a.grid.generateHashMap(), a.grid.appScope = a.grid.appSope || a.$parent, h.grid.registerApi();
        var i, j;
        i = angular.isString(a.mGrid.data) ? a.$parent.$watchCollection(a.mGrid.data, function (b, c) {
            c !== b && a.$evalAsync(function () {
                h.grid.data = b, h.grid.currentPage = 0 == h.grid.data.length ? 0 : h.grid.currentPage, h.grid.generateHashMap(), h.grid.buildRows()
            })
        }) : a.$parent.$watchCollection(function () {
            return a.mGrid.data
        }, function (b, c) {
            b !== c && a.$evalAsync(function () {
                h.grid.data = a.mGrid.data, h.grid.currentPage = 0 == h.grid.data.length ? 0 : h.grid.currentPage, h.grid.generateHashMap(), h.grid.buildRows()
            })
        }, !0), a.columnDefs = a.mGrid.columnDefs, j = a.$watch(function () {
            return a.mGrid.columnDefs
        }, function (b, c) {
            c !== b && a.$evalAsync(function () {
                var c = angular.element(a.grid.element)[0].getBoundingClientRect().width;
                c > 0 && a.grid.gridWidth !== c - 10 && (a.grid.gridWidth = c - 10), a.grid.options.columnDefs = b, a.grid.initializeColumns(), a.grid.setColumnDisplay(), a.grid.refreshCanvas(), a.grid.refresh()
            })
        }, !0), a.$on("$destroy", function () {
            i(), j()
        })
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").factory("Grid", ["GridColumn", "mGridUtil", "$timeout", "$compile", "$templateCache", "$rootScope", "$filter", function (a, b, c, d, e, f, g) {
        var h = function (a) {
            this.options = a, this.id = "m-grid-" + Math.floor(1e5 * Math.random(), 6), this.gridHeight = a.height ? a.height : 400, this.gridWidth = 0, this.rowHeight = a.rowHeight ? a.rowHeight : 30, this.recordsPerBody = Math.floor((this.gridHeight - 15) / this.rowHeight), this.rows = [], this.columns = [], this.scrollTop = 0, this.scrollLeft = 0, this.isScrolling = 0, this.visibleColumns = [], this.visibleRows = [], this.pinnedColumns = [], this.rowDisplayStart = 0, this.rowDisplayEnd = 2 * this.recordsPerBody, this.columnDisplayStart = 0, this.columnDisplayEnd = 0, this.groups = [], this.groupCache = {}, this.groupInitialized = !1, this.collapsedAll = !0, this.currentPage = a.currentPage ? a.currentPage : 1, this.currentPageSize = a.currentPageSize ? a.currentPageSize : 10, this.pageSizes = a.pageSizes ? a.pageSizes : [10, 20, 50, 100, "All"], this.currentSortColumn = a.currentSortColumn, this.currentSortDirection = a.currentSortDirection, this.totalServerItems = a.totalServerItems, this.events = [], this.listeners = [], this.registerEvent("sortChange"), this.registerEvent("pageChange"), this.registerEvent("cellNav"), this.registerMethod("refresh", this.refresh), this.registerMethod("getSelectedRows", this.getSelectedRows), this.registerMethod("getGridPagingState", this.getGridPagingState), this.registerMethod("downloadCSV", this.downloadCSV)
        };
        return h.prototype.initializeColumns = function () {
            var b = this;
            if (b.columns = [], b.options.enableGrouping && (b.groups.length = 0, _.chain(b.options.columnDefs).filter(function (a) {
                    return void 0 !== a.grouping
            }).sortBy(function (a) {
                    return a.grouping.seqNo
            }).each(function (a, c) {
                    b.groups.push(a)
            })), b.hasGrouping()) {
                var c = 0;
                _.chain(b.options.columnDefs).filter(function (a) {
                    return void 0 !== a.grouping
                }).sortBy(function (a) {
                    return a.grouping.seqNo
                }).each(function (d) {
                    b.columns.push(new a(d, c, b)), c++
                }), _.chain(b.options.columnDefs).filter(function (a) {
                    return void 0 === a.grouping
                }).each(function (d) {
                    b.columns.push(new a(d, c, b)), c++
                })
            } else
                for (var c = 0; c < b.options.columnDefs.length; c++) b.columns.push(new a(b.options.columnDefs[c], c, b));
            b.setVisibleColumns()
        }, h.prototype.resizeColumnWidth = function () {
            var a = this.getTotalColumnWidth(),
                c = this.hasPinnedContainer() ? this.gridWidth - this.pinnedContainerWidth() : this.gridWidth;
            if (c > a) {
                var d = c - a,
                    e = this.visibleColumns.filter(function (a) {
                        return b.isNullOrUndefined(a.colDef.width) || "*" == a.colDef.width
                    }).length;
                if (e > 0) {
                    var f = Math.floor(d / e, 2);
                    _.each(this.visibleColumns.filter(function (a) {
                        return b.isNullOrUndefined(a.colDef.width) || "*" == a.colDef.width
                    }), function (a, b) {
                        a.width += f
                    })
                } else {
                    var f = Math.floor(d / this.visibleColumns.length, 2);
                    _.each(this.visibleColumns, function (a, b) {
                        a.width += f
                    })
                }
            }
        }, h.prototype.getTotalColumnWidth = function () {
            return b.sumByProperty(this.visibleColumns, "width")
        }, h.prototype.buildColumns = function () {
            var a = this;
            a.renderedColumns = a.visibleColumns.slice(a.columnDisplayStart, a.columnDisplayEnd)
        }, h.prototype.buildPinnedColumns = function () {
            var a = this;
            a.pinnedColumns = [], a.options.multiSelect && a.pinnedColumns.push({
                $$uid: "xxx",
                field: "$$selectedRowHeader",
                displayName: " ",
                width: 40,
                cellTemplate: e.get("mgrid-templates/selectedRowHeader.html"),
                headerCellTemplate: e.get("mgrid-templates/selectedRowHeaderCell.html"),
                sortable: !1,
                pinned: !0,
                resizable: !1,
                showColumnMenu: !1,
                compiledElementFn: d(e.get("mgrid-templates/selectedRowHeader.html")),
                headerCompiledElementFn: d(e.get("mgrid-templates/selectedRowHeaderCell.html"))
            }), a.hasGrouping() && a.pinnedColumns.push({
                $$uid: "grp",
                field: "$$grpRowHeader",
                displayName: " ",
                width: 40 * a.groups.length,
                cellTemplate: e.get("mgrid-templates/groupRowHeader.html"),
                headerCellTemplate: e.get("mgrid-templates/groupRowHeaderCell.html"),
                sortable: !1,
                pinned: !0,
                resizable: !1,
                showColumnMenu: !1,
                compiledElementFn: d(e.get("mgrid-templates/groupRowHeader.html")),
                headerCompiledElementFn: d(e.get("mgrid-templates/groupRowHeaderCell.html"))
            }), a.options.enablePinning && (a.pinnedColumns = a.pinnedColumns.concat(a.columns.filter(function (a) {
                return a.pinned && a.visible === !0
            })))
        }, h.prototype.buildRows = function () {
            var a = this;
            a.setVisibleRows(), a.renderedRows = a.visibleRows.slice(a.rowDisplayStart, a.rowDisplayEnd)
        }, h.prototype.sortData = function (a) {
            var b = this;
            return b.currentSortColumn && (a = _.sortBy(a, function (a) {
                return a.entity[b.currentSortColumn]
            })), "DESC" === b.currentSortDirection && a.reverse(), a
        }, h.prototype.generateHashMap = function () {
            var a = this,
                c = d(e.get("mgrid-templates/m-grid-row.html")),
                f = d(e.get("mgrid-templates/m-grid-row-pinned.html"));
            a.options.multiSelectIf;
            a.rows.length = 0;
            for (var g = 0; g < a.data.length; g++) a.rows.push({
                $$uid: b.nextUid(),
                $$rowIndex: g,
                $$selected: !1,
                $$group: !1,
                $$visible: !0,
                $$selectable: !0,
                $$groupLevel: -1,
                entity: a.data[g],
                rowTemplateFn: c,
                rowPinnedTemplateFn: f
            })
        }, h.prototype.refreshCanvas = function () {
            this.buildColumns(), this.buildRows(), this.hasPinnedContainer() && this.buildPinnedColumns(), this.resizeColumnWidth()
        }, h.prototype.refresh = function () {
            var a = this;
            return a.gridRefreshCanceller && c.cancel(a.gridRefreshCanceller), a.gridRefreshCanceller = c(function () { }), a.gridRefreshCanceller.then(function () {
                a.gridRefreshCanceller = null
            }), a.gridRefreshCanceller
        }, h.prototype.setVisibleColumns = function () {
            var a = this;
            a.visibleColumns.length = 0;
            for (var b = 0; b < a.columns.length; b++) a.options.enablePinning ? a.columns[b].visible && 0 == a.columns[b].pinned && a.visibleColumns.push(a.columns[b]) : a.columns[b].visible && a.visibleColumns.push(a.columns[b])
        }, h.prototype.setVisibleRows = function () {
            var a = this,
                b = [];
            if (a.options.enablePagination && !a.options.useExternalPagination)
                if ("string" == typeof a.currentPageSize && "all" === a.currentPageSize.toLowerCase()) b = a.sortData(a.rows);
                else {
                    var c = (a.currentPage - 1) * a.currentPageSize;
                    b = a.sortData(a.rows).slice(c, c + a.currentPageSize)
                }
            else b = a.sortData(a.rows);
            a.hasGrouping() && (b = a.groupRows(b)), a.visibleRows = b
        }, h.prototype.groupRows = function (a) {
            var c = this,
                f = [],
                h = d(e.get("mgrid-templates/m-grid-row.html")),
                i = d(e.get("mgrid-templates/m-grid-row-pinned.html")),
                j = function (a, d, e) {
                    if (!d.length) return void _.each(a, function (a, b) {
                        f.push(a)
                    });
                    var k = _.chain(a).groupBy(function (a) {
                        return a.entity[d[0].field]
                    }).value(),
                        l = d.slice(1),
                        m = _.keys(k);
                    c.currentSortColumn === d[0] && (m = _.sortBy(m, function (a) {
                        return a
                    }), "DESC" === c.currentSortDirection && m.reverse());
                    for (var n in m) {
                        var o = m[n],
                            p = new Object,
                            q = "";
                        if (d[0].cellFilter) try {
                            var r = d[0].cellFilter.split(":");
                            q = 1 == r.length ? g(r[0])(o) : g(r[0])(o, r[1].replace(/'/g, ""))
                        } catch (s) {
                            console.log(s), q = null
                        } else q = o;
                        if (d[0].grouping.groupAggregation) switch (d[0].grouping.groupAggregation.toLowerCase()) {
                            case "count":
                                q += " (" + d[0].grouping.groupAggregation.toUpperCase() + ":" + k[o].length + ")"
                        }
                        if (p[d[0].field] = q, !e[o]) {
                            var t = {
                                $$uid: b.nextUid(),
                                $$selected: !1,
                                $$group: !0,
                                $$visible: !0,
                                $$collapsed: !0,
                                $$selectable: !0,
                                $$groupLevel: d.length,
                                entity: p,
                                rowTemplateFn: h,
                                rowPinnedTemplateFn: i
                            };
                            e[o] = new Object, e[o].children = new Object, e[o].row = t
                        }
                        f.push(e[o].row), c.groupInitialized ? c.groupInitialized && e[o].row.$$collapsed && j(k[o], l, e[o].children) : j(k[o], l, e[o].children)
                    }
                };
            return j(a, c.groups, c.groupCache), c.groupInitialized = !0, f
        }, h.prototype.setGroupCache = function () {
            var a = this;
            a.groupCache = {}
        }, h.prototype.setColumnDisplay = function () {
            var a = this,
                b = 0,
                c = a.gridWidth,
                d = !1,
                e = !1;
            a.columnDisplayStart = 0, a.columnDisplayEnd = a.visibleColumns.length;
            for (var f = 0; f < a.visibleColumns.length; f++) b += a.visibleColumns[f].width, b > a.scrollLeft && !d && (a.columnDisplayStart = Math.max(f, 0), d = !0), b > c + a.scrollLeft && !e && (a.columnDisplayEnd = Math.min(f + 3, a.visibleColumns.length), e = !0)
        }, h.prototype.setRowDisplay = function () {
            this.rowDisplayStart = Math.max(0, Math.floor(this.scrollTop / this.rowHeight) - 1.5 * this.recordsPerBody), this.rowDisplayEnd = Math.min(this.rowDisplayStart + 4 * this.recordsPerBody, this.visibleRows.length)
        }, h.prototype.getViewPortHeight = function () {
            return this.rows.length * this.rowHeight
        }, h.prototype.hasPinnedContainer = function () {
            return this.options.multiSelect || this.options.enablePinning && this.columns.filter(function (a) {
                return a.pinned === !0 && a.visible === !0
            }).length > 0 || this.hasGrouping()
        }, h.prototype.hasGrouping = function () {
            return this.options.enableGrouping && this.groups.length > 0
        }, h.prototype.buildStyles = function () {
            var a = this,
                b = "";
            return a.columns.map(function (c, d) {
                b += "." + a.id + " .m-grid-col_" + d + "{", b += "min-width:" + c.width + "px;", b += "max-width:" + c.width + "px;", b += "}"
            }), b += "." + a.id + " .m-grid-col_xxx{", b += "min-width:40px;", b += "max-width:40px;", b += "}", b += "." + a.id + " .m-grid-col_grp{", b += "min-width:" + 40 * a.groups.length + "px;", b += "max-width:" + 40 * a.groups.length + "px;", b += "}", void 0 !== a.rowHeight && (b += "." + a.id + " .m-grid-row,." + a.id + " .m-grid-cell{", b += "height:" + a.rowHeight + "px!important;", b += "}"), b
        }, h.prototype.headerStyle = function () {
            return {
                width: this.gridWidth - this.pinnedContainerWidth() + "px"
            }
        }, h.prototype.viewPortStyle = function () {
            return {
                overflowY: this.getViewPortHeight() > this.gridHeight - 15 ? "auto" : "auto",
                height: this.gridHeight - 15 + "px",
                width: this.gridWidth - this.pinnedContainerWidth() + "px"
            }
        }, h.prototype.canvasStyle = function () {
            var a = this.getTotalColumnWidth(),
                b = this.hasPinnedContainer() ? this.gridWidth - this.pinnedContainerWidth() : this.gridWidth;
            return {
                width: (b > a ? b : a) + "px"
            }
        }, h.prototype.topRowStyle = function () {
            return {
                width: this.gridWidth - this.pinnedContainerWidth() + "px",
                height: this.rowDisplayStart * this.rowHeight + "px"
            }
        }, h.prototype.bottomRowStyle = function () {
            return {
                width: this.gridWidth - this.pinnedContainerWidth() + "px",
                height: (this.visibleRows.length - this.rowDisplayEnd) * this.rowHeight + "px"
            }
        }, h.prototype.leftColumnStyle = function () {
            return {
                width: b.sumByProperty(this.visibleColumns.slice(0, this.columnDisplayStart), "width") + "px",
                height: this.visibleRows.length * this.rowHeight + "px"
            }
        }, h.prototype.pinnedHeaderStyle = function () {
            return {
                width: this.pinnedContainerWidth() + "px"
            }
        }, h.prototype.pinnedViewPortStyle = function () {
            return {
                width: this.pinnedContainerWidth() + "px",
                height: this.gridHeight - 25 + "px",
                overflowY: "hidden"
            }
        }, h.prototype.pinnedCanvasStyle = function () {
            return {
                width: this.pinnedContainerWidth() + "px"
            }
        }, h.prototype.pinnedTopRowStyle = function () {
            return {
                width: this.pinnedContainerWidth() + "px",
                height: this.rowDisplayStart * this.rowHeight + "px"
            }
        }, h.prototype.pinnedBottomRowStyle = function () {
            return {
                width: this.pinnedContainerWidth() + "px",
                height: (this.rows.length - this.rowDisplayEnd) * this.rowHeight + "px"
            }
        }, h.prototype.pinnedContainerWidth = function () {
            return b.sumByProperty(this.pinnedColumns, "width")
        }, h.prototype.getMarginLeft = function () {
            return this.scrollLeft - b.sumByProperty(this.visibleColumns.slice(0, this.columnDisplayStart), "width")
        }, h.prototype.columnFooterStyle = function (a) {
            return {
                width: ("body" === a ? this.gridWidth - this.pinnedContainerWidth() : this.pinnedContainerWidth()) + "px"
            }
        }, h.prototype.getNumOfPages = function () {
            var a = this.totalServerItems ? this.totalServerItems : this.rows.length;
            return "string" == typeof this.currentPageSize && "all" === this.currentPageSize.toLowerCase() ? a > 0 ? 1 : 0 : Math.ceil(a / this.currentPageSize)
        }, h.prototype.sortChange = function () {
            this.buildRows()
        }, h.prototype.getGridPagingState = function () {
            return {
                currentPageSize: this.currentPageSize,
                currentPage: this.currentPage,
                currentSortColumn: this.currentSortColumn,
                currentSortDirection: this.currentSortDirection
            }
        }, h.prototype.registerEvent = function (a) {
            var b = this,
                c = b.events;
            c.on || (c.on = {}, c.raise = {});
            var d = b.id + "-" + a;
            c.raise[a] = function () {
                f.$emit.apply(f, [d].concat(Array.prototype.slice.call(arguments)))
            }, c.on[a] = function (a, c) {
                var e = f.$on(d, function (a) {
                    var d = Array.prototype.slice.call(arguments);
                    d.splice(0, 1), c.apply(b, d)
                }),
                    g = {
                        handler: c,
                        dereg: e,
                        eventID: d
                    };
                b.listeners.push(g);
                var h = function () {
                    g.dereg();
                    var a = b.listeners.indexOf(g);
                    b.listeners.splice(a, 1)
                };
                return a.$on("$destroy", function () {
                    h()
                }), h
            }
        }, h.prototype.getSelectedRows = function () {
            for (var a = this.rows.filter(function (a) {
                    return a.$$selected
            }), b = [], c = 0; c < a.length; c++) b.push(a[c].entity);
            return b
        }, h.prototype.registerMethod = function (a, b) {
            var c = this;
            c.events[a] = function () {
                return b.apply(c, arguments)
            }
        }, h.prototype.registerApi = function () {
            angular.isFunction(this.options.registerApi) && this.options.registerApi(this.events)
        }, h.prototype.downloadCSV = function () {
            var a = this,
                c = b.formatToCSV(a.data, ",");
            b.downloadCSV("data.csv", c)
        }, h
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridGroupSelect", ["$parse", function (a) {
        return {
            restrict: "EA",
            require: "^mGrid",
            scope: !1,
            compile: function () {
                return {
                    post: function (a, b, c, d) {
                        var e = d.grid;
                        b.bind("click", function (b) {
                            b.stopPropagation(), a.row.$$collapsed = !a.row.$$collapsed, e.buildRows(), e.refresh()
                        })
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridHeader", function () {
        return {
            templateUrl: "mgrid-templates/header.html",
            restrict: "EA",
            replace: !0,
            require: ["^mGrid"],
            scope: !1,
            controller: function () { },
            link: function (a, b, c, d) { }
        }
    })
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridHeaderCell", ["$compile", "$templateCache", "$document", "$parse", function (a, b, c, d) {
        return {
            restrict: "EA",
            require: "^mGrid",
            scope: {
                col: "=col"
            },
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        function e() {
                            f(a, function (a, c) {
                                b.append(a)
                            })
                        }
                        var d = d.grid,
                            f = a.col.headerCompiledElementFn;
                        e()
                    },
                    post: function (a, b, e, f) {
                        function g(d) {
                            d.preventDefault(), d.stopPropagation(), m.remove();
                            var e = parseInt(d.clientX > b[0].getBoundingClientRect().left ? d.clientX - b[0].getBoundingClientRect().left : 40, 10);
                            if (a.col.pinned) {
                                var f = i.pinnedContainerWidth() - a.col.width + e;
                                if (f > i.gridWidth) return
                            }
                            a.col.width = e, i.refresh(), c.off("mouseup", g), c.off("mousemove", h)
                        }

                        function h(a) {
                            a.preventDefault(), a.stopPropagation(), m.css({
                                left: a.clientX + "px"
                            })
                        }
                        var i = f.grid,
                            j = i.options.multiSelectIf;

                        if (i.options.multiSelect && "$$selectedRowHeader" == a.col.field && b.bind("click", function () {
                                b.children().children().removeClass("fa-square-o fa-check"), i.selectedAll ? (i.selectedAll = !1, b.children().children().addClass("fa-square-o")) : (i.selectedAll = !0, b.children().children().addClass("fa-check-square-o"));
                                for (var a = 0; a < i.rows.length; a++) {
                                    var c = !0;
                                    if (void 0 !== j && j.length > 0) try {
                                        c = d(j.replace(/row.entity./g, ""))(i.rows[a].entity)
                                    } catch (e) {
                                                    c = !1
                                    }
                                        c && (i.rows[a].$$selected = i.selectedAll)
                                }
                                if (i.hasGrouping()) {
                                    var f = function (a) {
                                        for (var b in a) a[b].row.$$selected = i.selectedAll, f(a[b].children)
                                    };
                                    f(i.groupCache)
                                }
                                i.refresh()
                        }), i.hasGrouping() && "$$grpRowHeader" == a.col.field && (angular.element(b[0].querySelector(".fa")).addClass(i.collapsedAll ? "fa-minus-square" : "fa-plus-square"), b.bind("click", function () {                            
                                i.collapsedAll = !i.collapsedAll, angular.element(b[0].querySelector(".fa")).removeClass("fa-minus-square fa-plus-square").addClass(i.collapsedAll ? "fa-minus-square" : "fa-plus-square");
                                var a = i.collapsedAll;
                                for (var c in i.groupCache) i.groupCache[c].row.$$collapsed = a;
                                i.buildRows(), i.refresh()
                        })), i.options.enableSorting) {
                            var k = angular.element(b[0].getElementsByClassName("m-grid-header-cell-sort"));
                            k.removeClass("fa-caret-up fa-caret-down"), i.currentSortColumn == a.col.field ? "ASC" == i.currentSortDirection ? k.addClass("fa-caret-up") : k.addClass("fa-caret-down") : "$$selectedRowHeader" !== a.col.field && k.addClass("hide"), b.bind("click", function (b) {
                                if (a.col.sortable) {
                                    b.preventDefault(), i.currentSortColumn = a.col.field, null == i.currentSortDirection || "DESC" == i.currentSortDirection ? i.currentSortDirection = "ASC" : i.currentSortDirection = "DESC", i.events.raise.sortChange(i.getGridPagingState()), i.refresh();
                                    var c = "";
                                    return i.currentSortColumn !== a.col.field && (c = "hide "), "ASC" == i.currentSortDirection && (c = "fa-caret-up "), "DESC" == i.currentSortDirection && (c = "fa-caret-down "), angular.element(document.getElementsByClassName(i.id)[0].getElementsByClassName("m-grid-header-cell-contents")).children().removeClass("hide fa-caret-up fa-caret-down"), k.addClass(c), !1
                                }
                            })
                        }
                        if (i.options.enableColumnResizing && a.col.resizable) {
                            var l = angular.element("<div class='m-grid-column-resize'></div>"),
                                m = angular.element("<div class='m-resize-overlay'></div>");
                            l.bind("mousedown", function (a) {
                                a.preventDefault(), i.element.append(m), m.css({
                                    height: i.gridHeight + "px",
                                    left: l[0].getBoundingClientRect().left - 1 + "px"
                                }), c.on("mouseup", g), c.on("mousemove", h)
                            }), l.bind("dblclick", function (b) {
                                b.stopPropagation();
                                for (var c = 0, d = 0; d < i.rows.length; d++) c = Math.max(c, i.rows[d].entity[a.col.field].toString().length);
                                a.col.width = 10 * (Math.max(c, a.col.displayName ? a.col.displayName.length : a.col.field.length) + 2)
                            }), l.on("$destroy", function () {
                                l.off("mousedown"), l.off("dblclick"), c.off("mouseup", g), c.off("mousemove", h)
                            }), b.append(l)
                        }
                        if (i.options.showColumnMenu && a.col.showColumnMenu) {
                            i.$columnMenuShown = !1;
                            var n = angular.element('<div class="m-grid-column-menu-button"><i class="m-grid-column-menu-icon fa fa-angle-down">&nbsp;</i></div>');
                            angular.element(b.children()[0]).append(n), n.bind("click", function (c) {
                                c.stopPropagation(), i.menuItems = [{
                                    name: "Pin",
                                    col: a.col,
                                    itemShown: function () {
                                        return !0
                                    },
                                    action: function () {
                                        this.col.pinned = !0, this.grid.buildLeftColumns(), this.grid.buildColumns(), this.grid.refresh()
                                    }
                                }, {
                                    name: "Unpin",
                                    col: a.col,
                                    itemShown: function () {
                                        return this.grid.options.enablePinning
                                    },
                                    action: function () {
                                        this.col.pinned = !1, this.grid.buildLeftColumns(), this.grid.buildColumns(), this.grid.refresh()
                                    }
                                }], a.$emit("show-menu", {
                                    col: a.col,
                                    colHeader: b[0].getBoundingClientRect(),
                                    colMenuButton: n[0].getBoundingClientRect()
                                })
                            }), n.on("$destroy", function () {
                                n.off("click")
                            })
                        }
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridPaginator", ["$compile", function (a) {
        return {
            templateUrl: "mgrid-templates/mgridpaginator.html",
            restrict: "A",
            replace: !0,
            require: "^mGrid",
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        var e = d.grid;
                        a.grid = e
                    },
                    post: function (a, b, c, d) {
                        var e = d.grid;
                        a.changePage = function () {
                            e.currentPage = Math.min(e.currentPage, e.getNumOfPages()), e.events.raise.pageChange(e.getGridPagingState()), e.options.useExternalPagination || (e.buildRows(), e.refresh())
                        }, a.First = function () {
                            1 != e.currentPage && (e.currentPage = 1, e.events.raise.pageChange(e.getGridPagingState()), e.options.useExternalPagination || (e.buildRows(), e.refresh()))
                        }, a.Prev = function () {
                            e.currentPage <= 1 || (e.currentPage--, e.events.raise.pageChange(e.getGridPagingState()), e.options.useExternalPagination || (e.buildRows(), e.refresh()))
                        }, a.Next = function () {
                            e.currentPage >= e.getNumOfPages() || (e.currentPage++, e.events.raise.pageChange(e.getGridPagingState()), e.options.useExternalPagination || (e.buildRows(), e.refresh()))
                        }, a.Last = function () {
                            e.currentPage >= e.getNumOfPages() || (e.currentPage = e.getNumOfPages(), e.events.raise.pageChange(e.getGridPagingState()), e.options.useExternalPagination || (e.buildRows(), e.refresh()))
                        }
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridRow", ["$compile", "$parse", function (a, b) {
        return {
            restrict: "EA",
            priority: -10,
            require: "^mGrid",
            scope: {
                row: "=mGridRow",
                container: "=mGridRowContainer"
            },
            compile: function () {
                return {
                    pre: function (a, b, c, d) {
                        function e() {
                            g(a, function (a, c) {
                                b.append(a)
                            })
                        }
                        var f = d.grid;
                        a.grid = f;
                        var g = "body" == a.container ? a.row.rowTemplateFn : a.row.rowPinnedTemplateFn;
                        e()
                    },
                    post: function (a, b, c, d) {
                        var e = d.grid;
                        e.options.multiSelectIf
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridStyle", ["$interpolate", function (a) {
        return {
            link: function (b, c, d) {
                var e = a(c.text(), !0);
                e && b.$watch(e, function (a) {
                    c.text(a)
                })
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGridViewport", ["$timeout", function (a) {
        return {
            templateUrl: "mgrid-templates/viewport.html",
            restrict: "EA",
            replace: !0,
            require: ["^mGrid"],
            scope: !0,
            link: function (a, b, c, d) {
                var e = d[0].grid;
                a.grid = d[0].grid, e.options.enableSorting && !e.options.useExternalSorting && e.events.on.sortChange(a, e.sortChange), b.bind("scroll", function (a) {
                    var b = (e.rowHeight, a.target.scrollTop),
                        c = a.target.scrollLeft;
                    if (e.scrollTop != b && (e.scrollTop = b, e.setRowDisplay(), e.buildRows(), e.hasPinnedContainer() && (e.element[0].querySelectorAll(".m-grid-left-pinned-container .m-grid-viewport")[0].scrollTop = b, document.getElementsByClassName(e.id)[0].getElementsByClassName("m-grid-left-pinned-container")[0].getElementsByClassName("m-grid-viewport")[0].scrollTop = b), e.isScrolling = !0), e.scrollLeft != c) {
                        e.scrollLeft = c;
                        var d = e.columnDisplayStart,
                            g = e.columnDisplayEnd;
                        e.setColumnDisplay();
                        var h = -1 * e.getMarginLeft() + "px";
                        document.getElementsByClassName(e.id)[0].getElementsByClassName("main-container")[0].getElementsByClassName("m-grid-header-canvas")[0].style.marginLeft = h, e.options.showColumnFooter && (document.getElementsByClassName(e.id)[0].getElementsByClassName("main-container")[0].getElementsByClassName("m-grid-column-footer-wrapper")[0].style.marginLeft = h), (d !== e.columnDisplayStart || g !== e.columnDisplayEnd) && (e.buildColumns(), e.isScrolling = !0)
                    }
                    e.isScrolling && f()
                });
                var f = _.debounce(function () {
                    e.refresh(), e.isScrolling = !1
                }, 75)
            }
        }
    }])
}(),
function () {
    "use strict";
    angular.module("mGrid").directive("mGrid", ["$window", "$timeout", function (a, b) {
        return {
            templateUrl: "mgrid-templates/main.html",
            restrict: "EA",
            scope: {
                mGrid: "="
            },
            replace: !0,
            controller: "mGridController",
            compile: function () {
                return {
                    post: function (c, d, e, f) {
                        function g() {
                            b.cancel(j), j = b(function () {
                                var a = angular.element(h.element)[0].getBoundingClientRect().width;
                                a > 0 && h.gridWidth !== a - 10 && (h.gridWidth = a - 10, h.setColumnDisplay(), h.buildColumns(), h.refresh()), g()
                            }, 300)
                        }
                        var h = f.grid;
                        d.addClass(c.grid.id), h.element = d, h.gridWidth = angular.element(d)[0].getBoundingClientRect().width - 10, h.setColumnDisplay(), h.refreshCanvas();
                        var i = _.debounce(function () {
                            var a = angular.element(d)[0].getBoundingClientRect().width;
                            a > 0 && h.gridWidth !== a - 10 && (h.gridWidth = a - 10, h.setColumnDisplay(), h.buildColumns(), h.refresh())
                        }, 300);
                        angular.element(a).on("resize", i);
                        var j;
                        g(), c.$on("$destroy", function () {
                            b.cancel(j)
                        }), d.on("$destroy", function () {
                            angular.element(a).off("resize", i)
                        })
                    }
                }
            }
        }
    }])
}(),
function () {
    "use strict";
    var a = ["0", "0", "0"],
        b = "mGrid-";
    angular.module("mGrid").service("mGridUtil", function () {
        var c = this;
        c.isNullOrUndefined = function (a) {
            return null === a || void 0 === a ? !0 : !1
        }, c.nextUid = function () {
            for (var c, d = a.length; d;) {
                if (d--, c = a[d].charCodeAt(0), 57 === c) return a[d] = "A", b + a.join("");
                if (90 !== c) return a[d] = String.fromCharCode(c + 1), b + a.join("");
                a[d] = "0"
            }
            return a.unshift("0"), b + a.join("")
        }, c.sumByProperty = function (a, b) {
            return _.reduce(a, function (a, c) {
                return a + c[b]
            }, 0)
        }, c.isMSIE = function () {
            var a = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return a ? parseInt(a[1]) : !1
        }, c.formatToCSV = function (a, b) {
            if (0 != a.length) {
                var d = "",
                    e = "";
                for (var f in a[0]) e += c.formatCSVField(f) + b;
                e = e.slice(0, -1), d += e + "\n";
                for (var g = 0; g < a.length; g++) {
                    var e = "";
                    for (var f in a[g]) {
                        var h = c.formatCSVField(a[g][f]);
                        e += h + b
                    }
                    e.slice(0, e.length - 1), d += e + "\n"
                }
                return d
            }
        }, c.formatCSVField = function (a) {
            return null == a ? "" : "number" == typeof a ? a : "boolean" == typeof a ? a ? "TRUE" : "FALSE" : "string" == typeof a ? '"' + a.replace(/"/g, '""') + '"' : JSON.stringify(a)
        }, c.downloadCSV = function (a, b) {
            var c, d, e = document.createElement("a"),
                f = "application/octet-stream;charset=utf-8";
            if (d = this.isMSIE(), d && 10 > d) {
                var g = document.createElement("iframe");
                return document.body.appendChild(g), g.contentWindow.document.open("text/html", "replace"), g.contentWindow.document.write("sep=,\r\n" + b), g.contentWindow.document.close(), g.contentWindow.focus(), g.contentWindow.document.execCommand("SaveAs", !0, a), document.body.removeChild(g), !0
            }
            if (navigator.msSaveBlob) return navigator.msSaveOrOpenBlob(new Blob([b], {
                type: f
            }), a);
            if ("download" in e) {
                var h = new Blob([b], {
                    type: f
                });
                c = URL.createObjectURL(h), e.setAttribute("download", a)
            } else c = "data:" + f + "," + encodeURIComponent(b), e.setAttribute("target", "_blank");
            e.href = c, e.setAttribute("style", "display:none;"), document.body.appendChild(e), setTimeout(function () {
                if (e.click) e.click();
                else if (document.createEvent) {
                    var a = document.createEvent("MouseEvents");
                    a.initEvent("click", !0, !0), e.dispatchEvent(a)
                }
                document.body.removeChild(e)
            }, 10)
        }
    })
}(),
function () {
    "use strict";
    angular.module("mGrid").run(["$templateCache", function (a) {
        a.put("mgrid-templates/main.html", '<div class="m-grid" ng-style="gridStyle()"><style m-grid-style>{{ grid.buildStyles() }}</style><div ng-if="grid.hasPinnedContainer()" class="m-grid-container m-grid-pinned-container m-grid-left-pinned-container"><div class="m-grid-header" ><div class="m-grid-header-viewport" ng-style="grid.pinnedHeaderStyle()"><div class="m-grid-header-canvas"><div class="m-grid-header-cell-wrapper"><div class="m-grid-header-cell-row"><div ng-repeat="column in grid.pinnedColumns track by $index" class="m-grid-header-cell m-grid-clearfix m-grid-col_{{column.$$uid}}"  m-grid-header-cell col="column"></div></div></div></div></div></div><div class="m-grid-viewport" ng-style="grid.pinnedViewPortStyle()"><div class="m-grid-canvas" ng-style="grid.pinnedCanvasStyle()" style="float:left;"><div ng-style="grid.pinnedTopRowStyle()"></div><div class="m-grid-row" ng-repeat="row in grid.renderedRows" ng-class="{ \'m-grid-row-selected\' : row.$$selected }"><div m-grid-row="row" m-grid-row-container="\'left\'" ng-class="{ \'m-group-header-row\' : row.$$group }"></div></div><div ng-style="grid.pinnedBottomRowStyle()"></div></div></div><div m-grid-column-footer="grid.pinnedColumns" m-grid-column-container="\'pinned\'" ng-if="grid.options.showColumnFooter"></div></div><div class="m-grid-container m-grid-pinned-container main-container"><m-grid-container></m-grid-container><div m-grid-column-footer="grid.renderedColumns" m-grid-column-container="\'body\'" ng-if="grid.options.showColumnFooter"></div></div><div ng-if="grid.options.enablePagination"  m-grid-paginator></div></div>'),
        a.put("mgrid-templates/rendercontainer.html", '<div class="m-grid-container"><m-grid-header></m-grid-header><m-grid-viewport></m-grid-viewport></div>'),
        a.put("mgrid-templates/header.html", '<div class="m-grid-header"><div class="m-grid-header-viewport" ng-style="grid.headerStyle()"><div class="m-grid-header-canvas" ng-style="grid.headerCanvasStyle()"><div class="m-grid-header-cell-wrapper"><div class="m-grid-header-cell-row"><div ng-repeat="column in grid.renderedColumns track by column.field" class="m-grid-header-cell m-grid-clearfix m-grid-col_{{column.$$uid}}" m-grid-header-cell col="column"></div></div></div></div></div></div>'),
            a.put("mgrid-templates/headercell.html", '<div class="m-grid-header-cell-contents">{{col.displayName || col.field}}<span class="fa m-grid-header-cell-sort"></span></div>'),
        a.put("mgrid-templates/column-menu-list.html", '<ul class="m-grid-column-menu dropdown-menu"><li ng-repeat="item in grid.menuItems" m-grid-column-menu-item item="item" ng-show="itemShow()"></li></ul>'),
        a.put("mgrid-templates/column-menu-item.html", '<a ng-click="menuItemAction($event)">{{item.name}}</a>'),
        a.put("mgrid-templates/selectedRowHeader.html", '<div class="m-grid-cell-contents m-grid-select-header-cell-row" ng-class="selectClass(row)" m-grid-cell-select><span ng-if="(row.$$groupLevel > 0 && grid.hasGrouping()) || (!grid.hasGrouping())" ng-class="{ \'fa-square-o\' : !row.$$selected, \'fa-check\' : row.$$selected  }" class="fa"></span></div>'),
        a.put("mgrid-templates/selectedRowHeaderCell.html", '<div class="m-grid-header-cell-contents m-grid-select-header-cell"><span class="fa fa-square-o"></span></div>'),
        a.put("mgrid-templates/groupRowHeader.html",
            '<div ng-if="row.$$groupLevel > 0" class="m-grid-cell-contents m-grid-select-header-cell-row" m-grid-group-select>' +
            '<span ng-style="{\'padding-left\': 20 * (grid.groups.length - row.$$groupLevel) + 8 + \'px\'}" ng-class="{ \'fa-plus-square\' : !row.$$collapsed, \'fa-minus-square\' : row.$$collapsed }" class="fa"></span>' +
            '</div>' +
            '<div ng-if="row.$$groupLevel < 0" class="m-grid-cell-contents m-grid-select-header-cell-row" ng-class="selectClass(row)" m-grid-cell-select>' +
            '<span ng-class="{ \'fa-square-o\' : !row.$$selected, \'fa-check\' : row.$$selected  }" class="fa"></span>' +
            '</div>'),
        a.put("mgrid-templates/groupRowHeaderCell.html", '<div class="m-grid-header-cell-contents m-grid-select-header-cell"><span class="fa"></span></div>'),
        a.put("mgrid-templates/viewport.html", '<div class="m-grid-viewport" ng-style="grid.viewPortStyle()"><div class="m-grid-canvas" ng-style="grid.canvasStyle()" style="float:left;"><div class="" ng-style="grid.leftColumnStyle()" style="float:left;"></div><div ng-style="grid.topRowStyle()"></div><div class="m-grid-row" ng-repeat="row in grid.renderedRows" ng-class="{ \'m-grid-row-selected\' : row.$$selected }" ><div m-grid-row="row" m-grid-row-container="\'body\'" ng-class="{ \'m-group-header-row\' : row.$$group }"></div></div><div ng-style="grid.bottomRowStyle()"></div></div></div>'),
        a.put("mgrid-templates/m-grid-row.html", '<div ng-repeat="column in grid.renderedColumns track by column.field"  class="m-grid-cell m-grid-col_{{column.$$uid}}"><m-grid-cell></m-grid-cell></div>'),
        a.put("mgrid-templates/m-grid-row-pinned.html", '<div ng-repeat="column in grid.pinnedColumns track by column.field" class="m-grid-cell m-grid-col_{{column.$$uid}}"><m-grid-cell></m-grid-cell></div>'),
        a.put("mgrid-templates/mgridcell.html", '<div class="m-grid-cell-contents">{{COL_FIELD CELL_FILTER}}</div>'),
        a.put("mgrid-templates/mgridcell-noop.html", '<div class="m-grid-cell-contents"></div>'),
        a.put("mgrid-templates/m-grid-row-aggregate.html", '<div ng-repeat="column in grid.renderedColumns track by column.field"  class="m-grid-cell m-grid-col_{{column.$$uid}}"><div class="m-grid-cell-contents">{{row.entity[column.field]}}</div></div>'),
        a.put("mgrid-templates/m-grid-column-footer.html", '<div class="m-grid-column-footer" ng-style="grid.columnFooterStyle(container)"><div class="m-grid-column-footer-wrapper"><div ng-repeat="column in columns"  class="m-grid-column-footer-cell m-grid-col_{{column.$$uid}}"><div class="m-grid-column-footer-cell-contents"><div ng-repeat="aggregateType in column.aggregateTypes">{{column.aggregateText(aggregateType)}} <b>{{column.aggregateValues(aggregateType)}}</b></div></div></div><div></div>'),
        a.put("mgrid-templates/mgridpaginator.html", '<div ng-if="grid.options.enablePagination" class="col-sm-12 m-grid-pagination"><ul class="pagination pagination-sm pull-right"><li><a ng-click="First()"><i class="fa fa-angle-double-left"></i></a></li><li><a ng-click="Prev()"><i class="fa fa-angle-left"></i></a></li><li><a ng-click="Next()"><i class="fa fa-angle-right"></i></a></li><li><a ng-click="Last()"><i class="fa fa-angle-double-right"></i></a></li></ul><select class="pull-right ng-pristine ng-valid" ng-options="o as o for o in grid.pageSizes" ng-change="changePage()" name="pageSize" ng-model="grid.currentPageSize" style="height:29px;border:none;color: #444;background-color: transparent;"></select><span style="position: relative;top: 10px;">Page <b>{{grid.currentPage}}</b> of {{grid.getNumOfPages()}} </span></div>')

    }])
}();