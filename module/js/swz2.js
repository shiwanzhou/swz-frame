



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
            that.attr = this.attr;
            that.addClass = this.addClass;
            that.removeClass = this.removeClass;
            that.val = this.val;
            return that;
        },
        html:function(){
            return this.innerHTML;
        },
        text:function(){
           return this.textContent;
        },
        attr:function(name,value){
            if (arguments.length === 2) {
                name == 'class'? this.className = value :this.setAttribute(name, value);
                return this
            } else {
                return  name == 'class'? this.className:this.getAttribute(name);
            }
        },
        hasClass:function(){

        },
        addClass:function(value){


        },
        removeClass:function(){


        },
        val:function(value){
            if(value){

            }else{

            }
        },
        append:function(){

        }
    };




    SWZ.prototype.init.prototype = SWZ.prototype;
    window.$ = SWZ;
})(window);