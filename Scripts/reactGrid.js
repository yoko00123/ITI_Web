var reactGridComponent = (function () {
    var reactGridHeader = React.createClass({
        displayName: 'reactGridHeader',
        render: function () {
            return (
                React.DOM.thead(null,
                    React.DOM.tr(null,null)  
                )
            );
        }
    });
    var reactGridBody = (function() {
        var reactGridBody = React.createClass({
            displayName: 'reactGridBody',
            render: function () {
                return (
                    React.DOM.tbody(null,null)
                );
            }
        });
        reactGridBody
    })();
    var reactGrid = React.createClass({
        displayName: 'reactGrid',
        render: function () {

            var data = this.props.data;

            var rows = data.map(function (datum) {
                var clickHandler = function (ev) {
                    console.log("Still in reactJs");
                    console.log(ev);
                }

                return (
                  React.DOM.tr(null,
                    React.DOM.td(null, datum['ID']),
                    React.DOM.td(null, datum['ID_Employee']),
                    React.DOM.td(null, datum['ID_DayType1']),
                    React.DOM.td(null, datum['ID_DailySchedule1']),
                    React.DOM.td(null, datum['ID_DayType2']),
                    React.DOM.td(null, datum['ID_DailySchedule2']),
                    React.DOM.td(null, datum['ID_DayType3']),
                    React.DOM.td(null, datum['ID_DailySchedule3']),
                    React.DOM.td(null, datum['ID_DayType4']),
                    React.DOM.td(null, datum['ID_DailySchedule4']),
                    React.DOM.td(null, datum['ID_DayType5']),
                    React.DOM.td(null, datum['ID_DailySchedule5']),
                    React.DOM.td(null, datum['ID_DayType6']),
                    React.DOM.td(null, datum['ID_DailySchedule6']),
                    React.DOM.td(null, datum['ID_DayType7']),
                    React.DOM.td(null, datum['ID_DailySchedule7'])
                  )
                );
            });

            return (
              React.DOM.table({ className: "react-grid" },
                rows
              )
            );
        }
    });
    return reactGrid;
})();

var inputTextBox = React.createClass({
    //mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
        return {
            value: ''
        }
    },
    componentWillMount: function () {
        this.setState({ data: this.props.data });
    },
    render:function(){
        return (
            '<input type="text" valueLink={this.linkState("value")} />'
        )
    }
});