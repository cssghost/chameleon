/**
* @fileOverview room.action.js redux action for Room
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-01
* @update：2016-08-01
*/

'use strict';

import * as types from './../constants/room.constants';

import { RoomService } from './../service/room.service';

const roomAction = {
    /**
     * Set Room Data List
     */
    setRoomList:  (roomList = []) => {
        return {
            type: types.ROOM_SET_LIST,
            roomList
        }
    }
};

function fetchRoomList () {
    return (dispatch, getState) => {
        RoomService.getList().then((result) => {
            dispatch(roomAction.setRoomList(result.list));
        });
    }
}

export { roomAction, fetchRoomList };
