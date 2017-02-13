/** 
* @fileOverview test.view.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/ 

'use strict';

window.Store.addView('Test', function() {
    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            var self = this;

            self.TestService = Store.getService('Test');
        },
        events: {
            'click .js-read-file' : 'readFile',
            'click .js-write-file' : 'writeFile',
            'click .js-unzip-file' : 'unzipFile',
            'click .js-room-start' : 'roomStart',
            'click .js-room-end' : 'roomEnd'
        },
        render: function() {
            var self = this;
        },
        readFile: function () {
            var self = this;

            var src = 'api/store/test.json';

            self.TestService.readFile(src);
        },
        writeFile: function () {
            var self = this;

            var src = 'api/store/test.json';

            self.TestService.writeFile(src, '{"test" : "test"}');
        },
        unzipFile: function () {
            var self = this;

            var src = 'ghost/ghost.zip';

            self.TestService.unzipFile(src, 'rooms/test');
        },
        roomStart: function () {
            var self = this;

            self.TestService.roomStart();
        },
        roomEnd: function () {
            var self = this;

            self.TestService.roomEnd();
        }
    });
})