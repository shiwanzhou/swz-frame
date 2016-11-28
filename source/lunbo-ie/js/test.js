

    (function($, window, document,undefined) {
        //定义ImageLunbo的构造函数
        var ImageLunbo = function(ele, opt) {
            this.$element = ele;
            this.defaultVal = {
                iCenter:1,
                styleArr : [
                    {index:0,width:377, height:299, top:23, left:27, zIndex:1},
                    {index:1,width:517, height:410, top:111, left:277, zIndex:4},
                    {index:2,width:377, height:299, top:45, left:622, zIndex:2}
                ]
            };
            this.options = $.extend({}, this.defaultVal, opt);
        };
        //定义ImageLunbo的方法
        ImageLunbo.prototype = {
            init: function(options,callback) {
                var _this = this;
                this.prev =  $(this.$element).find(".prev");
                this.next =  $(this.$element).find(".next");
                this._doPrev = function () {return _this.doPrev.apply(_this)};
                this._doNext = function () {return _this.doNext.apply(_this)};
                this.iCenter =  this.defaultVal.iCenter;
                this.options = this.defaultVal.styleArr;
                this.setUp();
                this.doImgClick();
                this.prev.on("click",this._doPrev);
                this.next.on("click",this._doNext);
            },
            setUp:function(){
                var that =this;
                if($(this.$element).find("li").length){
                    $(this.$element).find("li").each(function(i){
                        var pop = that.options[i];
                        $(this).animate(pop);
                    });
                }
            },
            doImgClick:function(){
                var _this = this;
                if($(this.$element).find("li").length){
                    $(this.$element).find("li").each(function(i){
                        $(this).on("click",function(){
                            if (_this.options[i].index > _this.iCenter)
                            {
                                for (var j = 0; j < _this.options[i].index - _this.iCenter; j++) {
                                    _this.options.unshift(_this.options.pop());
                                }
                                _this.setUp();
                            }
                            else if(_this.options[i].index < _this.iCenter)
                            {
                                for (var j = 0; j <  _this.iCenter - _this.options[i].index; j++) {
                                    _this.options.push(_this.options.shift());
                                }
                                _this.setUp();
                            }
                        })
                    });
                }
            },
            doPrev:function(){
                this.options.unshift(this.options.pop());
                this.setUp();
            },
            doNext:function(){
                this.options.push(this.options.shift());
                this.setUp();
            }
        };
        //在插件中使用imageLunbo对象
        $.fn.imageLunbo = function(options,callback) {
            //创建imageLunbo的实体
            var imageLunbo = new ImageLunbo(this, options);
            //初始化
            return imageLunbo.init(options,callback);
        }
    })(jQuery, window, document);

    $(function(){
        $("#box").imageLunbo()
    });



