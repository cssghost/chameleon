/**
* @fileOverview api.reducer.js redux reducer for API
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/

'use strict';

import * as types from "./../constants/api.constants";

let initialState = {
    list: [],
    apiData: {},
    apiDetail: {},
    apiGroup: {},
};

/**
 * redux param apiList
 */
export function apiList(state = initialState.list, action) {
    switch ( action.type ) {
        case types.API_SET_LIST:
            return action.apiList;
        break;
        case types.API_ADD_DATA:
            return [
                action.apiData,
                ...state
            ];
        break;
        default:
            return state;
    }
}

/**
 * redux param apiGroup
 */
export function apiGroup(state = initialState.apiGroup, action) {
    switch ( action.type ) {
        case types.API_SET_GROUP:
            return action.apiGroup;
        break;
        default:
            return state;
    }
}

/**
 * redux param apiData
 */
export function apiData(state = initialState.apiData, action) {
    switch ( action.type ) {
        case types.API_SET_DATA:
            return action.apiData;
        break;
        case types.API_ADD_DATA:
            return action.apiData;
        break;
        default:
            return state;
    }
}

/**
 * redux param apiDetail
 */
export function apiDetail(state = initialState.apiDetail, action) {
    switch ( action.type ) {
        case types.API_SET_DETAIL:
            return action.apiDetail;
        break;
        // case types.API_ADD_DETAIL:
        //     return action.apiDetail;
        // break;
        default:
            return state;
    }
}
