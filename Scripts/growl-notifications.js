//!function(a,b){angular.module("growlNotifications.config",[]).value("growlNotifications.config",{debug:!0}),angular.module("growlNotifications.directives",[]),angular.module("growlNotifications.filters",[]),angular.module("growlNotifications.services",[]),angular.module("growlNotifications",["growlNotifications.config","growlNotifications.directives","growlNotifications.filters","growlNotifications.services"]),angular.module("growlNotifications.directives").directive("growlNotification",["growlNotifications","$sce","$interpolate",function(a,c,d){var e={message:"",type:"info",ttl:5e3};return{restrict:"AE",replace:!0,template:"",transclude:!0,link:function(f,g,h,i,j){var k=angular.extend({},e,f.$eval(h.growlNotification));j(function(e,f){var g,h,i,j;g=angular.element(b.createElement("div")),g.append(e),h=g.html(),i=d(h),h=i(f),j=c.trustAsHtml(h),a.add(j,k.type,k.ttl)})}}}]),angular.module("growlNotifications.directives").directive("growlNotifications",["growlNotifications",function(a){return{restrict:"AE",replace:!1,scope:{},template:['<ul class="list-unstyled">','   <li ng-repeat="(id, notification) in notifications">','       <div class="{{cssPrefix}} {{cssPrefix}}-{{notification.type}}">','           <div ng-bind-html="notification.message">',"           </div>","       </div>","   </li>","</ul>"].join("\n"),link:function(b){b.cssPrefix=a.options.cssPrefix,b.notifications=a.notifications}}}]),angular.module("growlNotifications.services").provider("growlNotifications",[function(){var a={ttl:5e3,type:"info",cssPrefix:"alert"};this.setOptions=function(b){return angular.extend(a,b),this},this.ttl=function(b){return angular.isDefined(b)?(a.ttl=b,this):a.ttl},this.type=function(b){return angular.isDefined(b)?(a.type=b,this):a.type},this.cssPrefix=function(b){return angular.isDefined(b)?(a.cssPrefix=b,this):a.cssPrefix},this.$get=function(b,c){function d(){this._notifications={},this._index=0,this.options=a,Object.defineProperty(this,"notifications",{get:function(){return this._notifications}})}return d.prototype._broadcastUpdate=function(){c.$broadcast("growlNotifications::update",this.notifications)},d.prototype.add=function(c,d,e){var f,g=this._index++,h=this;return f={message:c?c.toString():"",type:d?d.toString():a.type,ttl:e?parseInt(e,10):a.ttl},this._notifications[g]=f,b(function(){h.remove(g)},f.ttl),this._broadcastUpdate(),g},d.prototype.remove=function(a){return this._notifications.hasOwnProperty(a)&&(delete this._notifications[a],this._broadcastUpdate()),this},new d},this.$get.$inject=["$timeout","$rootScope"]}])}(window,document);
! function (a, b) {
    angular.module("growlNotifications.config", []).value("growlNotifications.config", {
        debug: !0
    }), angular.module("growlNotifications.directives", []), angular.module("growlNotifications.filters", []), angular.module("growlNotifications.services", []), angular.module("growlNotifications", ["growlNotifications.config", "growlNotifications.directives", "growlNotifications.filters", "growlNotifications.services"]), angular.module("growlNotifications.directives").directive("growlNotification", ["growlNotifications", "$sce", "$interpolate", function (a, c, d) {
        var e = {
            message: "",
            type: "info",
            ttl: 5e3
        };
        return {
            restrict: "AE",
            replace: !0,
            template: "",
            transclude: !0,
            link: function (f, g, h, i, j) {
                var k = angular.extend({}, e, f.$eval(h.growlNotification));
                j(function (e, f) {
                    var g, h, i, j;
                    g = angular.element(b.createElement("div")), g.append(e), h = g.html(), i = d(h), h = i(f), j = c.trustAsHtml(h), a.add(j, k.type, k.ttl)
                })
            }
        }
    }]), angular.module("growlNotifications.directives").directive("growlNotifications", ["growlNotifications", function (a) {
        return {
            restrict: "AE",
            replace: !1,
            scope: {},
            template: ['<ul class="list-unstyled">', '   <li ng-repeat="(id, notification) in notifications">', '       <div class="{{cssPrefix}} {{cssPrefix}}-{{notification.type}}">', '           <div ng-bind-html="notification.message">', "           </div>", "       </div>", "   </li>", "</ul>"].join("\n"),
            link: function (b) {
                b.cssPrefix = a.options.cssPrefix, b.notifications = a.notifications
            }
        }
    }]), angular.module("growlNotifications.services").provider("growlNotifications", [function () {
        var a = {
            ttl: 5e3,
            type: "info",
            cssPrefix: "alert"
        };
        this.setOptions = function (b) {
            return angular.extend(a, b), this
        }, this.ttl = function (b) {
            return angular.isDefined(b) ? (a.ttl = b, this) : a.ttl
        }, this.type = function (b) {
            return angular.isDefined(b) ? (a.type = b, this) : a.type
        }, this.cssPrefix = function (b) {
            return angular.isDefined(b) ? (a.cssPrefix = b, this) : a.cssPrefix
        }, this.$get = function (b, c) {
            function d() {
                this._notifications = {}, this._index = 0, this.options = a, Object.defineProperty(this, "notifications", {
                    get: function () {
                        return this._notifications
                    }
                })
            }
            return d.prototype._broadcastUpdate = function () {
                c.$broadcast("growlNotifications::update", this.notifications)
            }, d.prototype.add = function (c, d, e) {
                var f, g = this._index++,
                    h = this;
                return f = {
                    message: c ? c.toString() : "",
                    type: d ? d.toString() : a.type,
                    ttl: e ? parseInt(e, 10) : a.ttl
                }, this._notifications[g] = f, b(function () {
                    h.remove(g)
                }, f.ttl), this._broadcastUpdate(), g
            }, d.prototype.remove = function (a) {
                return this._notifications.hasOwnProperty(a) && (delete this._notifications[a], this._broadcastUpdate()), this
            }, new d
        }, this.$get.$inject = ["$timeout", "$rootScope"]
    }])
}(window, document);