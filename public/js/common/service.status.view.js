'use strict';

/**
 * service.status.view.js 异常页面
 * @author 徐晨(xuchen@smartisan.com)
 *
 */

window.Store.addView('ServiceStatus', function() {

    return Backbone.View.extend({
        el: '.content',
        initialize: function() {
            var self = this;
        },
        events: {
            'click .js-link-home' : 'linkHome'
        },
        render: function(view) {
            var self = this;

            self.isAbort = false;

            self.doCountdown();
        },
        linkHome : function () {
            var self = this;

            self.isAbort = true;
                
            window.location.href = '#/';
        },
        doCountdown : function () {
            var self = this;
            Store.filter.countdown({
                time : 10,
                $label : self.$('.js-down-count'),
                callback : function () {
                    self.isAbort = true;
                    self.linkHome();
                },
                abort : function () {
                    if ( self.isAbort || Store.currentView.url != 'service-status' ) {
                        return false;
                    }
                    return true;
                }
            });
        }
    });

});