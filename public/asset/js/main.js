webpackJsonp([3,7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(208);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	module.exports = __webpack_require__(285);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ApiService = undefined;

	var _mainService = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                          * @fileOverview api.service.js 文件操作
	                                                                                                                                                          * @author 徐晨 ( xuchen@smartisan.com )
	                                                                                                                                                          * @date：2016-07-18
	                                                                                                                                                          * @update：2016-07-18
	                                                                                                                                                          */

	var API = function () {
	    /**
	     * @author 徐晨
	     * @name API
	     * @class API 信息
	     * @constructor
	     */

	    function API() {
	        _classCallCheck(this, API);
	    }

	    /**
	     * @name getList
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 获取接口列表
	     * @param {JSON}     data        获取列表的参数
	     * @param {String}   data.room   需要获取列表的 room GUID
	     */


	    API.prototype.getList = function getList() {
	        var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/list',
	            data: data
	        });
	    };

	    /**
	     * @name getGroups
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 获取接口列表
	     */

	    API.prototype.getGroups = function getGroups(name) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/groups',
	            data: {
	                // name : name
	            }
	        });
	    };

	    /**
	     * @name createApi
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 保存接口
	     */

	    API.prototype.createApi = function createApi(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/create',
	            data: data
	        });
	    };

	    /**
	     * @name updateApiUrl
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 更新接口 url
	     */

	    API.prototype.updateApiUrl = function updateApiUrl(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/update/api',
	            data: {
	                GUID: data.GUID,
	                api: data.api
	            }
	        });
	    };

	    /**
	     * @name updateApiGroup
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 更新接口 group
	     */

	    API.prototype.updateApiGroup = function updateApiGroup(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/update/group',
	            data: {
	                GUID: data.GUID,
	                group: data.group,
	                groupName: data.groupName
	            }
	        });
	    };

	    /**
	     * @name saveApi
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 保存接口
	     */

	    API.prototype.saveApi = function saveApi(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/save',
	            data: data
	        });
	    };

	    /**
	     * @name getApiDetail
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 查找一个 api 数据
	     * @param {GUID}   GUID   API GUID
	     */

	    API.prototype.getData = function getData(GUID) {
	        return _mainService.mainService.ajax({
	            url: 'api/data',
	            data: {
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

	    API.prototype.createBackup = function createBackup(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/backup/create',
	            data: data
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

	    API.prototype.createBackup = function createBackup(data) {
	        var backupData = JSON.parse(data.data);

	        data.data = JSON.stringify(backupData);

	        return _mainService.mainService.ajax({
	            url: 'api/backup/create',
	            data: data
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

	    API.prototype.updateBackup = function updateBackup(data) {
	        var backupData = JSON.parse(data.data);

	        data.data = JSON.stringify(backupData);

	        return _mainService.mainService.ajax({
	            url: 'api/backup/update',
	            data: data
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

	    API.prototype.getBackupDetail = function getBackupDetail(GUID) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/detail',
	            data: {
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

	    API.prototype.selectBackup = function selectBackup(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/backup/select',
	            data: data
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

	    API.prototype.removeBackup = function removeBackup(data) {
	        var self = this;

	        return _mainService.mainService.ajax({
	            url: 'api/backup/remove',
	            data: data
	        });
	    };

	    return API;
	}();

	var ApiService = new API();

	exports.ApiService = ApiService;

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

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview api.sidebar.item.com.js 侧边栏-API Item
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-05
	* @update：2016-08-05
	*/

	'use strict';

	exports.__esModule = true;
	exports.ApiSidebarItemCom = undefined;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name ApiSidebarItemCom
	 * @class API Data 侧边栏 Item
	 * @constructor
	 */

	var ApiSidebarItemCom = function (_React$Component) {
	    _inherits(ApiSidebarItemCom, _React$Component);

	    function ApiSidebarItemCom(props) {
	        _classCallCheck(this, ApiSidebarItemCom);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.handleChooseData = _this.handleChooseData.bind(_this);
	        return _this;
	    }

	    ApiSidebarItemCom.prototype.viewChooseBtn = function viewChooseBtn(isSelected) {

	        if (isSelected) {
	            return _react2.default.createElement(
	                'span',
	                { className: 'gray-small-btn' },
	                '已选中'
	            );
	        } else {
	            return _react2.default.createElement(
	                'span',
	                { className: 'blue-small-btn' },
	                '选中'
	            );
	        }
	    };

	    ApiSidebarItemCom.prototype.render = function render() {
	        var _props = this.props;
	        var detail = _props.detail;
	        var apiData = _props.apiData;

	        var isSelected = detail.GUID == apiData.usedID;

	        return _react2.default.createElement(
	            'li',
	            { className: 'hide-row ' + (isSelected ? 'selected' : ''), onClick: this.handleChooseData },
	            this.viewChooseBtn(isSelected),
	            detail.dataName
	        );
	    };

	    /**
	     * 选择一个数据
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiSidebarItemCom.prototype.handleChooseData = function handleChooseData(event) {
	        var _props2 = this.props;
	        var detail = _props2.detail;
	        var apiData = _props2.apiData;


	        detail.GUID != apiData.usedID && this.props.handleChooseBackupDetail(detail.GUID);
	    };

	    return ApiSidebarItemCom;
	}(_react2.default.Component);

	;

	exports.ApiSidebarItemCom = ApiSidebarItemCom;

/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview api.operation.edit.detail.com.js 更新 API Detail Component
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-09
	* @update：2016-08-09
	*/

	'use strict';

	exports.__esModule = true;
	exports.ApiOperationEditDetailCom = undefined;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _verify = __webpack_require__(174);

	var _verify2 = __webpack_require__(177);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name ApiOperationEditDetailCom
	 * @class 创建/更新 API Detail Component
	 * @constructor
	 */

	var ApiOperationEditDetailCom = function (_Component) {
	    _inherits(ApiOperationEditDetailCom, _Component);

	    function ApiOperationEditDetailCom(props) {
	        _classCallCheck(this, ApiOperationEditDetailCom);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            isOpen: false,
	            type: 'updateDetail'
	        };


	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        _this.handleCloseView = _this.handleCloseView.bind(_this);
	        _this.openView = _this.openView.bind(_this);
	        return _this;
	    }

	    // 静态数据


	    ApiOperationEditDetailCom.prototype.render = function render() {
	        var _props = this.props;
	        var apiData = _props.apiData;
	        var apiDetail = _props.apiDetail;
	        var _state = this.state;
	        var isOpen = _state.isOpen;
	        var type = _state.type;

	        var formData = {};

	        switch (type) {
	            case 'updateDetail':
	                if (apiData.usedData) {
	                    formData.tag = apiData.usedData.dataName;
	                }

	                if (Object.keys(apiDetail).length) {
	                    formData.data = JSON.stringify(apiDetail);
	                }

	                if (!formData.tag || !formData.data) {
	                    return null;
	                }
	                break;
	            default:
	                formData = {
	                    tag: '',
	                    data: ''
	                };
	        }

	        return _react2.default.createElement(
	            'div',
	            { className: 'operation-update-detail-view ' + (isOpen ? 'on' : '') },
	            _react2.default.createElement(
	                'div',
	                { className: 'api-data-panel' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'add-table update-panel' },
	                    _react2.default.createElement(
	                        _verify2.VerifyForm,
	                        { className: 'table js-add-api-form', ref: 'updateForm', formData: formData },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'module-form-row' },
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'form-label' },
	                                '数据别名'
	                            ),
	                            _react2.default.createElement(_verify.VerifyInput, {
	                                type: 'text',
	                                name: 'tag',
	                                placeholder: '数据别名',
	                                value: formData.tag,
	                                term: ':notNull/strRange,{1-10}',
	                                ref: 'tag'
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'module-form-row textarea-item fn-clear' },
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'form-label' },
	                                '新建数据'
	                            ),
	                            _react2.default.createElement(_verify.VerifyInput, {
	                                type: 'textarea',
	                                name: 'data',
	                                placeholder: '接口数据',
	                                value: formData.data,
	                                term: ':notNull/json',
	                                ref: 'data'
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'button-wrapper' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'gray-btn js-cancel-api-data', onClick: this.handleCloseView },
	                                _react2.default.createElement(
	                                    'a',
	                                    null,
	                                    '取消'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'blue-btn js-add-api-data', onClick: this.handleSubmit },
	                                _react2.default.createElement(
	                                    'a',
	                                    null,
	                                    '保存'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement('div', { className: 'add-preview js-add-preview' })
	            )
	        );
	    };

	    /**
	     * 提交表单
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiOperationEditDetailCom.prototype.handleSubmit = function handleSubmit(event) {
	        var _props2 = this.props;
	        var apiData = _props2.apiData;
	        var handleSaveDetail = _props2.handleSaveDetail;
	        var type = this.state.type;

	        var postData = this.refs.updateForm.matchAll();

	        if (!!postData) {
	            postData.apiID = apiData.GUID;
	            postData.tagID = apiData.usedID;

	            switch (type) {
	                case 'createDetail':
	                    console.log('createDetail');
	                    handleSaveDetail(postData, 'create');
	                    this.handleCloseView();
	                    break;
	                case 'updateDetail':
	                    console.log('updateDetail');
	                    handleSaveDetail(postData, 'update');
	                    this.handleCloseView();
	                    break;
	                default:

	            }
	        }
	    };

	    /**
	     * 关闭 View
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiOperationEditDetailCom.prototype.handleCloseView = function handleCloseView(event) {
	        this.setState({
	            isOpen: false,
	            type: ''
	        });
	    };

	    /**
	     * 打开 View
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @param  {String} type      模块类别
	     *                            [createDetail]
	     *                            [updateDetail]
	     */


	    ApiOperationEditDetailCom.prototype.openView = function openView(type) {
	        var updateState = {
	            isOpen: true,
	            type: type
	        };

	        this.setState(updateState);
	    };

	    return ApiOperationEditDetailCom;
	}(_react.Component);

	;

	exports.ApiOperationEditDetailCom = ApiOperationEditDetailCom;

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview verify.input.js 验证控件 component
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-22
	* @update：2016-08-22
	*/

	'use strict';

	exports.__esModule = true;
	exports.VerifyInput = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _verify = __webpack_require__(175);

	var _verify2 = __webpack_require__(176);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name VerifyInput
	 * @class 验证控件
	 * @constructor
	 */

	var VerifyInput = function (_Component) {
	    _inherits(VerifyInput, _Component);

	    // [0:未验证, 1:验证成功, 2:验证失败]

	    function VerifyInput(props) {
	        _classCallCheck(this, VerifyInput);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            verified: 0 };


	        _this.handleChangeText = _this.handleChangeText.bind(_this);
	        _this.handleChangeCheckbox = _this.handleChangeCheckbox.bind(_this);
	        return _this;
	    }

	    // 静态数据


	    VerifyInput.prototype.render = function render() {
	        var _this2 = this;

	        var _props = this.props;
	        var type = _props.type;
	        var term = _props.term;
	        var _props$value = _props.value;
	        var value = _props$value === undefined ? '' : _props$value;
	        var _props$text = _props.text;
	        var text = _props$text === undefined ? '' : _props$text;
	        var _props$options = _props.options;
	        var options = _props$options === undefined ? [] : _props$options;
	        var _props$extraClass = _props.extraClass;
	        var extraClass = _props$extraClass === undefined ? '' : _props$extraClass;
	        var verifyStatus = _props.verifyStatus;

	        var props = _objectWithoutProperties(_props, ['type', 'term', 'value', 'text', 'options', 'extraClass', 'verifyStatus']);

	        var verifiedClass = '';

	        switch (verifyStatus) {
	            case 1:
	                verifiedClass = 'form-valid-item';
	                break;
	            case 2:
	                verifiedClass = 'form-invalid-item';
	                break;
	            default:
	        }

	        switch (type) {
	            case 'multiple':
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'form-item ' + extraClass + ' ' + verifiedClass },
	                    _react2.default.createElement(
	                        'select',
	                        _extends({
	                            className: 'form-control js-verify',
	                            multiple: 'true',
	                            value: value,
	                            'data-verify': term,
	                            onChange: this.handleChangeText
	                        }, props),
	                        options.map(function (option) {
	                            return _react2.default.createElement(
	                                'option',
	                                { value: option.value, key: option.value },
	                                option.text
	                            );
	                        })
	                    )
	                );
	                break;
	            case 'textarea':
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'form-item ' + extraClass + ' ' + verifiedClass },
	                    _react2.default.createElement('textarea', _extends({
	                        className: 'form-control js-verify',
	                        value: value,
	                        'data-verify': term,
	                        onChange: this.handleChangeText
	                    }, props))
	                );
	                break;
	            case 'select':
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'form-item ' + extraClass + ' ' + verifiedClass },
	                    _react2.default.createElement(
	                        'select',
	                        _extends({
	                            className: 'form-control js-verify',
	                            value: value,
	                            'data-verify': term,
	                            onChange: this.handleChangeText
	                        }, props),
	                        options.map(function (option) {
	                            return _react2.default.createElement(
	                                'option',
	                                { value: option.value, key: option.value },
	                                option.text
	                            );
	                        })
	                    )
	                );
	                break;
	            /**
	             * input:checkbox
	             * @param {Array} options          复选框的选项数据
	             * @param {String} options.value   复选框的选项值
	             * @param {String} options.text    复选框的属性文案
	             * @param {JSON} value             复选框的选中数据
	             *                                 {
	             *                                 	   options.value : [0:未选中, 1:已选中]
	             *                                 }
	             */
	            case 'checkbox':
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'form-item ' + extraClass + ' ' + verifiedClass },
	                    _react2.default.createElement(
	                        'ul',
	                        _extends({ className: 'form-checkbox-list fn-clear' }, props),
	                        options.map(function (option) {
	                            return _react2.default.createElement(_verify2.VerifyInputCheckbox, {
	                                key: option.value,
	                                value: option.value,
	                                text: option.text,
	                                checked: value[option.value] == 1,
	                                changeChecked: _this2.handleChangeCheckbox
	                            });
	                        })
	                    )
	                );
	                break;
	            default:
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'form-item ' + extraClass + ' ' + verifiedClass },
	                    _react2.default.createElement('input', _extends({
	                        type: type,
	                        className: 'form-control js-verify',
	                        value: value,
	                        'data-verify': term,
	                        onChange: this.handleChangeText
	                    }, props))
	                );
	        };
	    };

	    /**
	     * 输入框数据变更的事件
	     * @param  {String} value input 控件的值
	     */


	    VerifyInput.prototype.handleChangeText = function handleChangeText(value) {
	        value.preventDefault();

	        var _props2 = this.props;
	        var name = _props2.name;
	        var updateValue = _props2.updateValue;


	        if (value && value.nativeEvent) {
	            value = value.target.value;
	        }

	        updateValue(name, value, this.props.type);
	    };

	    /**
	     * checkbox 数据变更的事件
	     * @param  {String} value input 控件的值
	     */


	    VerifyInput.prototype.handleChangeCheckbox = function handleChangeCheckbox(key, value) {
	        var _props3 = this.props;
	        var name = _props3.name;
	        var updateValue = _props3.updateValue;

	        console.log(key, value);
	        // console.log($(value.currentTarget).attr('key'));
	        //
	        // const { name, updateValue } = this.props;
	        //
	        // if (value && value.nativeEvent) {
	        //     value = value.target.value;
	        // }
	        //
	        updateValue(name, { key: key, value: value }, this.props.type);
	    };

	    /**
	     * 验证输入内容
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    VerifyInput.prototype.verify = function verify(value) {
	        var _this3 = this;

	        var name = this.props.name;


	        if (value && value.nativeEvent) {
	            value = value.target.value;
	        }

	        _verify.VerifyService.delayInput(name, function () {
	            return _this3.parseVer(value);
	        });

	        this.props.updateValue(name, value);
	    };

	    /**
	     * 拆分验证条件
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @param {String} value 被验证数据
	     */


	    VerifyInput.prototype.parseVer = function parseVer(value) {
	        var _props4 = this.props;
	        var type = _props4.type;
	        var term = _props4.term;

	        var verData = term.match(/(^.*)\:(.+)/);

	        var name = void 0,
	            vers = void 0,
	            result = void 0;

	        if (!!verData) {
	            name = verData[1];
	            vers = verData[2].split('/');

	            if (value.trim() == '') {

	                if (vers.indexOf('notNull') != -1) {
	                    this.thrown('必填');
	                } else {
	                    this.verified();
	                }
	            } else {
	                // for (var i = 0, l = vers.length; i < l; i++) {
	                //
	                //     result = self.match(val, name, vers[i], $input, useResult);
	                //
	                //     if ( result != "ajax" && !result ){
	                //         break;
	                //     }
	                // }
	            }
	        }
	    };

	    /**
	     * 验证成功
	     */


	    VerifyInput.prototype.verified = function verified() {
	        this.setState({ verified: 1 });
	        console.log('verified');
	    };

	    /**
	     * 验证失败
	     * @param {String} msg 错误提示文字
	     */


	    VerifyInput.prototype.thrown = function thrown(msg) {
	        this.setState({ verified: 2 });
	    };

	    VerifyInput.prototype.componentWillMount = function componentWillMount() {};

	    VerifyInput.prototype.componentDidMount = function componentDidMount() {};

	    return VerifyInput;
	}(_react.Component);

	;

	VerifyInput.propTypes = {
	    name: _react.PropTypes.string.isRequired,
	    updateValue: _react.PropTypes.func
	};

	exports.VerifyInput = VerifyInput;

