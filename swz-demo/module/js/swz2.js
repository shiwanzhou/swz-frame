



(function(window, undefined) {
    var SWZ = function(selector, context) {
        return  new SWZ.prototype.init(selector,context);
    }
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