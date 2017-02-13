/**
* @fileOverview api.service.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-18
* @update：2016-07-18
*/

import { mainService } from './../framework/main.service.js';

class API {
    /**
     * @author 徐晨
     * @name API
     * @class API 信息
     * @constructor
     */
    constructor() {}

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取接口列表
     * @param {JSON}     data        获取列表的参数
     * @param {String}   data.room   需要获取列表的 room GUID
     */
    getList (data = {}) {
        var self = this;

        return mainService.ajax({
            url : 'api/list',
            data : data
        });
    };

    /**
     * @name getGroups
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取接口列表
     */
    getGroups (name) {
        var self = this;

        return mainService.ajax({
            url : 'api/groups',
            data : {
                // name : name
            }
        });
    };

    /**
     * @name createApi
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 保存接口
     */
    createApi (data) {
        var self = this;

        return mainService.ajax({
            url : 'api/create',
            data : data
        });
    };

    /**
     * @name updateApiUrl
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 更新接口 url
     */
    updateApiUrl (data) {
        var self = this;

        return mainService.ajax({
            url : 'api/update/api',
            data : {
                GUID: data.GUID,
                api: data.api
            }
        });
    };

    /**
     * @name saveApi
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 保存接口
     */
    saveApi (data) {
        var self = this;

        return mainService.ajax({
            url : 'api/save',
            data : data
        });
    };

    /**
     * @name getApiDetail
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个 api 数据
     * @param {GUID}   GUID   API GUID
     */
    getData (GUID) {
        return mainService.ajax({
            url : 'api/data',
            data : {
                id: GUID
            }
        });
    };

    /**
     * @name createBackup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 新建一个新的接口数据
     * @param {JSON}      data
     * @param {String}    data.room    项目名称
     * @param {String}    data.api     接口地址
     * @param {String}    data.tag     数据别名
     * @param {String}    data.data    数据
     * @param {String}    data.use     是否使用当前数据[0:否, 1:是]
     */
    createBackup (data) {
        var self = this;

        return mainService.ajax({
            url : 'api/backup/create',
            data : data
        });
    };

    /**
     * @name createBackup
     * @description 创建一个接口数据
     * @param {JSON} data
     * @param {GUID} data.apiID     接口地址
     * @param {String} data.tag     数据别名
     * @param {String} data.data    数据
     */
    createBackup (data) {
        let backupData = JSON.parse(data.data);

        data.data = JSON.stringify(backupData);

        return mainService.ajax({
            url : 'api/backup/create',
            data : data
        });
    };

    /**
     * @name updateBackup
     * @description 更新一个接口数据
     * @param {JSON} data
     * @param {GUID} data.apiID     接口地址
     * @param {GUID} data.tagID     数据别名
     * @param {String} data.tag     数据别名
     * @param {String} data.data    数据
     */
    updateBackup (data) {
        let backupData = JSON.parse(data.data);

        data.data = JSON.stringify(backupData);

        return mainService.ajax({
            url : 'api/backup/update',
            data : data
        });
    };

    /**
     * @name getBackupDetail
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查看一个接口备用数据
     * @param {JSON}      data
     * @param {String}    data.room      项目名称
     * @param {String}    data.api       接口地址
     * @param {String}    data.tagID     数据 ID
     */
    getBackupDetail (GUID) {
        var self = this;

        return mainService.ajax({
            url : 'api/detail',
            data : {
                id: GUID
            }
        });
    };

    /**
     * @name selectBackup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 选中一个接口备用数据
     * @param {JSON}      option
     * @param {String}    option.apiID        API GUID
     * @param {String}    option.tagID        数据 ID
     */
    selectBackup (data) {
        var self = this;

        return mainService.ajax({
            url : 'api/backup/select',
            data : data
        });
    };

    /**
     * @name removeBackup
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 删除一个接口备用数据
     * @param {JSON}      option
     * @param {String}    option.apiID        API GUID
     * @param {String}    option.tagID        数据 ID
     */
    removeBackup (data) {
        var self = this;

        return mainService.ajax({
            url : 'api/backup/remove',
            data : data
        });
    };
}

let ApiService = new API();

export { ApiService };
