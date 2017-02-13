webpackJsonp([1,7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(182);


/***/ },

/***/ 178:
/***/ function(module, exports) {

	/**
	* @fileOverview api.constants.js redux constants for API
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	/**
	 * API data list actions
	 */

	exports.__esModule = true;
	var API_SET_LIST = exports.API_SET_LIST = 'API_SET_LIST';

	/**
	 * API group actions
	 */
	var API_SET_GROUP = exports.API_SET_GROUP = 'API_SET_GROUP';

	/**
	 * API data actions
	 */
	var API_SET_DATA = exports.API_SET_DATA = 'API_SET_DATA';
	var API_ADD_DATA = exports.API_ADD_DATA = 'API_ADD_DATA';
	var API_UPDATE_DATA = exports.API_UPDATE_DATA = 'API_UPDATE_DATA';
	var API_REMOVE_DATA = exports.API_REMOVE_DATA = 'API_REMOVE_DATA';

	/**
	 * API detail actions
	 */
	var API_SET_DETAIL = exports.API_SET_DETAIL = 'API_SET_DETAIL';
	var API_ADD_DETAIL = exports.API_ADD_DETAIL = 'API_ADD_DETAIL';
	var API_UPDATE_DETAIL = exports.API_UPDATE_DETAIL = 'API_UPDATE_DETAIL';
	var API_REMOVE_DETAIL = exports.API_REMOVE_DETAIL = 'API_REMOVE_DETAIL';

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview api.reducer.js redux reducer for API
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	exports.__esModule = true;
	exports.apiList = apiList;
	exports.apiGroup = apiGroup;
	exports.apiData = apiData;
	exports.apiDetail = apiDetail;

	var _api = __webpack_require__(178);

	var types = _interopRequireWildcard(_api);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = {
	    list: [],
	    apiData: {},
	    apiDetail: {},
	    apiGroup: {}
	};

	/**
	 * redux param apiList
	 */
	function apiList() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState.list : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case types.API_SET_LIST:
	            return action.apiList;
	            break;
	        case types.API_ADD_DATA:
	            return [action.apiData].concat(state);
	            break;
	        default:
	            return state;
	    }
	}

	/**
	 * redux param apiGroup
	 */
	function apiGroup() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState.apiGroup : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
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
	function apiData() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState.apiData : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
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
	function apiDetail() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState.apiDetail : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
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

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview combine.js redux reducer combine file
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	exports.__esModule = true;
	exports.rootReducer = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(183);

	var _api = __webpack_require__(181);

	var apiReducer = _interopRequireWildcard(_api);

	var _room = __webpack_require__(196);

	var roomReducer = _interopRequireWildcard(_room);

	var _reactRouterRedux = __webpack_require__(198);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var rootReducer = (0, _redux.combineReducers)(_extends({}, apiReducer, roomReducer, {
	    routing: _reactRouterRedux.routerReducer
	}));

	exports.rootReducer = rootReducer;

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview room.reducer.js redux reducer for Room
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-01
	* @update：2016-08-01
	*/

	'use strict';

	exports.__esModule = true;
	exports.roomList = roomList;

	var _room = __webpack_require__(197);

	var types = _interopRequireWildcard(_room);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = {
	    list: []
	};

	function roomList() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState.list : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case types.ROOM_SET_LIST:
	            return action.roomList;
	            break;
	        case types.ROOM_ADD_DATA:
	            return [action.roomData].concat(state);
	            break;
	        default:
	            return state;
	    }
	}

/***/ },

/***/ 197:
/***/ function(module, exports) {

	/**
	* @fileOverview room.constants.js redux constants for Room
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	/**
	 * ROOM data list actions
	 */

	exports.__esModule = true;
	var ROOM_SET_LIST = exports.ROOM_SET_LIST = 'ROOM_SET_LIST';

	/**
	 * ROOM data actions
	 */
	var ROOM_ADD_DATA = exports.ROOM_ADD_DATA = 'ROOM_ADD_DATA';
	var ROOM_UPDATE_DATA = exports.ROOM_UPDATE_DATA = 'ROOM_UPDATE_DATA';
	var ROOM_REMOVE_DATA = exports.ROOM_REMOVE_DATA = 'ROOM_REMOVE_DATA';

/***/ }

});