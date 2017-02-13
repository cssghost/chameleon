webpackJsonp([6,7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(175);
	__webpack_require__(177);
	__webpack_require__(174);
	module.exports = __webpack_require__(176);


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

/***/ }

});