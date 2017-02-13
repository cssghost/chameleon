/**
* @fileOverview api.action.js redux action for API
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/

'use strict';

import * as types from "./../constants/api.constants";

import { ApiService } from './../service/api.service';

export const apiAction = {
    /**
     * Set API Group
     */
    setApiGroup:  (apiGroup) => {
        return {
            type: types.API_SET_GROUP,
            apiGroup
        }
    },

    /**
     * Set API Data
     */
    setApiData:  (apiData) => {
        return {
            type: types.API_SET_DATA,
            apiData
        }
    },

    /**
     * 添加 API Data
     */
    addData:  (apiData) => {
        return {
            type: types.API_ADD_DATA,
            apiData
        };
    },

    /**
     * 更新 API Data
     */
    updateData:  (apiData) => {
        return {
            type: types.API_UPDATE_DATA,
            apiData
        };
    },

    /**
     * 删除 API Data
     */
    removeData:  (apiData) => {
        return {
            type: types.API_REMOVE_DATA,
            apiData
        };
    },

    /**
     * Set API Data Detail
     */
    setApiDetail:  (apiDetail) => {
        return {
            type: types.API_SET_DETAIL,
            apiDetail
        }
    },

    /**
     * 添加 API Detail
     */
    // addDetail:  (apiDetail) => {
    //     return {
    //         type: types.API_ADD_DETAIL,
    //         apiDetail
    //     };
    // },

    /**
     * 更新 API Detail
     */
    updateDetail:  (apiDetail) => {
        return {
            type: types.API_UPDATE_DETAIL,
            apiDetail
        };
    },

    /**
     * 删除 API Detail
     */
    removeDetail:  (apiDetail) => {
        return {
            type: types.API_REMOVE_DETAIL,
            apiDetail
        };
    },

    /**
     * Set API Data List
     */
    setApiList:  (apiList = []) => {
        return {
            type: types.API_SET_LIST,
            apiList
        }
    }
};

/**
 * 获取 API 列表
 */
export function fetchApiList (data) {
    return (dispatch, getState) => {
        ApiService.getList(data).then(function (result) {
            dispatch(apiAction.setApiList(result.list));
        });
    }
}

/**
 * 获取 API 分组
 */
export function fetchApiGroup () {
    return (dispatch, getState) => {
        ApiService.getGroups().then(function (result) {
            dispatch(apiAction.setApiGroup(result.list));
        });
    }
}

/**
 * 获取 API Data
 */
export function fetchApiData (GUID) {
    return (dispatch, getState) => {
        ApiService.getData(GUID).then(function (result) {
            dispatch(apiAction.setApiData(result));
        });
    }
}

// /**
//  * 设置 API Data
//  */
// export function setApiData (apiData) {
//     return (dispatch, getState) => {
//         dispatch(apiAction.setApiData(apiData));
//     }
// }

/**
 * 选择备份数据
 */
export function selectBackup (GUID) {
    return (dispatch, getState) => {
        let _apiData = getState().apiData;
        dispatch(apiAction.setApiData(
            _.extend( {}, _apiData, {
                usedID: GUID,
                usedData: _.findWhere(_apiData.dataList, {GUID: GUID})
            })
        ));
    }
}

/**
 * 设置 API Data Detail
 */
export function setApiDetail (apiDetail) {
    return (dispatch, getState) => {
        dispatch( apiAction.setApiDetail( JSON.parse(apiDetail) ) );
    }
}

/**
 * 获取 API Data Detail
 */
export function fetchApiDetail (GUID) {
    return (dispatch, getState) => {
        ApiService.getBackupDetail(GUID).then(function (result) {
            dispatch(apiAction.setApiDetail(result));
        });
    }
}

/**
 * 创建 API Data Detail
 * @param {JSON} backupData          API Detail 数据
 * @param {GUID} backupData.apiID    接口地址
 * @param {String} backupData.tag    数据别名
 * @param {String} backupData.data   数据
 */
export function createApiDetail (backupData) {
    let parseData = JSON.parse(backupData.data);

    backupData.data = JSON.stringify(parseData);

    return (dispatch, getState) => {
        ApiService.createBackup(backupData).then(function (result) {
            dispatch(apiAction.setApiData(result.apiData));
        });
    }
}

/**
 * 更新 API Data Detail
 * @param {JSON} backupData          API Detail 数据
 * @param {GUID} backupData.apiID    接口地址
 * @param {GUID} backupData.tagID    数据 GUID
 * @param {String} backupData.tag    数据别名
 * @param {String} backupData.data   数据
 */
export function updateApiDetail (backupData) {
    let parseData = JSON.parse(backupData.data);

    backupData.data = JSON.stringify(parseData);

    return (dispatch, getState) => {
        let _apiData = getState().apiData;
        ApiService.updateBackup(backupData).then(function (result) {
            dispatch(apiAction.setApiData(result.apiData));
        });
    }
}

/**
 * 删除 API Data Detail
 * @param {GUID} removeGUID    删除的数据 GUID
 * @param {GUID} selectGUID    删除后选择的数据 GUID
 */
export function removeApiDetail (removeGUID, selectGUID) {
    return (dispatch, getState) => {
        let _apiData = getState().apiData;

        dispatch(apiAction.setApiData(
            _.extend({}, _apiData, {
                dataList: _apiData.dataList.filter((item) => item.GUID != removeGUID),
                usedID: selectGUID
            })
        ));
    }
}
