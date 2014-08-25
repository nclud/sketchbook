/* Plugin for Cycle2; Copyright (c) 2012 M. Alsup; v20140128 */
(function(e){"use strict";e.event.special.swipe=e.event.special.swipe||{scrollSupressionThreshold:10,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var i=e(this);i.bind("touchstart",function(t){function n(i){if(r){var t=i.originalEvent.touches?i.originalEvent.touches[0]:i;s={time:(new Date).getTime(),coords:[t.pageX,t.pageY]},Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&i.preventDefault()}}var s,o=t.originalEvent.touches?t.originalEvent.touches[0]:t,r={time:(new Date).getTime(),coords:[o.pageX,o.pageY],origin:e(t.target)};i.bind("touchmove",n).one("touchend",function(){i.unbind("touchmove",n),r&&s&&s.time-r.time<e.event.special.swipe.durationThreshold&&Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(r.coords[1]-s.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&r.origin.trigger("swipe").trigger(r.coords[0]>s.coords[0]?"swipeleft":"swiperight"),r=s=void 0})})}},e.event.special.swipeleft=e.event.special.swipeleft||{setup:function(){e(this).bind("swipe",e.noop)}},e.event.special.swiperight=e.event.special.swiperight||e.event.special.swipeleft})(jQuery);

(function (window) {
    // This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
    // iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
    // This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
    // This code is free to use by anyone (MIT, blabla).
    // Original Author: rkorving@wizcorp.jp
    var timeouts = {};
    var intervals = {};
    var orgSetTimeout = window.setTimeout;
    var orgSetInterval = window.setInterval;
    var orgClearTimeout = window.clearTimeout;
    var orgClearInterval = window.clearInterval;
    // To prevent errors if loaded on older IE.
    if (!window.addEventListener) return false;
    function createTimer(set, map, args) {
        var id, cb = args[0],
            repeat = (set === orgSetInterval);

        function callback() {
            if (cb) {
                cb.apply(window, arguments);
                if (!repeat) {
                    delete map[id];
                    cb = null;
                }
            }
        }
        args[0] = callback;
        id = set.apply(window, args);
        map[id] = {
            args: args,
            created: Date.now(),
            cb: cb,
            id: id
        };
        return id;
    }

    function resetTimer(set, clear, map, virtualId, correctInterval) {
        var timer = map[virtualId];
        if (!timer) {
            return;
        }
        var repeat = (set === orgSetInterval);
        // cleanup
        clear(timer.id);
        // reduce the interval (arg 1 in the args array)
        if (!repeat) {
            var interval = timer.args[1];
            var reduction = Date.now() - timer.created;
            if (reduction < 0) {
                reduction = 0;
            }
            interval -= reduction;
            if (interval < 0) {
                interval = 0;
            }
            timer.args[1] = interval;
        }
        // recreate
        function callback() {
            if (timer.cb) {
                timer.cb.apply(window, arguments);
                if (!repeat) {
                    delete map[virtualId];
                    timer.cb = null;
                }
            }
        }
        timer.args[0] = callback;
        timer.created = Date.now();
        timer.id = set.apply(window, timer.args);
    }
    window.setTimeout = function () {
        return createTimer(orgSetTimeout, timeouts, arguments);
    };
    window.setInterval = function () {
        return createTimer(orgSetInterval, intervals, arguments);
    };
    window.clearTimeout = function (id) {
        var timer = timeouts[id];
        if (timer) {
            delete timeouts[id];
            orgClearTimeout(timer.id);
        }
    };
    window.clearInterval = function (id) {
        var timer = intervals[id];
        if (timer) {
            delete intervals[id];
            orgClearInterval(timer.id);
        }
    };
    //check and add listener on the top window if loaded on frameset/iframe
    var win = window;
    while (win.location != win.parent.location) {
        win = win.parent;
    }
    win.addEventListener('scroll', function () {
        // recreate the timers using adjusted intervals
        // we cannot know how long the scroll-freeze lasted, so we cannot take that into account
        var virtualId;
        for (virtualId in timeouts) {
            resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
        }
        for (virtualId in intervals) {
            resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
        }
    });
}(window));