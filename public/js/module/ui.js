/*
 *@description UI
 *@author：xu chen 
 *@date：2014-8-14
 *@update：2014-8-14
*/
'use strict';
window.Store.addUI( (function( $, Store ){
    /**
     * @author XuChen 
     * @name UI
     * @class 筛选器方法
     */
    function UI() {
        var self = this;

        self.OrderProcessService = null;
    };

    UI.prototype.init = function () {
        var self = this;
    }

    /**
     * ui images src
     * @type Function
     */
    // UI.prototype.imagePath = function (model, path, medth, param) {
    //     var self = this,
    //         filterMedth, size;

    //     filterMedth = medth ? ( ' | ' + medth ) : '';
    //     size = param ? ( ':' + param ) : '';

    //     filterMedth && ( path = path + filterMedth + size );

    //     return templateManager.compile(
    //         'src="{{' + path + '}}"',
    //         model,
    //         false,
    //         true
    //     );
            
    // }

    /**
     * ui shopping service
     * @type Function
     */
    UI.prototype.shoppingService = function (model) {
        var self = this,
            tpl = ct.get('uiShoppingService', true);

        return ct.compile(
            tpl,
            {
                postageTerm : Store.config.postageTerm
            }
        );

    }

    /**
     * ui category nav
     * @description 如果 type 为 false 则没有默认的选中项
     * @type Function
     */
    UI.prototype.categoryNav = function (list, type) {
        var self = this,
            tpl = ct.get('cmCategoryNav', true),
            type = type | 0;

        return ct.compile(
            tpl,
            {
                categoryList : list,
                curCategory : type
            }
        );
    }

    /**
     * ui choose invoice
     * @type Function
     */
    UI.prototype.chooseInvoice = function (useDeliveryLabel, isCheckout) {
        var self = this,
            tpl = ct.get('cmChooseInvoice', true);
            
        return ct.compile(
            tpl,
            {
                isCheckout : isCheckout,
                useWebInvoice : Store.config.useWebInvoice,
                deliveryLabel : useDeliveryLabel
            },
            false,
            true
        );
    }

    /**
     * ui captcha
     * @type Function
     * @param {text} ui template
     */
    UI.prototype.captcha = function (type) {
        var self = this,
            tpl = ct.get('uiCaptcha', true),
            time = +(new Date());
            
        return ct.compile(
            tpl,
            {
                captchaSrc : Store.config.captcha[type] + '&' + time,
                type : type
            },
            false
        );
    }

    /**
     * ui checkbox
     * @type Function
     * @param {text} ui template
     */
    UI.prototype.checkbox = function (name, value, className) {
        var self = this,
            className = className || 'blue-checkbox',
            tpl = ct.get('uiCheckbox', true);
            
        return ct.compile(
            tpl,
            {
                name : name,
                value : value,
                className : className
            },
            false,
            true
        );
    }

    /**
     * ui radio
     * @type Function
     * @param {text} ui template
     */
    UI.prototype.radio = function (name, value, className) {
        var self = this,
            className = className || 'blue-radio',
            tpl = ct.get('uiRadio', true);
            
        return ct.compile(
            tpl,
            {
                name : name,
                value : value,
                className : className
            },
            false,
            true
        );
    }

    /**
     * ui dynamicTemp
     * @class 动态模板
     * @type Function
     * @param {String} [template] 模板 在 templates 中的 key 值
     */
    // UI.prototype.dynamicTemp = function (model, template) {
    //     var self = this,
    //         tpl = templateManager.templates[template];

    //     if ( tpl ) {
    //         return templateManager.compile(
    //             tpl,
    //             model
    //         );
    //     } else {
    //         return ' ';        
    //     }

    // }

    /**
     * ui orderProcess
     * @class 订单进度条
     * @type Function
     * @param {json} [model] model
     * @param {json} [data] 根据 model 提取的数据
     * @param {string} [model.processType] 进度条的名称
     * @param {number} [model.current] 当前进度
     */
    UI.prototype.orderProcess = function (model) {
        var self = this,
            tpl = ct.get('uiOrderProcess', true),
            processService = Store.getService('OrderProcess'),
            processData = processService.getProcess(model),
            curIndex = model.processCurrent - 1,
            stepWidth = 100 / (processData.step - 1),
            tempData = {
                width : curIndex * stepWidth + '%',
                data : []
            };

        for ( var i = 0, l = processData.process.length; i < l; i++ ) {
            var o = $.extend({}, processData.process[i], {
                isDone : i <= curIndex,
                isCurrent : curIndex == i,
                width : stepWidth + '%',
                position : -stepWidth / 2 + stepWidth * i + '%'
            });
            tempData.data.push( o );
        }

        return ct.compile(
            tpl,
            tempData
        );
    }

    /**
     * ui mCommonTitle
     * @class 移动端公共置顶标题栏
     * @type Function
     * @param {string} [title] 标题
     */
    UI.prototype.mCommonTitle = function (title) {
        var self = this,
            tpl = ct.get('mobileCommonTitle', true),
            tempData = {
                title : title
            };


        return ct.compile(
            tpl,
            tempData
        );
    }


    
    return UI;
    
})( jQuery, window.Store ));
