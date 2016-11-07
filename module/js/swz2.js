



(function(window, undefined) {
    var SWZ = function(selector, context) {
        return  new SWZ.prototype.init(selector,context);
    }
    /***********javascript 底层工具函数**************/
    SWZ.oneObject =  function (array, val) {
        if (typeof array === "string") {
            array = array.match(rword) || []
        }
        var result = {},
            value = val !== void 0 ? val : 1
        for (var i = 0, n = array.length; i < n; i++) {
            result[array[i]] = value
        }
        return result
    };
    var objectP = Object.prototype;
    var ohasOwn = objectP.hasOwnProperty;
    var serialize = objectP.toString;
    var class2type = {};
    var rword = /[^, ]+/g; //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
    "Boolean Number String Function Array Date RegExp Object Error".replace(rword, function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });
    var W3C = window.dispatchEvent;
    var DOC = document;
    var rhtml = /<|&#?\w+;/;
    var avalonFragment = DOC.createDocumentFragment();
    var rtagName = /<([\w:]+)/;  //取得其tagName
    var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
    var rcreate = W3C ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/ig;
    var rnest = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/ ;//需要处理套嵌关系的标签
    var script = DOC.createElement("script");
    var ap = Array.prototype;
    var cinerator = DOC.createElement("div");
    var tagHooks = {
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table>", "</table>"],
        td: [3, "<table><tr>", "</tr></table>"],
        g: [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">', '</svg>'],
        //IE6-8在用innerHTML生成节点时，不能直接创建no-scope元素与HTML5的新标签
        _default: W3C ? [0, "", ""] : [1, "X<div>", "</div>"] //div可以不用闭合
    };
    tagHooks.th = tagHooks.td;
    tagHooks.optgroup = tagHooks.option;
    tagHooks.tbody = tagHooks.tfoot = tagHooks.colgroup = tagHooks.caption = tagHooks.thead;
    var scriptTypes = SWZ.oneObject(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"]);
    /*判断VML*/
    SWZ.isVML =  function (src) {
        var nodeName = src.nodeName;
        return nodeName.toLowerCase() === nodeName && src.scopeName && src.outerText === ""
    };
    SWZ.fixVML =  function (node) {
        if (node.currentStyle.behavior !== "url(#default#VML)") {
            node.style.behavior = "url(#default#VML)";
            node.style.display = "inline-block";
            node.style.zoom = 1; //hasLayout
        }
    };
    /*验证数组*/
    var enu;
    var enumerateBUG = enu !== "0"; //IE6下为true, 其他为false
    if(!SWZ.isArray){
        SWZ.isArray = function(n){
            return objectP.toString.call(n) === "[object Array]";
        }
    }
    /*获取node对象名称*/
    SWZ.nodeName = function( elem, name ) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    };
    /*验证函数*/
    SWZ.isFunction  = function(fn){
        if(typeof alert === "object"){
            try {
                return /^\s*\bfunction\b/.test(fn + "")
            } catch (e) {
                return false
            }
        }else{
            return serialize.call(fn) === "[object Function]";
        }
    };
    /*验证window*/
    SWZ.isWindow = function(obj){
        if (!obj)
            return false;
        // 利用IE678 window == document为true,document == window竟然为false的神奇特性
        // 标准浏览器及IE9，IE10等使用 正则检测
        return obj == obj.document && obj.document != obj ;//jshint ignore:line
    };
    /**/
    SWZ.type = function (obj) { //取得目标的类型
        if (obj == null) {
            return String(obj)
        }
        // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[serialize.call(obj)] || "object" :
            typeof obj
    };
    /*判断是否是一个纯对象*/
    SWZ.isPlainObject = function (obj, key) {
        if (!obj || SWZ.type(obj) !== "object" || obj.nodeType || SWZ.isWindow(obj)) {
            return false;
        }
        try { //IE内置对象没有constructor
            if (obj.constructor && !ohasOwn.call(obj, "constructor") && !ohasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) { //IE8 9会在这里抛错
            return false;
        }
        if (enumerateBUG) {
            for (key in obj) {
                return ohasOwn.call(obj, key);
            }
        }
        for (key in obj) {
        }
        return key === void 0 || ohasOwn.call(obj, key)
    };
     /*对字符串转成html 对象*/
    SWZ.parseHTML = function (html) {
        var fragment = avalonFragment.cloneNode(false);
        if (typeof html !== "string") {
            return fragment
        }
        if (!rhtml.test(html)) {
            fragment.appendChild(DOC.createTextNode(html))
            return fragment
        }
        html = html.replace(rxhtml, "<$1></$2>").trim();
        var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase(),
        //取得其标签名
            wrap = tagHooks[tag] || tagHooks._default,
            wrapper = cinerator,
            firstChild, neo
        if (!W3C) { //fix IE
            html = html.replace(rcreate, "<br class=msNoScope>$1"); //在link style script等标签之前添加一个补丁
        }
        wrapper.innerHTML = wrap[1] + html + wrap[2]
        var els = wrapper.getElementsByTagName("script")
        if (els.length) { //使用innerHTML生成的script节点不会发出请求与执行text属性
            for (var i = 0, el; el = els[i++]; ) {
                if (scriptTypes[el.type]) {
                    //以偷龙转凤方式恢复执行脚本功能
                    neo = script.cloneNode(false); //FF不能省略参数
                    ap.forEach.call(el.attributes, function (attr) {
                        if (attr && attr.specified) {
                            neo[attr.name] = attr.value; //复制其属性
                            neo.setAttribute(attr.name, attr.value);
                        }
                    }); // jshint ignore:line
                    neo.text = el.text;
                    el.parentNode.replaceChild(neo, el); //替换节点
                }
            }
        }
        if (!W3C) { //fix IE
            var target = wrap[1] === "X<div>" ? wrapper.lastChild.firstChild : wrapper.lastChild;
            if (target && target.tagName === "TABLE" && tag !== "tbody") {
                //IE6-7处理 <thead> --> <thead>,<tbody>
                //<tfoot> --> <tfoot>,<tbody>
                //<table> --> <table><tbody></table>
                for (els = target.childNodes, i = 0; el = els[i++]; ) {
                    if (el.tagName === "TBODY" && !el.innerHTML) {
                        target.removeChild(el)
                        break
                    }
                }
            }
            els = wrapper.getElementsByTagName("br");
            var n = els.length;
            while (el = els[--n]) {
                if (el.className === "msNoScope") {
                    el.parentNode.removeChild(el)
                }
            }
            for (els = wrapper.all, i = 0; el = els[i++]; ) { //fix VML
                if (SWZ.isVML(el)) {
                    SWZ.fixVML(el)
                }
            }
        }
        //移除我们为了符合套嵌关系而添加的标签
        for (i = wrap[0]; i--; wrapper = wrapper.lastChild) {
        }
        while (firstChild = wrapper.firstChild) { // 将wrapper上的节点转移到文档碎片上！
            fragment.appendChild(firstChild)
        }
        return fragment
    };
    /*操作目标对象*/
    SWZ.manipulationTarget  = function ( elem, content ) {
        if ( SWZ.nodeName( elem, "table" ) &&
            SWZ.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
            return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
        }
        return elem;
    };

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
            that.selectName = selector;
            that.text = this.text;
            that.html = this.html;
            that.attr = this.attr;
            that.addClass = this.addClass;
            that.removeClass = this.removeClass;
            that.val = this.val;
            that.append = this.append;
            that.prepend = this.prepend;
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
        prepend:function(dom){
            if(typeof  dom === "string"){
                var target = SWZ.manipulationTarget( this,  SWZ.parseHTML(dom) );
               // console.log(SWZ.parseHTML(dom))
                target.insertBefore( SWZ.parseHTML(dom), target.firstChild );
            }
            return  this;
        },
        append:function(dom){
            if(typeof  dom === "string"){
                this.appendChild(SWZ.parseHTML(dom));
            }
            return  this;
        }
    };
    /********SWZ扩展************/
    SWZ.extend = SWZ.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false

        // 如果第一个参数为布尔,判定是否深拷贝
        if (typeof target === "boolean") {
            deep = target
            target = arguments[1] || {}
            i++
        }

        //确保接受方为一个复杂的数据类型
        if (typeof target !== "object" && !isFunction(target)) {
            target = {}
        }

        //如果只有一个参数，那么新成员添加于extend所在的对象上
        if (i === length) {
            target = this;
            i--
        }

        for (; i < length; i++) {
            //只处理非空参数
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name]
                    try {
                        copy = options[name] //当options为VBS对象时报错
                    } catch (e) {
                        continue
                    }

                    // 防止环引用
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (SWZ.isPlainObject(copy) || (copyIsArray = SWZ.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false
                            clone = src && SWZ.isArray(src) ? src : []

                        } else {
                            clone = src && SWZ.isPlainObject(src) ? src : {}
                        }

                        target[name] = SWZ.extend(deep, clone, copy)
                    } else if (copy !== void 0) {
                        target[name] = copy
                    }
                }
            }
        }
        return target
    };
    /*****************/


    SWZ.prototype.init.prototype = SWZ.prototype;
    window.$ = SWZ;
})(window);