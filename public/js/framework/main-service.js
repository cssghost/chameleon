/**
 * @main-service.js 基础服务 Ajax 配置
 * @author wanghuijun(wanghuijun@smartisan.cn)
 * @update xuchen(xuchen@smartisan.com)
 */


class MainService {
    /**
     * @author 徐晨 
     * @name MainService
     * @class ajax
     * @constructor
     */
    constructor() {}

    ajax (options) {
        // Get the full range of settings.
        var ajaxOptions = $.extend(
            {
                type: 'post',
                dataType: 'json',
                cache: false,
                timeout: (10 * 1000),
                complete: function( request, statusText ){}
            },
            options
        );

        // If the data type is JSON init common fn
        if ( ajaxOptions.dataType == 'json' ) {
            // init base init
            if ( !ajaxOptions.isStyle ) {
                ajaxOptions.url = ajaxOptions.isNode
                                ? Store.config.nodeUrl + ajaxOptions.url
                                : Store.config.baseUrl + ajaxOptions.url;
            }

            delete ajaxOptions.isStyle;
            delete ajaxOptions.isNode;
                            
            // Proxy the success callback
            var targetSuccess = options.success;

            // Proxy the error callback
            var targetError = options.error;

            // clear custom fn
            delete ajaxOptions.success;
            delete ajaxOptions.error;
            delete ajaxOptions.preorder;

            return $.ajax( ajaxOptions )
                .then(
                    function (response, statusText, defer) {

                        // return success fn
                        if ( response.code == 0 ) {
                            var successResult = typeof targetSuccess == 'function'
                                            ? targetSuccess(response.data) : undefined;
                            successResult = successResult === undefined ? response.data : successResult;
                            return $.Deferred().resolve(successResult, response, defer).promise();
                        }
                        // return error fn
                        else {

                            var msg = '未知错误',
                                errorKey = '';


                            if ( typeof response =='object' && response.errInfo ) {
                                $.each(response.errInfo, function(key, value) {
                                    errorKey = key | 0;
                                    msg = value;
                                });
                            }

                            var errorResult = typeof targetError == 'function'
                                            ? targetError(errorKey, msg, response) : undefined;

                            // 需要自定义fail时在error函数中返回false,然后再fail函数中添加事件
                            if ( errorResult !== false ) {
                                errorResult = errorResult === undefined ? response.errInfo : errorResult;

                                errorResult = !!errorResult ? errorResult : {};

                                var DialogPlugin = Store.getPlugin('Dialog');

                                // 公共错误处理方法
                                if ( DialogPlugin ) {
                                    DialogPlugin.message({
                                        message : msg
                                    });
                                } else {
                                     // alert(msg);
                                }


                            }
                            return $.Deferred().reject(errorKey, msg, response, defer).promise();
                        }
                    },
                    function ( defer, status, statusText ) {
                        var serviceErrorStatus = defer.status | 0;

                        // switch(serviceErrorStatus){
                        //     case 404:
                        //         window.location.href = '#/error/404';
                        //     break;
                        //     case 503:
                        //         if ( window.location.hostname == 'buy.smartisan.com' || !!Store.Router.routes.buzy ) {
                        //             window.location.href = '/#/buzy';
                        //         } else {
                        //             window.location.href = 'http://www.smartisan.com/#/error/503';
                        //         }
                        //     break;
                        //     case 603:
                        //         try {
                        //             var dialogBuzy = new ( Store.getView('BuzyDialog') )();
                        //             dialogBuzy.render();
                        //         }
                        //         catch (e) {
                        //             window.location.href = 'http://www.smartisan.com/#/error/500';
                        //         }
                        //     break;
                        //     default:
                        //         window.location.href = 'http://www.smartisan.com/#/error/500';
                        //     break;
                        // }
                    }
                );
        }

        // If the data type is JSONP init common fn
        if ( ajaxOptions.dataType == 'jsonp' ) {
            // document.domain = 'smartisan.com';
            // $.support.cors = true;
            var _arrData = [];

            ajaxOptions.type = 'get';

            // for ( var k in ajaxOptions.data ) {
            //     _arrData.push('&data' + k + '=' + ajaxOptions.data[k] );
            // }

            // init base url and format data to url
            // ajaxOptions.url = Store.config.secureUrl + ajaxOptions.url + _arrData.join('');

            // Proxy the success callback
            var targetSuccess = options.success;

            // Proxy the error callback
            var targetError = options.error;

            // clear custom fn and data
            delete ajaxOptions.data;
            delete ajaxOptions.success;
            delete ajaxOptions.error;

            return $.ajax( ajaxOptions )
                .then(
                    function (response, statusText, defer) {

                        // return success fn
                        if ( response.code == 0 ) {
                            var successResult = typeof targetSuccess == 'function'
                                            ? targetSuccess(response.data) : undefined;
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
                    },
                    function ( defer, status, statusText ) {
                        // if ( defer.status && (defer.status + '').match(/^4|5/) ) {
                        //     window.location.href = 'http://www.smartisan.com/#/error/' + defer.status;
                        // } else {
                        //     window.location.href = 'http://www.smartisan.com/#/error/' + 404;
                        // }
                    }
                ); 
        }

        // Make the AJAX call not dataType is json.
        return $.ajax( ajaxOptions );
    }
}

let mainService = new MainService();

export { mainService };
