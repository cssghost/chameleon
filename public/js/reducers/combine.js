/**
* @fileOverview combine.js redux reducer combine file
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/

'use strict';

import { combineReducers } from 'redux';
import * as apiReducer from './api.reducer';
import * as roomReducer from './room.reducer';

import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    ...apiReducer,
    ...roomReducer,
    routing
});

export { rootReducer };
