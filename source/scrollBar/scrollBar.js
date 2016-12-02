


(function($, window, document,undefined) {
    //定义ScrollBar的构造函数
    var ScrollBar = function(ele, opt) {
        this.$element = ele;
        this.defaultVal = {
            scrollbarWidth : 37,     /*滚动条总宽度*/
            scrollbarMargin : 5,
            wheelSpeed : 18,        /*鼠标滚轮速度*/
            showArrows : true,      /*是否为用户显示的箭头滚动*/
            arrowSize : 37,           /*上下箭头中间滚动条距顶部高度，如果showArrows= TRUE*/
            animateTo : false,       /*当动画时调用scrollTo和scrollBy*/
            dragMinHeight : 1,       /*允许拖动栏的最小高度*/
            dragMaxHeight : 99999,    /*允许拖动栏的最大高度*/
            animateInterval : 100,    /*动画的速度毫秒*/
            animateStep: 3,            /*动画过程滚动距离（默认3）*/
            maintainPosition: true,
            scrollbarOnLeft: false,
            dragTopBottomHeight:14      /*上下箭头总高度*/
        };
        this.options = $.extend({}, this.defaultVal, opt);
    };
    //定义ScrollBar的方法
    ScrollBar.prototype = {
        init: function(options,callback) {
            var _this = this;
            var $this = $(this.$element);
            $this.css('overflow', 'hidden');
            this.currentScrollPosition = 0;
            this.paneWidth = $this.innerWidth();
            this.paneHeight = $this.innerHeight();
            this.trackHeight = 0;
            /*判断有没有scrollBarContainer 类*/
            if ($(this).parent().is('.scrollBarContainer')) {
                this.currentScrollPosition =  this.options.maintainPosition ? $this.position().top : 0;
                var $c = $this.parent();
                this.paneWidth = $c.innerWidth();
                this.paneHeight = $c.outerHeight()+550;
                this.trackHeight = this.paneHeight;
                $('>.scrollBarTrack, >.scrollArrowUp, >.scrollArrowDown', $c).remove();
                $this.css({'top':0});
            } else {
                this.originalPadding = $this.css('paddingTop') + ' ' + $this.css('paddingRight') + ' ' + $this.css('paddingBottom') + ' ' + $this.css('paddingLeft');
                this.originalSidePaddingTotal = (parseInt($this.css('paddingLeft')) || 0) + (parseInt($this.css('paddingRight')) || 0);
                this.paneWidth = $this.innerWidth();
                this.paneHeight = $this.innerHeight();
                this.trackHeight = this.paneHeight;
                $this.wrap(
                    $('<div></div>').attr( {'class':'scrollBarContainer'}).css({ 'height':this.paneHeight+'px', 'width':this.paneWidth+'px'})
                    );
            }
            /*处理滚动条偏离样式*/
           this.scrollbarOnLeft(this.originalSidePaddingTotal,$this);

            /*创建插入滚动条*/
           this.appendScrollBar($this);

        },
        /*处理滚动条偏离样式*/
        scrollbarOnLeft:function(originalSidePaddingTotal,$this){
            var p = originalSidePaddingTotal;
            var cssToApply = {
                'height':'auto',
                'width':this.paneWidth - this.options.scrollbarWidth - this.options.scrollbarMargin - p + 'px'
            };
            if(this.options.scrollbarOnLeft) {
                cssToApply.paddingLeft = this.options.scrollbarMargin + this.options.scrollbarWidth + 'px';
            } else {
                cssToApply.paddingRight = this.options.scrollbarMargin + 'px';
            }
            $this.css(cssToApply);
        },
        /*创建插入滚动条*/
        appendScrollBar:function($this){
            this.contentHeight = $this.outerHeight();
            this.percentInView = this.paneHeight / this.contentHeight;
            if (this.percentInView < .99) {
                var $container = $this.parent();
                $container.append(
                    $('<div></div>').attr({'class':'scrollBarTrack'}).css({'width':this.options.scrollbarWidth+'px'}).append(
                        $('<div></div>').attr({'class':'scrollBarDrag'}).css({'width':this.options.scrollbarWidth+'px'}).append(
                            $('<div></div>').attr({'class':'scrollBarDragTop'}).css({'width':this.options.scrollbarWidth+'px'}),
                            $('<div></div>').attr({'class':'scrollBarDragMiddle'}).css({'width':this.options.scrollbarWidth+'px'}),
                            $('<div></div>').attr({'class':'scrollBarDragBottom'}).css({'width':this.options.scrollbarWidth+'px'})
                        )
                    )
                );
                var $track = $container.find(".scrollBarTrack");
                /*用户自定义滚动条箭头*/
                this.showArrows($container,$track);
            }else{
                $this.css(
                    {
                        'height':this.paneHeight+'px',
                        'width':this.paneWidth-this.originalSidePaddingTotal+'px',
                        'padding':this.originalPadding
                    }
                );
                $this.parent().unbind('mousewheel');
            }
        },
        /*用户自定义滚动条箭头*/
        showArrows:function($container,$track){
            if (this.options.showArrows) {
                var _this = this;
                var currentArrowButton;
                var currentArrowDirection;
                var currentArrowInterval;
                var currentArrowInc;
                var whileArrowButtonDown = function()
                {
                    if (currentArrowInc > 4 || currentArrowInc%4==0) {
                        _this.positionDrag(_this.dragPosition + currentArrowDirection * _this.mouseWheelMultiplier);
                    }
                    currentArrowInc ++;
                };
                var onArrowMouseUp = function(event)
                {
                    $('html').unbind('mouseup', onArrowMouseUp);
                    currentArrowButton.removeClass('scrollActiveArrowButton');
                    clearInterval(currentArrowInterval);
                };
                var onArrowMouseDown = function() {
                    $('html').bind('mouseup', onArrowMouseUp);
                    currentArrowButton.addClass('scrollActiveArrowButton');
                    currentArrowInc = 0;
                    whileArrowButtonDown();
                    currentArrowInterval = setInterval(whileArrowButtonDown, 100);
                };
                /*插入箭头*/
                $container
                    .append(
                        $('<a></a>')
                            .attr({'href':'javascript:;', 'class':'scrollArrowUp'})
                            .css({'width':this.options.scrollbarWidth+'px'})
                            .html('Scroll up')
                            .bind('mousedown', function()
                            {
                                currentArrowButton = $(this);
                                currentArrowDirection = -1;
                                onArrowMouseDown();
                                this.blur();
                                return false;
                            })
                            .bind('click', function() { return false; }),
                        $('<a></a>')
                            .attr({'href':'javascript:;', 'class':'scrollArrowDown'})
                            .css({'width':this.options.scrollbarWidth+'px'})
                            .html('Scroll down')
                            .bind('mousedown', function()
                            {
                                currentArrowButton = $(this);
                                currentArrowDirection = 1;
                                onArrowMouseDown();
                                this.blur();
                                return false;
                            })
                            .bind('click', function() { return false; })
                    );
                var $upArrow =  $container.find(".scrollArrowUp");
                var $downArrow =  $container.find(".scrollArrowDown");
                /*计算核心滚动条整个的高度（高度 = 容器高度 - 上下箭头高度）*/
                if (this.options.arrowSize) {
                    this.trackHeight = this.paneHeight - this.options.arrowSize - this.options.arrowSize;
                    $track.css({'height': this.trackHeight+'px', top:this.options.arrowSize+'px'})
                } else {
                    var topArrowHeight = $upArrow.height();
                    this.options.arrowSize = topArrowHeight;
                    this.trackHeight = this.paneHeight - topArrowHeight - $downArrow.height();
                    $track.css({'height': this.trackHeight+'px', top:topArrowHeight+'px'})
                }
            }
            /*滚动条拖动事件*/
            this.scrollDrag();

            /*滚动条点击滚动事件*/
            this.scrollClick();

            /*鼠标滚轮事件*/
            this.scrollMousewheel();

        },
        /*获取坐标*/
        getPos:function (event, c) {
            var p = c == 'X' ? 'Left' : 'Top';
            return event['page' + c] || (event['client' + c] + (document.documentElement['scroll' + p] || document.body['scroll' + p])) || 0;
        },
        animateToPosition :function(){
            var diff = (this._animateToPosition - this.dragPosition) / this.options.animateStep;
            if (diff > 1 || diff < -1) {
                this.positionDrag(this.dragPosition + diff);
            } else {
                this.positionDrag(this._animateToPosition);
                this.ceaseAnimation();
            }
        },
        ceaseAnimation:function(){
            var _this = this;
            if (_this._animateToInterval) {
                clearInterval(_this._animateToInterval);
                delete _this._animateToPosition;
            }
        },
        /*滚动条拖动事件*/
        scrollDrag:function(){
            this.currentOffset = 0;
            this.dragPosition = 0;
            this.dragMiddle = this.percentInView*this.paneHeight/2;
            var $this = $(this.$element);
            var $pane = $this.css({'position':'absolute', 'overflow':'visible'});
            var $drag =  $this.parent().find(".scrollBarTrack").find(".scrollBarDrag");
            this._animateToInterval = undefined;
            this._animateToPosition = undefined;
            var _this = this;
            /*初始化拖动*/
            this.initDrag = function() {
                _this.ceaseAnimation();
                _this.currentOffset = $drag.offset();
                _this.currentOffset.top -= _this.dragPosition;
                _this.maxY = _this.trackHeight - $drag[0].offsetHeight;
                _this.mouseWheelMultiplier = 2 * _this.options.wheelSpeed * _this.maxY / _this.contentHeight;
            };
            /*开始拖动*/
            this.onStartDrag = function(event){
                _this.initDrag();
                _this.dragMiddle = _this.getPos(event, 'Y') - _this.dragPosition - _this.currentOffset.top;
                $('html').bind('mouseup', _this.onStopDrag).bind('mousemove', _this.updateScroll);
                /*IE bug 处理*/
                if ($.browser.msie) {
                    $('html').bind('dragstart', function() {return false; }).bind('selectstart', function() {	return false; });
                }
                return false;
            };
            /*停止拖动*/
            this.onStopDrag = function(){
                $('html').unbind('mouseup', _this.onStopDrag).unbind('mousemove', _this.updateScroll);
                _this.dragMiddle = _this.percentInView*_this.paneHeight/2;
                /*IE bug 处理*/
                if ($.browser.msie) {
                    $('html').unbind('dragstart', function() {	return false; }).unbind('selectstart', function() {	return false; });
                }
            };
            /*改变滚动条的位置*/
            this.updateScroll = function(e){
                _this.positionDrag(_this.getPos(e, 'Y') - _this.currentOffset.top - _this.dragMiddle);
            };

            /*计算滚动条核心高度（高度 = scrollBarDragTop+scrollBarDragMiddle+scrollBarDragBottom）*/
            var dragH = Math.max(Math.min(this.percentInView*(this.paneHeight- this.options.arrowSize*2), this.options.dragMaxHeight), this.options.dragMinHeight);
            $drag.css({'height':dragH+'px'}).bind('mousedown', _this.onStartDrag);
            /*给中间条jScrollPaneDragMiddle上高度*/
            $(".scrollBarDragMiddle").height(parseFloat(dragH-this.options.dragTopBottomHeight));

            /*初始化拖动*/
            _this.initDrag();


        },
        /*滚动条滚动及点击事件*/
        scrollClick:function(){
            var _this = this;
            var $this = $(this.$element);
            var $track = $this.parent().find(".scrollBarTrack");
            var trackScrollInterval;
            var trackScrollInc;
            var trackScrollMousePos;
            var doTrackScroll = function()
            {
                if (trackScrollInc > 8 || trackScrollInc%4==0) {
                    _this.positionDrag((_this.dragPosition - ((_this.dragPosition - trackScrollMousePos) / 2)));
                }
                trackScrollInc ++;
            };
            var onStopTrackClick = function()
            {
                clearInterval(trackScrollInterval);
                $('html').unbind('mouseup', onStopTrackClick).unbind('mousemove', onTrackMouseMove);
            };
            var onTrackMouseMove = function(event)
            {
                trackScrollMousePos = _this.getPos(event, 'Y') - _this.currentOffset.top - _this.dragMiddle;
            };
            var onTrackClick = function(event)
            {
                _this.initDrag();
                onTrackMouseMove(event);
                trackScrollInc = 0;
                $('html').bind('mouseup', onStopTrackClick).bind('mousemove', onTrackMouseMove);
                trackScrollInterval = setInterval(doTrackScroll, 100);
                doTrackScroll();
            };
            $track.bind('mousedown', onTrackClick);
        },
        /*鼠标滚动事件*/
        scrollMousewheel:function(){
            var _this = this;
            var $this = $(this.$element);
            var $track = $this.parent().find(".scrollBarTrack");
            var $pane = $this.css({'position':'absolute', 'overflow':'visible'});
            $this.parent().bind(
                'mousewheel',
                function (event, delta) {
                    _this.initDrag();
                    _this.ceaseAnimation();
                    var d = _this.dragPosition;
                    _this.positionDrag(_this.dragPosition - delta * _this.mouseWheelMultiplier);
                    var dragOccured = d != _this.dragPosition;
                    return !dragOccured;
                }
            );
            var scrollTo = function(pos, preventAni)
            {
                if (typeof pos == "string") {
                    $e = $(pos, $this);
                    if (!$e.length) return;
                    pos = $e.offset().top - $this.offset().top;
                }
                $this.parent().scrollTop(0);
                _this.ceaseAnimation();
                var destDragPosition = -pos/(_this.paneHeight-_this.contentHeight) * _this.maxY;
                if (preventAni || !this.options.animateTo) {
                    _this.positionDrag(destDragPosition);
                } else {
                    _this._animateToPosition = destDragPosition;
                    _this._animateToInterval = setInterval(_this.animateToPosition, this.options.animateInterval);
                }
            };
            $this[0].scrollTo = scrollTo;

            $this[0].scrollBy = function(delta)
            {
                var currentPos = -parseInt($pane.css('top')) || 0;
                scrollTo(currentPos + delta);
            };
            scrollTo(-_this.currentScrollPosition, true);

        },

        /*定位拖动*/
        positionDrag:function(destY){
            var $this = $(this.$element);
            var $pane = $this.css({'position':'absolute', 'overflow':'visible'});
            var $drag =  $this.parent().find(".scrollBarTrack .scrollBarDrag");
            destY = destY < 0 ? 0 : (destY > this.maxY ? this.maxY : destY);
            this.dragPosition = destY;
            $drag.css({'top':destY+'px'});
            var p = destY / this.maxY;
            $pane.css({'top':((this.paneHeight-this.contentHeight)*p) + 'px'});
            $this.trigger('scroll');
            if (this.options.showArrows) {
                $this.parent().find(".scrollArrowUp")[destY == 0 ? 'addClass' : 'removeClass']('disabled');
                $this.parent().find(".scrollArrowDown")[destY == this.maxY ? 'addClass' : 'removeClass']('disabled');
            }
        }
    };
    //在插件中使用scrollBar对象
    $.fn.scrollBar = function(options,callback) {
        //创建scrollBar的实体
        var scrollBar = new ScrollBar(this, options);
        //初始化
        return scrollBar.init(options,callback);
    };


})(jQuery, window, document);
