/*
 *@description Scrollbar
 *@author：xu chen 
 *@date：2014-4-2
 *@update：2014-4-2
*/
'use strict';

window.Store.addPlugin('Scrollbar', (function( $, Store ){

    function Scrollbar() {
        var self = this;

        self.def = {
            frame : null,
            wrapper : null,
            container : null,
            scrollbar : null,
            block : null,
            wrapperHeight : null,
            containerHeight : null,
            scrollbarRevise : null
        };
    }

    Scrollbar.prototype.init = function(){
        var self = this;
    };

    /**
     * 全局初始化
     * @type Function
     */
    Scrollbar.prototype.create = function(options){
        var self = this;
        var option = $.extend({}, self.def, options),
            elFrame = option.frame,
            elWrapper = option.wrapper,
            elContainer = option.container,
            elSidebar = option.scrollbar,
            elBlock = option.block,
            wrapperHeight = options.wrapperHeight || elWrapper.height(),
            containerHeight = options.containerHeight || elContainer.outerHeight(),
            scrollbarRevise = Math.floor(option.scrollbarRevise) || 0,
            scrollbarHeight = wrapperHeight - scrollbarRevise,
            containerTop = 0,
            maxMove = 0,
            moveNum = 30,
            scale = 1,
            hamster;

        // init scroll element css
        if ( elWrapper.css('position') == 'static' ) {
            elWrapper.css('position', 'relative');
        }
        if ( elContainer.css('position') == 'static' ) {
            elContainer.css('position', 'absolute');
        }

        if ( !( hamster = elFrame.data('hamster') ) ) {
            hamster = Hamster(elFrame[0]);
            elFrame.data('hamster', hamster);
        }

        hamster.wheel(function (event) {
            event.preventDefault();
            if ( event.deltaY < 0 ) {
                scrollbarMethods.move(moveNum);
            } else {
                scrollbarMethods.move(-moveNum);
            }
        });

        elBlock.on("mousedown", function(event){
            event.preventDefault();
            var _pos = elBlock.position().top,
                _downY = event.pageY,
                _moveSize = 0;
            $(document).on("mousemove", function(e){
                e.preventDefault();
                _moveSize = Math.floor(_pos + e.pageY) - _downY;
                _moveSize = _moveSize >= 0 ? ( _moveSize >= maxMove ? maxMove : _moveSize  ) : 0;
                elBlock.css("top", _moveSize);
                containerTop =  _moveSize / wrapperHeight * containerHeight;
                elContainer.css("top", -containerTop);

            }).on("mouseup", function(e){
                e.preventDefault();
                $(this).off("mousemove");
            });
        });

        var scrollbarMethods = {
            isRun : false,
            reset : function (wrapperH, containerH) {
                var thiz = this;
                if ( wrapperH ) {
                    wrapperHeight = Math.floor(wrapperH);
                }
                if ( containerH ) {
                    containerHeight = Math.floor(containerH);
                }

                if ( containerHeight > wrapperHeight ) {
                    thiz.isRun = true;
                    elSidebar.height( scrollbarHeight );
                    scale = wrapperHeight / containerHeight;
                    elBlock.height( scrollbarHeight * scale );
                    maxMove = scrollbarHeight - scrollbarHeight * scale;
                    moveNum = maxMove * 0.20;
                    elSidebar.show();
                }else{
                    thiz.isRun = false;
                    elSidebar.hide();
                }
                return this;
            },
            move : function (size) {
                if ( !this.isRun ) {
                    return false;
                }
                var _pos = elBlock.position().top,
                _moveSize = _pos - size;
                _moveSize = _moveSize < 0 ? 0 : ( _moveSize > maxMove ? maxMove : _moveSize );
                elBlock.css("top", _moveSize);
                containerTop =  _moveSize / scrollbarHeight * containerHeight;
                elContainer.css("top", -containerTop);
            },
            scrollTop : function() {
                var _arguments = arguments[0];
                if ( _arguments == undefined ) {
                    return elBlock.css("top");
                }
                if ( typeof _arguments == 'number' ) {
                    var _blockMoveNum = _arguments * scale,
                        _containerMoveMax = maxMove / scale,
                        _containerMoveNum = _arguments > _containerMoveMax ? _containerMoveMax : _arguments;
                    _blockMoveNum = _blockMoveNum > maxMove ? maxMove : _blockMoveNum;
                    elBlock.animate({"top": _blockMoveNum}, 400);
                    elContainer.animate({"top": -_containerMoveNum}, 400);
                }
            }
        };

        scrollbarMethods.reset();

        return scrollbarMethods;
    }

    /**
     * 绑定滚动条
     * @type Function
     */
    Scrollbar.prototype.bind = function(element, wrapperHeight, containerHeight){
        var self = this;
        var $wrapper = element.find('.js-scroll-wrapper'),
            $container = $wrapper.find('.js-scroll-container'),
            $sidebar = element.find('.js-scroll-sidebar'),
            $block = $sidebar.find('.js-scroll-block'),
            revise = element.data('scrollRevise');

        // init scrollbar
        var scrollbar = self.create({
                frame : element,
                wrapper : $wrapper,
                container : $container,
                scrollbar : $sidebar,
                wrapperHeight : wrapperHeight,
                containerHeight : containerHeight,
                block : $block,
                scrollbarRevise : ( revise || 20)
            });

        element.data('ui-scroll', scrollbar);

        return scrollbar;
    }

    return( new Scrollbar() );
    
})( jQuery, window.Store ));