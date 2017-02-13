/**
* @fileOverview api.manage.model.js 接口的数据层
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-29
* @update：2015-07-29
*/
'use strict';

const path = require('path');
const Q = require('q');

const guid = require('lite-guid');

const dataConfig = require('../../config/data.config.js');

const errCode = require('../../config/error.code.js');
const file = require('../../tools/file.tools.js');
const _ = require('../../tools/underscore.js');

const apiPath = path.join(__dirname, '../../api/');
const apiDataPath = path.join(__dirname, '../../data/');

class ApiManage {
    constructor () {}

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取接口目录
     * @param {String}      room    项目名称
     * @param {Boolean}     sync    是否执行同步操作 [true | false]
     *                              true:  同步, 直接返回数据
     *                              false: 异步, 返回 promise
     */
    getList (sync) {
        let self = this,
            option = {
                useJson: !0,
                sync: !!sync
            },
            emptyData = {};

        if ( sync ) {
            var result = file.readFile(dataConfig.apiMap, option);
            return !!result ? result : emptyData;
        }

        return file.readFile(dataConfig.apiMap, option);
    }

     /**
      * @name appendToList
      * @author 徐晨 ( xuchen@smartisan.com )
      * @description     保存接口数据到列表
      * @param {JSON} data   API Data
      * @param {String} data.GUID        接口 GUID
      * @param {String} data.name        接口名称
      * @param {String} data.api         接口地址
      * @param {String} data.method      通信类型
      */
    appendToList (data) {
        return new Promise((resolve, reject) => {
            this.getList().then(
                apiList => {

                    /**
                     * 追加 API data
                     */
                    apiList[data.GUID] = {
                        GUID: data.GUID,
                        name: data.name,
                        api: data.api,
                        method: data.method
                    };

                    file.writeFile(dataConfig.apiMap, apiList).then(
                        result => resolve(true),
                        error => reject(errCode.insertApiInfoData)
                    );
                },
                error => reject(error)
            );
        });
    }

    /**
     * @name getGroups
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取接口分组
     * @param {Boolean} sync    是否执行同步操作 [true | false]
     *                              true:  同步, 直接返回数据
     *                              false: 异步, 返回 promise
     */
    getGroups (sync) {
        let self = this,
            option = {
                useJson: !0,
                sync: !!sync
            },
            emptyData = {};

        if ( sync ) {
            var result = file.readFile(dataConfig.apiGroupMap, option);
            return !!result ? result : emptyData;
        }

        return file.readFile(dataConfig.apiGroupMap, option);
    }

    /**
     * @name appendGroupData
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 保存接口分组数据
     * @param {JSON} data              追加的分组数据
     * @param {GUID} data.GUID         分组 GUID
     * @param {String} data.name       分组名称
     * @param {GUID} data.apiID        API GUID
     * @param {String} data.apiName    API 名称
     * @param {JSON} option            配置
     * @param {Boolean} option.sync    是否执行同步操作 [true | false]
     *                                 true:  同步, 直接返回数据
     *                                 false: 异步, 返回 promise
     */
    appendGroupData (data = {}, option = {}) {
        let groupData = this.getGroups(true),
            appendData = {
                GUID: data.GUID || guid.create(),
                name: data.name,
                apiList: {}
            };

        /**
         * 合并已存在的 group
         */
        if ( !!groupData[data.GUID] ) {
            appendData.name = data.name || groupData[data.GUID].name;
            appendData.apiList = _.extend({}, groupData[data.GUID].apiList);
        }

        /**
         * 合并同名的 group
         */
        let existGroup = _.findWhere(groupData, {name: appendData.name});

        if ( !!existGroup ) {
            appendData.GUID = existGroup.GUID;
            appendData.apiList = _.extend({}, groupData[existGroup.GUID].apiList);
        }

        /**
         * 移除 api 旧的关联数据
         */
        Object.keys(groupData).map(key => {
            delete groupData[key].apiList[data.apiID];

            /**
             * 检查 group dataList 是否为空
             * 如果为空 则移除 group
             */
            let isListEmpty = true;

            Object.keys(groupData[key].apiList).map(k => {
                isListEmpty = false;
            });

            !!isListEmpty && delete groupData[key];
        });

        /**
         * 追加关联数据
         */
        appendData.apiList[data.apiID] = data.apiName;

        groupData[appendData.GUID] = appendData;

        /**
         * 写入数据
         */
        if ( !!option.sync ) {
            return this.saveGroupData(groupData, option) ? appendData.GUID : false;
        }

        return this.saveGroupData(groupData, option).then(
            result => appendData.GUID,
            error => error
        );
    }

