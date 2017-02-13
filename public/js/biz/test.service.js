/** 
* @fileOverview test.service.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/ 
window.Store.addService('Test', (function( $, Store ){
    /**
     * @author XuChen 
     * @name Test
     * @class 测试页面
     */
    function Test() {};
    
    Test.prototype.init = function() {};

    /**
     * readFile
     * @type Function
     */
    Test.prototype.readFile = function(src) {
        var self = this;

        return mainService.ajax({
            url : 'test/readFile',
            data : {
                src : src
            }
        });
    };

    /**
     * writeFile
     * @type Function
     */
    Test.prototype.writeFile = function(src, data) {
        var self = this;

        return mainService.ajax({
            url : 'test/writeFile',
            data : {
                src : src,
                detail : data
            }
        });
    };

    /**
     * unzipFile
     * @type Function
     */
    Test.prototype.unzipFile = function(src, output) {
        var self = this;

        return mainService.ajax({
            url : 'test/unZip',
            data : {
                src : src,
                output : output
            }
        });
    };

    /**
     * roomStart
     * @type Function
     */
    Test.prototype.roomStart = function(src, output) {
        var self = this;

        return mainService.ajax({
            url : 'test/start'
        });
    };

    /**
     * roomEnd
     * @type Function
     */
    Test.prototype.roomEnd = function(src, output) {
        var self = this;

        return mainService.ajax({
            url : 'test/end'
        });
    };
    
    return( new Test() );
    
})( jQuery, window.Store ));
