



(function(window, undefined) {
    function log() {
        if (window.console) {
            Function.apply.call(console.log, console, arguments)
        }
    }
    Function.prototype.bind = function (scope) {
        if (arguments.length < 2 && scope === void 0)
            return this
        var fn = this,
            argv = arguments
        return function () {
            var args = [],
                i
            for (i = 1; i < argv.length; i++)
                args.push(argv[i])
            for (i = 0; i < arguments.length; i++)
                args.push(arguments[i])
            return fn.apply(scope, args)
        }
    };
    var SWZ = function(selector, context) {
        return  new SWZ.prototype.init(selector,context);
    };
    /***********javascript 底层工具函数**************/
    var hasDontEnumBug = !({
            'toString': null
        }).propertyIsEnumerable('toString'),
        hasProtoEnumBug = (function () {
        }).propertyIsEnumerable('prototype'),
        dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
        ],
        dontEnumsLength = dontEnums.length;
    if (!Object.keys) {
        Object.keys = function (object) { //ecma262v5 15.2.3.14
            var theKeys = []
            var skipProto = hasProtoEnumBug && typeof object === "function"
            if (typeof object === "string" || (object && object.callee)) {
                for (var i = 0; i < object.length; ++i) {
                    theKeys.push(String(i))
                }
            } else {
                for (var name in object) {
                    if (!(skipProto && name === "prototype") && ohasOwn.call(object, name)) {
                        theKeys.push(String(name))
                    }
                }
            }

            if (hasDontEnumBug) {
                var ctor = object.constructor,
                    skipConstructor = ctor && ctor.prototype === object
                for (var j = 0; j < dontEnumsLength; j++) {
                    var dontEnum = dontEnums[j]
                    if (!(skipConstructor && dontEnum === "constructor") && ohasOwn.call(object, dontEnum)) {
                        theKeys.push(dontEnum)
                    }
                }
            }
            return theKeys
        }
    }
    SWZ.arrayToObject =  function (array, val) {
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
    var isIe678 = !-[1,];
    var W3C = window.dispatchEvent;
    var DOC = document;
    var root = DOC.documentElement;
    var rhtml = /<|&#?\w+;/;
    var swzFragment = DOC.createDocumentFragment();
    var rtagName = /<([\w:]+)/;  //取得其tagName
    var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
    var rcreate = W3C ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/ig;
    var rnest = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/ ;//需要处理套嵌关系的标签
    var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/;
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
    var scriptTypes = SWZ.arrayToObject(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"]);
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
        if(isIe678){
            if (!obj)
                return false;
            // 利用IE678 window == document为true,document == window竟然为false的神奇特性
            // 标准浏览器及IE9，IE10等使用 正则检测
            return obj == obj.document && obj.document != obj ;//jshint ignore:line
        }else{
            return rwindow.test(serialize.call(obj));
        }
    };
    /*验证是否是IE*/
    SWZ.IEVersion =  function () {
        if (window.VBArray) {
            var mode = document.documentMode;
            return mode ? mode : window.XMLHttpRequest ? 7 : 6
        } else {
            return NaN
        }
    };
    /*比较两个值是否相等*/
    SWZ.isEqual = Object.is || function (v1, v2) {
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2
        } else if (v1 !== v1) {
            return v2 !== v2
        } else {
            return v1 === v2
        }
    };
    /*取得目标的类型*/
    SWZ.type = function (obj) {
        if (obj == null) {
            return String(obj)
        }
        // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[serialize.call(obj)] || "object" :
            typeof obj
    };
    /*判断是否是一个纯对象(object),不是DOM对象，不是BOM对象，不是自定义类的实例*/
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
        var fragment = swzFragment.cloneNode(false);
        if (typeof html !== "string") {
            return fragment
        }
        if (!rhtml.test(html)) {
            fragment.appendChild(DOC.createTextNode(html));
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
    if (!"swz".trim) {
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
            return this.replace(rtrim, "")
        }
    }
    /*JSON 字符串 转 JSON 对象*/
    SWZ.parseJSON = window.JSON ? JSON.parse : function(data) {
        var rvalidchars = /^[\],:{}\s]*$/,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g
        if (typeof data === "string") {
            data = data.trim();
            if (data) {
                if (rvalidchars.test(data.replace(rvalidescape, "@")
                    .replace(rvalidtokens, "]")
                    .replace(rvalidbraces, ""))) {
                    return (new Function("return " + data))() // jshint ignore:line
                }
            }
        }
        return data
    };
    var meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };
    /*JSON 对象转 字符串*/
    SWZ.stringify = window.JSON && JSON.stringify || function(str) {
        return '"' + str.replace(/[\\\"\x00-\x1f]/g, function(a) {
            var str = meta[a];
            return typeof str === 'string' ? str :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"'
    };
    /*参数格式化*/
    SWZ.formatParams = function(data){
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    };
    /*jsonp 请求*/
    SWZ.jsonp =  function (options) {
        options = options || {};
        if (!options.url) {
            throw new Error("参数不合法");
        }
        /*默认名字为callback*/
        if(!options.jsonp){
            options.jsonp = "callback";
        }

        //创建 script 标签并加入到页面中
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        options.data[options.jsonp] = callbackName;
        var params = SWZ.formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            if(json){
                var res = SWZ.parseJSON(json);
                options.success && options.success(res);
            }
        };
        //发送请求
        oS.src = options.url + '?' + params;

        //超时处理
        if (options.timeout) {
            oS.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({ message: "超时" });
            }, options.timeout);
        }
    };

    /*ajax 封装*/
    SWZ.ajax = function(options){
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        if(options.dataType === "jsonp" ){
            SWZ.jsonp(options);
            return;
        }
        var params = SWZ.formatParams(options.data);

        //创建 - 非IE6
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //连接和发送
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
        var xhrSuccessStatus = {
            // File protocol always yields status code 0, assume 200
            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        };
        //接收第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log(xhr.status);
                var status = xhrSuccessStatus[xhr.status] || xhr.status;
                if (status >= 200 && status < 300 || status === 304) {
                    var res = SWZ.parseJSON(xhr.responseText);
                    options.success && options.success(res, xhr.status);
                } else {
                    var message = {
                        statusText : "error!",
                        status: xhr.status
                    };
                    options.fail && options.fail(message,xhr.status);
                }
            }
        };

    };
    /*得到工厂model*/
    SWZ.modelFactory = function(source){
        if (!source || source.nodeType > 0 || (source.$id && source.$events)) {
            return source
        }
        var names = Object.keys(source);
        /* jshint ignore:start */
        var $model = {};
        for(var i=0;i<names.length;i++){
            var val = source[name];
            $model[name] = val;
        }
        $model["fff"] = "334";
        return $model;
    };
    /*模块定义函数*/
    var VMODELS = SWZ.vmodels = {};
    SWZ.define =  function(id,factory){
        console.log("进入define方法")
        var $id = id.$id || id;
        if (!$id) {
            throw new Error("warning: vm必须指定$id");
        }
        var scope = {};
        factory(scope); //得到所有定义
       SWZ.vmodel = SWZ.modelFactory(scope);
       VMODELS.$id = $id;
       VMODELS.$model =  SWZ.vmodel;
       VMODELS.data =  SWZ.vmodel.data;
       SWZ.vmodels = VMODELS;
       factory(SWZ.vmodel);
       SWZ.defineProperty(SWZ.vmodels,"$model",function(){
            return   SWZ.vmodel;
        },function(){
            $model = SWZ.vmodel;
        });
        return  SWZ.vmodels;
    };

    /*检测 DOM 结构是否加载完成*/
    SWZ.ready  =  function(readyFn){
        //非IE浏览器
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                readyFn && readyFn();
            }, false);
        } else {
            //方案1和2哪个快用哪一个
            var bReady = false;
            //方案1
            document.attachEvent('onreadystatechange', function () {
                if (bReady) {
                    return;
                }
                if (document.readyState == 'complete' || document.readyState == "interactive") {
                    bReady = true;
                    readyFn && readyFn();
                }
            });
            //方案2
            //判断当前页是否被放在了iframe里
            if (!window.frameElement) {
                setTimeout(checkDoScroll, 1);
            }
            function checkDoScroll() {
                try {
                    document.documentElement.doScroll("left");
                    if (bReady) {
                        return;
                    }
                    bReady = true;
                    readyFn && readyFn();
                }
                catch (e) {
                    // 不断检查 doScroll 是否可用 - DOM结构是否加载完成
                    setTimeout(checkDoScroll, 1);
                }
            }
        }
    };
    /********SWZ扩展************/
    SWZ.extend  = function () {
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
        if (typeof target !== "object" && !SWZ.isFunction(target)) {
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
    /*封装对数组操作*/
    var rnative = /\[native code\]/; //判定是否原生函数
    function iterator(vars, body, ret) {
        var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' + body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') + '}' + ret
        return Function("fn,scope", fun)
    }
    var generateID = function (prefix) {
        prefix = prefix || "SWZ";
        return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
    };
    if (!rnative.test([].map)) {
        SWZ.extend(ap, {
            //定位操作，返回数组中第一个等于给定参数的元素的索引值。
            indexOf: function (item, index) {
                var n = this.length,
                    i = ~~index
                if (i < 0)
                    i += n
                for (; i < n; i++)
                    if (this[i] === item)
                        return i
                return -1
            },
            //定位操作，同上，不过是从后遍历。
            lastIndexOf: function (item, index) {
                var n = this.length,
                    i = index == null ? n - 1 : index
                if (i < 0)
                    i = Math.max(0, n + i)
                for (; i >= 0; i--)
                    if (this[i] === item)
                        return i
                return -1
            },
            //迭代操作，将数组的元素挨个儿传入一个函数中执行。Prototype.js的对应名字为each。
            forEach: iterator("", '_', ""),
            //迭代类 在数组中的每个项上运行一个函数，如果此函数的值为真，则此元素作为新数组的元素收集起来，并返回新数组
            filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
            //收集操作，将数组的元素挨个儿传入一个函数中执行，然后把它们的返回值组成一个新数组返回。Prototype.js的对应名字为collect。
            map: iterator('r=[],', 'r[i]=_', 'return r'),
            //只要数组中有一个元素满足条件（放进给定函数返回true），那么它就返回true。Prototype.js的对应名字为any。
            some: iterator("", 'if(_)return true', 'return false'),
            //只有数组中的元素都满足条件（放进给定函数返回true），它才返回true。Prototype.js的对应名字为all。
            every: iterator("", 'if(!_)return false', 'return true')
        })
    }
//===================修复浏览器对Object.defineProperties的支持=================
    //一些不需要被监听的属性
    var expose = new Date() - 0;
    var $$skipArray = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$reinitialize").match(rword);
    var defineProperty = Object.defineProperty;
    var canHideOwn = true;
    //如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
    //标准浏览器使用__defineGetter__, __defineSetter__实现
    try {
        defineProperty({}, "_", {
            value: "x"
        })
        var defineProperties = Object.defineProperties
    } catch (e) {
        canHideOwn = false
    }
    if (!canHideOwn) {
        if ("__defineGetter__" in SWZ) {
            defineProperty = function (obj, prop, desc) {
                if ('value' in desc) {
                    obj[prop] = desc.value
                }
                if ("get" in desc) {
                    obj.__defineGetter__(prop, desc.get)
                }
                if ('set' in desc) {
                    obj.__defineSetter__(prop, desc.set)
                }
                return obj
            }
            defineProperties = function (obj, descs) {
                for (var prop in descs) {
                    if (descs.hasOwnProperty(prop)) {
                        defineProperty(obj, prop, descs[prop])
                    }
                }
                return obj
            }
        }
        if (SWZ.IEVersion()) {
            var VBClassPool = {}
            window.execScript([// jshint ignore:line
                "Function parseVB(code)",
                "\tExecuteGlobal(code)",
                "End Function" //转换一段文本为VB代码
            ].join("\n"), "VBScript")
            function VBMediator(instance, accessors, name, value) {// jshint ignore:line
                var accessor = accessors[name]
                if (arguments.length === 4) {
                    accessor.call(instance, value)
                } else {
                    return accessor.call(instance)
                }
            }
            defineProperties = function (name, accessors, properties) {
                // jshint ignore:line
                var buffer = []
                buffer.push(
                    "\r\n\tPrivate [__data__], [__proxy__]",
                    "\tPublic Default Function [__const__](d"+expose+", p"+expose+")",
                    "\t\tSet [__data__] = d"+expose+": set [__proxy__] = p"+expose,
                    "\t\tSet [__const__] = Me", //链式调用
                    "\tEnd Function")
                //添加普通属性,因为VBScript对象不能像JS那样随意增删属性，必须在这里预先定义好
                for (name in properties) {
                    if (!accessors.hasOwnProperty(name)) {
                        buffer.push("\tPublic [" + name + "]")
                    }
                }
                $$skipArray.forEach(function (name) {
                    if (!accessors.hasOwnProperty(name)) {
                        buffer.push("\tPublic [" + name + "]")
                    }
                });
                buffer.push("\tPublic [" + 'hasOwnProperty' + "]")
                //添加访问器属性
                for (name in accessors) {
                    buffer.push(
                        //由于不知对方会传入什么,因此set, let都用上
                        "\tPublic Property Let [" + name + "](val" + expose + ")", //setter
                        "\t\tCall [__proxy__](Me,[__data__], \"" + name + "\", val" + expose + ")",
                        "\tEnd Property",
                        "\tPublic Property Set [" + name + "](val" + expose + ")", //setter
                        "\t\tCall [__proxy__](Me,[__data__], \"" + name + "\", val" + expose + ")",
                        "\tEnd Property",
                        "\tPublic Property Get [" + name + "]", //getter
                        "\tOn Error Resume Next", //必须优先使用set语句,否则它会误将数组当字符串返回
                        "\t\tSet[" + name + "] = [__proxy__](Me,[__data__],\"" + name + "\")",
                        "\tIf Err.Number <> 0 Then",
                        "\t\t[" + name + "] = [__proxy__](Me,[__data__],\"" + name + "\")",
                        "\tEnd If",
                        "\tOn Error Goto 0",
                        "\tEnd Property")

                }

                buffer.push("End Class")
                var body = buffer.join("\r\n")
                var className =VBClassPool[body]
                if (!className) {
                    className = generateID("VBClass")
                    window.parseVB("Class " + className + body)
                    window.parseVB([
                        "Function " + className + "Factory(a, b)", //创建实例并传入两个关键的参数
                        "\tDim o",
                        "\tSet o = (New " + className + ")(a, b)",
                        "\tSet " + className + "Factory = o",
                        "End Function"
                    ].join("\r\n"))
                    VBClassPool[body] = className
                }
                var ret = window[className + "Factory"](accessors, VBMediator) //得到其产品
                return ret //得到其产品
            }
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
            }else if(selector === document){
                that.ready = SWZ.ready;
            }
            that.text = this.text;
            that.html = this.html;
            that.attr = this.attr;
            that.css = this.css;
            that.getClass = this.getClass;
            that.hasClass = this.hasClass;
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
          var text = "";
          if(this.textContent){
              text = this.textContent;
          }else{
              text = this.innerText;
          }
           return text;
        },
        attr:function(name,value){
            if (arguments.length === 2) {
                name == 'class'? this.className = value :this.setAttribute(name, value);
                return this
            } else {
                return  name == 'class'? this.className:this.getAttribute(name);
            }
        },
        css:function(obj,value){
            if(arguments.length === 2){
                this.style[obj]= value;
            }else{
               for(var key in obj){
                   this.style[key] = obj[key];
               }
            }
        },
        getClass:function(){
            if(this.className){
                return this.className;
            }else{
                return this.getAttribute && this.getAttribute( "class" ) || "";
            }
        },
        hasClass:function(selector){
            if(this.nodeType === 1){
                var classStr = this.getClass();
                if(classStr.indexOf(selector) > -1){
                    return true;
                }
            }
            return false;
        },
        addClass:function(value){
            if ( typeof value === "string" && value ) {
                var classStr = this.getClass();
                var classList = this.getClass().split(/\s+/);
                if(classStr.indexOf(value) <= -1){
                    classList.push(value);
                }
                this.attr("class",classList.join(" "))
            }
            return this;
        },
        removeClass:function(value){
            if ( typeof value === "string" && value ) {
                var classStr = this.getClass();
                var classList = this.getClass().split(/\s+/);
                if(classStr.indexOf(value) > -1){
                    classList.splice(value, 1);
                }
                this.attr("class",classList.join(" "));
            }
            return this;
        },
        val:function(value){
            var val,get;
            if (this && this.nodeType === 1) {
                get = arguments.length === 0;
                if(get){
                    var roption = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i;
                    if(SWZ.IEVersion()){
                         roption.test(this.outerHTML) ? val = this.value : val = this.text.trim();
                    }else{
                        val =  this.value;
                    }
                }else{
                    this.value = value;
                }
            }
            return  get ? val : this;
        },
        prepend:function(dom){
            if(typeof  dom === "string"){
                var target = SWZ.manipulationTarget( this,  SWZ.parseHTML(dom) );
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

    /***********事件系统****************/
    var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/;
    var events = SWZ.arrayToObject("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit");
    SWZ.fixEvent =  function(event){
        var ret = {};
        for (var i in event) {
            ret[i] = event[i];
        }
        var target = ret.target = event.srcElement;
        if (event.type.indexOf("key") === 0) {
            ret.which = event.charCode != null ? event.charCode : event.keyCode
        } else if (rmouseEvent.test(event.type)) {
            var doc = target.ownerDocument || DOC;
            var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement;
            ret.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0);
            ret.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0);
            ret.wheelDeltaY = ret.wheelDelta;
            ret.wheelDeltaX = 0
        }
        ret.timeStamp = new Date() - 0;
        ret.originalEvent = event;
        ret.preventDefault = function () { //阻止默认行为
            event.returnValue = false
        };
        ret.stopPropagation = function () { //阻止事件在DOM树中的传播
            event.cancelBubble = true
        };
        return ret
    };

    SWZ.bind =  function(el, type, fn, phase) {
        var callback = W3C ? fn : function(e) {
            fn.call(el, SWZ.fixEvent(e));
        };
        if (W3C) {
            el.addEventListener(type, callback, !!phase)
        } else {
            el.attachEvent("on" + type, callback)
        }
        return callback
    };
    SWZ.unbind =  function(el, type, fn, phase) {
        var callback = W3C ? fn : function(e) {
            fn.call(el, SWZ.fixEvent(e));
        };
        if (W3C) {
            el.addEventListener(type, callback, !!phase)
        } else {
            el.attachEvent("on" + type, callback)
        }
        return callback
    };
    /*监听事件*/
    SWZ.$watch = function(){


    };

    /*********扫描系统********/
    SWZ.createSignalTower = function(elem, vmodel) {
        var id = elem.getAttribute("avalonctrl") || vmodel.$id
        elem.setAttribute("avalonctrl", id);
        vmodel.$events.expr = elem.tagName + '[avalonctrl="' + id + '"]';
    };
    SWZ.scan = function(elem, vmodel) {
        elem = elem || root;
        var vmodels = vmodel ? [].concat(vmodel) : [];
        SWZ.scanTag(elem, vmodels);
    };
    var ngAttr = /ng-(\w+)-?(.*)/;
    /*扫描主要标签*/
    SWZ.scanTag = function(elem, vmodels){
        var c = elem.getAttributeNode("ng-controller");
        var re = elem.getAttributeNode("ng-repeat");
        if(c){
            var node = c;
            var newVmodel = SWZ.vmodels;
            if (!newVmodel) {
                return
            }
            vmodels =  [newVmodel].concat(vmodels);
            var name = node.name;
            elem.removeAttribute(name); //removeAttributeNode不会刷新[ng-controller]样式规则
            SWZ(elem).removeClass(name);
          //  SWZ.createSignalTower(elem, vmodel);
        }
        if(re){
            if(!SWZ.binding){
                SWZ.scanRepeat(elem,vmodels,re);
            }

        }else{
            SWZ.scanAttr(elem, vmodels); //扫描特性节点
        }


    };
    var textRxp = /^({{)(\w+)(\.)(\w+)(}})$/g;
    /*ng-repeat 循环渲染数据实现*/
    SWZ.scanRepeat = function(elem,vmodels,re){
        var nodes = elem.childNodes;
        var tag, nodeText;
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].nodeType === 1){
                tag = nodes[i];
            }
        }
        for(var i=0;i<vmodels.length;i++){
            var model = vmodels[i].$model;
            for(var j in model){
                if(SWZ.isArray(model[j])){
                    var repeatArr = model[j];
                    var tagHtml = tag.innerHTML.trim();
                    if(textRxp.test(tagHtml)){
                        nodeText = tagHtml.replace(textRxp,"$4");
                    }
                    elem.innerHTML = "";
                    /*遍历ng-repeat数组*/
                    for(var r =0; r<repeatArr.length; r++){
                        var obj = repeatArr[r];
                        var newTag = tag.cloneNode();
                        /*绑定文本节点*/
                        for(var m in obj){
                            if(m == nodeText){
                                newTag.innerHTML = obj[m];
                            }
                        }
                        /*绑定属性节点*/
                        var attrs = newTag.attributes;
                        for(var m in obj){
                            for(var i=0;i<attrs.length;i++){
                                if(textRxp.test(attrs[i].nodeValue)){
                                    var attrV =  attrs[i].nodeValue.trim().replace(textRxp,"$4");
                                    if(m == attrV){
                                        attrs[i].nodeValue = obj[m];
                                    }
                                }
                            }
                        }
                        //console.log(newTag)
                        elem.appendChild(newTag);
                     }
                }
            }
        }
    };
    /*对ng 事件进行绑定*/
    SWZ.bindNgEvent = function(elem, vmodels,attr,ngName){
        if(SWZ.binding){
            return;
        }
        var argsExp = /(\w+)\(([\w\$\s,'']*)\)$/g;
        for(var i=0;i<vmodels.length;i++){
            var model = vmodels[i].$model;
            for(var m in model){
                var bindName = attr.value.replace(argsExp,"$1");
                if(m == bindName){
                    var args = attr.value.replace(argsExp,"$2").replace(/['']+/g,"");
                    if(args.split(",").length>1){
                        var fn = model[m];
                        var callback = function(e) {
                            fn.apply(this, args.split(",").concat(e));
                            /*重新扫描节点*/
                            SWZ.binding = true;
                            SWZ.scan(DOC.body,SWZ.vmodels);
                        };
                        SWZ.bind(elem,ngName,callback);
                    }else{
                        var fn = model[m];
                        var callback = function(e) {
                            fn.apply(this);
                            /*重新扫描节点*/
                            SWZ.binding = true;
                            SWZ.scan(DOC.body,SWZ.vmodels);
                        };
                        SWZ.bind(elem,ngName,callback);
                    }
                }
            }
        }
    };
    /*对Object.defineProperty() 重写*/
    SWZ.defineProperty = function(obj,name,getCallback,setCallback){
         if(Object.defineProperty){
             if(SWZ.IEVersion()){
                 if(SWZ.IEVersion()>=9){
                     return  Object.defineProperty(obj,name,{
                         get:getCallback,
                         set:setCallback
                     })
                 }else{
                     return  defineProperties( name,obj,{
                         get:getCallback,
                         set:setCallback
                     })
                 }
             }else{
                 return  Object.defineProperty(obj,name,{
                     get:getCallback,
                     set:setCallback
                 })
             }
         }else{
             return  defineProperties( name,obj,{
                 get:getCallback,
                 set:setCallback
             })
         }
    };
    /*对 input 标签进行双工绑定*/
    SWZ.duplex =  function(elem, vmodels,attr,ngName){
        for(var i=0;i<vmodels.length;i++){
            var model = vmodels[i].$model;
            for(var m in model){
                /*ng-duplex 双工绑定*/
                if(m == attr.nodeValue){
                    elem.value = model[m];
                    SWZ.defineProperty(vmodels[i].$model, m, function(){
                        return elem.value;
                    },function(){
                        elem.value = model[m];
                    });
                }
                /*回调函数传递*/
                if( elem.getAttribute("data-duplex-changed") && (elem.getAttribute("data-duplex-changed") == m)){
                    var fn = model[m];
                    var callback = function(e) {
                        SWZ.vmodel = model;
                        return fn.call(this, elem.value);
                    };
                    SWZ.bind(elem,"input",callback);
                }
            }
        }

    };
    /*显示隐藏指令*/
    SWZ.visible = function(elem, vmodels,attr,ngName){
        for(var i=0;i<vmodels.length;i++){
            var model = vmodels[i].$model;
            for(var m in model){
                if(m == attr.nodeValue){
                     if(model[m]){
                         elem.style.display = "block";
                     }else{
                         elem.style.display = "none";
                    }
                }
            }
        }
    };
    /*扫描特性节点*/
    SWZ.scanAttr = function(elem, vmodels,re){
        if (vmodels.length) {
            var attrs = elem.attributes;
            for(var i=0;i<attrs.length;i++){
                var ngName = attrs[i].name.replace(ngAttr,"$1");
                if(events[ngName]){
                    /*对ng 事件进行绑定*/
                    if(!SWZ.binding){
                        SWZ.binding = false;
                    }
                    SWZ.bindNgEvent(elem, vmodels,attrs[i],ngName);
                }
                if(ngName === "duplex"){
                    /*双工绑定*/
                    SWZ.duplex(elem, vmodels,attrs[i],ngName);
                }
                if(ngName === "visible"){
                    /*显示隐藏指令*/
                    SWZ.visible(elem, vmodels,attrs[i],ngName);
                }
            }
        }
        var stopScan = SWZ.arrayToObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase());
        if(!stopScan[elem.tagName]){
            /*扫描子孙元素*/
            SWZ.scanNodeList(elem, vmodels,re);
        }
    };
    var  rexpr = /[-.*+?^${}()|[\]\/\\]/g;
    var  openTag = /[-.*+?^${}()|[\]\/\\]/g;
    var  closeTag = /[-.*+?^${}()|[\]\/\\]/g;
    /*扫描子孙元素*/
    SWZ.scanNodeList = function(elem, vmodels){
       var nodes = elem.childNodes;
        for(var i=0;i<nodes.length;i++){
            switch (nodes[i].nodeType) {
                case 1:
                     SWZ.scanTag(nodes[i], vmodels) //扫描元素节点
                    break;
                case 3:
                    if(rexpr.test(nodes[i].nodeValue)){
                        SWZ.scanText(nodes[i], vmodels); //扫描文本节点
                    }
                    break;
            }
        }
    };
   /**/
    SWZ.scanExpr = function(str){
            var tokens = [],
                value, start = 0,
                stop
            do {
                stop = str.indexOf(openTag, start);
                if (stop === -1) {
                    break
                }
                value = str.slice(start, stop);
                if (value) { // {{ 左边的文本
                    tokens.push({
                        value: value,
                        filters: "",
                        expr: false
                    })
                }
                start = stop + openTag.length;
                stop = str.indexOf(closeTag, start);
                if (stop === -1) {
                    break
                }
                value = str.slice(start, stop);
                if (value) { //处理{{ }}插值表达式
                    tokens.push(SWZ.getToken(value, start))
                }
                start = stop + closeTag.length;
            } while (1)
            value = str.slice(start);
            if (value) { //}} 右边的文本
                tokens.push({
                    value: value,
                    expr: false,
                    filters: ""
                })
            }
            return tokens
    };
   SWZ.getToken = function(value){
       var rhasHtml = /\|\s*html(?:\b|$)/,
           r11a = /\|\|/g,
           rlt = /&lt;/g,
           rgt = /&gt;/g,
           rstringLiteral = /(['"])(\\\1|.)+?\1/g
           if (value.indexOf("|") > 0) {
               var scapegoat = value.replace(rstringLiteral, function (_) {
                   return Array(_.length + 1).join("1")// jshint ignore:line
               })
               var index = scapegoat.replace(r11a, "\u1122\u3344").indexOf("|") //干掉所有短路或
               if (index > -1) {
                   return {
                       filters: value.slice(index),
                       value: value.slice(0, index),
                       expr: true
                   }
               }
           }
           return {
               value: value,
               filters: "",
               expr: true
           }

   };
    /*扫描文本节点*/
    SWZ.scanText = function(elem, vmodels){
      var roneTime = /^\s*::/;
      var rhasHtml = /\|\s*html(?:\b|$)/;
      var textRxp2 = /^({{)(\w+)(}})$/g;
      var   tokens = SWZ.scanExpr(elem.nodeValue);
       var bindings = [];
        if (tokens.length) {
            for (var i = 0; token = tokens[i++]; ) {
                var node = DOC.createTextNode(token.value) //将文本转换为文本节点，并替换原来的文本节点
                if (token.expr) {
                    token.value = token.value.replace(roneTime, function () {
                        token.oneTime = true
                        return ""
                    })// jshint ignore:line
                    token.type = "text";
                    token.element = node;
                    token.filters = token.filters.replace(rhasHtml, function (a, b,c) {
                        token.type = "html";
                        return ""
                    });// jshint ignore:line
                    token.pos = index * 1000 + i;
                    bindings.push(token);//收集带有插值表达式的文本
                }
                swzFragment.appendChild(node)
            }
           // elem.parentNode.replaceChild(swzFragment, elem);
        }
        var nodeV = elem.nodeValue.trim().replace(textRxp2,"$2");
        /*赋值操作*/
        for(var i=0;i<vmodels.length;i++){
            var model = vmodels[i].$model;
            for(var j in model){
                if(j === nodeV){
                    elem.nodeValue = model[j];
                }
            }
        }
    };

    SWZ(document).ready(function(){
        console.log("进入ready 方法")
        SWZ.scan(DOC.body);
    });


    SWZ.prototype.init.prototype = SWZ.prototype;
    window.$ = SWZ;
})(window);