    /**
     * @name saveGroupData
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 保存接口分组数据
     * @param {JSON} data              API Group Data
     * @param {JSON} option            配置
     * @param {Boolean} option.sync    是否执行同步操作 [true | false]
     *                                 true:  同步, 直接返回数据
     *                                 false: 异步, 返回 promise
     */
    saveGroupData (data = {}, option = {}) {
        if ( !!option.sync ) {
            return !file.writeFile(dataConfig.apiGroupMap, data, {sync:!0});
        }

        return new Promise((resolve, reject) => {
            file.writeFile(dataConfig.apiGroupMap, data).then(
                result => resolve(true),
                error => reject(errCode.insertApiGroupData)
            );
        });
    }

    /**
     * @name getApiDetail
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     保存接口信息
     * @param {GUID}   GUID   API GUID
     */
    getApiData (GUID) {
        return file.readFile(dataConfig.apiListPath + GUID + '.json', {useJson:true, mustExists:true});
    }

    /**
     * @name createApiData
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     保存接口信息
     * @param {JSON} data   API Data
     * @param {String} data.room          应用的项目
     * @param {String} data.group         新建分组的标识
     * @param {String} data.groupName     分组名称
     * @param {String} data.name          接口名称
     * @param {String} data.api           接口地址
     * @param {String} data.method        通信类型
     * @param {String} data.dataType      数据类型
     * @param {String} data.apiData       API 数据
     * @param {String} data.contactData   关联数据
     */
    createApiData (data = {}) {
        return new Promise((resolve, reject) => {
            let apiGroups = this.getGroups(true),
                apiData = {
                    GUID: guid.create(),
                    docID: guid.create(),
                    contactID: guid.create(),
                    groupID: data.group,
                    name: data.name,
                    api: data.api,
                    dataList: [],
                    method: data.method,
                    dataType: data.dataType
                },
                promiseList = [];

            // update api list file
            promiseList.push( this.appendToList(apiData) );

            // insert api data file
            promiseList.push( this.saveApiData(apiData.GUID, apiData) );

            // insert api contact data file
            promiseList.push( this.updateApiContact(apiData.contactID, data.contactData) );

            Promise.all(promiseList).then(
                result => resolve(apiData),
                error => reject(errCode.insertApiData)
            );
        });
    }

    /**
     * @name updateApiData
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     保存接口信息
     * @param {JSON} data   API Data
     * @param {GUID} data.GUID          API GUID
     * @param {GUID} data.groupID       新建分组的标识
     * @param {String} data.name        接口名称
     * @param {String} data.api         接口地址
     * @param {Array} data.dataList     备用数据列表
     * @param {String} data.method      通信类型
     * @param {String} data.dataType    数据类型
     * @param {GUID} data.contactID   关联 GUID
     * @param {String} data.contactData   关联数据
     */
    updateApiData (data = {}) {
        return new Promise((resolve, reject) => {
            let apiGroups = this.getGroups(true),
                apiData = {
                    GUID: data.GUID,
                    docID: data.docID,
                    contactID: data.contactID,
                    groupID: data.groupID,
                    name: data.name,
                    api: data.api,
                    dataList: data.dataList,
                    method: data.method,
                    dataType: data.dataType
                },
                promiseList = [];

            // insert api data file
            promiseList.push( this.saveApiData(apiData.GUID, apiData) );

            // insert api contact data file
            promiseList.push( this.updateApiContact(apiData.contactID, data.contactData) );

            Promise.all(promiseList).then(
                result => resolve(apiData),
                error => reject(errCode.insertApiData)
            );
        });
    }

    /**
     * @name saveApiData
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description    保存 API Data
     * @param {GUID} GUID   数据 GUID
     * @param {JSON} data   数据
     */
    saveApiData (GUID, data) {

        console.log('do api model saveApiData');
        console.log('GUID:', GUID);
        console.log('data:', data);

        return new Promise((resolve, reject) => {
            file.writeFile(dataConfig.apiListPath + GUID + '.json', data).then(
                result => resolve(true),
                error => reject(errCode.insertApiInfoData)
            );
        });
    }

