/** 
* @fileOverview config.js 系统配置
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-05-19
* @update：2016-05-19
*/ 

const _config = {
    /**
     * 浏览器判断
     * @type Boolean
     */
    isMobileTerminal : /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()),
    isMobile : /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()) && !/ipad/i.test(navigator.userAgent.toLowerCase()) ,
    isUC : /ucweb|ucbrowser/i.test(navigator.userAgent.toLowerCase()),

    /**
     * retina 适配判断
     * @type Boolean
     */
    isRetina : (window.devicePixelRatio && window.devicePixelRatio > 1.2),

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
    defaultAvatar : CDN_HOST + 'img/default-user-avatar.png',

    /**
     * 付款 url
     * @type String
     */
    paymentUrl : '/index.php?r=',

    /**
     * 付款 code
     * @type String
     */
    paymentCode : {
        weixin : '/index.php?r=Pay/CreateQRCode'
    },

    /**
     * 包邮的条件：满 xx 包邮
     * @type Number
     */
    postageTerm : 150
};

class Config {
    /**
     * @author 徐晨 
     * @name Config
     * @class 商城系统的配置
     * @constructor
     */
    constructor () {

        // init config
        $.each(_config, (key, value) => this.setParam(key, value));

        return this;
    };

    // 浏览器判断
    get isMobileTerminal () {
        return _config.isMobileTerminal;
    }
    
    set isMobileTerminal (value) {
        _config.isMobileTerminal = value;
    }

    get isMobile () {
        return _config.isMobile;
    }
    
    set isMobile (value) {
        _config.isMobile = value;
    }

    get isUC () {
        return _config.isUC;
    }
    
    set isUC (value) {
        _config.isUC = value;
    }

    // retina 适配判断
    get isRetina () {
        return _config.isRetina;
    }
    
    set isRetina (value) {
        _config.isRetina = value;
    }

    // 主内容区
    get layoutContainer () {
        return _config.layoutContainer;
    }

    set layoutContainer (value) {
        _config.layoutContainer = value;
    }

    // page loading jQuery dom
    get pageLoading () {
        return _config.pageLoading;
    }

    set pageLoading (value) {
        _config.pageLoading = value;
    }

    // 后台接口地址
    get baseUrl () {
        return _config.baseUrl;
    }

    set baseUrl (value) {
        _config.baseUrl = value;
    }

    get nodeUrl () {
        return _config.nodeUrl;
    }

    set nodeUrl (value) {
        _config.nodeUrl = value;
    }

    // store url
    get storeUrl () {
        return _config.storeUrl;
    }

    set storeUrl (value) {
        _config.storeUrl = value;
    }

    // www url
    get webUrl () {
        return _config.webUrl;
    }

    set webUrl (value) {
        _config.webUrl = value;
    }

    // 默认头像地址
    get defaultAvatar () {
        return _config.defaultAvatar;
    }
    
    set defaultAvatar (value) {
        _config.defaultAvatar = value;
    }

    // 付款 url
    get paymentUrl () {
        return _config.paymentUrl;
    }

    set paymentUrl (value) {
        _config.paymentUrl = value;
    }

    get paymentCode () {
        return _config.paymentCode;
    }

    set paymentCode (value) {
        _config.paymentCode = value;
    }

    // 包邮的条件：满 xx 包邮
    get postageTerm () {
        return _config.postageTerm;
    }

    set postageTerm (value) {
        _config.postageTerm = value;
    }

    /**
     * @name Config#setParam
     * @description 设置 配置
     * @event
     */
    setParam (key, value) {
        this[key] = value;
    }
}

let mainConfig = new Config();

export { mainConfig };
