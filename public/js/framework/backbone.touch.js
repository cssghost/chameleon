//     (c) 2012 Raymond Julin, Keyteq AS
//     Backbone.touch may be freely distributed under the MIT license.
(function (window, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone', 'modernizr'], function(){
            return factory.apply(window, arguments);
        });
    } else if (typeof module === 'object' && module.exports) {
        // NodeJS.
        module.exports = factory.call(window, require('underscore'), require('backbone'), require('modernizr'));
    } else {
        // Browser globals
        factory.call(window, window._, window.Backbone, window.Modernizr);
    }
}(typeof global === 'object' ? global : this, function (_, Backbone, Modernizr) {

    "use strict";

    // The `getValue` and `delegateEventSplitter` is copied from 
    // Backbones source, unfortunately these are not available
    // in any form from Backbone itself
    var getValue = function(object, prop) {
        if (!(object && object[prop])) return null;
        return _.isFunction(object[prop]) ? object[prop]() : object[prop];
    };
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    _.extend(Backbone.View.prototype, {
        _touching : false,

        touchPrevents : true,

        touchThreshold : 10,

        // isTouch : this.document && 'ontouchstart' in this.document && !('callPhantom' in this),
        // 为了兼容 PC 与移动端，修改了原版的属性判断方式
        isTouch : /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()) && Modernizr.touch,

        // Drop in replacement for Backbone.View#delegateEvent
        // Enables better touch support
        // 
        // If the users device is touch enabled it replace any `click`
        // event with listening for touch(start|move|end) in order to
        // quickly trigger touch taps
        delegateEvents: function(events) {

            if (!(events || (events = _.result(this, 'events')))) return this;
            this.undelegateEvents();
            var suffix = '.delegateEvents' + this.cid;
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;

                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                var boundHandler = _.bind(this._touchHandler,this);
                method = _.bind(method, this);
                if (this._useTouchHandlers(eventName, selector)) {
                    this.$el.on('touchstart' + suffix, selector, boundHandler);
                    this.$el.on('touchend' + suffix, selector,
                        {method:method},
                        boundHandler
                    );
                }
                else {
                    eventName += suffix;
                    if (selector === '') {
                        this.$el.on(eventName, method);
                    } else {
                        this.$el.on(eventName, selector, method);
                    }
                }
            }
            return this;
        },

        // Detect if touch handlers should be used over listening for click
        // Allows custom detection implementations
        _useTouchHandlers : function(eventName, selector)
        {
            return this.isTouch && eventName === 'click';
        },

        // At the first touchstart we register touchevents as ongoing
        // and as soon as a touch move happens we set touching to false,
        // thus implying that a fastclick will not happen when
        // touchend occurs. If no touchmove happened
        // inbetween touchstart and touchend we trigger the event
        //
        // The `touchPrevents` toggle decides if Backbone.touch
        // will stop propagation and prevent default
        // for *button* and *a* elements
        _touchHandler : function(e) {
            var oe = e.originalEvent || e;
            if (!('changedTouches' in oe)) return;
            var touch = oe.changedTouches[0];
            var x = touch.clientX;
            var y = touch.clientY;
            switch (e.type) {
                case 'touchstart':
                    this._touching = [x, y];
                    break;
                case 'touchend':
                    var oldX = this._touching[0];
                    var oldY = this._touching[1];
                    var threshold = this.touchThreshold;
                    if (x < (oldX + threshold) && x > (oldX - threshold) &&
                        y < (oldY + threshold) && y > (oldY - threshold)) {
                        this._touching = false;
                        if (this.touchPrevents) {
                            var tagName = e.currentTarget.tagName;
                            if (tagName === 'BUTTON' ||
                                tagName === 'A') {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }
                        e.data.method(e);
                    }
                    break;
            }
        }
    });
    return Backbone;
}));