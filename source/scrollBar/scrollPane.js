

(function($, window, document,undefined) {
    //定义ImageLunbo的构造函数
    var ScrollBar = function(ele, opt) {
        this.$element = ele;
        this.defaultVal = {
            scrollbarWidth : 10,
            scrollbarMargin : 5,
            wheelSpeed : 18,
            showArrows : false,
            arrowSize : 0,
            animateTo : false,
            dragMinHeight : 1,
            dragMaxHeight : 99999,
            animateInterval : 100,
            animateStep: 3,
            maintainPosition: true,
            scrollbarOnLeft: false,
            reinitialiseOnImageLoad: false,
            dragTopBottomHeight:14
        };
        this.options = $.extend({}, this.defaultVal, opt);
    };
    //定义ImageLunbo的方法
    ScrollBar.prototype = {
        init: function(options,callback) {
            var _this = this;
            var $this = $(this.$element);
            $this.css('overflow', 'hidden');
            var currentScrollPosition = 0;
            var paneWidth = $this.innerWidth();
            var paneHeight = $this.innerHeight();
            var trackHeight = 0;
            /*判断有没有scrollBarContainer 类*/
            if ($(this).parent().is('.scrollBarContainer')) {
                 currentScrollPosition =  this.options.maintainPosition ? $this.position().top : 0;
                var $c = $this.parent();
                paneWidth = $c.innerWidth();
                paneHeight = $c.outerHeight()+550;
                trackHeight = paneHeight;
                $('>.scrollBarTrack, >.scrollBarArrowUp, >.scrollBarArrowDown', $c).remove();
                $this.css({'top':0});
            } else {
                this.originalPadding = $this.css('paddingTop') + ' ' + $this.css('paddingRight') + ' ' + $this.css('paddingBottom') + ' ' + $this.css('paddingLeft');
                this.originalSidePaddingTotal = (parseInt($this.css('paddingLeft')) || 0) + (parseInt($this.css('paddingRight')) || 0);
                paneWidth = $this.innerWidth();
                paneHeight = $this.innerHeight();
                trackHeight = paneHeight;
                $this.wrap(
                    $('<div></div>').attr( {'class':'scrollBarContainer'}).css({ 'height':paneHeight+'px', 'width':paneWidth+'px'})
                    );
                $(document).bind( 'emchange',  function(e, cur, prev){
                    $this.scrollBar(_this.options);
                });
            }
            /*处理滚动条偏离样式*/
            this.scrollbarOnLeft(this.originalSidePaddingTotal,paneWidth,$this);

            /*创建插入滚动条*/
           this.appendScrollBar(paneHeight,$this);

           /* this.prev =  $(this.$element).find(".prev");
            this.next =  $(this.$element).find(".next");
            this._doPrev = function () {return _this.doPrev.apply(_this)};
            this._doNext = function () {return _this.doNext.apply(_this)};
            this.iCenter =  this.defaultVal.iCenter;
            this.options = this.defaultVal.styleArr;
            this.setUp();
            this.doImgClick();
            this.prev.on("click",this._doPrev);
            this.next.on("click",this._doNext);*/
        },
        /*处理滚动条偏离样式*/
        scrollbarOnLeft:function(originalSidePaddingTotal,paneWidth,$this){
            var p = originalSidePaddingTotal;
            var cssToApply = {
                'height':'auto',
                'width':paneWidth - this.options.scrollbarWidth - this.options.scrollbarMargin - p + 'px'
            };
            if(this.options.scrollbarOnLeft) {
                cssToApply.paddingLeft = this.options.scrollbarMargin + this.options.scrollbarWidth + 'px';
            } else {
                cssToApply.paddingRight = this.options.scrollbarMargin + 'px';
            }
            $this.css(cssToApply);
        },
        /*创建插入滚动条*/
        appendScrollBar:function(paneHeight,$this){
            var contentHeight = $this.outerHeight();
            var percentInView = paneHeight / contentHeight;
            if (percentInView < .99) {
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
            }
        },
        doImgClick:function(){
            var _this = this;

        },
        doPrev:function(){

        },
        doNext:function(){

        }
    };
    //在插件中使用imageLunbo对象
    $.fn.scrollBar = function(options,callback) {
        //创建imageLunbo的实体
        var scrollBar = new ScrollBar(this, options);
        //初始化
        return scrollBar.init(options,callback);
    }
})(jQuery, window, document);
