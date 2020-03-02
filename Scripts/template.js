'use strict';

define(['app'], function (A) {
    A.run(['$templateCache', function (T) {
        'use strict';
        T.put('mgrid/headerCellTemplateDate.html',
            "<div class=\"m-grid-header-cell-contents\">" +
				"<span class=\'fa fa-calendar text-muted\'></span>&nbsp;&nbsp;{{col.displayName || col.field}}" +
				"<span class=\"fa m-grid-header-cell-sort\"></span>" +
			"</div>"
        );
        //T.put('nggrid/headerCellTemplateDate.html',
		//	'<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
		//	'<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"><i class=\'fa fa-calendar text-muted\'></i>&nbsp;&nbsp;{{col.displayName}}</div>' +
		//	'<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
		//	'<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
		//	'<div class="ngSortPriority">{{col.sortPriority}}</div>' +
		//	'</div>' +
		//	'<div ng-if="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
        //);

        T.put('mgrid/headerCellTemplateTime.html',
            "<div class=\"m-grid-header-cell-contents\">" +
				"<span class=\'fa fa-clock-o text-muted\'></span>&nbsp;&nbsp;{{col.displayName || col.field}}" +
				"<span class=\"fa m-grid-header-cell-sort\"></span>" +
			"</div>"
        );
        //T.put('nggrid/headerCellTemplateTime.html',
        //    '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
        //    '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"><i class=\'fa fa-clock-o text-muted\'></i>&nbsp;&nbsp;{{col.displayName}}</div>' +
        //    '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
        //    '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
        //    '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
        //    '</div>' +
        //    '<div ng-if="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
        //);
    }]);
});