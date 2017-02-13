/**
 * @iframe-dialog.js iframe 对话框
 * @author wanghuijun(wanghuijun@smartisan.cn)
 */
'use strict';

(function(exports, $) {
    // 保存 DOM 对应的 jQuery 对象
    var dom = {
        wrapper: $('#iframe-dialog'),
        mask: $('#iframe-dialog .mask'),
        iframe: $('#iframe-dialog iframe')
    };

    var config = {
        origin: 'https://account.smartisan.com',
        loginUrl: 'https://account.smartisan.com/#/login/embed?origin=http://' + window.location.hostname,
        registerUrl: 'https://account.smartisan.com/#/register/embed?origin=http://' + window.location.hostname,
        logoutUrl: 'https://account.smartisan.com/#/logout/embed?origin=http://' + window.location.hostname,
        modifyAvatarUrl: 'https://account.smartisan.com/#/modifyAvatar/embed?origin=http://' + window.location.hostname
    };

    // 获取相关 DOM 节点
    function init() {
        // 对话框打开时，首先在 body 添加相应节点
        if (!dom.wrapper.length) {
            var html = [];

            html.push('<div class="iframe-dialog" id="iframe-dialog">')
            html.push('<div class="mask"></div>');
            html.push('<iframe allowtransparency="true" src="" frameborder="0"></iframe>')
            html.push('</div>');

            $('body').append(html.join(''));
        }

        dom.wrapper = $('#iframe-dialog');
        dom.mask = $('#iframe-dialog .mask');
        dom.iframe = $('#iframe-dialog iframe');
    }

    // @param String url
    // iframe 内嵌的 URL
    // @param Boolean isSilent
    // isSilent true 表示隐藏 iframe
    function open(url, isSilent) {
        // 打开对话框时必须传入 URL
        if (typeof url === 'undefined') {
            return;
        }

        init();

        dom.iframe.attr('src', url);

        if (!isSilent) {
            // 现显示遮罩层，dialog 淡入，这样会比较平滑
            dom.mask.show();
            dom.iframe.fadeIn(200);
        }
    }

    function close() {
        // 遮罩和 dialog 同步淡出
        dom.mask.fadeOut(200);
        dom.iframe.fadeOut(200);
        // 结束后清空 src
        setTimeout(function() {
            dom.iframe.attr('src', '');
        }, 200);
    }

    exports.IframeDialog = {
        config: config,
        open: open,
        close: close
    };

})(window, jQuery);