/***/ },

/***/ 175:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* @fileOverview verify.service.js 文件操作
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-22
	* @update：2016-08-22
	*/

	var Verify = function () {
	    /**
	     * @author 徐晨
	     * @name Verify
	     * @class Verify Serive
	     * @constructor
	     */

	    function Verify() {
	        _classCallCheck(this, Verify);

	        this.init();

	        this.mapDelayTime = {};
	    }

	    Verify.prototype.init = function init() {
	        this.verifyConfig = {
	            notNull: {
	                reg: /[^\s|.]/,
	                withName: true,
	                msg: '必填'
	            },
	            required: {
	                reg: /[^\s|.]/,
	                withName: true,
	                msg: '必填'
	            },
	            linkRequired: {
	                withName: true,
	                msg: '必填'
	            },
	            number: {
	                reg: /^\d+$/,
	                msg: '只能是数字'
	            },
	            numOrEn: {
	                reg: /^[0-9a-zA-Z]+$/,
	                msg: '只能是英文或者数字'
	            },
	            errorStr: {
	                reg: /^[^\&\<\>]*$/,
	                msg: '包含非法字符'
	            },
	            maxlength: {
	                msg: '过长'
	            },
	            email: {
	                reg: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                msg: '邮箱格式错误'
	            },
	            nullOrEmail: {
	                reg: /^.{0}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                msg: '邮箱格式错误'
	            },
	            mobile: {
	                reg: /^1[3|4|5|7|8]\d{9}$/,
	                msg: '手机号格式错误'
	            },
	            username: {
	                reg: /^1[3|4|5|7|8]\d{9}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                msg: '邮箱/手机号格式错误'
	            },
	            password: {
	                reg: /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/,
	                msg: '密码格式错误'
	            },
	            nullOrMobile: {
	                reg: /^.{0}$|^1[3|4|5|7|8]\d{9}$/,
	                msg: '手机号码格式错误'
	            },
	            zip: {
	                reg: /^\d{6}$/,
	                msg: '邮编格式错误'
	            },
	            api: {
	                reg: /^[\da-zA-Z\/\-.?=!]+$/,
	                msg: 'API 格式错误'
	            },
	            nullOrTelephoneArea: {
	                reg: /^.{0}$|^0\d{2,3}$/,
	                msg: '格式错误'
	            },
	            nullOrTelephone: {
	                reg: /^.{0}$|^\d{6,8}$/,
	                msg: '格式错误'
	            },
	            notExist: {
	                withName: true,
	                msg: '不存在'
	            },
	            strRange: {
	                msg: "字符串非法或过长" //strRange,{1-2}
	            },
	            json: {
	                msg: "非法 JSON 格式"
	            },
	            ajax: {
	                msg: "已存在"
	            },
	            price: {
	                reg: /^\d+(\.\d{1,2})?$/,
	                msg: '格式错误'
	            },
	            max: {
	                msg: '超过最大值'
	            },
	            imei: {
	                reg: /^\d{14,15}$/,
	                msg: '格式错误'
	            }
	        };
	    };

	    /**
	     * 验证条件：被验证数据为普通字符串且在{n-m}字数范围中 例:strRange,{100-200}
	     * @param {String} val 被验证数据
	     * @param {String} msg 错误信息
	     * @param {jQuery Object} dom 被验证jQuery Object
	     * @param {String} range 范围值
	     * @return {Object} { result : true|false, msg : msg };
	     */

	    Verify.prototype.strRange = function strRange(val, msg, dom, range) {
	        var self = this,
	            strMin = range.split("-")[0],
	            strMax = range.split("-")[1],
	            _reg = new RegExp('^[\\S\\.\\s]{' + strMin + ',' + strMax + '}$'),
	            _msg = (strMin == 0 ? 1 : strMin) + '~' + strMax + '个字符';
	        if (_reg.test(val)) {
	            return { result: true, msg: _msg };
	        } else {
	            return { result: false, msg: _msg };
	        }
	    };

	    /**
	     * 验证条件：被验证数据为普通字符串且小等于{max} 例:max,{200}
	     * @param {String} val 被验证数据
	     * @param {String} msg 错误信息
	     * @param {jQuery Object} dom 被验证jQuery Object
	     * @param {String} range 范围值
	     * @return {Object} { result : true|false, msg : msg };
	     */


	    Verify.prototype.max = function max(val, msg, dom, range) {
	        var self = this,
	            val = val | 0,
	            range = range | 0;

	        if (val <= range) {
	            return { result: true, msg: msg };
	        } else {
	            return { result: false, msg: msg };
	        }
	    };

	    /**
	     * 验证条件：被验证数据为 JSON 格式 例:json
	     * @param {String} val 被验证数据
	     * @param {String} msg 错误信息
	     * @param {jQuery Object} dom 被验证jQuery Object
	     * @param {String} range 范围值
	     * @return {Object} { result : true|false, msg : msg };
	     */


	    Verify.prototype.json = function json(val, msg, dom, range) {
	        var self = this,
	            flag = true;

	        try {
	            JSON.parse(val);
	        } catch (e) {
	            flag = false;
	        }

	        return { result: flag, msg: msg };
	    };

	    /**
	     * 延迟输入
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    Verify.prototype.delayInput = function delayInput(id, callback) {
	        var _this = this;

	        var time = +new Date();

	        if (!this.mapDelayTime[id]) {
	            this.mapDelayTime[id] = [];
	        }

	        this.mapDelayTime[id].push(time);

	        setTimeout(function () {
	            if (time == _this.mapDelayTime[id][_this.mapDelayTime[id].length - 1]) {
	                Store.isFunction(callback) && callback();
	            }
	        }, 300);
	    };

	    return Verify;
	}();

	var VerifyService = new Verify();

	exports.VerifyService = VerifyService;

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview verify.checkbox.js checkbox 控件 component
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-31
	* @update：2016-08-31
	*/

	'use strict';

	exports.__esModule = true;
	exports.VerifyInputCheckbox = undefined;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name VerifyInput
	 * @class 验证控件
	 * @constructor
	 */

	var VerifyInputCheckbox = function (_Component) {
	    _inherits(VerifyInputCheckbox, _Component);

	    function VerifyInputCheckbox(props) {
	        _classCallCheck(this, VerifyInputCheckbox);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.handleChange = _this.handleChange.bind(_this);
	        return _this;
	    }

	    VerifyInputCheckbox.prototype.render = function render() {
	        var _props = this.props;
	        var value = _props.value;
	        var text = _props.text;
	        var checked = _props.checked;


	        var verifiedClass = '';
	        return _react2.default.createElement(
	            'li',
	            {
	                className: 'form-control form-checkbox ' + (checked ? 'checked' : ''),
	                onClick: this.handleChange
	            },
	            text
	        );
	    };

	    /**
	     * checkbox 数据变更的事件
	     */


	    VerifyInputCheckbox.prototype.handleChange = function handleChange() {
	        var _props2 = this.props;
	        var value = _props2.value;
	        var checked = _props2.checked;
	        var changeChecked = _props2.changeChecked;

	        changeChecked(value, !checked);
	    };

	    VerifyInputCheckbox.prototype.componentWillMount = function componentWillMount() {};

	    VerifyInputCheckbox.prototype.componentDidMount = function componentDidMount() {};

	    return VerifyInputCheckbox;
	}(_react.Component);

	;

	// VerifyInputCheckbox.propTypes = {
	//     checked: PropTypes.Boolean.isRequired,
	//     changeChecked: PropTypes.func
	// }

	exports.VerifyInputCheckbox = VerifyInputCheckbox;

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	* @fileOverview verify.form.js 验证表单 component
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-22
	* @update：2016-08-22
	*/

	'use strict';

	exports.__esModule = true;
	exports.VerifyForm = undefined;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _verify = __webpack_require__(174);

	var _apiService = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name VerifyForm
	 * @class 验证表单
	 * @constructor
	 */

	var VerifyForm = function (_React$Component) {
	    _inherits(VerifyForm, _React$Component);

	    function VerifyForm(props) {
	        _classCallCheck(this, VerifyForm);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.state = {};
	        var formData = props.formData;


	        Object.keys(formData).map(function (key) {
	            _this.state[key] = {
	                value: formData[key],
	                verifyStatus: 0 // [0:未验证, 1:验证成功, 2:验证失败]
	            };
	        });

	        _this.updateValue = _this.updateValue.bind(_this);
	        return _this;
	    }

	    // 静态数据


	    VerifyForm.prototype.renderChildren = function renderChildren(children) {
	        var _this2 = this;

	        return _react.Children.map(children, function (child) {
	            if (!child) {
	                return null;
	            }

	            if (typeof child === 'string') {
	                return child;
	            }

	            var props = {};

	            if (child.type === _verify.VerifyInput && child.ref) {
	                props.updateValue = _this2.updateValue;
	            }

	            if (child.props.children) {
	                props.children = _this2.renderChildren(child.props.children);
	            }

	            // 默认赋值
	            if (_this2.state[child.props.name]) {
	                props.value = _this2.state[child.props.name].value;
	                props.verifyStatus = _this2.state[child.props.name].verifyStatus;
	            }

	            // return child;
	            // if (typeof child === 'string') { return child; }
	            // let { hintType, readOnly } = child.props;
	            // let props = {
	            //     hintType: hintType || this.props.hintType,
	            //     readOnly: readOnly || disabled,
	            //     layout: this.props.layout,
	            // };
	            // if (child.type === FormControl || child.type.displayName === 'FormItem') {
	            //     props.itemBind = this.itemBind;
	            //     props.itemUnbind = this.itemUnbind;
	            //     props.itemChange = this.itemChange;
	            //     props.formData = data;
	            // } else if (child.type === FormSubmit) {
	            //     props.disabled = disabled;
	            //     if (fetchStatus !== FETCH_SUCCESS) {
	            //         props.children = getLang('fetch.status')[fetchStatus];
	            //     }
	            // } else if (child.props.children) {
	            //     props.children = this.renderChildren(child.props.children);
	            // }
	            //

	            return (0, _react.cloneElement)(child, props);
	        });
	    };

	    VerifyForm.prototype.render = function render() {
	        var _props = this.props;
	        var className = _props.className;
	        var formData = _props.formData;
	        var children = _props.children;

	        var props = _objectWithoutProperties(_props, ['className', 'formData', 'children']);

	        return _react2.default.createElement(
	            'div',
	            { className: className },
	            this.renderChildren(children)
	        );
	    };

	    /**
	     * 验证验证区域内所有的验证项
	     * 通过则返回所有区域内所有 input 的值
	     * 未通过返回 false
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @param {Boolean}     useRock    使用摇一摇
	     */


	    VerifyForm.prototype.matchAll = function matchAll() {
	        var _this3 = this;

	        var response = {},
	            flag = true;

	        Object.keys(this.state).map(function (key) {
	            // if ( this.state[key].value.trim().length ) {
	            // response[key] = this.state[key].value.trim();
	            response[key] = _this3.state[key].value;
	            // } else {
	            // flag = false;
	            // }
	        });

	        return flag ? response : false;
	    };

	    VerifyForm.prototype.updateValue = function updateValue(key, value, type) {
	        var updateState = {};

	        switch (type) {
	            case 'multiple':
	                var selectOptions = this.state[key].value;

	                // 移除已选择的，添加新的
	                value = selectOptions.indexOf(value) != -1 ? selectOptions.filter(function (item) {
	                    return item != value;
	                }) : selectOptions.concat(value);
	                break;
	            case 'checkbox':
	                var checkboxValue = {};

	                checkboxValue[value.key] = value.value;
	                value = $.extend({}, this.state[key].value, checkboxValue);
	                break;
	            default:
	        }

	        updateState[key] = {
	            value: value,
	            verifyStatus: this.state[key].verifyStatus
	        };

	        this.setState(updateState);
	    };

	    // 初始化数据


	    VerifyForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        var _this4 = this;

	        var updateState = {},
	            flag = void 0;

	        Object.keys(nextProps.formData).map(function (key) {
	            if (_this4.state[key]) {

	                if (_this4.state[key].value != nextProps.formData[key]) {
	                    flag = true;
	                }

	                updateState[key] = {
	                    value: nextProps.formData[key],
	                    verifyStatus: _this4.state[key].verifyStatus
	                };
	            }
	        });

	        flag && this.setState(updateState);
	    };

	    VerifyForm.prototype.componentWillMount = function componentWillMount() {};

	    VerifyForm.prototype.componentDidMount = function componentDidMount() {};

	    return VerifyForm;
	}(_react2.default.Component);

	;

	exports.VerifyForm = VerifyForm;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

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

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {/**
	* @fileOverview api.action.js redux action for API
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	exports.__esModule = true;
	exports.apiAction = undefined;
	exports.fetchApiList = fetchApiList;
	exports.fetchApiGroup = fetchApiGroup;
	exports.fetchApiData = fetchApiData;
	exports.selectBackup = selectBackup;
	exports.setApiDetail = setApiDetail;
	exports.fetchApiDetail = fetchApiDetail;
	exports.createApiDetail = createApiDetail;
	exports.updateApiDetail = updateApiDetail;
	exports.removeApiDetail = removeApiDetail;

	var _api = __webpack_require__(178);

	var types = _interopRequireWildcard(_api);

	var _api2 = __webpack_require__(1);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var apiAction = exports.apiAction = {
	    /**
	     * Set API Group
	     */
	    setApiGroup: function setApiGroup(apiGroup) {
	        return {
	            type: types.API_SET_GROUP,
	            apiGroup: apiGroup
	        };
	    },

	    /**
	     * Set API Data
	     */
	    setApiData: function setApiData(apiData) {
	        return {
	            type: types.API_SET_DATA,
	            apiData: apiData
	        };
	    },

	    /**
	     * 添加 API Data
	     */
	    addData: function addData(apiData) {
	        return {
	            type: types.API_ADD_DATA,
	            apiData: apiData
	        };
	    },

	    /**
	     * 更新 API Data
	     */
	    updateData: function updateData(apiData) {
	        return {
	            type: types.API_UPDATE_DATA,
	            apiData: apiData
	        };
	    },

	    /**
	     * 删除 API Data
	     */
	    removeData: function removeData(apiData) {
	        return {
	            type: types.API_REMOVE_DATA,
	            apiData: apiData
	        };
	    },

	    /**
	     * Set API Data Detail
	     */
	    setApiDetail: function setApiDetail(apiDetail) {
	        return {
	            type: types.API_SET_DETAIL,
	            apiDetail: apiDetail
	        };
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
	    updateDetail: function updateDetail(apiDetail) {
	        return {
	            type: types.API_UPDATE_DETAIL,
	            apiDetail: apiDetail
	        };
	    },

	    /**
	     * 删除 API Detail
	     */
	    removeDetail: function removeDetail(apiDetail) {
	        return {
	            type: types.API_REMOVE_DETAIL,
	            apiDetail: apiDetail
	        };
	    },

	    /**
	     * Set API Data List
	     */
	    setApiList: function setApiList() {
	        var apiList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	        return {
	            type: types.API_SET_LIST,
	            apiList: apiList
	        };
	    }
	};

	/**
	 * 获取 API 列表
	 */
	function fetchApiList(data) {
	    return function (dispatch, getState) {
	        _api2.ApiService.getList(data).then(function (result) {
	            dispatch(apiAction.setApiList(result.list));
	        });
	    };
	}

	/**
	 * 获取 API 分组
	 */
	function fetchApiGroup() {
	    return function (dispatch, getState) {
	        _api2.ApiService.getGroups().then(function (result) {
	            dispatch(apiAction.setApiGroup(result.list));
	        });
	    };
	}

	/**
	 * 获取 API Data
	 */
	function fetchApiData(GUID) {
	    return function (dispatch, getState) {
	        _api2.ApiService.getData(GUID).then(function (result) {
	            dispatch(apiAction.setApiData(result));
	        });
	    };
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
	function selectBackup(GUID) {
	    return function (dispatch, getState) {
	        var _apiData = getState().apiData;
	        dispatch(apiAction.setApiData(_.extend({}, _apiData, {
	            usedID: GUID,
	            usedData: _.findWhere(_apiData.dataList, { GUID: GUID })
	        })));
	    };
	}

	/**
	 * 设置 API Data Detail
	 */
	function setApiDetail(apiDetail) {
	    return function (dispatch, getState) {
	        dispatch(apiAction.setApiDetail(JSON.parse(apiDetail)));
	    };
	}

	/**
	 * 获取 API Data Detail
	 */
	function fetchApiDetail(GUID) {
	    return function (dispatch, getState) {
	        _api2.ApiService.getBackupDetail(GUID).then(function (result) {
	            dispatch(apiAction.setApiDetail(result));
	        });
	    };
	}

	/**
	 * 创建 API Data Detail
	 * @param {JSON} backupData          API Detail 数据
	 * @param {GUID} backupData.apiID    接口地址
	 * @param {String} backupData.tag    数据别名
	 * @param {String} backupData.data   数据
	 */
	function createApiDetail(backupData) {
	    var parseData = JSON.parse(backupData.data);

	    backupData.data = JSON.stringify(parseData);

	    return function (dispatch, getState) {
	        _api2.ApiService.createBackup(backupData).then(function (result) {
	            dispatch(apiAction.setApiData(result.apiData));
	        });
	    };
	}

	/**
	 * 更新 API Data Detail
	 * @param {JSON} backupData          API Detail 数据
	 * @param {GUID} backupData.apiID    接口地址
	 * @param {GUID} backupData.tagID    数据 GUID
	 * @param {String} backupData.tag    数据别名
	 * @param {String} backupData.data   数据
	 */
	function updateApiDetail(backupData) {
	    var parseData = JSON.parse(backupData.data);

	    backupData.data = JSON.stringify(parseData);

	    return function (dispatch, getState) {
	        var _apiData = getState().apiData;
	        _api2.ApiService.updateBackup(backupData).then(function (result) {
	            dispatch(apiAction.setApiData(result.apiData));
	        });
	    };
	}

	/**
	 * 删除 API Data Detail
	 * @param {GUID} removeGUID    删除的数据 GUID
	 * @param {GUID} selectGUID    删除后选择的数据 GUID
	 */
	function removeApiDetail(removeGUID, selectGUID) {
	    return function (dispatch, getState) {
	        var _apiData = getState().apiData;

	        dispatch(apiAction.setApiData(_.extend({}, _apiData, {
	            dataList: _apiData.dataList.filter(function (item) {
	                return item.GUID != removeGUID;
	            }),
	            usedID: selectGUID
	        })));
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(180)))

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

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	* @fileOverview react.router.js 静态路由配置文件
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactRouter = __webpack_require__(209);

	var _reactRouterRedux = __webpack_require__(198);

	var _redux = __webpack_require__(183);

	var _reactRedux = __webpack_require__(271);

	var _reduxThunk = __webpack_require__(278);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _home = __webpack_require__(279);

	var _home2 = _interopRequireDefault(_home);

	var _apiList = __webpack_require__(280);

	var _apiList2 = _interopRequireDefault(_apiList);

	var _apiDetail = __webpack_require__(281);

	var _apiDetail2 = _interopRequireDefault(_apiDetail);

	var _apiData = __webpack_require__(285);

	var _apiData2 = _interopRequireDefault(_apiData);

	var _roomList = __webpack_require__(286);

	var _roomList2 = _interopRequireDefault(_roomList);

	var _configureStore = __webpack_require__(287);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _configureStore2.default)();
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.hashHistory, store);

	var childRoutes = [{
	    path: '/',
	    component: _home2.default,
	    title: '变色龙代理系统'
	}, {
	    path: '/api/list(/)',
	    component: _apiList2.default,
	    title: 'API List'
	}, {
	    path: '/api/detail/:id',
	    component: _apiDetail2.default,
	    title: 'API Detail'
	}, {
	    path: '/api/create',
	    component: _apiData2.default,
	    title: '创建 API DATA'
	}, {
	    path: '/api/update/:id',
	    component: _apiData2.default,
	    title: '修改 API DATA'
	}, {
	    path: '/room/list',
	    component: _roomList2.default,
	    title: '项目列表'
	}];

	var rootRouter = {
	    childRoutes: childRoutes.map(function (item) {
	        return {
	            path: item.path,
	            component: item.component,
	            onEnter: function onEnter(event) {
	                document.title = item.title;
	            }
	        };
	    })
	};

	// render (
	//     <Provider store={store}>
	//         <div>
	//             <Router history={history}>
	//                 <Route path="/">
	//                     <IndexRoute component={HomeView}/>
	//                     <Route path="/api/list" component={ApiListView}/>
	//                 </Route>
	//             </Router>
	//         </div>
	//     </Provider>,
	//     $('#main').get(0)
	// );

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_reactRouter.Router, {
	        history: history,
	        routes: rootRouter
	    })
	), $('#main').get(0));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview home.view.js 首页
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactRouter = __webpack_require__(209);

	var _reactRedux = __webpack_require__(271);

	var _api = __webpack_require__(179);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name HomeView
	 * @class 公共头部
	 * @constructor
	 */

	var HomeView = function (_React$Component) {
	    _inherits(HomeView, _React$Component);

	    function HomeView() {
	        _classCallCheck(this, HomeView);

	        return _possibleConstructorReturn(this, _React$Component.call(this));
	    }

	    HomeView.prototype.render = function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'page-home js-page-home' },
	            _react2.default.createElement(
	                'ul',
	                { className: 'home-operation' },
	                _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'room-name' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/api/list' },
	                            'API List'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'room-name' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/room/list' },
	                            'Room List'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'room-name' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/help' },
	                            'Help'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'li',
	                    { className: 'js-update-V2' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'room-name' },
	                        '升级旧版本数据'
	                    )
	                )
	            )
	        );
	    };

	    return HomeView;
	}(_react2.default.Component);

	;

	function mapStateToProps(state) {
	    return {
	        test: 'test'
	    };
	}

	// export { HomeView };
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(HomeView);

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	* @fileOverview api.list.view.js 接口列表
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactRouter = __webpack_require__(209);

	var _redux = __webpack_require__(183);

	var _reactRedux = __webpack_require__(271);

	var _apiService = __webpack_require__(1);

	var _api = __webpack_require__(179);

	var apiAction = _interopRequireWildcard(_api);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name HomeView
	 * @class 公共头部
	 * @constructor
	 */

	var ApiListView = function (_Component) {
	    _inherits(ApiListView, _Component);

	    function ApiListView(props) {
	        _classCallCheck(this, ApiListView);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            apiList: [],
	            groups: []
	        };
	        return _this;
	    }

	    // 静态数据


	    ApiListView.prototype.render = function render() {
	        var groups = this.state.groups;
	        var _props$location$query = this.props.location.query;
	        var type = _props$location$query.type;
	        var groupID = _props$location$query.groupID;


	        var listView = void 0;

	        var _props = this.props;
	        var apiList = _props.apiList;
	        var apiGroup = _props.apiGroup;


	        switch (type) {
	            case 'group':
	                listView = this.viewGroups(groups);
	                break;
	            default:
	                listView = this.viewApiList(apiList);
	                break;
	        }

	        return _react2.default.createElement(
	            'div',
	            { className: 'page-api-list js-page-api-list' },
	            this.groupMenu(),
	            listView
	        );
	    };

	    ApiListView.prototype.groupMenu = function groupMenu() {
	        var _props$location$query2 = this.props.location.query;
	        var groupID = _props$location$query2.groupID;
	        var room = _props$location$query2.room;
	        var groupMenuMap = {};var _props2 = this.props;
	        var apiList = _props2.apiList;
	        var apiGroup = _props2.apiGroup;


	        apiList.forEach(function (item, index) {
	            apiGroup.forEach(function (group, i) {
	                if (group.apiList[item.GUID]) {
	                    groupMenuMap[group.GUID] = group.name;
	                }
	            });
	        });

	        return _react2.default.createElement(
	            'ul',
	            { className: 'group-menu' },
	            Object.keys(groupMenuMap).map(function (key) {
	                var apiListLink = '/api/list/?room=' + room + '&groupID=' + key;

	                return _react2.default.createElement(
	                    'li',
	                    { key: key },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: apiListLink },
	                        groupMenuMap[key]
	                    )
	                );
	            })
	        );
	    };

	    ApiListView.prototype.viewApiList = function viewApiList(list) {
	        var groupID = this.props.location.query.groupID;
	        var listForGroup = [];var apiGroup = this.props.apiGroup;


	        console.log(list);
	        console.log(apiGroup);

	        if (groupID && apiGroup.length) {
	            apiGroup.forEach(function (group, i) {
	                if (group.GUID == groupID) {
	                    console.log(group);
	                    list.forEach(function (api) {
	                        if (group.apiList[api.GUID]) {
	                            listForGroup.push(api);
	                        }
	                    });
	                }
	            });
	        } else {
	            listForGroup = [].concat(list);
	        }

	        return _react2.default.createElement(
	            'ul',
	            { className: 'api-list' },
	            listForGroup.map(function (api) {
	                var apiLink = '/api/detail/' + api.GUID;

	                return _react2.default.createElement(
	                    'li',
	                    { key: api.GUID },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: apiLink },
	                        api.name
	                    )
	                );
	            })
	        );
	    };

	    ApiListView.prototype.viewGroups = function viewGroups(list) {
	        var arr = [];

	        arr = list.map(function (group) {
	            group.list = [];

	            $.each(group.apiList, function (apiGUID, apiName) {
	                group.list.push({
	                    GUID: apiGUID,
	                    name: apiName
	                });
	            });

	            return group;
	        });

	        return _react2.default.createElement(
	            'ul',
	            { className: 'group-list' },
	            arr.map(function (group) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: group.GUID },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'group-name' },
	                        group.name
	                    ),
	                    group.list.map(function (api) {
	                        return _react2.default.createElement(
	                            'div',
	                            { key: api.GUID },
	                            api.name
	                        );
	                    })
	                );
	            })
	        );
	    };

	    // viewOperationBar () {
	    //     return (
	    //         <div className="fix-operation-bar">
	    //             <div className="blue-btn">
	    //                 <a>查看详情</a>
	    //             </div>
	    //             <div className="blue-btn">
	    //                 <a>保存</a>
	    //             </div>
	    //             <div className="blue-btn">
	    //                 <a>删除</a>
	    //             </div>
	    //         </div>
	    //     );
	    // }

	    ApiListView.prototype.componentWillMount = function componentWillMount() {
	        var query = this.props.location.query;
	        var listFilterData = {};

	        if (query.room) {
	            listFilterData.room = query.room;
	        }

	        this.props.actions.fetchApiList(listFilterData);
	        this.props.actions.fetchApiGroup();
	    };

	    ApiListView.prototype.componentDidMount = function componentDidMount() {
	        // ApiService.getList().done(function (result) {
	        //     this.setState({apiList: result.list});
	        // }.bind(this));
	        //
	        // ApiService.getGroups().done(function (result) {
	        //     this.setState({groups: result.list});
	        // }.bind(this));
	    };

	    return ApiListView;
	}(_react.Component);

	;

	function mapStateToProps(state, props) {
	    var apiList = state.apiList;
	    var apiGroup = state.apiGroup;


	    return {
	        apiList: apiList,
	        apiGroup: apiGroup
	    };
	}

	/**
	 * merge action medth
	 */
	function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(apiAction, dispatch)
	    };
	}

	ApiListView.propTypes = {
	    apiList: _react.PropTypes.array.isRequired
	};

	// export { ApiListView };
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ApiListView);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	* @fileOverview api.detail.view.js 接口列表
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-27
	* @update：2016-07-27
	*/

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _redux = __webpack_require__(183);

	var _reactRedux = __webpack_require__(271);

	var _api = __webpack_require__(179);

	var apiAction = _interopRequireWildcard(_api);

	var _room = __webpack_require__(282);

	var roomAction = _interopRequireWildcard(_room);

	var _api2 = __webpack_require__(1);

	var _apiListSidebar = __webpack_require__(284);

	var _apiSidebarItem = __webpack_require__(5);

	var _apiOperationEditDetail = __webpack_require__(173);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name ApiDetailView
	 * @class API Detail View
	 * @constructor
	 */

	var ApiDetailView = function (_Component) {
	    _inherits(ApiDetailView, _Component);

	    function ApiDetailView(props) {
	        _classCallCheck(this, ApiDetailView);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {};


	        _this.handleOpenApiList = _this.handleOpenApiList.bind(_this);
	        _this.handleChooseBackupDetail = _this.handleChooseBackupDetail.bind(_this);
	        _this.handleRemoveBackupDetail = _this.handleRemoveBackupDetail.bind(_this);
	        _this.handleSaveDetail = _this.handleSaveDetail.bind(_this);
	        _this.openCreateDetailView = _this.openCreateDetailView.bind(_this);
	        _this.openUpdateDetailView = _this.openUpdateDetailView.bind(_this);
	        return _this;
	    }

	    // 静态数据


	    ApiDetailView.prototype.render = function render() {
	        var _props = this.props;
	        var apiList = _props.apiList;
	        var apiData = _props.apiData;
	        var apiDetail = _props.apiDetail;
	        var roomList = _props.roomList;


	        return _react2.default.createElement(
	            'div',
	            { className: 'page-api-detail js-page-api-detail', ref: 'mainContent' },
	            _react2.default.createElement(
	                'div',
	                { className: 'api-header' },
	                apiData.name
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'api-content' },
	                this.viewApiDetail(apiData),
	                _react2.default.createElement('div', { className: 'api-detail-view', ref: 'detailView' }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'api-operation-view', ref: 'operationView' },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'api-operation-btn-list' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            'API Data'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#/api/update/' + apiData.GUID },
	                                '修改当前 API Data'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#/api/update/' + apiData.GUID + '?type=group' },
	                                '修改当前 API 分组'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#/api/update/' + apiData.GUID + '?type=api' },
	                                '修改当前 API Data apiUrl'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '删除当前 API Data'
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            'API Detail'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            { onClick: this.openCreateDetailView },
	                            '新建 API Detail'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            { onClick: this.openUpdateDetailView },
	                            '修改当前 API Detail'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            { onClick: this.handleRemoveBackupDetail },
	                            '删除当前 API Detail'
	                        )
	                    )
	                ),
	                _react2.default.createElement(_apiOperationEditDetail.ApiOperationEditDetailCom, {
	                    apiData: apiData,
	                    apiDetail: apiDetail,
	                    handleSaveDetail: this.handleSaveDetail,
	                    ref: 'updateDetailView'
	                })
	            ),
	            _react2.default.createElement(_apiListSidebar.ApiListSidebarView, { list: apiList, curGUID: apiData.GUID })
	        );
	    };

	    ApiDetailView.prototype.viewApiDetail = function viewApiDetail(apiData) {
	        if (!apiData.dataList) {
	            return null;
	        }

	        return _react2.default.createElement(
	            'div',
	            { className: 'api-detail-list' },
	            _react2.default.createElement(
	                'ul',
	                { className: '' },
	                apiData.dataList.map(function (detail) {
	                    return _react2.default.createElement(_apiSidebarItem.ApiSidebarItemCom, {
	                        key: detail.GUID,
	                        detail: detail,
	                        apiData: apiData,
	                        handleChooseBackupDetail: this.handleChooseBackupDetail
	                    });
	                }.bind(this))
	            )
	        );
	    };

	    /**
	     * 开启 API List 面板
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiDetailView.prototype.handleOpenApiList = function handleOpenApiList() {};

	    /**
	     * 选择一个数据
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @params {GUID}   detailGUID   API Detail GUID
	     */


	    ApiDetailView.prototype.handleChooseBackupDetail = function handleChooseBackupDetail(detailGUID) {
	        var _this2 = this;

	        _api2.ApiService.selectBackup({
	            apiID: this.props.apiData.GUID,
	            tagID: detailGUID
	        }).done(function (result) {
	            _this2.props.apiActions.selectBackup(detailGUID);
	        });
	    };

	    /**
	     * 打开创建数据的 View
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiDetailView.prototype.openCreateDetailView = function openCreateDetailView() {
	        this.refs.updateDetailView.openView('createDetail');
	    };

	    /**
	     * 打开更新数据的 View
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiDetailView.prototype.openUpdateDetailView = function openUpdateDetailView() {
	        this.refs.updateDetailView.openView('updateDetail');
	    };

	    /**
	     * 新建/保存一个数据
	     * @param  {JSON} detailData      数据
	     * @param  {String} type          处理方式[create: 新建数据, update: 保存数据]
	     */


	    ApiDetailView.prototype.handleSaveDetail = function handleSaveDetail(detailData, type) {
	        var _this3 = this;

	        switch (type) {
	            case 'create':
	                _api2.ApiService.createBackup(detailData).then(function (result) {
	                    _this3.props.apiActions.fetchApiData(_this3.props.params.id);
	                    _this3.props.apiActions.setApiDetail(detailData.data);
	                });
	                break;
	            case 'update':
	                _api2.ApiService.updateBackup(detailData).then(function (result) {
	                    _this3.props.apiActions.fetchApiData(_this3.props.params.id);
	                    _this3.props.apiActions.setApiDetail(detailData.data);
	                });
	                break;
	            default:
	        }
	    };

	    /**
	     * 删除一个数据
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @params {GUID}   detailGUID   API Detail GUID
	     */


	    ApiDetailView.prototype.handleRemoveBackupDetail = function handleRemoveBackupDetail() {
	        var _this4 = this;

	        var apiData = this.props.apiData;

	        var dialogConfirm = confirm('是否删除当前数据？');

	        dialogConfirm && _api2.ApiService.removeBackup({
	            apiID: this.props.apiData.GUID,
	            tagID: this.props.apiData.usedID
	        }).done(function (curDetailGUID) {
	            _this4.props.apiActions.removeApiDetail(_this4.props.apiData.usedID, curDetailGUID);
	        });
	    };

	    ApiDetailView.prototype.componentWillMount = function componentWillMount() {
	        this.props.roomActions.fetchRoomList();
	        this.props.apiActions.fetchApiList();
	        this.props.apiActions.fetchApiData(this.props.params.id);
	    };

	    ApiDetailView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!!nextProps.apiData.usedID && nextProps.apiData.usedID != this.props.apiData.usedID) {
	            this.props.apiActions.fetchApiDetail(nextProps.apiData.usedID);
	        }

	        // 渲染 API 数据
	        if (nextProps.apiDetail != this.props.apiDetail) {
	            $(this.refs.detailView).JSONView(nextProps.apiDetail);
	        }
	    };

	    ApiDetailView.prototype.componentDidMount = function componentDidMount() {};

	    return ApiDetailView;
	}(_react.Component);

	;

	function mapStateToProps(state, props) {
	    var apiList = state.apiList;
	    var apiData = state.apiData;
	    var apiDetail = state.apiDetail;
	    var roomList = state.roomList;


	    return {
	        apiData: apiData,
	        apiDetail: apiDetail,
	        apiList: apiList,
	        roomList: roomList
	    };
	}

	/**
	 * merge action medth
	 */
	function mapDispatchToProps(dispatch) {
	    return {
	        apiActions: (0, _redux.bindActionCreators)(apiAction, dispatch),
	        roomActions: (0, _redux.bindActionCreators)(roomAction, dispatch)
	    };
	}

	ApiDetailView.propTypes = {
	    apiData: _react.PropTypes.object.isRequired,
	    apiList: _react.PropTypes.array.isRequired
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ApiDetailView);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

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

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @fileOverview api.list.sidebar.view.js 侧边栏-API 列表
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-27
	* @update：2016-07-27
	*/

	'use strict';

	exports.__esModule = true;
	exports.ApiListSidebarView = undefined;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _apiService = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name HomeView
	 * @class 公共头部
	 * @constructor
	 */

	var ApiListSidebarView = function (_React$Component) {
	    _inherits(ApiListSidebarView, _React$Component);

	    function ApiListSidebarView() {
	        _classCallCheck(this, ApiListSidebarView);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this));

	        _this.state = {};
	        return _this;
	    }

	    // 静态数据


	    ApiListSidebarView.prototype.render = function render() {
	        var _props = this.props;
	        var _props$list = _props.list;
	        var list = _props$list === undefined ? [] : _props$list;
	        var curGUID = _props.curGUID;


	        return _react2.default.createElement(
	            'ul',
	            { className: 'api-list' },
	            list.map(function (api) {

	                return _react2.default.createElement(
	                    'li',
	                    { className: 'cc ' + (curGUID == api.GUID ? 'selected' : ''), key: api.GUID },
	                    api.name
	                );
	            })
	        );
	    };

	    /**
	     * 开启 API List 面板
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    ApiListSidebarView.prototype.handleOpenApiList = function handleOpenApiList() {};

	    ApiListSidebarView.prototype.componentWillMount = function componentWillMount() {};

	    ApiListSidebarView.prototype.componentDidMount = function componentDidMount() {};

	    return ApiListSidebarView;
	}(_react2.default.Component);

	;

	exports.ApiListSidebarView = ApiListSidebarView;

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	* @fileOverview api.data.view.js 接口列表
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-08-29
	* @update：2016-08-29
	*/

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactRouter = __webpack_require__(209);

	var _redux = __webpack_require__(183);

	var _reactRedux = __webpack_require__(271);

	var _api = __webpack_require__(179);

	var apiAction = _interopRequireWildcard(_api);

	var _room = __webpack_require__(282);

	var roomAction = _interopRequireWildcard(_room);

	var _verify = __webpack_require__(174);

	var _verify2 = __webpack_require__(177);

	var _api2 = __webpack_require__(1);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @author 徐晨
	 * @name ApiDataView
	 * @class API Data View
	 * @constructor
	 */

	var ApiDataView = function (_Component) {
	    _inherits(ApiDataView, _Component);

	    function ApiDataView(props) {
	        _classCallCheck(this, ApiDataView);

	        // 静态数据

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            isCreate: !props.params.id
	        };

	        _this.handleCancel = _this.handleCancel.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }

	    ApiDataView.prototype.render = function render() {
	        var _this2 = this;

	        var _props = this.props;
	        var apiData = _props.apiData;
	        var apiGroup = _props.apiGroup;
	        var roomList = _props.roomList;
	        var location = _props.location;


	        var type = location.query.type;

	        var apiOptions = {
	            group: [{
	                value: '0',
	                text: '新建分组'
	            }],
	            rooms: [],
	            method: [{
	                value: 'post',
	                text: 'POST'
	            }, {
	                value: 'get',
	                text: 'GET'
	            }],
	            dataType: [{
	                value: 'json',
	                text: 'JSON 数据'
	            }]
	        };

	        // {
	        //     value: 'string',
	        //     text: '字符串'
	        // },
	        // {
	        //     value: 'upload',
	        //     text: '上传文件'
	        // },
	        // {
	        //     value: 'captcha',
	        //     text: '验证码'
	        // }
	        var formData = {
	            group: 0,
	            groupName: '',
	            api: '',
	            name: '',
	            method: 'post',
	            contactRoom: {},
	            dataType: 'json',
	            data: ''
	        };

	        if (!this.state.isCreate && !apiData.api || !Store.isArray(apiGroup)) {
	            return null;
	        }

	        if (!this.state.isCreate) {
	            formData = {
	                group: apiData.groupID,
	                groupName: '',
	                api: apiData.api,
	                name: apiData.name,
	                method: apiData.method,
	                contactRoom: {},
	                dataType: apiData.dataType
	            };
	        }

	        apiGroup.map(function (item) {
	            apiOptions.group.push({
	                value: item.GUID,
	                text: item.name
	            });
	        });

	        roomList.map(function (item) {
	            apiOptions.rooms.push({
	                value: item.GUID,
	                text: item.name
	            });

	            formData.contactRoom[item.GUID] = _this2.state.isCreate ? 0 : !!apiData.contactRoom[item.GUID];
	        });

	        return _react2.default.createElement(
	            'div',
	            { className: 'page-api-data-form', ref: 'mainContent' },
	            _react2.default.createElement(
	                'div',
	                { className: 'api-header' },
	                apiData.name || '创建 API'
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'api-content' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'api-data-panel' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'add-table update-panel' },
	                        _react2.default.createElement(
	                            _verify2.VerifyForm,
	                            { className: 'table js-add-api-form', ref: 'updateForm', formData: formData },
	                            this.moduleGroup(apiOptions.group, formData.group, formData.groupName),
	                            this.moduleRoom(apiOptions.rooms, formData.contactRoom),
	                            this.moduleApiName(formData.name),
	                            this.moduleApiUrl(formData.api),
	                            this.moduleMethod(apiOptions.method, formData.method),
	                            this.moduleDatatype(apiOptions.dataType, formData.dataType),
	                            this.moduleApiData(formData.data),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'button-wrapper' },
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'gray-btn', onClick: this.handleCancel },
	                                    _react2.default.createElement(
	                                        'a',
	                                        null,
	                                        '取消'
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'blue-btn', onClick: this.handleSubmit },
	                                    _react2.default.createElement(
	                                        'a',
	                                        null,
	                                        '保存'
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    _react2.default.createElement('div', { className: 'add-preview js-add-preview' })
	                )
	            )
	        );
	    };

	    /**
	     * 分组模块
	     */


	    ApiDataView.prototype.moduleGroup = function moduleGroup(options, selected, value) {
	        var type = this.props.location.query.type;

	        if (this.state.isCreate || !type || type == 'group') {
	            return _react2.default.createElement(
	                'div',
	                { className: 'module-form-row fn-clear' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'form-label' },
	                    '分组名称'
	                ),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'select',
	                    name: 'group',
	                    extraClass: 'small-item',
	                    placeholder: '通信类型',
	                    options: options,
	                    value: selected,
	                    ref: 'group'
	                }),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'text',
	                    name: 'groupName',
	                    extraClass: 'big-item',
	                    placeholder: '分组名称',
	                    value: value,
	                    term: ':notNull',
	                    ref: 'groupName'
	                })
	            );
	        } else {
	            return null;
	        }
	    };

	    /**
	     * 应用项目模块
	     */


	    ApiDataView.prototype.moduleRoom = function moduleRoom(options, value) {
	        var type = this.props.location.query.type;

	        if (this.state.isCreate || !type || type == 'room') {
	            return _react2.default.createElement(
	                'div',
	                { className: 'module-form-row fn-clear' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'form-label' },
	                    '应用项目'
	                ),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'checkbox',
	                    name: 'contactRoom',
	                    options: options,
	                    value: value,
	                    term: ':notNull',
	                    ref: 'contactRoom'
	                })
	            );
	        } else {
	            return null;
	        }
	    };

	    /**
	     * 接口名称模块
	     */


	    ApiDataView.prototype.moduleApiName = function moduleApiName(value) {
	        var type = this.props.location.query.type;

	        if (this.state.isCreate || !type || type == 'name') {
	            return _react2.default.createElement(
	                'div',
	                { className: 'module-form-row fn-clear' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'form-label' },
	                    '接口名称'
	                ),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'text',
	                    name: 'name',
	                    placeholder: '接口名称',
	                    value: value,
	                    term: ':notNull',
	                    ref: 'name'
	                })
	            );
	        } else {
	            return null;
	        }
	    };

	    /**
	     * 接口地址模块
	     */


	    ApiDataView.prototype.moduleApiUrl = function moduleApiUrl(value) {
	        var type = this.props.location.query.type;

	        if (this.state.isCreate || !type || type == 'api') {
	            return _react2.default.createElement(
	                'div',
	                { className: 'module-form-row fn-clear' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'form-label' },
	                    '接口地址'
	                ),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'text',
	                    name: 'api',
	                    placeholder: '接口地址',
	                    value: value,
	                    term: ':notNull',
	                    ref: 'api'
	                })
	            );
	        } else {
	            return null;
	        }
	    };

	    /**
	     * 通信类型模块
	     */


	    ApiDataView.prototype.moduleMethod = function moduleMethod(options, value) {
	        var type = this.props.location.query.type;

	        if (this.state.isCreate || !type) {
	            return _react2.default.createElement(
	                'div',
	                { className: 'module-form-row fn-clear' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'form-label' },
	                    '通信类型'
	                ),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'select',
	                    name: 'method',
	                    placeholder: '通信类型',
	                    options: options,
	                    value: value,
	                    term: ':notNull',
	                    ref: 'method'
	                })
	            );
	        } else {
	            return null;
	        }
	    };

	    /**
	     * 数据类型模块
	     */


	    ApiDataView.prototype.moduleDatatype = function moduleDatatype(options, value) {
	        var type = this.props.location.query.type;

	        if (this.state.isCreate || !type) {
	            return _react2.default.createElement(
	                'div',
	                { className: 'module-form-row fn-clear' },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'form-label' },
	                    '数据类型'
	                ),
	                _react2.default.createElement(_verify.VerifyInput, {
	                    type: 'select',
	                    name: 'dataType',
	                    placeholder: '通信类型',
	                    options: options,
	                    value: value,
	                    term: ':notNull',
	                    ref: 'dataType'
	                })
	            );
	        } else {
	            return null;
	        }
	    };

	    /**
	     * 数据模块
	     */


	    ApiDataView.prototype.moduleApiData = function moduleApiData(value) {

	        if (!this.state.isCreate) {
	            return null;
	        }

	        return _react2.default.createElement(
	            'div',
	            { className: 'module-form-row textarea-item fn-clear' },
	            _react2.default.createElement(
	                'label',
	                { className: 'form-label' },
	                '新建数据'
	            ),
	            _react2.default.createElement(_verify.VerifyInput, {
	                type: 'textarea',
	                name: 'data',
	                placeholder: '接口数据',
	                value: value,
	                term: ':notNull/json',
	                ref: 'data'
	            })
	        );
	    };

	    /**
	     * 取消新建 / 修改
	     */


	    ApiDataView.prototype.handleCancel = function handleCancel() {
	        if (this.state.isCreate) {
	            _reactRouter.hashHistory.goBack();
	        } else {
	            _reactRouter.hashHistory.push('/api/detail/' + this.props.params.id);
	        }
	    };

	    /**
	     * 新建/保存一个数据
	     */


	    ApiDataView.prototype.handleSubmit = function handleSubmit(event) {
	        var verData = this.refs.updateForm.matchAll();
	        var apiData = this.props.apiData;

	        var type = this.props.location.query.type;

	        if (!verData || verData.group == 0 && verData.groupName == '') {
	            return;
	        }

	        var postData = {
	            group: verData.group,
	            groupName: verData.groupName,
	            room: [],
	            name: verData.name,
	            api: verData.api,
	            dataType: verData.dataType,
	            method: verData.method,
	            apiData: verData.data
	        };

	        Store.isObject(verData.contactRoom) && $.each(verData.contactRoom, function (key, checked) {
	            !!checked && postData.room.push(key);
	        });

	        if (postData.room.length) {
	            postData.room = postData.room.join(',');
	        }
	        // 未选择项目
	        else {
	                return;
	            }

	        if (postData.group != 0) {
	            delete postData.groupName;
	        }

	        console.log(postData);

	        if (this.state.isCreate) {
	            _api2.ApiService.createApi(postData).then(function (result) {
	                _reactRouter.hashHistory.push('/api/detail/' + result.GUID);
	            });
	        } else {
	            postData.GUID = apiData.GUID;

	            switch (type) {
	                case 'api':
	                    console.log('do client update api url');

	                    _api2.ApiService.updateApiUrl(postData).then(function (result) {
	                        console.log('finish client update api url');
	                        _reactRouter.hashHistory.push('/api/detail/' + postData.GUID);
	                    });
	                    break;
	                case 'group':
	                    console.log('do client update api group');

	                    _api2.ApiService.updateApiGroup(postData).then(function (result) {
	                        console.log('finish client update api group');
	                        _reactRouter.hashHistory.push('/api/detail/' + postData.GUID);
	                    });
	                    break;
	                default:

	                // ApiService.saveApi(postData).then(
	                //     result => {
	                //         console.log('finish client save api');
	                //     }
	                // );
	            }
	        }
	    };

	    ApiDataView.prototype.componentWillMount = function componentWillMount() {
	        this.props.roomActions.fetchRoomList();
	        this.props.apiActions.fetchApiGroup();
	        this.props.params.id && this.props.apiActions.fetchApiData(this.props.params.id);
	    };

	    ApiDataView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	    ApiDataView.prototype.componentDidMount = function componentDidMount() {};

	    return ApiDataView;
	}(_react.Component);

	;

	function mapStateToProps(state, props) {
	    var apiData = state.apiData;
	    var apiGroup = state.apiGroup;
	    var roomList = state.roomList;


	    return {
	        apiData: apiData,
	        apiGroup: apiGroup,
	        roomList: roomList
	    };
	}

	/**
	 * merge action medth
	 */
	function mapDispatchToProps(dispatch) {
	    return {
	        apiActions: (0, _redux.bindActionCreators)(apiAction, dispatch),
	        roomActions: (0, _redux.bindActionCreators)(roomAction, dispatch)
	    };
	}

	ApiDataView.propTypes = {
	    apiData: _react.PropTypes.object.isRequired
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ApiDataView);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	* @fileOverview room.list.view.js 接口列表
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-07-14
	* @update：2016-07-14
	*/
	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _redux = __webpack_require__(183);

	var _reactRedux = __webpack_require__(271);

	var _roomService = __webpack_require__(283);

	var _room = __webpack_require__(282);

	var roomAction = _interopRequireWildcard(_room);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function loadData(props) {
	    props.actions.fetchRoomList();
	}

	/**
	 * @author 徐晨
	 * @name HomeView
	 * @class 公共头部
	 * @constructor
	 */

	var RoomListView = function (_Component) {
	    _inherits(RoomListView, _Component);

	    function RoomListView() {
	        _classCallCheck(this, RoomListView);

	        var _this = _possibleConstructorReturn(this, _Component.call(this));

	        _this.handleOpenOperation = _this.handleOpenOperation.bind(_this);
	        _this.handleStartRoom = _this.handleStartRoom.bind(_this);
	        return _this;
	    }

	    RoomListView.prototype.render = function render() {
	        var _this2 = this;

	        var roomList = this.props.roomList;


	        return _react2.default.createElement(
	            'div',
	            { className: 'page-room-list js-page-room-list', ref: 'roomList' },
	            _react2.default.createElement(
	                'ul',
	                { className: 'room-list js-room-list' },
	                roomList.map(function (room) {
	                    return _this2.viewRoom(room);
	                }),
	                this.viewAddRoom()
	            )
	        );
	    };

	    /**
	     * room template view
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @param  {JSON}   room   room data
	     */


	    RoomListView.prototype.viewRoom = function viewRoom(room) {
	        var roomClassName = 'room-name js-room-name' + (room.isRun ? ' running' : '');

	        var apiLink = '#/api/list/' + room.name;
	        return _react2.default.createElement(
	            'li',
	            { className: 'js-room', key: room.GUID, 'data-name': room.name, ref: 'room', onClick: this.handleOpenOperation },
	            _react2.default.createElement(
	                'div',
	                { className: 'operation' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'operation-case js-room-switch', 'data-status': room.isRun ? 1 : 0, onClick: this.handleStartRoom },
	                    _react2.default.createElement(
	                        'a',
	                        null,
	                        room.isRun ? "关" : "启"
	                    )
	                ),
	                this.viewRoomGo(room.isRun),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'operation-case js-room-update' },
	                    _react2.default.createElement(
	                        'a',
	                        null,
	                        '改'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'operation-case' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '#/api/list/?room=' + room.GUID, target: '_blank' },
	                        'API'
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: roomClassName },
	                room.name
	            )
	        );
	    };

	    /**
	     * add room template view
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @param  {JSON}   room   room data
	     */


	    RoomListView.prototype.viewAddRoom = function viewAddRoom() {
	        return _react2.default.createElement(
	            'li',
	            { className: 'js-add-room' },
	            _react2.default.createElement(
	                'div',
	                { className: 'update-panel js-update-panel' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'update-case' },
	                    _react2.default.createElement('input', { type: 'text', name: 'name', placeholder: '名称' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'update-case' },
	                    _react2.default.createElement('input', { type: 'text', name: 'port', placeholder: '端口' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'update-case' },
	                    _react2.default.createElement('input', { type: 'text', name: 'path', placeholder: '静态目录' })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'room-name' },
	                '添加项目'
	            )
	        );
	    };

	    /**
	     * room 启动后的跳转按钮 view
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @param  {Boolean}   isRun   room is run
	     */


	    RoomListView.prototype.viewRoomGo = function viewRoomGo(isRun) {
	        if (isRun) {
	            return _react2.default.createElement(
	                'div',
	                { className: 'operation-case js-room-go', 'data-port': '{room.port}' },
	                _react2.default.createElement(
	                    'a',
	                    null,
	                    'GO'
	                )
	            );
	        }
	    };

	    /**
	     * 开启一个项目的服务
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    RoomListView.prototype.handleStartRoom = function handleStartRoom(event) {
	        var self = this,
	            $button = $(event.currentTarget),
	            $room = $button.closest('.js-room'),
	            $label = $button.find('a'),
	            $show = $room.find('.js-room-name'),
	            id = $room.data('name'),
	            flag = $button.data('status') | 0;

	        if (!!flag) {
	            _roomService.RoomService.endRoom(id).done(function (res) {
	                $button.next().remove();
	                $label.text('启');
	                $button.data('status', 0);
	                $show.toggleClass('running', false);
	            });
	        } else {
	            _roomService.RoomService.startRoom(id).done(function (res) {

	                // var tpl = ct.get('tempOperationGo', true);

	                // $button.after(
	                //     ct.compile(tpl, {room : res})
	                // );

	                $label.text('关');
	                $button.data('status', 1);
	                $show.toggleClass('running', true);
	            });
	        }
	    };

	    RoomListView.prototype.componentWillMount = function componentWillMount() {
	        loadData(this.props);
	        // RoomService.getList().done(function (result) {
	        //     this.setState({roomList: result.list});
	        // }.bind(this));
	    };

	    RoomListView.prototype.componentDidMount = function componentDidMount() {};

	    /**
	     * 开启操作面板
	     * @author 徐晨 ( xuchen@smartisan.com )
	     */


	    RoomListView.prototype.handleOpenOperation = function handleOpenOperation(event) {
	        var $room = $(event.currentTarget);

	        if ($room.hasClass('on')) {
	            return;
	        }

	        $room.siblings().toggleClass('disabled-room', true);
	        $room.toggleClass('on', true);

	        setTimeout(function () {
	            $(document).on('click.operation', function (ev) {
	                var $btn = $(ev.target);

	                if ($btn.closest('.js-room-switch').length && $btn.closest('.js-room-switch').data('status') == 0
	                // || self.keepOpen && $btn.closest('.js-room').is($room)
	                ) {
	                        return;
	                    }

	                // !!self.keepOpen && self.closeUpdatePanel($room);

	                // 如果是修改内容，不取消其他 room 的 disabled 样式
	                !$btn.closest('.js-room-update').length && $room.siblings().toggleClass('disabled-room', false);

	                $room.toggleClass('on', false);
	                $(document).off('click.operation');
	            });
	        }, 0);
	    };

	    return RoomListView;
	}(_react.Component);

	;

	function mapStateToProps(state, props) {
	    var roomList = state.roomList;


	    return {
	        roomList: roomList
	    };
	}

	/**
	 * merge action medth
	 */
	function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(roomAction, dispatch)
	    };
	}

	RoomListView.propTypes = {
	    roomList: _react.PropTypes.array.isRequired
	};

	// export { RoomListView };
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoomListView);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = configureStore;

	var _redux = __webpack_require__(183);

	var _combine = __webpack_require__(182);

	var _reduxThunk = __webpack_require__(278);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(288);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//middleware
	function configureStore(preloadedState) {
	    var middleware = [_reduxThunk2.default, (0, _reduxLogger2.default)()];

	    var store = (0, _redux.createStore)(_combine.rootReducer, preloadedState, _redux.applyMiddleware.apply(undefined, middleware));

	    return store;
	}

/***/ },

/***/ 288:
/***/ function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */

	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;

	  // exit if console undefined

	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }

	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }

	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;

	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;

	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");

	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }

	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");

	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }

	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }

	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }

	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }

	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var logEntry = {};
	        logBuffer.push(logEntry);

	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;

	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());

	        printBuffer();

	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}

	module.exports = createLogger;

/***/ }

});