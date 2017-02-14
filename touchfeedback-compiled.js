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
    STATE_HOVER: 'is-touch',
    STATE_CLICK: 'is-click',
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
      el.classList.add(_this.STATE_HOVER);
    },
    touchRemoveClass: function touchRemoveClass(e) {
      var el = _this.findNode(e.target);
      el.classList.remove(_this.STATE_HOVER);
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
      el.classList.add(_this.STATE_CLICK);
      setTimeout(function () {
        el.classList.remove(_this.STATE_CLICK);
      }, 100);
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
      _this.setEvent();
    },
    refresh: function refresh() {
      _this.removeEvent();
      _this.setEvent();
    },
    destory: function destory() {
      _this.removeEvent();
    }
  };

  module.exports = _this;
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWdGWixXQWhGWSxxQkFnRkY7QUFDUixZQUFNLFdBQU47QUFDRDtBQWxGVyxHQUFkOztBQXFGQSxTQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoidG91Y2hmZWVkYmFjay1jb21waWxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFRvdWNoRmVlZGJhY2suanNcbiAqL1xuXG5jb25zdCBjb25mID0ge1xuICBpc0lFOiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdtc2llJykgIT09IC0xKSxcbiAgaXNUb3VjaDogKHR5cGVvZiBkb2N1bWVudC5vbnRvdWNoc3RhcnQgIT09ICd1bmRlZmluZWQnKSxcbiAgaXNQb2ludGVyOiAodHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgIT09ICd1bmRlZmluZWQnKSxcbiAgaXNNU1Bvbml0ZXI6ICh0eXBlb2Ygd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICE9PSAndW5kZWZpbmVkJyksXG4gIHRvdWNoOiB7XG4gICAgZW50ZXI6ICd0b3VjaHN0YXJ0JyxcbiAgICBsZWF2ZTogJ3RvdWNoZW5kJyxcbiAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIGVuZDogJ3RvdWNoZW5kJ1xuICB9LFxuICBwb2ludGVyOiB7XG4gICAgZW50ZXI6ICdwb2ludGVyZW50ZXInLFxuICAgIGxlYXZlOiAncG9pbnRlcmxlYXZlJyxcbiAgICBzdGFydDogJ3BvaW50ZXJkb3duJyxcbiAgICBtb3ZlOiAncG9pbnRlcm1vdmUnLFxuICAgIGVuZDogJ3BvaW50ZXJ1cCdcbiAgfSxcbiAgbXNQb2ludGVyOiB7XG4gICAgZW50ZXI6ICdNU1BvaW50ZXJPdmVyJyxcbiAgICBsZWF2ZTogJ01TUG9pbnRlck91dCcsXG4gICAgc3RhcnQ6ICdNU1BvaW50ZXJEb3duJyxcbiAgICBtb3ZlOiAnTVNQb2ludGVyTW92ZScsXG4gICAgZW5kOiAnTVNQb2ludGVyVXAnXG4gIH0sXG4gIG1vdXNlOiB7XG4gICAgZW50ZXI6ICdtb3VzZWVudGVyJyxcbiAgICBsZWF2ZTogJ21vdXNlbGVhdmUnLFxuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBlbmQ6ICdtb3VzZXVwJ1xuICB9XG59XG5cbmNvbnN0IGV2ZW50UG9pbnRlciA9IHtcbiAgZW50ZXI6IChjb25mLmlzVG91Y2gpID8gY29uZi50b3VjaC5lbnRlciA6IChjb25mLmlzUG9pbnRlcikgPyBjb25mLnBvaW50ZXIuZW50ZXIgOiAoY29uZi5pc01TUG9pbnRlcikgPyBjb25mLm1zUG9pbnRlci5lbnRlciA6IGNvbmYubW91c2UuZW50ZXIsXG4gIGxlYXZlOiAoY29uZi5pc1RvdWNoKSA/IGNvbmYudG91Y2gubGVhdmUgOiAoY29uZi5pc1BvaW50ZXIpID8gY29uZi5wb2ludGVyLmxlYXZlIDogKGNvbmYuaXNNU1BvaW50ZXIpID8gY29uZi5tc1BvaW50ZXIubGVhdmUgOiBjb25mLm1vdXNlLmxlYXZlLFxuICBzdGFydDogKGNvbmYuaXNUb3VjaCkgPyBjb25mLnRvdWNoLnN0YXJ0IDogKGNvbmYuaXNQb2ludGVyKSA/IGNvbmYucG9pbnRlci5zdGFydCA6IChjb25mLmlzTVNQb2ludGVyKSA/IGNvbmYubXNQb2ludGVyLnN0YXJ0IDogY29uZi5tb3VzZS5zdGFydCxcbiAgbW92ZTogKGNvbmYuaXNUb3VjaCkgPyBjb25mLnRvdWNoLm1vdmUgOiAoY29uZi5pc1BvaW50ZXIpID8gY29uZi5wb2ludGVyLm1vdmUgOiAoY29uZi5pc01TUG9pbnRlcikgPyBjb25mLm1zUG9pbnRlci5tb3ZlIDogY29uZi5tb3VzZS5tb3ZlLFxuICBlbmQ6IChjb25mLmlzVG91Y2gpID8gY29uZi50b3VjaC5lbmQgOiAoY29uZi5pc1BvaW50ZXIpID8gY29uZi5wb2ludGVyLmVuZCA6IChjb25mLmlzTVNQb2ludGVyKSA/IGNvbmYubXNQb2ludGVyLmVuZCA6IGNvbmYubW91c2UuZW5kXG59XG5cbmNvbnN0IF90aGlzID0ge1xuICBTVEFURV9IT1ZFUjogJ2lzLXRvdWNoJyxcbiAgU1RBVEVfQ0xJQ0s6ICdpcy1jbGljaycsXG4gIFNUQVRFX1RBUDogZmFsc2UsXG5cbiAgZmluZE5vZGUodGFyZ2V0KSB7XG4gICAgbGV0IHBhcmVudERPTSA9IHRhcmdldFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgaWYgKHBhcmVudERPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG91Y2gnKSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudERPTVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50RE9NID0gcGFyZW50RE9NLnBhcmVudE5vZGVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdG91Y2hBZGRDbGFzcyhlKSB7XG4gICAgY29uc3QgZWwgPSBfdGhpcy5maW5kTm9kZShlLnRhcmdldClcbiAgICBlbC5jbGFzc0xpc3QuYWRkKF90aGlzLlNUQVRFX0hPVkVSKVxuICB9LFxuXG4gIHRvdWNoUmVtb3ZlQ2xhc3MoZSkge1xuICAgIGNvbnN0IGVsID0gX3RoaXMuZmluZE5vZGUoZS50YXJnZXQpXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShfdGhpcy5TVEFURV9IT1ZFUilcbiAgfSxcblxuICB0YXBlZFRvdWNoU3RhcnQoKSB7XG4gICAgX3RoaXMuU1RBVEVfVEFQID0gdHJ1ZVxuICB9LFxuXG4gIHRhcGVkVG91Y2hNb3ZlKCkge1xuICAgIGlmIChfdGhpcy5TVEFURV9UQVApIF90aGlzLlNUQVRFX1RBUCA9IGZhbHNlXG4gIH0sXG5cbiAgdGFwZWRUb3VjaEVuZChlKSB7XG4gICAgaWYgKCFfdGhpcy5TVEFURV9UQVApIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBlbCA9IF90aGlzLmZpbmROb2RlKGUudGFyZ2V0KVxuICAgIGVsLmNsYXNzTGlzdC5hZGQoX3RoaXMuU1RBVEVfQ0xJQ0spXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLlNUQVRFX0NMSUNLKVxuICAgIH0sIDEwMClcbiAgfSxcblxuICByZW1vdmVFdmVudCgpIHtcbiAgICBjb25zdCB0b3VjaEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG91Y2hdJylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdWNoRWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIEhvdmVyXG4gICAgICB0b3VjaEVsW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRQb2ludGVyLmVudGVyLCBfdGhpcy50b3VjaEFkZENsYXNzLCBmYWxzZSlcbiAgICAgIHRvdWNoRWxbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFBvaW50ZXIubGVhdmUsIF90aGlzLnRvdWNoUmVtb3ZlQ2xhc3MsIGZhbHNlKVxuICAgICAgLy8gQ2xpY2tcbiAgICAgIHRvdWNoRWxbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFBvaW50ZXIuc3RhcnQsIF90aGlzLnRhcGVkVG91Y2hTdGFydCwgZmFsc2UpXG4gICAgICB0b3VjaEVsW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRQb2ludGVyLm1vdmUsIF90aGlzLnRhcGVkVG91Y2hNb3ZlLCBmYWxzZSlcbiAgICAgIHRvdWNoRWxbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFBvaW50ZXIuZW5kLCBfdGhpcy50YXBlZFRvdWNoRW5kLCBmYWxzZSlcbiAgICB9XG4gIH0sXG5cbiAgc2V0RXZlbnQoKSB7XG4gICAgY29uc3QgdG91Y2hFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvdWNoXScpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VjaEVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBIb3ZlclxuICAgICAgdG91Y2hFbFtpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50UG9pbnRlci5lbnRlciwgX3RoaXMudG91Y2hBZGRDbGFzcywgZmFsc2UpXG4gICAgICB0b3VjaEVsW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRQb2ludGVyLmxlYXZlLCBfdGhpcy50b3VjaFJlbW92ZUNsYXNzLCBmYWxzZSlcbiAgICAgIC8vIENsaWNrXG4gICAgICB0b3VjaEVsW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRQb2ludGVyLnN0YXJ0LCBfdGhpcy50YXBlZFRvdWNoU3RhcnQsIGZhbHNlKVxuICAgICAgdG91Y2hFbFtpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50UG9pbnRlci5tb3ZlLCBfdGhpcy50YXBlZFRvdWNoTW92ZSwgZmFsc2UpXG4gICAgICB0b3VjaEVsW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRQb2ludGVyLmVuZCwgX3RoaXMudGFwZWRUb3VjaEVuZCwgZmFsc2UpXG4gICAgfVxuICB9LFxuXG4gIGluaXQoKSB7XG4gICAgX3RoaXMuc2V0RXZlbnQoKVxuICB9LFxuXG4gIHJlZnJlc2goKSB7XG4gICAgX3RoaXMucmVtb3ZlRXZlbnQoKVxuICAgIF90aGlzLnNldEV2ZW50KClcbiAgfSxcblxuICBkZXN0b3J5KCkge1xuICAgIF90aGlzLnJlbW92ZUV2ZW50KClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90aGlzXG4iXX0=