'use strict';
// UNIQUE DAPAT UNG CLASS NAME - GLOBAL KASI
var recursive_menu = React.createClass({
    displayName: 'recursive_menu',
    render: function () {
        var data = this.props.data;
        var rows = data.map(function (datum) {
            return (
                React.DOM.div({ className: "col-md-4" },
                    React.DOM.div({ className: "profile-content" },
                    React.DOM.img({ className: "rounded-x", src: "Contents/Photos/" + datum['ImageFile'], alt: datum['ImageFile'], height: 40, width: 40 }),
                    React.DOM.div({ className: "name-company" },
                        React.DOM.strong(null,
                            React.DOM.a({ href: "#/Employee-List/" + datum['$$rID'] }, datum['Name'])
                        ),
                        React.DOM.span({ className: "clear" }, datum['Company']),
                        React.DOM.span({ className: "clear" },
                            React.DOM.i({ className: "fa fa-envelope-o" }, null)
                        )
                    ),
                    React.DOM.div({ className: "clear" }, null),
                    React.DOM.hr(),
                    React.DOM.div(null,
                        React.DOM.p(null, datum['Department'] + ' / ' + datum['Designation'])
                    )
                    )
                )
            );
        });

        return (
            React.DOM.div({ className: "col-sm-12" }, rows)
        );
    }
});


var list1010 = React.createClass({
    displayName:'list1010',
    render: function () {
        var data = this.props.data;
        var rows = data.map(function (datum) {
            return (
                React.DOM.div({ className: "col-md-4" },
                    React.DOM.div({ className: "profile-content" },
                    React.DOM.img({ className: "rounded-x", src: "Contents/Photos/" + datum['ImageFile'], alt: datum['ImageFile'], height: 40, width: 40 }),
                    React.DOM.div({ className: "name-company" },
                        React.DOM.strong(null,
                            React.DOM.a({ href: "#/Employee-List/" + datum['$$rID'] }, datum['Name'])
                        ),
                        React.DOM.span({ className: "clear" }, datum['Company']),
                        React.DOM.span({ className: "clear" },
                            React.DOM.i({ className: "fa fa-envelope-o" }, null)
                        )
                    ),
                    React.DOM.div({ className: "clear" }, null),
                    React.DOM.hr(),
                    React.DOM.div(null,
                        React.DOM.p(null, datum['Department'] + ' / ' + datum['Designation'])
                    )
                    )
                )
            );
        });

        return (
            React.DOM.div({ className: "col-sm-12" }, rows)
        );
    }
});


var list4091 = React.createClass({
    displayName: 'list4091',
    render: function () {
        var data = this.props.data;
        var rows = data.map(function (d) {
            return (
                React.DOM.tr(null,
                    React.DOM.td(null,d["IP"]),
                    React.DOM.td(null,d["Host"]),
					React.DOM.td(null,d["Connections"]),
					React.DOM.td(null,d["Program"])
                )
            );
        });

        return (
            React.DOM.table({ className: "table table-striped table-bordered table-hover" }, 
				React.DOM.thead(null,
					React.DOM.tr(null,
						React.DOM.th(null,"IP"),
						React.DOM.th(null,"Host"),
						React.DOM.th(null,"Connections"),
						React.DOM.th(null,"Program")
					)					
				),
				React.DOM.tbody(null,rows)
			)
        );
    }
});

