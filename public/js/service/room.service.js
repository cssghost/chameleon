/** 
* @fileOverview api.service.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-25
* @update：2016-07-25
*/ 

import { mainService } from './../framework/main.service.js';

class Room {
    /**
     * @author 徐晨 
     * @name Room
     * @class Room 信息
     * @constructor
     */
    constructor() {}

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取接口列表
     */
    getList () {
        var self = this;

        return mainService.ajax({
            url : 'room/list'
        });
    };

    /**
     * @name startRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 启动一个项目
     * @param {String}    name    项目名称
     */
    startRoom (name) {
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
    endRoom (name) {
        return mainService.ajax({
            url : 'room/end',
            data : {
                name : name
            }
        });
    };

}

let RoomService = new Room();

export { RoomService };