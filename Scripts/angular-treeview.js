(function() {
	"use strict";
	var app = angular.module('mTreeView',[]);
	
	var uid = ['0','0','0'];
	var uidPrefix = 'mTreeView-';
		
	angular.module('mTreeView').service('mTreeViewUtil',function(){
		var self = this;
		
		self.isNullOrUndefined = function(obj){
			if(obj === null || obj === undefined) return true;
			return false;
		};
		
		self.nextUid = function nextUid() {
			var index = uid.length;
			var digit;

			while (index) {
				index--;
				digit = uid[index].charCodeAt(0);
				if (digit === 57 /*'9'*/) {
					uid[index] = 'A';
					return uidPrefix + uid.join('');
				}
				if (digit === 90  /*'Z'*/) {
					uid[index] = '0';
				} else {
					uid[index] = String.fromCharCode(digit + 1);
					return uidPrefix + uid.join('');
				}
			}
			uid.unshift('0');

			return uidPrefix + uid.join('');
		};
		
		
		
	});
	
	angular.module('mTreeView').factory('TreeView',['mTreeViewUtil','TreeNode',function(mTreeViewUtil,TreeNode) {
		var TreeView = function TreeView(options){
			this.options = options;
			
			this.parentKey = options.parentKey;
			this.listKey = options.listKey;
			this.displayName = options.displayName;
			this.id = 'mTreeView-' + Math.floor(Math.random() * 100000, 6);
			this.rows = [];

			// this.gridHeight = options.height ? options.height : 400;
			// this.gridWidth = 0;
			
			// this.rowHeight = options.rowHeight ? options.rowHeight : 30;
			// this.recordsPerBody = Math.floor((this.gridHeight - 15) / this.rowHeight);
			
			// 
			// this.columns = [];
			
			// this.scrollTop = 0;
			// this.scrollLeft = 0;
			// this.isScrolling = 0;
			
			// //VISIBLE MAIN COLUMNS/ROWS
			// this.visibleColumns = [];
			// this.visibleRows = [];
			
			// this.pinnedColumns = [];
			
			
			// this.rowDisplayStart = 0;
			// this.rowDisplayEnd = this.recordsPerBody * 2;
			
			// this.columnDisplayStart = 0;
			// this.columnDisplayEnd = 0;
			
			this.events = {};
			//METHODS
			this.registerMethod('getSelectedRows', this.getSelectedRows);
		}
		
		TreeView.prototype.generateHashMap = function(){
			var self = this;
			self.rows.length = 0;
	
			for (var i = 0; i < self.data.length; i++) {
				self.rows.push(new TreeNode(self.data[i],i, self.data[i].ID === null ? false : true));
			}

		}	
				
		TreeView.prototype.buildTree = function(){
			var self = this,
				tree = [],
				parentKey = self.options.parentKey,
				listKey = self.options.listKey;
			if(!self.rows || self.rows.length == 0){
				self.renderedRows = [];
				return [];
			}
			var tmp = {};
			tmp[self.displayName] = 'All';
			tree.push(new TreeNode(tmp, -1, true))
				
			var getTree = function(obj){
				angular.forEach(self.rows.filter(function(x){ return x.entity[parentKey] == obj.entity[listKey]}),function(o){
					getTree(o);
					obj.children.push(o);
				})
			};
			
			angular.forEach(self.rows.filter(function(x){ return x.entity[parentKey] == null }),function(obj){
				getTree(obj);
				tree[0].children.push(obj);
			});	
			//tree[0].open = true;
			self.renderedRows = tree;
		}	
		
		TreeView.prototype.getSelectedRows = function(){
			var arr = this.rows.filter(function(row){ return row.$$selected });
			
			var rows = [];
			for(var i = 0; i < arr.length; i++){
				rows.push(arr[i].entity);
			}
			return rows;
		}
		
		TreeView.prototype.refresh = function(){
			var self = this;
			//PANG QUEUE NG EVENTS KUNG SAKALING SABAYSABAY UNG EVENTS
			if (self.gridRefreshCanceller) {
				$timeout.cancel(self.gridRefreshCanceller);
			}

			self.gridRefreshCanceller = $timeout(function () {
				//self.refresh(true);

			});

			self.gridRefreshCanceller.then(function () {
				self.gridRefreshCanceller = null;
			});

			return self.gridRefreshCanceller;
		};
	
		TreeView.prototype.registerEvent = function(eventName){
			var self = this;

			var event = self.events;
			if(!event.on){
				event.on = {};
				event.raise = {};
			};
			var eventID = self.id + '-' + eventName
			event.raise[eventName] = function(){
				$rootScope.$emit.apply($rootScope, [eventID].concat(Array.prototype.slice.call(arguments)));
			};
			
			event.on[eventName] = function (scope, handler) {
				var deregOn = $rootScope.$on(eventID, function (event) {
					var args = Array.prototype.slice.call(arguments);
					args.splice(0, 1); 
					handler.apply(self, args);
				});
				
				//track our listener so we can turn off and on
				var listener = {handler: handler, dereg: deregOn, eventID: eventID};
				self.listeners.push(listener);
				var removeListener = function(){
					listener.dereg();
					var index = self.listeners.indexOf(listener);
					self.listeners.splice(index,1);
				};

				//destroy tracking when scope is destroyed
				scope.$on('$destroy', function() {
					removeListener();
				});

				return removeListener;
			};	
		};
		
		//GRID PUBLIC METHODS
		TreeView.prototype.getSelectedRows = function(){
			var arr = this.rows.filter(function(row){ return row.$$selected });
			
			var rows = [];
			for(var i = 0; i < arr.length; i++){
				rows.push(arr[i].entity);
			}
			
			return rows;
		};
	
		TreeView.prototype.registerMethod = function(methodName, callbackFn){
			var self = this;
			self.events[methodName] = function(){
				return callbackFn.apply(self, arguments);
			};
			
		};
		
		TreeView.prototype.registerApi = function(){
			if(angular.isFunction(this.options.registerApi)){
				this.options.registerApi(this.events);
			}		
			
		};
	
		return TreeView;
	}]);

	angular.module('mTreeView').factory('TreeNode',['mTreeViewUtil','$compile',function(mTreeViewUtil,$compile) {
		var TreeNode = function TreeNode(data, index, checkedByDefault){
			this.$$uid = mTreeViewUtil.nextUid();
			
			this.$$rowIndex = index;
			
			this.$$selected = checkedByDefault ? checkedByDefault : false;
			this.entity = data;
			this.children = [];
			this.open = true;
			
			
		}
		
		TreeNode.prototype.openNode = function($event){
			$event.stopPropagation();
			this.open = !this.open;
		}
		
		TreeNode.prototype.select = function($event){
			$event.stopPropagation();
			var self = this;
			self.$$selected = !self.$$selected;
			self.entity.IsCheck = self.$$selected;
			
			var select = function(node){
				angular.forEach(node.children,function(obj){
					obj.$$selected = self.$$selected;
					select(obj);
					obj.entity.IsCheck = obj.$$selected;
				});
			}
			
			angular.forEach(self.children,function(obj){
				obj.$$selected = self.$$selected;
				select(obj);
				obj.entity.IsCheck = obj.$$selected;
			});
			
		}
		
		TreeNode.prototype.openAllNodes = function($event){
			$event.stopPropagation();
			var self = this;
			self.open = !self.open;
			var open = function(node){
				angular.forEach(node.children.filter(function(x) { return x.children.length > 0 }),function(obj){
					obj.open = self.open;
					open(obj);
				});
			}
			
			angular.forEach(self.children.filter(function(x) { return x.children.length > 0 }),function(obj){
				obj.open = self.open;
				open(obj);
			});
		}
	
		return TreeNode;
	}]);
	
	angular.module('mTreeView').controller('mTreeViewController',['$scope','TreeView',function($scope,TreeView){
		var self = this;
		
		$scope.treeView = self.treeView = new TreeView($scope.mTreeView);
		self.treeView.data = angular.isString($scope.mTreeView.data) ? ($scope.$parent.$eval($scope.mTreeView.data) ? $scope.$parent.$eval($scope.mTreeView.data) : [] ) : $scope.mTreeView.data;
		
		self.treeView.generateHashMap();
		self.treeView.buildTree();
		

		self.treeView.registerApi();
		
		var dataWatchCollection;
		if(angular.isString($scope.mTreeView.data)){	
		    dataWatchCollection = $scope.$parent.$watchCollection($scope.mTreeView.data, function (newValue, oldValue) {
		        //console.log('WATCH');
				if(oldValue !== newValue){
					$scope.$evalAsync(function() {
					    self.treeView.data = newValue;
					    //console.log('WATCH', newValue.length);
						self.treeView.generateHashMap();
						self.treeView.buildTree();
					});
				}
			});			
		}else{
			dataWatchCollection = $scope.$parent.$watchCollection(function() {
				return $scope.mTreeView.data; 
			}, function (oldValue, newValue) {
			    console.log('WATCH 2', oldValue,newValue);
				if(oldValue !== newValue){
					$scope.$evalAsync(function() {
						self.treeView.data = $scope.mTreeView.data;
						self.treeView.generateHashMap();
						self.treeView.buildTree();
					});
				}
			}, true);
		}
		
		//REMOVE WATCHERS
		$scope.$on('$destroy', function() {
			dataWatchCollection();
		});
	}]);
	
	angular.module('mTreeView').directive('mTreeView',['$window',function ($window) {
		return {
			templateUrl: 'mtreeview-template/main.html',
			restrict: 'EA',
			scope: {
				mTreeView: '='
			},
			replace: true,
			controller : 'mTreeViewController', 
			compile : function(){
				return {
					post : function($scope,element,attrs, ctrl){
					    //ctrl.treeView.refresh();
						
					}
				}
			}
		};
	}]);
	
	angular.module('mTreeView').directive('mTreeViewNode',['$compile',function ($compile) {
		return {
			templateUrl: 'mtreeview-template/node.html',
			restrict: 'A',
			replace: true,
			transclude : true,
			require: '^mTreeView',
			scope: {
				tree: '='
			},
			compile : function(element, attr, transclude){

				var contents = element.contents().remove();
				var compiledContents;
				
                return function ($scope, $elm, $attr,TreeViewCtrl) {
                    if (!compiledContents) {
                        compiledContents = $compile(contents, transclude);
                    };
                    $scope.treeView = TreeViewCtrl.treeView;
                    
                    compiledContents($scope, function (clone, $scope){
                        $elm.append(clone);
                    });
                };
            }
		};
	}]);
	
	angular.module("mTreeView").run(["$templateCache", function($templateCache) {
		$templateCache.put("mtreeview-template/main.html",
			'<ul class="tree tree-selectable" role="tree">' +
				'<li class="tree-branch" ng-class="{ \'tree-open\' : tree.open, \'tree-selected\': tree.$$selected }" ng-repeat="tree in treeView.renderedRows track by $index"  role="treeitem">' +
					'<div class="tree-branch-header">' + 
						'<span class="tree-branch-name">\n' +	//IMPORTANT UNG NEWLINE(bug sa css ng span(inline-block))					
							'<i class="icon-folder ace-icon" ng-if="tree.children.length > 0"  ng-class="{ \'tree-minus\' : tree.open, \'tree-plus\': !tree.open }" ng-click="tree.openAllNodes($event)"></i>\n' +	
							'<i class="icon-item ace-icon fa" ng-class="{ \'fa-times\' : !tree.$$selected, \'fa-check\': tree.$$selected }" ng-click="tree.select($event)"></i>\n' +
							'<span class="tree-label" ng-click="tree.openNode($event)">{{tree.entity[treeView.displayName]}}</span>\n' + 
						'</span>' +
					'</div>' +
					'<div ng-class="{ \'hide\' : !tree.open }" m-tree-view-node tree="tree.children"></div>' + 
				'</li>' +
			'</ul>'
		);
		
		$templateCache.put("mtreeview-template/node.html",
			'<ul class="tree-branch-children"  role="group">' +
				'<li class="tree-branch tree-open"  ng-class="{ \'tree-selected\': t.$$selected }" role="treeitem" ng-repeat="t in tree track by $index" >' +	
					'<div class="tree-branch-header">' +
						'<span class="tree-item-name">\n' +						
							'<i ng-if="t.children.length > 0" class="icon-folder ace-icon" ng-class="{ \'tree-minus\' : t.open, \'tree-plus\': !t.open }" ng-click="t.openAllNodes($event)"></i>\n' +	
							'<i class="icon-item ace-icon fa" ng-class="{ \'fa-times\' : !t.$$selected, \'fa-check\': t.$$selected }"  ng-click="t.select($event)"></i>\n' +
							'<span class="tree-label" ng-click="t.openNode($event)">{{t.entity[treeView.displayName]}}</span>\n' +
						'</span>' +
					'</div>' +
			
					'<div ng-if="t.children.length > 0" ng-class="{ \'hide\' : !t.open }"  m-tree-view-node tree="t.children"><div ng-transclude></div></div>' + 
				'</li>' +
				
			'</ul>'
		);

	}]);
	
})();