var list4092 = React.createClass({
    displayName: 'list4092',
    render: function () {
        var data = this.props.data;
        var rows = data.map(function (d) {
            return (
                React.DOM.tr(null,
                    React.DOM.td(null,d["ID"]),
                    React.DOM.td(null,d["LastCommandBatch"]),
					React.DOM.td(null,d["TotalCPU_ms"]),
					React.DOM.td(null,d["LoginInfo"]),
					React.DOM.td(null,d["App"]),
					React.DOM.td(null,d["WaitTime_ms"]),
					React.DOM.td(null,d["BlockBy"]),
					React.DOM.td(null,d["MemUsage_kb"]),
					React.DOM.td(null,d["LoginDateTime"]),
					React.DOM.td(null,d["LastReqStartDateTime"]),
					React.DOM.td(null,d["HostName"]),
					React.DOM.td(null,d["NetworkAddr"])
                )
            );
        });

        return (
            React.DOM.table({ className: "table table-striped table-bordered table-hover table-fixed" }, 
				React.DOM.thead(null,
					React.DOM.tr(null,
						React.DOM.th({ className : "width50" },"Session ID"),
						React.DOM.th({ className : "width200" },"Last Command Batch"),
						React.DOM.th({ className : "width100" },"Total CPU(ms)"),
						React.DOM.th({ className : "width75" },"Login Info"),
						React.DOM.th({ className : "width100" },"App"),
						React.DOM.th({ className : "width75" },"Wait Time(ms)"),
						React.DOM.th({ className : "width50" },"Block By"),
						React.DOM.th({ className : "width75" },"Memory Usage(kb)"),
						React.DOM.th({ className : "width100" },"Login Time"),
						React.DOM.th({ className : "width100" },"Last Request StartTime"),
						React.DOM.th({ className : "width100" },"Host Name"),
						React.DOM.th({ className : "width75" },"Network Address")
					)					
				),
				React.DOM.tbody(null,rows)
			)
        );
    }
});


var OrgChart = React.createClass({
    displayName: "OrgChart",
    getInitialState: function () {
        return {
            visible: true
        };
    },
    render: function () {
        var childNodes, lineDown, hLine,toggle;
        var className = "", tbodyClass = "";
        
        var len = this.props.data.Supervises ? this.props.data.Supervises.length : 0;
        if (len > 0) {
            var td = this.props.data.Supervises.map(function (Supervises, index) {
                return React.DOM.td({ className: 'node-container', colSpan: 2},
                        OrgChart({ data: Supervises })
                        ) ;      
            });

            lineDown = React.DOM.tr(null,
                React.DOM.td({ colSpan: len * 2 },
                    React.DOM.div({ className: "line down" })
                )
            );
            var tdLine = [];
            for (var i = 0; i < len * 2; i++) {
                if (i == 0) {
                    tdLine.push(null,React.DOM.td({ className: 'line' }));
                } else if (i == 1 && len != 1) {
                    tdLine.push(null, React.DOM.td({ className: 'line top fright' }));
                } else if (i == (len * 2) - 2 && len != 1) {
                    tdLine.push(null, React.DOM.td({ className: 'line top fleft' }));
                } else if (i == (len * 2) - 1) {
                    tdLine.push(null, React.DOM.td({ className: 'line right' }));
                } else if (i % 2 == 1) {
                    tdLine.push(null, React.DOM.td({ className: 'line top right' }));
                } else {
                    tdLine.push(null, React.DOM.td({ className: 'line top left' }));
                }
                
            }
            var hLine = React.DOM.tr(null, tdLine);
            childNodes = React.DOM.tr(null,td);                
            
            if (this.state.visible) {
                className = " togglable-down";
            } else {
                className = " togglable-up";
                tbodyClass = "supervises-hide"
            } 
            toggle = React.DOM.div({ onClick: this.toggle, className: 'toggle ' + className })

        }
        

        return (
            React.DOM.div({ className: "jOrgChart" },
                React.DOM.table(null,
                    React.DOM.tbody({ className: tbodyClass },
                        React.DOM.tr({ className : "node-cells" },
                            React.DOM.td({ className: "node-cell", colSpan: len * 2 },
                                React.DOM.div({ className: "node" },
                                    React.DOM.div(null,this.props.data.Position),
                                    this.props.data.Name,
                                    toggle
                                )                                
                            )
                        ),
                        lineDown,
                        hLine,
                        childNodes
                    )

                )
            )
            
        );

    },
    toggle: function () {
        this.setState({ visible: !this.state.visible });
    }
});

var RecursiveMenu = React.createClass({
    displayName: "RecursiveMenu",
    render: function () {
        //var childNodes;
        // var len = this.props.data.Children ? this.props.data.Children.length : 0;
        console.log(this.props.data);
        var childNodes = this.props.data.map(function (Menu, index) {   
            return React.DOM.li(null,
                    React.DOM.a({ href: null },
                        React.DOM.span({ className: "menu-item-parent" }, Menu.Name)
                    ),
                    RecursiveMenu({ data: Menu.Children })
                   )
        });
        return (
            React.DOM.ul(null,childNodes)
        );

    }
});