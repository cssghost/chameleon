/**
* @fileOverview api.manage.ctrl.js 接口的控制器
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-29
* @update：2015-07-29
*/
'use strict';

var path = require('path');
var Q = require('q');
var fs = require('fs');
const guid = require('lite-guid');

var _ = require('../../tools/underscore.js');
var errCode = require('../../config/error.code.js');
var file = require('../../tools/file.tools.js');

const dataConfig = require('../../config/data.config.js');

var apiManageModel = require('../model/api.manage.model.js');
var roomManageCtrl = require('../ctrl/room.manage.ctrl.js');
var roomModel = require('../model/room.manage.model.js');

var apiPath = path.join(__dirname, '../../api/');
var apiDataPath = path.join(__dirname, '../../data/');

class ApiManage {
    constructor() {}

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取全部接口列表
     * @param {JSON}     data        获取列表的参数
     * @param {String}   data.room   需要获取列表的 room GUID
     */
    getList (data) {

        return new Promise((resolve, reject) => {

            apiManageModel.getList().then(
                (result = {}) => {
                    let list = [],
                        response = {
                            map : {}
                        };

                    if ( data.room ) {
                        roomManageCtrl.getRoomContact(data.room, {byID: !0}).then(
                            (contactData) => {
                                Object.keys(contactData).map((key) => {
                                    if ( result[key] ) {
                                        response.map[key] = result[key];
                                    } else {
                                        console.error('API ' + contactData[key] + ', GUID =>' + key + ' 丢失');
                                    }
                                });

                                Object.keys(response.map).map((key) => {
                                    list.push( response.map[key] );
                                });

                                response.list = list;

                                resolve(response);
                            },
                            (error) => {
                                reject(error);
                            }
                        );
                    } else {
                        for ( let key in result ) {
                            list.push( result[key] );
                        }

                        response.map = result;
                        response.list = list;

                        resolve(response);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });

    }

    /**
     * @name getGroups
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取接口分组列表
     */
    getGroups () {
        let self = this;

        return apiManageModel.getGroups().then(function (data = {}) {
            let list = [],
                response = {
                    map : data
                };

            for ( let key in data ) {
                list.push( data[key] );
            }

            response.list = list;

            return response;
        });
    }

    /**
     * @name getDetail
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个 api 数据
     * @param {GUID} GUID               API GUID
     * @param {JSON} option             附属配置
     * @param {Boolean} option.useBase  使用基础数据
     */
    getData (GUID, option = {}) {
        return new Promise((resolve, reject) => {
            apiManageModel.getApiData(GUID).then(
                (result) => {
                    if ( option.useBase ) {
                        resolve(result);
                    } else {
                        this.getApiContact(result.contactID).then(
                            (contactData) => {
                                result.usedData = _.findWhere(result.dataList, {GUID: result.usedID});
                                result.contactRoom = contactData.contactRoom;

                                resolve(result);
                            },
                            (error) => reject(error)
                        );
                    }
                },
                error => reject(errCode.notExistApiData)
            );
        });
    }

    /**
     * @name getApiContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查看一个接口的关联数据
     * @param {GUID}   GUID   API Data GUID
     */
    getApiContact (GUID) {
        return apiManageModel.getApiContact(GUID);
    }

    /**
     * @name saveApi
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     保存接口信息
     * @param {JSON}       option
     * @param {String}     option.room         项目名称
     * @param {String}     option.groupName    分组名称
     * @param {String}     option.name         接口名称
     * @param {String}     option.api          接口地址
     * @param {String}     option.dataType     数据类型
     * @param {String}     option.apiData      数据
     * @param {Boolean}    option.isCreate     是否新建接口
     */
    saveApi (option) {
        var self = this,
            room = option.room,
            postData = {
                group : option.groupName,
                name : option.name,
                api : option.api,
                dataType : option.dataType,
                method : option.method,
                apiData : option.apiData,
                isCreate : option.isCreate
            };

        return apiManageModel.saveApi(room, postData).then(function (res) {
            roomManageCtrl.updateRoom({ name: room, route : res.route });
            return true;
        });
    }

    /**
     * @name getDetail
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查看一个接口备用数据
     * @param {GUID}   GUID   API Detail GUID
     */
     getDetail (GUID) {
        return apiManageModel.getApiDetail(GUID);
    }

    /**
     * @name selectBackup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 选中一个接口备用数据
     * @param {JSON} option
     * @param {GUID} option.apiID           API GUID
     * @param {GUID} option.tagID           API choosed detail GUID
     * @param {Boolean} option.onlySelect   是否只选择数据，不更新 API Data
     */
    selectBackup (option = {}) {
        return new Promise( (resolve, reject) => {
            this.getData(option.apiID, {useBase: !0}).then(
                (data) => {
                    let apiData = _.extend({}, data, {
                        usedID: option.tagID
                    });

                    if ( !option.onlySelect ) {
                        // 更新 API Data
                        if ( !file.writeFile(dataConfig.apiListPath + option.apiID + '.json', apiData, {sync:!0}) ) {
                            reject(errCode.insertApiInfoData);
                        }
                    }

                    // 更新 Room 引用
                    this.getApiContact(apiData.contactID).then(
                        (contactData = {}) => {
                            const { contactRoom } = contactData;

                            let savePromiseList = [];

                            // 更新每个 room 的引用
                            Object.keys(contactRoom).map((key) => {
                                const roomName = contactRoom[key];
                                let roomRoute = {};

                                roomRoute[ apiData.api ] = {
                                    api: option.tagID + '.json',
                                    method: apiData.method
                                };

                                savePromiseList.push( roomManageCtrl.saveRoomRoute(roomName, roomRoute) );
                            });

                            Promise.all(savePromiseList).then(
                                function (result) {
                                    result.forEach((item) => {
                                        roomManageCtrl.reset(item.room);
                                        console.log('更新 [room: ' + item.room + '] route 数据成功');
                                    });

                                    resolve(true);
                                },
                                function (error) {
                                    console.log(error);
                                    console.log('更新 room route 数据失败');
                                    reject(error);
                                }
                            );
                        },
                        (error) => {
                            reject(errCode.notExistApiContactData);
                        }
                    );

                },
                (error) => {
                    reject(errCode.notExistApiData);
                }
            );
        });
    }

    /**
     * 创建 API 备用数据
     * @param  {JSON} data           数据
     * @param  {GUID} data.apiID     API Data GUID
     * @param  {String} data.tag     数据别名
     * @param  {JSON} data.data      备用数据
     */
    createBackup (data) {
        const backupData = {
            GUID: guid.create(),
            tag: data.tag,
            data: data.data
        };

        return this.saveBackup(data.apiID, backupData, true);
    }

    /**
     * 更新 API 备用数据
     * @param  {JSON} data           数据
     * @param  {GUID} data.apiID     API Data GUID
     * @param  {GUID} data.tagID     数据 GUID
     * @param  {String} data.tag     数据别名
     * @param  {JSON} data.data      备用数据
     */
    updateBackup (data) {
        const backupData = {
            GUID: data.tagID,
            tag: data.tag,
            data: data.data
        };

        return this.saveBackup(data.apiID, backupData);
    }

    /**
     * 保存 API 备用数据
     * @param  {GUID} GUID                API Data GUID
     * @param  {JSON} backupData          备用数据
     * @param  {GUID} backupData.GUID     数据 GUID
     * @param  {String} backupData.tag    数据名称
     * @param  {JSON} backupData.data     备用数据
     * @param  {Boolean} isCreate         是否为新建数据
     */
    saveBackup (GUID, backupData, isCreate) {
        return new Promise( (resolve, reject) => {
            this.getData(GUID).then(
                (data) => {

                    const uesdBackupData = {
                        GUID: backupData.GUID,
                        apiID: GUID,
                        dataName: backupData.tag
                    };

                    let apiData = _.extend({}, data, {
                        usedID: backupData.GUID,
                        usedData: uesdBackupData
                    });

                    if ( isCreate ) {
                        apiData.dataList.push(uesdBackupData);
                    } else {
                        apiData.dataList = apiData.dataList.map((item) => {
                            return item.GUID == backupData.GUID ? uesdBackupData : item;
                        });
                    }

                    apiManageModel.saveApiBackup(backupData.GUID, backupData.data).then(
                        (result) => {
                            // 更新 API Data
                            if ( !file.writeFile(dataConfig.apiListPath + GUID + '.json', apiData, {sync:!0}) ) {
                                reject(errCode.insertApiInfoData);
                            }

                            this.selectBackup({
                                apiID: GUID,
                                tagID: backupData.GUID,
                                onlySelect: true
                            }).then(
                                (res) => {
                                    resolve({
                                        apiData,
                                        backupData
                                    });
                                },
                                (error) => {
                                    reject(error);
                                }
                            );
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                },
                (error) => {
                    reject(errCode.notExistApiData);
                }
            );
        });
    }

    /**
     * 删除 API 备用数据
     * @param  {GUID} GUID         API Data GUID
     * @param  {GUID} backupID     数据 GUID
     */
    removeBackup (GUID, backupID) {

        return new Promise((resolve, reject) => {
            apiManageModel.getApiData(GUID).then(
                (apiData) => {
                    const exist = _.findWhere(apiData.dataList, { GUID : backupID });

                    if ( !exist ) {
                        reject(errCode.notExistApiData);
                    }

                    if ( apiData.dataList.length == 1 ) {
                        reject(errCode.cannotRemoveLastBackup);
                    }

                    apiData.dataList = apiData.dataList.filter((item) => item.GUID != backupID);
                    apiData.usedID = apiData.dataList[0].GUID;

                    apiManageModel.removeApiBackup(backupID);

                    // 更新 API Data
                    if ( !file.writeFile(dataConfig.apiListPath + GUID + '.json', apiData, {sync:!0}) ) {
                        reject(errCode.insertApiInfoData);
                    }

                    resolve(apiData.usedID);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    /**
     * @name createApi
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     新建接口信息
     * @param {JSON}      data
     * @param {String} data.room        项目名称
     * @param {GUID} data.group         分组 GUID
     * @param {String} data.groupName   分组名称
     * @param {String} data.name        接口名称
     * @param {String} data.api         接口地址
     * @param {String} data.dataType    数据类型
     * @param {String} data.apiData     数据
     */
    createApi (data) {
        data.contactData = {};

        // 获取关联的 room 数据
        const roomList = data.room.split(',').map(roomID => {
            const _roomData = roomManageCtrl.getRoom(roomID, {byID: !0, sync: !0});

            data.contactData[_roomData.GUID] = _roomData.name;

            return _roomData;
        });

        let isNewGroup = false,
            promiseList = [];

        return new Promise((resolve, reject) => {
            this.getGroups().then(apiGroups => {
                if ( data.group == 0 ) {
                    isNewGroup = true;
                    data.group = guid.create();
                }

                // 先保存 API Data
                apiManageModel.createApiData(data).then(
                    apiData => {
                        // 保存 group 数据
                        apiManageModel.appendGroupData({
                            GUID: apiData.groupID,
                            name: data.groupName,
                            apiID: apiData.GUID,
                            apiName: apiData.name,
                        }, {sync: !0});

                        // 保存 room contact data
                        roomList.map(roomData => {
                            let contactData = {};

                            contactData[apiData.GUID] = apiData.name;

                            promiseList.push(
                                roomManageCtrl.appendRoomContact(roomData.contactID, contactData)
                            );
                        });

                        Promise.all(promiseList).then(
                            result => {
                                /**
                                 * 创建 API 备用数据
                                 */
                                this.createBackup({
                                    apiID: apiData.GUID,
                                    tag: '默认',
                                    data: data.apiData
                                }).then(
                                    response => resolve(apiData),
                                    error => reject(error)
                                );
                            },
                            error => {
                                console.log(error);
                                reject(error);
                            }
                        );
                    },
                    error => {
                        reject(error)
                    }
                );
            });
        });
    }

    /**
     * @name updateApiUrl
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     更新 API GUID
     * @param {JSON} data
     * @param {GUID} data.GUID     API GUID
     * @param {String} data.api    接口地址
     */
    updateApiUrl (data) {

        console.log('============================');
        console.log('do api ctrl updateApiUrl');

        let promiseList = [];

        return new Promise((resolve, reject) => {
            this.getData(data.GUID).then(
                apiData => {

                    console.log(apiData);

                    // 更新 room route
                    Object.keys(apiData.contactRoom).map(roomGUID => {
                        promiseList.push(
                            roomManageCtrl.updateRouteApi(roomGUID, apiData.api, {api: data.api})
                        );
                    });

                    // 移除 contact Data
                    delete apiData.usedData;
                    delete apiData.contactRoom;

                    apiData.api = data.api;

                    promiseList.push(
                        apiManageModel.saveApiData(apiData.GUID, apiData)
                    );

                    Promise.all(promiseList).then(
                        result => {
                            console.log('更新 API [' + apiData.name + '] url 变更为[' + apiData.api + ']成功');
                            resolve(apiData)
                        },
                        error => {
                            console.log(error);
                            reject(error);
                        }
                    );

                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );

        });
    }

    /**
     * @name updateApiGroup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     更新 API Group
     * @param {JSON}     data
     * @param {GUID}     data.GUID        API GUID
     * @param {String}   data.group       新建分组的标识
     * @param {String}   data.groupName   分组名称
     */
    updateApiGroup (data) {

        console.log('============================');
        console.log('do api ctrl updateApiGroup');

        let promiseList = [];

        return new Promise((resolve, reject) => {
            this.getData(data.GUID).then(
                apiData => {

                    console.log(apiData);

                    // 移除 contact Data
                    delete apiData.usedData;
                    delete apiData.contactRoom;

                    if ( data.group == 0 ) {
                        data.group = guid.create();
                    }

                    apiData.groupID = data.group;

                    // 保存 group 数据
                    promiseList.push(
                        apiManageModel.appendGroupData({
                            GUID: data.group,
                            name: data.groupName,
                            apiID: apiData.GUID,
                            apiName: apiData.name
                        })
                    );

                    // 保存 api 数据
                    promiseList.push(
                        apiManageModel.saveApiData(apiData.GUID, apiData)
                    );

                    Promise.all(promiseList).then(
                        result => {
                            console.log('更新 API [' + apiData.name + '] group 变更为[' + data.groupName + ']成功');
                            resolve(apiData)
                        },
                        error => {
                            console.log(error);
                            reject(error);
                        }
                    );

                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );

        });
    }

}

module.exports = new ApiManage();


// /**
//  * @name removeApi
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 删除一个接口
//  * @param {String}    room       项目名称
//  * @param {String}    apiName    api 名称
//  */
// ApiManage.prototype.removeApi = function (room, apiName) {
//     var self = this;

//     // // 删除子项目的目录
//     // file.deleteFolder(roomPath + name);

//     // return roomModel.removeRoom(name);
// }

// /**
//  * @name saveBackup
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 保存一个接口数据
//  * @param {JSON}      option
//  * @param {String}    option.room         项目名称
//  * @param {String}    option.api          接口地址
//  * @param {String}    option.tagID        数据 ID
//  * @param {String}    option.tag          数据别名
//  * @param {String}    option.data         数据
//  * @param {String}    option.use          是否使用当前数据[0:否, 1:是]
//  * @param {Boolean}   option.isCreate     是否新建接口
//  */
// ApiManage.prototype.saveBackup = function (option) {
//     var self = this,
//         deferred = Q.defer();

//     self.getDetail(option.room, option.api).then(
//         function (data) {
//             var _apiFilePath = apiPath + option.room + '/' + path.join.apply(null, data.api.split(/[^\da-zA-Z]/gi)) + '/',
//                 backup = data.backup,
//                 exist = _.findWhere(backup, { tagID : option.tagID });

//             // console.log('------------------------------------');
//             // console.log('backup: ');
//             // console.log(backup);

//             // console.log('------------------------------------');
//             // console.log('exist: ');
//             // console.log(exist);

//             // 已存在数据别名
//             if ( !!exist && option.isCreate ) {
//                 deferred.reject(errCode.existApiData);
//             } else {
//                 var tagID = !!exist ? exist.tagID : +new Date() + '',
//                     apiFileName = !!exist
//                                 ? exist.fileName
//                                 : data.api.replace(/[^\da-zA-Z]/gi, '-') + '-' + tagID + '.json';

//                 // console.log('------------------------------------');
//                 // console.log('apiFileName: ');
//                 // console.log(apiFileName);

//                 // 默认为新建操作
//                 var operationType = option.isCreate ? 'create' : 'update';

//                 if ( option.use == 1 ) {
//                     data.curApiFile = apiFileName;
//                 }

//                 // console.log('------------------------------------');
//                 // console.log('backup: ');
//                 // console.log(backup);

//                 if ( !!file.writeFile(_apiFilePath + apiFileName, option.data, {sync:true}) ) {

//                     var postData = _.extend({}, option, {
//                         tagID: tagID,
//                         fileName: apiFileName,
//                         curApiFile: data.curApiFile
//                     });

//                     apiManageModel.updateApiBackup(postData, operationType).then(
//                         // 返回当前 room 的所有数据
//                         function (res) {
//                             // 同步 room 信息
//                             roomManageCtrl.updateRoom({ name: option.room, route : res.route });
//                             deferred.resolve(postData);
//                         },
//                         function (error) {
//                             deferred.reject(error);
//                         }
//                     );
//                 } else {
//                     deferred.reject(errCode.insertApiData);
//                 }
//             }
//         },
//         function (error) {
//             deferred.reject(error);
//         }
//     );

//     return deferred.promise;
// }
