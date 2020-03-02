'use strict';

define(['app'], function (app) {

	var utilService = function(){
	    var utilFactory = {},
	        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		
		// AGGREGATE FUNCTIONS
		utilFactory.Sum = function(row, field){ //TODO FORMAT
			var ret = 0;
			var tmp;
			if (row.aggChildren.length == 0) {
			    angular.forEach(row.children, function (a) {
			        tmp = a.getProperty(field);
			        if (tmp) { ret += tmp; }
			    });
			} else {
			    angular.forEach(row.aggChildren, function (p) {
			        angular.forEach(p.children, function (a) {
			            tmp = a.getProperty(field);
			            if (tmp) { ret += tmp; }
			        });
			    });
			}
			
			return ret;
		}
		
		utilFactory.Max = function(row, field){
			var ret = 0;
			var tmp;
			angular.forEach(row.children, function(a) {
				tmp = a.getProperty(field);
				if (tmp > ret) { ret = tmp; }
			});
			return ret;
		}
		
		utilFactory.Min = function(row, field){
			var ret = null;
			var tmp;
			angular.forEach(row.children, function(a) {
				tmp = a.getProperty(field);
				if(ret === null){ ret = tmp; }
				if (tmp <= ret) { ret = tmp; }
			});
			return ret;
		}
		
		utilFactory.Ave = function(row, field){ //TODO FORMAT
			var ret = utilFactory.Sum(row,field) / row.children.length;
			return ret;
		}

		utilFactory.pushArray = function (arr1, arr2) { 
		    angular.forEach(arr2, function (value, key) {
		        arr1[key] = value;
		    });
		}

		
		utilFactory.Encode = function (e) {
		    var t = "";
		    var n, r, i, s, o, u, a;
		    var f = 0;
		    e = utilFactory._utf8_encode(e);
		    while (f < e.length) {
		        n = e.charCodeAt(f++);
		        r = e.charCodeAt(f++);
		        i = e.charCodeAt(f++);
		        s = n >> 2;
		        o = (n & 3) << 4 | r >> 4;
		        u = (r & 15) << 2 | i >> 6;
		        a = i & 63;
		        if (isNaN(r)) {
		            u = a = 64;
		        } else if (isNaN(i)) {
		            a = 64;
		        }
		        t = t + _keyStr.charAt(s) + _keyStr.charAt(o) + _keyStr.charAt(u) + _keyStr.charAt(a);
		    }
		    return t;
		}
		 
		utilFactory.Decode = function (e) {
		    var t = "";
		    var n, r, i;
		    var s, o, u, a;
		    var f = 0;
		    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		    while (f < e.length) {
		        s = this._keyStr.indexOf(e.charAt(f++));
		        o = this._keyStr.indexOf(e.charAt(f++));
		        u = this._keyStr.indexOf(e.charAt(f++));
		        a = this._keyStr.indexOf(e.charAt(f++));
		        n = s << 2 | o >> 4;
		        r = (o & 15) << 4 | u >> 2;
		        i = (u & 3) << 6 | a;
		        t = t + String.fromCharCode(n);
		        if (u != 64) {
		            t = t + String.fromCharCode(r)
		        }
		        if (a != 64) {
		            t = t + String.fromCharCode(i)
		        }
		    }
		    t = utilFactory._utf8_decode(t);
		    return t;
		};

		utilFactory._utf8_encode = function(e) {
		    e = e.replace(/\r\n/g, "\n");
		    var t = "";
		    for (var n = 0; n < e.length; n++) {
		        var r = e.charCodeAt(n);
		        if (r < 128) {
		            t += String.fromCharCode(r)
		        } else if (r > 127 && r < 2048) { 
		            t += String.fromCharCode(r >> 6 | 192);
		            t += String.fromCharCode(r & 63 | 128)
		        } else {
		            t += String.fromCharCode(r >> 12 | 224);
		            t += String.fromCharCode(r >> 6 & 63 | 128);
		            t += String.fromCharCode(r & 63 | 128)
		        }
		    }
		    return t;
		}

	    utilFactory._utf8_decode = function(e) {
	        var t = "";
	        var n = 0;
	        var r = c1 = c2 = 0;
	        while (n < e.length) {
	            r = e.charCodeAt(n);
	            if (r < 128) {
	                t += String.fromCharCode(r);
	                n++;
	            } else if (r > 191 && r < 224) {
	                c2 = e.charCodeAt(n + 1);
	                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
	                n += 2;
	            } else {
	                c2 = e.charCodeAt(n + 1);
	                c3 = e.charCodeAt(n + 2);
	                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
	                n += 3;
	            }
	        }
	        return t;
	    }

	    utilFactory.getTree = function (data, primaryIdName, parentIdName) {
	        if (!data || data.length == 0 || !primaryIdName || !parentIdName)
	            return [];

	        var tree = [],
                rootIds = [],
                item = data[0],
                primaryKey = item[primaryIdName],
                treeObjs = {},
                parentId,
                parent,
                len = data.length,
                i = 0;
	        function comparator(a, b) {
	            return a[primaryIdName] - b[primaryIdName];
	        }
	        data.sort(comparator);
	        while (i < len) {
	            item = data[i++];
	            primaryKey = item[primaryIdName];
	            treeObjs[primaryKey] = item;
	            parentId = item[parentIdName];
	            
	            if (parentId) {
	                parent = treeObjs[parentId]; 
	                if (parent != undefined) {
	  
	                    if (parent.children) {
	                        parent.children.push(item);
	                    }
	                    else {
	                        parent.children = [item];
	                    }
	                } else {
	                    if (!item.children) item.children = [];
	                    rootIds.push(primaryKey);
	                }
	            }
	            else {
	             
	                rootIds.push(primaryKey);
	            }
	        }

	        for (var i = 0; i < rootIds.length; i++) {
	            tree.push(treeObjs[rootIds[i]]);
	        };

	        return tree;
	    }

		
		return utilFactory;
	}

	app.factory('utilService', utilService);
});