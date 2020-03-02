(function(){
	'use strict';
	angular.module('overScroll',[])
	.directive('overScroll',['$window','$document',function($window,$document){
		return {
			restrict : 'A',
			link: function link(scope, element, attr) {
			
			}
        };
	
	}]);

})();