/** 
* @fileOverview room.manmage.view.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/ 

'use strict';

window.Store.addView('RoomManage', function() {
    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            var self = this;

            self.RoomService = Store.getService('Room');

            self.Dialog = Store.getPlugin('Dialog');
        },
        events: {
            'click .js-room' : 'room',
            'click .js-room-switch' : 'startRoom',
            'click .js-room-update' : 'updateRoom',
            'click .js-room-go' : 'checkout',
            'click .js-add-room' : 'addRoom'
        },
        render: function() {
            var self = this;

            self.$list = self.$('.js-room-list');

            self.keepOpen = false;
        },
        room: function (event) {
            var self = this,
                $room = $(event.currentTarget);

            if ( $room.hasClass('on') || self.keepOpen ) {
                return;
            }

            $room.siblings().toggleClass('disabled-room', true);
            $room.toggleClass('on', true);

            setTimeout(function () {
                $(document).on('click.operation', function (ev) {
                    var $btn = $(ev.target);

                    if ( $btn.closest('.js-room-switch').length && $btn.closest('.js-room-switch').data('status') == 0
                        // || self.keepOpen && $btn.closest('.js-room').is($room)
                        ) {
                        return;
                    }

                    // !!self.keepOpen && self.closeUpdatePanel($room);

                    // 如果是修改内容，不取消其他 room 的 disabled 样式
                    !$btn.closest('.js-room-update').length && $room.siblings().toggleClass('disabled-room', false);

                    $room.toggleClass('on', false);
                    $(document).off('click.operation');
                });
            }, 0);
        },
        /**
         * 新建项目
         * @author 徐晨 ( xuchen@smartisan.com )
         */
        addRoom: function (event) {
            var self = this,
                $room = $(event.currentTarget),
                $updatePanel = $room.find('.js-update-panel');

            if ( $room.hasClass('edit') || self.keepOpen ) {
                return;
            }

            self.openUpdatePanel($room);

            setTimeout(function () {
                $(document).on('click.update', function (ev) {
                    var $btn = $(ev.target);

                    if ( $btn.closest('.js-add-room').length ) {
                        return;
                    }

                    var postData = Store.getData($updatePanel);

                    // console.log(postData);
                    if (
                        postData.name.trim() == ''
                        || postData.port.trim() == ''
                        || postData.path.trim() == ''
                        ) {
                        self.closeUpdatePanel($room);
                        return;
                    }

                    self.RoomService.addRoom(postData)
                        .done(function (response) {

                            var tpl = ct.get('tempRoom', true);

                            self.$('.js-add-room').before(
                                ct.compile(
                                    tpl,
                                    {
                                        room : postData
                                    }
                                )
                            );

                            self.closeUpdatePanel($room, function () {
                                $updatePanel.find('input').val('');
                            });
                        })
                        .fail(function (errorKey, msg, response) {
                            
                        });
                });
            }, 0);
        },
        /**
         * 启动项目
         * @author 徐晨 ( xuchen@smartisan.com )
         */
        startRoom : function (event) {
            var self = this,
                $button = $(event.currentTarget),
                $room = $button.closest('.js-room'),
                $label = $button.find('a'),
                $show = $room.find('.js-room-name'),
                id = $room.data('id'),
                flag = $button.data('status') | 0;

            if ( $button.hasClass('disabled') ) {
                return;
            }

            if ( !!flag ) {
                self.RoomService.endRoom(id)
                    .done(function (res) {
                        $button.next().remove();
                        $label.text('启');
                        $button.data('status', 0);
                        $show.toggleClass('running', false);
                    });
            } else {
                self.RoomService.startRoom(id)
                    .done(function (res) {

                        var tpl = ct.get('tempOperationGo', true);

                        $button.after(
                            ct.compile(tpl, {room : res})
                        );

                        $label.text('关');
                        $button.data('status', 1);
                        $show.toggleClass('running', true);
                    });
            }
        },
        /**
         * 更新项目
         * @author 徐晨 ( xuchen@smartisan.com )
         */
        updateRoom : function (event) {
            var self = this,
                $button = $(event.currentTarget),
                $room = $button.closest('.js-room'),
                $updatePanel = $room.find('.js-update-panel'),
                id = $room.data('id');

            self.openUpdatePanel($room);

            setTimeout(function () {
                $(document).on('click.update', function (ev) {
                    var $btn = $(ev.target);

                    if ( $btn.closest('.js-room').is($room) ) {
                        return;
                    }

                    var postData = Store.getData($updatePanel);

                    if (
                        postData.name.trim() == ''
                        || postData.port.trim() == ''
                        || postData.path.trim() == ''
                        ) {

                        self.closeUpdatePanel($room);

                        return;
                    }

                    self.RoomService.updateRoom(postData)
                        .done(function (response) {
                            self.closeUpdatePanel($room);
                        })
                        .fail(function (errorKey, msg, response) {
                            
                        });

                    self.closeUpdatePanel($room);
                });
            }, 0);
        },
        openUpdatePanel: function ($room) {
            var self = this;

            self.keepOpen = true;

            $room.toggleClass('edit', true);
            $room.siblings().toggleClass('disabled-room', true);
        },
        closeUpdatePanel: function ($room, callback) {
            var self = this,
                $updatePanel = $room.find('.js-update-panel');

            self.keepOpen = false;

            $room.toggleClass('edit', false);
            $room.siblings().toggleClass('disabled-room', false);
            $(document).off('click.update');

            Store.isFunction(callback) && callback();
        },
        /**
         * 跳转到项目
         * @author 徐晨 ( xuchen@smartisan.com )
         */
        checkout: function (event) {
            var self = this,
                $button = $(event.currentTarget),
                port = $button.data('port');

            if ( $button.hasClass('disabled') ) {
                return;
            }

            window.open('http://localhost:' + port);
        }
    });
})