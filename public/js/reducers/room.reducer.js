/**
* @fileOverview room.reducer.js redux reducer for Room
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-01
* @update：2016-08-01
*/

'use strict';

import * as types from "./../constants/room.constants";

let initialState = {
    list: []
};

export function roomList(state = initialState.list, action) {
    switch ( action.type ) {
        case types.ROOM_SET_LIST:
            return action.roomList;
        break;
        case types.ROOM_ADD_DATA:
            return [
                action.roomData,
                ...state
            ];
        break;
        default:
            return state;
    }
}
