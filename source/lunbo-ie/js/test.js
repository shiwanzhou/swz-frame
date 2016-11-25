

    (function($, window, document,undefined) {
        //定义ImageLunbo的构造函数
        var ImageLunbo = function(ele, opt) {
            this.$element = ele;
            this.defaultVal = {

            };
            this.options = $.extend({}, this.defaultVal, opt);
        };
        //定义ImageLunbo的方法
        ImageLunbo.prototype = {
            init: function(options,callback) {
                var that = this;
                console.log(22)



            },
            prev:function(){


            },
            next:function(){

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
        $("#imageLunbo").imageLunbo()
    });



