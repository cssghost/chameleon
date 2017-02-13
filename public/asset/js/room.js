webpackJsonp([4,7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(283);
	__webpack_require__(197);
	__webpack_require__(282);
	module.exports = __webpack_require__(196);


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	exports.__esModule = true;
	exports.mainService = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _config = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @main-service.js 基础服务 Ajax 配置
	                                                                                                                                                           * @author wanghuijun(wanghuijun@smartisan.cn)
	                                                                                                                                                           * @update xuchen(xuchen@smartisan.com)
	                                                                                                                                                           */

	var MainService = function () {
	    /**
	     * @author 徐晨 
	     * @name MainService
	     * @class ajax
	     * @constructor
	     */

	    function MainService() {
	        _classCallCheck(this, MainService);
	    }

	    MainService.prototype.ajax = function ajax(options) {
	        // Get the full range of settings.
	        var ajaxOptions = $.extend({
	            type: 'post',
	            dataType: 'json',
	            cache: false,
	            timeout: 10 * 1000,
	            complete: function complete(request, statusText) {}
	        }, options);

	        // If the data type is JSON init common fn
	        if (ajaxOptions.dataType == 'json') {

	            // init base init
	            ajaxOptions.url = _config.mainConfig.baseUrl + ajaxOptions.url;

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;
	            delete ajaxOptions.preorder;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {

	                // return success fn
	                if (response.code == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {

	                        var msg = '未知错误',
	                            errorKey = '';

	                        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) == 'object' && response.errInfo) {
	                            $.each(response.errInfo, function (key, value) {
	                                errorKey = key | 0;
	                                msg = value;
	                            });
	                        }

	                        var errorResult = typeof targetError == 'function' ? targetError(errorKey, msg, response) : undefined;

	                        // 需要自定义fail时在error函数中返回false,然后再fail函数中添加事件
	                        if (errorResult !== false) {
	                            errorResult = errorResult === undefined ? response.errInfo : errorResult;

	                            errorResult = !!errorResult ? errorResult : {};

	                            alert(msg);
	                        }
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                var serviceErrorStatus = defer.status | 0;

	                alert(serviceErrorStatus);
	            });
	        }

	        // If the data type is JSONP init common fn
	        if (ajaxOptions.dataType == 'jsonp') {
	            // document.domain = 'smartisan.com';
	            // $.support.cors = true;
	            var _arrData = [];

	            ajaxOptions.type = 'get';

	            // for ( var k in ajaxOptions.data ) {
	            //     _arrData.push('&data' + k + '=' + ajaxOptions.data[k] );
	            // }

	            // init base url and format data to url
	            // ajaxOptions.url = mainConfig.secureUrl + ajaxOptions.url + _arrData.join('');

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn and data
	            delete ajaxOptions.data;
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {

	                // return success fn
	                if (response.code == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {
	                        var msg = '未知错误',
	                            errorKey = '';

	                        // errorKey = response.errno + '';

	                        // msg = self.config.accountError[errorKey];
	                        // jsonp 的回执没有msg
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                // if ( defer.status && (defer.status + '').match(/^4|5/) ) {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + defer.status;
	                // } else {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + 404;
	                // }
	            });
	        }

	        // Make the AJAX call not dataType is json.
	        return $.ajax(ajaxOptions);
	    };

	    return MainService;
	}();

	var mainService = new MainService();

	exports.mainService = mainService;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** 
	* @fileOverview config.js 系统配置
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-05-19
	* @update：2016-05-19
	*/

	var _config = {
	    /**
	     * 浏览器判断
	     * @type Boolean
	     */
	    isMobileTerminal: /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()),
	    isMobile: /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()) && !/ipad/i.test(navigator.userAgent.toLowerCase()),
	    isUC: /ucweb|ucbrowser/i.test(navigator.userAgent.toLowerCase()),

	    /**
	     * retina 适配判断
	     * @type Boolean
	     */
	    isRetina: window.devicePixelRatio && window.devicePixelRatio > 1.2,

	    /**
	     * 主内容区
	     * @type jQuery
	     */
	    layoutContainer: $('#main'),

	    /**
	     * page loading jQuery dom
	     * @type jQuery
	     */
	    pageLoading: $('.page-loading'),

	    /**
	     * 后台接口地址
	     * @type String
	     */
	    baseUrl: '/',

	    nodeUrl: '/',

	    /**
	     * store url
	     * @type String
	     */
	    storeUrl: 'http://store.smartisan.com/#/',

	    /**
	     * www url
	     * @type String
	     */
	    webUrl: 'http://www.smartisan.com/#/',

	    /**
	     * 默认头像地址
	     * @type String
	     */
	    defaultAvatar: CDN_HOST + 'img/default-user-avatar.png',

	    /**
	     * 付款 url
	     * @type String
	     */
	    paymentUrl: '/index.php?r=',

	    /**
	     * 付款 code
	     * @type String
	     */
	    paymentCode: {
	        weixin: '/index.php?r=Pay/CreateQRCode'
	    },

	    /**
	     * 包邮的条件：满 xx 包邮
	     * @type Number
	     */
	    postageTerm: 150
	};

	var Config = function () {
	    /**
	     * @author 徐晨 
	     * @name Config
	     * @class 商城系统的配置
	     * @constructor
	     */

	    function Config() {
	        var _this = this;

	        _classCallCheck(this, Config);

	        // init config
	        $.each(_config, function (key, value) {
	            return _this.setParam(key, value);
	        });

	        return this;
	    }

	    /**
	     * @name Config#setParam
	     * @description 设置 配置
	     * @event
	     */

	    Config.prototype.setParam = function setParam(key, value) {
	        this[key] = value;
	    };

	    _createClass(Config, [{
	        key: 'isMobileTerminal',


	        // 浏览器判断
	        get: function get() {
	            return _config.isMobileTerminal;
	        },
	        set: function set(value) {
	            _config.isMobileTerminal = value;
	        }
	    }, {
	        key: 'isMobile',
	        get: function get() {
	            return _config.isMobile;
	        },
	        set: function set(value) {
	            _config.isMobile = value;
	        }
	    }, {
	        key: 'isUC',
	        get: function get() {
	            return _config.isUC;
	        },
	        set: function set(value) {
	            _config.isUC = value;
	        }

	        // retina 适配判断

	    }, {
	        key: 'isRetina',
	        get: function get() {
	            return _config.isRetina;
	        },
	        set: function set(value) {
	            _config.isRetina = value;
	        }

	        // 主内容区

	    }, {
	        key: 'layoutContainer',
	        get: function get() {
	            return _config.layoutContainer;
	        },
	        set: function set(value) {
	            _config.layoutContainer = value;
	        }

	        // page loading jQuery dom

	    }, {
	        key: 'pageLoading',
	        get: function get() {
	            return _config.pageLoading;
	        },
	        set: function set(value) {
	            _config.pageLoading = value;
	        }

	        // 后台接口地址

	    }, {
	        key: 'baseUrl',
	        get: function get() {
	            return _config.baseUrl;
	        },
	        set: function set(value) {
	            _config.baseUrl = value;
	        }
	    }, {
	        key: 'nodeUrl',
	        get: function get() {
	            return _config.nodeUrl;
	        },
	        set: function set(value) {
	            _config.nodeUrl = value;
	        }

	        // store url

	    }, {
	        key: 'storeUrl',
	        get: function get() {
	            return _config.storeUrl;
	        },
	        set: function set(value) {
	            _config.storeUrl = value;
	        }

	        // www url

	    }, {
	        key: 'webUrl',
	        get: function get() {
	            return _config.webUrl;
	        },
	        set: function set(value) {
	            _config.webUrl = value;
	        }

	        // 默认头像地址

	    }, {
	        key: 'defaultAvatar',
	        get: function get() {
	            return _config.defaultAvatar;
	        },
	        set: function set(value) {
	            _config.defaultAvatar = value;
	        }

	        // 付款 url

	    }, {
	        key: 'paymentUrl',
	        get: function get() {
	            return _config.paymentUrl;
	        },
	        set: function set(value) {
	            _config.paymentUrl = value;
	        }
	    }, {
	        key: 'paymentCode',
	        get: function get() {
	            return _config.paymentCode;
	        },
	        set: function set(value) {
	            _config.paymentCode = value;
	        }

	        // 包邮的条件：满 xx 包邮

	    }, {
	        key: 'postageTerm',
	        get: function get() {
	            return _config.postageTerm;
	        },
	        set: function set(value) {
	            _config.postageTerm = value;
	        }
	    }]);

	    return Config;
	}();

	var mainConfig = new Config();

	exports.mainConfig = mainConfig;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

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

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview room.action.js redux action for Room
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-01
	* @update：2016-08-01
	*/

	'use strict';

	exports.__esModule = true;
	exports.fetchRoomList = exports.roomAction = undefined;

	var _room = __webpack_require__(197);

	var types = _interopRequireWildcard(_room);

	var _room2 = __webpack_require__(283);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var roomAction = {
	    /**
	     * Set Room Data List
	     */
	    setRoomList: function setRoomList() {
	        var roomList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	        return {
	            type: types.ROOM_SET_LIST,
	            roomList: roomList
	        };
	    }
	};

	function fetchRoomList() {
	    return function (dispatch, getState) {
	        _room2.RoomService.getList().then(function (result) {
	            dispatch(roomAction.setRoomList(result.list));
	        });
	    };
	}

	exports.roomAction = roomAction;
	exports.fetchRoomList = fetchRoomList;

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.RoomService = undefined;

	var _mainService = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /** 
	                                                                                                                                                          * @fileOverview api.service.js 文件操作
	                                                                                                                                                          * @author 徐晨 ( xuchen@smartisan.com )
	                                                                                                                                                          * @date：2016-07-25
	                                                                                                                                                          * @update：2016-07-25
	                                                                                                                                                          */

	var Room = function () {
	    /**
	     * @author 徐晨 
	     * @name Room
	     * @class Room 信息
	     * @constructor
	     */

	    function Room() {
	        _classCallCheck(this, Room);
	    }

	    /**
	     * @name getList
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 获取接口列表
	     */


	    Room.prototype.getList = function getList() {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'room/list'
	        });
	    };

	    /**
	     * @name startRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 启动一个项目
	     * @param {String}    name    项目名称
	     */

	    Room.prototype.startRoom = function startRoom(name) {
	        return _mainService.mainService.ajax({
	            url: 'room/start',
	            data: {
	                name: name
	            }
	        });
	    };

	    /**
	     * @name endRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 关闭一个项目
	     * @param {String}    name    项目名称
	     */

	    Room.prototype.endRoom = function endRoom(name) {
	        return _mainService.mainService.ajax({
	            url: 'room/end',
	            data: {
	                name: name
	            }
	        });
	    };

	    return Room;
	}();

	var RoomService = new Room();

	exports.RoomService = RoomService;

/***/ }

});