    /**
     * @name removeApiData
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     删除 API DATA
     * @param {GUID}   GUID   API GUID
     */
    removeApiData (GUID) {}

    /**
     * @name getApiContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查看一个接口的关联数据
     * @param {GUID} GUID   API Contact Data GUID
     */
    getApiContact (GUID) {
        return file.readFile(dataConfig.apiContactPath + GUID + '.json', {useJson:true, mustExists: true});
    }

    /**
     * @name updateApiContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 更新一个接口的关联数据
     * @param {GUID} GUID   API Contact Data GUID
     * @param {JSON} data   关联的 Room 数据
     */
    updateApiContact (GUID, data = {}) {
        let contactData = {
            GUID,
            contactAPI: {},
            contactRoom: _.extend({}, data)
        };

        return new Promise((resolve, reject) => {
            file.writeFile(dataConfig.apiContactPath + GUID + '.json', contactData).then(
                (result) => resolve(contactData),
                (error) => reject(error)
            );
        });
    }

    /**
     * @name getApiDetail
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description     获取 API 备用数据
     * @param {GUID}   GUID   API GUID
     */
    getApiDetail (GUID) {
        return file.readFile(dataConfig.apiFilePath + GUID + '.json', {useJson:true, mustExists:true});
    }

    /**
     * @name saveApiBackup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description    保存 API 备用数据
     * @param {GUID} GUID   数据 GUID
     * @param {JSON} data   数据
     */
    saveApiBackup (GUID, data) {
        return new Promise((resolve, reject) => {
            file.writeFile(dataConfig.apiFilePath + GUID + '.json', data).then(
                result => resolve(true),
                error => reject(errCode.insertApiBackupData)
            );
        });
    }

    /**
     * @name removeApiBackup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description    删除 API 备用数据
     * @param {GUID} GUID   数据 GUID
     */
    removeApiBackup (GUID) {
        file.deleteFile(dataConfig.apiFilePath + GUID + '.json');
    }


    /**
     * actionApiFormGroup
     * @param  {JSON} groupData            API Group Data
     * @param  {JSON} apiData              API Data
     * @param  {JSON} option               配置
     * @param  {JSON} option.type          执行方式
     *                                     [
     *                                     find:查询结果,
     *                                     extend:添加数据,
     *                                     remove:删除数据
     *                                     ]
     * @return {JSON} response
     * @return {JSON} response.flag        是否执行成功
     * @return {JSON} response.groupData   API Group Data
     */
    actionApiFormGroup (groupData = {}, apiData = {}, option = {}) {
        let response = {
            flag: false,
            groupData: {}
        };

        Object.keys(groupData).map(groupKey => {
            let group = groupData[groupKey];

            switch ( option.type ) {
                case 'find':
                    if ( group.apiList[apiData.GUID] ) {
                        flag = true;
                    }
                break;
                case 'extend':
                    // 移除原先的位置
                    if ( group.apiList[apiData.GUID] ) {
                        delete group.apiList[apiData.GUID];
                    }

                    if ( apiData.groupID == group.GUID ) {
                        flag = true;
                        group.apiList[apiData.GUID] = apiData.name;
                    }
                break;
                case 'remove':
                    if ( group.apiList[apiData.GUID] ) {
                        flag = true;
                        delete group.apiList[apiData.GUID];
                    }
                break;
                default:
            }

            response.groupData[group.GUID] = group;
        });

        return response;
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
//     var self = this,
//         apiKey = apiName.toLowerCase(),
//         _roomApiDetailPath = apiDataPath + room + '/detail/',
//         _apiFilePath = apiPath + room + '/' + path.join.apply(null, apiKey.split(/[^\da-zA-Z]/gi)) + '/',
//         apiFileName = apiKey.replace(/[^\da-zA-Z]/gi, '-') + '.json',
//         deferred = Q.defer();

//     file.readFile(_roomApiDetailPath + apiFileName, {mustExists:true}).then(
//         function (data) {
//             var curApiData = data && data.json;

//             // 读取当前正在使用的返回数据
//             var apiData = file.readFile( _apiFilePath + curApiData.curApiFile, {sync:true,useJson:true});

//             curApiData.apiData = apiData;
//             curApiData.backup = curApiData.backup || [];

//             deferred.resolve(curApiData);
//         },
//         function () {
//             deferred.reject(errCode.notExistApi);
//         }
//     );

//     return deferred.promise;
// }
