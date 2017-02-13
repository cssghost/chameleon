/*
 *@description localStorage
 *@author：xu chen 
 *@date：2015-04-20
*/
window.Store.addService('LocalStorage', (function($, Store) {

    function LocalStorage() {
        var self = this;

        self.canUsed = !!window.localStorage
                        && typeof JSON === 'object'
                        && JSON !== null
                        && typeof JSON.parse === 'function'
                        && typeof JSON.stringify === 'function';
    };

    LocalStorage.prototype.init = function() {};

    /**
     * 获取本地储存
     * @description 如果内容存在 cookie 且可以使用 localStorage
     *              则删除 cookie 中的存储，转为 localStorange
     *              如果 localStorange 和 cookie 都存在，取前者
     * @type Function
     * @param {String} key
     * @param {String} options 
     */
    LocalStorage.prototype.get = function(key, options) {
        var self = this,
            options = options || {};

        var cookieCache = $.cookies.get(key, options);

        if ( self.canUsed && !options.useCookie ) {
            var localCache = decodeURIComponent( localStorage.getItem( key ) ),
                response = localCache !== 'null'
                         ? JSON.parse(localCache)
                         : cookieCache;

            if ( cookieCache ) {
                self.remove(key, options);
                self.set(key, response);
            }

            return response;
        } else {
            cookieCache;
        }
    };

    /**
     * 设置本地储存
     * @type Function
     * @param {String} key
     * @param {String} options 
     */
    LocalStorage.prototype.set = function(key, value, options) {
        var self = this,
            options = options || {};

        if ( self.canUsed && !options.useCookie ) {
            self.remove(key);

            if( typeof value !== 'string' ) {
                value = JSON.stringify( value );
            }

            localStorage.setItem(key, encodeURIComponent(value) );
        } else {
            $.cookies.set(key, value, options);
        }
    };

    /**
     * 筛选本地储存
     * @type Function
     * @param {String} key
     * @param {String} options 
     */
    LocalStorage.prototype.filter = function(key, options) {
        var self = this,
            options = options || {},
            response = $.cookies.filter(key, options);

        if ( self.canUsed && !options.useCookie ) {

            if( typeof key === 'string' ) {
                key = new RegExp( key );
            }

            for( var name in localStorage ) {
                if ( name.match( key ) ) {
                    response[name] = self.get(name, options);
                }
            }

            return response;
        } else {
            return response;
        }
    };

    /**
     * 移除本地储存
     * @type Function
     * @param {String} key
     * @param {String} options 
     */
    LocalStorage.prototype.remove = function(key, options) {
        var self = this,
            options = options || {};

        if ( self.canUsed) {
            localStorage.removeItem( key );
        }
     
        $.cookies.del(key, options);
    };

    return (new LocalStorage());

})(jQuery, window.Store));
