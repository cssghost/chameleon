/**
* @fileOverview room.service.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-19
* @update：2015-07-19
*/
window.Store.addService('Room', (function( $, Store ){
    /**
     * @author XuChen
     * @name Room
     * @class 测试页面
     */
    function Room() {};

    Room.prototype.init = function() {};

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取项目目录
     */
    Room.prototype.getList = function(src) {
        var self = this;

        return mainService.ajax({
            url : 'room/list'
        });
    };

    /**
     * @name addRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 添加一个项目
     * @param {String}    data.name    项目名称
     * @param {String}    data.port    项目端口号
     * @param {String}    data.path    静态目录
     */
    Room.prototype.addRoom = function(data) {
        var self = this;

        return mainService.ajax({
            url : 'room/add',
            data : data
        });
    };

    /**
     * @name updateRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 修改一个项目
     * @param {String}    data.name    项目名称
     * @param {String}    data.port    项目端口号
     * @param {String}    data.path    静态目录
     */
    Room.prototype.updateRoom = function(data) {
        var self = this;

        return mainService.ajax({
            url : 'room/update',
            data : data
        });
    };

    /**
     * @name startRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 启动一个项目
     * @param {String}    name    项目名称
     */
    Room.prototype.startRoom = function(name) {
        var self = this;

        return mainService.ajax({
            url : 'room/start',
            data : {
                name : name
            }
        });
    };

    /**
     * @name endRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 关闭一个项目
     * @param {String}    name    项目名称
     */
    Room.prototype.endRoom = function(name) {
        var self = this;

        return mainService.ajax({
            url : 'room/end',
            data : {
                name : name
            }
        });
    };

    /**
     * @name updateRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 修改项目信息
     * @param {JSON}      data    项目数据
     * @param {String}    data    项目名称
     * @param {Number}    data    项目端口
     */
    Room.prototype.updateRoom = function(data) {
        var self = this;

        return mainService.ajax({
            url : 'room/update',
            data : data
        });
    };

    return( new Room() );

})( jQuery, window.Store ));
