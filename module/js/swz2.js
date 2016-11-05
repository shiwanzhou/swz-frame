



(function(window, undefined) {
    var SWZ = function(selector, context) {
        return  new SWZ.prototype.init(selector,context);
    }
    /***********javascript 底层补丁**************/
    var objectP = Object.prototype;
    var ohasOwn = objectP.hasOwnProperty;
    var serialize = objectP.toString;
    if(!SWZ.isArray){
        SWZ.isArray = function(n){
            return objectP.toString.call(n) === "[object Array]";
        }
    }
    /***********主方法**************/
    SWZ.fn =  SWZ.prototype = {
        init: function( selector, context, rootjQuery ) {
            var that = this;
            /*    id选择器*/
            var re = /^#/;
            if(re.test(selector)){
                if(document.querySelector){
                    that =  document.querySelector(selector);
                }else{
                    that =   document.getElementById(selector);
                }
            }
            that.text = this.text;
            that.html = this.html;
            return that;
        },
        html:function(){
            return this.innerHTML;
        },
        text:function(){
           return this.textContent;
        }
    };
    SWZ.prototype.init.prototype = SWZ.prototype;
    window.$ = SWZ;
})(window);