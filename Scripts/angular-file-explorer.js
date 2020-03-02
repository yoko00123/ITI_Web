(function(window, angular) {
	"use strict";
	var app = angular.module('mFileExplorer',['dialogs.main']);

	/* DIRECTIVES */
	app.directive('mFileExplorer', ['mFileExplorerConfig', '$compile', '$templateCache', function (mFileExplorerConfig, $compile, $templateCache) {
		return {
			restrict: 'EA',
			templateUrl: 'mFileExplorer/index.html',
			controller: 'mFileExplorerCtrl',
			compile: function () {
			    return {
			        pre: function ($scope, attr,element) {
			            var template = $templateCache.get("mFileExplorer/context-menu.html");
			            function compileTemplate() {
			                angular.element("body").append($compile(template)($scope));
			            }
			            compileTemplate();
			        }
			    }
			}
		};
	}]);
	
	app.directive('ngContextMenu', ['$parse', '$compile', function ($parse, $compile) {
		return {
			restrict: 'EA',
			link: function(scope, element, attrs){
			    var fn = $parse(attrs.ngContextMenu),
					contextElem = angular.element(document.getElementById("m-file-explorer-context-menu"));+
              
				angular.element(document).on('click',function(event){
					event.preventDefault();
					contextElem.removeClass('show').addClass('hide');
				});
				element.bind('contextmenu', function(event) {
					scope.$apply(function() {
					    event.preventDefault();
					    var pageX = event.pageX;
					    var pageY = event.pageY;
					    var target = document.getElementsByClassName("modal-content")[0].getBoundingClientRect();

					    if (pageX === undefined) {
					        pageX = event.clientX + target.scrollLeft + target.scrollLeft;
					        pageY = event.clientY + target.scrollTop + target.scrollTop;
					    }

					    //console.log(angular.element(document.getElementsByClassName("main-navigation"))[0].getBoundingClientRect())
						fn(scope, {$event: event});
					
						contextElem.css({
							'top' : event.pageY + 'px',
							'left' : event.pageX + 'px'
						});
						contextElem.removeClass('hide').addClass('show');
					});
					
				});
			}
		};
	}]);

	app.directive('mFileDrop', ['$parse','$timeout','$location',function($parse, $timeout, $location) {
		return {
			restrict: 'A',
			//templateUrl: 'mFileExplorer/index.html',
			link: function(scope, elem, attr){
                			
			    function isASCII(str) {
			        return /^[\000-\177]*$/.test(str);
			    }

			    function extractFiles(evt, callback) {
			        var files = [], items = evt.dataTransfer.items;
			        if (items && items.length > 0 && items[0].webkitGetAsEntry && $location.protocol() != 'file' &&
                            items[0].webkitGetAsEntry().isDirectory) {
			            for (var i = 0; i < items.length; i++) {
			                var entry = items[i].webkitGetAsEntry();
			                if (entry != null) {
			                    //fix for chrome bug https://code.google.com/p/chromium/issues/detail?id=149735
			                    if (isASCII(entry.name)) {
			                        traverseFileTree(files, entry);
			                    } else if (!items[i].webkitGetAsEntry().isDirectory) {
			                        files.push(items[i].getAsFile());
			                    }
			                }
			            }
			        } else {
			            var fileList = evt.dataTransfer.files;
			            if (fileList != null) {
			                for (var i = 0; i < fileList.length; i++) {
			                    files.push(fileList.item(i));
			                }
			            }
			        }
			        (function waitForProcess(delay) {
			            $timeout(function () {
			                if (!processing) {
			                    callback(files);
			                } else {
			                    waitForProcess(10);
			                }
			            }, delay || 0)
			        })();
			    }

			    var processing = 0;
			    function traverseFileTree(files, entry, path) {
			        if (entry != null) {
			            if (entry.isDirectory) {
			                var dirReader = entry.createReader();
			                processing++;
			                dirReader.readEntries(function (entries) {
			                    for (var i = 0; i < entries.length; i++) {
			                        traverseFileTree(files, entries[i], (path ? path : "") + entry.name + "/");
			                    }
			                    processing--;
			                });
			            } else {
			                processing++;
			                entry.file(function (file) {
			                    processing--;
			                    file._relativePath = (path ? path : "") + file.name;
			                    files.push(file);
			                });
			            }
			        }
			    }

				if ('draggable' in document.createElement('span')) {
					var leaveTimeout = null;
					elem[0].addEventListener("dragover", function(evt) {
						evt.preventDefault();
						$timeout.cancel(leaveTimeout);
						if (!elem[0].__drag_over_class_) {
							if (attr['ngFileDragOverClass'] && attr['ngFileDragOverClass'].search(/\) *$/) > -1) {
								var dragOverClass = $parse(attr['ngFileDragOverClass'])(scope, {
									$event : evt
								});					
								elem[0].__drag_over_class_ = dragOverClass; 
							} else {
								elem[0].__drag_over_class_ = attr['ngFileDragOverClass'] || "dragover";
							}
						}
						elem.addClass(elem[0].__drag_over_class_);
					}, false);
					elem[0].addEventListener("dragenter", function(evt) {
						evt.preventDefault();
					}, false);
					elem[0].addEventListener("dragleave", function(evt) {
						leaveTimeout = $timeout(function() {
							elem.removeClass(elem[0].__drag_over_class_);
							elem[0].__drag_over_class_ = null;
						}, attr['ngFileDragOverDelay'] || 1);
					}, false);

					var fn = $parse(attr['mFileDrop']);
					elem[0].addEventListener("drop", function(evt) {
						evt.preventDefault();
						elem.removeClass(elem[0].__drag_over_class_);
						elem[0].__drag_over_class_ = null;
						extractFiles(evt, function(files) {
							fn(scope, {
								$files : files,
								$event : evt
							});					
						});
					}, false);
					
					
				}
			}
		};
	}]);
	
	/* FILTER */
	app.filter('strLimit', ['$filter', function($filter) {
		return function(input, limit) {
			if (input.length <= limit) {
				return input;
			}
			return $filter('limitTo')(input, limit) + '...';
		};
	}]);
	
	
	/* CONTROLLERS */
	app.controller('mFileExplorerCtrl', ['$scope', 'fileNavigator', 'dialogs', function ($scope, fileNavigator, dialog) {
	    $scope.viewTemplate = "table-view.html";
	    $scope.temp = null;
	    $scope.setTemplate = function (template) {
	        $scope.viewTemplate = template;
	    };

	    $scope.fileItemClick = function (fileItem) {
	        if (fileItem.isFolder()) {
	            $scope.fileNavigator.currentPath.push(fileItem.model.name);
	            $scope.fileNavigator.refresh();
	        } else if (fileItem.isImage()) {
	            $scope.temp = fileItem;
	            $scope.preview();
	        } else {
	            if (fileItem.model.name.split(".")[fileItem.model.name.split(".").length - 1] != "zip") {
	                $scope.temp = fileItem;
	                $scope.getFileContents();
	            }
	        }
	    };

	    $scope.uploadFile = function () {
	        var dlg = dialog.create('mFileExplorer/UploadFile.html', 'UploadFileCtrl', { currentPath: $scope.fileNavigator.currentPath }, { size: 'lg', keyboard: false, backdrop: 'static' });
	        dlg.result.then(function () {
	            $scope.fileNavigator.refresh();
	        });
	    };

	    $scope.preview = function () {
	        dialog.create('mFileExplorer/Preview.html', 'PreviewCtrl', { item: $scope.temp }, { size: 'sm', keyboard: true, backdrop: 'static' });
	    };

	    $scope.getFileContents = function () {
	        $scope.temp.getFileContents().then(function (results) {
	            dialog.create('mFileExplorer/FileContent.html', 'FileContentCtrl', { item : $scope.temp, contents : results.contents }, { size: 'xl', keyboard: true, backdrop: 'static' });
	        });
	    };

	    $scope.contextMenu = function (fileItem) {
	        $scope.temp = fileItem;
	    };

	    $scope.fileNavigator = new fileNavigator();

	    $scope.fileNavigator.refresh();

	    $scope.createBackup = function () {
	        $scope.fileNavigator.createBackup();
	    };
	}]);

	app.controller('UploadFileCtrl', ['$scope', '$http', 'data', '$modalInstance', function ($scope, $http, data, mI) {
	    $scope.files = [];
	    $scope.close = function () {
	        mI.close();
	    }
	    $scope.dropFiles = function ($files, $event) {
	        $scope.files = $files;
	        //HERE GOES UPLOAD

	        for (var i = 0; i < $scope.files.length; i++) {
	            if ($scope.files[i].progress == undefined) $scope.files[i].progress = 0;

	            var form = new FormData();
	            var xhr = new XMLHttpRequest;
	            form.append('currentPath', data.currentPath.join('/'));
	            form.append('filename', $scope.files[i].name);
	            form.append('file', $scope.files[i]);
	            xhr.upload.onprogress = (function (file) {
	                // Event listener for while the file is uploading
	                return function (e) {
	                    $scope.$apply(function () {
	                        file.progress = Math.round(e.loaded / e.total * 100);
	                    });
	                }
	            })($scope.files[i]);

	            xhr.upload.onload = function (e) {
	                // Event listener for when the file completed uploading
	                $scope.$apply(function () {
	                });
	            };

	            xhr.open('POST', 'api/Deep/UploadFile');
	            xhr.send(form);
	        }

	    };
	}]);

	app.controller('PreviewCtrl', ['$scope', 'data', function ($scope, data) {
	    var path = data.item.model.fullPath();
	    $scope.path = path.substring(1, path.length);
	}]);

	app.controller('FileContentCtrl', ['$scope', 'data', '$modalInstance', function ($scope, data, mI) {
	    $scope.Master = {};
	    $scope.Master.contents = data.contents;

	    $scope.save = function () {
	        data.item.saveContents($scope.Master.contents).then(function () {
	            mI.close();
	        });
	    };
	}]);

	
	/* PROVIDER */
	app.provider("mFileExplorerConfig", function() {

        var values = {
            listUrl: '',
            fileDownloadUrl: '',
            saveContentsUrl: '',
            getFileContentsUrl: '',
            uploadFileUrl : '',
        };

        return { 
            $get: function() {
                return values;
            }, 
            set: function (constants) {
                angular.extend(values, constants);
            }
        };
    
    });
	
	/* SERVICES */
	app.service('fileNavigator', ['$http', 'mFileExplorerConfig', 'fileItem', function ($http, mFileExplorerConfig, fileItem) {
        $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        var FileNavigator = function() {
            this.requesting = false;
            this.fileList = [];
            this.currentPath = [];
            this.history = [];
            this.error = '';
        };

        FileNavigator.prototype.refresh = function(success, error) {
            var self = this;
            var path = self.currentPath.join('/');
            var data = {params: {
                mode: "list",
                onlyFolders: false,
                path: '/' + path
            }};

            self.requesting = true;
            self.fileList = [];
            self.error = '';
            $http({
                method: 'POST',
                url: 'api/Deep/GetFiles',
                data: LZString.compressToEncodedURIComponent(JSON.stringify({ currentPath: path })),
                dataType: "json",
                disableInterceptor: true
            }).error(function (data) {
                self.requesting = false;
            }).then(function (results) {
                self.fileList = [];
                angular.forEach(results.data.files, function (file) {
                    self.fileList.push(new fileItem(file, self.currentPath));
                });
                 self.requesting = false;
             });
                
        }

        FileNavigator.prototype.createBackup = function (success, error) {
            var self = this;
            self.requesting = true;

            $http({
                method: 'POST',
                url: 'api/Deep/CreateBackUp',
                dataType: "json",
                disableInterceptor: true
            }).error(function (data) {
                self.requesting = false;
            }).then(function (data) {
                self.requesting = false;
            });


        };
            
        FileNavigator.prototype.folderClick = function(item) {
            var self = this;
            self.currentPath = [];
            if (item && item.isFolder()) {
                self.currentPath = item.model.fullPath().split('/').splice(1);
                //self.currentPath.push(item.model.name);
            }
            self.refresh();
        };

        FileNavigator.prototype.upDir = function() {
            var self = this;
            if (self.currentPath[0]) {
                self.currentPath = self.currentPath.slice(0, -1);
                self.refresh();
            }
        };

        FileNavigator.prototype.goTo = function(index) {
            var self = this;
            self.currentPath = self.currentPath.slice(0, index + 1);
            self.refresh();
        };

        FileNavigator.prototype.fileNameExists = function(fileName) {
            var self = this;
            for (var item in self.fileList) {
                item = self.fileList[item];
                if (fileName.trim && item.model.name.trim() === fileName.trim()) {
                    return true;
                }
            }
        };

        return FileNavigator;
    }]);
	
	/* FACTORIES */
	app.factory('fileItem', ['$http',  'mFileExplorerConfig', function($http,mFileExplorerConfig) {

        var fileItem = function(model, path) {
            var rawModel = {
                name: model && model.name || '',
                path: path || [],
                type: model && model.type || 'file',
                size: model && model.size || 0,
                date: model.date,
                //perms: new Chmod(model && model.rights),
                content: model && model.content || '',
                recursive: false,
                sizeKb: function() {
                    return Math.round(this.size / 1024, 1);
                },
                fullPath: function() {
                    return ('/' + this.path.join('/') + '/' + this.name).replace(/\/\//, '/');
                }
            };

            this.error = '';
            this.inprocess = false;

            this.model = angular.copy(rawModel);
            this.tempModel = angular.copy(rawModel);
			//console.log(this.model.name,this.model.fullPath(),this.model.path);
            function convertDate(mysqlDate) {
                var d = (mysqlDate || '').toString().split(/[- :]/);
                return new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
            }
        };

        fileItem.prototype.update = function() {
            angular.extend(this.model, angular.copy(this.tempModel));
            return this;
        };

        fileItem.prototype.getFileContents = function () {
            var data = {
                path: this.model.fullPath()
            };
            return $http({
                method: 'POST',
                url: 'api/Deep/GetFileContents',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json",
                disableInterceptor : true,
            }).error(function (data, status, headers, config) {
                //console.log(data);
            }).then(function (results) {
                return results.data;
            });
        };

        fileItem.prototype.saveContents = function (contents) {
            var data = {
                path: this.model.fullPath(),
                contents : contents
            };
            return $http({
                method: 'POST',
                url: 'api/Deep/SaveContents',
                data: LZString.compressToEncodedURIComponent(JSON.stringify(data)),
                dataType: "json",
                disableInterceptor : true
            }).error(function (data, status, headers, config) {
            }).then(function (results) {
                //console.log(results);
                return results.data;
            });
        };
        fileItem.prototype.revert = function() {
            angular.extend(this.tempModel, angular.copy(this.model));
            this.error = '';
            return this;
        };

        fileItem.prototype.defineCallback = function(data, success, error) {
            /* Check if there was some error in a 200 response */
            var self = this;
            if (data.result && data.result.error) {
                self.error = data.result.error;
                return typeof error === 'function' && error(data);
            }
            if (data.error) {
                self.error = data.error.message;
                return typeof error === 'function' && error(data);
            }
            self.update();
            return typeof success === 'function' && success(data);
        };       

        fileItem.prototype.download = function(preview) {
            var self = this;


            var iframe = document.createElement("iframe");
            iframe.src = encodeURI('api/Deep/DownloadFile?fileName=' + self.model.name + "&path=" + self.model.fullPath());
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            $(iframe).ready(function () {
                setTimeout(function () {
                    $(iframe).remove();
                }, 5000)
            });
        };

        fileItem.prototype.preview = function() {
            var self = this;
            return self.download(true);
        };

       
        fileItem.prototype.isFolder = function() {
            return this.model.type === 'dir';
        };

        fileItem.prototype.isEditable = function() {
            return !this.isFolder() && fileManagerConfig.isEditableFilePattern.test(this.model.name);
        };

        fileItem.prototype.isImage = function() {
            return /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i.test(this.model.name);
        };

        fileItem.prototype.isCompressible = function() {
            return this.isFolder();
        };

        fileItem.prototype.isExtractable = function() {
            return !this.isFolder() && fileManagerConfig.isExtractableFilePattern.test(this.model.name);
        };

        return fileItem;
	}]);
	
	/* TEMPLATES */
	app.run(["$templateCache", function(t) {;
		t.put("mFileExplorer/index.html", 
		'<div>' +
			'<div class="container-fluid">' +
				'<div class="row container-well">' +
					'<div class="main">' +
						'<div ng-include="\'mFileExplorer/breadcrumb.html\'" class="clearfix"/></div>' +
						'<div ng-include="\'mFileExplorer/\' + viewTemplate" class="main-navigation clearfix"></div>' +
					'</div>' +
				'</div>' +
				//'<div ng-include="\'mFileExplorer/context-menu.html\'"/></div>' +
			'</div>' +
		'</div>');
    
		
		t.put("mFileExplorer/breadcrumb.html",
		'<ol class="breadcrumb mb0 pull-left">' +
			'<li>' +
				'<a href="" ng-click="fileNavigator.goTo(-1)">' +
					'<i class="fa fa-folder-open mr2"></i>' +
				'</a>' +
			'</li>' +
			'<li ng-repeat="(key, dir) in fileNavigator.currentPath track by key" ng-class="{\'active\':$last}" class="animated fast fadeIn">' +
				'<a href="" ng-show="!$last" ng-click="fileNavigator.goTo(key)">' +
					'<i class="fa fa-folder-open mr2"></i> {{dir}}' +
				'</a>' +
				'<span ng-show="$last" class="ng-binding"><i class="fa fa-folder-open mr2"></i>  {{dir}}</span>' +
			'</li>' +
			'<li>' +
				'<button class="btn btn-primary btn-xs" ng-click="fileNavigator.upDir()">↵</button>' +
			'</li>' +
		'</ol>' +
		'<div class="navbar-form navbar-right">' +
			'<input type="text" class="form-control input-sm " placeholder="Search..." ng-model="$parent.query">' +
			'<button class="btn btn-default btn-sm" ng-click="uploadFile()">' +
				'<i class="fa fa-upload"></i> Upload file' +
			'</button>' +
			'<button class="btn btn-default btn-sm" ng-click="setTemplate(\'icon-view.html\')" ng-show="viewTemplate !== \'icon-view.html\'" title="Icons">' +
				'<i class="fa fa-th-large"></i>' +
			'</button>' +
			'<button class="btn btn-default btn-sm ng-hide" ng-click="setTemplate(\'table-view.html\')" ng-show="viewTemplate !== \'table-view.html\'" title="List">' +
				'<i class="fa fa-th-list"></i>' +
			'</button>' +
            '<button class="btn btn-default btn-sm" ng-click="createBackup()">' +
				'<i class="fa fa-floppy-o"></i>Create Backup' +
			'</button>' +
		'</div>');
		
		t.put("mFileExplorer/table-view.html",
		'<table class="table mb0 table-files">' +
			'<thead>' +
				'<tr>' +
					'<th>Name</th>' +
					'<th class="hidden-xs">Size</th>' +
					'<th class="hidden-sm hidden-xs">Date Modified</th>' +
					'<th class="text-right"></th>' +
				'</tr>' +
			'</thead>' +
			'<tbody class="file-item">' +
				'<tr ng-show="fileNavigator.requesting">' +
					'<td colspan="5">' +
						'<div class="spinner-container col-xs-12">' +
							'<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
								'<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
							'</svg>' +
						'</div>' +
						//'<div ng-include="config.tplPath + '/spinner.html'"></div>' +
					'</td>' +
				'</tr>' +
				'<tr ng-show="!fileNavigator.requesting && fileNavigator.fileList.length < 1 && !fileNavigator.error">' +
					'<td colspan="4">' +
						'This folder is empty.' +
					'</td>' +
				'</tr>' +
				'<tr ng-show="!fileNavigator.requesting && fileNavigator.error">' +
					'<td colspan="4">' +
						'{{ fileNavigator.error }}' +
					'</td>' +
				'</tr>' +
				'<tr ng-repeat="item in fileNavigator.fileList | filter: query | orderBy: orderProp" ng-show="!fileNavigator.requesting" ng-context-menu="contextMenu(item)">' +
					'<td>' +
						'<a href="" ng-click="fileItemClick(item)" title="{{item.model.name}} ({{item.model.sizeKb()}}kb)">' +
							'<i class="fa fa-folder" ng-show="item.model.type === \'dir\'"></i>' +
							'<i class="fa fa-file" ng-show="item.model.type === \'file\'"></i> {{item.model.name}}' +
						'</a>' +
					'</td>' +
					'<td class="hidden-xs">' +
						'{{item.model.sizeKb()}}kb' +
					'</td>' +
					'<td class="hidden-sm hidden-xs">' +
						'{{item.model.date | date:\'yyyy-MM-dd hh:mm:ss a\'}}' +
					'</td>' +
					'<td class="text-right">' +
						//'<div ng-include="config.tplPath + '/item-toolbar.html'"></div>' +
					'</td>' +
				'</tr>' +
			'</tbody>' +
		'</table>');
		
		t.put("mFileExplorer/icon-view.html",
		'<div class="iconset clearfix">' +
			'<div class="col-120" ng-repeat="item in fileNavigator.fileList | filter: query | orderBy: orderProp" ng-show="!fileNavigator.requesting && !fileNavigator.error" ng-context-menu="contextMenu(item)">' +
				'<a href="" class="thumbnail text-center" ng-click="fileItemClick(item)" title="{{item.model.name}} ({{item.model.sizeKb()}}kb)">' +
					'<div class="item-icon">' +
						'<i class="fa fa-folder-open" ng-show="item.model.type === \'dir\'"></i>' +
						'<i class="fa fa-file" ng-show="item.model.type === \'file\'"></i>' +
					'</div>' +
					'{{item.model.name | strLimit : 11 }}' +
				'</a>' +
			'</div>' +
			// '<div ng-show="fileNavigator.requesting">' +
				// '<div ng-include="config.tplPath + '/spinner.html'"></div>' +
			// '</div>' +
			'<div class="alert alert-warning" ng-show="!fileNavigator.requesting && fileNavigator.fileList.length < 1 && !fileNavigator.error">' +
				'This folder is empty.' +
			'</div>' +
			'<div class="alert alert-danger" ng-show="!fileNavigator.requesting && fileNavigator.error">' +
				'{{ fileNavigator.error }}' +
			'</div>' +
		'</div>');
		
		
		t.put("mFileExplorer/context-menu.html",
		'<div id="m-file-explorer-context-menu" class="dropdown clearfix animated fast fadeIn hide">' +
			'<ul class="dropdown-menu dropdown-right-click" role="menu" aria-labelledby="dropdownMenu">' +
				//'<li ng-show="config.allowedActions.rename"><a href="" tabindex="-1" data-toggle="modal" data-target="#rename"><i class="glyphicon glyphicon-edit"></i> {{'rename' | translate}}</a></li>' +
				//'<li ng-show="config.allowedActions.copy && !temp.isFolder()"><a href="" tabindex="-1" data-toggle="modal" data-target="#copy"><i class="glyphicon glyphicon-log-out"></i> {{'copy' | translate}}</a></li>' +
				//'<li ng-show="config.allowedActions.edit && temp.isEditable()"><a href="" tabindex="-1" data-toggle="modal" data-target="#edit" ng-click="temp.getContent();"><i class="glyphicon glyphicon-pencil"></i> {{'edit' | translate}}</a></li>' +
				//'<li ng-show="config.allowedActions.changePermissions"><a href="" tabindex="-1" data-toggle="modal" data-target="#changepermissions"><i class="glyphicon glyphicon-lock"></i> {{'permissions' | translate}}</a></li>' +
				//'<li ng-show="config.allowedActions.compress && temp.isCompressible()"><a href="" tabindex="-1" data-toggle="modal" data-target="#compress"><i class="glyphicon glyphicon-compressed"></i> {{'compress' | translate}}</a></li>' +
				//'<li ng-show="config.allowedActions.extract && temp.isExtractable()"><a href="" tabindex="-1" data-toggle="modal" data-target="#extract" ng-click="temp.tempModel.name=''"><i class="glyphicon glyphicon-export"></i> {{'extract' | translate}}</a></li>' +
				'<li ng-show="!temp.isFolder()"><a href="" tabindex="-1" ng-click="temp.download()"><i class="fa fa-download"></i>Download</a></li>' +
				//'<li ng-show="config.allowedActions.preview && temp.isImage()"><a href="" tabindex="-1" ng-click="temp.preview()"><i class="glyphicon glyphicon-picture"></i> {{'view_item' | translate}}</a></li>' +
				//'<li class="divider"></li>' +
				//'<li><a href="" tabindex="-1" data-toggle="modal" data-target="#delete"><i class="fa fa-trash"></i>Remove</a></li>' +
			'</ul>' +
		'</div>');
		
		t.put("mFileExplorer/UploadFile.html",
		'<div class="modal-header">' +
			'<h4 class="modal-title">' +
				'<span class="fa fa-file-text-o"></span> Upload File' +
                '<div style="float:right;">' +
                    '<button type="button" class="btn btn-default" ng-click="close()">Close</button>' +
                '</div>' +
			'</h4>' +
			'</div>' +
			'<div class="modal-body">' +
				'<div m-file-drop="dropFiles($files,$event)" class="dropzone"><span>Drop files here...</span></div>' +
				'<table class="table table-bordered table-hovered">' + 
					'<thead>' + 
						'<tr><th>Name</th><th>Progress</th></tr>' +
					'</thead>' +
					'<tbody>' + 
						'<tr ng-repeat="file in files">' +
							'<td>{{file.name}}</td>' + 
							'<td>' + 
								'<div class="progress">' + 
									'<div class="progress-bar progress-bar-info progress-bar-striped" ng-style="{ \'width\': file.progress + \'%\' }" style="width: 0%;"><span>{{file.progress}} %</span>' + 
								'</div>' + 
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</div>' +
		'</div>');

		t.put("mFileExplorer/Preview.html",
		'<div class="modal-header">' +
			'<h4 class="modal-title">' +
				'<span class="fa fa-file-text-o"></span> Preview' +
			'</h4>' +
			'</div>' +
			'<div class="modal-body">' +
				'<img ng-src="{{path}}" class="preview-image"/>' +
			'</div>' +
		'</div>');

		t.put("mFileExplorer/FileContent.html",
		'<div class="modal-header">' +
			'<h4 class="modal-title">' +
				'<span class="fa fa-file-text-o"></span> Contents' +
                '<div style="float:right;">' +
                    '<button type="button" class="btn btn-default" ng-click="save()">Save</button>' +
                '</div>' +
			'</h4>' +
			'</div>' +
			'<div class="modal-body">' +
                '<textarea ng-model="Master.contents" class="form-control" rows="16" ></textarea>' +
			'</div>' +
		'</div>');

    }]);
})(window, angular);
