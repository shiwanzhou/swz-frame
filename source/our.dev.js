/*!
 * OurJS
 *  sundongguo
 *  http://s79.github.com/OurJS/
 *  2014-01-06
 *  Released under the MIT License.
 */
/**
 * @fileOverview JavaScript 原生对象补缺及扩展
 * @version 20131211
 * @author: sundongguo@gmail.com
 */
(function(window) {
//==================================================[ES6 补缺]
  /*
   * 添加 ES6 中引入的部分常用方法。
   *
   * 补缺方法：
   *   String.prototype.repeat
   *   String.prototype.startsWith
   *   String.prototype.endsWith
   *   String.prototype.contains
   *   String.prototype.toArray
   *   Number.isFinite
   *   Number.isNaN
   *   Number.isInteger
   *   Number.toInteger
   *
   * 参考：
   *   http://wiki.ecmascript.org/doku.php?id=harmony:harmony
   */

//--------------------------------------------------[String.prototype.repeat]
  /**
   * 将字符串重复指定的次数。
   * @name String.prototype.repeat
   * @function
   * @param {number} count 要重复的次数。
   * @returns {string} 重复指定次数后的字符串。
   * @example
   *   '*'.repeat(5);
   *   // '*****'
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:string.prototype.repeat
   */
  String.prototype.repeat = function(count) {
    count = Number.toInteger(count);
    var result = '';
    while (count--) {
      result += this;
    }
    return result;
  };

//--------------------------------------------------[String.prototype.startsWith]
  /**
   * 检查字符串是否以指定的子串开始。
   * @name String.prototype.startsWith
   * @function
   * @param {string} substring 指定的子串。
   * @returns {boolean} 检查结果。
   * @example
   *   'abcdefg'.startsWith('a');
   *   // true
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
   */
  String.prototype.startsWith = function(substring) {
    return this.indexOf(substring) === 0;
  };

//--------------------------------------------------[String.prototype.endsWith]
  /**
   * 检查字符串是否以指定的子串结束。
   * @name String.prototype.endsWith
   * @function
   * @param {string} substring 指定的子串。
   * @returns {boolean} 检查结果。
   * @example
   *   'abcdefg'.endsWith('a');
   *   // false
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
   */
  String.prototype.endsWith = function(substring) {
    var lastIndex = this.lastIndexOf(substring);
    return lastIndex >= 0 && lastIndex === this.length - substring.length;
  };

//--------------------------------------------------[String.prototype.contains]
  /**
   * 检查字符串是否包含指定的子串。
   * @name String.prototype.contains
   * @function
   * @param {string} substring 指定的子串。
   * @returns {boolean} 检查结果。
   * @example
   *   'abcdefg'.contains('cd');
   *   // true
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
   */
  String.prototype.contains = function(substring) {
    return this.indexOf(substring) !== -1;
  };

//--------------------------------------------------[String.prototype.toArray]
  /**
   * 将字符串转化为数组。
   * @name String.prototype.toArray
   * @function
   * @returns {Array} 从字符串转化的数组。
   * @example
   *   'abcdefg'.toArray();
   *   // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
   */
  String.prototype.toArray = function() {
    return this.split('');
  };

//--------------------------------------------------[Number.isFinite]
  /**
   * 检查提供的值是否为有限的数字。
   * @name Number.isFinite
   * @function
   * @param {*} value 提供的值。
   * @returns {boolean} 检查结果。
   * @example
   *   isFinite(null);
   *   // true
   *   Number.isFinite(null);
   *   // false
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:number.isfinite
   */
  Number.isFinite = function(value) {
    return typeof value === 'number' && isFinite(value);
  };

//--------------------------------------------------[Number.isNaN]
  /**
   * 检查提供的值是否为非数字。
   * @name Number.isNaN
   * @function
   * @param {*} value 提供的值。
   * @returns {boolean} 检查结果。
   * @example
   *   isNaN(undefined);
   *   // true
   *   Number.isNaN(undefined);
   *   // false
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:number.isnan
   */
  Number.isNaN = function(value) {
    return typeof value === 'number' && isNaN(value);
  };

//--------------------------------------------------[Number.isInteger]
  /**
   * 检查提供的值是否为 IEEE-754 双精度整数。
   * @name Number.isInteger
   * @function
   * @param {*} value 提供的值。
   * @returns {boolean} 检查结果。
   * @description
   *   取值范围在 ±Math.pow(2, 53) 之间。
   * @example
   *   Number.isInteger(9007199254740992);
   *   // false
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger
   */
  Number.isInteger = function(value) {
    return Number.isFinite(value) && Math.floor(value) === value && value > -9007199254740992 && value < 9007199254740992;
  };

//--------------------------------------------------[Number.toInteger]
  /**
   * 将提供的值转化为整数。
   * @name Number.toInteger
   * @function
   * @param {*} value 提供的值。
   * @returns {number} 转化结果。
   * @example
   *   Number.toInteger([10.75]);
   *   // 10
   *   Number.toInteger('10px');
   *   // 0
   * @see http://es5.github.com/#x9.4
   * @see http://wiki.ecmascript.org/doku.php?id=harmony:number.tointeger
   */
  Number.toInteger = function(value) {
    value = +value || 0;
    value = Math[value < 0 ? 'ceil' : 'floor'](value);
    return value;
  };

//==================================================[自定义扩展]
  /*
   * 其他自定义的扩展方法。
   *
   * 扩展方法：
   *   typeOf
   *   Object.forEach
   *   Object.clone
   *   Object.mixin
   *   Object.toQueryString
   *   Object.fromQueryString
   *   Array.from
   *   Array.prototype.shuffle
   *   Array.prototype.contains
   *   Array.prototype.remove
   *   Array.prototype.getFirst
   *   Array.prototype.getLast
   *   String.prototype.clean
   *   String.prototype.camelize
   *   String.prototype.dasherize
   *   Number.prototype.padZero
   *   Math.limit
   *   Math.randomRange
   *   Date.parseExact
   *   Date.prototype.format
   *   RegExp.escape
   */

  /**
   * 全局对象。
   * @name Global
   * @namespace
   */

  // 将字符串中的单词分隔符压缩或转换为一个空格字符。
  var reWordSeparators = /(-|_)+/g;
  var reCamelizedLetters = /[^A-Z\s]([A-Z])|[A-Z][^A-Z\s]/g;
  var segmentWords = function(string) {
    return string
        .replace(reWordSeparators, ' ')
        .replace(reCamelizedLetters, function(letters, capitalLetterInTheBack) {
          return capitalLetterInTheBack ? letters.charAt(0) + ' ' + letters.charAt(1) : ' ' + letters;
        })
        .clean()
        .split(' ');
  };

  // 日期标识符。
  var reDateFormat = /YYYY|MM|DD|hh|mm|ss|s|TZD/g;

//--------------------------------------------------[typeOf]
  /**
   * 判断提供的值的数据类型，比 typeof 运算符返回的结果更明确（将对结果为 'object' 的情况进行更细致的区分）。
   * @name typeOf
   * @memberOf Global
   * @function
   * @param {*} value 要判断的值。
   * @returns {string} 值的类型，可能为以下几种情况之一：
   *   undefined
   *   boolean
   *   number
   *   string
   *   function
   *   null
   *   object.Boolean
   *   object.Number
   *   object.String
   *   object.Array
   *   object.Date
   *   object.RegExp
   *   object.Error
   *   object.Math
   *   object.JSON
   *   object.Arguments
   *   object.Global
   *   object.Node
   *   object.Collection
   *   object.Object
   * @description
   *   特殊情况：
   *   在 IE11- 中 SELECT.options === SELECT 为 true，因此 SELECT.options 将得到 'object.Node'，而不是预期的 'object.Collection'。
   * @example
   *   typeOf(document);
   *   // 'object.Node'
   * @see http://mootools.net/
   * @see http://jquery.com/
   */
  var types = {};
  ['Boolean', 'Number', 'String', 'Array', 'Date', 'RegExp', 'Error', 'Math', 'JSON', 'Arguments'].forEach(function(type) {
    types['[object ' + type + ']'] = 'object.' + type;
  });
  var toString = Object.prototype.toString;
  var reNativeFunction = /^\s+function .+\s+\[native code\]\s+\}\s+$/;
  window.typeOf = function(value) {
    var type = typeof value;
    if (type === 'function' && typeof value.item === 'function') {
      // Safari 中类型为 HTMLCollection 的值 type === 'function'。
      type = 'object.Collection';
    } else if (type === 'object') {
      // 进一步判断 type === 'object' 的情况。
      if (value === null) {
        type = 'null';
      } else {
        // 使用 Object.prototype.toString 判断。
        type = types[toString.call(value)] || 'object.Object';
        if (type === 'object.Object') {
          // 转化为字符串判断。
          var string = String(value);
          if (string === '[object Window]' || string === '[object DOMWindow]') {
            type = 'object.Global';
          } else if (string === '[object JSON]') {
            type = 'object.JSON';
          } else if (reNativeFunction.test(string)) {
            type = 'function';
          } else {
            // 使用特性判断。
            if ('nodeType' in value) {
              type = 'object.Node';
            } else if (typeof value.length === 'number') {
              if ('navigator' in value) {
                type = 'object.Global';
              } else if ('item' in value) {
                type = 'object.Collection';
              } else if ('callee' in value) {
                type = 'object.Arguments';
              }
            }
          }
        }
      }
    }
    return type;
  };

//--------------------------------------------------[Object.forEach]
  /**
   * 遍历一个对象。
   * @name Object.forEach
   * @function
   * @param {Object} object 要遍历的对象。
   * @param {Function} callback 用来遍历的函数，参数为 value，key，object。
   * @param {Object} [thisArg] callback 被调用时 this 的值。
   */
  Object.forEach = function(object, callback, thisArg) {
    Object.keys(object).forEach(function(key) {
      callback.call(thisArg, object[key], key, object);
    });
  };

//--------------------------------------------------[Object.clone]
  /**
   * 克隆一个对象。
   * @name Object.clone
   * @function
   * @param {Object} source 原始对象。
   * @param {boolean} [recursively] 是否进行深克隆。
   * @returns {Object} 克隆对象。
   * @description
   *   实例关系和原型链都不会被克隆。
   *   一些类型的值是无法被克隆的，当尝试克隆它们时，会抛出异常，它们是 (传入 typeOf 方法后返回的值)：
   *   <ul>
   *     <li>function</li>
   *     <li>object.Error</li>
   *     <li>object.Math</li>
   *     <li>object.JSON</li>
   *     <li>object.Arguments</li>
   *     <li>object.Global</li>
   *     <li>object.Node</li>
   *     <li>object.Collection</li>
   *   </ul>
   *   如果成功对一个对象进行深克隆，则对克隆对象的任何操作都不会影响原始对象。
   */
  Object.clone = function(source, recursively) {
    var cloning;
    var type = typeOf(source);
    switch (type) {
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
      case 'null':
        cloning = source;
        break;
      case 'object.Boolean':
      case 'object.Number':
      case 'object.String':
      case 'object.Date':
      case 'object.RegExp':
        cloning = new source.constructor(source.valueOf());
      case 'object.Array':
        if (!cloning) {
          cloning = [];
        }
      case 'object.Object':
        if (!cloning) {
          cloning = {};
        }
        Object.forEach(source, function(value, key) {
          cloning[key] = recursively ? Object.clone(value, true) : value;
        });
        break;
      default:
        throw new TypeError('Object.clone called on no-cloning type: ' + type);
    }
    return cloning;
  };

//--------------------------------------------------[Object.mixin]
  /**
   * 将目标对象（不包含原型链）上的 properties 添加到源对象中。
   * @name Object.mixin
   * @function
   * @param {Object} source 源对象。
   * @param {Object} destination 目标对象，其 properties 会被复制到 source 中。
   * @param {Object} [filter] 过滤要添加的 destination 中的 properties 的名单。
   * @param {Array} [filter.whiteList] 仅当 destination 中的 key 包含于 whiteList 时，对应的 property 才会被复制到 source 中。
   * @param {Array} [filter.blackList] 如果 destination 中的 key 包含于 blackList，则对应的 property 不会被复制到 source 中。
   *   如果 blackList 与 whiteList 有重复的值，则 whiteList 中的将被忽略。
   * @returns {Object} 源对象。
   * @description
   *   destination 中的 property 会覆盖 source 中的同名 property。
   *   <table>
   *     <tr><th>source (before)</th><th>destination</th><th>source (after)</th></tr>
   *     <tr><td>a: 0</td><td></td><td>a: 0</td></tr>
   *     <tr><td>b: 0</td><td>b: 1</td><td>b: 1</td></tr>
   *     <tr><td></td><td>c: 1</td><td>c: 1</td></tr>
   *   </table>
   * @example
   *   Object.mixin({a: 0}, {b: 1});
   *   // {a: 0, b: 1}
   * @example
   *   Object.mixin({a: 0, b: 0}, {a: 1, b: 1}, {whiteList: ['a']});
   *   // {a: 1, b: 0}
   *   Object.mixin({a: 0, b: 0}, {a: 1, b: 1}, {whiteList: ['a', 'b'], blackList: ['a']});
   *   // {a: 0, b: 1}
   */
  Object.mixin = function(source, destination, filter) {
    var keys = Object.keys(destination);
    if (filter) {
      var whiteList = filter.whiteList;
      var blackList = filter.blackList;
      if (whiteList) {
        keys = keys.filter(function(item) {
          return whiteList.contains(item);
        });
      }
      if (blackList) {
        keys = keys.filter(function(item) {
          return !blackList.contains(item);
        });
      }
    }
    keys.forEach(function(item) {
      source[item] = destination[item];
    });
    return source;
  };

//--------------------------------------------------[Object.toQueryString]
  /**
   * 将一个对象转换为用于 HTTP 传输的查询字符串。
   * @name Object.toQueryString
   * @function
   * @param {Object} object 要转换的对象，该对象的每个属性名和属性值都将以键值对的形式被转换为字符串。
   *   如果某个属性值为 undefined 或 null，则忽略该属性。
   *   如果某个属性值为数组，则表示其对应的属性名有多个有效值。
   * @param {boolean} [dontEncode] 转换时不使用 encodeURIComponent 编码。
   * @returns {string} 转换后的字符串。
   * @example
   *   Object.toQueryString({a: undefined, b: null, c: '', d: 100, e: ['Composite Value', true]});
   *   // "c=&d=100&e=Composite%20Value&e=true"
   */
  Object.toQueryString = function(object, dontEncode) {
    var valuePairs = [];
    var parseValuePair = function(key, value) {
      if (value != null) {
        valuePairs.push(dontEncode ? key + '=' + value : encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    };
    Object.forEach(object, function(value, key) {
      if (Array.isArray(value)) {
        value.forEach(function(value) {
          parseValuePair(key, value);
        });
      } else {
        parseValuePair(key, value);
      }
    });
    return valuePairs.join('&');
  };

//--------------------------------------------------[Object.fromQueryString]
  /**
   * 将一个用于 HTTP 传输的查询字符串转换为对象。
   * @name Object.fromQueryString
   * @function
   * @param {string} string 要转换的查询字符串。
   * @param {boolean} [dontDecode] 转换时不使用 decodeURIComponent 解码。
   * @returns {Object} 转换后的对象。
   * @example
   *   Object.fromQueryString('c=&d=100&e=Composite%20Value&e=true');
   *   // {c: '', d: '100', e: ['Composite Value', 'true']}
   */
  Object.fromQueryString = function(string, dontDecode) {
    var object = {};
    string.split('&').forEach(function(item) {
      var valuePair = item.split('=');
      var key = valuePair[0];
      var value = valuePair[1];
      if (value !== undefined) {
        if (!dontDecode) {
          key = decodeURIComponent(key);
          value = decodeURIComponent(value);
        }
        if (object.hasOwnProperty(key)) {
          typeof object[key] === 'string' ? object[key] = [object[key], value] : object[key].push(value);
        } else {
          object[key] = value;
        }
      }
    });
    return object;
  };

//--------------------------------------------------[Array.from]
  /**
   * 将一个值转化为数组。
   * @name Array.from
   * @function
   * @param {*} value 要转化为数组的值。
   *   如果该值为 undefined 或 null，则返回空数组。
   *   如果该值本身即为一个数组，则直接返回这个数组。
   *   如果该值有 toArray 方法，则返回调用该方法后的结果。
   *   如果该值可遍历，则返回一个包含各可遍历项的数组。
   *   否则，返回一个仅包含该值的数组。
   * @returns {Array} 由 value 转化而来的数组。
   */
  Array.from = function(value) {
    if (value == null) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value.toArray === 'function') {
      return value.toArray();
    }
    switch (typeOf(value)) {
      case 'object.Arguments':
      case 'object.Collection':
      case 'object.Object':
        var i = 0;
        var length = value.length;
        if (typeof length === 'number') {
          var result = [];
          while (i < length) {
            if (!value.hasOwnProperty || value.hasOwnProperty(i)) {
              result[i] = value[i];
            }
            i++;
          }
          result.length = length;
          return result;
        }
    }
    return [value];
  };

//--------------------------------------------------[Array.prototype.shuffle]
  /**
   * 随机排序本数组中的各元素。
   * @name Array.prototype.shuffle
   * @function
   * @returns {Array} 随机排序后的本数组。
   * @example
   *   [0, 1, 2, 3, 4].shuffle();
   *   // [4, 0, 2, 1, 3]
   * @see http://bost.ocks.org/mike/shuffle/
   */
  Array.prototype.shuffle = function() {
    var i = this.length;
    var random;
    var temp;
    if (i > 1) {
      while (--i) {
        random = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[random];
        this[random] = temp;
      }
    }
    return this;
  };

//--------------------------------------------------[Array.prototype.contains]
  /**
   * 检查本数组中是否包含指定的元素。
   * @name Array.prototype.contains
   * @function
   * @param {*} element 指定的元素。
   * @returns {boolean} 检查结果。
   * @example
   *   [0, 1, 2, 3, 4].contains(2);
   *   // true
   */
  Array.prototype.contains = function(element) {
    return this.indexOf(element) !== -1;
  };

//--------------------------------------------------[Array.prototype.remove]
  /**
   * 移除数组中第一个与指定的元素相同的元素。
   * @name Array.prototype.remove
   * @function
   * @param {*} element 指定的元素。
   * @returns {boolean} 指定的元素是否存在并被移除。
   * @example
   *   [1, 2, 1].remove(1);
   *   // [2, 1]
   */
  Array.prototype.remove = function(element) {
    var index = this.indexOf(element);
    if (index > -1) {
      this.splice(index, 1);
      return true;
    }
    return false;
  };

//--------------------------------------------------[Array.prototype.getFirst]
  /**
   * 获取本数组的第一个元素。
   * @name Array.prototype.getFirst
   * @function
   * @returns {*} 本数组的第一个元素。
   * @example
   *   [0, 1, 2, 3, 4].getFirst();
   *   // 0
   */
  Array.prototype.getFirst = function() {
    return this[0];
  };

//--------------------------------------------------[Array.prototype.getLast]
  /**
   * 获取本数组的最后一个元素。
   * @name Array.prototype.getLast
   * @function
   * @returns {*} 本数组的最后一个元素。
   * @example
   *   [0, 1, 2, 3, 4].getLast();
   *   // 4
   */
  Array.prototype.getLast = function() {
    return this[this.length - 1];
  };

//--------------------------------------------------[String.prototype.clean]
  /**
   * 合并字符串中的空白字符，并去掉首尾的空白字符。
   * @name String.prototype.clean
   * @function
   * @returns {string} 清理后的字符串。
   * @example
   *   ' a b  c   d    e     f      g       '.clean();
   *   // 'a b c d e f g'
   */
  // 空白字符。
  var reWhitespaces = /[\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g;
  String.prototype.clean = function() {
    return this.replace(reWhitespaces, ' ').trim();
  };

//--------------------------------------------------[String.prototype.camelize]
  /**
   * 以 camelize 的形式重组字符串。
   * @name String.prototype.camelize
   * @function
   * @param {boolean} [useUpperCamelCase] 是否使用大驼峰式命名法（又名 Pascal 命名法）。
   * @returns {string} 重组后的字符串。
   * @example
   *   'foo-bar'.camelize();
   *   // 'fooBar'
   *   'foo-bar'.camelize(true);
   *   // 'FooBar'
   *   'HTMLFormElement'.camelize();
   *   // 'htmlFormElement'
   */
  String.prototype.camelize = function(useUpperCamelCase) {
    return segmentWords(this)
        .map(function(word, index) {
          return (index || useUpperCamelCase) ? word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase();
        })
        .join('');
  };

//--------------------------------------------------[String.prototype.dasherize]
  /**
   * 以 dasherize 的形式重组字符串。
   * @name String.prototype.dasherize
   * @function
   * @returns {string} 重组后的字符串。
   * @example
   *   'foo_bar'.dasherize();
   *   // 'foo-bar'
   *   'FooBar'.dasherize();
   *   // 'foo-bar'
   */
  String.prototype.dasherize = function() {
    return segmentWords(this).join('-').toLowerCase();
  };

//--------------------------------------------------[Number.prototype.padZero]
  /**
   * 在数字左侧补零，以使数字更整齐。
   * @name Number.prototype.padZero
   * @function
   * @param {number} digits 数字总位数（包括整数位和小数位），当数字实际位数小于指定的数字总位数时，会在左侧补零。
   * @returns {string} 补零后的数字、NaN、Infinity 或 -Infinity 的字符形式。
   */
  Number.prototype.padZero = function(digits) {
    var sign = (this < 0) ? '-' : '';
    var number = String(Math.abs(this));
    if (isFinite(this)) {
      var length = number.length - (Math.ceil(this) == this ? 0 : 1);
      if (length < digits) {
        number = '0'.repeat(digits - length) + number;
      }
    }
    return sign + number;
  };

//--------------------------------------------------[Math.limit]
  /**
   * 参考输入的数字 number，返回介于 min 和 max 之间（包含 min 和 max）的数字。
   * @name Math.limit
   * @function
   * @param {number} number 输入的数字。
   * @param {number} min 允许的数字下限。
   * @param {number} max 允许的数字上限。
   * @returns {number} 输出的数字。
   * @description
   *   如果 number 小于 min 则返回 min；如果 number 大于 max 则返回 max；否则返回 number。
   * @example
   *   Math.limit(100, 0, 80);
   *   // 80
   *   Math.limit(NaN, 0, 80);
   *   // 0
   * @see http://mootools.net/
   */
  Math.limit = function(number, min, max) {
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : (number === Infinity ? max : min);
  };

//--------------------------------------------------[Math.randomRange]
  /**
   * 生成介于 min 和 max 之间（包含 min 和 max）的伪随机整数。
   * @name Math.randomRange
   * @function
   * @param {number} min 要获取的随机数的下限，整数。
   * @param {number} max 要获取的随机数的上限，整数。
   * @returns {number} 生成的伪随机整数。
   * @see http://mootools.net/
   */
  Math.randomRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

//--------------------------------------------------[Date.parseExact]
  /**
   * 将以指定格式表示日期的字符串转换为日期对象。
   * @name Date.parseExact
   * @function
   * @param {string} string 代表日期的字符串，该字符串应该能够通过 Date.prototype.format 生成。
   *   日期字符串中缺失的部分将使用默认值代替，各部分的默认值如下：
   *   <table>
   *     <tr><th>日期字段</th><th>默认值</th></tr>
   *     <tr><td>年</td><td>当前年份</td></tr>
   *     <tr><td>月</td><td>1</td></tr>
   *     <tr><td>日</td><td>1</td></tr>
   *     <tr><td>时</td><td>0</td></tr>
   *     <tr><td>分</td><td>0</td></tr>
   *     <tr><td>秒</td><td>0</td></tr>
   *     <tr><td>毫秒</td><td>0</td></tr>
   *     <tr><td>时区</td><td>当地时区</td></tr>
   *   </table>
   *   注意：未检查字符串内包含数据的有效性，若数据异常，将得不到预期的日期值。
   * @param {string} [format] 由代表日期字段的标识符和其他字符组成的格式字符串，默认为 'YYYY-MM-DD'。格式请参考 Date.prototype.format 的同名参数。
   * @param {boolean} [isUTC] 字符串是否为世界标准时间。
   *   当 isUTC 与 string 中已存在的 TZD 标识冲突时，isUTC 将被忽略。
   * @returns {Date} 转换后的日期对象。
   * @example
   *   Date.parseExact('2012-06-25 12:00:00', 'YYYY-MM-DD hh:mm:ss')
   *   // 各浏览器中日期的字符串形式略有差异。
   *   // "Mon Jun 25 2012 12:00:00 GMT+0800"
   *   Date.parseExact('2012-12-21T23:14:35.000+08:00', 'YYYY-MM-DDThh:mm:ss.sTZD', true).format('世界标准时间YYYY年MM月DD日hh点mm分ss秒', true)
   *   // "世界标准时间2012年12月21日15点14分35秒"
   *   Date.parseExact('02-29 16:00', 'MM-DD hh:mm')
   *   // 年份缺失，使用默认值代替。
   *   // "Wed Feb 29 2012 16:00:00 GMT+0800"
   */
  var now = new Date();
  var timeZoneOffset = now.getTimezoneOffset() * 60000;
  Date.parseExact = function(string, format, isUTC) {
    format = format || 'YYYY-MM-DD';
    // 从 string 中参考 format 解析出日期数据。
    var extractedData = {};
    var match;
    var index;
    var key;
    var value;
    var start;
    var currentCorrectedValue;
    var totalCorrectedValue = 0;
    while (match = reDateFormat.exec(format)) {
      key = match[0];
      index = match.index;
      start = index + totalCorrectedValue;
      // 定位值。
      if (key === 'TZD') {
        currentCorrectedValue = string.charAt(start) === 'Z' ? -2 : 3;
      } else if (key === 's') {
        currentCorrectedValue = 2;
      } else {
        currentCorrectedValue = 0;
      }
      // 取出值。
      value = string.substring(start, start + key.length + currentCorrectedValue);
      // 转换值。
      if (key === 'TZD') {
        value = value === 'Z' ? 0 : (value.slice(0, 1) === '-' ? 1000 : -1000) * (value.slice(1, 3) * 3600 + value.slice(4, 6) * 60);
      } else {
        value = Number.toInteger(value);
        if (key === 'MM') {
          --value;
        }
      }
      // 保存值。
      extractedData[key] = value;
      totalCorrectedValue += currentCorrectedValue;
    }

    // 缺失的值使用以下默认值代替。
    var dateValues = Object.mixin({YYYY: now.getFullYear(), MM: 0, DD: 1, hh: 0, mm: 0, ss: 0, s: 0, TZD: isUTC ? 0 : timeZoneOffset}, extractedData);

    // 转换为日期类型。
    return new Date(Date.UTC(dateValues.YYYY, dateValues.MM, dateValues.DD, dateValues.hh, dateValues.mm, dateValues.ss, dateValues.s) + dateValues.TZD);

  };

//--------------------------------------------------[Date.prototype.format]
  /**
   * 将日期对象格式化为字符串。
   * @name Date.prototype.format
   * @function
   * @param {string} [format] 由代表日期字段的标识符和其他字符组成的格式字符串，默认为 'YYYY-MM-DD'。
   *   各标识符及其含义：
   *   <table>
   *     <tr><th>字符</th><th>含义</th></tr>
   *     <tr><td>YYYY</td><td>四位数年份。</td></tr>
   *     <tr><td>MM</td><td>两位数月份。</td></tr>
   *     <tr><td>DD</td><td>两位数日期。</td></tr>
   *     <tr><td>hh</td><td>两位数小时，24 小时制。</td></tr>
   *     <tr><td>mm</td><td>两位数分钟。</td></tr>
   *     <tr><td>ss</td><td>两位数秒钟。</td></tr>
   *     <tr><td>s</td><td>三位数毫秒。</td></tr>
   *     <tr><td>TZD</td><td>时区指示。世界标准时间显示大写字母 Z，其他时区用当地时间加时差表示。</td></tr>
   *   </table>
   * @param {boolean} [toUTC] 是否格式化为世界标准时间。
   * @returns {string} 格式化后的字符串。
   * @example
   *   new Date(2000,0,1).format()
   *   // "2000-01-01"
   *   new Date(2000,2,1).format('MM-DD hh:mm', true)
   *   // "02-29 16:00"
   *   new Date('Fri, 21 Dec 2012 15:14:35 GMT').format('YYYY-MM-DDThh:mm:ss.sTZD')
   *   // "2012-12-21T23:14:35.000+08:00"
   *   new Date(2012, 0, 1).format('YYYYYY')
   *   // 未被成功匹配的字符均会作为普通字符显示。
   *   // "2012YY"
   * @see http://www.w3.org/TR/NOTE-datetime
   * @see http://en.wikipedia.org/wiki/ISO_8601
   * @see http://blog.stevenlevithan.com/archives/date-time-format
   */
  Date.prototype.format = function(format, toUTC) {
    format = format || 'YYYY-MM-DD';

    var get = toUTC ? 'getUTC' : 'get';
    var timezoneOffset = this.getTimezoneOffset();
    var timezoneOffsetSign = timezoneOffset < 0 ? '+' : '-';
    var timezoneOffsetHours = (Math.floor(Math.abs(timezoneOffset) / 60)).padZero(2);
    var timezoneOffsetMinutes = (Math.abs(timezoneOffset) - timezoneOffsetHours * 60).padZero(2);
    var keys = {
      YYYY: this[get + 'FullYear'](),
      MM: (this[get + 'Month']() + 1).padZero(2),
      DD: this[get + 'Date']().padZero(2),
      hh: this[get + 'Hours']().padZero(2),
      mm: this[get + 'Minutes']().padZero(2),
      ss: this[get + 'Seconds']().padZero(2),
      s: this[get + 'Milliseconds']().padZero(3),
      TZD: (toUTC || timezoneOffset === 0) ? 'Z' : (timezoneOffsetSign + timezoneOffsetHours + ':' + timezoneOffsetMinutes)
    };

    var date = format.replace(reDateFormat, function(key) {
      return keys[key];
    });
    return date;

  };

//--------------------------------------------------[RegExp.escape]
  /**
   * 转义字符串中包含的正则表达式元字符。
   * @name RegExp.escape
   * @function
   * @param {string} string 要转义的字符串。
   * @returns {string} 转义后的字符串。
   * @description
   *   转以后的字符串可以安全的作为正则表达式的一部分使用。
   * @see http://prototypejs.org/
   */
  var reMetacharacters = /([.*+?^${}()|\[\]\/\\])/g;
  RegExp.escape = function(string) {
    return String(string).replace(reMetacharacters, '\\$1');
  };

})(window);
/**
 * @fileOverview 浏览器 API 扩展
 * @author sundongguo@gmail.com
 * @version 20111201
 */

(function(window) {
//==================================================[window 扩展]
  /*
   * window 属性扩展。
   *
   * 扩展属性：
   *   window.support
   */

  /**
   * 扩展 window 对象。
   * @name window
   * @namespace
   */

//--------------------------------------------------[window.support]
  /**
   * 是否支持某种特性。
   * @name support
   * @memberOf window
   * @type Object
   */
  window.support = {
    touch: 'ontouchend' in window,
    orientation: 'orientation' in window && 'onorientationchange' in window
  };

//==================================================[navigator 扩展]
  /*
   * 常见浏览器的 navigator.userAgent：
   * IE6      Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
   * IE7      Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C)
   * IE8      Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C)
   * IE9      Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
   * Firefox7 Mozilla/5.0 (Windows NT 6.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1
   * Chrome2  Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1
   * Safari5  Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22
   * Opera11  Opera/9.80 (Windows NT 6.1; U; en) Presto/2.9.168 Version/11.52
   *
   * 扩展属性：
   *   navigator.userAgentInfo
   *   navigator.userAgentInfo.engine
   *   navigator.userAgentInfo.name
   *   navigator.userAgentInfo.version
   *   navigator.inStandardsMode
   *   navigator.isIE10
   *   navigator.isIElt10
   *   navigator.isIE9
   *   navigator.isIElt9
   *   navigator.isIE8
   *   navigator.isIElt8
   *   navigator.isIE7
   *   navigator.isIE6
   *   navigator.isFirefox
   *   navigator.isChrome
   *   navigator.isSafari
   *   navigator.isOpera
   */

  /**
   * 扩展 navigator 对象，提供更多关于浏览器的信息。
   * @name navigator
   * @namespace
   */

//--------------------------------------------------[navigator.*]
  /**
   * 从 navigator.userAgent 中提取的常用信息。
   * @name userAgentInfo
   * @memberOf navigator
   * @type Object
   * @description
   *   注意：navigator.userAgentInfo 下的三个属性是根据 navigator.userAgent 得到的，仅供参考，不建议作为逻辑判断的依据。
   */

  /**
   * 浏览器渲染引擎的类型，值为以下之一：Trident|WebKit|Gecko|Presto|Unknown。
   * @name userAgentInfo.engine
   * @memberOf navigator
   * @type string
   */

  /**
   * 浏览器的名称，值为以下之一：IE|Firefox|Chrome|Safari|Opera|Unknown。
   * @name userAgentInfo.name
   * @memberOf navigator
   * @type string
   */

  /**
   * 浏览器的版本号，如果取不到版本号，则为 NaN。
   * @name userAgentInfo.version
   * @memberOf navigator
   * @type string
   */

  /**
   * 浏览器的语言代码。
   * @name languageCode
   * @memberOf navigator
   * @type string
   */

  /**
   * 浏览器是否工作在标准模式下。
   * @name inStandardsMode
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE10。
   * @name isIE10
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE，且版本小于 10。
   * @name isIElt10
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE9。
   * @name isIE9
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE，且版本小于 9。
   * @name isIElt9
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE8。
   * @name isIE8
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE，且版本小于 8。
   * @name isIElt8
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE7。
   * @name isIE7
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE6。
   * @name isIE6
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Firefox。
   * @name isFirefox
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Chrome。
   * @name isChrome
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Safari。
   * @name isSafari
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Opera。
   * @name isOpera
   * @memberOf navigator
   * @type boolean
   */

  Object.mixin(navigator, function() {
    // 从 navigator.userAgent 中分离信息。
    var engine = 'Unknown';
    var name = 'Unknown';
    var version = NaN;
    var userAgent = navigator.userAgent;
    if (/Trident|MSIE/.test(userAgent)) {
      engine = 'Trident';
    } else if (/WebKit/.test(userAgent)) {
      engine = 'WebKit';
    } else if (/Gecko/.test(userAgent)) {
      engine = 'Gecko';
    } else if (/Presto/.test(userAgent)) {
      engine = 'Presto';
    }
    if (userAgent.match(/(IE|Firefox|Chrome|Safari|Opera)(?: |\/)(\d+)/)) {
      name = RegExp.$1;
      version = Number.toInteger(RegExp.$2);
      if (userAgent.match(/Version\/(\d+)/)) {
        version = Number.toInteger(RegExp.$1);
      }
    }
    // 获取语言代码。
    var languageCode = (navigator.language || navigator.userLanguage).toLowerCase();
    // 检查工作模式。
    var inStandardsMode = document.compatMode === 'CSS1Compat';
    if (!inStandardsMode) {
      console.warn('OurJS: Browser is working in non-standards mode!');
    }
    // 浏览器特性判断。
    var isIE10 = false;
    var isIElt10 = false;
    var isIE9 = false;
    var isIElt9 = false;
    var isIE8 = false;
    var isIElt8 = false;
    var isIE7 = false;
    var isIE6 = false;
    var isFirefox = false;
    var isChrome = false;
    var isSafari = false;
    var isOpera = false;
    var html = document.documentElement;
    if ('ActiveXObject' in window) {
      if (inStandardsMode) {
        if ('WebSocket' in window) {
          isIE10 = true;
        } else if ('HTMLElement' in window) {
          isIE9 = true;
        } else if ('Element' in window) {
          isIE8 = true;
        } else if ('minWidth' in html.currentStyle) {
          isIE7 = true;
        } else {
          isIE6 = true;
          try {
            document.execCommand('BackgroundImageCache', false, true);
          } catch (e) {
          }
        }
      }
      isIElt8 = isIE7 || isIE6;
      isIElt9 = isIE8 || isIElt8;
      isIElt10 = isIE9 || isIElt9;
    } else if ('uneval' in window) {
      isFirefox = true;
    } else if (getComputedStyle(html, null).getPropertyValue('-webkit-user-select')) {
      if ('chrome' in window) {
        isChrome = true;
      } else {
        isSafari = true;
      }
    } else if ('opera' in window) {
      isOpera = true;
    }
    // 返回扩展对象。
    return {
      userAgentInfo: {
        engine: engine,
        name: name,
        version: version
      },
      languageCode: languageCode,
      inStandardsMode: inStandardsMode,
      isIE10: isIE10,
      isIElt10: isIElt10,
      isIE9: isIE9,
      isIElt9: isIElt9,
      isIE8: isIE8,
      isIElt8: isIElt8,
      isIE7: isIE7,
      isIE6: isIE6,
      isFirefox: isFirefox,
      isChrome: isChrome,
      isSafari: isSafari,
      isOpera: isOpera
    };
  }());

//==================================================[location 扩展]
  /*
   * 页面地址信息扩展。
   *
   * 扩展属性：
   *   location.parameters
   */

  /**
   * 扩展 location 对象。
   * @name location
   * @namespace
   */

//--------------------------------------------------[location.parameters]
  /**
   * 通过此对象可以访问当前页面地址中查询字符串所携带的参数。
   * @name parameters
   * @memberOf location
   * @type Object
   * @description
   *   注意：获取的参数值均为原始值（未经过 decodeURIComponent 解码）。
   * @example
   *   // 设页面地址为 test.html?a=ok&b=100&b=128
   *   location.parameters
   *   // {a:'ok', b:['100', '128']}
   * @see http://w3help.org/zh-cn/causes/HD9001
   */
  location.parameters = Object.fromQueryString(location.search.slice(1), true);

//==================================================[cookie 扩展]
  /*
   * 将 document.cookie 扩展为 cookie 对象。
   *
   * 提供方法：
   *   cookie.getItem
   *   cookie.setItem
   *   cookie.removeItem
   */

  /**
   * 提供操作 cookie 的常用方法。
   * @name cookie
   * @namespace
   */
  var cookie = window.cookie = {};

//--------------------------------------------------[cookie.getItem]
  /**
   * 从 cookie 中读取一条数据。
   * @name cookie.getItem
   * @function
   * @param {string} key 数据名。
   * @returns {?string} 数据值。
   *   如果指定的数据名不存在或无法访问，返回 null。
   */
  cookie.getItem = function(key) {
    var match = document.cookie.match(new RegExp('(?:^|;)\\s*' + RegExp.escape(key) + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  };

//--------------------------------------------------[cookie.setItem]
  /**
   * 在 cookie 中保存一条数据。
   * @name cookie.setItem
   * @function
   * @param {string} key 数据名。
   * @param {string} value 数据值。
   * @param {Object} [options] 可选参数。
   * @param {string} [options.path] 限定生效的路径，默认为当前路径。
   * @param {string} [options.domain] 限定生效的域名，默认为当前域名。
   * @param {boolean} [options.secure] 是否仅通过 SSL 连接 (HTTPS) 传输本条数据。
   * @param {string|Date} [options.expires] 过期时间，默认为会话结束。
   *   如果使用字符串类型，其表示时间的格式应为 'YYYY-MM-DD hh:mm:ss'。
   */
  cookie.setItem = function(key, value, options) {
    options = options || {};
    var item = key + '=' + encodeURIComponent(value);
    if (options.path) {
      item += '; path=' + options.path;
    }
    if (options.domain) {
      item += '; domain=' + options.domain;
    }
    if (options.secure) {
      item += '; secure';
    }
    if (options.expires) {
      item += '; expires=' + (typeof options.expires === 'string' ? Date.parseExact(options.expires, 'YYYY-MM-DD hh:mm:ss') : options.expires).toUTCString();
    }
    document.cookie = item;
  };

//--------------------------------------------------[cookie.removeItem]
  /**
   * 从 cookie 中删除一条数据。
   * @name cookie.removeItem
   * @function
   * @param {string} key 数据名。
   * @param {Object} [options] 可选参数。
   * @param {string} [options.path] 限定生效的路径，默认为当前路径。
   * @param {string} [options.domain] 限定生效的域名，默认为当前域名。
   * @param {boolean} [options.secure] 是否仅通过 SSL 连接 (HTTPS) 传输本条数据。
   */
  cookie.removeItem = function(key, options) {
    options = options || {};
    options.expires = new Date(0);
    this.setItem(key, '', options);
  };

})(window);
/**
 * @fileOverview DOM 对象补缺及扩展
 * @author sundongguo@gmail.com
 * @version 20130508
 */

(function(window) {
  // 内部变量。
  var document = window.document;
  var $html = document.documentElement;

//==================================================[DOM 对象补缺及扩展]
  /*
   * 仅针对窗口、文档和元素三种类型的对象进行补缺和扩展（不包括文本节点等其他类型）。
   *
   * 其中窗口和文档对象在页面中只有唯一的实例，可以直接进行补缺和扩展。
   * 而对元素进行补缺和扩展，有以下三种方案：
   * 一、静态方法
   *   方式：
   *     提供一组静态方法，将元素以参数（一般是第一个参数）的形式传入并进行处理。
   *   优点：
   *     可以随意为方法命名。
   *     不修改原生对象，可以跨 frame 操作，可与其他脚本库共存。
   *   缺点：
   *     静态方法的调用从字面上看是以方法为主体（先出现），代码冗长，语法不如以目标对象为主体的 . 操作自然。
   *     有时需要使用静态方法，有时又要使用原生方法，缺乏一致性。
   * 二、包装对象
   *   方式：
   *     创建一个对象包装目标元素，在这个包装对象的原型（链）中添加方法。
   *   优点：
   *     语法以目标对象为主体，可以链式调用，语法自然。
   *     可以随意为方法命名。
   *     不修改原生对象，可以跨 frame 操作，可与其他脚本库共存。
   *   缺点：
   *     访问元素的属性时需要使用 getter 和 setter 方法（包装对象没有“属性”的概念），操作元素未被包装的的一些生僻方法或属性时，需要解包，一致性不够好。
   *     由于对包装对象上方法的调用与对原生对象上方法的调用方式是相同的（使用 . 操作符调用），特殊情况下有将原生对象当作包装对象误用的可能。
   *     必须以约定的方式获取元素以便对其包装。
   * 三、原型扩展
   *   方式：
   *     直接在 Element.prototype 上添加方法。对于没有 Element 构造器的浏览器（IE6 IE7），将对应属性直接附加在元素的实例上。
   *   优点：
   *     不引入新的对象类型或命名空间，只在已有的对象类型上添加方法，一致性最好。
   *     方法调用时操作主体就是目标元素本身，可以链式调用，语法自然。
   *   缺点：
   *     为方法命名时，不能使用当前已有的属性名，并应尽量避免使用将来可能会有的属性名。
   *     修改了原生对象，跨 frame 操作前需要预先修改目标 frame 中的原生对象，不能与其他基于原型扩展的脚本库共存。
   *     必须以约定的方式获取元素以便兼容 IE6 IE7 的扩展方式，另外对 IE6 IE7 的修补方案有性能损耗。
   *
   * 为达到“化繁为简”的目标，这里使用第三种实现方式，以使 API 有最好的一致性和最自然语法。
   * 同时不予提供跨 frame 的操作。实际上跨 frame 操作并不常见，通常也不建议这样做。必须这样做时，应在 frame 内也引入本脚本库。
   * 要处理的元素必须由本脚本库提供的 document.$ 方法来获取，或通过已获取的元素上提供的方法（如 getNextSibling、find 等）来获取。使用其他途径如元素本身的 parentNode 属性来获取的元素，在 IE6 IE7 中将丢失这些附加属性。
   */

//==================================================[window 扩展]
  /*
   * 为 window 扩展新属性。
   *
   * 扩展方法：
   *   window.$
   *   window.getClientSize
   *   window.getScrollSize
   *   window.getPageOffset
   *   window.getAvailableCSSPropertyName
   */

  /**
   * 扩展 DOMWindow 对象。
   * @name window
   * @namespace
   */

//--------------------------------------------------[window.$]
  /**
   * 对 document.$ 的引用。
   * @name window.$
   * @function
   * @param {string|Element} e 不同类型的元素表示。
   * @returns {?Element} 扩展后的元素。
   * @description
   *   在编写应用代码时，可以使用 $ 来代替 document.$。
   */

//--------------------------------------------------[window.getClientSize]
  /**
   * 获取视口可视区域（不包含滚动条的范围）的尺寸。
   * @name window.getClientSize
   * @function
   * @returns {Object} 尺寸，包含 width 和 height 两个数字类型的属性，单位为像素。
   * @description
   *   要获取包含了滚动条宽度的值，应使用 window.innerWidth 和 window.innerHeight 的值。
   * @see http://www.w3.org/TR/cssom-view/#dom-window-innerwidth
   * @see http://www.w3.org/TR/cssom-view/#dom-window-innerheight
   */
  window.getClientSize = function() {
    return {
      width: $html.clientWidth,
      height: $html.clientHeight
    };
  };

//--------------------------------------------------[window.getScrollSize]
  /**
   * 获取视口滚动区域的尺寸。当内容不足以充满视口可视区域时，返回视口可视区域的尺寸。
   * @name window.getScrollSize
   * @function
   * @returns {Object} 尺寸，包含 width 和 height 两个数字类型的属性，单位为像素。
   */
  window.getScrollSize = function() {
    var $body = document.body || {scrollWidth: 0, scrollHeight: 0};
    return {
      width: Math.max($html.scrollWidth, $body.scrollWidth, $html.clientWidth),
      height: Math.max($html.scrollHeight, $body.scrollHeight, $html.clientHeight)
    };
  };

//--------------------------------------------------[window.getPageOffset]
  /**
   * 获取视口的滚动偏移量。
   * @name window.getPageOffset
   * @function
   * @returns {Object} 坐标，包含 x 和 y 两个数字类型的属性，单位为像素。
   * @deprecated
   *   可以直接使用 window.pageXOffset 和 window.pageYOffset 的值。
   */
  window.getPageOffset = function() {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  };

//--------------------------------------------------[window.getAvailableCSSPropertyName]
  /**
   * 获取可用的 CSS 属性名。
   * @name window.getAvailableCSSPropertyName
   * @param {string} propertyName 未添加私有前缀的 CSS 属性名。
   * @function
   * @returns 可用的 CSS 属性名。
   * @description
   *   一些 CSS 属性已经成为事实标准，但仍未标准化，因此各浏览器可能为这些属性的名称添加私有的前缀。
   */
  var vendorPrefixes = ['-o-', '-moz-', '-ms-', '-webkit-', ''];
  var htmlStyle;
  window.getAvailableCSSPropertyName = function(propertyName) {
    if (!htmlStyle) {
      htmlStyle = window.getComputedStyle($html, null);
    }
    var result = '';
    if (htmlStyle) {
      var i = vendorPrefixes.length;
      var name;
      while (i) {
        name = vendorPrefixes[--i] + propertyName;
        if (name.camelize(i < 2) in htmlStyle) {
          result = name;
          break;
        }
      }
    }
    return result;
  };

//==================================================[document 扩展]
  /*
   * 为 document 扩展新属性。
   *
   * 扩展方法：
   *   document.$
   *   document.find
   *   document.findAll
   *   document.addStyleRules
   *   document.loadScript
   *   document.preloadImages
   */

  /**
   * 扩展 document 对象。
   * @name document
   * @namespace
   */

  // 自动触发 beforedomready、domready 和 afterdomready 事件，其中 beforedomready 和 afterdomready 为内部使用的事件类型。
  // TODO: 挪到事件部分。
  var triggerDomReadyEvent = function() {
    document.removeEventListener('DOMContentLoaded', triggerDomReadyEvent, false);
    document.fire('beforedomready');
    document.fire('domready');
    document.fire('afterdomready');
  };
  document.addEventListener('DOMContentLoaded', triggerDomReadyEvent, false);

//--------------------------------------------------[document.$]
  // TODO
  /**
   * 根据指定的参数获取/创建一个元素，并对其进行扩展。
   * @name document.$
   * @function
   * @param {string|Element} e 不同类型的元素表示。
   * @returns {?Element} 扩展后的元素。
   * @description
   * * 当参数为一个元素（可以包含后代元素）的序列化之后的字符串时，会返回扩展后的、根据这个字符串反序列化的元素。
   *   注意：不要使用本方法创建 SCRIPT 元素，对于动态载入外部脚本文件的需求，应使用 document.loadScript 方法。
   * * 当参数为一个 CSS 选择符时，会返回扩展后的、与指定的 CSS 选择符相匹配的<strong>第一个元素</strong>。
   *   如果没有找到任何元素，返回 null。
   * * 当参数为一个元素时，仍返回此元素。
   * * 当参数为其他值（包括 document 和 window）时，均返回 null。
   * @see http://jquery.com/
   * @see http://mootools.net/
   * @see http://w3help.org/zh-cn/causes/SD9003
   */
  var reTagName = /(?!<)\w*/;
  // 为解决“IE 可能会自动添加 TBODY 元素”的问题，在相应的 wrappers 里预置了一个 TBODY。
  var wrappers = {
    area: ['<map>', '</map>'],
    legend: ['<fieldset>', '</fieldset>'],
    optgroup: ['<select>', '</select>'],
    colgroup: ['<table><tbody></tbody>', '</table>'],
    col: ['<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    tr: ['<table><tbody>', '</tbody></table>'],
    th: ['<table><tbody><tr>', '</tr></tbody></table>']
  };
  wrappers.option = wrappers.optgroup;
  wrappers.caption = wrappers.thead = wrappers.tfoot = wrappers.tbody = wrappers.colgroup;
  wrappers.td = wrappers.th;
  if (navigator.isIElt9) {
    // IE6 IE7 IE8 对 LINK STYLE SCRIPT 元素的特殊处理。
    wrappers.link = wrappers.style = wrappers.script = ['#', ''];
  }
  var defaultWrapper = ['', ''];
  // 忽略“IE 丢失源代码前的空格”的问题，通过脚本修复这个问题无实际意义（需要深度遍历）。
  // 忽略“脚本不会在动态创建并插入文档树后自动执行”的问题，因为这个处理需要封装追加元素的相关方法，并且还需要考虑脚本的 defer 属性在各浏览器的差异。
  window.$ = document.$ = function(e) {
    var element = null;
    if (typeof e === 'string') {
      if (e.charAt(0) === '<' && e.charAt(e.length - 1) === '>') {
        var tagName = reTagName.exec(e)[0].toLowerCase();
        var wrapper = wrappers[tagName] || defaultWrapper;
        element = document.createElement('div');
        element.innerHTML = wrapper[0] + e + wrapper[1];
        while ((element = element.lastChild) && element.nodeName.toLowerCase() !== tagName) {
        }
        if (element && element.nodeType !== 1) {
          element = null;
        }
      } else {
        element = document.querySelector(e);
      }
    } else if (e && e.nodeType === 1) {
      element = e;
    }
    return element;
  };

//--------------------------------------------------[document.find]
  /**
   * 在文档中根据指定的选择符查找符合条件的第一个元素。
   * @name document.find
   * @function
   * @param {string} selector 选择符。
   * @returns {?Element} 查找到的元素。
   *   如果没有找到任何元素，返回 null。
   * @see http://www.w3.org/TR/selectors-api2/
   */
  document.find = function(selector) {
    return this.querySelector(selector);
  };

//--------------------------------------------------[document.findAll]
  /**
   * 在文档中根据指定的选择符查找符合条件的所有元素。
   * @name document.findAll
   * @function
   * @param {string} selector 选择符。
   * @returns {Array} 包含查找到的元素的数组。
   *   如果没有找到任何元素，返回空数组。
   * @see http://www.w3.org/TR/selectors-api2/
   */
  document.findAll = function(selector) {
    return Array.from(this.querySelectorAll(selector));
  };

//--------------------------------------------------[document.addStyleRules]
  /**
   * 添加样式规则。
   * @name document.addStyleRules
   * @function
   * @param {Array} rules 包含样式规则的数组，其中每一项为一条规则。
   */
  var dynamicStyleSheet;
  document.addStyleRules = function(rules) {
    if (!dynamicStyleSheet) {
      document.head.appendChild(document.createElement('style'));
      var styleSheets = document.styleSheets;
      dynamicStyleSheet = styleSheets[styleSheets.length - 1];
    }
    rules.forEach(function(rule) {
      dynamicStyleSheet.insertRule(rule, dynamicStyleSheet.cssRules.length);
    });
  };

//--------------------------------------------------[document.loadScript]
  /**
   * 加载脚本。
   * @name document.loadScript
   * @function
   * @param {string} url 脚本文件的路径。
   * @param {Object} [options] 可选参数。
   * @param {string} [options.charset] 脚本文件的字符集。
   * @param {Function} [options.onLoad] 加载完毕后的回调。
   *   该函数被调用时 this 的值为加载本脚本时创建的 SCRIPT 元素。
   */
  document.loadScript = function(url, options) {
    options = options || {};
    var $head = document.head;
    var $script = document.createElement('script');
    if (options.charset) {
      $script.charset = options.charset;
    }
    $script.src = url;
    $script.onload = $script.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        this.onload = this.onreadystatechange = null;
        $head.removeChild($script);
        if (options.onLoad) {
          options.onLoad.call(this);
        }
      }
    };
    $head.appendChild($script);
  };

//--------------------------------------------------[document.preloadImages]
  /**
   * 预加载图片。
   * @name document.preloadImages
   * @function
   * @param {Array} urlArray 包含需预加载的图片路径的数组。
   * @param {Function} [onLoad] 每个图片加载完毕后的回调。
   *   该函数被调用时 this 的值为已完成加载的 IMG 元素。
   */
  document.preloadImages = function(urlArray, onLoad) {
    urlArray.forEach(function(url) {
      var $img = new Image();
      if (onLoad) {
        $img.onload = function() {
          $img.onload = null;
          onLoad.call($img, {src: url});
        };
      }
      $img.src = url;
    });
  };

//==================================================[Element 补缺 - 常用属性和方法]
  /*
   * 为 Firefox 补缺常用属性和方法。
   *
   * 补缺属性：
   *   HTMLElement.prototype.innerText
   *   HTMLElement.prototype.outerText
   *
   * 补缺方法：
   *   HTMLElement.prototype.insertAdjacentText
   *   HTMLElement.prototype.insertAdjacentElement
   */

//--------------------------------------------------[HTMLElement.prototype.innerText]
  // 为 Firefox 添加 HTMLElement.prototype.innerText 属性。
  /**
   * 获取/设置本元素内的文本信息。
   * @name Element.prototype.innerText
   * @type string
   * @description
   *   注意：getter 在处理 BR 元素或换行符时，各浏览器的行为不一致。
   */
  if (!('innerText' in $html)) {
    HTMLElement.prototype.__defineGetter__('innerText', function() {
      return this.textContent;
    });
    HTMLElement.prototype.__defineSetter__('innerText', function(text) {
      this.textContent = text;
      return text;
    });
  }

//--------------------------------------------------[HTMLElement.prototype.outerText]
  // 为 Firefox 添加 HTMLElement.prototype.outerText 属性。
  /**
   * 获取本元素内的文本信息，或使用文本信息替换本元素。
   * @name Element.prototype.outerText
   * @type string
   * @description
   *   与 innerText 不同，如果设置一个元素的 outerText，那么设置的字符串将作为文本节点替换本元素在文档树中的位置。
   *   注意：getter 在处理 BR 元素或换行符时，各浏览器的行为不一致。
   */
  if (!('outerText' in $html)) {
    HTMLElement.prototype.__defineGetter__('outerText', function() {
      return this.textContent;
    });
    HTMLElement.prototype.__defineSetter__('outerText', function(text) {
      var textNode = document.createTextNode(text);
      this.parentNode.replaceChild(textNode, this);
      return text;
    });
  }

//--------------------------------------------------[HTMLElement.prototype.insertAdjacentText]
  // 为 Firefox 添加 HTMLElement.prototype.insertAdjacentText 属性。
  /**
   * 在本元素的指定位置插入文本。
   * @name Element.prototype.insertAdjacentText
   * @function
   * @param {string} position 要插入的位置，可选值请参考下表。
   *   <table>
   *     <tr><th>可选值</th><th>含义</th></tr>
   *     <tr><td><dfn>beforeBegin</dfn></td><td>将文本插入到本元素之前。</td></tr>
   *     <tr><td><dfn>afterBegin</dfn></td><td>将文本插入到本元素的所有内容之前。</td></tr>
   *     <tr><td><dfn>beforeEnd</dfn></td><td>将文本插入到本元素的所有内容之后。</td></tr>
   *     <tr><td><dfn>afterEnd</dfn></td><td>将文本插入到本元素之后。</td></tr>
   *   </table>
   * @param {Element} text 要插入的文本。
   */
  if (!('insertAdjacentText' in $html)) {
    HTMLElement.prototype.insertAdjacentText = function(position, text) {
      switch (position.toLowerCase()) {
        case 'beforebegin':
        case 'afterbegin':
        case 'beforeend':
        case 'afterend':
          this.insertAdjacentElement(position, document.createTextNode(text));
          break;
        default:
          throw new Error('Invalid position "' + position + '"');
      }
    };
  }

//--------------------------------------------------[HTMLElement.prototype.insertAdjacentElement]
  // 为 Firefox 添加 HTMLElement.prototype.insertAdjacentElement 属性。
  /**
   * 在本元素的指定位置插入目标元素。
   * @name Element.prototype.insertAdjacentElement
   * @function
   * @param {string} position 要插入的位置，可选值请参考下表。
   *   <table>
   *     <tr><th>可选值</th><th>含义</th></tr>
   *     <tr><td><dfn>beforeBegin</dfn></td><td>将目标元素插入到本元素之前。</td></tr>
   *     <tr><td><dfn>afterBegin</dfn></td><td>将目标元素插入到本元素的所有内容之前。</td></tr>
   *     <tr><td><dfn>beforeEnd</dfn></td><td>将目标元素插入到本元素的所有内容之后。</td></tr>
   *     <tr><td><dfn>afterEnd</dfn></td><td>将目标元素插入到本元素之后。</td></tr>
   *   </table>
   * @param {Element} target 目标元素。
   * @returns {Element} 目标元素。
   */
  if (!('insertAdjacentElement' in $html)) {
    HTMLElement.prototype.insertAdjacentElement = function(position, $target) {
      var $parent;
      switch (position.toLowerCase()) {
        case 'beforebegin':
          if ($parent = this.parentNode) {
            $parent.insertBefore($target, this);
          }
          break;
        case 'afterbegin':
          this.insertBefore($target, this.firstChild);
          break;
        case 'beforeend':
          this.appendChild($target);
          break;
        case 'afterend':
          if ($parent = this.parentNode) {
            $parent.insertBefore($target, this.nextSibling);
          }
          break;
        default:
          throw new Error('Invalid position "' + position + '"');
      }
      return $target;
    };
  }

//==================================================[Element 扩展 - 遍历文档树]
  /*
   * 获取文档树中的元素或一个元素与文档树相关的信息。
   *
   * 扩展方法：
   *   Element.prototype.getParent
   *   Element.prototype.getPreviousSibling
   *   Element.prototype.getNextSibling
   *   Element.prototype.getFirstChild
   *   Element.prototype.getLastChild
   *   Element.prototype.getChildren
   *   Element.prototype.getChildCount
   *   Element.prototype.find
   *   Element.prototype.findAll
   *   Element.prototype.matchesSelector
   *
   * 参考：
   *   http://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
   *   http://www.w3.org/TR/selectors-api2/
   *   http://www.quirksmode.org/dom/w3c_core.html
   *   http://w3help.org/zh-cn/causes/SD9003
   */

  var reBasicSelector = /^(?:([[\w\*]+)|#([\w-]+)|\.([\w-]+))$/;

//--------------------------------------------------[Element.prototype.getParent]
  /**
   * 获取本元素的父元素。
   * @name Element.prototype.getParent
   * @function
   * @returns {?Element} 本元素的父元素。
   * @deprecated
   *   可以直接访问本元素的 parentElement 属性。
   */
  Element.prototype.getParent = function() {
    return this.parentElement;
  };

//--------------------------------------------------[Element.prototype.getPreviousSibling]
  /**
   * 获取本元素的上一个兄弟元素。
   * @name Element.prototype.getPreviousSibling
   * @function
   * @returns {?Element} 本元素的上一个兄弟元素。
   * @deprecated
   *   可以直接访问本元素的 previousElementSibling 属性。
   */
  Element.prototype.getPreviousSibling = function() {
    return this.previousElementSibling;
  };

//--------------------------------------------------[Element.prototype.getNextSibling]
  /**
   * 获取本元素的下一个兄弟元素。
   * @name Element.prototype.getNextSibling
   * @function
   * @returns {?Element} 本元素的下一个兄弟元素。
   * @deprecated
   *   可以直接访问本元素的 nextElementSibling 属性。
   */
  Element.prototype.getNextSibling = function() {
    return this.nextElementSibling;
  };

//--------------------------------------------------[Element.prototype.getFirstChild]
  /**
   * 获取本元素的第一个子元素。
   * @name Element.prototype.getFirstChild
   * @function
   * @returns {?Element} 本元素的第一个子元素。
   * @deprecated
   *   可以直接访问本元素的 firstElementChild 属性。
   */
  Element.prototype.getFirstChild = function() {
    return this.firstElementChild;
  };

//--------------------------------------------------[Element.prototype.getLastChild]
  /**
   * 获取本元素的最后一个子元素。
   * @name Element.prototype.getLastChild
   * @function
   * @returns {?Element} 本元素的最后一个子元素。
   * @deprecated
   *   可以直接访问本元素的 lastElementChild 属性。
   */
  Element.prototype.getLastChild = function() {
    return this.lastElementChild;
  };

//--------------------------------------------------[Element.prototype.getChildren]
  /**
   * 获取本元素的所有子元素。
   * @name Element.prototype.getChildren
   * @function
   * @returns {Array} 包含本元素的所有子元素的数组，数组内各元素的顺序为调用本方法时各元素在文档树中的顺序。
   */
  Element.prototype.getChildren = function() {
    return Array.from(this.children);
  };

//--------------------------------------------------[Element.prototype.getChildCount]
  /**
   * 获取本元素的子元素的总数。
   * @name Element.prototype.getChildCount
   * @function
   * @returns {number} 本元素的子元素的总数。
   * @deprecated
   *   可以直接访问本元素的 childElementCount 属性。
   */
  Element.prototype.getChildCount = function() {
    return this.childElementCount;
  };

//--------------------------------------------------[Element.prototype.find]
  /**
   * 在本元素的后代元素中，根据指定的选择符查找符合条件的第一个元素。
   * @name Element.prototype.find
   * @function
   * @param {string} selector 选择符。
   * @returns {?Element} 查找到的元素。
   *   如果没有找到任何元素，返回 null。
   * @see http://www.w3.org/TR/selectors-api2/
   */
  Element.prototype.find = function(selector) {
    var $result;
    if (reBasicSelector.test(selector)) {
      $result = this.querySelector(selector);
    } else {
      var id = this.id || (this.id = '__temporary__');
      $result = this.querySelector('#' + id + ' ' + selector);
      if (this.id === '__temporary__') {
        this.removeAttribute('id');
      }
    }
    return $result;
  };

//--------------------------------------------------[Element.prototype.findAll]
  /**
   * 在本元素的后代元素中，根据指定的选择符查找符合条件的所有元素。
   * @name Element.prototype.findAll
   * @function
   * @param {string} selector 选择符。
   * @returns {Array} 包含查找到的元素的数组。
   *   如果没有找到任何元素，返回空数组。
   * @see http://www.w3.org/TR/selectors-api2/
   */
  Element.prototype.findAll = function(selector) {
    var result;
    if (reBasicSelector.test(selector)) {
      result = this.querySelectorAll(selector);
    } else {
      var id = this.id || (this.id = '__temporary__');
      result = this.querySelectorAll('#' + id + ' ' + selector);
      if (this.id === '__temporary__') {
        this.removeAttribute('id');
      }
    }
    return Array.from(result);
  };

//--------------------------------------------------[Element.prototype.matchesSelector]
  /**
   * 检查本元素是否能被指定的选择符选中。
   * @name Element.prototype.matchesSelector
   * @function
   * @param {string} selector 选择符。
   * @returns {boolean} 检查结果。
   * @see http://www.w3.org/TR/selectors-api2/
   */
  var matchesSelector = function() {
    var result = '';
    var possibleNames = ['matchesSelector', 'msMatchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector', 'oMatchesSelector'];
    var name;
    while (name = possibleNames.shift()) {
      if (name in $html) {
        result = name;
        break;
      }
    }
    return result;
  }();
  Element.prototype.matchesSelector = matchesSelector ? function(selector) {
    return this[matchesSelector](selector);
  } : function() {
    throw new TypeError('Unsupport method "matchesSelector"');
  };

//==================================================[Element 扩展 - 修改文档树]
  /*
   * 修改文档树的结构。
   *
   * 扩展方法：
   *   Element.prototype.clone
   *   Element.prototype.insertTo
   *   Element.prototype.swap
   *   Element.prototype.replace
   *   Element.prototype.remove
   *   Element.prototype.empty
   */

//--------------------------------------------------[Element.prototype.clone]
  /**
   * 克隆本元素。
   * @name Element.prototype.clone
   * @function
   * @param {boolean} [recursively] 是否进行深克隆。
   * @param {boolean} [keepListeners] 是否保留本元素及后代元素上的所有事件监听器。
   * @returns {Element} 克隆后的元素。
   * @description
   *   如果本元素有 id 属性，需注意克隆元素的 id 属性将与之有相同的值，必要时应进一步处理。
   *   不要克隆包含脚本的元素，以免出现兼容性问题。
   *   不要克隆包含样式表的元素，以免最终样式不符合预期。
   * @see http://jquery.com/
   * @see http://mootools.net/
   * @see http://w3help.org/zh-cn/causes/SD9029
   */
  Element.prototype.clone = function(recursively, keepListeners) {
    var $cloned = this.cloneNode(recursively);
    var originalElements = [this];
    var clonedElements = [$cloned];
    if (recursively) {
      originalElements = originalElements.concat(Array.from(this.getElementsByTagName('*')));
      clonedElements = clonedElements.concat(Array.from($cloned.getElementsByTagName('*')));
    }
    originalElements.forEach(function($original, index) {
      var $cloned = clonedElements[index];
      // 针对特定元素的处理。
      switch ($cloned.nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
          // 一些表单元素的状态可能未被正确克隆，克隆的表单元素将以这些元素的默认状态为当前状态。
          if ($cloned.type === 'radio' || $cloned.type === 'checkbox') {
            $cloned.checked = $cloned.defaultChecked = $original.defaultChecked;
          }
          $cloned.value = $cloned.defaultValue = $original.defaultValue;
          break;
        case 'OPTION':
          $cloned.selected = $cloned.defaultSelected = $original.defaultSelected;
          break;
      }
      // 处理事件。
      if (keepListeners) {
        var eventHandlers = $original.eventHandlers;
        if (eventHandlers) {
          Object.forEach(eventHandlers, function(handlers) {
            handlers.forEach(function(handler) {
              $cloned.on(handler.name, handler.listener);
            });
          });
        }
      }
    });
    return $cloned;
  };

//--------------------------------------------------[Element.prototype.insertTo]
  /**
   * 将本元素插入到目标元素的指定位置。
   * @name Element.prototype.insertTo
   * @function
   * @param {Element} $target 目标元素。
   * @param {string} [position] 要插入的位置，可选值请参考下表。
   *   <table>
   *     <tr><th>可选值</th><th>含义</th></tr>
   *     <tr><td><dfn>beforeBegin</dfn></td><td>将本元素插入到目标元素之前。</td></tr>
   *     <tr><td><dfn>afterBegin</dfn></td><td>将本元素插入到目标元素的所有内容之前。</td></tr>
   *     <tr><td><dfn>beforeEnd</dfn></td><td>将本元素插入到目标元素的所有内容之后。</td></tr>
   *     <tr><td><dfn>afterEnd</dfn></td><td>将本元素插入到目标元素之后。</td></tr>
   *   </table>
   *   如果该参数被省略，则使用 <dfn>beforeEnd</dfn> 作为默认值。
   * @returns {Element} 本元素。
   */
  Element.prototype.insertTo = function($target, position) {
    position = position || 'beforeEnd';
    return $target.insertAdjacentElement(position, this);
  };

//--------------------------------------------------[Element.prototype.swap]
  /**
   * 交换本元素和目标元素的位置。
   * @name Element.prototype.swap
   * @function
   * @param {Element} target 目标元素。
   * @returns {Element} 本元素。
   */
  Element.prototype.swap = 'swapNode' in $html ? function($target) {
    return this.swapNode($target);
  } : function($target) {
    var $targetParent = $target.parentElement;
    var $thisParent = this.parentElement;
    var referenceNode = this.nextSibling;
    if ($targetParent) {
      $targetParent.replaceChild(this, $target);
    } else {
      this.remove(true);
    }
    if ($thisParent) {
      $thisParent.insertBefore($target, referenceNode);
    }
    return this;
  };

//--------------------------------------------------[Element.prototype.replace]
  /**
   * 使用本元素替换目标元素。
   * @name Element.prototype.replace
   * @function
   * @param {Element} $target 目标元素。
   * @param {boolean} [keepListeners] 是否保留目标元素及后代元素上的所有事件监听器。
   * @returns {Element} 本元素。
   */
  Element.prototype.replace = function($target, keepListeners) {
    var $parent = $target.parentElement;
    if ($parent) {
      if (!keepListeners) {
        Array.from(removeAllListeners($target).getElementsByTagName('*')).forEach(removeAllListeners);
      }
      $parent.replaceChild(this, $target);
    }
    return this;
  };

//--------------------------------------------------[Element.prototype.remove]
  /**
   * 将本元素从文档树中删除。
   * @name Element.prototype.remove
   * @function
   * @param {boolean} [keepListeners] 是否保留本元素及后代元素上的所有事件监听器。
   * @returns {Element} 本元素。
   */
  Element.prototype.remove = function(keepListeners) {
    var $parent = this.parentElement;
    if ($parent) {
      if (!keepListeners) {
        Array.from(removeAllListeners(this).getElementsByTagName('*')).forEach(removeAllListeners);
      }
      $parent.removeChild(this);
    }
    return this;
  };

//--------------------------------------------------[Element.prototype.empty]
  /**
   * 将本元素的内容清空。
   * @name Element.prototype.empty
   * @function
   * @returns {Element} 本元素。
   * @description
   *   在本元素的所有后代元素上添加的事件监听器也将被删除。
   */
  Element.prototype.empty = function() {
    Array.from(this.getElementsByTagName('*')).forEach(removeAllListeners);
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    return this;
  };

//==================================================[Element 扩展 - 获取坐标信息]
  /*
   * 获取元素在视口中的坐标信息。
   *
   * 扩展方法：
   *   Element.prototype.getClientRect
   */

//--------------------------------------------------[Element.prototype.getClientRect]
  /**
   * 获取本元素的 border-box 在视口中的坐标信息。
   * @name Element.prototype.getClientRect
   * @function
   * @returns {Object} 包含位置（left、right、top、bottom）及尺寸（width、height）的对象，所有属性值均为 number 类型，单位为像素。
   * @deprecated
   *   可以直接调用本元素的 getBoundingClientRect 方法。
   */
  Element.prototype.getClientRect = function() {
    return this.getBoundingClientRect();
  };

//==================================================[Element 扩展 - 处理类]
  /*
   * 针对元素的类的操作。
   *
   * 扩展方法：
   *   Element.prototype.hasClass
   *   Element.prototype.addClass
   *   Element.prototype.removeClass
   *   Element.prototype.toggleClass
   */

//--------------------------------------------------[Element.prototype.hasClass]
  /**
   * 检查本元素是否有指定的类名。
   * @name Element.prototype.hasClass
   * @function
   * @param {string} className1 要检查的类名 1。
   * @param {string} [className2] 要检查的类名 2。
   * @param {string} […] 要检查的类名 n。
   * @returns {boolean} 检查结果。
   */
  Element.prototype.hasClass = function() {
    var classList = this.classList;
    return Array.from(arguments).every(function(className) {
      return classList.contains(className);
    });
  };

//--------------------------------------------------[Element.prototype.addClass]
  /**
   * 为本元素添加类名。
   * @name Element.prototype.addClass
   * @function
   * @param {string} className1 要添加的类名 1。
   * @param {string} [className2] 要添加的类名 2。
   * @param {string} […] 要添加的类名 n。
   * @returns {Element} 本元素。
   */
  Element.prototype.addClass = function() {
    var classList = this.classList;
    Array.from(arguments).forEach(function(className) {
      classList.add(className);
    });
    return this;
  };

//--------------------------------------------------[Element.prototype.removeClass]
  /**
   * 删除本元素的类名。
   * @name Element.prototype.removeClass
   * @function
   * @param {string} className1 要删除的类名 1。
   * @param {string} [className2] 要删除的类名 2。
   * @param {string} […] 要删除的类名 n。
   * @returns {Element} 本元素。
   */
  Element.prototype.removeClass = function(className) {
    var classList = this.classList;
    Array.from(arguments).forEach(function(className) {
      classList.remove(className);
    });
    return this;
  };

//--------------------------------------------------[Element.prototype.toggleClass]
  /**
   * 切换本元素的类名。
   * @name Element.prototype.toggleClass
   * @function
   * @param {string} className1 要切换的类名 1。
   * @param {string} [className2] 要切换的类名 2。
   * @param {string} […] 要切换的类名 n。
   * @returns {Element} 本元素。
   * @description
   *   如果本元素没有指定的类名，则添加指定的类名，否则删除指定的类名。
   */
  Element.prototype.toggleClass = function(className) {
    var classList = this.classList;
    Array.from(arguments).forEach(function(className) {
      classList.toggle(className);
    });
    return this;
  };

//==================================================[Element 扩展 - 处理样式]
  /*
   * 获取/修改元素的样式。
   *
   * 扩展方法：
   *   Element.prototype.getStyle
   *   Element.prototype.getStyles
   *   Element.prototype.setStyle
   *   Element.prototype.setStyles
   */

  // 单位为数字时不自动添加 'px' 的 CSS 属性。
  var numericValues = {
    'fill-opacity': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'orphans': true,
    'widows': true,
    'z-index': true,
    'zoom': true
  };

  // 浏览器可能添加私有前缀的 CSS 属性名。
  var vendorPrefixedNames = {};
  [
    'user-select',
    'transform', 'transform-origin', 'backface-visibility', 'perspective',
    'transition', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'
  ]
      .forEach(function(propertyName) {
        var availablePropertyName = window.getAvailableCSSPropertyName(propertyName);
        if (availablePropertyName) {
          vendorPrefixedNames[propertyName] = availablePropertyName;
        }
      });

//--------------------------------------------------[Element.prototype.getStyle]
  /**
   * 获取本元素的“计算后的样式”中某个属性的值。
   * @name Element.prototype.getStyle
   * @function
   * @param {string} propertyName 属性名（不支持复合属性），应使用 camel case 格式。
   * @returns {string} 对应的属性值，如果获取的是长度值，其单位未必是 px，可能是其定义时的单位。
   * @description
   *   注意：不要尝试获取未插入文档树的元素的“计算后的样式”，它们存在兼容性问题。
   */
  Element.prototype.getStyle = function(propertyName) {
    propertyName = propertyName.dasherize();
    propertyName = vendorPrefixedNames[propertyName] || propertyName;
    var computedStyle = window.getComputedStyle(this, null);
    return computedStyle && computedStyle.getPropertyValue(propertyName) || '';
  };

//--------------------------------------------------[Element.prototype.getStyles]
  /**
   * 获取本元素的“计算后的样式”中一组属性的值。
   * @name Element.prototype.getStyles
   * @function
   * @param {Array} propertyNames 指定要获取的属性名，可以为任意个。
   * @returns {Object} 包含一组属性值的，格式为 {propertyName: propertyValue, ...} 的对象。
   */
  Element.prototype.getStyles = function(propertyNames) {
    var styles = {};
    propertyNames.forEach(function(propertyName) {
      styles[propertyName] = this.getStyle(propertyName);
    }, this);
    return styles;
  };

//--------------------------------------------------[Element.prototype.setStyle]
  /**
   * 为本元素设置一条行内样式声明。
   * @name Element.prototype.setStyle
   * @function
   * @param {string} propertyName 属性名（支持复合属性），应使用 camel case 格式。
   * @param {number|string} propertyValue 属性值。
   *   若为数字，则为期望长度单位的属性值自动添加长度单位 'px'。
   *   若为空字符串，则删除本条行内样式声明。
   * @returns {Element} 本元素。
   * @description
   *   注意：如果设置的是长度值，且长度单位不是 'px' 则不能省略长度单位。
   */
  Element.prototype.setStyle = function(propertyName, propertyValue) {
    propertyName = propertyName.dasherize();
    propertyName = vendorPrefixedNames[propertyName] || propertyName;
    if (propertyValue === '') {
      this.style.removeProperty(propertyName);
    } else {
      this.style.setProperty(propertyName, Number.isFinite(propertyValue) && !numericValues[propertyName] ? propertyValue + 'px' : propertyValue);
    }
    return this;
  };

//--------------------------------------------------[Element.prototype.setStyles]
  /**
   * 为本元素设置一组行内样式声明。
   * @name Element.prototype.setStyles
   * @function
   * @param {Object} declarations 包含一条或多条要设置的样式声明，格式为 {propertyName: propertyValue, ...} 的对象。
   *   关于 propertyName 和 propertyValue 的说明，请参考 Element.prototype.setStyle 方法的同名参数。
   * @returns {Element} 本元素。
   */
  Element.prototype.setStyles = function(declarations) {
    Object.forEach(declarations, function(propertyValue, propertyName) {
      this.setStyle(propertyName, propertyValue);
    }, this);
    return this;
  };

//--------------------------------------------------[Element.prototype.reflow]
  /**
   * 重新布局本元素。
   * @name Element.prototype.reflow
   * @function
   * @returns {Element} 本元素。
   */
  Element.prototype.reflow = function() {
    var _ = this.offsetWidth;
    return this;
  };

//==================================================[Element 扩展 - 处理自定义数据]
  /*
   * 获取/添加/删除元素的自定义数据。
   *
   * 扩展方法：
   *   Element.prototype.getData
   *   Element.prototype.setData
   *   Element.prototype.removeData
   */

  var reValidName = /^[a-z][a-zA-Z]*$/;
  var parseDataKey = function(key) {
    return reValidName.test(key) ? 'data-' + key.dasherize() : '';
  };

//--------------------------------------------------[Element.prototype.getData]
  /**
   * 从本元素中读取一条自定义数据。
   * @name Element.prototype.getData
   * @function
   * @param {string} key 数据名。
   * @returns {?string} 数据值。
   *   如果指定的数据名不存在，返回 null。
   * @see http://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes
   */
  Element.prototype.getData = 'dataset' in $html ? function(key) {
    var value = this.dataset[key];
    return value === undefined ? null : value;
  } : function(key) {
    key = parseDataKey(key);
    var value = this.getAttribute(key);
    return typeof value === 'string' ? value : null;
  };

//--------------------------------------------------[Element.prototype.setData]
  /**
   * 向本元素中保存一条自定义数据。
   * @name Element.prototype.setData
   * @function
   * @param {string} key 数据名，必须为 camel case 形式，并且只能包含英文字母。
   * @param {string} value 数据值，必须为字符串。
   * @returns {Element} 本元素。
   */
  Element.prototype.setData = function(key, value) {
    key = parseDataKey(key);
    if (key) {
      this.setAttribute(key, String(value));
    }
    return this;
  };

//--------------------------------------------------[Element.prototype.removeData]
  /**
   * 删除本元素的一条自定义数据。
   * @name Element.prototype.removeData
   * @function
   * @param {string} key 数据名。
   * @returns {Element} 本元素。
   */
  Element.prototype.removeData = function(key) {
    key = parseDataKey(key);
    if (key) {
      this.removeAttribute(key);
    }
    return this;
  };

//==================================================[Element 扩展 - HTMLFormElement]
  /*
   * 为表单元素扩展新属性。
   *
   * 扩展方法：
   *   HTMLFormElement.prototype.getFieldValue
   *   HTMLFormElement.prototype.serialize  // TODO
   */

//--------------------------------------------------[HTMLFormElement]
  /**
   * 确保 HTMLFormElement.prototype 可访问。
   * @name HTMLFormElement
   * @namespace
   */
//  var HTMLFormElement = fixElementConstructor('FORM', 'HTMLFormElement');

//--------------------------------------------------[HTMLFormElement.prototype.getFieldValue]
  // TODO
  /*
   * 获取一个或一组控件的当前值，并对下列不一致的情况（*）作统一化处理。
   * 如果为 select-one 类型：
   *   取最后一个设置了 selected 的 OPTION 值。
   *   若该 OPTION 设置了 disabled 则认为本控件无有效值（虽然此时可以取到该控件的 selectedIndex 和 value 值）。
   *     * IE6 IE7 不支持 OPTION 和 OPTGROUP 元素的 disabled 属性（http://w3help.org/zh-cn/causes/HF3013）。
   *   若没有设置了 selected 的 OPTION，则取第一个未设置 disabled 的 OPTION 值。
   *     * Safari 5.1.7 在上述情况发生时，其 selectedIndex 为 0，但认为本控件无有效值。
   *     ! IE6 IE7 不支持 OPTION 的 disabled 属性，所以其 selectedIndex 将为 0，但由于 IE6 IE7 不支持 hasAttribute 方法，因此无法修复本差异。
   *   若所有的 OPTION 都设置了 disabled，则其 selectedIndex 为 -1，并且认为本控件无有效值。
   *     * 仅 Firefox 14.0.1 和 Opera 12.02 在上述情况发生时会将其 selectedIndex 设置为 -1，但后者会将第一个 OPTION 元素的 value 作为有效值提交。
   *     * 其他浏览器则将其 selectedIndex 设置为 0，但认为本控件无有效值。
   * 如果为 select-multiple 类型：
   *   若没有设置了 selected 的 OPTION，则认为没有默认选中项，selectedIndex 为 -1，本控件无有效值（多选情况下的 selectedIndex 和 value 无实际意义）。
   *   所有设置了 selected 的 OPTION 认为有效。
   *   所有设置了 disabled 的 OPTION 认为无效。
   */
  /**
   * 获取本表单内某个域的当前值。
   * @name HTMLFormElement.prototype.getFieldValue
   * @function
   * @param {string} name 域的名称。
   * @returns {string|Array} 域的当前值。
   * @description
   *   当该域只包含一个非 select-multiple 类型的控件时，如果具备有效值则返回该值，否则返回空字符串（将无效值与空字符串等同处理是为了降低后续处理的复杂度）。
   *   其他情况（该域只包含一个 select-multiple 类型的控件或者多个任意类型的控件时）返回数组，值为空字符串的项不会被加入数组。
   * @see http://www.w3.org/TR/REC-html40/interact/forms.html#successful-controls
   */
  var getCurrentValue = function(control) {
    var value = '';
    if (control.nodeType) {
      switch (control.type) {
        case 'radio':
        case 'checkbox':
          if (control.checked && !control.disabled) {
            value = control.value;
          }
          break;
        case 'select-one':
        case 'select-multiple':
          if (!control.disabled) {
            // 不能使用 Array.from(control.options).forEach(...)，原因见 typeOf 的注释。
            var options = control.options;
            var i = 0;
            var option;
            if (control.type === 'select-one') {
              var selectedIndex = control.selectedIndex;
              if (navigator.isSafari && selectedIndex === 0 && !options[0].hasAttribute('selected')) {
                while (option = options[++i]) {
                  if (!option.disabled && !option.parentNode.disabled) {
                    selectedIndex = i;
                    break;
                  }
                }
              }
              if (selectedIndex >= 0 && !options[selectedIndex].disabled) {
                value = options[selectedIndex].value;
              }
            } else {
              value = [];
              while (option = options[i++]) {
                if (option.selected && !option.disabled && !option.parentNode.disabled) {
                  value.push(option.value);
                }
              }
            }
          }
          break;
        default:
          if (!control.disabled) {
            value = control.value;
          }
      }
    } else {
      value = [];
      Array.from(control).forEach(function(control) {
        var v = getCurrentValue(control);
        if (v) {
          value = value.concat(v);
        }
      });
    }
    return value;
  };

  HTMLFormElement.prototype.getFieldValue = function(name) {
    var control = this.elements[name];
    if (!control) {
      throw new Error('Invalid field name "' + name + '"');
    }
    return getCurrentValue(control);
  };

//==================================================[Element 扩展 - HTMLSelectElement]
  /*
   * 为下拉选单元素扩展新属性。
   *
   * 扩展方法：
   *   HTMLSelectElement.prototype.insertOption
   *   HTMLSelectElement.prototype.deleteOption
   */

//--------------------------------------------------[HTMLSelectElement]
  /**
   * 确保 HTMLSelectElement.prototype 可访问。
   * @name HTMLSelectElement
   * @namespace
   */
//  var HTMLSelectElement = fixElementConstructor('SELECT', 'HTMLSelectElement');

  // 使各元素的 remove 方法表现一致。目前各浏览器的 HTMLSelectElement.prototype.remove 方法的作用为删除指定的 OPTION 元素。
  if (HTMLSelectElement.prototype.remove) {
    HTMLSelectElement.prototype.remove = Element.prototype.remove;
  }

//--------------------------------------------------[HTMLSelectElement.prototype.insertOption]
  // TODO
  /**
   * 在本下拉选单中插入一个新的选项。
   * @name HTMLSelectElement.prototype.insertOption
   * @function
   * @param {number} index 在指定的索引之前插入新选项。索引从 0 开始，如果指定的索引大于当前选项的数目或为 -1，则在所有选项之后插入新选项。
   * @param {string} text 新选项的文本。
   * @param {string} value 新选项的值。
   * @param {boolean} [defaultSelected] 新选项是否为默认选中。如果指定为 true，则在本下拉选单所属的表单被重置后，这个选项将被选中。
   * @param {boolean} [selected] 新选项的当前状态是否为选中。
   * @returns {Element} 本元素。
   * @description
   *   如果 SELECT 元素中含有 OPTGROUP 则不适合使用本方法。
   */
  HTMLSelectElement.prototype.insertOption = function(index, text, value, defaultSelected, selected) {
    this.options.add(new Option(text, value, defaultSelected, selected), index);
    return this;
  };

//--------------------------------------------------[HTMLSelectElement.prototype.deleteOption]
  // TODO
  /**
   * 删除本下拉选单中的一个指定选项。
   * @name HTMLSelectElement.prototype.deleteOption
   * @function
   * @param {number} index 要删除的选项的索引。索引从 0 开始，如果指定的索引大于当前选项的数目或为 -1，则不会删除任何选项。
   * @returns {Element} 本元素。
   */
  HTMLSelectElement.prototype.deleteOption = function(index) {
    var $option = index > -1 ? this.options[index] : null;
    if ($option) {
      $option.remove();
    }
    return this;
  };

// TODO: 到这里了 2013-12-15 23:48
//==================================================[DOM 事件模型]
  /*
   * 为 DOM 对象提供的事件模型，这套事件模型是基于原生 DOM 事件模型的，解决了常见的兼容性问题，并增加了新的属性。
   *
   * 相关名词的解释如下：
   *   原生事件对象 (e)：
   *     原生的 DOM 事件对象。
   *   事件对象 (event)：
   *     本事件模型提供的事件对象，包含与此事件有关的信息，是 DOMEvent 的实例。
   *     大多数内置事件的 event 都是对 e 的封装（不直接扩展 e 是因为 e 的一些属性是只读的），可以通过访问 event.originalEvent 得到 e。
   *     自定义事件和少数内置事件产生的 event 不是对 e 的封装，也有一些特殊类型的事件并不产生 event。
   *   默认行为：
   *     对于某种 e，在使用原生 DOM 事件模型的传播途径传播到顶端时，浏览器会根据情况执行的某种行为。
   *     只有 e 才可能有默认行为，event 目前都未加入任何默认行为。
   *   传播：
   *     使可以冒泡的 event 可以在文档树中逐级向上传递到每个可以到达的节点，和原生 DOM 事件模型的冒泡部分一样。
   *   分发：
   *     在一个指定的节点上，将 event 作为参数逐个传入该节点相应的监听器。
   *   触发器 (trigger)：
   *     通过一个或多个原生监听器实现，当确定一个内置事件发生时，触发器会自动创建、传播和分发 event。
   *   分发器 (distributor)：
   *     通过一个原生监听器实现，当确定一个内置事件发生时，分发器会自动创建并分发 event（不会传播）。
   *   监听器 (listener)：
   *     添加到一个节点的、监听某种类型的事件的函数，有普通和代理两种类型。
   *     当对应类型的 event 传播到本节点时，对应的监听器会被调用，并传入 event 作为其唯一的参数。
   *     可以通过调用 event 的相应方法来阻止其继续传播，或取消其默认行为。
   *     如果一个监听器返回了 false，则该 event 将自动停止传播并取消默认行为。
   *   监听器名称 (name)：
   *     由要监听的 type、可选的 qualifiers 和 label 组成，其中只有 type 是必选的。
   *   事件类型 (type)：
   *     事件的类型，分为内置和自定义两种。
   *   限定符 (qualifiers)：
   *     用于限定监听器的行为。其中 relay 表示是否为代理监听，once 用于限定监听器是否仅能被调用一次，idle 用于指定监听器的延迟调用时间，throttle 用于指定监听器可被连续调用的最短时间间隔。
   *   标签 (label)：
   *     在 name 的末尾添加 label 可以使相同节点上添加的相同类型、相同行为的监听器具备不同的名称。不同的名称可以确保调用 off 方法时能够精确匹配要删除的监听器。
   *
   * 添加或删除监听器：
   *   通过调用 on 或 off 方法来添加或删除指定的监听器。
   *
   * 触发事件：
   *   内置类型 - 自动触发
   *     * “独立”模式
   *       将触发器作为原生监听器添加到某个节点，当确定事件发生时，触发器会自动在其所属的节点上调用 fire 方法来创建、传播和分发 event。
   *       这种情况下，event 将使用本模型提供的传播机制在文档树中传播（不依赖任何 e），并且 event 会自动分发给相应的监听器。
   *       在本次事件的生命周期内，只会有一个 event 被创建。
   *       不使用原生事件模型是因为 IE6 IE7 IE8 通过 document.createEventObject 方法创建的 e 无法执行默认行为，也不能通过 e 来传递自定义参数属性。另外 window 对象也没有提供 fireEvent 方法。
   *       要避免以上问题，现阶段较好的方式是不使用原生事件模型。
   *     * “协同”模式
   *       将分发器作为原生监听器添加到某个节点，当确定事件发生时，分发器会自动在其所属的节点上根据 e 来创建并分发 event。
   *       这种 event 不会在文档树中传播，真正传播的是 e，但 event 的一些方法中有对 e 的相应方法的引用，因此调用这些方法时也会影响 e 的行为。
   *       在本次事件的生命周期内，可能会有多个 event 被创建，每个 event 只在创建它的节点上被重用。
   *       这样处理是因为 IE6 IE7 IE8 中，原生事件模型分发给每个监听器的 e 都是不同的，因此无法实现一次封装多处调用。
   *       其他浏览器虽然没有上述问题，但为了保持一致并简化代码逻辑，也不做处理。事实上同一事件被不同节点监听的情况相对来说并不常见。
   *     两种模式的应用场景：
   *       对于没有明显兼容性问题（只考虑 e 的冒泡阶段）的内置事件，使用“协同”模式来处理。
   *       对于有兼容性问题的事件，根据解决方案的不同，有以下两种情况：
   *         1. 能够以一个其他原生事件来模拟，并且可以依赖 e 的传播机制的，使用“独立”模式来处理。
   *            如 mousewheel/mouseenter/mouseleave 事件的解决方案。
   *         2. 以一个或多个原生事件来模拟，但是不能依赖 e 的传播机制的（在确认事件发生时 e 可能已经传播到文档树的顶层了），则使用“协同”模式来处理。
   *            如 mousedragstart/mousedrag/mousedragend/focusin/focusout/change 等事件的处理方式。
   *            在一些特殊的情况下，如果 e 被阻止传播，可能会导致结果与预期的不符。
   *   内置类型 - 手动触发
   *     * 通过调用 fire 方法来触发。
   *       这相当于使用了自动触发的“独立”模式，来主动触发一个事件。
   *       此时不会触发任何原生事件，也不会执行此类事件的默认行为。
   *       当只希望调用某类事件的监听器时，应使用这种方式。
   *     * 对于一些内置事件（如 click 和 reset），可以在相应的对象上调用与要触发的事件类型同名的方法（如果有）来触发。
   *       此时同名的原生事件将被触发（产生的 e 可能具备默认行为）并依赖自动触发的“协同”模式来进行后续处理。
   *       当除了要调用某类事件的监听器，还希望该事件的默认行为生效时，应使用这种方式。
   *   自定义类型
   *     * 自定义类型的事件只能通过调用 fire 方法来触发。
   *       fire 方法会自动创建、传播和分发 event。
   *
   * 提供对象：
   *   DOMEvent
   *   DOMEventTarget
   *
   * 提供实例属性：
   *   eventHandlers
   *   <Object eventHandlers> {
   *     <string type>: <Array handlers> [
   *       <Object handler> {
   *         name: <string name>,
   *         listener: <Function listener>,
   *         selector: <string selector>,
   *         simpleSelector: <Object simpleSelector> {
   *           tagName: <string tagName>,
   *           className: <string className>
   *         }
   *       }
   *     ]
   *      .distributor: <Function distributor>.type: <string type>
   *      .distributor: null
   *      .delegateCount: <number delegateCount>
   *   }
   *
   * 提供实例方法：
   *   DOMEventTarget.prototype.on
   *   DOMEventTarget.prototype.off
   *   DOMEventTarget.prototype.fire
   *
   * 参考：
   *   http://jquery.com/
   *   http://www.quirksmode.org/dom/w3c_events.html
   *   http://www.w3.org/TR/DOM-Level-3-Events/#events-module
   */
  var EVENT_CODES = {mousedown: 5, mouseup: 5, click: 5, dblclick: 5, contextmenu: 5, mousemove: 5, mouseover: 5, mouseout: 5, mouseenter: 1, mouseleave: 1, mousewheel: 5, mousedragstart: 5, mousedrag: 5, mousedragend: 5, mousedragenter: 5, mousedragleave: 5, mousedragover: 5, mousedrop: 5, keydown: 6, keypress: 6, keyup: 6, focus: 0, blur: 0, focusin: 4, focusout: 4, input: 4, change: 4, select: 0, cut: 4, copy: 4, paste: 4, submit: 0, reset: 0, scroll: 0, resize: 0, load: 0, unload: 0, error: 0, beforedomready: 0, domready: 0, afterdomready: 0, transitionend: 4, touchstart: 4, touchend: 4, touchmove: 4, touchcancel: 4, orientationchange: 0};
  var DELEGATEABLE_EVENTS = {mouseenter: true, mouseleave: true};
  var returnTrue = function() {
    return true;
  };
  var returnFalse = function() {
    return false;
  };

  // 参数分隔符。
  var separator = /\s*,\s*/;

  // 解析监听器名称，取出相关的属性。
  var reEventName = /^([a-zA-Z]+)(?::relay\(([^\)]+)\))?(?::(once)|:idle\((\d+)\)|:throttle\((\d+)\))?(?:\.\w+)?$/;
  var reBrace = /({)|}/g;
  var getEventAttributes = function(name) {
    // JS 的正则表达式不支持平衡组，因此将选择符部分的括号替换，以正确的匹配各属性。
    var parsedName = '';
    var pair = 0;
    var i = 0;
    var character;
    while (character = name.charAt(i++)) {
      if (character === '{' || character === '}') {
        parsedName = '';
        break;
      }
      if (character === '(') {
        if (pair > 0) {
          character = '{';
        }
        ++pair;
      } else if (character === ')') {
        --pair;
        if (pair > 0) {
          character = '}';
        }
      }
      parsedName += character;
    }
    // 取得各属性。
    var match = parsedName.match(reEventName);
    if (match === null) {
      throw new SyntaxError('Invalid listener name "' + name + '"');
    }
    return {
      type: match[1],
      selector: match[2] ? match[2].replace(reBrace, function(_, leftBrace) {
        return leftBrace ? '(' : ')';
      }) : '',
      once: !!match[3],
      idle: parseInt(match[4], 10),
      throttle: parseInt(match[5], 10)
    };
  };

  // 将事件对象分发给相应的监听器。
  var distributeEvent = function(eventTarget, handlers, event, isTriggered) {
    // 分发时对 handlers 的副本（仅复制了 handlers 的数组部分）操作，以避免在监听器内添加或删除该对象的同类型的监听器时会影响本次分发过程。
    var handlersCopy = handlers.slice(0);
    var delegateCount = handlers.delegateCount;
    var currentTarget = delegateCount ? event.target : eventTarget;
    var filters = {};
    var handler;
    var selector;
    var i;
    var total;
    // 开始分发。
    do {
      if (currentTarget === eventTarget) {
        // 普通监听器。
        i = delegateCount;
        total = handlersCopy.length;
      } else {
        // 代理监听器。
        i = 0;
        total = delegateCount;
      }
      while (i < total) {
        handler = handlersCopy[i++];
        selector = handler.selector;
        // 如果是代理事件监听，则过滤出符合条件的元素。
        if (!selector || (filters[selector] || (filters[selector] = function(simpleSelector) {
          if (simpleSelector) {
            return function(currentTarget) {
              var tagName = simpleSelector.tagName;
              var className = simpleSelector.className;
              return (tagName ? currentTarget.nodeName === tagName : true) && (className ? currentTarget.hasClass(className) : true);
            };
          } else {
            var elements = eventTarget.findAll(selector);
            return function(currentTarget) {
              return elements.contains(currentTarget);
            }
          }
        }(handler.simpleSelector)))(currentTarget)) {
          if (!isTriggered || isTriggered.call(currentTarget, event)) {
            // 监听器被调用时 this 的值为监听到本次事件的对象。
            if (handler.listener.call(currentTarget, event) === false) {
              event.stopPropagation();
              event.preventDefault();
            }
            if (event.isImmediatePropagationStopped()) {
              break;
            }
          }
        }
      }
      // 如果正在进行代理监听（当前对象不是监听到本次事件的对象），且事件可以继续传播时，向上一级传播，直到传播到监听到本次事件的对象为止。
    } while (!(currentTarget === eventTarget || event.isPropagationStopped()) && (currentTarget = currentTarget === document && window || currentTarget === $html && document || currentTarget.getParent()));
  };

  // 删除一个元素上的所有事件监听器。
  var removeAllListeners = function(target) {
    var eventHandlers = target.eventHandlers;
    if (eventHandlers) {
      var types = Object.keys(eventHandlers);
      var handlers;
      while (types.length) {
        handlers = eventHandlers[types.shift()];
        while (handlers.length) {
          target.off(handlers[0].name);
        }
      }
    }
    return target;
  };

  // 触发器。
  var triggers = {};
  // 拖动相关事件，为避免覆盖 HTML5 草案中引入的同名事件，加入前缀 mouse。
  // 只支持鼠标左键的拖拽，拖拽过程中松开左键、按下其他键、或当前窗口失去焦点都将导致拖拽事件结束。
  // 应避免在拖拽进行时删除本组事件的监听器，否则可能导致拖拽动作无法正常完成。
  triggers.mousedragstart = triggers.mousedrag = triggers.mousedragend = function() {
    // 三个关联事件。
    var relatedTypes = ['mousedragstart', 'mousedrag', 'mousedragend'];
    // 在 Chrome 25 和 Safari 5.1.7 下，如果一个页面是在 frame 中被载入的，那么在该页面中，一旦有一个传递到 document 的 mousedown 事件被阻止了默认行为，则在 document 上后续发生的 mousemove 事件在鼠标指针离开该文档的区域后无法被自动捕获。因此使用以下监听器来避免在拖动过程中选中页面的内容。
    // http://www.w3help.org/zh-cn/causes/BX2050
    var unselectableForWebKit = function(e) {
      e.preventDefault();
    };
    if ((navigator.isChrome || navigator.isSafari) && window !== top) {
      unselectableForWebKit.enabled = true;
    }
    // 是否支持触摸事件。
    var touchable = window.support.touch;
    var touchId = NaN;
    // 触发 mousedragstart、mousedrag 和 mousedragend 事件的对象。
    var target = null;
    // 拖拽开始时鼠标的坐标。
    var startX = 0;
    var startY = 0;
    // 是否以正在被拖拽的元素的中心点为取样点，来获取触发 mousedragenter、mousedragleave、mousedragover 和 mousedrop 事件的对象。
    // 其值只能在 mousedragstart 事件的监听器中，通过事件对象的属性来指定（在此之前必须首先指定 relatedTarget 属性的值）。
    var aimRelatedTarget = false;
    // 拖过的元素和上一个拖过的元素。
    var dragOverTarget = null;
    var lastDragOverTarget = null;
    // 保存最后一个事件对象的数据。
    var data = {};
    var eventProperties = ['timeStamp', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'clientX', 'clientY', 'screenX', 'screenY', 'pageX', 'pageY', 'leftButton', 'middleButton', 'rightButton', 'which'];
    var saveData = function(event) {
      eventProperties.forEach(function(key) {
        if (event[key]) {
          data[key] = event[key];
        }
      });
    };
    var dragStart = function(e) {
      if (!target) {
        // 获取事件包装对象。
        var event = new DOMEvent(e.type, e);
        if (touchable || event.leftButton) {
          target = event.target;
          // 避免在拖动过程中选中页面的内容。
          if (target.setCapture) {
            target.setCapture();
          }
          if (unselectableForWebKit.enabled) {
            document.addEventListener('selectstart', unselectableForWebKit, false);
          } else {
            event.preventDefault();
          }
          // 初始化本次拖拽状态。
          startX = event.pageX;
          startY = event.pageY;
          // 保存事件对象的属性。
          saveData(event);
          data.offsetX = data.offsetY = 0;
          // 触发 mousedragstart 事件。
          var mouseDragStartEvent = target.fire('mousedragstart', data);
          // 保存在 mousedragstart 事件的监听器中的设置。
          data.relatedTarget = mouseDragStartEvent.relatedTarget || null;
          aimRelatedTarget = !!mouseDragStartEvent.aimRelatedTarget;
          // 添加原生监听器。
          setTimeout(function() {
            if (touchable) {
              document.addEventListener('touchmove', draggingByTouch, false);
              document.addEventListener('touchend', dragEndByTouch, false);
              document.addEventListener('touchcancel', dragEndByTouch, false);
            } else {
              document.addEventListener('mousemove', dragging, false);
              document.addEventListener('mousedown', dragEnd, false);
              document.addEventListener('mouseup', dragEnd, false);
            }
            window.addEventListener('blur', dragEnd, false);
          }, 0);
        }
      }
    };
    var dragging = function(e) {
      // 获取事件包装对象。
      var event = new DOMEvent(e.type, e);
      // 保存事件对象的属性。
      saveData(event);
      data.offsetX = event.pageX - startX;
      data.offsetY = event.pageY - startY;
      // 触发 mousedrag 事件。
      target.fire('mousedrag', data);
      // 触发 mousedragenter、mousedragleave 和 mousedragover 事件。
      var x = event.clientX;
      var y = event.clientY;
      var relatedTarget = data.relatedTarget;
      if (relatedTarget) {
        if (aimRelatedTarget) {
          var clientRect = relatedTarget.getClientRect();
          x = clientRect.left + Math.floor(clientRect.width / 2);
          y = clientRect.top + Math.floor(clientRect.height / 2);
        }
        var style = relatedTarget.style;
        var left = style.left;
        var top = style.top;
        style.left = '-50000px';
        style.top = '0';
      }
      dragOverTarget = document.elementFromPoint(x, y);
      if (relatedTarget) {
        style.left = left;
        style.top = top;
      }
      if (dragOverTarget !== lastDragOverTarget) {
        if (lastDragOverTarget) {
          lastDragOverTarget.fire('mousedragleave', data);
        }
        if (dragOverTarget) {
          dragOverTarget.fire('mousedragenter', data);
        }
      }
      if (dragOverTarget) {
        dragOverTarget.fire('mousedragover', data);
      }
      lastDragOverTarget = dragOverTarget;
    };
    var dragEnd = function(e) {
      if (e.type.startsWith('mouse')) {
        // 获取事件包装对象。
        var event = new DOMEvent(e.type, e);
        // 保存事件对象的属性。
        saveData(event);
      }
      // 触发 mousedrop 事件。
      data.timeStamp = Date.now();
      if (dragOverTarget) {
        dragOverTarget.fire('mousedrop', data);
      }
      // 触发 mousedragend 事件。
      target.fire('mousedragend', data);
      // 取消阻止选中页面的内容。
      if (target.releaseCapture) {
        target.releaseCapture();
      }
      if (unselectableForWebKit.enabled) {
        document.removeEventListener('selectstart', unselectableForWebKit, false);
      }
      target = dragOverTarget = lastDragOverTarget = null;
      startX = startY = 0;
      aimRelatedTarget = false;
      data = {};
      // 删除原生监听器。
      if (touchable) {
        document.removeEventListener('touchmove', draggingByTouch, false);
        document.removeEventListener('touchend', dragEndByTouch, false);
        document.removeEventListener('touchcancel', dragEndByTouch, false);
      } else {
        document.removeEventListener('mousemove', dragging, false);
        document.removeEventListener('mousedown', dragEnd, false);
        document.removeEventListener('mouseup', dragEnd, false);
      }
      window.removeEventListener('blur', dragEnd, false);
    };
    var dragStartByTouch = function(e) {
      if (!touchId) {
        var touch = e.changedTouches[0];
        touchId = touch.identifier;
        dragStart(Object.mixin(touch, {
          type: 'mousedown',
          preventDefault: function() {
            e.preventDefault();
          }
        }));
      }
    };
    var draggingByTouch = function(e) {
      var touch = null;
      Array.from(e.changedTouches).some(function(changedTouche) {
        if (changedTouche.identifier === touchId) {
          touch = changedTouche;
        }
        return touch;
      });
      if (touch) {
        dragging(Object.mixin(touch, {type: 'mousemove'}));
      }
    };
    var dragEndByTouch = function(e) {
      var touch = null;
      Array.from(e.changedTouches).some(function(changedTouche) {
        if (changedTouche.identifier === touchId) {
          touchId = NaN;
          touch = changedTouche;
        }
        return touch;
      });
      if (touch) {
        dragEnd(Object.mixin(touch, {type: 'mouseup'}));
      }
    };
    return {
      add: function(eventTarget) {
        // 向这三个关联事件中添加第一个监听器时，即创建 mousedragstart 触发器，该触发器会动态添加/删除另外两个事件的触发器。
        if (touchable) {
          eventTarget.addEventListener('touchstart', dragStartByTouch, false);
        } else {
          eventTarget.addEventListener('mousedown', dragStart, false);
        }
        // 创建另外两个事件的处理器组。
        var eventHandlers = eventTarget.eventHandlers;
        relatedTypes.forEach(function(relatedType) {
          if (!eventHandlers[relatedType]) {
            var handlers = [];
            handlers.delegateCount = 0;
            eventHandlers[relatedType] = handlers;
          }
        });
      },
      remove: function(eventTarget) {
        // 在这三个关联事件中删除最后一个监听器后，才删除它们的触发器。
        var eventHandlers = eventTarget.eventHandlers;
        var handlerCount = 0;
        relatedTypes.forEach(function(relatedType) {
          handlerCount += eventHandlers[relatedType].length;
        });
        if (handlerCount === 0) {
          if (touchable) {
            eventTarget.removeEventListener('touchstart', dragStartByTouch, false);
          } else {
            eventTarget.removeEventListener('mousedown', dragStart, false);
          }
          // 删除三个关联事件的处理器组。
          relatedTypes.forEach(function(type) {
            delete eventHandlers[type];
          });
        }
        return false;
      }
    };
  }();

  // 使 Firefox 支持 focusin/focusout 事件，使用 focus/blur 事件的捕获阶段模拟。
  if (navigator.isFirefox) {
    Object.forEach({focusin: 'focus', focusout: 'blur'}, function(originalType, type) {
      var count = 0;
      var trigger = function(e) {
        e.target.fire(type);
      };
      triggers[type] = {
        add: function() {
          // 在当前文档内第一次添加本类型事件的监听器时，启用模拟。
          if (++count === 1) {
            document.addEventListener(originalType, trigger, true);
          }
        },
        remove: function() {
          // 在当前文档内添加的本类型事件的监听器全部被删除时，停用模拟。
          if (--count === 0) {
            document.removeEventListener(originalType, trigger, true);
          }
        }
      };
    });
  }

  // 修复 Firefox 拖拽内容到控件内不触发 change 事件的问题。
  // 修复依赖的事件触发并不频繁，因此直接修复，不使用触发器。
  if (navigator.isFirefox) {
    // 判断传入的值是否为可输入元素。
    var isInputElement = function(target) {
      var nodeName = target.nodeName;
      var controlType = target.type;
      return nodeName === 'TEXTAREA' || nodeName === 'INPUT' && (controlType === 'text' || controlType === 'password');
    };
    // Firefox 的拖动方式为复制一份而不是移动，并且如果不是控件内拖拽，焦点不会移动到 drop 的控件内，因此可以直接触发 change 事件。
    document.addEventListener('drop', function(e) {
      var target = e.target;
      if (isInputElement(target) && target !== document.activeElement) {
        setTimeout(function() {
          target.fire('change');
        }, 0);
      }
    }, false);
  }

//--------------------------------------------------[DOMEvent]
  /**
   * 事件对象。
   * @name DOMEvent
   * @constructor
   * @param {string} type 事件类型。
   * @param {Object} e 原生事件对象。
   * @param {Object} [data] 附加数据。
   * @description
   *   如果事件对象是通过调用 Element/document/window 的 fire 方法产生的，其除了 originalEvent、type 和 target 之外的其他属性值均可能会被重写。
   */
  function DOMEvent(type, e, data) {
    // 事件代码包含三个二进制位，分别是 鼠标事件 键盘事件 可以冒泡。默认为 000 (0)。
    var code = EVENT_CODES.hasOwnProperty(type) ? EVENT_CODES[type] : 0;
    // 保存原生事件对象。
    this.originalEvent = e;
    // 事件类型，这时候的 type 就是调用 on 时使用的事件类型。
    this.type = type;
    // 触发本次事件的对象。
    var target = e.target || document;
    if (target.nodeType === 3) {
      target = target.parentNode;
    }
    this.target = target;
    // 发生时间。
    this.timeStamp = e.timeStamp || Date.now();
    // 是否可冒泡。
    this.bubbles = !!(code & 4);
    // 通过调用 fire 方法产生的事件对象没有以下信息（此时 e.type 必为空字符串）。
    if (e.type) {
      // 鼠标和键盘事件。
      if (code & 3) {
        this.ctrlKey = e.ctrlKey;
        this.altKey = e.altKey;
        this.shiftKey = e.shiftKey;
        this.metaKey = e.metaKey;
        if (code & 1) {
          // 坐标。
          this.clientX = e.clientX;
          this.clientY = e.clientY;
          this.screenX = e.screenX;
          this.screenY = e.screenY;
          this.pageX = e.pageX;
          this.pageY = e.pageY;
          // 按键。非按键类事件（以及 contextmenu 事件）的按键值在各浏览器中有差异。
          var which = e.which;
          this.leftButton = which === 1;
          this.middleButton = which === 2;
          this.rightButton = which === 3;
          this.which = which;
          // 与本次事件相关的对象。
          this.relatedTarget = e.relatedTarget;
        } else {
          this.which = e.which;
        }
      }
    } else {
      // 由 fire 方法调用，若有附加数据则合并到事件对象中。
      if (data) {
        Object.mixin(this, data, {blackList: ['originalEvent', 'type', 'target']})
      }
    }
  }

  /**
   * 原生事件对象。
   * @name DOMEvent#originalEvent
   * @type Object
   * @description
   *   使用 fire 方法创建的事件对象的 originalEvent.type 为空字符串。
   */

  /**
   * 事件类型。
   * @name DOMEvent#type
   * @type string
   */

  /**
   * 触发事件的对象。
   * @name DOMEvent#target
   * @type Element
   * @description
   *   本属性的值也可能是 document 对象。
   */

  /**
   * 事件发生的时间。
   * @name DOMEvent#timeStamp
   * @type number
   */

  /**
   * 是否可以冒泡，不冒泡的事件不能使用代理事件监听。
   * @name DOMEvent#bubbles
   * @type boolean
   */

  /**
   * 事件发生时，ctrl 键是否被按下。
   * @name DOMEvent#ctrlKey
   * @type boolean
   */

  /**
   * 事件发生时，alt 键是否被按下。
   * @name DOMEvent#altKey
   * @type boolean
   */

  /**
   * 事件发生时，shift 键是否被按下。
   * @name DOMEvent#shiftKey
   * @type boolean
   */

  /**
   * 事件发生时，meta 键是否被按下。
   * @name DOMEvent#metaKey
   * @type boolean
   */

  /**
   * 事件发生时鼠标在视口中的 X 坐标，仅在鼠标事件对象上有效。
   * @name DOMEvent#clientX
   * @type number
   */

  /**
   * 事件发生时鼠标在视口中的 Y 坐标，仅在鼠标事件对象上有效。
   * @name DOMEvent#clientY
   * @type number
   */

  /**
   * 事件发生时鼠标在屏幕上的 X 坐标，仅在鼠标事件对象上有效。
   * @name DOMEvent#screenX
   * @type number
   */

  /**
   * 事件发生时鼠标在屏幕上的 Y 坐标，仅在鼠标事件对象上有效。
   * @name DOMEvent#screenY
   * @type number
   */

  /**
   * 事件发生时鼠标在页面中的 X 坐标，仅在鼠标事件对象上有效。
   * @name DOMEvent#pageX
   * @type number
   */

  /**
   * 事件发生时鼠标在页面中的 Y 坐标，仅在鼠标事件对象上有效。
   * @name DOMEvent#pageY
   * @type number
   */

  /**
   * 事件发生时鼠标在横向移动的偏移量，仅在 mousedragstart/mousedrag/mousedragend/mousedragenter/mousedragleave/mousedragover/mousedrop 类型的事件对象上有效。
   * @name DOMEvent#offsetX
   * @type number
   */

  /**
   * 事件发生时鼠标在纵向移动的偏移量，仅在 mousedragstart/mousedrag/mousedragend/mousedragenter/mousedragleave/mousedragover/mousedrop 类型的事件对象上有效。
   * @name DOMEvent#offsetY
   * @type number
   */

  /**
   * 事件发生时，鼠标左键是否被按下，仅在鼠标事件对象上有效。
   * @name DOMEvent#leftButton
   * @type boolean
   */

  /**
   * 事件发生时，鼠标中键是否被按下，仅在鼠标事件对象上有效。
   * @name DOMEvent#middleButton
   * @type boolean
   */

  /**
   * 事件发生时，鼠标右键是否被按下，仅在鼠标事件对象上有效。
   * @name DOMEvent#rightButton
   * @type boolean
   */

  /**
   * 事件被触发时的相关对象，仅在 mouseover/mouseout/mousedrag/mousedragend/mousedragenter/mousedragleave/mousedragover/mousedrop 类型的事件对象上有效。
   * @name DOMEvent#relatedTarget
   * @type ?Element
   * @description
   *   对于 mouseover/mouseout 事件，其值为发生此类事件之前，鼠标指向的对象。
   *   对于其他拖拽类型的事件，其值为正在被拖拽的元素。这个元素应在 mousedragstart 事件的监听器中，通过事件对象的本属性来指定。
   */

  /**
   * 事件发生时鼠标滚轮是否正在向上滚动，仅在 mousewheel 类型的事件对象上有效。
   * @name DOMEvent#wheelUp
   * @type boolean
   */

  /**
   * 事件发生时鼠标滚轮是否正在向下滚动，仅在 mousewheel 类型的事件对象上有效。
   * @name DOMEvent#wheelDown
   * @type boolean
   */

  /**
   * 当一个设备触发事件时的相关代码。在键盘事件中为按下的键的代码。
   * @name DOMEvent#which
   * @type number
   */

  Object.mixin(DOMEvent.prototype, {
    /**
     * 阻止事件的传播。
     * @name DOMEvent.prototype.stopPropagation
     * @function
     */
    stopPropagation: function() {
      var e = this.originalEvent;
      if (e) {
        e.stopPropagation();
      }
      this.isPropagationStopped = returnTrue;
    },

    /**
     * 查询事件的传播是否已被阻止。
     * @name DOMEvent.prototype.isPropagationStopped
     * @function
     * @returns {boolean} 查询结果。
     */
    isPropagationStopped: returnFalse,

    /**
     * 阻止事件的默认行为。
     * @name DOMEvent.prototype.preventDefault
     * @function
     */
    preventDefault: function() {
      var e = this.originalEvent;
      if (e) {
        e.preventDefault();
      }
      this.isDefaultPrevented = returnTrue;
    },

    /**
     * 查询事件的默认行为是否已被阻止。
     * @name DOMEvent.prototype.isDefaultPrevented
     * @function
     * @returns {boolean} 查询结果。
     */
    isDefaultPrevented: returnFalse,

    /**
     * 立即阻止事件的传播，被立即阻止传播的事件也不会在当前的对象上被分发到其他的监听器。
     * @name DOMEvent.prototype.stopImmediatePropagation
     * @function
     */
    stopImmediatePropagation: function() {
      this.stopPropagation();
      this.isImmediatePropagationStopped = returnTrue;
    },

    /**
     * 查询事件的传播是否已被立即阻止。
     * @name DOMEvent.prototype.isImmediatePropagationStopped
     * @function
     * @returns {boolean} 查询结果。
     */
    isImmediatePropagationStopped: returnFalse

  });

//--------------------------------------------------[DOMEventTarget]
  /**
   * 所有的 DOMEventTarget 对象都具备处理事件的能力，window 对象、document 对象和所有的 Element 对象都是 DOMEventTarget 对象。
   * @name DOMEventTarget
   * @constructor
   * @description
   *   本构造器仅供内部实现使用，外部无法访问。
   *   DOMEventTarget 对象在处理事件时，是工作在 DOM 事件模型中的。
   */
  var DOMEventTarget = function() {
  };

//--------------------------------------------------[DOMEventTarget.prototype.on]
  /**
   * 为本对象添加事件监听器。
   * @name DOMEventTarget.prototype.on
   * @function
   * @param {string} name 监听器名称。
   *   监听器名称由要监听的事件类型（必选）、限定符（可选）和标签（可选）组成，格式如下：
   *   <p><dfn><var>type</var></dfn>[<dfn>:relay(<var>selector</var>)</dfn>][<dfn>:once</dfn>|<dfn>:idle(<var>n</var>)</dfn>|<dfn>:throttle(<var>n</var>)</dfn>][<dfn>.<var>label</var></dfn>]</p>
   *   详细信息请参考下表：
   *   <table>
   *     <tr><th>组成部分</th><th>详细描述</th></tr>
   *     <tr>
   *       <td><dfn><var>type</var></dfn></td>
   *       <td>本监听器要监听的事件类型。<br><var>type</var> 只能使用大小写英文字母。</td>
   *     </tr>
   *     <tr>
   *       <td><dfn>:relay(<var>selector</var>)</dfn></td>
   *       <td>指定本监听器为代理事件监听器，监听的目标为文档树中（如果本方法在 document 上被调用）或本元素的后代元素中（如果本方法在一个元素上被调用），符合 <var>selector</var> 限定的元素。<br><var>selector</var> 应为合法的 CSS 选择符。</td>
   *     </tr>
   *     <tr>
   *       <td><dfn>:once</dfn></td>
   *       <td>指定本监听器仅能被调用一次，调用后即被自动删除。<br>自动删除时，会使用添加本监听器时使用的监听器名称。</td>
   *     </tr>
   *     <tr>
   *       <td><dfn>:idle(<var>n</var>)</dfn></td>
   *       <td>指定本监听器将在该类型的事件每次被触发 <var>n</var> 毫秒后、且下一次同类型的事件被触发前才能被调用。<br><var>n</var> 应为大于 0 的数字。</td>
   *     </tr>
   *     <tr>
   *       <td><dfn>:throttle(<var>n</var>)</dfn></td>
   *       <td>指定当事件连续发生时，本监听器可被连续调用的最短时间间隔为 <var>n</var> 毫秒。<br><var>n</var> 应为大于 0 的数字。</td>
   *     </tr>
   *     <tr>
   *       <td><dfn>.<var>label</var></dfn></td>
   *       <td>在监听器名称的末尾添加标签可以可以使相同对象上添加的相同类型、相同行为的监听器具备不同的名称。不同的名称可以确保调用 off 方法时能够精确匹配要删除的监听器。<br>添加具有明确含义的标签，可以最大限度的避免监听器被误删。<br><var>label</var> 可以使用英文字母、数字和下划线。</td>
   *     </tr>
   *   </table>
   *   使用逗号分割多个监听器名称，即可以在本对象上使用多个名称将同一个监听器添加多次。
   * @param {Function} listener 监听器。
   *   该函数将在对应的事件发生时被调用，传入事件对象作为参数。如果指定了 idle 或 throttle 限定符，则该事件对象无法被阻止传播或取消默认行为。
   *   该函数被调用时 this 的值为监听到本次事件的对象，即：
   *   <ul>
   *     <li>如果是普通监听器，则 this 的值为本对象。</li>
   *     <li>如果是代理监听器，则 this 的值为被代理的元素。</li>
   *   </ul>
   *   如果该函数返回 false，则相当于调用了传入的事件对象的 stopPropagation 和 preventDefault 方法。
   * @returns {Object} 本对象。
   * @example
   *   document.on('click', onClick);
   *   // 为 document 添加一个 click 事件的监听器。
   * @example
   *   $element.on('click:relay(a)', onClick);
   *   // 为 $element 添加一个代理监听器，为该元素所有的后代 A 元素代理 click 事件的监听。
   * @example
   *   $element.on('click.temp', onClick);
   *   // 为 $element 添加一个 click 事件的监听器，并为其指定一个标签 temp。
   * @example
   *   $element.on('input:idle(200)', onInput);
   *   // 为 $element 添加一个 input 事件的监听器，该监听器将在每次 input 事件被触发 200 毫秒后、且下一次 input 事件被触发前被调用。
   * @example
   *   $element.on('scroll:throttle(200)', onScroll);
   *   // 为 $element 添加一个 scroll 事件的监听器，该监听器可被连续调用的最短时间间隔为 200 毫秒。
   * @see http://mootools.net/
   * @see http://www.quirksmode.org/dom/events/index.html
   */
  var reSimpleSelector = /^(\w*)(?:\.([\w\-]+))?$/;
  var transitionEndEventType = {transition: 'transitionend', mstransition: 'MSTransitionEnd', moztransition: 'transitionend', webkittransition: 'webkitTransitionEnd', otransition: 'oTransitionEnd'}[getAvailableCSSPropertyName('transition').camelize().toLowerCase()];
  DOMEventTarget.prototype.on = function(name, listener) {
    var eventTarget = this;
    var eventHandlers = eventTarget.eventHandlers || (eventTarget.eventHandlers = {});
    // 使用一个监听器监听该对象上的多个事件。
    name.split(separator).forEach(function(name) {
      // 取出事件名中携带的各种属性。
      var attributes = getEventAttributes(name);
      var type = attributes.type;
      var selector = attributes.selector;
      var once = attributes.once;
      var idle = attributes.idle;
      var throttle = attributes.throttle;
      // 获取对应的处理器组，以添加处理器。
      var handlers = eventHandlers[type] || (eventHandlers[type] = []);
      // 首次监听此类型的事件。
      if (!('delegateCount' in handlers)) {
        // 为兼容事件列表中的事件类型添加触发器或分发器。
        if (EVENT_CODES.hasOwnProperty(type)) {
          if (triggers[type]) {
            // 添加触发器。
            triggers[type].add(eventTarget);
          } else {
            // 添加分发器。
            var distributor;
            switch (type) {
              case 'mousewheel':
                // 鼠标滚轮事件，Firefox 的事件类型为 DOMMouseScroll。
                distributor = function(e) {
                  var event = new DOMEvent(type, e);
                  var wheel = 'wheelDelta' in e ? -e.wheelDelta : e.detail || 0;
                  event.wheelUp = wheel < 0;
                  event.wheelDown = wheel > 0;
                  distributeEvent(eventTarget, handlers, event);
                };
                distributor.type = navigator.isFirefox ? 'DOMMouseScroll' : 'mousewheel';
                break;
              case 'mouseenter':
              case 'mouseleave':
                // 鼠标进入/离开事件，目前仅 IE 支持，但不能被代理。此处使用 mouseover/mouseout 模拟。
                distributor = function(e) {
                  distributeEvent(eventTarget, handlers, new DOMEvent(type, e), function(event) {
                    var relatedTarget = event.relatedTarget;
                    // 加入 this.contains 的判断，避免 window 和一些浏览器的 document 对象调用出错。
                    return !relatedTarget || this.contains && !this.contains(relatedTarget);
                  });
                };
                distributor.type = type === 'mouseenter' ? 'mouseover' : 'mouseout';
                break;
              case 'transitionend':
                distributor = function(e) {
                  var event = new DOMEvent(type, e);
                  event.propertyName = e.propertyName;
                  distributeEvent(eventTarget, handlers, event);
                };
                distributor.type = transitionEndEventType;
                break;
              default:
                // 通用分发器。
                distributor = function(e) {
                  distributeEvent(eventTarget, handlers, new DOMEvent(type, e));
                };
                distributor.type = type;
            }
            // 将分发器作为指定类型的原生事件的监听器。
            eventTarget.addEventListener(distributor.type, distributor, false);
            handlers.distributor = distributor;
          }
        }
        // 初始化代理计数器。
        handlers.delegateCount = 0;
      }
      // 添加处理器，允许重复添加同一个监听器（W3C 的事件模型不允许）。
      var handler = {name: name};
      // 处理监听器的触发限制，三者最多只可能同时出现一种。
      if (once) {
        // 仅能被调用一次的监听器，调用后即被自动删除（根据添加时的监听器名称）。如果有重名的监听器则这些监听器将全部被删除。
        handler.listener = function(event) {
          var result = listener.call(this, event);
          eventTarget.off(name);
          return result;
        };
      } else if (idle) {
        // 被延后调用的监听器（异步调用）。在此监听器内对事件对象的操作不会影响事件的传播及其默认行为。
        handler.listener = function() {
          var timer;
          return function(event) {
            var thisObject = this;
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(function() {
              listener.call(thisObject, event);
              timer = undefined;
            }, idle);
          };
        }();
      } else if (throttle) {
        // 有频率限制的监听器（除第一次外均必须为异步调用）。为保持一致，所有调用均为异步调用，在此监听器内对事件对象的操作不会影响事件的传播及其默认行为。
        handler.listener = function() {
          var timer;
          var thisObject;
          var lastEvent;
          var lastCallTime = 0;
          return function(event) {
            thisObject = this;
            lastEvent = event;
            var now = Date.now();
            var timeElapsed = now - lastCallTime;
            if (!timer) {
              timer = setTimeout(function() {
                listener.call(thisObject, lastEvent);
                lastCallTime = Date.now();
                timer = undefined;
              }, timeElapsed < throttle ? throttle - timeElapsed : 0);
            }
          };
        }();
      } else {
        // 无触发限制的监听器。
        handler.listener = listener;
      }
      if (selector) {
        // 代理监听器。
        handler.selector = selector;
        var match;
        if (match = selector.match(reSimpleSelector)) {
          // 保存简单选择器以在执行过滤时使用效率更高的方式。
          handler.simpleSelector = {
            // tagName 必为字符串，className 可能为 undefined。
            tagName: match[1].toUpperCase(),
            className: match[2] || ''
          };
        }
        handlers.splice(handlers.delegateCount++, 0, handler);
        // 为不保证所有浏览器均可以冒泡的事件类型指定代理监听时，给出警告信息。
//        if (!(DELEGATEABLE_EVENTS.hasOwnProperty(type) || EVENT_CODES[type] & 4)) {
//          console.warn('OurJS: Incompatible event delegation type "' + name + '".');
//        }
      } else {
        // 普通监听器。
        handlers.push(handler);
      }
    });
    return eventTarget;
  };

//--------------------------------------------------[DOMEventTarget.prototype.off]
  /**
   * 删除本对象上已添加的事件监听器。
   * @name DOMEventTarget.prototype.off
   * @function
   * @param {string} name 监听器名称。
   *   本对象上添加的所有名称与 name 匹配的监听器都将被删除。
   *   使用逗号分割多个监听器名称，即可同时删除该对象上的多个监听器。
   * @returns {Object} 本对象。
   * @example
   *   document.off('click');
   *   // 为 document 删除名为 click 的监听器。
   * @example
   *   $element.off('click:relay(a)');
   *   // 为 $element 删除名为 click:relay(a) 的监听器。
   */
  DOMEventTarget.prototype.off = function(name) {
    var eventTarget = this;
    var eventHandlers = eventTarget.eventHandlers;
    if (!eventHandlers) {
      return eventTarget;
    }
    // 同时删除该对象上的多个监听器。
    name.split(separator).forEach(function(name) {
      // 取出事件类型。
      var type = getEventAttributes(name).type;
      // 尝试获取对应的处理器组，以删除处理器。
      var handlers = eventHandlers[type];
      if (!handlers) {
        return;
      }
      // 删除处理器。
      var i = 0;
      var handler;
      while (i < handlers.length) {
        handler = handlers[i];
        if (handler.name === name) {
          handlers.splice(i, 1);
          if (handler.selector) {
            handlers.delegateCount--;
          }
        } else {
          i++;
        }
      }
      // 处理器组为空。
      if (handlers.length === 0) {
        // 为兼容事件列表中的事件类型删除触发器或分发器。
        if (EVENT_CODES.hasOwnProperty(type)) {
          if (triggers[type]) {
            // 删除触发器。
            if (triggers[type].remove(eventTarget) === false) {
              // 拖拽的三个关联事件的触发器会自己管理它们的处理器组，返回 false 避免其中某个事件的处理器组被删除。
              return;
            }
          } else {
            // 删除分发器。
            var distributor = handlers.distributor;
            eventTarget.removeEventListener(distributor.type, distributor, false);
          }
        }
        // 删除处理器组。
        delete eventHandlers[type];
      }
    });
    // 若该项再无其他处理器组，删除该项。
    if (Object.keys(eventHandlers).length === 0) {
      delete eventTarget.eventHandlers;
    }
    return eventTarget;
  };

//--------------------------------------------------[DOMEventTarget.prototype.fire]
  /**
   * 触发本对象的某类事件。
   * @name DOMEventTarget.prototype.fire
   * @function
   * @param {string} type 事件类型。
   * @param {Object} [data] 在事件对象上附加的数据。
   *   data 的属性会被追加到事件对象中，但名称为 originalEvent、type、target 的属性除外。
   *   如果指定其 bubbles 属性为 true，则该事件将可以在文档树中传播。
   * @returns {Object} 事件对象。
   * @description
   *   通过调用本方法产生的事件对象不具备默认行为。
   *   如果需要执行此类事件的默认行为，可以直接在本对象上调用对应的方法（如 click、reset 等）。
   */
  DOMEventTarget.prototype.fire = function(type, data) {
    var event = new DOMEvent(type, {type: '', target: this, stopPropagation: returnFalse, preventDefault: returnFalse}, data);
    // 传播事件并返回传播后的事件对象。
    var eventTarget = this;
    var eventHandlers;
    var handlers;
    while (eventTarget) {
      if (handlers = (eventHandlers = eventTarget.eventHandlers) && eventHandlers[event.type]) {
        distributeEvent(eventTarget, handlers, event);
      }
      if (!event.bubbles || event.isPropagationStopped() || eventTarget === window) {
        break;
      }
      eventTarget = eventTarget === document && window || eventTarget === $html && document || eventTarget.getParent();
    }
    return event;
  };

//==================================================[DOM 事件模型 - 应用]
  /*
   * 使 window 对象、document 对象和所有的 Element 对象都具备 DOMEventTarget 提供的实例方法。
   */

  window.on = document.on = Element.prototype.on = DOMEventTarget.prototype.on;
  window.off = document.off = Element.prototype.off = DOMEventTarget.prototype.off;
  window.fire = document.fire = Element.prototype.fire = DOMEventTarget.prototype.fire;

})(window);
/**
 * @fileOverview JSEventModule
 * @author sundongguo@gmail.com
 * @version 20130509
 */

(function(window) {
//==================================================[JS 事件模型]
  /*
   * 为 JS 对象提供的事件模型。
   *
   * 相关名词的解释如下：
   *   事件对象 (event)：
   *     本事件模型提供的事件对象，包含与此事件有关的信息，是 JSEvent 的实例。
   *   分发：
   *     在一个指定的对象上，将 event 作为参数逐个传入该对象相应的监听器。
   *   监听器 (listener)：
   *     添加到一个对象的、监听某种类型的事件的函数。
   *     当此对象上的某种类型的事件被触发时，对应的监听器会被调用，并传入 event 作为其唯一的参数。
   *   监听器名称 (name)：
   *     由要监听的 type 和 label 组成，其中 type 是必选的。
   *   事件类型 (type)：
   *     事件的类型。
   *   标签 (label)：
   *     在 name 的末尾添加 label 可以使相同对象上添加的相同类型、相同行为的监听器具备不同的名称。不同的名称可以确保调用 off 方法时能够精确匹配要删除的监听器。
   *
   * 添加或删除监听器：
   *   通过调用 on 或 off 方法来添加或删除指定的监听器。
   *
   * 触发事件：
   *   通过调用 fire 方法来触发一个事件。
   *   fire 方法会自动创建、传播和分发 event。
   *
   * 提供对象：
   *   JSEvent
   *   JSEventTarget
   *
   * 提供静态方法：
   *   JSEventTarget.create
   *
   * 提供实例属性：
   *   eventHandlers
   *   <Object eventHandlers> {
   *     <string type>: <Array handlers> [
   *       <Object handler>: {
   *         name: <string name>
   *         listener: <Function listener>
   *       }
   *     ]
   *   }
   *
   * 提供实例方法：
   *   JSEventTarget.prototype.on
   *   JSEventTarget.prototype.off
   *   JSEventTarget.prototype.fire
   */

  var separator = /\s*,\s*/;

  var reEventName = /^([a-zA-Z]+)(?:\.\w+)?$/;
  var getEventType = function(name) {
    var match = name.match(reEventName);
    if (match === null) {
      throw new SyntaxError('Invalid listener name "' + name + '"');
    }
    return match[1];
  };

//--------------------------------------------------[JSEvent]
  /**
   * 事件对象。
   * @name JSEvent
   * @constructor
   * @param {string} type 事件类型。
   * @param {Object} target 触发本事件的对象。
   * @param {Object} [data] 附加数据。
   */
  var JSEvent = function(type, target, data) {
    this.type = type;
    this.target = target;
    if (data) {
      Object.mixin(this, data, {blackList: ['type', 'target']});
    }
  };

  /**
   * 事件类型。
   * @name JSEvent#type
   * @type string
   */

  /**
   * 触发事件的对象。
   * @name JSEvent#target
   * @type Object
   */

//--------------------------------------------------[JSEventTarget]
  /**
   * 所有的 JSEventTarget 对象都具备处理事件的能力，通过调用 new JSEventTarget() 获得的新对象，或经过 JSEventTarget.create(object) 处理后的 object 对象都是 JSEventTarget 对象。
   * @name JSEventTarget
   * @constructor
   * @description
   *   JSEventTarget 对象在处理事件时，是工作在 JS 事件模型中的。
   */
  var JSEventTarget = window.JSEventTarget = function() {
    this.eventHandlers = {};
  };

//--------------------------------------------------[JSEventTarget.create]
  /**
   * 让目标对象成为一个 JSEventTarget 对象，以具备处理事件的能力。
   * @name JSEventTarget.create
   * @function
   * @param {Object} target 目标对象。
   *   目标对象不应该是 window 对象、document 对象或 Element 的实例对象，因为这些对象是 DOMEventTarget 对象，使用的是 DOM 事件模型。
   * @returns {Object} 目标对象。
   * @description
   * * 目标对象将被添加实例属性 eventHandlers 用于保存处理事件所必需的数据。
   * * 目标对象将被添加实例方法 on 用于添加事件监听器。
   * * 目标对象将被添加实例方法 off 用于删除事件监听器。
   * * 目标对象将被添加实例方法 fire 用于触发某类事件。
   */
  JSEventTarget.create = function(target) {
    this.call(target);
    Object.mixin(target, this.prototype);
    return target;
  };

//--------------------------------------------------[JSEventTarget.prototype.on]
  /**
   * 为本对象添加事件监听器。
   * @name JSEventTarget.prototype.on
   * @function
   * @param {string} name 监听器名称。
   *   监听器名称由要监听的事件类型（必选）和标签（可选）组成，格式如下：
   *   <p><dfn><var>type</var></dfn>[<dfn>.<var>label</var></dfn>]</p>
   *   详细信息请参考下表：
   *   <table>
   *     <tr><th>组成部分</th><th>详细描述</th></tr>
   *     <tr>
   *       <td><dfn><var>type</var></dfn></td>
   *       <td>本监听器要监听的事件类型。<br><var>type</var> 只能使用大小写英文字母。</td>
   *     </tr>
   *     <tr>
   *       <td><dfn>.<var>label</var></dfn></td>
   *       <td>在监听器名称的末尾添加标签可以可以使相同对象上添加的相同类型、相同行为的监听器具备不同的名称。不同的名称可以确保调用 off 方法时能够精确匹配要删除的监听器。<br>添加具有明确含义的标签，可以最大限度的避免监听器被误删。<br><var>label</var> 可以使用英文字母、数字和下划线。</td>
   *     </tr>
   *   </table>
   *   使用逗号分割多个监听器名称，即可以在本对象上使用多个名称将同一个监听器添加多次。
   * @param {Function} listener 监听器。
   *   该函数将在对应的事件发生时被调用，传入事件对象作为参数。
   *   该函数被调用时 this 的值为监听到本次事件的对象。
   * @returns {Object} 本对象。
   */
  JSEventTarget.prototype.on = function(name, listener) {
    var eventHandlers = this.eventHandlers;
    name.split(separator).forEach(function(name) {
      var type = getEventType(name);
      var handlers = eventHandlers[type] || (eventHandlers[type] = []);
      handlers.push({name: name, listener: listener});
    });
    return this;
  };

//--------------------------------------------------[JSEventTarget.prototype.off]
  /**
   * 删除本对象上已添加的事件监听器。
   * @name JSEventTarget.prototype.off
   * @function
   * @param {string} name 监听器名称。
   *   本对象上添加的所有名称与 name 匹配的监听器都将被删除。
   *   使用逗号分割多个监听器名称，即可同时删除该对象上的多个监听器。
   * @returns {Object} 本对象。
   */
  JSEventTarget.prototype.off = function(name) {
    var eventHandlers = this.eventHandlers;
    name.split(separator).forEach(function(name) {
      var type = getEventType(name);
      var handlers = eventHandlers[type];
      if (handlers) {
        var i = 0;
        var handler;
        while (i < handlers.length) {
          handler = handlers[i];
          if (handler.name === name) {
            handlers.splice(i, 1);
          } else {
            i++;
          }
        }
        if (handlers.length === 0) {
          delete eventHandlers[type];
        }
      }
    });
    return this;
  };

//--------------------------------------------------[JSEventTarget.prototype.fire]
  /**
   * 触发本对象的某类事件。
   * @name JSEventTarget.prototype.fire
   * @function
   * @param {string} type 事件类型。
   * @param {Object} [data] 在事件对象上附加的数据。
   * @returns {Object} 事件对象。
   */
  JSEventTarget.prototype.fire = function(type, data) {
    var event = new JSEvent(type, this, data);
    var handlers = this.eventHandlers[type];
    if (handlers) {
      // 分发时对 handlers 的副本操作，以避免在监听器内添加或删除该对象的同类型的监听器时会影响本次分发过程。
      handlers.slice(0).forEach(function(handler) {
        handler.listener.call(this, event);
      }, this);
    }
    return event;
  };

})(window);
/**
 * @fileOverview 动画
 * @author sundongguo@gmail.com
 * @version 20120412
 */

(function(window) {
//==================================================[动画]
  /*
   * 调用流程：
   *   var animation = new Animation(...).addClip(...);
   *   animation.play()<play><playstart>          -> <step> -> ... -> <playfinish>
   *   animation.reverse()<reverse><reversestart> -> <step> -> ... -> <reversefinish>
   *                                                        -> animation.pause<pause>
   *                                                                                  -> animation.play()<play>       -> <step> ->>>
   *                                                                                  -> animation.reverse()<reverse> -> <step> ->>>
   *
   * 说明：
   *   上述步骤到达 (x, y) 时，每个剪辑会以每秒最多 62.5 次的频率被播放（每 16 毫秒一次），实际频率视计算机的速度而定，当计算机的速度比期望的慢时，动画会以“跳帧”的方式来确保整个动画的消耗时间尽可能的接近设定时间。
   *   传入函数的参数 x 为时间点，y 为偏移量，它们的值都将从 0 趋向于 1。
   *   在动画在进行中时，调用动画对象的 pause 方法即可在当前帧停止动画的播放。
   *   调用 reverse 可以倒放，但要注意，倒放时，需要对动画剪辑中正向播放时非线性变换的内容也做反向处理。
   *   播放一个动画时，调用 play 或 reverse 方法后即同步播放对应方向的首帧，中间帧及末帧由引擎异步播放。
   *   如果一个动画剪辑的持续时间为 0，则 play 时传入的 x 值为 1，reverse 时传入的 x 值为 0。
   *
   * 操作 Animation 对象和调用 Element 上的相关动画方法的差别：
   *   当需要定制一个可以精确控制的动画时，建议使用 Animation，Animation 对象中的 Clip 会记录动画创建时的状态，而且不仅可以正向播放，还可以随时回退到起点。
   *   否则应使用 Element 实例上的对应简化动画方法，这些简化方法每次调用都会自动创建新的 Animation 对象，而不保留之前的状态，这样就可以随时以目标元素最新的状态作为起点来播放动画。
   *   一个明显的差异是在为不同类型的样式渐变动画设置相同的相对长度的变化值时：
   *   在直接使用 Animation 的情况下，无论如何播放/倒放，目标元素将始终在起点/终点之间渐变。
   *   在使用 Element.prototype.morph 方法多次播放时，目标元素将以上一次的终点作为起点，开始渐变。
   */

  // 供内部调用的标记值。
  var INTERNAL_IDENTIFIER_REVERSE = {};

  // 动画的状态。
  var START_POINT = -2;
  var REVERSING = -1;
  var PASUING = 0;
  var PLAYING = 1;
  var END_POINT = 2;

  // 动画剪辑的状态。
  var BEFORE_START_POINT = -1;
  var ACTIVE = 0;
  var AFTER_END_POINT = 1;

  // 三次贝塞尔曲线生成函数，根据指定的 X 坐标（时间点）获取 Y 坐标（偏移量）。
  // http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
  var cubicBezier = function(p1x, p1y, p2x, p2y) {
    var ax = 0, bx = 0, cx = 0, ay = 0, by = 0, cy = 0;
    var sampleCurveX = function(t) {
      return ((ax * t + bx) * t + cx) * t;
    };
    var sampleCurveY = function(t) {
      return ((ay * t + by) * t + cy) * t;
    };
    var solveCurveX = function(t) {
      var t0, t1, t2, x2, d2, i;
      var epsilon = 0.001;
      for (t2 = t, i = 0; i < 8; i++) {
        x2 = sampleCurveX(t2) - t;
        if (Math.abs(x2) < epsilon) {
          return t2;
        }
        d2 = (3.0 * ax * t2 + 2.0 * bx) * t2 + cx;
        if (Math.abs(d2) < 1e-6) {
          break;
        }
        t2 = t2 - x2 / d2;
      }
      t0 = 0.0;
      t1 = 1.0;
      t2 = t;
      if (t2 < t0) {
        return t0;
      }
      if (t2 > t1) {
        return t1;
      }
      while (t0 < t1) {
        x2 = sampleCurveX(t2);
        if (Math.abs(x2 - t) < epsilon) {
          return t2;
        }
        if (t > x2) {
          t0 = t2;
        } else {
          t1 = t2;
        }
        t2 = (t1 - t0) * .5 + t0;
      }
      return t2;
    };
    cx = 3.0 * p1x;
    bx = 3.0 * (p2x - p1x) - cx;
    ax = 1.0 - cx - bx;
    cy = 3.0 * p1y;
    by = 3.0 * (p2y - p1y) - cy;
    ay = 1.0 - cy - by;
    return function(t) {
      return sampleCurveY(solveCurveX(t));
    };
  };
  // 内置控速函数。
  // http://www.w3.org/TR/css3-transitions/
  var builtInTimingFunctions = {
    linear: function(x) {
      return x;
    },
    bounceIn: function(x) {
      x = 1 - x;
      var y;
      for (var a = 0, b = 1; 1; a += b, b /= 2) {
        if (x >= (7 - 4 * a) / 11) {
          y = b * b - Math.pow((11 - 6 * a - 11 * x) / 4, 2);
          break;
        }
      }
      return 1 - y;
    },
    bounceOut: function(x) {
      var y;
      for (var a = 0, b = 1; 1; a += b, b /= 2) {
        if (x >= (7 - 4 * a) / 11) {
          y = b * b - Math.pow((11 - 6 * a - 11 * x) / 4, 2);
          break;
        }
      }
      return y;
    },
    ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
    easeIn: cubicBezier(0.42, 0, 1.0, 1.0),
    easeOut: cubicBezier(0, 0, 0.58, 1.0),
    easeInOut: cubicBezier(0.42, 0, 0.58, 1.0),
    easeOutIn: cubicBezier(0, 0.42, 1.0, 0.58)
  };
  // 获取控速函数。
  var getTimingFunction = function(name) {
    name = name || '';
    return builtInTimingFunctions[name] || (name.startsWith('cubicBezier') ? cubicBezier.apply(null, name.slice(12, -1).split(',').map(function(item) {
      return parseFloat(item);
    })) : builtInTimingFunctions.ease);
  };

  // 播放动画对应某一时间点的某一帧。
  var playAnimation = function(animation, timePoint, isPlayMethod) {
    // 播放当前帧。
    animation.clips.forEach(function(clip) {
      var active = false;
      var duration = clip.duration;
      var x = (timePoint - clip.delay) / Math.max(1, duration);
      if (isPlayMethod) {
        if (clip.status === AFTER_END_POINT) {
          return;
        }
        if (clip.status === BEFORE_START_POINT) {
          if (x >= 0) {
            x = duration ? 0 : 1;
            clip.status = ACTIVE;
          }
        }
        if (clip.status === ACTIVE) {
          active = true;
          if (x >= 1) {
            x = 1;
            clip.status = AFTER_END_POINT;
          }
        }
      } else {
        if (clip.status === BEFORE_START_POINT) {
          return;
        }
        if (clip.status === AFTER_END_POINT) {
          if (x <= 1) {
            x = duration ? 1 : 0;
            clip.status = ACTIVE;
          }
        }
        if (clip.status === ACTIVE) {
          active = true;
          if (x <= 0) {
            x = 0;
            clip.status = BEFORE_START_POINT;
          }
        }
      }
      if (active) {
        clip.call(animation, x, x === 0 ? 0 : (x === 1 ? 1 : clip.timingFunction(x)));
      }
    });
    // 触发事件。
    animation.fire('step');
    if (isPlayMethod) {
      if (timePoint === animation.duration) {
        if (animation.timestamp) {
          unmountAnimation(animation);
        }
        animation.status = END_POINT;
        animation.fire('playfinish');
      }
    } else {
      if (timePoint === 0) {
        if (animation.timestamp) {
          unmountAnimation(animation);
        }
        animation.status = START_POINT;
        animation.fire('reversefinish');
      }
    }
  };

  // 动画引擎，用于挂载各播放中的动画，并同频同步播放它们的每一帧。
  var engine;
  var mountedAnimations = [];
  var mountAnimation = function(animation) {
    animation.timestamp = Date.now();
    mountedAnimations.push(animation);
    // 启动引擎。
    if (!engine) {
      engine = setInterval(function() {
        // 播放挂载的动画。
        var timestamp = Date.now();
        mountedAnimations.forEach(function(animation) {
          var isPlayMethod = animation.status === PLAYING;
          var timePoint = Math.limit(animation.timePoint + (timestamp - animation.timestamp) * (isPlayMethod ? 1 : -1), 0, animation.duration);
          animation.timestamp = timestamp;
          animation.timePoint = timePoint;
          playAnimation(animation, timePoint, isPlayMethod);
        });
        // 停止引擎。
        if (!mountedAnimations.length) {
          clearInterval(engine);
          engine = undefined;
//          console.warn('>ENGING STOP');
        }
      }, 1000 / Math.limit(Animation.fps, 10, 60));
//      console.warn('>ENGING START');
    }
//    console.log('[mountAnimation]: ' + mountedAnimations.length);
  };
  var unmountAnimation = function(animation) {
    delete animation.timestamp;
    mountedAnimations.remove(animation);
//    console.log('[unmountAnimation]: ' + mountedAnimations.length);
  };

//--------------------------------------------------[Animation]
  /**
   * 动画。
   * @name Animation
   * @constructor
   * @fires play
   *   成功调用 play 方法后，正向播放开始前触发。
   * @fires playstart
   *   正向播放开始前（渲染整个动画的第一帧之前）触发。
   * @fires playfinish
   *   正向播放结束后（渲染整个动画的最后一帧之后）触发。
   * @fires reverse
   *   成功调用 reverse 方法后，倒放开始前触发。
   * @fires reversestart
   *   倒放开始前（渲染整个动画的第一帧之前）触发。
   * @fires reversefinish
   *   倒放结束后（渲染整个动画的最后一帧之后）触发。
   * @fires step
   *   渲染动画的每一帧之后触发。
   * @fires pause
   *   成功调用 pause 方法后触发。
   * @description
   *   所有 Animation 的实例也都是一个 JSEventTarget 对象。
   * * 向一个动画中添加多个剪辑，并调整每个剪辑的 delay，duration，timingFunction 参数，以实现复杂的动画。
   * * 仅应在动画初始化时（播放之前）添加动画剪辑，不要在开始播放后添加或更改动画剪辑。
   * * 不要在多个剪辑中变更同一个元素的样式。
   */
  var Animation = window.Animation = function() {
    this.clips = [];
    /**
     * 当前帧所处的时间点。
     * @name Animation#timePoint
     * @type number
     */
    this.timePoint = 0;
    this.status = START_POINT;
    this.duration = 0;
    JSEventTarget.create(this);
  };

//--------------------------------------------------[Animation.fps]
  /**
   * 指定动画引擎播放动画时的每秒帧数。
   * @name fps
   * @memberOf Animation
   * @type number
   * @description
   *   应指定 10 到 60 之间的数字，默认为 60。
   *   仅在对性能敏感的环境下，才需要降低这个数值。过低的 fps 将导致动画播放不流畅。
   */
  Animation.fps = 60;

//--------------------------------------------------[Animation.prototype.addClip]
  /**
   * 添加动画剪辑。
   * @name Animation.prototype.addClip
   * @function
   * @param {Function} renderer 使用 Animation.create*Renderer 创建的渲染器。
   *   该函数被调用时 this 的值为所属的 Animation 对象。
   * @param {number} delay 延时。
   * @param {number} duration 播放时间。
   * @param {string} timingFunction 控速函数名称或表达式。
   *   支持的名称有 linear，bounceIn，bounceOut，ease，easeIn，easeOut，easeInOut，easeOutIn。
   *   表达式的格式为 <dfn>cubicBezier(<var>p1x</var>, <var>p1y</var>, <var>p2x</var>, <var>p2y</var>)</dfn>，各参数均为浮点数，其中 <var>p1x</var> 和 <var>p2x</var> 的取值范围必须在 [0, 1] 之间。
   * @returns {Object} Animation 对象。
   */
  Animation.prototype.addClip = function(renderer, delay, duration, timingFunction) {
    // 使用各项配置组合动画剪辑（实际是将渲染器升级为动画剪辑）。
    renderer.delay = delay;
    renderer.duration = duration;
    renderer.timingFunction = getTimingFunction(timingFunction);
    renderer.status = BEFORE_START_POINT;
    this.clips.push(renderer);
    // 重新计算整个动画持续的时间。
    this.duration = Math.max(this.duration, delay + duration);
    return this;
  };

//--------------------------------------------------[Animation.prototype.play]
  /**
   * 播放动画。
   * @name Animation.prototype.play
   * @function
   * @returns {boolean} 本方法是否已被成功调用。
   * @description
   *   如果当前动画正在播放中，或时间点已到达终点，则调用本方法无效。
   */
  Animation.prototype.play = function(reverse) {
    var animation = this;
    var isPlayMethod = reverse !== INTERNAL_IDENTIFIER_REVERSE;
    var status = animation.status;
    if (isPlayMethod && status !== PLAYING && status !== END_POINT || !isPlayMethod && status !== REVERSING && status !== START_POINT) {
      // 触发事件。
      if (isPlayMethod) {
        animation.status = PLAYING;
        animation.fire('play');
        if (status === START_POINT && animation.status === PLAYING) {
          animation.fire('playstart');
        }
      } else {
        animation.status = REVERSING;
        animation.fire('reverse');
        if (status === END_POINT && animation.status === REVERSING) {
          animation.fire('reversestart');
        }
      }
      // 未挂载到引擎（调用本方法前为暂停/停止状态）。
      if (!animation.timestamp && (animation.status === PLAYING || animation.status === REVERSING)) {
        var timePoint = animation.timePoint;
        var duration = animation.duration;
        // 每次播放/倒放时的首帧同步播放。
        playAnimation(animation, timePoint, isPlayMethod);
        // 如果尚有未播放的帧，则将其挂载到动画引擎，异步播放中间帧及末帧。
        if (isPlayMethod ? timePoint !== duration : timePoint !== 0) {
          mountAnimation(animation);
        }
      }
      return true;
    }
    return false;
  };

//--------------------------------------------------[Animation.prototype.reverse]
  /**
   * 倒放动画。
   * @name Animation.prototype.reverse
   * @function
   * @returns {boolean} 本方法是否已被成功调用。
   * @description
   *   如果当前动画正在倒放中，或时间点已到达起点，则调用本方法无效。
   */
  Animation.prototype.reverse = function() {
    return this.play(INTERNAL_IDENTIFIER_REVERSE);
  };

//--------------------------------------------------[Animation.prototype.pause]
  /**
   * 暂停动画。
   * @name Animation.prototype.pause
   * @function
   * @returns {boolean} 本方法是否已被成功调用。
   * @description
   *   仅在动画处于“播放”或“倒放”状态时，调用本方法才有效。
   */
  Animation.prototype.pause = function() {
    var animation = this;
    if (animation.status === PLAYING || animation.status === REVERSING) {
      if (animation.timestamp) {
        unmountAnimation(animation);
      }
      animation.status = PASUING;
      animation.fire('pause');
      return true;
    }
    return false;
  };

//==================================================[动画 - 渲染器]
  /*
   * 创建用于绘制动画每一帧的渲染器。
   * 渲染器实际上是一个函数，接受两个参数 x 和 y，其中 x 为时间轴，y 为偏移量，两者均从 0 趋向于 1。
   */

  // 可变的 CSS properties 类型。
  var TYPE_NUMBER = 1;
  var TYPE_LENGTH = 2;
  var TYPE_COLOR = 4;

  // 可变的 CSS properties 列表。
  //   - 'font-weight' 在 IE6 IE7 IE8 下不能设置数字值。
  //   - 'zoom' 各浏览器支持情况差异较大。
  // http://www.w3.org/TR/css3-transitions/#properties-from-css-
  var acceptableProperties = {};
  var typeIsNumber = ['opacity'];
  var typeIsLength = ['top', 'right', 'bottom', 'left', 'width', 'height', 'outlineWidth', 'backgroundPositionX', 'backgroundPositionY', 'fontSize', 'lineHeight', 'letterSpacing', 'wordSpacing', 'textIndent'];
  typeIsLength.push('margin', 'padding', 'borderWidth', 'borderColor');  // TODO: 支持复合属性的解析。
  var typeIsColor = ['color', 'backgroundColor', 'outlineColor'];
  ['Top', 'Right', 'Bottom', 'Left'].forEach(function(side) {
    typeIsLength.push('margin' + side, 'padding' + side, 'border' + side + 'Width');
    typeIsColor.push('border' + side + 'Color');
  });
  typeIsNumber.forEach(function(property) {
    acceptableProperties[property] = TYPE_NUMBER;
  });
  typeIsLength.forEach(function(property) {
    acceptableProperties[property] = TYPE_LENGTH;
  });
  typeIsColor.forEach(function(property) {
    acceptableProperties[property] = TYPE_COLOR;
  });

  // 提取数字值为一个浮点数。
  var extractNumberValue = function(value) {
    var extractedValue = parseFloat(value);
    return isFinite(extractedValue) ? extractedValue : 0;
  };

  // 提取颜色值为一个包含 RGB 整数表示的数组。
  var NAMED_COLORS = {aliceblue: '#F0F8FF', antiquewhite: '#FAEBD7', aqua: '#00FFFF', aquamarine: '#7FFFD4', azure: '#F0FFFF', beige: '#F5F5DC', bisque: '#FFE4C4', black: '#000000', blanchedalmond: '#FFEBCD', blue: '#0000FF', blueviolet: '#8A2BE2', brown: '#A52A2A', burlywood: '#DEB887', cadetblue: '#5F9EA0', chartreuse: '#7FFF00', chocolate: '#D2691E', coral: '#FF7F50', cornflowerblue: '#6495ED', cornsilk: '#FFF8DC', crimson: '#DC143C', cyan: '#00FFFF', darkblue: '#00008B', darkcyan: '#008B8B', darkgoldenrod: '#B8860B', darkgray: '#A9A9A9', darkgreen: '#006400', darkkhaki: '#BDB76B', darkmagenta: '#8B008B', darkolivegreen: '#556B2F', darkorange: '#FF8C00', darkorchid: '#9932CC', darkred: '#8B0000', darksalmon: '#E9967A', darkseagreen: '#8FBC8B', darkslateblue: '#483D8B', darkslategray: '#2F4F4F', darkturquoise: '#00CED1', darkviolet: '#9400D3', deeppink: '#FF1493', deepskyblue: '#00BFFF', dimgray: '#696969', dodgerblue: '#1E90FF', firebrick: '#B22222', floralwhite: '#FFFAF0', forestgreen: '#228B22', fuchsia: '#FF00FF', gainsboro: '#DCDCDC', ghostwhite: '#F8F8FF', gold: '#FFD700', goldenrod: '#DAA520', gray: '#808080', green: '#008000', greenyellow: '#ADFF2F', honeydew: '#F0FFF0', hotpink: '#FF69B4', indianred: '#CD5C5C', indigo: '#4B0082', ivory: '#FFFFF0', khaki: '#F0E68C', lavender: '#E6E6FA', lavenderblush: '#FFF0F5', lawngreen: '#7CFC00', lemonchiffon: '#FFFACD', lightblue: '#ADD8E6', lightcoral: '#F08080', lightcyan: '#E0FFFF', lightgoldenrodyellow: '#FAFAD2', lightgreen: '#90EE90', lightgrey: '#D3D3D3', lightpink: '#FFB6C1', lightsalmon: '#FFA07A', lightseagreen: '#20B2AA', lightskyblue: '#87CEFA', lightslategray: '#778899', lightsteelblue: '#B0C4DE', lightyellow: '#FFFFE0', lime: '#00FF00', limegreen: '#32CD32', linen: '#FAF0E6', magenta: '#FF00FF', maroon: '#800000', mediumaquamarine: '#66CDAA', mediumblue: '#0000CD', mediumorchid: '#BA55D3', mediumpurple: '#9370DB', mediumseagreen: '#3CB371', mediumslateblue: '#7B68EE', mediumspringgreen: '#00FA9A', mediumturquoise: '#48D1CC', mediumvioletred: '#C71585', midnightblue: '#191970', mintcream: '#F5FFFA', mistyrose: '#FFE4E1', moccasin: '#FFE4B5', navajowhite: '#FFDEAD', navy: '#000080', oldlace: '#FDF5E6', olive: '#808000', olivedrab: '#6B8E23', orange: '#FFA500', orangered: '#FF4500', orchid: '#DA70D6', palegoldenrod: '#EEE8AA', palegreen: '#98FB98', paleturquoise: '#AFEEEE', palevioletred: '#DB7093', papayawhip: '#FFEFD5', peachpuff: '#FFDAB9', peru: '#CD853F', pink: '#FFC0CB', plum: '#DDA0DD', powderblue: '#B0E0E6', purple: '#800080', red: '#FF0000', rosybrown: '#BC8F8F', royalblue: '#4169E1', saddlebrown: '#8B4513', salmon: '#FA8072', sandybrown: '#F4A460', seagreen: '#2E8B57', seashell: '#FFF5EE', sienna: '#A0522D', silver: '#C0C0C0', skyblue: '#87CEEB', slateblue: '#6A5ACD', slategray: '#708090', snow: '#FFFAFA', springgreen: '#00FF7F', steelblue: '#4682B4', tan: '#D2B48C', teal: '#008080', thistle: '#D8BFD8', tomato: '#FF6347', turquoise: '#40E0D0', violet: '#EE82EE', wheat: '#F5DEB3', white: '#FFFFFF', whitesmoke: '#F5F5F5', yellow: '#FFFF00', yellowgreen: '#9ACD32'};
  var reHexColor = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;
  var reShortHexColor = /^#([\da-f])([\da-f])([\da-f])$/i;
  var reRgbColor = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  var extractColorValue = function(value) {
    var extractedValue = [255, 255, 255];
    if (NAMED_COLORS.hasOwnProperty(value)) {
      value = NAMED_COLORS[value];
    }
    var match;
    if (match = value.match(reHexColor)) {
      extractedValue = Array.from(match).slice(1).map(function(hexadecimal) {
        return parseInt(hexadecimal, 16);
      });
    } else if (match = value.match(reShortHexColor)) {
      extractedValue = Array.from(match).slice(1).map(function(hexadecimal) {
        return parseInt(hexadecimal + hexadecimal, 16);
      });
    } else if (match = value.match(reRgbColor)) {
      extractedValue = Array.from(match).slice(1).map(function(decimal) {
        return +decimal;
      });
    }
    return extractedValue;
  };

  // 计算新数字，支持相对数值变化。
  var reRelativeValue = /^[+\-]=\d+$/;
  var calculateNewValue = function(valueBefore, newValue) {
    return typeof newValue === 'string' && reRelativeValue.test(newValue) ? valueBefore + (+(newValue.slice(0, 1) + '1') * newValue.slice(2)) : extractNumberValue(newValue);
  };

  // 获取可变样式的映射表。
  var getStylesMap = function($element, stylesAfter) {
    var stylesBefore = $element.getStyles(Object.keys(stylesAfter));
    var map = {before: {}, after: {}};
    Object.forEach(stylesBefore, function(valueBefore, name) {
      var valueAfter = stylesAfter[name];
      switch (acceptableProperties[name]) {
        case TYPE_NUMBER:
          map.before[name] = extractNumberValue(valueBefore);
          map.after[name] = extractNumberValue(valueAfter);
          break;
        case TYPE_LENGTH:
          map.before[name] = valueBefore = extractNumberValue(valueBefore);
          map.after[name] = calculateNewValue(valueBefore, valueAfter);
          break;
        case TYPE_COLOR:
          map.before[name] = extractColorValue(valueBefore);
          map.after[name] = extractColorValue(valueAfter);
          break;
      }
    });
    return map;
  };

//--------------------------------------------------[Animation.createBasicRenderer]
  /**
   * 创建基本渲染器。
   * @name Animation.createBasicRenderer
   * @function
   * @param {Function} renderer 渲染函数，传入两个参数“时间轴”和“偏移量”。
   *   该函数被调用时 this 的值为所属的 Animation 对象。
   * @returns {Function} 生成的渲染器。
   */
  Animation.createBasicRenderer = function(renderer) {
    renderer.type = 'basic';
    return renderer;
  };

//--------------------------------------------------[Animation.createStyleRenderer]
  /**
   * 创建样式渐变效果渲染器。
   * @name Animation.createStyleRenderer
   * @function
   * @param {Element} element 要实施渐变效果的元素。
   * @param {Object} styles 要实施渐变效果的样式。支持相对长度值和颜色值，其中相对长度值目前仅支持像素单位，颜色值支持 140 个颜色名称、#RRGGBB 格式、#RGB 格式或 rgb(R, G, B) 格式。
   * @returns {Function} 生成的渲染器。
   */
  Animation.createStyleRenderer = function(element, styles) {
    var $element = document.$(element);
    var map = getStylesMap($element, styles);
    var renderer = function(x, y) {
      Object.forEach(map.before, function(valueBefore, name) {
        var valueAfter = map.after[name];
        var currentValue;
        switch (acceptableProperties[name]) {
          case TYPE_NUMBER:
            currentValue = (valueBefore + (valueAfter - valueBefore) * y).toFixed(2);
            break;
          case TYPE_LENGTH:
            currentValue = Math.floor(valueBefore + (valueAfter - valueBefore) * y) + 'px';  // TODO: 支持多种长度单位。
            break;
          case TYPE_COLOR:
            currentValue = 'rgb(' + Math.floor(valueBefore[0] + (valueAfter[0] - valueBefore[0]) * y) + ', ' + Math.floor(valueBefore[1] + (valueAfter[1] - valueBefore[1]) * y) + ', ' + Math.floor(valueBefore[2] + (valueAfter[2] - valueBefore[2]) * y) + ')';
            break;
        }
        $element.setStyle(name, currentValue);
      });
    };
    renderer.type = 'style';
    return renderer;
  };

//--------------------------------------------------[Animation.createScrollRenderer]
  /**
   * 创建平滑滚动效果渲染器。
   * @name Animation.createScrollRenderer
   * @function
   * @param {Element} element 要实施滚动效果的元素。
   * @param {number} x 横向滚动坐标，元素的内容将向指定的坐标平滑滚动。
   * @param {number} y 纵向滚动坐标，元素的内容将向指定的坐标平滑滚动。
   * @returns {Function} 生成的渲染器。
   */
  Animation.createScrollRenderer = function(element, x, y) {
    var $element = document.$(element);
    var leftBefore;
    var topBefore;
    var calledByViewport = $element === document.documentElement || $element === document.body;
    if (calledByViewport) {
      var pageOffset = window.getPageOffset();
      leftBefore = pageOffset.x;
      topBefore = pageOffset.y;
    } else {
      leftBefore = $element.scrollLeft;
      topBefore = $element.scrollTop;
    }
    var leftDifference = calculateNewValue(leftBefore, x) - leftBefore;
    var topDifference = calculateNewValue(topBefore, y) - topBefore;
    var renderer = function(x, y) {
      var left = Math.round(leftBefore + leftDifference * y);
      var top = Math.round(topBefore + topDifference * y);
      if (calledByViewport) {
        window.scrollTo(left, top);
      } else {
        $element.scrollLeft = left;
        $element.scrollTop = top;
      }
    };
    renderer.type = 'scroll';
    return renderer;
  };

//==================================================[Element 扩展 - 动画]
  /*
   * 为 Element 扩展动画方法。
   *
   * 扩展方法：
   *   Element.prototype.morph
   *   Element.prototype.highlight
   *   Element.prototype.fade
   *   Element.prototype.smoothScroll
   *   Element.prototype.cancelAnimation
   */

  // 参数分隔符。
  var separator = /\s*,\s*/;

  // 空函数。
  var empty = function() {
  };

  // 获取元素正在播放中的动画列表。
  var getAnimations = function($element) {
    return $element._animations_ || ($element._animations_ = {});
  };

//--------------------------------------------------[Element.prototype.morph]
  /**
   * 让本元素播放一个渐变动画。
   * @name Element.prototype.morph
   * @function
   * @param {Object} styles 目标样式，元素将向指定的目标样式渐变。目标样式包含一条或多条要设置的样式声明，与 setStyles 的参数的差异如下：
   *   1. 不能使用复合属性。
   *   2. lineHeight 仅支持 'px' 单位的长度设置，而不支持数字。
   *   3. 支持相对长度，如 '+=10' 表示在现有长度的基础上增加 10 像素，'-=10' 表示在现有长度的基础上减少 10 像素。
   * @param {Object} [options] 动画选项。
   * @param {number} [options.duration] 播放时间，单位为毫秒，默认为 400。
   * @param {string} [options.timingFunction] 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'ease'。
   * @param {Function} [options.onStart] 播放开始时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onStep] 播放每一帧之后的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onFinish] 播放完成时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @returns {Element} 本元素。
   * @description
   *   如果本元素的动画播放列表中已经存在一个 morph 动画，则停止旧的，播放新的。
   */
  Element.prototype.morph = function(styles, options) {
    var $element = this;
    options = Object.mixin({duration: 400, timingFunction: 'ease', onStart: empty, onStep: empty, onFinish: empty}, options || {});
    var animations = getAnimations($element);
    var prevMorph = animations.morph;
    if (prevMorph) {
      prevMorph.pause();
    }
    var morph = animations.morph = new Animation()
        .addClip(Animation.createStyleRenderer($element, styles), 0, options.duration, options.timingFunction)
        .on('playstart', function(event) {
          options.onStart.call($element, event);
        })
        .on('step', function(event) {
          options.onStep.call($element, event);
        })
        .on('playfinish', function(event) {
          delete animations.morph;
          options.onFinish.call($element, event);
        });
    morph.play();
    return $element;
  };

//--------------------------------------------------[Element.prototype.highlight]
  /**
   * 让本元素播放一个高亮动画。
   * @name Element.prototype.highlight
   * @function
   * @param {string} [color] 高亮颜色，默认为 'yellow'。
   * @param {string} [property] 高亮样式名，默认为 'backgroundColor'。
   * @param {Object} [options] 动画选项。
   * @param {number} [options.duration] 播放时间，单位为毫秒，默认为 500。
   * @param {string} [options.timingFunction] 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'easeIn'。
   * @param {Function} [options.onStart] 播放开始时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onStep] 播放每一帧之后的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onFinish] 播放完成时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @returns {Element} 本元素。
   * @description
   *   如果本元素的动画播放列表中已经存在一个 highlight 动画，则停止旧的，播放新的。
   */
  Element.prototype.highlight = function(color, property, options) {
    var $element = this;
        color = color || 'yellow';
        property = property || 'backgroundColor';
        options = Object.mixin({duration: 500, timingFunction: 'easeIn', onStart: empty, onStep: empty, onFinish: empty}, options || {});
        var animations = getAnimations($element);
        var prevHighlight = animations.highlight;
        if (prevHighlight) {
          prevHighlight.pause();
          $element.setStyle(prevHighlight.property, prevHighlight.originalColor);
        }
        var styles = {};
        styles[property] = $element.getStyle(property);
        var highlight = animations.highlight = new Animation()
            .on('playstart', function(event) {
              $element.setStyle(property, color);
              this.addClip(Animation.createStyleRenderer($element, styles), 0, options.duration, options.timingFunction);
              options.onStart.call($element, event);
            })
            .on('step', function(event) {
              options.onStep.call($element, event);
            })
            .on('playfinish', function(event) {
              $element.setStyle(this.property, this.originalColor);
              delete animations.highlight;
              options.onFinish.call($element, event);
            });
        highlight.property = property;
        highlight.originalColor = $element.style[property];
        highlight.play();
        return $element;
  };

//--------------------------------------------------[Element.prototype.fade]
  /**
   * 让本元素播放一个淡入或淡出动画。
   * @name Element.prototype.fade
   * @function
   * @param {string} [mode] 模式，默认为 'toggle'。
   *   <table>
   *     <tr><th>可选值</th><th>含义</th></tr>
   *     <tr><td><dfn>toggle</dfn></td><td>如果本元素的动画播放列表中已经存在一个 fade 动画，则使用与这个已存在的动画相反的模式。<br>否则若本元素的 display 为 none 则为淡入模式，display 不为 none 则为淡出模式。</td></tr>
   *     <tr><td><dfn>in</dfn></td><td>淡入模式。</td></tr>
   *     <tr><td><dfn>out</dfn></td><td>淡出模式。</td></tr>
   *   </table>
   * @param {Object} [options] 动画选项。
   * @param {number} [options.duration] 播放时间，单位为毫秒，默认为 200。
   * @param {string} [options.timingFunction] 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'easeIn'。
   * @param {Function} [options.onStart] 播放开始时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onStep] 播放每一帧之后的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onFinish] 播放完成时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @returns {Element} 本元素。
   * @description
   *   如果本元素的动画播放列表中已经存在一个 fade 动画，则停止旧的，播放新的。这种情况下新动画的播放时间会小于设定的时间（具体取决于旧动画已播放的百分比）。
   *   否则若本元素的 display 不为 none 则不能播放淡入动画，display 为 none 则不能播放淡出动画。
   */
  Element.prototype.fade = function(mode, options) {
    var $element = this;
    var animations = getAnimations($element);
    var prevFade = animations.fade;
    // 根据当前已有的信息确定本次调用应为 fade in 模式还是 fade out 模式。
    var shouldBeFadeInMode = prevFade ? !prevFade.isFadeInMode : $element.getStyle('display') === 'none';
    // 实际为 fade in 模式还是 fade out 模式。
    var isFadeInMode;
    switch ((mode || 'toggle').toLowerCase()) {
      case 'toggle':
        isFadeInMode = shouldBeFadeInMode;
        break;
      case 'in':
        isFadeInMode = true;
        break;
      case 'out':
        isFadeInMode = false;
        break;
      default:
        throw new Error('Invalid mode "' + mode + '"');
    }
    // 检查是否可以播放 fade 动画。
    if (prevFade || isFadeInMode === shouldBeFadeInMode) {
      options = Object.mixin({duration: 200, timingFunction: 'easeIn', onStart: empty, onStep: empty, onFinish: empty}, options || {});
      var originalOpacity;
      var percentageNeedsPlay;
      if (prevFade) {
        originalOpacity = prevFade.originalOpacity;
        // 新动画与旧动画的方向相同：需要播放的百分比 = 旧动画要播放的百分比 * 旧动画未播完的百分比。
        // 新动画与旧动画的方向相反：需要播放的百分比 = 1 - 旧动画要播放的百分比 * 旧动画未播完的百分比。
        percentageNeedsPlay = Math.abs((isFadeInMode === prevFade.isFadeInMode ? 0 : 1) - prevFade.percentageNeedsPlay * (1 - (prevFade.timePoint / prevFade.duration)));
        // 停止播放旧动画。
        prevFade.pause();
      } else {
        originalOpacity = $element.getStyle('opacity');
        percentageNeedsPlay = 1;
        // 如果是 fade in 则将透明度设置为 0。
        if (isFadeInMode) {
          $element.setStyles({display: 'block', opacity: 0});
        }
      }
      var fade = animations.fade = new Animation()
          .addClip(Animation.createStyleRenderer($element, {opacity: isFadeInMode ? originalOpacity : 0}), 0, options.duration * percentageNeedsPlay, options.timingFunction)
          .on('playstart', function(event) {
            options.onStart.call($element, event);
          })
          .on('step', function(event) {
            options.onStep.call($element, event);
          })
          .on('playfinish', function(event) {
            delete animations.fade;
            // 如果是 fade out 则在播放完毕后恢复原始透明度。
            if (!isFadeInMode) {
              $element.setStyles({display: 'none', opacity: originalOpacity});
            }
            options.onFinish.call($element, event);
          });
      fade.isFadeInMode = isFadeInMode;
      fade.originalOpacity = originalOpacity;
      fade.percentageNeedsPlay = percentageNeedsPlay;
      fade.play();
    }
    return $element;
  };

//--------------------------------------------------[Element.prototype.smoothScroll]
  /**
   * 让本元素播放一个平滑滚动动画。
   * @name Element.prototype.smoothScroll
   * @function
   * @param {number} x 横向滚动坐标，支持相对坐标，如 '+=10' 表示在现有横坐标的基础上向左滚动 10 像素，'-=10' 表示在现有横坐标的基础上向右滚动 10 像素。
   * @param {number} y 纵向滚动坐标，支持相对坐标，如 '+=10' 表示在现有纵坐标的基础上向下滚动 10 像素，'-=10' 表示在现有纵坐标的基础上向上滚动 10 像素。
   * @param {Object} [options] 动画选项。
   * @param {number} [options.duration] 播放时间，单位为毫秒，默认为 200。
   * @param {string} [options.timingFunction] 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'easeInOut'。
   * @param {Function} [options.onStart] 播放开始时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onStep] 播放每一帧之后的回调。
   *   该函数被调用时 this 的值为本元素。
   * @param {Function} [options.onFinish] 播放完成时的回调。
   *   该函数被调用时 this 的值为本元素。
   * @returns {Element} 本元素。
   * @description
   *   如果本元素的动画播放列表中已经存在一个 smoothScroll 动画，则停止旧的，播放新的。
   *   如果在 HTML 或 BODY 元素上调用本方法，则滚动整个视口。
   */
  Element.prototype.smoothScroll = function(x, y, options) {
    var $element = this;
    options = Object.mixin({duration: 200, timingFunction: 'easeInOut', onStart: empty, onStep: empty, onFinish: empty}, options || {});
    var animations = getAnimations($element);
    var prevScroll = animations.smoothScroll;
    if (prevScroll) {
      prevScroll.pause();
    }
    var smoothScroll = animations.smoothScroll = new Animation()
        .addClip(Animation.createScrollRenderer($element, x, y), 0, options.duration, options.timingFunction)
        .on('playstart', function(event) {
          options.onStart.call($element, event);
        })
        .on('step', function(event) {
          options.onStep.call($element, event);
        })
        .on('playfinish', function(event) {
          delete animations.smoothScroll;
          options.onFinish.call($element, event);
        });
    smoothScroll.play();
    return $element;
  };

//--------------------------------------------------[Element.prototype.cancelAnimation]
  /**
   * 取消本元素正在播放的动画。
   * @name Element.prototype.cancelAnimation
   * @function
   * @param {string} [type] 要取消的动画类型，如果要取消多种类型的动画，使用逗号将它们分开即可。
   *   如果省略该参数，则取消本元素所有正在播放的动画。
   * @returns {Element} 本元素。
   * @description
   *   对于 morph 类型的动画，会在当前帧停止。
   *   对于 highlight 类型的动画，会恢复到动画播放前的状态。
   *   对于 fade 类型的动画，会跳过补间帧直接完成显示/隐藏。
   *   对于 smoothScroll 类型的动画，会立即停止滚动。
   */
  Element.prototype.cancelAnimation = function(type) {
    var $element = this;
    var animations = getAnimations($element);
    var types = type ? type.split(separator) : null;
    Object.forEach(animations, function(animation, type) {
      if (types === null || types.contains(type)) {
        animation.pause();
        delete animations[type];
        switch (type) {
          case 'morph':
            break;
          case 'highlight':
            $element.setStyle(animation.property, animation.originalColor);
            break;
          case 'fade':
            $element.setStyles({display: animation.isFadeInMode ? 'block' : 'none', opacity: animation.originalOpacity});
            break;
          case 'smoothScroll':
            break;
        }
      }
    });
    return $element;
  };

//==================================================[Element 扩展 - 动画]
  /*
   * 为 Element 扩展动画方法。
   *
   * 扩展方法：
   *   Element.prototype.transition
   */

//--------------------------------------------------[Element.prototype.transition]
  /**
   * 让本元素使用 CSS3 的 transition 属性来播放平滑过渡的动画。
   * @name Element.prototype.transition
   * @function
   * @param {Array} transitionStyles 要过渡的目标样式，元素将向指定的目标样式平滑过渡。
   *   目标样式包含一条或多条 CSS 属性名、属性值、消耗时间、控速函数、等待时间、回调函数的声明。
   *   其中 CSS 属性名不能重复，属性值的设置方式与 setStyles 的参数用法一致，消耗时间、控速函数和等待时间与 CSS3 transition 属性的要求一致，回调函数将仅在对应的属性名切实发生了过渡的情况下才会被调用。
   * @returns {Element} 本元素。
   */
//  Element.prototype.transition = function(transitionStyles) {
//    var $element = this;
//    $h1.setStyles({
//      transitionProperty: 'margin-left, background-color, opacity',
//      transitionDuration: '2s, 2s, 2s',
//      transitionTimingFunction: 'ease',
//      transitionDelay: '0s, 1s, 2s'
//    });
//
//    document.body.on('transitionend', function(e) {
//      console.log(e.type, e.propertyName, e);
//    });
//
//
//
//
//
//
//
//
//    $element.off('transitionend:once');
//    options = Object.mixin({duration: 400, timingFunction: 'ease', onStart: empty, onFinish: empty}, options || {});
//    $element.on('transitionend:once', function() {
//      options.onFinish.call($element);
//      $element.setStyle('transition', 'none');
//    });
//    setTimeout(function() {
//      $element.setStyle('transition', 'all ' + (options.duration / 1000) + 's').setStyles(styles);
//      options.onStart.call($element);
//    }, 0);
//    return $element;
//  };

})(window);
/**
 * @fileOverview 远程请求
 * @author sundongguo@gmail.com
 * @version 20120921
 */

(function(window) {
//==================================================[远程请求]
  /*
   * W3C 的 XMLHttpRequest Level 2 草案中提及的，不能被 IE6 IE7 IE8 IE9 支持的相关内容暂不予提供。
   * http://www.w3.org/TR/XMLHttpRequest/
   */

  // 请求状态。
  var COMPLETE = 0;
  var ABORT = -498;
  var TIMEOUT = -408;

  // 唯一识别码。
  var uid = Date.now();

  // 空函数。
  var empty = function() {
  };

  // 正在请求中的 XHR 模式的 request 对象。
  // http://bugs.jquery.com/ticket/5280
  var activeXHRModeRequests = [];
  if (window.ActiveXObject) {
    window.on('unload', function() {
      activeXHRModeRequests.forEach(function(request) {
        request.abort();
      });
    });
  }

  // 获取 XHR 对象。
  var getXHRObject = function() {
    try {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
      throw new Error('Can not create XHR Object');
    }
    return xhr;
  };

  // 获取响应头信息。
  var reHeaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;
  var parseXHRHeaders = function(rawHeaders) {
    var headers = {};
    var match;
    while (match = reHeaders.exec(rawHeaders)) {
      headers[match[1]] = match[2];
    }
    return headers;
  };

  // 数据传输已完成，应用最短时间设置。
  var transferComplete = function(request) {
    if (!request.sync && Number.isFinite(request.minTime)) {
      var delayTime = request.minTime - (Date.now() - request.timestamp);
      if (delayTime > 0) {
        request.minTimeTimer = setTimeout(function() {
          requestComplete(request, COMPLETE);
        }, delayTime);
        return;
      }
    }
    requestComplete(request, COMPLETE);
  };

  // 请求已完成，state 可能是 COMPLETE、ABORT 或 TIMEOUT。
  var requestComplete = function(request, state) {
    // 取消最短时间设置。
    if (request.minTimeTimer) {
      // 本次请求已经完成，但可能在等待过程中调用 abort 方法或设置了更短的 maxTime，导致 state 为 ABORT 或 TIMEOUT，所以要把 state 重置为 COMPLETE。
      state = COMPLETE;
      clearTimeout(request.minTimeTimer);
      delete request.minTimeTimer;
    }
    // 取消超时时间设置。
    if (request.maxTimeTimer) {
      clearTimeout(request.maxTimeTimer);
      delete request.maxTimeTimer;
    }
    // 重置请求状态。
    request.ongoing = false;
    delete request.timestamp;
    // 分析结果。
    var responseData = {
      status: 0,
      statusText: ''
    };
    switch (request.mode) {
      case 'xhr':
        responseData.headers = {};
        responseData.text = '';
        responseData.xml = null;
        // 清理 XHR 请求的状态。
        var xhr = request.xhr;
        delete request.xhr;
        xhr.onreadystatechange = empty;
        if (state === COMPLETE) {
          // 请求已完成，获取数据。
          // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
          try {
            responseData.status = xhr.status;
            // http://bugs.jquery.com/ticket/1450
            if (responseData.status === 1223) {
              responseData.status = 204;
            }
            responseData.statusText = xhr.statusText;
            responseData.headers = parseXHRHeaders(xhr.getAllResponseHeaders());
            responseData.text = xhr.responseText;
            // http://bugs.jquery.com/ticket/4958
            if (xhr.responseXML && xhr.responseXML.documentElement) {
              responseData.xml = xhr.responseXML;
            }
          } catch (e) {
          }
        } else {
          // 请求被取消或超时，取消本次 XHR 请求。
          xhr.abort();
        }
        activeXHRModeRequests.remove(request);
        break;
      case 'jsonp':
        responseData.data = null;
        if (state === COMPLETE) {
          // 请求已完成，获取数据。
          responseData.status = COMPLETE;
          responseData.statusText = 'OK';
          responseData.data = request.receivedData;
        } else {
          // 请求被取消或超时，取消本次 JSONP 回调的响应。
          var requestId = request.id;
          Request[requestId] = function() {
            delete Request[requestId];
          };
        }
        break;
    }
    // 触发事件。
    switch (state) {
      case COMPLETE:
        request.fire('complete', responseData);
        break;
      case ABORT:
        responseData.status = ABORT;
        responseData.statusText = 'Aborted';
        request.fire('abort', responseData);
        break;
      case TIMEOUT:
        responseData.status = TIMEOUT;
        responseData.statusText = 'Timeout';
        request.fire('timeout', responseData);
        break;
    }
    request.fire('finish', responseData);
  };

//--------------------------------------------------[Request]
  /**
   * 对一个指定的资源发起请求，并获取响应数据。
   * @name Request
   * @constructor
   * @param {string} url 请求地址。
   * @param {Object} [options] 可选参数。
   * @param {string} [options.mode] 请求模式，可选值为 'xhr'（启用 XHR 模式）和 'jsonp'（启用 JSONP 模式），大小写不敏感，默认为 'xhr'。
   * @param {string} [options.method] 请求方法，仅在 XHR 模式下有效，可以使用 'get' 和 'post'，大小写不敏感，默认为 'get'。
   *   在 JSONP 模式下，永远使用 'get' 方法进行请求。
   *   当使用 'get' 方法进行请求时，应将整个 URL 的长度控制在 2048 个字符以内。
   * @param {boolean} [options.noCache] 是否禁用浏览器的缓存，仅在 XHR 模式下有效，默认启用浏览器的缓存。
   *   在 JSONP 模式下，永远禁用浏览器的缓存。
   * @param {boolean} [options.sync] 是否使用同步方式进行请求，仅在 XHR 模式下有效，默认使用异步方式进行请求。
   *   在 JSONP 模式下，永远使用异步方式进行请求。
   * @param {number} [options.minTime] 请求最短时间，仅在使用异步方式进行请求时有效，单位为毫秒，默认为 NaN，即无最短时间限制。
   * @param {number} [options.maxTime] 请求超时时间，仅在使用异步方式进行请求时有效，单位为毫秒，默认为 NaN，即无超时时间限制。
   * @param {string} [options.username] 用户名，仅在 XHR 模式下有效，默认为空字符串，即不指定用户名。
   * @param {string} [options.password] 密码，仅在 XHR 模式下有效，默认为空字符串，即不指定密码。
   * @param {Object} [options.headers] 请求头的内容，仅在 XHR 模式下有效，格式为 {key: value, ...}，默认为 {'X-Requested-With': 'XMLHttpRequest', 'Accept': '*&#47;*'}。
   * @param {string} [options.contentType] 发送的数据类型，仅在 XHR 模式下且 method 为 'post' 时有效，默认为 'application/x-www-form-urlencoded'。
   * @param {string} [options.callbackName] 保存 JSONP 前缀的参数名，服务端应将该参数的值作为输出 JSONP 时的前缀使用，仅在 JSONP 模式下有效，大小写敏感，默认为 'callback'。
   * @fires start
   *   请求开始时触发。
   * @fires abort
   *   请求被取消时触发。
   * @fires timeout
   *   请求超时时触发。
   * @fires complete
   *   请求完成时触发。
   * @fires finish
   *   请求结束时触发。
   *   只要请求已开始，此事件就必然会被触发（跟随在 abort、timeout 或 complete 任一事件之后）。
   *   这样设计的好处是在请求结束时可以统一处理一些状态的设定或恢复，如将 start 事件监听器中呈现到用户界面的提示信息隐藏。
   * @description
   *   所有 Request 的实例也都是一个 JSEventTarget 对象。
   *   每个 Request 的实例都对应一个资源，实例创建后可以重复使用。
   *   创建 Request 时，可以选择使用 XHR 模式（同域请求时）或 JSONP 模式（跨域请求时）。
   *   在 JSONP 模式下，如果服务端返回的响应体不是 JSONP 格式的数据，请求将出现错误，并且这个错误是无法被捕获的。需要注意的是 JSONP 请求会直接执行另一个域内的脚本，因此如果该域遭到攻击，本域也可能会受到影响。
   *   两种模式的请求结果都会被传入 abort、timeout、complete 和 finish 事件监听器中。
   *   XHR 模式的请求结果中包含以下属性：
   *   <ul>
   *     <li>{number} <dfn>status</dfn> 状态码。</li>
   *     <li>{string} <dfn>statusText</dfn> 状态描述。</li>
   *     <li>{Object} <dfn>headers</dfn> 响应头。</li>
   *     <li>{string} <dfn>text</dfn> 响应文本。</li>
   *     <li>{?XMLDocument} <dfn>xml</dfn> 响应 XML 文档。</li>
   *   </ul>
   *   JSONP 模式的请求结果中包含以下属性：
   *   <ul>
   *     <li>{number} <dfn>status</dfn> 状态码。</li>
   *     <li>{string} <dfn>statusText</dfn> 状态描述。</li>
   *     <li>{*} <dfn>data</dfn> 请求结果。</li>
   *   </ul>
   */
  var Request = window.Request = function(url, options) {
    // 保存请求地址。
    this.url = url;
    // 保存选项数据。
    options = Object.mixin(Object.clone(Request.options, true), options || {});
    switch (options.mode = options.mode.toLowerCase()) {
      case 'xhr':
        options.method = options.method.toLowerCase();
        Object.mixin(this, options, {whiteList: ['mode', 'method', 'noCache', 'sync', 'minTime', 'maxTime', 'username', 'password', 'headers', 'contentType']});
        break;
      case 'jsonp':
        options.method = 'get';
        options.noCache = true;
        options.sync = false;
        Object.mixin(this, options, {whiteList: ['mode', 'method', 'noCache', 'sync', 'minTime', 'maxTime', 'callbackName']});
        break;
    }
    /**
     * 请求是否正在进行中。
     * @name Request#ongoing
     * @type boolean
     */
    this.ongoing = false;
    JSEventTarget.create(this);
  };

//--------------------------------------------------[Request.options]
  /**
   * 默认选项。
   * @name Request.options
   * @type Object
   * @description
   *   修改 Request.options 即可更改 Request 的默认选项，新的默认选项仅对后续创建的实例生效。
   */
  Request.options = {
    mode: 'xhr',
    method: 'get',
    noCache: false,
    sync: false,
    minTime: NaN,
    maxTime: NaN,
    username: '',
    password: '',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': '*/*'
    },
    contentType: 'application/x-www-form-urlencoded',
    callbackName: 'callback'
  };

//--------------------------------------------------[Request.prototype.send]
  /**
   * 发送请求。
   * @name Request.prototype.send
   * @function
   * @param {Object} [requestData] 要发送的数据。
   *   数据格式为 {key1: value1, key2: [value21, value22, ...], ...}，其中所有 value 都可以为任意基本类型的数据（在发送时它们都将被强制转换为字符串类型），另外 key 和 value 均不必做百分比编码。
   *   本方法的参数不允许使用字符串类型的数据，因为无法判断指定的字符串值是否需要做百分比编码。
   * @returns {boolean} 本方法是否已被成功调用。
   * @description
   *   如果上一次发送的请求尚未完成，则调用本方法无效。
   */
  Request.prototype.send = function(requestData) {
    var request = this;
    // 如果请求正在进行中，则需等待此次请求完成后才能再次发起请求（若设置了 minTime 则请求完成的时间可能比交互完成的时间长）。
    if (!request.ongoing) {
      // 请求开始进行。
      request.ongoing = true;
      request.timestamp = Date.now();
      // 触发 start 事件。
      request.fire('start');
      // 序列化请求数据。如果请求数据为空，则统一使用 null 表示。
      requestData = requestData ? Object.toQueryString(requestData) : null;
      // 发送 XHR 或 JSONP 模式的请求。
      var url = request.url;
      var method = request.method;
      if (method === 'get' && requestData) {
        url += (url.contains('?') ? '&' : '?') + requestData;
        requestData = null;
      }
      var inSync = request.sync;
      switch (request.mode) {
        case 'xhr':
          if (request.noCache) {
            url += (url.contains('?') ? '&' : '?') + '_=' + (++uid).toString(36);
          }
          var xhr = request.xhr = getXHRObject();
          // 准备请求。
          xhr.open(method, url, !inSync, request.username, request.password);
          // 设置请求头。
          Object.forEach(request.headers, function(value, key) {
            xhr.setRequestHeader(key, value);
          });
          if (method === 'post') {
            xhr.setRequestHeader('Content-Type', request.contentType);
          }
          // 发送请求。
          xhr.send(requestData);
          activeXHRModeRequests.push(request);
          // 检查请求状态。
          if (inSync || xhr.readyState === 4) {
            // IE 使用 ActiveXObject 创建的 XHR 对象即便在异步模式下，如果访问地址已被浏览器缓存，将直接改变 readyState 为 4，并且不会触发 onreadystatechange 事件。
            transferComplete(request);
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                transferComplete(request);
              }
            };
          }
          break;
        case 'jsonp':
          var requestId = '_' + (++uid).toString(36);
          url += (url.contains('?') ? '&' : '?') + request.callbackName + '=Request.' + requestId;
          // 准备回调函数。
          Request[request.id = requestId] = function(data) {
            delete Request[requestId];
            request.receivedData = data;
            transferComplete(request);
          };
          // 发送请求。
          document.loadScript(url);
          break;
      }
      // 超时时间设置。
      if (!inSync && Number.isFinite(request.maxTime)) {
        request.maxTimeTimer = setTimeout(function() {
          requestComplete(request, TIMEOUT);
        }, Math.max(0, request.maxTime));
      }
      return true;
    }
    return false;
  };

//--------------------------------------------------[Request.prototype.abort]
  /**
   * 取消请求。
   * @name Request.prototype.abort
   * @function
   * @returns {boolean} 本方法是否已被成功调用。
   * @description
   *   仅在一次异步模式的请求正在进行时，调用本方法才有效。
   */
  Request.prototype.abort = function() {
    if (this.ongoing) {
      requestComplete(this, ABORT);
      return true;
    }
    return false;
  };

})(window);
/**
 * @fileOverview Widget
 * @author sundongguo@gmail.com
 * @version 20121008
 */

(function(window) {
//==================================================[Widget]
  /*
   * 一个 Widget 本身仍是一个元素。当一个元素成为 Widget 时，将具备新的行为，获得新的属性、方法，并能触发新的事件。
   * 这些新增的特性并不妨碍将一个 Widget 视为一个普通元素来对其进行操作（如修改某部分的内容、结构、表现或行为）。
   * 一个 Widget 至少依赖一个已经存在于文档树中的元素，一个元素只能成为一种 Widget。
   *
   * 使一个元素成为 Widget 有以下两种方式：
   *   1. 在编写 HTML 代码时，为该元素添加 widget-<type> 类，并使用 data-<config>="<value>" 来定义 Widget 的配置。
   *   2. 在脚本中创建符合方式 1 的元素，之后调用 Widget.parse(<element>) 方法来解析。
   * 其中 type 为 Widget 的类型，config/value 为 Widget 的配置信息，element 为目标元素。
   *
   * 为了使相同类型的 Widget 必定具备相同的新特性，本实现并未提供直接手段对现有的 Widget 进行扩展。
   * 必须要扩展时，应注册一个新的 Widget，并在其初始化函数中调用 Widget.parseAs($element, type) 来赋予目标元素 <type> 类 Widget 的新特性，即对已有的 Widget 类型进行包装。
   *
   * 一些 Widget 如果在 beforedomready 事件发生时初始化完毕，但没有在 domready 事件发生时主动调用其重建界面的方法 M，则方法 M 会在 afterdomready 事件发生时自动被调用。
   * 这种处理方式是为了确保在 domready 事件发生时为该 Widget 添加的监听器可以被正常调用。
   * 通常在上述方法 M 被调用前，这些 Widget 会将其默认样式 visibility 预置为 hidden，并在首次调用方法 M 后再将 visibility 修改为 visible，以避免可能出现的内容闪烁。
   *
   * 提供对象：
   *   Widget
   *
   * 提供静态方法：
   *   Widget.register
   *   Widget.parse
   *   Widget.parseAs
   */

  // 已注册的解析器。
  var parsers = {};

//--------------------------------------------------[Widget]
  /**
   * 提供对 Widget 的支持。
   * @name Widget
   * @namespace
   */
  var Widget = window.Widget = {};

//--------------------------------------------------[Widget.register]
  /**
   * 注册一个 Widget。
   * @name Widget.register
   * @function
   * @param {Object} widget 要注册的 Widget 的相关信息。
   * @param {string} widget.type Widget 的类型。
   * @param {string} widget.selector Widget 的选择符（要求格式为 <var>nodeName</var>.<var>className</var>），能被此选择符选中的元素即可被本 Widget 的解析器解析。
   * @param {Array} [widget.styleRules] 包含要应用到此类 Widget 的 CSS 规则集的数组。
   * @param {Object} [widget.config] 包含此类 Widget 的默认配置的对象。
   * @param {Object} [widget.methods] 包含此类 Widget 的实例方法的对象。
   * @param {Function} [widget.initialize] 此类 Widget 的初始化函数。
   */
  Widget.register = function(widget) {
    if (widget.styleRules) {
      document.addStyleRules(widget.styleRules);
    }

    parsers[widget.type] = {
      selector: widget.selector,
      nodeName: widget.selector.substring(0, widget.selector.indexOf('.')).toUpperCase(),
      parse: function($element) {
        // 从目标元素的 attributes 中解析配置信息并将其添加到目标元素。
        if (widget.config) {
          Object.forEach(widget.config, function(defaultValue, key) {
            var value = defaultValue;
            var specifiedValue = $element.getData(key);
            if (specifiedValue !== null) {
              switch (typeof defaultValue) {
                case 'string':
                  value = specifiedValue;
                  break;
                case 'boolean':
                  value = true;
                  break;
                case 'number':
                  value = parseFloat(specifiedValue);
                  break;
                default:
                  throw new Error('Invalid config type "' + key + '"');
              }
            }
            $element[key] = value;
          });
        }
        // 为目标元素添加方法。
        if (widget.methods) {
          Object.mixin($element, widget.methods);
        }
        // 初始化。
        if (widget.initialize) {
          widget.initialize.call($element);
        }
        // 标记 Widget 的类型。
        $element.widgetType = widget.type;
      }
    };

  };

//--------------------------------------------------[Widget.parse]
  /**
   * 将符合条件的元素解析为 Widget。
   * @name Widget.parse
   * @function
   * @param {Element} element 要解析的元素。
   * @param {boolean} [recursively] 是否解析该元素的后代元素。
   * @description
   *   在 DOM 树解析完成后会自动将页面内的全部符合条件的元素解析为 Widget，因此仅应在必要时调用本方法。
   */
  var reWidgetType = /\bwidget-([a-z][a-z0-9-]*)\b/;
  Widget.parse = function(element, recursively) {
    var $element = document.$(element);
    if (!$element.widgetType) {
      var match = $element.className.match(reWidgetType);
      if (match) {
        Widget.parseAs($element, match[1]);
      }
    }
    if (recursively) {
      $element.findAll('[class*=widget-]').forEach(function($element) {
        Widget.parse($element);
      });
    }
  };

//--------------------------------------------------[Widget.parseAs]
  /**
   * 将一个元素解析为指定类型的 Widget。
   * @name Widget.parseAs
   * @function
   * @param {Element} element 要解析的元素。
   * @param {string} type Widget 的类型。
   * @description
   *   如果指定的元素的标签名不符合此 Widget 的要求，则解析会失败。
   */
  Widget.parseAs = function(element, type) {
    var $element = document.$(element);
    var parser = parsers[type];
    if (parser && parser.parse) {
      if ($element.nodeName === parser.nodeName) {
        parser.parse($element);
      } else {
        console.warn('OurJS: Widget "' + type + '" can not be applied on ' + $element.nodeName + ' elements.');
      }
    } else {
      console.warn('OurJS: Widget parser "' + type + '" is not found.');
    }
  };

//--------------------------------------------------[自动解析]
  document.on('beforedomready', function() {
    Widget.parse(document.body, true);
  });

})(window);


(function(e){if(!e.JSON||navigator.isIE8){e.JSON={toString:function(){return"[object JSON]"}}}function d(f){return f<10?"0"+f:f}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(f){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+d(this.getUTCMonth()+1)+"-"+d(this.getUTCDate())+"T"+d(this.getUTCHours())+":"+d(this.getUTCMinutes())+":"+d(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Boolean.prototype.toJSON=Number.prototype.toJSON=function(f){return this.valueOf()}}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,i,b,k={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},j;function a(f){h.lastIndex=0;return h.test(f)?'"'+f.replace(h,function(l){var m=k[l];return typeof m==="string"?m:"\\u"+("0000"+l.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+f+'"'}function g(r,o){var m,l,s,f,p=i,n,q=o[r];if(q&&typeof q==="object"&&typeof q.toJSON==="function"){q=q.toJSON(r)}if(typeof j==="function"){q=j.call(o,r,q)}switch(typeof q){case"string":return a(q);case"number":return isFinite(q)?String(q):"null";case"boolean":case"null":return String(q);case"object":if(!q){return"null"}i+=b;n=[];if(Object.prototype.toString.apply(q)==="[object Array]"){f=q.length;for(m=0;m<f;m+=1){n[m]=g(m,q)||"null"}s=n.length===0?"[]":i?"[\n"+i+n.join(",\n"+i)+"\n"+p+"]":"["+n.join(",")+"]";i=p;return s}if(j&&typeof j==="object"){f=j.length;for(m=0;m<f;m+=1){if(typeof j[m]==="string"){l=j[m];s=g(l,q);if(s){n.push(a(l)+(i?": ":":")+s)}}}}else{for(l in q){if(Object.prototype.hasOwnProperty.call(q,l)){s=g(l,q);if(s){n.push(a(l)+(i?": ":":")+s)}}}}s=n.length===0?"{}":i?"{\n"+i+n.join(",\n"+i)+"\n"+p+"}":"{"+n.join(",")+"}";i=p;return s}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(n,l,m){var f;i="";b="";if(typeof m==="number"){for(f=0;f<m;f+=1){b+=" "}}else{if(typeof m==="string"){b=m}}j=l;if(l&&typeof l!=="function"&&(typeof l!=="object"||typeof l.length!=="number")){throw new Error("JSON.stringify")}return g("",{"":n})}}if(typeof JSON.parse!=="function"){JSON.parse=function(n,f){var m;function l(r,q){var p,o,s=r[q];if(s&&typeof s==="object"){for(p in s){if(Object.prototype.hasOwnProperty.call(s,p)){o=l(s,p);if(o!==undefined){s[p]=o}else{delete s[p]}}}}return f.call(r,q,s)}n=String(n);c.lastIndex=0;if(c.test(n)){n=n.replace(c,function(o){return"\\u"+("0000"+o.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){m=e["eval"]("("+n+")");return typeof f==="function"?l({"":m},""):m}throw new SyntaxError("JSON.parse")}}})(window);
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2013 jQuery Foundation, Inc. and other contributors
 *  http://sizzlejs.com/
 *  1.10.18
 *  Released under the MIT license.
 */
(function(av){var D,ay,t,M,P,n,ab,ax,aC,N,ac,ae,H,u,an,ai,aw,k,K,ap="sizzle"+-(new Date()),O=av.document,az=0,aj=0,d=F(),ao=F(),L=F(),J=function(i,e){if(i===e){ac=true}return 0},au=typeof undefined,V=1<<31,T=({}).hasOwnProperty,ar=[],at=ar.pop,R=ar.push,b=ar.push,s=ar.slice,j=ar.indexOf||function(aE){var aD=0,e=this.length;for(;aD<e;aD++){if(this[aD]===aE){return aD}}return -1},c="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",v="[\\x20\\t\\r\\n\\f]",a="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",Q=a.replace("w","w#"),al="\\["+v+"*("+a+")(?:"+v+"*([*^$|!~]?=)"+v+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+Q+"))|)"+v+"*\\]",q=":("+a+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+al+")*)|.*)\\)|)",x=new RegExp("^"+v+"+|((?:^|[^\\\\])(?:\\\\.)*)"+v+"+$","g"),A=new RegExp("^"+v+"*,"+v+"*"),G=new RegExp("^"+v+"*([>+~]|"+v+")"+v+"*"),z=new RegExp("="+v+"*([^\\]'\"]*?)"+v+"*\\]","g"),X=new RegExp(q),Z=new RegExp("^"+Q+"$"),ah={ID:new RegExp("^#("+a+")"),CLASS:new RegExp("^\\.("+a+")"),TAG:new RegExp("^("+a.replace("w","w*")+")"),ATTR:new RegExp("^"+al),PSEUDO:new RegExp("^"+q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+v+"*(even|odd|(([+-]|)(\\d*)n|)"+v+"*(?:([+-]|)"+v+"*(\\d+)|))"+v+"*\\)|)","i"),bool:new RegExp("^(?:"+c+")$","i"),needsContext:new RegExp("^"+v+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+v+"*((?:-\\d)?\\d*)"+v+"*\\)|)(?=[^-]|$)","i")},h=/^(?:input|select|textarea|button)$/i,r=/^h\d$/i,U=/^[^{]+\{\s*\[native \w/,W=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ag=/[+~]/,S=/'|\\/g,y=new RegExp("\\\\([\\da-f]{1,6}"+v+"?|("+v+")|.)","ig"),ak=function(e,aE,i){var aD="0x"+aE-65536;return aD!==aD||i?aE:aD<0?String.fromCharCode(aD+65536):String.fromCharCode(aD>>10|55296,aD&1023|56320)};try{b.apply((ar=s.call(O.childNodes)),O.childNodes);ar[O.childNodes.length].nodeType}catch(I){b={apply:ar.length?function(i,e){R.apply(i,s.call(e))}:function(aF,aE){var e=aF.length,aD=0;while((aF[e++]=aE[aD++])){}aF.length=e-1}}}function B(aK,aD,aO,aQ){var aP,aH,aI,aM,aN,aG,aF,e,aE,aL;if((aD?aD.ownerDocument||aD:O)!==H){ae(aD)}aD=aD||H;aO=aO||[];if(!aK||typeof aK!=="string"){return aO}if((aM=aD.nodeType)!==1&&aM!==9){return[]}if(an&&!aQ){if((aP=W.exec(aK))){if((aI=aP[1])){if(aM===9){aH=aD.getElementById(aI);if(aH&&aH.parentNode){if(aH.id===aI){aO.push(aH);return aO}}else{return aO}}else{if(aD.ownerDocument&&(aH=aD.ownerDocument.getElementById(aI))&&K(aD,aH)&&aH.id===aI){aO.push(aH);return aO}}}else{if(aP[2]){b.apply(aO,aD.getElementsByTgaName(aK));return aO}else{if((aI=aP[3])&&ay.getElementsByClassName&&aD.getElementsByClassName){b.apply(aO,aD.getElementsByClassName(aI));return aO}}}}if(ay.qsa&&(!ai||!ai.test(aK))){e=aF=ap;aE=aD;aL=aM===9&&aK;if(aM===1&&aD.nodeName.toLowerCase()!=="object"){aG=n(aK);if((aF=aD.getAttribute("id"))){e=aF.replace(S,"\\$&")}else{aD.setAttribute("id",e)}e="[id='"+e+"'] ";aN=aG.length;while(aN--){aG[aN]=e+o(aG[aN])}aE=ag.test(aK)&&Y(aD.parentNode)||aD;aL=aG.join(",")}if(aL){try{b.apply(aO,aE.querySelectorAll(aL));return aO}catch(aJ){}finally{if(!aF){aD.removeAttribute("id")}}}}}return ax(aK.replace(x,"$1"),aD,aO,aQ)}function F(){var i=[];function e(aD,aE){if(i.push(aD+" ")>t.cacheLength){delete e[i.shift()]}return(e[aD+" "]=aE)}return e}function p(e){e[ap]=true;return e}function l(i){var aE=H.createElement("div");try{return !!i(aE)}catch(aD){return false}finally{if(aE.parentNode){aE.parentNode.removeChild(aE)}aE=null}}function aA(aD,aF){var e=aD.split("|"),aE=aD.length;while(aE--){t.attrHandle[e[aE]]=aF}}function f(i,e){var aE=e&&i,aD=aE&&i.nodeType===1&&e.nodeType===1&&(~e.sourceIndex||V)-(~i.sourceIndex||V);if(aD){return aD}if(aE){while((aE=aE.nextSibling)){if(aE===e){return -1}}}return i?1:-1}function C(e){return function(aD){var i=aD.nodeName.toLowerCase();return i==="input"&&aD.type===e}}function g(e){return function(aD){var i=aD.nodeName.toLowerCase();return(i==="input"||i==="button")&&aD.type===e}}function am(e){return p(function(i){i=+i;return p(function(aD,aH){var aF,aE=e([],aD.length,i),aG=aE.length;while(aG--){if(aD[(aF=aE[aG])]){aD[aF]=!(aH[aF]=aD[aF])}}})})}function Y(e){return e&&typeof e.getElementsByTagName!==au&&e}ay=B.support={};P=B.isXML=function(e){var i=e&&(e.ownerDocument||e).documentElement;return i?i.nodeName!=="HTML":false};ae=B.setDocument=function(aD){var e,aE=aD?aD.ownerDocument||aD:O,i=aE.defaultView;if(aE===H||aE.nodeType!==9||!aE.documentElement){return H}H=aE;u=aE.documentElement;an=!P(aE);if(i&&i!==i.top){if(i.addEventListener){i.addEventListener("unload",function(){ae()},false)}else{if(i.attachEvent){i.attachEvent("onunload",function(){ae()})}}}ay.attributes=l(function(aF){aF.className="i";return !aF.getAttribute("className")});ay.getElementsByTagName=l(function(aF){aF.appendChild(aE.createComment(""));return !aF.getElementsByTagName("*").length});ay.getElementsByClassName=U.test(aE.getElementsByClassName)&&l(function(aF){aF.innerHTML="<div class='a'></div><div class='a i'></div>";aF.firstChild.className="i";return aF.getElementsByClassName("i").length===2});ay.getById=l(function(aF){u.appendChild(aF).id=ap;return !aE.getElementsByName||!aE.getElementsByName(ap).length});if(ay.getById){t.find.ID=function(aH,aG){if(typeof aG.getElementById!==au&&an){var aF=aG.getElementById(aH);return aF&&aF.parentNode?[aF]:[]}};t.filter.ID=function(aG){var aF=aG.replace(y,ak);return function(aH){return aH.getAttribute("id")===aF}}}else{delete t.find.ID;t.filter.ID=function(aG){var aF=aG.replace(y,ak);return function(aI){var aH=typeof aI.getAttributeNode!==au&&aI.getAttributeNode("id");return aH&&aH.value===aF}}}t.find.TAG=ay.getElementsByTagName?function(aF,aG){if(typeof aG.getElementsByTagName!==au){return aG.getElementsByTagName(aF)}}:function(aF,aJ){var aK,aI=[],aH=0,aG=aJ.getElementsByTagName(aF);if(aF==="*"){while((aK=aG[aH++])){if(aK.nodeType===1){aI.push(aK)}}return aI}return aG};t.find.CLASS=ay.getElementsByClassName&&function(aG,aF){if(typeof aF.getElementsByClassName!==au&&an){return aF.getElementsByClassName(aG)}};aw=[];ai=[];if((ay.qsa=U.test(aE.querySelectorAll))){l(function(aF){aF.innerHTML="<select msallowclip=''><option selected=''></option></select>";if(aF.querySelectorAll("[msallowclip^='']").length){ai.push("[*^$]="+v+"*(?:''|\"\")")}if(!aF.querySelectorAll("[selected]").length){ai.push("\\["+v+"*(?:value|"+c+")")}if(!aF.querySelectorAll(":checked").length){ai.push(":checked")}});l(function(aG){var aF=aE.createElement("input");aF.setAttribute("type","hidden");aG.appendChild(aF).setAttribute("name","D");if(aG.querySelectorAll("[name=d]").length){ai.push("name"+v+"*[*^$|!~]?=")}if(!aG.querySelectorAll(":enabled").length){ai.push(":enabled",":disabled")}aG.querySelectorAll("*,:x");ai.push(",.*:")})}if((ay.matchesSelector=U.test((k=u.matches||u.webkitMatchesSelector||u.mozMatchesSelector||u.oMatchesSelector||u.msMatchesSelector)))){l(function(aF){ay.disconnectedMatch=k.call(aF,"div");k.call(aF,"[s!='']:x");aw.push("!=",q)})}ai=ai.length&&new RegExp(ai.join("|"));aw=aw.length&&new RegExp(aw.join("|"));e=U.test(u.compareDocumentPosition);K=e||U.test(u.contains)?function(aG,aF){var aI=aG.nodeType===9?aG.documentElement:aG,aH=aF&&aF.parentNode;return aG===aH||!!(aH&&aH.nodeType===1&&(aI.contains?aI.contains(aH):aG.compareDocumentPosition&&aG.compareDocumentPosition(aH)&16))}:function(aG,aF){if(aF){while((aF=aF.parentNode)){if(aF===aG){return true}}}return false};J=e?function(aG,aF){if(aG===aF){ac=true;return 0}var aH=!aG.compareDocumentPosition-!aF.compareDocumentPosition;if(aH){return aH}aH=(aG.ownerDocument||aG)===(aF.ownerDocument||aF)?aG.compareDocumentPosition(aF):1;if(aH&1||(!ay.sortDetached&&aF.compareDocumentPosition(aG)===aH)){if(aG===aE||aG.ownerDocument===O&&K(O,aG)){return -1}if(aF===aE||aF.ownerDocument===O&&K(O,aF)){return 1}return N?(j.call(N,aG)-j.call(N,aF)):0}return aH&4?-1:1}:function(aG,aF){if(aG===aF){ac=true;return 0}var aM,aJ=0,aL=aG.parentNode,aI=aF.parentNode,aH=[aG],aK=[aF];if(!aL||!aI){return aG===aE?-1:aF===aE?1:aL?-1:aI?1:N?(j.call(N,aG)-j.call(N,aF)):0}else{if(aL===aI){return f(aG,aF)}}aM=aG;while((aM=aM.parentNode)){aH.unshift(aM)}aM=aF;while((aM=aM.parentNode)){aK.unshift(aM)}while(aH[aJ]===aK[aJ]){aJ++}return aJ?f(aH[aJ],aK[aJ]):aH[aJ]===O?-1:aK[aJ]===O?1:0};return aE};B.matches=function(i,e){return B(i,null,null,e)};B.matchesSelector=function(aD,aF){if((aD.ownerDocument||aD)!==H){ae(aD)}aF=aF.replace(z,"='$1']");if(ay.matchesSelector&&an&&(!aw||!aw.test(aF))&&(!ai||!ai.test(aF))){try{var i=k.call(aD,aF);if(i||ay.disconnectedMatch||aD.document&&aD.document.nodeType!==11){return i}}catch(aE){}}return B(aF,H,null,[aD]).length>0};B.contains=function(e,i){if((e.ownerDocument||e)!==H){ae(e)}return K(e,i)};B.attr=function(aD,e){if((aD.ownerDocument||aD)!==H){ae(aD)}var i=t.attrHandle[e.toLowerCase()],aE=i&&T.call(t.attrHandle,e.toLowerCase())?i(aD,e,!an):undefined;return aE!==undefined?aE:ay.attributes||!an?aD.getAttribute(e):(aE=aD.getAttributeNode(e))&&aE.specified?aE.value:null};B.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)};B.uniqueSort=function(aE){var aF,aG=[],e=0,aD=0;ac=!ay.detectDuplicates;N=!ay.sortStable&&aE.slice(0);aE.sort(J);if(ac){while((aF=aE[aD++])){if(aF===aE[aD]){e=aG.push(aD)}}while(e--){aE.splice(aG[e],1)}}N=null;return aE};M=B.getText=function(aG){var aF,aD="",aE=0,e=aG.nodeType;if(!e){while((aF=aG[aE++])){aD+=M(aF)}}else{if(e===1||e===9||e===11){if(typeof aG.textContent==="string"){return aG.textContent}else{for(aG=aG.firstChild;aG;aG=aG.nextSibling){aD+=M(aG)}}}else{if(e===3||e===4){return aG.nodeValue}}}return aD};t=B.selectors={cacheLength:50,createPseudo:p,match:ah,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(y,ak);e[3]=(e[3]||e[4]||e[5]||"").replace(y,ak);if(e[2]==="~="){e[3]=" "+e[3]+" "}return e.slice(0,4)},CHILD:function(e){e[1]=e[1].toLowerCase();if(e[1].slice(0,3)==="nth"){if(!e[3]){B.error(e[0])}e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd"));e[5]=+((e[7]+e[8])||e[3]==="odd")}else{if(e[3]){B.error(e[0])}}return e},PSEUDO:function(i){var e,aD=!i[6]&&i[2];if(ah.CHILD.test(i[0])){return null}if(i[3]){i[2]=i[4]||i[5]||""}else{if(aD&&X.test(aD)&&(e=n(aD,true))&&(e=aD.indexOf(")",aD.length-e)-aD.length)){i[0]=i[0].slice(0,e);i[2]=aD.slice(0,e)}}return i.slice(0,3)}},filter:{TAG:function(i){var e=i.replace(y,ak).toLowerCase();return i==="*"?function(){return true}:function(aD){return aD.nodeName&&aD.nodeName.toLowerCase()===e}},CLASS:function(e){var i=d[e+" "];return i||(i=new RegExp("(^|"+v+")"+e+"("+v+"|$)"))&&d(e,function(aD){return i.test(typeof aD.className==="string"&&aD.className||typeof aD.getAttribute!==au&&aD.getAttribute("class")||"")})},ATTR:function(aD,i,e){return function(aF){var aE=B.attr(aF,aD);if(aE==null){return i==="!="}if(!i){return true}aE+="";return i==="="?aE===e:i==="!="?aE!==e:i==="^="?e&&aE.indexOf(e)===0:i==="*="?e&&aE.indexOf(e)>-1:i==="$="?e&&aE.slice(-e.length)===e:i==="~="?(" "+aE+" ").indexOf(e)>-1:i==="|="?aE===e||aE.slice(0,e.length+1)===e+"-":false}},CHILD:function(i,aF,aE,aG,aD){var aI=i.slice(0,3)!=="nth",e=i.slice(-4)!=="last",aH=aF==="of-type";return aG===1&&aD===0?function(aJ){return !!aJ.parentNode}:function(aP,aN,aS){var aJ,aV,aQ,aU,aR,aM,aO=aI!==e?"nextSibling":"previousSibling",aT=aP.parentNode,aL=aH&&aP.nodeName.toLowerCase(),aK=!aS&&!aH;if(aT){if(aI){while(aO){aQ=aP;while((aQ=aQ[aO])){if(aH?aQ.nodeName.toLowerCase()===aL:aQ.nodeType===1){return false}}aM=aO=i==="only"&&!aM&&"nextSibling"}return true}aM=[e?aT.firstChild:aT.lastChild];if(e&&aK){aV=aT[ap]||(aT[ap]={});aJ=aV[i]||[];aR=aJ[0]===az&&aJ[1];aU=aJ[0]===az&&aJ[2];aQ=aR&&aT.childNodes[aR];while((aQ=++aR&&aQ&&aQ[aO]||(aU=aR=0)||aM.pop())){if(aQ.nodeType===1&&++aU&&aQ===aP){aV[i]=[az,aR,aU];break}}}else{if(aK&&(aJ=(aP[ap]||(aP[ap]={}))[i])&&aJ[0]===az){aU=aJ[1]}else{while((aQ=++aR&&aQ&&aQ[aO]||(aU=aR=0)||aM.pop())){if((aH?aQ.nodeName.toLowerCase()===aL:aQ.nodeType===1)&&++aU){if(aK){(aQ[ap]||(aQ[ap]={}))[i]=[az,aU]}if(aQ===aP){break}}}}}aU-=aD;return aU===aG||(aU%aG===0&&aU/aG>=0)}}},PSEUDO:function(aE,aD){var e,i=t.pseudos[aE]||t.setFilters[aE.toLowerCase()]||B.error("unsupported pseudo: "+aE);if(i[ap]){return i(aD)}if(i.length>1){e=[aE,aE,"",aD];return t.setFilters.hasOwnProperty(aE.toLowerCase())?p(function(aH,aJ){var aG,aF=i(aH,aD),aI=aF.length;while(aI--){aG=j.call(aH,aF[aI]);aH[aG]=!(aJ[aG]=aF[aI])}}):function(aF){return i(aF,0,e)}}return i}},pseudos:{not:p(function(e){var i=[],aD=[],aE=ab(e.replace(x,"$1"));return aE[ap]?p(function(aG,aL,aJ,aH){var aK,aF=aE(aG,null,aH,[]),aI=aG.length;while(aI--){if((aK=aF[aI])){aG[aI]=!(aL[aI]=aK)}}}):function(aH,aG,aF){i[0]=aH;aE(i,null,aF,aD);return !aD.pop()}}),has:p(function(e){return function(i){return B(e,i).length>0}}),contains:p(function(e){return function(i){return(i.textContent||i.innerText||M(i)).indexOf(e)>-1}}),lang:p(function(e){if(!Z.test(e||"")){B.error("unsupported lang: "+e)}e=e.replace(y,ak).toLowerCase();return function(aD){var i;do{if((i=an?aD.lang:aD.getAttribute("xml:lang")||aD.getAttribute("lang"))){i=i.toLowerCase();return i===e||i.indexOf(e+"-")===0}}while((aD=aD.parentNode)&&aD.nodeType===1);return false}}),target:function(e){var i=av.location&&av.location.hash;return i&&i.slice(1)===e.id},root:function(e){return e===u},focus:function(e){return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===false},disabled:function(e){return e.disabled===true},checked:function(e){var i=e.nodeName.toLowerCase();return(i==="input"&&!!e.checked)||(i==="option"&&!!e.selected)},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex}return e.selected===true},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling){if(e.nodeType<6){return false}}return true},parent:function(e){return !t.pseudos.empty(e)},header:function(e){return r.test(e.nodeName)},input:function(e){return h.test(e.nodeName)},button:function(i){var e=i.nodeName.toLowerCase();return e==="input"&&i.type==="button"||e==="button"},text:function(i){var e;return i.nodeName.toLowerCase()==="input"&&i.type==="text"&&((e=i.getAttribute("type"))==null||e.toLowerCase()==="text")},first:am(function(){return[0]}),last:am(function(e,i){return[i-1]}),eq:am(function(e,aD,i){return[i<0?i+aD:i]}),even:am(function(e,aE){var aD=0;for(;aD<aE;aD+=2){e.push(aD)}return e}),odd:am(function(e,aE){var aD=1;for(;aD<aE;aD+=2){e.push(aD)}return e}),lt:am(function(e,aF,aE){var aD=aE<0?aE+aF:aE;for(;--aD>=0;){e.push(aD)}return e}),gt:am(function(e,aF,aE){var aD=aE<0?aE+aF:aE;for(;++aD<aF;){e.push(aD)}return e})}};t.pseudos.nth=t.pseudos.eq;for(D in {radio:true,checkbox:true,file:true,password:true,image:true}){t.pseudos[D]=C(D)}for(D in {submit:true,reset:true}){t.pseudos[D]=g(D)}function aa(){}aa.prototype=t.filters=t.pseudos;t.setFilters=new aa();n=B.tokenize=function(aF,aK){var i,aG,aI,aJ,aH,aD,e,aE=ao[aF+" "];if(aE){return aK?0:aE.slice(0)}aH=aF;aD=[];e=t.preFilter;while(aH){if(!i||(aG=A.exec(aH))){if(aG){aH=aH.slice(aG[0].length)||aH}aD.push((aI=[]))}i=false;if((aG=G.exec(aH))){i=aG.shift();aI.push({value:i,type:aG[0].replace(x," ")});aH=aH.slice(i.length)}for(aJ in t.filter){if((aG=ah[aJ].exec(aH))&&(!e[aJ]||(aG=e[aJ](aG)))){i=aG.shift();aI.push({value:i,type:aJ,matches:aG});aH=aH.slice(i.length)}}if(!i){break}}return aK?aH.length:aH?B.error(aF):ao(aF,aD).slice(0)};function o(aF){var aE=0,aD=aF.length,e="";for(;aE<aD;aE++){e+=aF[aE].value}return e}function w(aF,aD,aE){var e=aD.dir,aG=aE&&e==="parentNode",i=aj++;return aD.first?function(aJ,aI,aH){while((aJ=aJ[e])){if(aJ.nodeType===1||aG){return aF(aJ,aI,aH)}}}:function(aL,aJ,aI){var aM,aK,aH=[az,i];if(aI){while((aL=aL[e])){if(aL.nodeType===1||aG){if(aF(aL,aJ,aI)){return true}}}}else{while((aL=aL[e])){if(aL.nodeType===1||aG){aK=aL[ap]||(aL[ap]={});if((aM=aK[e])&&aM[0]===az&&aM[1]===i){return(aH[2]=aM[2])}else{aK[e]=aH;if((aH[2]=aF(aL,aJ,aI))){return true}}}}}}}function aB(e){return e.length>1?function(aG,aF,aD){var aE=e.length;while(aE--){if(!e[aE](aG,aF,aD)){return false}}return true}:e[0]}function E(aD,aG,aF){var aE=0,e=aG.length;for(;aE<e;aE++){B(aD,aG[aE],aF)}return aF}function af(e,aD,aE,aF,aI){var aG,aL=[],aH=0,aJ=e.length,aK=aD!=null;for(;aH<aJ;aH++){if((aG=e[aH])){if(!aE||aE(aG,aF,aI)){aL.push(aG);if(aK){aD.push(aH)}}}}return aL}function m(aD,i,aF,aE,aG,e){if(aE&&!aE[ap]){aE=m(aE)}if(aG&&!aG[ap]){aG=m(aG,e)}return p(function(aR,aO,aJ,aQ){var aT,aP,aL,aK=[],aS=[],aI=aO.length,aH=aR||E(i||"*",aJ.nodeType?[aJ]:aJ,[]),aM=aD&&(aR||!i)?af(aH,aK,aD,aJ,aQ):aH,aN=aF?aG||(aR?aD:aI||aE)?[]:aO:aM;if(aF){aF(aM,aN,aJ,aQ)}if(aE){aT=af(aN,aS);aE(aT,[],aJ,aQ);aP=aT.length;while(aP--){if((aL=aT[aP])){aN[aS[aP]]=!(aM[aS[aP]]=aL)}}}if(aR){if(aG||aD){if(aG){aT=[];aP=aN.length;while(aP--){if((aL=aN[aP])){aT.push((aM[aP]=aL))}}aG(null,(aN=[]),aT,aQ)}aP=aN.length;while(aP--){if((aL=aN[aP])&&(aT=aG?j.call(aR,aL):aK[aP])>-1){aR[aT]=!(aO[aT]=aL)}}}}else{aN=af(aN===aO?aN.splice(aI,aN.length):aN);if(aG){aG(null,aO,aN,aQ)}else{b.apply(aO,aN)}}})}function aq(aI){var aD,aG,aE,aH=aI.length,aL=t.relative[aI[0].type],aM=aL||t.relative[" "],aF=aL?1:0,aJ=w(function(i){return i===aD},aM,true),aK=w(function(i){return j.call(aD,i)>-1},aM,true),e=[function(aO,aN,i){return(!aL&&(i||aN!==aC))||((aD=aN).nodeType?aJ(aO,aN,i):aK(aO,aN,i))}];for(;aF<aH;aF++){if((aG=t.relative[aI[aF].type])){e=[w(aB(e),aG)]}else{aG=t.filter[aI[aF].type].apply(null,aI[aF].matches);if(aG[ap]){aE=++aF;for(;aE<aH;aE++){if(t.relative[aI[aE].type]){break}}return m(aF>1&&aB(e),aF>1&&o(aI.slice(0,aF-1).concat({value:aI[aF-2].type===" "?"*":""})).replace(x,"$1"),aG,aF<aE&&aq(aI.slice(aF,aE)),aE<aH&&aq((aI=aI.slice(aE))),aE<aH&&o(aI))}e.push(aG)}}return aB(e)}function ad(aE,aD){var e=aD.length>0,aF=aE.length>0,i=function(aP,aJ,aO,aN,aS){var aK,aL,aQ,aU=0,aM="0",aG=aP&&[],aV=[],aT=aC,aI=aP||aF&&t.find.TAG("*",aS),aH=(az+=aT==null?1:Math.random()||0.1),aR=aI.length;if(aS){aC=aJ!==H&&aJ}for(;aM!==aR&&(aK=aI[aM])!=null;aM++){if(aF&&aK){aL=0;while((aQ=aE[aL++])){if(aQ(aK,aJ,aO)){aN.push(aK);break}}if(aS){az=aH}}if(e){if((aK=!aQ&&aK)){aU--}if(aP){aG.push(aK)}}}aU+=aM;if(e&&aM!==aU){aL=0;while((aQ=aD[aL++])){aQ(aG,aV,aJ,aO)}if(aP){if(aU>0){while(aM--){if(!(aG[aM]||aV[aM])){aV[aM]=at.call(aN)}}}aV=af(aV)}b.apply(aN,aV);if(aS&&!aP&&aV.length>0&&(aU+aD.length)>1){B.uniqueSort(aN)}}if(aS){az=aH;aC=aT}return aG};return e?p(i):i}ab=B.compile=function(e,aE){var aF,aD=[],aH=[],aG=L[e+" "];if(!aG){if(!aE){aE=n(e)}aF=aE.length;while(aF--){aG=aq(aE[aF]);if(aG[ap]){aD.push(aG)}else{aH.push(aG)}}aG=L(e,ad(aH,aD));aG.selector=e}return aG};ax=B.select=function(aE,e,aF,aI){var aG,aL,aD,aM,aJ,aK=typeof aE==="function"&&aE,aH=!aI&&n((aE=aK.selector||aE));aF=aF||[];if(aH.length===1){aL=aH[0]=aH[0].slice(0);if(aL.length>2&&(aD=aL[0]).type==="ID"&&ay.getById&&e.nodeType===9&&an&&t.relative[aL[1].type]){e=(t.find.ID(aD.matches[0].replace(y,ak),e)||[])[0];if(!e){return aF}else{if(aK){e=e.parentNode}}aE=aE.slice(aL.shift().value.length)}aG=ah.needsContext.test(aE)?0:aL.length;while(aG--){aD=aL[aG];if(t.relative[(aM=aD.type)]){break}if((aJ=t.find[aM])){if((aI=aJ(aD.matches[0].replace(y,ak),ag.test(aL[0].type)&&Y(e.parentNode)||e))){aL.splice(aG,1);aE=aI.length&&o(aL);if(!aE){b.apply(aF,aI);return aF}break}}}}(aK||ab(aE,aH))(aI,e,!an,aF,ag.test(aE)&&Y(e.parentNode)||e);return aF};ay.sortStable=ap.split("").sort(J).join("")===ap;ay.detectDuplicates=!!ac;ae();ay.sortDetached=l(function(e){return e.compareDocumentPosition(H.createElement("div"))&1});if(!l(function(e){e.innerHTML="<a href='#'></a>";return e.firstChild.getAttribute("href")==="#"})){aA("type|href|height|width",function(i,e,aD){if(!aD){return i.getAttribute(e,e.toLowerCase()==="type"?1:2)}})}if(!ay.attributes||!l(function(e){e.innerHTML="<input/>";e.firstChild.setAttribute("value","");return e.firstChild.getAttribute("value")===""})){aA("value",function(i,e,aD){if(!aD&&i.nodeName.toLowerCase()==="input"){return i.defaultValue}})}if(!l(function(e){return e.getAttribute("disabled")==null})){aA(c,function(i,e,aE){var aD;if(!aE){return i[e]===true?e.toLowerCase():(aD=i.getAttributeNode(e))&&aD.specified?aD.value:null}})}if(typeof define==="function"&&define.amd){define(function(){return B})}else{if(typeof module!=="undefined"&&module.exports){module.exports=B}else{av.Sizzle=B}}})(window);
