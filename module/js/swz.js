


(function(w,u){

    w.swz = function(){};
    var objectP = Object.prototype;
    var ohasOwn = objectP.hasOwnProperty;
    var serialize = objectP.toString;
    /***********javascript 底层补丁**************/
    if(!Array.isArray){
        Array.isArray = function(n){
            return objectP.toString.call(n) === "[object Array]";
        }
    }
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
        Object.keys = function (object) {
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
    /*****************过滤器**********************/
    var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
    var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
    var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
    var rsanitize = {
        a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
        img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
        form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
    }
    var rsurrogate = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
    var rnoalphanumeric = /([^\#-~| |!])/g;
    function camelize(target) {
        //提前判断，提高getStyle等的效率
        if (!target || target.indexOf("-") < 0 && target.indexOf("_") < 0) {
            return target
        }
        //转换为驼峰风格
        return target.replace(/[-_][^-_]/g, function(match) {
            return match.charAt(1).toUpperCase()
        })
    }
    function numberFormat(number, decimals, point, thousands) {
        //form http://phpjs.org/functions/number_format/
        //number	必需，要格式化的数字
        //decimals	可选，规定多少个小数位。
        //point	可选，规定用作小数点的字符串（默认为 . ）。
        //thousands	可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
        number = (number + '')
            .replace(/[^0-9+\-Ee.]/g, '')
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
            sep = thousands || ",",
            dec = point || ".",
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec)
                return '' + (Math.round(n * k) / k)
                    .toFixed(prec)
            }
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.')
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
        }
        if ((s[1] || '')
            .length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1)
                .join('0')
        }
        return s.join(dec)
    }

    var filters = swz.filters = {
        uppercase: function(str) {
            return str.toUpperCase()
        },
        lowercase: function(str) {
            return str.toLowerCase()
        },
        truncate: function(str, length, truncation) {
            //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
            length = length || 30
            truncation = typeof truncation === "string" ?  truncation : "..."
            return str.length > length ? str.slice(0, length - truncation.length) + truncation : String(str)
        },
        $filter: function(val) {
            for (var i = 1, n = arguments.length; i < n; i++) {
                var array = arguments[i]
                var fn = shiwz.filters[array[0]]
                if (typeof fn === "function") {
                    var arr = [val].concat(array.slice(1))
                    val = fn.apply(null, arr)
                }
            }
            return val
        },
        camelize: camelize,
        //https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
        //    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a>
        //    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
        //    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
        //    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
        //    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
        sanitize: function(str) {
            return str.replace(rscripts, "").replace(ropen, function(a, b) {
                var match = a.toLowerCase().match(/<(\w+)\s/)
                if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
                    var reg = rsanitize[match[1]]
                    if (reg) {
                        a = a.replace(reg, function(s, name, value) {
                            var quote = value.charAt(0)
                            return name + "=" + quote + "javascript:void(0)" + quote// jshint ignore:line
                        })
                    }
                }
                return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
            })
        },
        escape: function(str) {
            //将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt
            return String(str).
                replace(/&/g, '&amp;').
                replace(rsurrogate, function(value) {
                    var hi = value.charCodeAt(0)
                    var low = value.charCodeAt(1)
                    return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
                }).
                replace(rnoalphanumeric, function(value) {
                    return '&#' + value.charCodeAt(0) + ';'
                }).
                replace(/</g, '&lt;').
                replace(/>/g, '&gt;')
        },
        currency: function(amount, symbol, fractionSize) {
            return (symbol || "\uFFE5") + numberFormat(amount, isFinite(fractionSize) ? fractionSize : 2)
        },
        number: numberFormat
    };

    /*********DOM 封装***********/

    swz.fn = swz.prototype;
    w.$ = swz.fn;
    swz.init = function(el){
        /*id选择器*/
         var re = /^#/;
         if(re.test(el)){
              if(document.querySelector){
                 return  document.querySelector(el);
              }else{
                  return  document.getElementById(el);
              }
         }
        /*class 类选择器*/

    }
    swz.fn = swz.prototype = swz.init.prototype;
    $ = function (el) { //创建jQuery式的无new 实例化结构
        return new swz.init(el);
    }








































})(window,undefined);
