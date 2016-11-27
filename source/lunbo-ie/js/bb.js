function ZoomPic ()
{
    this.initialize.apply(this, arguments)
}
function IE() {
    if (window.VBArray) {
        var mode = document.documentMode
        return mode ? mode : window.XMLHttpRequest ? 7 : 6
    } else {
        return NaN
    }
}
ZoomPic.prototype =
{
    initialize : function (id)
    {
        var _this = this;
        this.wrap = typeof id === "string" ? document.getElementById(id) : id;
        this.oUl = this.wrap.getElementsByTagName("ul")[0];
        this.aLi = this.wrap.getElementsByTagName("li");
        this.prev = this.wrap.getElementsByTagName("pre")[0];
        this.next = this.wrap.getElementsByTagName("pre")[1];
        this.timer = null;
        this.aSort = [];
        this.iCenter = 1;
        this._doPrev = function () {return _this.doPrev.apply(_this)};
        this._doNext = function () {return _this.doNext.apply(_this)};
        this.options = [
            {index:0,width:377, height:299, top:23, left:27, zIndex:1},
            {index:1,width:517, height:410, top:111, left:277, zIndex:4},
            {index:2,width:377, height:299, top:45, left:622, zIndex:2}
            /*	{width:224, height:288, top:0, left:262, zIndex:4},
             {width:170, height:218, top:37, left:468, zIndex:3},
             {width:130, height:170, top:61, left:620, zIndex:2},
             {width:120, height:150, top:71, left:496, zIndex:1}*/
        ];
        for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
        this.aSort.unshift(this.aSort.pop());
        this.setUp();
        this.addEvent(this.prev, "click", this._doPrev);
        this.addEvent(this.next, "click", this._doNext);
        this.doImgClick();
        /*this.timer = setInterval(function ()
         {
         _this.doNext()
         }, 3000);		*/
        /*this.wrap.onmouseover = function ()
         {
         clearInterval(_this.timer)
         };
         this.wrap.onmouseout = function ()
         {
         _this.timer = setInterval(function ()
         {
         _this.doNext()
         }, 3000);
         }*/
    },
    doPrev : function ()
    {
        //	this.aSort.unshift(this.aSort.pop());
        this.options.unshift(this.options.pop());
        this.setUp()
    },
    doNext : function ()
    {
        this.options.push(this.options.shift());
        // this.aSort.push(this.aSort.shift());
        this.setUp()
    },
    doImgClick : function ()
    {
        var _this = this;
            $("#box").find("ul li").each(function(i){
                $(this).on("click",function(){
                    //console.log(i)
                    // console.log(_this.options);
                    //_this.options.push(_this.options.shift());
                    //console.log(_this.options);
                    console.log(_this.options[i].index)
                    if (_this.options[i].index > _this.iCenter)
                    {
                        console.log(11)
                        for (var j = 0; j < _this.options[i].index - _this.iCenter; j++) {
                            _this.options.unshift(_this.options.pop());
                        }
                        //  console.log(_this.options)
                        _this.setUp()
                    }
                    else if(_this.options[i].index < _this.iCenter)
                    {
                        console.log(22)
                        for (var j = 0; j <  _this.iCenter - _this.options[i].index; j++) {
                            _this.options.push(_this.options.shift())
                        }
                        //  console.log(_this.options)
                        _this.setUp()
                    }else{
                        console.log(33)

                    }
                })
            });



    },
    setUp : function ()
    {
        // console.log(this.options[0])
            var that =this;
            // $("#box").find("ul li").addClass("ttt");
            $("#box").find("ul li").each(function(i){
                // console.log(i)
                var pop = that.options[i];
                /* for(var m in pop){
                 $(this).animate({m:pop[m]});
                 }*/
                $(this).animate(pop);
            });




    },
    addEvent : function (oElement, sEventType, fnHandler)
    {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
    },
    css : function (oElement, attr, value)
    {
        if (arguments.length == 2)
        {
            return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
        }
        else if (arguments.length == 3)
        {
            switch (attr)
            {
                case "width":
                case "height":
                case "top":
                case "left":
                case "bottom":
                    oElement.style[attr] = value + "px";
                    break;
                case "opacity" :
                    oElement.style.filter = "alpha(opacity=" + value + ")";
                    oElement.style.opacity = value / 100;
                    break;
                default :
                    oElement.style[attr] = value;
                    break
            }
        }
    },
    doMove : function (oElement, oAttr, fnCallBack)
    {
        var _this = this;

        if(oElement.timer){
            clearInterval(oElement.timer);
        }
        oElement.timer = setInterval(function ()
        {
            var bStop = true;
            for (var property in oAttr)
            {
                // console.log(11)
                var iCur = parseFloat(_this.css(oElement, property));
                // console.log(iCur)
                property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
                var iSpeed = (oAttr[property] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (iCur != oAttr[property])
                {
                    bStop = false;
                    _this.css(oElement, property, iCur + iSpeed)
                }
            }
            if (bStop)
            {
                clearInterval(oElement.timer);
                fnCallBack && fnCallBack.apply(_this, arguments)
            }
        }, 30)
    }
};
window.onload = function ()
{
    new ZoomPic("box");
};/**
 * Created by Administrator on 16-11-27.
 */
