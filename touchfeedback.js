'use strict'

/**
 * TouchFeedback.js
 */

const conf = {
  isIE: (window.navigator.userAgent.toLowerCase().indexOf('msie') !== -1),
  isTouch: (typeof document.ontouchstart !== 'undefined'),
  isPointer: (typeof window.navigator.pointerEnabled !== 'undefined'),
  isMSPoniter: (typeof window.navigator.msPointerEnabled !== 'undefined'),
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
}

const eventPointer = {
  enter: (conf.isTouch) ? conf.touch.enter : (conf.isPointer) ? conf.pointer.enter : (conf.isMSPointer) ? conf.msPointer.enter : conf.mouse.enter,
  leave: (conf.isTouch) ? conf.touch.leave : (conf.isPointer) ? conf.pointer.leave : (conf.isMSPointer) ? conf.msPointer.leave : conf.mouse.leave,
  start: (conf.isTouch) ? conf.touch.start : (conf.isPointer) ? conf.pointer.start : (conf.isMSPointer) ? conf.msPointer.start : conf.mouse.start,
  move: (conf.isTouch) ? conf.touch.move : (conf.isPointer) ? conf.pointer.move : (conf.isMSPointer) ? conf.msPointer.move : conf.mouse.move,
  end: (conf.isTouch) ? conf.touch.end : (conf.isPointer) ? conf.pointer.end : (conf.isMSPointer) ? conf.msPointer.end : conf.mouse.end
}

const _this = {
  STATE_HOVER: 'is-touch',
  STATE_CLICK: 'is-click',
  STATE_TAP: false,

  findNode(target) {
    let parentDOM = target
    for (let i = 0; i < 10; i++) {
      if (parentDOM.getAttribute('data-touch') === '') {
        return parentDOM
      } else {
        parentDOM = parentDOM.parentNode
      }
    }
  },

  touchAddClass(e) {
    const el = _this.findNode(e.target)
    el.classList.add(_this.STATE_HOVER)
  },

  touchRemoveClass(e) {
    const el = _this.findNode(e.target)
    el.classList.remove(_this.STATE_HOVER)
  },

  tapedTouchStart() {
    _this.STATE_TAP = true
  },

  tapedTouchMove() {
    if (_this.STATE_TAP) _this.STATE_TAP = false
  },

  tapedTouchEnd(e) {
    if (!_this.STATE_TAP) {
      return
    }
    const el = _this.findNode(e.target)
    el.classList.add(_this.STATE_CLICK)
    setTimeout(() => {
      el.classList.remove(_this.STATE_CLICK)
    }, 100)
  },

  removeEvent() {
    const touchEl = document.querySelectorAll('[data-touch]')
    for (let i = 0; i < touchEl.length; i++) {
      // Hover
      touchEl[i].removeEventListener(eventPointer.enter, _this.touchAddClass, false)
      touchEl[i].removeEventListener(eventPointer.leave, _this.touchRemoveClass, false)
      // Click
      touchEl[i].removeEventListener(eventPointer.start, _this.tapedTouchStart, false)
      touchEl[i].removeEventListener(eventPointer.move, _this.tapedTouchMove, false)
      touchEl[i].removeEventListener(eventPointer.end, _this.tapedTouchEnd, false)
    }
  },

  setEvent() {
    const touchEl = document.querySelectorAll('[data-touch]')
    for (let i = 0; i < touchEl.length; i++) {
      // Hover
      touchEl[i].addEventListener(eventPointer.enter, _this.touchAddClass, false)
      touchEl[i].addEventListener(eventPointer.leave, _this.touchRemoveClass, false)
      // Click
      touchEl[i].addEventListener(eventPointer.start, _this.tapedTouchStart, false)
      touchEl[i].addEventListener(eventPointer.move, _this.tapedTouchMove, false)
      touchEl[i].addEventListener(eventPointer.end, _this.tapedTouchEnd, false)
    }
  },

  init() {
    _this.setEvent()
  },

  refresh() {
    _this.removeEvent()
    _this.setEvent()
  },

  destory() {
    _this.removeEvent()
  }
}

module.exports = _this
