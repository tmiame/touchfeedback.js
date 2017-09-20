(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.touchfeedback = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var conf = {
    isIE: window.navigator.userAgent.toLowerCase().indexOf('msie') !== -1,
    isTouch: typeof document.ontouchstart !== 'undefined',
    isPointer: typeof window.navigator.pointerEnabled !== 'undefined',
    isMSPoniter: typeof window.navigator.msPointerEnabled !== 'undefined',
    touch: {
      enter: 'touchstart',
      leave: 'touchend',
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    },
    pointer: {
      enter: 'pointerenter',
      leave: 'pointerleave',
      start: 'pointerdown',
      move: 'pointermove',
      end: 'pointerup'
    },
    msPointer: {
      enter: 'MSPointerOver',
      leave: 'MSPointerOut',
      start: 'MSPointerDown',
      move: 'MSPointerMove',
      end: 'MSPointerUp'
    },
    mouse: {
      enter: 'mouseenter',
      leave: 'mouseleave',
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    }
  };

  var eventPointer = {
    enter: conf.isTouch ? conf.touch.enter : conf.isPointer ? conf.pointer.enter : conf.isMSPointer ? conf.msPointer.enter : conf.mouse.enter,
    leave: conf.isTouch ? conf.touch.leave : conf.isPointer ? conf.pointer.leave : conf.isMSPointer ? conf.msPointer.leave : conf.mouse.leave,
    start: conf.isTouch ? conf.touch.start : conf.isPointer ? conf.pointer.start : conf.isMSPointer ? conf.msPointer.start : conf.mouse.start,
    move: conf.isTouch ? conf.touch.move : conf.isPointer ? conf.pointer.move : conf.isMSPointer ? conf.msPointer.move : conf.mouse.move,
    end: conf.isTouch ? conf.touch.end : conf.isPointer ? conf.pointer.end : conf.isMSPointer ? conf.msPointer.end : conf.mouse.end
  };

  var _this = {
    STATE_HOVER_CLASS: 'is-touch',
    STATE_CLICK_CLASS: 'is-click',
    STATE_TAP: false,

    findNode: function findNode(target) {
      var parentDOM = target;
      for (var i = 0; i < 10; i++) {
        if (parentDOM.getAttribute('data-touch') === '') {
          return parentDOM;
        } else {
          parentDOM = parentDOM.parentNode;
        }
      }
    },
    touchAddClass: function touchAddClass(e) {
      var el = _this.findNode(e.target);
      el.classList.add(_this.STATE_HOVER_CLASS);
    },
    touchRemoveClass: function touchRemoveClass(e) {
      var el = _this.findNode(e.target);
      el.classList.remove(_this.STATE_HOVER_CLASS);
    },
    tapedTouchStart: function tapedTouchStart() {
      _this.STATE_TAP = true;
    },
    tapedTouchMove: function tapedTouchMove() {
      if (_this.STATE_TAP) _this.STATE_TAP = false;
    },
    tapedTouchEnd: function tapedTouchEnd(e) {
      if (!_this.STATE_TAP) {
        return;
      }
      var el = _this.findNode(e.target);
      el.classList.add(_this.STATE_CLICK_CLASS);
      setTimeout(function () {
        el.classList.remove(_this.STATE_CLICK_CLASS);
      }, 200);
    },
    removeClass: function removeClass() {
      var touchEl = document.querySelectorAll('[data-touch]');
      for (var i = 0; i < touchEl.length; i++) {
        if (touchEl[i].classList.contains(_this.STATE_HOVER_CLASS)) {
          touchEl[i].classList.remove(_this.STATE_HOVER_CLASS);
        }
        if (touchEl[i].classList.contains(_this.STATE_CLICK_CLASS)) {
          touchEl[i].classList.remove(_this.STATE_CLICK_CLASS);
        }
      }
    },
    removeEvent: function removeEvent() {
      var touchEl = document.querySelectorAll('[data-touch]');
      for (var i = 0; i < touchEl.length; i++) {
        touchEl[i].removeEventListener(eventPointer.enter, _this.touchAddClass, false);
        touchEl[i].removeEventListener(eventPointer.leave, _this.touchRemoveClass, false);

        touchEl[i].removeEventListener(eventPointer.start, _this.tapedTouchStart, false);
        touchEl[i].removeEventListener(eventPointer.move, _this.tapedTouchMove, false);
        touchEl[i].removeEventListener(eventPointer.end, _this.tapedTouchEnd, false);
      }
    },
    setEvent: function setEvent() {
      var touchEl = document.querySelectorAll('[data-touch]');
      for (var i = 0; i < touchEl.length; i++) {
        touchEl[i].addEventListener(eventPointer.enter, _this.touchAddClass, false);
        touchEl[i].addEventListener(eventPointer.leave, _this.touchRemoveClass, false);

        touchEl[i].addEventListener(eventPointer.start, _this.tapedTouchStart, false);
        touchEl[i].addEventListener(eventPointer.move, _this.tapedTouchMove, false);
        touchEl[i].addEventListener(eventPointer.end, _this.tapedTouchEnd, false);
      }
    },
    init: function init() {
      var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.STATE_HOVER_CLASS = customOptions.hoverClass ? customOptions.hoverClass : 'is-touch';
      _this.STATE_CLICK_CLASS = customOptions.clickClass ? customOptions.clickClass : 'is-click';
      _this.setEvent();
    },
    refresh: function refresh() {
      _this.removeEvent();
      _this.removeClass();
      _this.setEvent();
    },
    destory: function destory() {
      _this.removeEvent();
      _this.removeClass();
    }
  };

  module.exports = _this;
});
