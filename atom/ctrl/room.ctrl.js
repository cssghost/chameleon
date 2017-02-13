/** 
* @fileOverview room.ctrl.js 每个实例的控制器
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-19
* @update：2015-07-19
*/ 
'use strict';

var path = require('path');
var Q = require('q');

var _ = require('../../tools/underscore.js');
var errCode = require('../../config/error.code.js');
var file = require('../../tools/file.tools.js');

var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;
var fork = child_process.fork;

var roomModel = require('../model/room.manage.model.js');

var roomPath = path.join(__dirname, '../../rooms/');

function RoomCtrl () {
    var self = this;

    self.run = {};
    self.init();
}

/**
 * @name init
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 初始化
 */
RoomCtrl.prototype.init = function () {
    var self = this;

    console.log('init room ctrl');
}

/**
 * @name start
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 启动一个实例
 * @param {String}    name    子项目的名称
 */
RoomCtrl.prototype.start = function (name) {
    let self = this;

    return new Promise((resolve, reject) => {
        if ( !self.run[name] ) {
            roomModel.getRoom(name, {byName: !0}).then(
                function (data) {
                    // 开启 room 子进程
                    let server = fork(roomPath + name + '/' + name);

                    let response = {
                        name : name,
                        port : data.port,
                        pid : server.pid
                    };

                    self.run[name] = {
                        server : server,
                        option : response
                    };

                    console.log('==============================================');
                    console.log('启动项目: ' + response.name);
                    console.log('端口号: ' + response.port);
                    console.log('进程 PID: ' + response.pid);
                    console.log('==============================================');

                    server.on('message', function(m) {
                        console.log('Main Listen: ', m);
                    });

                    server.on('error',function(code, signal){
                        console.log(code);
                        console.log(signal);
                        server.kill(signal);
                        server = self.start(name);
                    });

                    resolve(response);
                },
                function (error) {
                    reject(error);
                }
            );
        } else {
            if ( !!self.run[name] ) {
                reject(errCode.runingRoom);
            }
        }
    });
}

/**
 * @name end
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 关闭一个实例
 * @param {String}    name    子项目的名称
 */
RoomCtrl.prototype.end = function (name) {
    var self = this;

    return new Promise((resolve, reject) => {
        if ( !!self.run[name] ) {
            self.run[name] && self.run[name].server && self.run[name].server.kill();
            
            delete self.run[name];
            
            resolve(true);
        } else {
            reject(errCode.notExistRoom);
        }
    });
}

/**
 * @name reset
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 重启一个实例
 * @param {String}    name    子项目的名称
 */
RoomCtrl.prototype.reset = function (name) {
    var self = this,
        deferred = Q.defer();

    if ( !!self.run[name] ) {
        self.run[name] && self.run[name].server && self.run[name].server.kill();
        delete self.run[name];

        self.start(name);
        
        deferred.resolve(true);
    } else {
        deferred.reject(errCode.notExistRoom);
    }

    return deferred.promise;
}

/**
 * @name syncRoomSystem
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 同步基础 room.js 文件
 * @param {String}    room    子项目的名称
 */
RoomCtrl.prototype.syncRoomSystem = function (room) {
    var self = this,
        ghostServerFilePath = path.join(__dirname, '../../ghost/room.js'),
        fileData = file.readFile(ghostServerFilePath, {sync:true});

    if ( !!file.writeFile(roomPath + room + '/' + room + '.js', fileData.data, {sync:true}) ) {
        console.log(room + ' 项目的服务文件同步成功');
    } else {
        console.log(room + ' 项目的服务文件同步失败');
    }
}

module.exports = new RoomCtrl();