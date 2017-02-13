/**
* @fileOverview room.config.js 项目的基本配置
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-19
* @update：2015-07-19
*/
'use strict';

var path = require('path');


var _dataPath = '../data/';
var _roomsPath = '../rooms/';

var roomConfig = {
    base : {

    },
    roomDataPath : {
        rooms : path.join(__dirname, _dataPath, 'room.list.json')
    },
    roomsPath : path.join(__dirname, _roomsPath),
    server : {
        // 子项目名称
        name : 'chameleon-client',
        // 子项目的静态资源目录
        staticPath : '/',
        // 运行时的端口
        port : 3088,
        // 本地接口数据的路径
        apiPath : './api/',
        // 子项目路由信息
        route : {
            test : {
                readFile : {
                    method : 'get',
                    api : 'readfile.json',
                    plugin : null
                }
            }
        }
    }
};

module.exports = roomConfig;
