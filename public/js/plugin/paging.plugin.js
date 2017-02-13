/*
 *@description Paging
 *@author：xu chen 
 *@date：2014-7-28
 *@update：2014-7-28
*/
'use strict';

window.Store.addPlugin('Paging', (function( $, Store ){

    function Paging() {
        var self = this;

        self.options = {};
        self.tpl = null;
        self.pageCount = 0;
        self.page = 0;
    }

    Paging.prototype.init = function(){
        var self = this;

        self.tpl = ct.get('tempPaging', true);
    };

    /**
     * 渲染分页模块
     * @type Function
     * @description 执行渲染
     * @param {object} options                  配置参数
     * @param {jquery dom} options.$wrapper     要加载分页的包裹，包裹会执行append方法
     * @param {bool} options.isCenter           是否自适应居中显示
     * @param {bool} options.useLink            是否使用href链接
     * @param {string} options.href             href链接的基本字符串（比如 #/page/1, href 就是 #/page/）
     * @param {json} options.data               分页的数据
     * @param {json} options.data.count         总条数
     * @param {json} options.data.page_count    总分页数
     * @param {json} options.data.page          当前页码
     * @param {function} options.callback       不是用href链接，使用回调函数,
     *                                          放出的参数为(page: 选中的页码, options: 当前分页模块的配置参数)
     */
    Paging.prototype.render = function(options){
        var self = this;

        var options = self.options = $.extend({
            $wrapper : $('.wrapper'),
            isCenter : false,
            useLink : false,
            href : '#/',
            data : {
                count : 200,
                page_count : 15,
                page : 8
            },
            callback : null
        }, options);

        var config = Store.config.paging;

        var $wrapper = options.$wrapper;

        self.pageCount = options.data.page_count;
        self.page = options.data.page | 0;

        self.reset();

        if ( !$wrapper.data('init') ) {
            $wrapper.on('click', '.' + config.pageViewClass + ' a', function () {

                if ( $(this).parent('li').hasClass(config.selectClass) ) {
                    return false;
                }
                self.page = $(this).data('page');
                self.reset();

                // 如果使用链接跳转
                if ( options.useLink ) {
                    return;
                }
                // 如果执行回调函数
                else {
                    typeof options.callback == 'function' && options.callback(self.page, options);
                }
                return false;
            });

            $wrapper.resize(function () {
                self.reset();
            });
        }

        $wrapper.data('init', true);

        return self;
    };

    Paging.prototype.reset = function(page){
        var self = this,
            pageCount = self.pageCount,
            page = page || self.page,
            opt = self.options,
            $wrapper = opt.$wrapper,
            tempData = {
                useLink : opt.useLink,
                href : opt.href,
                hasFirst : true,
                hasEnd : true,
                prevPage : 1,
                nextPage : pageCount,
                pageCount : pageCount,
                pages : []
            },
            wrapperWidth = $wrapper.width(),
            pageWidth = 0,
            listWidth = wrapperWidth,
            config = Store.config.paging;

        page = page | 0;

        // 重置当前页面，在回调时有用
        self.page = page;

        // 如果为第一页，去除上一页和第一页的按钮
        // 反之，计算数字列表的最大长度
        if ( page == 1 ) {
            tempData.hasFirst = false;
        } else {
            tempData.prevPage = page - 1;
            listWidth -= config.prevWidth;
            listWidth -= config.firstWidth;
            pageWidth = pageWidth + config.prevWidth + config.firstWidth;
        }

        // 如果为最后页，去除下一页和最后一页的按钮
        // 反之，计算数字列表的最大长度
        if ( page == pageCount ) {
            tempData.hasEnd = false;
        } else {
            tempData.nextPage = page + 1;
            listWidth -= config.nextWidth;
            listWidth -= config.lastWidth;
            pageWidth = pageWidth + config.nextWidth + config.lastWidth;
        }

        var maxLength = Math.floor( listWidth / config.itemWidth ),
            minPage = 1,
            maxPage = pageCount;

        // 需要显示的页码数大于可显示页码数
        if ( maxPage > maxLength ) {
            var halfLength = Math.floor( maxLength / 2 );

            // 显示前区，从页码 1 开始
            if ( page <= halfLength ) {
                minPage = 1;
                maxPage = maxLength;
            }
            // 显示后区，以最大页码结束
            else if ( page >= maxPage - halfLength ) {
                minPage = pageCount - maxLength + 1;
                maxPage = pageCount;
            }
            // 显示中区，从中间开始 
            else {
                minPage = page - halfLength + ( maxLength % 2 == 0 ? 1 : 0 );
                maxPage = page + halfLength;
            }
        } else {
            maxLength = maxPage;
        }

        // 渲染分页

        for ( var i = minPage, l = maxPage; i <= l; i++ ) {
            tempData.pages.push(i);
        }

        var $page = ct.compile( ct.get('tempPaging', true), tempData, true );

        $page.toggleClass('fn-hide', pageCount == 1);

        $wrapper.find('.' + config.pageViewClass).remove().end().append( $page );

        $page.find('a[data-page=' + page + ']').parent('li').addClass(config.selectClass);

        // 计算分页包裹的宽度，如果需要居中显示
        if ( opt.isCenter ) {
            $page.width( pageWidth + maxLength * config.itemWidth );
        }

    };

    /**
     * 设置分页页码的链接地址
     * @type Function
     * @description 动态更新 href
     * @param {string} href         href链接的基本字符串（比如 #/page/1, href 就是 #/page/）
     */
    Paging.prototype.setHref = function(href){
        var self = this;

        href && (self.options.href = href);
    };

    return( new Paging() );
    
})( jQuery, window.Store ));