'use strict';

angular.module('gsWebWidgets', []).
directive('gsWidget', ['$compile', function (c) {
    return {
        restrict: 'EA',
        scope: {},
        link: function (s, E, A) {
			var content = E.children('div[role="content"]'),
                collapsable = A.gsWidgetCollapsable || false,
				collapse = A.gsCollapsed || false;
			s.title = A.gsWidgetTitle || "";
			var buttons = '';
			
			if (collapsable){
				buttons +=  '<a href="javascript:void(0);" ng-click="collapse()" class="button-icon jarviswidget-toggle-btn" data-trigger="hover" data-placement="left" data-type="success" data-title="Collapse" bs-tooltip>' +
								'<i class="fa fa-minus"></i>' +
						    '</a>'
			}
			
            var header = '<header role="heading">' +
                            '<div class="jarviswidget-ctrls" role="menu">' + buttons + '</div>' +
                            '<span class="widget-icon"><i class="fa fa-filter"></i></span>' +
                            '<h2 ng-bind-html="title"></h2>' +
                        '</header>';
            s.collapse = function () {
				if(content.hasClass("hide")){
					content.removeClass("hide");
				}else{
					content.addClass("hide");
				}
            }
			
            header = c(header)(s);
            E.prepend(header);
			if(collapse)s.collapse();
        }

    };

}]);
