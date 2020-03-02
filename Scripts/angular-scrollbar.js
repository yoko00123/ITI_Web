(function() {
    "use strict";
	angular.module('mScrollBar',[])
	.factory('ScrollBar',[function(){
		var defaults = {
            axis: 'y',
			wheel: true,
			wheelSpeed: 40,
			wheelLock: true,
			touchLock: true,
			trackSize: false,
			thumbSize: false,
			thumbSizeMin: 20,
			height : 0,
        }
		var ScrollBar = function ScrollBar(el,options){
			el.addClass('mscrollbar');
			this.options = angular.extend({}, defaults, options);
			this._defaults = defaults;
			
			var self = this,
				$body = document.querySelectorAll("body")[0],
				$viewport = el[0].querySelectorAll(".viewport")[0],
				$overview = el[0].querySelectorAll(".overview")[0],
				$scrollbar = el[0].querySelectorAll(".scrollbar")[0],
				$track = $scrollbar.querySelectorAll(".track")[0],
				$thumb = $scrollbar.querySelectorAll(".thumb")[0],

				mousePosition = 0,
				isHorizontal = this.options.axis === 'x',
				hasTouchEvents = ("ontouchstart" in document.documentElement),
				wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
									 document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
									 "DOMMouseScroll", // older Firefox

				sizeLabel = isHorizontal ? "width" : "height",
				posiLabel = isHorizontal ? "left" : "top",
				moveEvent = document.createEvent("HTMLEvents");

			$viewport.style.width= this.options.width - 10 + 'px'; 
			$viewport.style.height= this.options.height + 'px'; 	 
			//console.log($viewport.style);
			moveEvent.initEvent("move", true, true);
			
			// The position of the content relative to the viewport.
			this.contentPosition = 0;

			// The height or width of the viewport.
			this.viewportSize = 0;

			// The height or width of the content.
			this.contentSize = 0;

			// The ratio of the content size relative to the viewport size.
			this.contentRatio = 0;

			// The height or width of the content.
			this.trackSize = 0;

			// The size of the track relative to the size of the content.
			this.trackRatio = 0;

			// The height or width of the thumb.
			this.thumbSize = 0;

			// The position of the thumb relative to the track.
			this.thumbPosition = 0;

			//  Will be true if there is content to scroll.
			this.hasContentToSroll = false;
			
			
			function _initialize() {
				self.update();
				_setEvents();

				return self;
			}
			
			this.update = function(scrollTo) {
				var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
				var scrcls = $scrollbar.className;

				this.viewportSize = $viewport['offset'+ sizeLabelCap];
				this.contentSize = $overview['scroll'+ sizeLabelCap];
				this.contentRatio = this.viewportSize / this.contentSize;
				this.trackSize = this.options.trackSize || this.viewportSize;
				this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
				this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize);
				this.hasContentToSroll = this.contentSize == 0 ? false : this.contentRatio < 1 ;

				$scrollbar.className = this.hasContentToSroll ? scrcls.replace(/disable/g, "") : scrcls.replace(/ disable/g, "") + " disable";

				switch (scrollTo) {
					case "bottom":
						this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
						break;

					case "relative":
						this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
						break;

					default:
						this.contentPosition = parseInt(scrollTo, 10) || 0;
				}

				this.thumbPosition = self.contentPosition / self.trackRatio;

				_setCss();

				return self;
			};
			
			function _setCss() {
				$thumb.style[posiLabel] = self.thumbPosition + "px";
				$overview.style[posiLabel] = -self.contentPosition + "px";
				$scrollbar.style[sizeLabel] = self.trackSize + "px";
				$track.style[sizeLabel] = self.trackSize + "px";
				$thumb.style[sizeLabel] = self.thumbSize + "px";
			}

			function _setEvents() {
				if(hasTouchEvents) {
					$viewport.ontouchstart = function(event) {
						if(1 === event.touches.length) {
							_start(event.touches[0]);
							event.stopPropagation();
						}
					};
				}
				else {
					$thumb.onmousedown = function(event) {
						event.stopPropagation();
						_start(event);
					};

					$track.onmousedown = function(event) {
						_start(event, true);
					};
				}

				window.addEventListener("resize", function() {
				   self.update("relative");
				}, true);

				if(self.options.wheel && window.addEventListener) {
					el[0].addEventListener(wheelEvent, _wheel, false );
				}
				else if(self.options.wheel) {
					el[0].onmousewheel = _wheel;
				}
			}

			function _isAtBegin() {
				return self.contentPosition > 0;
			}

			function _isAtEnd() {
				return self.contentPosition <= (self.contentSize - self.viewportSize) - 5;
			}

			function _start(event, gotoMouse) {
				if(self.hasContentToSroll) {
					var posiLabelCap = posiLabel.charAt(0).toUpperCase() + posiLabel.slice(1).toLowerCase();
					mousePosition = gotoMouse ? $thumb.getBoundingClientRect()[posiLabel] : (isHorizontal ? event.clientX : event.clientY);

					$body.className += " noSelect";

					if(hasTouchEvents) {
						document.ontouchmove = function(event) {
							if(self.options.touchLock || _isAtBegin() && _isAtEnd()) {
								event.preventDefault();
							}
							_drag(event.touches[0]);
						};
						document.ontouchend = _end;
					}
					else {
						document.onmousemove = _drag;
						document.onmouseup = $thumb.onmouseup = _end;
					}

					_drag(event);
				}
			}


			function _wheel(event) {
				if(self.hasContentToSroll) {
					var evntObj = event || window.event,
						wheelSpeedDelta = -(evntObj.deltaY || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40,
						multiply = (evntObj.deltaMode === 1) ? self.options.wheelSpeed : 1;

					self.contentPosition -= wheelSpeedDelta * self.options.wheelSpeed;
					self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));
					self.thumbPosition = self.contentPosition / self.trackRatio;

					el[0].dispatchEvent(moveEvent);

					$thumb.style[posiLabel] = self.thumbPosition + "px";
					$overview.style[posiLabel] = -self.contentPosition + "px";

					if(self.options.wheelLock || _isAtBegin() && _isAtEnd()) {
						evntObj.preventDefault();
					}
				}
			}

			function _drag(event) {
				if(self.hasContentToSroll)
				{
					var mousePositionNew = isHorizontal ? event.clientX : event.clientY,
						thumbPositionDelta = hasTouchEvents ? (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition),
						thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta));	

					self.contentPosition = thumbPositionNew * self.trackRatio;

					el[0].dispatchEvent(moveEvent);

					$thumb.style[posiLabel] = thumbPositionNew + "px";
					$overview.style[posiLabel] = -self.contentPosition + "px";
				}
			}


			function _end() {
				self.thumbPosition = parseInt($thumb.style[posiLabel], 10) || 0;

				$body.className = $body.className.replace(" noSelect", "");
				document.onmousemove = document.onmouseup = null;
				$thumb.onmouseup = null;
				$track.onmouseup = null;
				document.ontouchmove = document.ontouchend = null;
			}

			return _initialize();
		};
	
		return ScrollBar;
	}])
	.directive('mScrollbar',['ScrollBar','$timeout', function(ScrollBar, $timeout){
		return {
			restrict: 'A',
			priority : 1000,
			template: '<div>' + 
						'<div class="viewport">' + 
							'<div class="overview" ng-transclude></div>' + 
						'</div>' +
						'<div class="scrollbar">' + 
							'<div class="track">' + 
								'<div class="thumb"></div>' +
							'</div>' + 
						'</div>' + 
					   '</div>',
			replace: true,
			transclude: true,
			compile : function(){
				return {
					post : function($scope, element,attrs){
						
						$timeout(function(){
							new ScrollBar(element,{ height : parseInt(attrs.mScrollbarHeight), width : element[0].offsetWidth });
							//console.log('SCROLLBAR');
						},0);
					}
				}
			}
		}
	}]);
})();