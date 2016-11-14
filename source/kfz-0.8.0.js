
/**
 * 【KFZ通用组件库】 Ver:0.8.0
 * @copyright kongfz.com
 * @author lizixu <zixulee@163.com>
 * @date 2014.5.25
 * 对比v0.7.0的更新：
 * 增加：ajax.Jsonp, util.remove, util.isMobile, util.isTel, View, View.extend, events, Router, tmpl/template, ui.textCount, ui.formCheck, ui.inputClear
 * 移除：ajax.fetchList, ajax.create, ajax.save, ajax.destroy
 */


var root = this;

if(typeof exports !== 'undefined'){
	KFZ = exports;
}else{
	KFZ = root.KFZ || (root.KFZ = {});
}


// 添加子对象
// @author lizixu <zixulee@163.com>
// @param string|array 多个字符串或由多个字符串组成的数组
(KFZ.add = function(){
	var len = arguments.length;
	if(!len) return;
	var objects;
	if(len === 1){
		objects = arguments[0];
		if(typeof objects === 'string') objects = [objects];
	}else{
		objects = Array.prototype.slice.apply(arguments);
	}
	$.each(objects, function(){
		var object = KFZ[this] || (KFZ[this] = {});
		object.extend = function(obj){
			$.extend.call(this, this, obj);
		};
	});
	var callback = arguments[len-1];
	typeof callback === 'function' && callback.apply(null, arguments);
})(['url', 'ajax', 'util', 'ui', 'lang', 'common', 'page']);



// 获取并组装URL参数对象
// @author lizixu <zixulee@163.com>
// 获取URL子属性：host/pathname/pagename/hash/query
(KFZ.url.refresh = function(callback) {
	// protocol
	KFZ.url.protocol = window.location.protocol;
	// host
	var host = KFZ.url.host = window.location.protocol + '//' + window.location.host + '/';
	// rootType
	KFZ.url.rootType = /.+\.local\//i.test(host) ? 'local' : /.+\.kfz\.(com|cn)/.test(host) ? 'kfz' : /.+\/\/(neibu.*|shopv2.*|bookv2.*|tanv2.*)/i.test(host) ? 'neibu' : 'online';
	// pathname
	(KFZ.url.getPathname = function(){
		return (KFZ.url.pathname = window.location.pathname);
	})();
	// pagename
	(KFZ.url.getPagename = function(href){
		var pagename = '',
			newHref = (href || KFZ.url.getPathname() || '').replace(/^((http|https|ftp):\/\/\w+\.\w+(\.\w+)*)*\//, '').replace(/\/$/, '');
		if(newHref){
			pagename = newHref.substr(newHref.lastIndexOf('/') + 1);
			if(!pagename){
				pagename = newHref.replace(/\/$/,'');
				if(/\//.test(pagename)){
					pagename = pagename.substr(pagename.lastIndexOf('/') + 1);
				}else{
					pagename = '';
				}
			}
		}
		if(typeof href === 'undefined') KFZ.url.pagename = pagename;
		return pagename;
	})();
	// hash
	(KFZ.url.getHash = function(){
		return (KFZ.url.hash = window.location.hash.substr(1).replace(/\?.*/g, ''));
	})();
	// query
	(KFZ.url.getQuery = function(){
		var i, paramsArr = window.location.search.substr(1).split('&'), params = {}, aParam;
		for (i = 0; i<paramsArr.length; i++){
			aParamArr = paramsArr[i].split('=');
			if (aParamArr[0].length) {
				params[aParamArr[0]] = decodeURI(aParamArr[1]);
			}
		}
		return (KFZ.url.query = params);
	})();
	callback && callback.call(this, KFZ.url);
})();





// AJAX-request
// @author lizixu <zixulee@163.com>
// @param options object 参数对象
// @param options.url string 请求路径
// @param options.data object 传入请求的参数对象
// @param options.async boolean 异步或同步，缺省为true（异步）
// @param options.noStatusCheck boolean 是否识别返回状态
// @param options.success function 正常返回成功处理器
// @param options.fail function 正常返回失败处理器
// @param options.error function 未正常返回处理器
// @param options.sucTip string 返回成功提示，未填则不提示
// @param options.failTip boolean/string 返回失败提示，false时不提示，为true或空时只提示后端返回的失败提示，赋值时则作为备选提示
// @param options.errTip string 未返回提示，未填则不提示
KFZ.ajax.request = function(method, options){
	var url = options.url,
		contentType = options.contentType || 'application/x-www-form-urlencoded', // 传递JSON时为：'application/json'
		data = contentType == 'application/json' ? JSON.stringify(options.data) : options.data,
		async = options.async === false ? false : true,
		cache = options.cache || false,
		timeout = options.timeout || 30000,
		dataType = options.dataType || 'text',
		noStatusCheck = options.noStatusCheck,
		has = options.has,
		hasnot = options.hasnot,
		sucTip = options.sucTip,
		failTip = options.failTip,
		errTip = options. errTip,
		success = options.success,
		fail = options.fail,
		error = options.error;
	return $.ajax({
		url: url,
		data: data,
		async: async,
		type: method,
		timeout: timeout,
		cache: cache,
		traditional: true,
		contentType: contentType,
		dataType: dataType,
		success: function(res, textStatus, jqXHR){
			try{
				res = JSON.parse(res);
			}catch(e){}
			var data = noStatusCheck ? res : res.data;
			if(res.status || noStatusCheck){
				sucTip && KFZ.ui.alertWin({result: 1, text: sucTip});
				if($.isArray(data)){
					if(data.length){
						has && has.call(this, data, res);
					}else{
						hasnot && hasnot.call(this, data, res);
					}
				}
				success && success.call(this, data, res);
			}else{
				// 未登录
				if(res.errType == '1'){
					KFZ.common.turnLogin && KFZ.common.turnLogin();
					return;
				}
				if(failTip !== false){
					failTip = failTip === true ? res.message : (res.message || failTip);
					failTip && KFZ.ui.alertWin({result: 0, text: failTip});
				}
				fail && fail.call(this, res.message, data, res);
			}
		},
		error: function(jqXHR, textStatus, errThrown) {
			errTip !== false && (errTip || (errTip = KFZ.lang.kfz.dataRequestFail)) && KFZ.ui.alertWin({result: 0, text: errTip});
			error && error.call(this, errThrown);
			//记录错误信息
			// KFZ.util.parse || (KFZ.util.parse = function() {
				// if(arguments.length === 1) {
					// var obj = {},
					// prefix = '',
					// attrs = arguments[0];
				// }else if (arguments.length === 2) {
					// var obj = arguments[0],
					// prefix = '',
					// attrs = arguments[1];
				// }else if (arguments.length === 3) {
					// var obj = arguments[0],
					// prefix = arguments[1],
					// attrs = arguments[2];
				// }
				// $.each(attrs, function(key, value) {
					// if($.isArray(value) || $.isPlainObject(value)){
						// KFZ.util.parse(obj, (prefix ? prefix + '[' + key + ']': key), value);
					// }else{
						// obj[(prefix ? prefix + '[' + key + ']': key)] = value;
					// }
				// });
				// return obj;
			// });
			// setTimeout(function() {
				// try {
					// $.ajax({
						// url: KFZ.url.host + 'seller/item/jsLog/type/' + method,
						// type: 'post',
						// data: KFZ.util.parse({url: url, textStatus: textStatus || '', errorThrown: errThrown || ''})
					// });
				// } catch(e) {}
			// });
		}
	});
};

// AJAX-GET/POST/PUT/DELETE/JSONP方法
$.each(['Get', 'Post', 'Put', 'Delete', 'Jsonp'], function(i, method){
	KFZ.ajax[method] = function(options) {
		return KFZ.ajax.request(method.toUpperCase(), options);
	};
});




// 拼装URL参数
// @author lizixu <zixulee@163.com>
// @param params object 参数对象
KFZ.util.assembleUrlParams = function(params){
	if(!params) return '';
	var paramsArr = [];
	for(var key in params){
		var value = params[key];
		if (value === null || value === undefined) {
			delete params[key];
			continue;
		}
		paramsArr.push(key + '=' + params[key]); 
	}
	return paramsArr.join('&');
};

// 验证登录
// @author lizixu <zixulee@163.com>
// @param options object 包含已登录及未登录回调的对象
// @param options.hasLogin function 已登录处理器
// @param options.noLogin function 未登录处理器（当同时传入了自动处理 autoDealNoLogin 为true时，则优先自动处理）
// @param options.autoDealNoLogin boolean 是否自动处理未登录
// @returns boolean
KFZ.util.loginCheck = function(options){
	options || (options ={});
	var isLogin,
		user = KFZ.user,
		hasLogin = options.hasLogin,
		noLogin = options.noLogin,
		autoDealNoLogin = options.autoDealNoLogin;
	// 已登录
	if(isLogin = (user && user.isLogin) ? true : false){
		hasLogin && hasLogin.call(this, user);
	}
	// 未登录
	else{
		// 未登录自动处理
		if(autoDealNoLogin === true){
			KFZ.common.turnLogin && KFZ.common.turnLogin();
		}
		// 未登录处理器
		else if(noLogin){
			noLogin.call(this);
		}
	}
	return isLogin;
};

// 加载视图
// @author lizixu <zixulee@163.com>
KFZ.util.loadView = function(attribute, include, callback){
	if($(attribute).attr(attribute) || include){
		$(attribute).load(($(attribute).attr(attribute) || include), function(){
			callback && callback.apply(this, arguments);
		});
	}else{
		callback && callback.apply(this, arguments);
	}
};

// 多对象绑定相同事件
// @author lizixu <zixulee@163.com>
// @param objArr 需要绑定事件的对象的数组
// @param evt 事件
// @param func 事件函数
KFZ.util.multiObjRun = function(obj, evt, func){
	if($.isArray(obj)){
		for(var i = 0, len = obj.length; i < len; i ++ ){
			$(document).undelegate(obj[i], evt).delegate(obj[i], evt, func);
		}
	}else if(typeof obj ==  'string'){
		$(document).undelegate(obj, evt).delegate(obj, evt, func);
	}
};

// 验证整数
// @author lizixu <zixulee@163.com>
KFZ.util.isInt = function(n){
	return /^((\d)|([1-9]\d*))$/.test(n);
};

// 验证自然数
// @author lizixu <zixulee@163.com>
KFZ.util.isNatural = function(n){
	return /^[1-9]\d*$/.test(n);
};

// 验证手机
KFZ.util.isMobile = function(n){
	return /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(n);
};

// 验证电话（含手机）
KFZ.util.isTel = function(n){
	return /(\d{10,11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(n);
};

// 验证价格
// @author lizixu <zixulee@163.com>
// 规则：整数位不超过8位，小数位不超过2位
KFZ.util.isPrice = function(n){
	return (/^(0|[1-9]\d{0,7})(\.\d{1,2})?$/).test(n.toString());
};

// 格式化价格
// @author lizixu <zixulee@163.com>
KFZ.util.setPrice = function(n){
	if(isNaN(n)){
		return n;
	}else{ 
		var s = (Math.round((+n) * 100) / 100).toString(),
			i = s.indexOf('.');
		if(i < 0){
			i = s.length;
			s += '.';
		}
		while(s.length < i + 3){
			s += '0';
		}
		return s;
	}
};

// 回车触发
// @author lizixu <zixulee@163.com>
KFZ.util.enterDown = function(event, callback){
	if(event && event.which && event.which == 13){
		callback && callback(event);
		return true;
	}
	return false;
};

// 验证IE
// @author lizixu <zixulee@163.com>
KFZ.util.isIE = function(){
	var self = arguments.callee;
	if(typeof self.isie !== 'undefined') return self.isie;
	var navigator = window.navigator,
		browser = navigator.appName,
		b_version = navigator.appVersion,
		version, trim_Version, ver;
	// 6-10
	if(window.ActiveXObject){
		version = b_version.split(';');
		trim_Version = version[1].replace(/[ ]/g,'');
		if(browser === 'Microsoft Internet Explorer'){
			ver = +trim_Version.replace(/MSIE(\d+)(\.0)*$/i, '$1');
			return (self.isie = !isNaN(ver) ? ver : 0);
		}
	}
	// 11
	else if(browser === 'Netscape' && /Trident.+rv:*11\.0/.test(b_version)){
		version = b_version.replace(/^\w+\(|\)(\s*\w+)+$/gi, '').split(';');
		trim_Version = version[version.length-1].split(':')[1];
		ver = +trim_Version.replace(/(\d+)(\.0)*$/i, '$1');
		return (self.isie = !isNaN(ver) ? ver : 0);
	}
	return (self.isie = 0);
};

// 数组内对象序号
// @author lizixu <zixulee@163.com>
KFZ.util.index = function(arr, one){
	var type = typeof one;
	if(type === 'string' || type === 'number') return $.inArray(one, arr);
	var index = -1;
	$.isPlainObject(one) && $.each(arr, function(i, o){
		var isOne;
		$.each(one, function(key, val){
			if(o && o[key] === val){
				isOne = true;
			}else{
				return (isOne = false);
			}
		});
		if(isOne){
			index = i;
			return false;
		}
	});
	return index;
};

// 获取数组内对象
// @author lizixu <zixulee@163.com>
// @param multi {boolean} 是否匹配数组中的所有项
// @param deep {boolean} 是否深度匹配
KFZ.util.get = function(arr, obj, multi, deep){
	var result = multi ? [] : undefined;
	(function(arr){
		var self = arguments.callee;
		$.each(arr, function(i, o){
			var isOne;
			$.each(obj, function(key, val){
				if(o && o[key] === val){
					isOne = true;
				}else{
					return (isOne = false);
				}
			});
			if(isOne){
				if(multi){
					result.push(o);
				}else{
					return !(result = o);
				}
			}
			if(deep && (multi || !isOne)){
				$.each(o, function(k, v){
					($.isArray(v) || $.isPlainObject(v)) && self(v);
				});
			}
		});
	})(arr);
	return result;
};

// 移除数组内对象
// @author lizixu <zixulee@163.com>
// @param multi {boolean} 是否匹配数组中的所有项
KFZ.util.remove = function(arr, obj, multi){
	if(typeof obj === 'string'){
		for(var i = arr.length - 1; i > -1; i--){
			if(arr[i] === obj){
				arr.splice(i, 1);
				if(!multi){
					break;
				}
			}
		}
	}else{
		if($.isArray(obj)){
			var self = arguments.callee;
			$.each(obj, function(i, subObj){
				self(arr, subObj, multi);
			});
		}else{
			for(var i = arr.length - 1; i > -1; i--){
				var o = arr[i], isOne;
				$.each(obj, function(key, val){
					if(o && o[key] === val){
						isOne = true;
					}else{
						return (isOne = false);
					}
				});
				if(isOne){
					arr.splice(i, 1);
					if(!multi) break;
				}
			}
		}
	}
	return arr;
};

// 对象深度比对
// @author lizixu <zixulee@163.com>
// @param first {object} 比对对象之一
// @param second {object} 比对对象之二
KFZ.util.compare = function(first, second){
	var type = typeof first;
	// 类型不同
	if(arguments.length !== 2 || type !== typeof second) return false;
	// 类型相同，值相同
	if(first === second) return true;
	// 类型相同，值不同，也不是object类型
	if(type !== 'object') return false;
	// 类型相同，值不同，但是object类型
	var isSame = true,
		self = arguments.callee;
	// 比对first所有属性：包含值为undefined/null的属性
	$.each(first, function(fk, fv){
		var hasSameAttr;
		$.each(second, function(sk, sv){
			// 找到相同属性
			if(sk === fk){
				hasSameAttr = true;
				// 属性值不同
				if(fv !== sv){
					var subType = typeof fv;
					// 值的类型相同，且都为object
					if(subType === typeof sv && subType === 'object'){
						isSame = self(sv, fv);
					}
					// 值的类型不同或不是object
					else{
						isSame = false;
					}
				}
				return false;
			}
		});
		// 找到相同属性
		if(hasSameAttr){
			// 属性值不同->退出：两者不同
			if(!isSame) return false;
			// 属性值相同->继续first的下一个属性的比对
		}
		// 未找到相同属性->退出：两者不同
		else{
			return (isSame = false);
		}
	});
	// 检测second除first所有属性外的属性->若有，则退出：两者不同
	isSame && $.each(second, function(sk, sv){
		var hasSameAttr;
		$.each(first, function(fk, fv){
			if(fk === sk){
				hasSameAttr = true;
				return false;
			}
		});
		// 未找到相同属性->退出：两者不同
		if(!hasSameAttr) return (isSame = false);
		// 找到相同属性->继续second的下一个属性的比对
	});
	// 返回比对结果
	return isSame;
};

// 处理history
// @author lizixu <zixulee@163.com>
KFZ.util.dealHistory = function(url, callback){
	if(!(KFZ.util.pushState = window.history.pushState)) return true;
	// 记录history
	KFZ.util.pushState.call(window.history, null, null, url);
	// 回调
	callback && callback.apply(null, arguments);
	return false;
};

// 字符转unicode
// @author lizixu <zixulee@163.com>
KFZ.util.charToUnicode = function(str) {
	if (!str) return '';
    var unicode = '', i = 0, len = (str = '' + str).length;
	for (; i < len; i ++) {
		unicode += 'k' + str.charCodeAt(i).toString(16).toLowerCase();
	}
	return unicode;
};

// unicode转字符
// @author lizixu <zixulee@163.com>
KFZ.util.unicodeToChar = function(unicode) {
	if (typeof unicode === 'undefined') return '';
	var str = '', arr = unicode.split('k'), i = 0, len = arr.length;
	for (; i < len; i ++) {
		var oneUnicode = arr[i], oneStr;
		if (!oneUnicode) continue;
		oneUnicode = parseInt(oneUnicode, 16).toString(10);
		oneStr = String.fromCharCode(oneUnicode);
		str += oneStr;
	}
	return str;
};

// Cookie操作方法
KFZ.util.cookie = function(name, value, options){
    if (typeof value != 'undefined') {
        options || (options = {});
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};





// 加载视图等待
// @author lizixu <zixulee@163.com>
// @param box string|jq节点对象 容器
// @param type string 方式：'append' 或 'html'，缺省为'html'
// @param klass string 样式名，缺省为'loading'
// @param html string html脚本或字符，非必填
// @param text string html脚本或字符，非必填
KFZ.ui.loading = function(box, type, klass, html, text){
	var $box = typeof box == 'object' ? box : $(box);
	$box[type || 'html'](html || '<div class="' + (klass ? klass : 'loading') + '">' + (text || '') + '</div>');
};

// Tab切换 
// @author lizixu <zixulee@163.com>
// @param titles 切换Tab按钮项选择器 
// @param contents 切换内容项选择器 
// @param klass 当前的切换按钮样式 
// @param evt 切换事件("click"或"mouseover"，缺省为"click") 
// @param callback function(作为after使用)或带before/after方法的对象  
KFZ.ui.switchTab = function(titles, contents, klass, evt, callback){
	klass || (klass = 'curr');
	evt || (evt = 'click');
	var before, after;
	if(callback){
		if($.isFunction(callback)){
			before = undefined;
			after = callback;
		}else{
			before = callback.before;
			after = callback.after;
		}
	}
	$('body').off(evt, titles).on(evt, titles, function(){
		var index = $(titles).index($(this));
		if (before && before.call(this, index) === false) return;
		$(titles).eq(index).addClass(klass).siblings().removeClass(klass);
		contents && $(contents).eq(index).show().siblings(contents).hide();
		after && after.call(this, index);
	});
};

// 输入框提示信息样式 
// @author lizixu <zixulee@163.com>
// @param input 输入框 
// @param tip 提示信息 
// @param tipClass 输入框焦点状态时提示信息的样式 
KFZ.ui.inputPrompt = function(input, tip, tipClass) {
	var $input = $(input),
		$tip = $(tip).hide();
	if(!$input.length) return;
	!$input.val() && $tip.css('display', '');
	var fn = $.fn,
		focus = fn.focusin ? 'focusin' : 'focus',
		blur = fn.focusout ? 'focusout' : 'blur';
	var styleHandler = function(event){
		if(!$input.val()){
			$tip.css('display', '');
			if(!tipClass) return;
			// 根据事件类型设置提示样式
			var type = event.type;
			if(type === 'focus' || type === 'focusin' || type === 'keyup'){
				$tip.addClass(tipClass);
			}else if(type === 'blur' || type === 'focusout' || type === 'change'){
				$tip.removeClass(tipClass);
			}
		}else{
			$tip.hide();
			$tip.removeClass(tipClass);
		}
	};
	$('body').on('click', tip, function(){
		$(this).blur().siblings(input).focus();
	}).on(focus + ' ' + blur + ' keyup change', input, styleHandler);
};

// 文档点击处理
// @author lizixu <zixulee@163.com>
// @param nodesArr 排出（不执行处理函数）的class选择器（为且只为class的完整字符串，不带点）数组
// @param callback 处理函数
KFZ.ui.documentClick = (function(){
	var bindArr = [];
	// 绑定事件
	$(document).click(function(event){
		var handlers = [];
		// 调用次数-每次调用传递的参数组合成一个对象
		for(var i = 0, len = bindArr.length; i < len; i ++){
			var tar = event.target,
				bindOne = bindArr[i],
				oneNodes = bindOne.nodes,
				oneHandler = bindOne.handler,
				isExist;
			allNodes: while(tar){
				for(var j = 0, count = oneNodes.length; j < count; j++){
					var klass = $(tar).attr('class');
					if(klass){
						var klassArr = klass.split(' '),
							oneNodeArr = oneNodes[j].split(' '),
							isOneExist = true;
						$.each(oneNodeArr, function(k, oneNodeKlass){
							if($.inArray(oneNodeKlass, klassArr) < 0){
								return (isOneExist = false);
							}
						});
						if(isOneExist){
							isExist = true;
							break allNodes;
						}
					}
				}
				tar = tar.parentNode;
				if(tar && tar.nodeType == 9) break;
			}
			if(!isExist) handlers.push(oneHandler);
		}
		$.each(handlers, function(index, handler){
			typeof handler === 'function' && handler.apply(null, arguments);
		});
	});
	// 返回
	return function(nodesArr, callback){
		if(!nodesArr || !nodesArr.length) return;
		var isBind;
		// 已有绑定选择器
		if(bindArr.length){
			// 已有的选择器
			$.each(bindArr, function(j, bindOne){
				// 是否相同的绑定对象
				var oneBind = true;
				$.each(bindOne.nodes, function(m, bindNode){
					if($.inArray(bindNode, nodesArr) < 0) return (oneBind = false);
				});
				if(oneBind){
					$.each(nodesArr, function(n, paramNode){
						if($.inArray(paramNode, bindOne.nodes) < 0) return (oneBind = false);
					});
				}
				if(oneBind){
					isBind = true;
					return false;
				}
			});
		}
		// 没有绑定的选择器
		else{
			isBind = false;
		}
		// 更新设定的选择器集合
		!isBind && bindArr.push({nodes: nodesArr, handler: callback});
	};
})();

// 文本框文本统计限制
// @author lizixu <zixulee@163.com>
// @param el {string} 文本框选择器
// @param num {int} 限制字数
// @param tip {string} 提示数字选择器，可选
// @param callback {function} 回调，可选
// @return {int} 剩余字数
KFZ.ui.textCount = function(el, num, tip, callback){
	var $el = $(el);
	if(!$el.length) return -1;
	$.isFunction(tip) && (callback = tip) && (tip = '');
	var text = $el.attr('maxlength', num).val(),
		count = (text || '').length;
	count > num && ((count = num) ? 1 : 1) && $el.val(text.substr(0, num));
	if(tip && $(tip).html(num - count).length){
		var self = arguments.callee;
		self.hasTip || (self.hasTip = {});
		!self.hasTip[el] && (self.hasTip[el] = 1) && $('body').on('keyup', el, function(event){
			self(el, num, tip);
			callback && callback(event);
		});
	}else{
		callback && callback();
		return num - count;
	}
};

// 下拉框
// @author lizixu <zixulee@163.com>
// @param box (string) 为下拉框容器可填id，默认为".kfz_select_box"
// @param width (int) 宽度
// @param boxHeight (int) 为下拉框最大高度，int类型数值，默认最大高度为230
// @param rowHeight (int) 行高
// @param getItems (function) 获取下拉框数据内容的函数；
// @param items (array) 初始化选项[{attrid: '', name: ''}]
// @param autoGetItems (boolean) 初始化时是否自动加载选项
// @param reloadItems (boolean) 每次点击重载选项
// @param afterGetItems (function) 获取选项内容后的处理函数
// @param posParents (array) 下拉框有层级关系的父容器的数组
// @param hasSelectTitArrow {boolean} 是否需要向上向下箭头，缺省为true
// @param itemClick (function) 点击下拉框中某项后处理前执行的函数
// @param change (function) 下拉框赋值改变处理器
// @param afterItemClick (function) 点击下拉框中某项后处理后执行的函数
// @param currentItemClass (string) 当前选中项的样式名称
// @param defaultItem object 默认选项{attrid:11, name:'name'}，属性非同时为空时即渲染
// @param afterInit function 初始化后的处理函数
KFZ.ui.SelectBox = function(args){
	if(!(this instanceof arguments.callee)) return new arguments.callee(args);
	this.init(args);
};
KFZ.ui.SelectBox.prototype = {
	constructor: KFZ.ui.SelectBox,
	// 初始化
	init: function(args){
		$.extend(this, args);
		this.box = this.box || '.kfz_select_box';
		var that = this,
			$box = this.$box = $(this.box);
		// 设置宽度
		this.width && $box.width(this.width);
		// 加载视图
		if(!$box.addClass('kfz_select_box').find('.selectTit').length) this.setTemplate(this.box);
		// 设置样式
		//this.setStyle();
		// 绑定事件
		this.setEvent(this.box);
		// 初始值
		this.value || (this.value = {attrid: '', name: ''});
		// 初始选项
		this.items && this.renderItems(this.items);
		// 是否需要向上向下箭头
		if(this.hasSelectTitArrow === false){
			this.cssDown = 'blankdown';
			this.cssUp = 'blankup';
		}else{
			this.cssDown = 'down';
			this.cssUp = 'up';
		}
		// 打开项
		this.reload();
		// 初始化后的回调
		this.afterInit && this.afterInit.apply(this, arguments);
	},
	// 重打开
	reload: function(){
		var that = this,
			$box = this.$box || (this.$box = $(this.box)),
			$selectTit = this.$selectTit || (this.$selectTit = $box.find('.selectTit')),
			$selectCon = this.$selectCon || (this.$selectCon = $box.find('.selectCon').width($box.width() - 2));
		// 输入框鼠形
		$selectTit.removeClass('down').addClass(this.cssDown).is(':text') && $selectTit.css({cursor: 'text'});
		// 获取下拉项
		this.autoGetItems && this.getItems && (function(){
			// 等待效果
			KFZ.ui.loading($selectCon, 'html');
			that.getItems($selectCon, function(items){
				$.isArray(items) && that.renderItems($selectCon, items);
				that.afterGetItems && that.afterGetItems($selectCon);
			});
		})();
		// 设置默认选项
		this.defaultItem && !$.isEmptyObject(this.defaultItem) && this.setCurrent(this.defaultItem);
	},
	// 渲染选项
	renderItems: function($selectCon, items, callback){
		if($.isArray($selectCon)){
			items = $selectCon;
			$selectCon = this.$selectCon || (this.$selectCon = $(this.box).find('.selectCon'));
		}
		if($selectCon.length && $.isArray(items) && items.length){
			var conHtml = '';
			$.each(items, function(index, item){
				conHtml += '<li class="selectItem" ' + (item.attrid ? 'attrid="'+ item.attrid + '"' : '') + '>';
				conHtml += '<a href="javascript:;"><span>'+ item.name +'</span></a>';
				conHtml += '</li>';
			});
			$selectCon.html(conHtml);
		}
		// 设置下拉选项及列表高度
		this.setSelectConHeigth();
		// 回调
		callback && callback.apply(this, arguments);
	},
	// 绑定事件
	setEvent: function(box){
		var that = this;
		$('body').undelegate(box + ' .selectTit', 'click').delegate(box + ' .selectTit', 'click', function(){
			var $selectTit = $(this),
				$selectCon = $selectTit.siblings('.selectCon');
			// 判断是否处于未打开状态
			if($selectTit.hasClass(that.cssDown)){
				// 如果未打开--将其打开
				// 关闭其它已打开下拉框
				var $selectTitUps = $('.kfz_select_box').find('.selectTit.up'),
					$selectTitBlankups = $('.kfz_select_box').find('.selectTit.blankup');
				if($selectTitUps.length){
					$selectTitUps.removeClass('up').addClass('down').siblings('.selectCon').stop().hide();
					// 将下拉框父容器的position层级取消
					that.removeParentsPosition(that.posParents);
				}
				if($selectTitBlankups.length){
					$selectTitBlankups.removeClass('blankup').addClass('blankdown').siblings('.selectCon').stop().hide();
					// 将下拉框父容器的position层级取消
					that.removeParentsPosition(that.posParents);
				}
				// 如果有获取下拉框内容数据的函数参数，则获取内容，直至完成后继续下拉框效果，否则直接执行下拉框效果
				if(that.reloadItems || (!$selectCon.find('.selectItem[attrid]').length && !$selectCon.find('.noItem').length && $.isFunction(that.getItems))){
					// 打开下拉框
					that.dropdown();
					// 等待效果
					KFZ.ui.loading($selectCon.height('auto'), 'html');
					// 获取下拉选项列表
					that.getItems($selectCon, function(items){
						$.isArray(items) && that.renderItems($selectCon, items);
						that.afterGetItems && that.afterGetItems($selectCon);
					});
				}
				// 直接打开下拉框
				else{
					that.dropdown(1);
				}
			}else{
				// 如果已打开--将其关闭
				$selectTit.removeClass(that.cssUp).addClass(that.cssDown);
				$selectCon.stop().hide();
				// 将下拉框父容器的position层级取消
				that.removeParentsPosition(that.posParents, $selectTit);
			}
		}).undelegate(box + ' .selectItem', 'click').delegate(box + ' .selectItem', 'click', function(){
			var $selectItem = $(this);
			if(/noItem/.test($selectItem.attr('class'))) return;
			var	$selectBox = $(this).parents('.kfz_select_box'),
				$selectCon = $selectItem.parents('.selectCon'),
				$selectTit = $selectCon.siblings('.selectTit'),
				itemVal = $(this).text();
			$selectTit.removeClass(that.cssUp).addClass(that.cssDown);
			$selectCon.stop().hide();
			// 将下拉框父容器的position层级取消
			that.removeParentsPosition(that.posParents, $selectItem);
			// 设置选中项的样式
			if(that.currentItemClass) $selectItem.addClass(that.currentItemClass).siblings().removeClass(that.currentItemClass);
			// 如果有点击选项的函数参数，则执行
			if(that.itemClick && typeof that.itemClick == 'function'){
				var itemClickResult = that.itemClick($selectItem, $selectBox);
				if(itemClickResult === false) return;
			}
			$selectTit[$selectTit.is(':text') ? 'val' : 'html'](itemVal).attr('attrid', ($selectItem.attr('attrid') || ''));
			if(!that.value || that.value.attrid !== ($selectTit.attr('attrid') || '')){
				var oldVal = that.value;
				that.value = {attrid: $selectTit.attr('attrid') || '', name: itemVal};
				that.change && that.change(that.value, oldVal);
			}
			that.afterItemClick && that.afterItemClick($selectItem, $selectBox, that.value);
		});
		// 点击文档其他位置关闭下拉
		KFZ.ui.documentClick(['selectTit', 'selectCon'], function(){
			$('.kfz_select_box .up').removeClass('up').addClass('down').siblings('.selectCon').hide();
			$('.kfz_select_box .blankup').removeClass('blankup').addClass('blankdown').siblings('.selectCon').hide();
			if($('[originalpos]').length){
				that.removeParentsPosition(that.posParents);
			}
		});
	},
	// 打开下拉框
	dropdown: function(needSetHeigth){
		var $selectTit = this.$selectTit,
			$selectCon = this.$selectCon;
		// 设置下拉框父容器的position层级
		this.addParentsPosition(this.posParents, $selectTit);
		$selectTit.removeClass(this.cssDown).addClass(this.cssUp);
		needSetHeigth && this.setSelectConHeigth();
		$selectCon.show();
	},
	// 设置下拉选项及列表高度
	setSelectConHeigth: function(){
		// 识别并定义下拉框内容高度
		var rowHeight = this.rowHeight = this.rowHeight || 21,
			boxHeight = this.boxHeight = (boxHeight = this.boxHeight) ? boxHeight > 0 ? boxHeight : (rowHeight * 11 - 1) : (rowHeight * 11 - 1),
			$selectCon = this.$selectCon,
			itemLen = $selectCon.find('.selectItem').length,
			conHeight = itemLen > 0 ? itemLen * rowHeight - 1 : 0;
		if(conHeight > boxHeight){
			conHeight = boxHeight;
			$selectCon.css('overflow-y', 'scroll');
		}else{
			$selectCon.css('overflow-y', '');
		}
		$selectCon.css('height', conHeight + 'px');
		$selectCon.find('.selectItem').eq(itemLen-1).css('height', (rowHeight-1) + 'px').find('a').css('border-bottom', 'none');
	},
	// 设置当前选项,item为对象{attrid:11, name:'name'}
	setCurrent: function(item, currentItemClass, callback){
		if(!item) return;
		if($.isFunction(currentItemClass)){
			callback = currentItemClass;
			currentItemClass = null;
		}
		this.currentItemClass = currentItemClass || this.currentItemClass;
		var that = this,
			attrid = item.attrid || '',
			itemName = item.name || '',
			$selectTit = this.$selectTit,
			$selectCon = this.$selectCon,
			$items = $selectCon.find('.selectItem');
		$selectTit.attr('attrid', attrid).html(itemName);
		this.value = {attrid: attrid, name: itemName};
		$items.length && $.each($items, function(i){
			var $item = $items.eq(i);
			if($item.attr('attrid') == attrid){
				$item.addClass(that.currentItemClass).siblings('.' + that.currentItemClass).removeClass(that.currentItemClass);
				return false;
			}
		});
		callback && callback.apply(this, arguments);
	},
	// 设置下拉框父容器的position层级
	addParentsPosition: function(posParents, $selectTit){
		if($.isArray(posParents) && posParents.length){
			var len = posParents.length;
			for(var i = 0;i<len;i ++ ){
				var $thisParent = $selectTit.parents(posParents[i]);
				$thisParent.attr('originalpos')?null:$thisParent.attr('originalpos',$thisParent.css('position'));
				$thisParent.css({'position':'relative', 'z-index':'888'});
			}
		}
	},
	// 移除下拉框父容器的position层级
	removeParentsPosition: function(posParents, $selector){
		if($.isArray(posParents) && posParents.length && $('[originalpos]').length){ //posParent为数组
			if($selector && $selector.parents){
				var len = posParents.length;
				for(var i = 0;i<len;i ++ ){
					var $thisParent = $selector.parents(posParents[i]);
					if(!$thisParent.length) continue;
					$thisParent.css({'position':($thisParent.attr('originalpos') || ''),'z-index':''});
					$thisParent.removeAttr('originalpos');
				}
			}else{
				var $originalpos = $('[originalpos]');
				for(var j = 0,count = $originalpos.length; j<count; j ++ ){
					var $thisOriginalpos = $originalpos.eq(j);
					$thisOriginalpos.css({'position':$thisOriginalpos.attr('originalpos'), 'z-index':''}).removeAttr('originalpos');
				}
			}
		}
	},
	// 获取/赋值
	val: function(items){
		if(items !== undefined){
			if(items === ''){
				this.setCurrent({attrid: '', name: '请选择'});
			}else{
				!$.isEmptyObject(items) && this.setCurrent(items);
			}
		}
		return this.value;
	},
	// 清空
	reset: function(){
		this.val('');
	},
	// 显示
	show: function(){
		this.$box.show();
		return this;
	},
	// 隐藏
	hide: function(){
		this.$box.hide();
		return this;
	},
	// 载入模板
	setTemplate: function(box){
		var html = 
			'<a class="selectTit down" href="javascript:;">' + KFZ.lang.kfz.pleasesSelect + '</a>' +
			'<ul class="selectCon" style="display:none;">' +
			'</ul>';
		(typeof box === 'object' ? box : $(box)).html(html);
	},
	// 生成样式
	setStyle: function(){
		if ($('#kfz_select_style').length) return;
		var styleHtml = 
		'<style id="kfz_select_style">' +
			'.kfz_select_box{position:relative;width:110px;background:#fff;}' +
			'.kfz_select_box .selectTit,.kfz_select_box .selectTit:hover{display:block;height:20px;padding:0 20px 0 5px;border:1px solid #ccc;line-height:20px;color:#333;font-weight:normal;cursor:default;overflow:hidden;}' +
			'.kfz_select_box .selectCon{position:absolute;left:0;top:22px;width:108px;background:#fff;border:1px solid #ddd;border-top:none;overflow:auto;overflow-x:hidden;display:none;}' +
			'.kfz_select_box .selectItem{text-align:left;}' +
		'</style>';
		$('body').append(styleHtml);
	}
};

// 文件上传
// @author lizixu <zixulee@163.com>
// @param url string 上传请求服务端路径，必选
// @param btnText string 按钮内容，缺省为'选择文件'
// @param btnClass string 按钮样式，缺省为空
// @param btnWidth int 按钮宽度，缺省为100
// @param btnHeigth int 按钮高度，缺省为25
// @param btnImage string 图片按钮，缺省为空
// @param multi boolean 可否多选，缺省为true
// @param fileType string 可上传的文件类型，多种类型用半角分号（;）分隔，缺省为'*.*'
// @param uploadLimit int 可上传的文件个数限制，缺省为不限
// @param queueSizeLimit int 单次队列限制文件个数，缺省为不限
// @param successTimeout int 等待服务器响应时间，缺省为30（单位：s）
// @param fileSizeLimit int 单个文件大小限制，缺省为不限
// @param uploadLimit int 允许上传的文件个数，缺省为不限
// @param removeTimeout int 延迟移除队列进度
// @param success function 队列文件上传完成后成功的回调函数，缺省则不处理
// @param fail function 队列文件上传完成后失败的回调函数，缺省则不处理
// @param error function 队列文件上传完成后错误的回调函数，缺省则不处理
// @param fileSuccess function 单个文件上传完成后成功的回调函数，缺省则不处理
// @param fileFail function 单个文件上传完成后失败的回调函数，缺省则不处理
// @param fileError function 单个文件上传完成后错误的回调函数，缺省则不处理
// @param complete function 队列文件上传完成后的回调函数，缺省则不处理
KFZ.ui.uploadify = function(selector, options){
	options || (options ={});
	var timestamp = +new Date(),
		success = options.success,
		fileSuccess = options.fileSuccess,
		fail = options.fail,
		fileFail = options.fileFail,
		error = options.error,
		fileError = options.fileError,
		complete = options.complete;
	$(selector).uploadify({
		uploader: options.url,
		swf: KFZ.url.host + '/js/common/uploadify/uploadify.swf',
		buttonText: options.btnText || '选择文件',
		buttonClass: options.btnClass || '',
		width: options.btnWidth || 100,
		height: options.btnHeigth || 25,
		buttonImage: options.btnImage || null,
		multi: (options.multi === false ? false : true),
		debug: false,
		fileTypeExts: options.fileType || '*.*',
		uploadLimit: options.uploadLimit,
		removeTimeout: options.removeTimeout || 0,
		queueSizeLimit: options.queueSizeLimit || 0,
		successTimeout: options.timeout || 30,
		fileSizeLimit: options.fileSizeLimit,
		formData: {
			timestamp: timestamp,
			token: 'unique_salt_' + timestamp
		},
		/*
		// 关闭选择文件窗口
		onDialogClose: function(numFilesSelected, numFilesQueued){},
		// 单个文件开始执行
		onUploadStart: function(){},
		// 单个文件执行完成（包括出错）
		onUploadComplete: function(file){},
		// 清除进度条的延时
		removeTimeout: 5,
		*/
		// 单个文件执行返回正常
		onUploadSuccess: function(file, data, response){
			var fileId = file.id,
				fileName = file.name,
				res = JSON.parse(data);
			// 成功
			if(res.status){
				// 记录成功文件信息
				KFZ.ui.uploadify[timestamp] = KFZ.ui.uploadify[timestamp] || {};
				KFZ.ui.uploadify[timestamp].sucItems = KFZ.ui.uploadify[timestamp].sucItems || [];
				KFZ.ui.uploadify[timestamp].sucItems.push({id: fileId, name: fileName, data: res.data});
				fileSuccess && fileSuccess.call(this, res.data, res, file);
			}
			// 失败
			else{
				// 记录失败文件信息
				KFZ.ui.uploadify[timestamp] = KFZ.ui.uploadify[timestamp] || {};
				KFZ.ui.uploadify[timestamp].failItems = KFZ.ui.uploadify[timestamp].failItems || [];
				KFZ.ui.uploadify[timestamp].failItems.push({id: fileId, name: fileName, errMsg: res.message});
				fileFail && fileFail.call(this, res.message, res, file);
			}
		},
		// 单个文件执行返回错误
		onUploadError: function(file, errorCode, errorMsg){
			// 记录错误文件信息
			var fileId = file.id,
				fileName = file.name;
			KFZ.ui.uploadify[timestamp] = KFZ.ui.uploadify[timestamp] || {};
			KFZ.ui.uploadify[timestamp].errItems = KFZ.ui.uploadify[timestamp].errItems || [];
			KFZ.ui.uploadify[timestamp].errItems.push({id: fileId, name: fileName, errMsg: errorMsg});
			fileError && fileError.call(this, file, errorCode, errorMsg);
		},
		// 队列文件执行完成（包括出错）
		onQueueComplete: function(queueData){
			KFZ.ui.uploadify[timestamp] = KFZ.ui.uploadify[timestamp] || {};
			KFZ.ui.uploadify[timestamp].sucItems = KFZ.ui.uploadify[timestamp].sucItems || [];
			KFZ.ui.uploadify[timestamp].failItems = KFZ.ui.uploadify[timestamp].failItems || [];
			KFZ.ui.uploadify[timestamp].errItems = KFZ.ui.uploadify[timestamp].errItems || [];
			var sucItems = KFZ.ui.uploadify[timestamp].sucItems,
				failItems = KFZ.ui.uploadify[timestamp].failItems,
				errItems = KFZ.ui.uploadify[timestamp].errItems,
				sucLen = sucItems.length,
				failLen = failItems.length,
				errLen = errItems.length;
			if(sucLen && !(errLen + failLen)){
				KFZ.ui.alertWin({result: 1, text: sucLen + '个文件上传成功！'});
				success && success.call(this, sucItems, queueData);
			}else if(failLen && !(sucLen + errLen)){
				KFZ.ui.alertWin({result: 0, text: failLen + '个文件上传失败！'});
				fail && fail.call(this, failItems, queueData);
			}else if(errLen && !(sucLen + failLen)){
				KFZ.ui.alertWin({result: 0, text: errLen + '个文件上传出错！'});
				error && error.call(this, errItems, queueData);
			}else{
				KFZ.ui.alertWin({result: 2, text: (sucLen ? sucLen + '个文件上传成功！' : '') + (failLen ? failLen + '个文件上传失败！' : '') + (errLen ? errLen + '个文件上传出错！' : '')});
			}
			complete && complete.call(this, queueData, sucItems, failItems, errItems);
			// 清空本次上传队列结果
			KFZ.ui.uploadify[timestamp].sucItems = [];
			KFZ.ui.uploadify[timestamp].failItems = [];
			KFZ.ui.uploadify[timestamp].errItems = [];
		}
	});
};

// 验证是否安装flash
// @returns {Boolean}
KFZ.ui.hasFlash = function(){
    var hasFlash = false;
    KFZ.ui.hasFlash.version = 0;
    
    try{
        if(window.ActiveXObject){
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if(swf){
                hasFlash = true;
                VSwf = swf.GetVariable("$version");
                KFZ.ui.hasFlash.version = parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        }else{
            if(navigator.plugins && navigator.plugins.length > 0){
                var swf = navigator.plugins["Shockwave Flash"];
                if(swf){
                    hasFlash = true;
                    var words = swf.description.split(" ");
                    for(var i=0; i<words.length; i++){
                        if(isNaN(parseInt(words[i]))){
                            continue;
                        }
                        KFZ.ui.hasFlash.version = parseInt(words[i]);
                    }
                }
            }
        }
    }catch(err){}
    
    return hasFlash;
};

// 格式化尺寸
// @param {Int} size
// @returns {String}
KFZ.ui.formatSize = function(size) {
    if (size === null || size === undefined || /\D/.test(size)) {
        return 'null';
    }
    // TB
    if (size > 1099511627776) {
        return Math.round(size / 1099511627776, 1) + "tb";
    }
    // GB
    if (size > 1073741824) {
        return Math.round(size / 1073741824, 1) + "gb";
    }
    // MB
    if (size > 1048576) {
        return Math.round(size / 1048576, 1) + "mb";
    }
    // KB
    if (size > 1024) {
        return Math.round(size / 1024, 1) + "kb";
    }
    return size + "b";
};

// 文件上传
// @author dongnan <dongyh@126.com>
// @param url string 上传请求服务端路径，必选
// @param fileObjName string 图片上传域 name
// @param formData Object 跟随图片上传表单内容
// @param btnText string 按钮内容，缺省为'选择文件'
// @param btnClass string 按钮样式，缺省为空
// @param btnWidth int 按钮宽度，缺省为100
// @param btnHeigth int 按钮高度，缺省为25
// @param btnImage string 图片按钮，缺省为空
// @param multi boolean 可否多选，缺省为true
// @param fileType string 可上传的文件类型，多种类型用半角分号（;）分隔，缺省为'*.*'
// @param uploadLimit int 可上传的文件个数限制，缺省为不限
// @param queueSizeLimit int 单次队列限制文件个数，缺省为不限
// @param successTimeout int 等待服务器响应时间，缺省为30（单位：s）
// @param fileSizeLimit int 单个文件大小限制，缺省为不限
// @param uploadLimit int 允许上传的文件个数，缺省为不限
// @param removeTimeout int 延迟移除队列进度
// @param fileSuccess function 单个文件上传完成后成功的回调函数，缺省则不处理
// @param fileError function 单个文件上传完成后错误的回调函数，缺省则不处理
// @param complete function 队列文件上传完成后的回调函数，缺省则不处理
KFZ.ui.upload = function(id, options){
	options || (options = {});
    (id.indexOf('#') === 0) && (id = id.substring(1));
    options.listbox && (options.listbox.indexOf('#') !== 0) && (options.listbox = '#'+options.listbox);
    options.fileSizeLimit && (options.maxFileSize = options.fileSizeLimit * 1024);
    if(KFZ.ui.hasFlash()){
        $('#'+id).uploadify({
            uploader: options.url,
            fileObjName: options.fileObjName || 'Filedata',
            formData: options.formData || {},
            swf: KFZ.url.host + '/js/common/uploadify/uploadify.swf',
            buttonText: options.btnText || '选择文件',
            buttonClass: options.btnClass || '',
            width: options.btnWidth || 100,
            height: options.btnHeigth || 25,
            buttonImage: options.btnImage || null,
            multi: (options.multi === false ? false : true),
            debug: false,
            fileTypeExts: options.fileType || '*.gif; *.jpg; *.jpeg; *.png',
            uploadLimit: options.uploadLimit || 0,
            removeTimeout: options.removeTimeout || 0,
            queueSizeLimit: options.queueSizeLimit || 0,
            successTimeout: options.timeout || 30,
            fileSizeLimit: options.fileSizeLimit || 500,
            onUploadStart:function(file){
                options.uploadStart && options.uploadStart.call(this, file, 'uploadify');
            },
            onSelect:function(file){
                options.fileAdded && options.fileAdded.call(this,file,'uploadify');
            },
            // 单个文件执行返回正常
            onUploadSuccess: function(file, data, response){
                if(response){
                    data = data.replace(/<script\s*type="text\/javascript">.*<\/script>\s{0,}/, '');
                    options.fileSuccess && options.fileSuccess.call(this, data, file);
                }
            },
            // 单个文件执行返回错误
            onUploadError: function(file, errorCode, errorMsg, errorString){
                options.fileError && options.fileError.call(this, errorCode, file, errorMsg, errorString);
            },
            // 队列文件执行完成（包括出错）
            onQueueComplete: function(queueData){
                options.complete && options.complete.call(this, queueData);
            }
        });
    }else{
		var domainParts = document.domain.split('.'),
			domainPartsLen = domainParts.length,
			domainStr = domainParts[domainPartsLen-2] + '.' + domainParts[domainPartsLen-1];
        document.domain = domainStr;
        var input = id + '_input';
        $('#' + id).attr('style', 'position:relative;z-index:0;')
                .after($('<div id="' + id + '_container" style="position:absolute;background-color:transparent;width:' + $('#' + id).innerWidth() + 'px;height:' + $('#' + id).innerHeight() + 'px;overflow:hidden;z-index:1;opacity:0;-moz-opacity:0;filter:alpha(opacity=0);top:0;left:0;background-position:initial initial;background-repeat:initial initial;">')
                .append('<input id="' + input + '" style="font-size:999px;position:absolute;z-index:1;width:100%;height:100%;cursor:pointer;" type="file" accept="image/jpeg,image/gif,image/png">'))
                .parent().attr('style', 'position:relative;');
        $('#' + input).fileupload({
            url: options.url,
            dataType: 'text',
            paramName: options.fileObjName || 'Filedata',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: options.maxFileSize || 512000, // 201k
            //sequentialUploads:true,
            singleFileUploads: false,
            forceIframeTransport: true
            //limitConcurrentUploads: 1
        }).on('fileuploadadd', function(e, data) {
            $.each(data.files, function(index, file){
                options.fileAdded && options.fileAdded.call(this,file,'fileupload',data);
            });
            $.each(data.files, function(index, file) {
                file.id = id+'_file_'+file.size+'_'+index+'_'+(new Date).getTime();
                options.listbox && $(options.listbox).append('<div id="' + file.id + '">' + file.name + ' (' + KFZ.ui.formatSize(file.size) + ') <b></b>' + '</div>');
            });
            if(!data.isAbort){
                options.uploadStart && options.uploadStart.call(this, data.files[0]);
                data.submit();
            }
        }).on('fileuploaddone', function(e, data) {
            if (data.textStatus === 'success') {
                if(options.listbox){
                    $.each(data.files, function(index, file) {
                        $('#' + file.id + " b").html("100%");
                        $('#' + file.id).fadeOut();
                    });
                }
                options.fileSuccess && options.fileSuccess.call(this, data.result, data.files[0]);
            }
        }).on('fileuploadfail', function(e, data) {
            options.fileError && options.fileError.call(this, data.result, data.files[0]);
        });
    }
};

// plupload 上传插件
// @author dongnan <dongyh@126.com>
// @param {String} id 上传按钮的id
// @param {Object} options 
// @param {String} options.url 上传文件服务端url
// @param {String} options.autoUpload 是否自动上传，默认为 true
// @param {Object} options.data 随文件一起提交到服务器端的数据
// @param {String} options.fileDataName 提交到服务器端的文件上传域的名称，默认为'file'
// @param {Boolean} options.multi 是否允许一次上传多个，默认为true
// @param {String} options.maxFileSize 上传文件大小限制 例如: '500kb','4mb'
// @param {String} options.listbox 标签id，用于显示待上传文件列表
// @param {Int} options.queueSizeLimit 单次上传队列个数限制
// @param {Function} options.init(up,params) 添加上传文件回调函数 
// @param {Function} options.fileAdded(file) 添加上传文件回调函数 
// @param {Function} options.uploadProgress(file) 文件上传中回调函数,用于处理上传进度
// @param {Function} options.fileError(file) 文件上传错误回调函数
// @param {Function} options.fileSuccess(res.data,res,file) 文件上传成功回调函数
// @param {Function} options.fileFail(res.message,res,file) 文件上传失败回调函数
// @param {Object} options ... 待完善
// @returns {Object} uploader plupload 对象,可通过 uploader.bind('someEvent',function(){}) 绑定一些事件
KFZ.ui.plupload = function(id, options){
    options || (options = {});
    (id.indexOf('#') === 0) && (id = id.substring(1));
    options.listbox && (options.listbox.indexOf('#') !== 0) && (options.listbox = '#'+options.listbox);
    options.queueSizeLimit || (options.queueSizeLimit = 0);
    options.upType = KFZ.util.isIE() > 5 ? 'flash,html4':'html5,flash,html4';
    var uploader = new plupload.Uploader({
        runtimes: options.upType,
        browse_button: id,
        //container: 'item_edit_pic',
        url: options.url,
        multi_selection:options.multi === false ? false : true,
        max_file_size: options.maxFileSize || '500kb',
        multipart_params: options.data || {},
        file_data_name: options.fileDataName || 'file',
        filters: options.filters || [
            {title: "Image files", extensions: "jpg,gif,png,jpeg"}
        ],
        //resize: {width: 1280, height: 1280, quality: 90},
        flash_swf_url: KFZ.url.host + 'js/common/plupload/Moxie.swf',
        silverlight_xap_url: KFZ.url.host + 'js/common/plupload/js/Moxie.xap'
    });
    options.init && uploader.bind('Init',options.init);
    uploader.init();
    uploader.bind('FilesAdded', function(up, files) {
        if(files.length>options.queueSizeLimit){
            KFZ.ui.alertWin({result: 0, text: '单次上传个数不能超过'+options.queueSizeLimit+'个！'});
            $.each(files, function(i, file) {
                uploader.removeFile(file);
            });
        }else{
            $.each(files, function(i, file) {
                options.listbox && $(options.listbox).append('<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' + '</div>');
                options.fileAdded && options.fileAdded(file);
            });
            //默认为自动上传
            if(options.autoUpload !== false){
                uploader.start();
            }
        }
        up.refresh(); // Reposition Flash/Silverlight
    });
    uploader.bind('UploadProgress', function(up, file) {
        options.listbox && $('#' + file.id + " b").html(file.percent + "%");
        options.uploadProgress && options.uploadProgress(file);
    });
    uploader.bind('Error', function(up, err) {
    	if(err.code == '-600'){
        	KFZ.ui.alertWin({result: 0, text: '上传文件必须小于'+options.maxFileSize+'！'});
        }
        options.fileError && options.fileError(err);
        up.refresh(); // Reposition Flash/Silverlight
    });
    uploader.bind('FileUploaded', function(up, file, data) {
        if(options.listbox){
            $('#' + file.id + " b").html("100%");
            $('#' + file.id).fadeOut();
        }
        var res = JSON.parse(data.response);
        // 成功
        if(res.status){
            options.fileSuccess && options.fileSuccess(res.data, res, file);
        }
        // 失败
        else{
            options.fileFail && options.fileFail(res.message, res, file);
        }
    });
    
    return uploader;
};

// 节点位置移动	
// @author lizixu <zixulee@163.com>
// @param $selectors object 节点列表jQ选择器
// @param $selector object 节点jQ选择器
// @param direction 移动方向：1-向前，2-向后
// @param options object|function 选项参数，如：{beforeMove: function(){}, callback: function(){}} 或 function(){}
KFZ.ui.nodeMove = function($selectors, $selector, direction, options){
	options || (options ={});
	var isContinue, beforeMove, callback;
	if($.isFunction(options)){
		beforeMove = null;
		callback = options;
	}else{
		beforeMove = options.beforeMove;
		callback = options.callback;
	}
	beforeMove && (isContinue = beforeMove.apply(this, arguments));
	if(isContinue === false) return;
	var index = $selectors.index($selector),
		len = $selectors.length;
	if(direction === 1){ // 向前
		if(index > 0){
			$selectors.eq(index - 1).before($selector);
			index--;
		}
	}else if(direction === 2){ // 向后
		if(index < len - 1){
			$selectors.eq(index + 1).after($selector);
			index++;
		}
	}
	callback && callback.call(this, len);
};

// 扩展行内样式
// @author lizixu <zixulee@163.com>
// @param selector {string|jQ object}
// @param newStyle {object|string}
KFZ.ui.extendStyle = KFZ.ui.addStyle = function(selector, newStyle){
	var $el = typeof selector === 'object' ? selector : $(selector);
	// 已有样式
	var	oldStyle = $el.attr('style') || '';
	if (!newStyle) return oldStyle;
	var	oldStyleArr,
		styleObj = {};
	if (oldStyle) {
		oldStyleArr = oldStyle.split(';');
		$.each(oldStyleArr, function(index, attr){
			if (!attr) return;
			var attrArr = attr.split(':');
			styleObj[attrArr[0]] = attrArr[1];
		});
	}
	// 需合并样式
	var newStyleArr,
		extendStyleObj = {};
	if (typeof newStyle === 'object') {
		extendStyleObj = newStyle;
	} else if (typeof newStyle === 'string') {
		newStyleArr = newStyle.split(';');
		$.each(newStyleArr, function(index, attr){
			if (!attr) return;
			var attrArr = attr.split(':');
			extendStyleObj[attrArr[0]] = attrArr[1] || '';
		});
	}
	// 合并后样式
	var	nowStyleArr = [];
	styleObj = $.extend(styleObj, extendStyleObj);
	$.each(styleObj, function(key, val){
		nowStyleArr.push(key + ':' + val);
	});
	// 写入节点style属性
	$el.attr('style', nowStyleArr.join(';'));
};

// 弹窗
// @author lizixu <zixulee@163.com>
// @param overTit {boolean|string} 若为false-->不显示标题；若为字符串-->显示该字符作为标题
// @param overCon {string} 弹窗内容
// @param afterOpen {function} 打开窗口后的处理器
// @param afterSubmit {function} 点击确定的处理器，在该处理器中返回false可阻止弹窗自动关闭
// @param afterClose {function} 关闭弹窗后的处理器
// @param autoDisableSubmit {boolean} 在提交时自动禁用提交（也可手动使用实例对象的disableSubmit方法禁用，enableSubmit方法启用）
KFZ.ui.PopWin = function(args){
	if(!(this instanceof arguments.callee)) return new arguments.callee(args);
	this.showOverlayWin(args);
	this.drag();
};
KFZ.ui.PopWin.prototype = {
	constructor: KFZ.ui.PopWin,
	// 打开实例窗口
	open: function(openArgs){
		openArgs && $.extend(this.args, openArgs);
		this.showOverlayWin(this.args);
	},
	// 显示弹窗
	showOverlayWin: function(args){
		$.extend(this, args);
		this.args = args || {};
		var that = this,
			// 遮罩层
			color = args.color,
			opacity = args.opacity,
			// 弹窗
			box = args.box || 'body',
			overWin = this.overWin = args.overWin || '#zx_overWin',
			overlay = this.overlay = args.overlay || '#zx_overlay',
			overTit = this.overTit = args.overTit === false ? false : args.overTit,
			overCon = args.overCon || '',
			submitBtn = this.submitBtn = overWin + ' ' + (args.submitBtn || '.subBtn'),
			cancelBtn = this.cancelBtn = overWin + ' ' + (args.cancelBtn || '.cancelBtn'),
			closeBtn = args.closeBtn || [overWin + ' .closeBtn a', this.cancelBtn],
			autoDisableSubmit = args.autoDisableSubmit,
			needTemplate = this.needTemplate === false ? false : true,
			hasSubmitBtn = this.hasSubmitBtn === false ? false : true,
			hasCancelBtn = this.hasCancelBtn === false ? false : true,
			hasCloseBtn = this.hasCloseBtn === false ? false : true,
			from = this.from = args.from,
			width = this.width = this.overWinWidth = args.width || args.overWinWidth || 480,
			closeOther = args.closeOther,
			onlyCloseWin = this.onlyCloseWin = args.onlyCloseWin || null,
			// 回调
			afterSubmit = this.afterSubmit = args.afterSubmit, // 点击确定按钮后执行的函数
			afterCancel = this.afterCancel = args.afterCancel,
			afterClose = this.afterClose = args.afterClose,
			afterOpen = this.afterOpen = args.afterOpen,
			// 其他设备
			//otherSet = this.otherSet = window.screen.width < $(window).width();
			userAgent = navigator.userAgent,
			otherSet = this.otherSet = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1);
		// 遮罩层
		this.setOverlay({box: box, color: color, opacity: opacity, overlay: overlay});
		// 弹窗+样式
		if (needTemplate) {
			this.setOverWin(overWin, overTit);
			//this.setStyle();
		}
		// 相关节点对象
		this.$overWin = $(overWin);
		this.$overTit = overTit === false ? null : this.$overWin.find('.overTit').length ? this.$overWin.find('.overTit') : this.$overWin.find('h3');
		this.$overCon = this.$overWin.find('.overWinText');
		// 禁止Drag和Fixed
		this.disableDrag = args.disableDrag === true ? true : false;
		this.disableFixed = args.disableFixed === true || otherSet ? true : false;
		// 初始化函数
		args.init && args.init(args);
		args.initialize && args.initialize(args);
		// 关闭其它overWin
		if (closeOther) $('.overTip').hide().removeClass('open');
		if (overTit && this.$overTit.length) this.$overTit.html(overTit);
		if (overCon && this.$overCon.length) this.$overCon.html(overCon);
		// 窗口来源
		if (from !== undefined || from !== null) this.$overWin.attr('from', from);
		// 操作弹窗
		var overWinHeight = this.$overWin.height();
		// 初始化弹窗宽度
		this.$overWin.width(width);
		// 打开后处理器
		setTimeout(function(){
			KFZ.ui.PopWin.resizeHandler = function(){
				that.resize();
			};
			// 窗口重置
			if(!that.disableFixed) $(window).resize(KFZ.ui.PopWin.resizeHandler);
			// IE6 hack
			if(KFZ.util.isIE() === 6){
				window.PngFix && window.PngFix.fix(that.overWin + ' .closeBtn a');
				KFZ.ui.PopWin.resizeHandler();
				$(window).scroll(KFZ.ui.PopWin.resizeHandler);
			}
			that.resize();
			afterOpen && afterOpen.apply(that, arguments);
		});
		// 点击确定并执行相关操作
		submitBtn && afterSubmit && typeof afterSubmit === 'function' && $('body').undelegate(submitBtn + ':not(.disabled)', 'click').delegate(submitBtn + ':not(.disabled)', 'click', function(){
			if (autoDisableSubmit) that.disableSubmit();
			if (afterSubmit.call(that, this) === false) return;
			that.close();
		});
		// 点击取消
		cancelBtn && afterCancel && typeof afterCancel === 'function' && $('body').undelegate(cancelBtn + ':not(.disabled)', 'click').delegate(cancelBtn + ':not(.disabled)', 'click', function(){
			if (afterCancel.call(that, this) === false) return;
			that.close();
		});
		// 点击关闭并执行相关操作
		closeBtn && KFZ.util.multiObjRun(closeBtn, 'click', function(){
			that.close();
		});
		// ESC取消
		var escHandler = function(event){
			event.which === 27 && that.close();
		};
		$(document).unbind('keyup', escHandler).bind('keyup', escHandler);
	},
	// 生成遮罩层
	setOverlay: function(args){
		var box = args.box || 'body',
			color = args.color || '#000',
			opacity = args.opacity || 0.5,
			overlay = args.overlay || '#zx_overlay';
		if (!$(overlay).length) {
			$(box).append('<div id="' + overlay.replace(/#/, '') +'"></div>');
		}
		var overlayStyle = {
			'position': 'absolute',
			'z-index': '1000000',
			'left': '0',
			'top': '0',
			'background': color,
			'opacity': opacity,
			'-moz-opacity': opacity,
			'filter': 'alpha(opacity=' + opacity*100 + ')'
		};
		KFZ.ui.extendStyle(overlay, overlayStyle);
		$(overlay).width($(document).width()).height($(document).height()).show();
	},
	// 拖拽
	drag: function(){
		var d = document, 
			win = d.getElementById(this.overWin.replace(/#/, '')),
			tit = win.getElementsByTagName('h3')[0],
			s = win.style, x, y;
		if(this.disableDrag || !tit) return;
		tit.onselectstart = function(){
			return false; //阻止选择
		};
		tit.onmousedown = function(e){
			e = e || event;
			x = e.clientX - win.offsetLeft;
			y = e.clientY - win.offsetTop;
			d.onmousemove = function(e){
				e = e || event;
				s.left = e.clientX - x + 'px';
				s.top = e.clientY - y + 'px';
			};
			d.onmouseup = function(){
				d.onmouseup = d.onmousemove = null;
			};
		};
	},
	// 生成弹窗
	setOverWin: function(overWin, overTit){
		if ($(overWin).length) return;
		var html = 
		'<div id="' + overWin.replace(/#/, '') + '" class="overTip" style="display:none;">' +
			'<div class="overWin">' +
				(overTit === false ? '' : '<h3 class="overTit">' + (overTit || '') + '</h3>') +
				'<div class="overWinCon">' +
					'<div class="overWinText"></div>' +
					(this.hasSubmitBtn === false && this.hasCancelBtn === false ? '' : 
					'<div class="overWinBtn">' +
						'<div class="overWinBtnBox">' +
							(this.hasSubmitBtn === false ? '' : '<a class="subBtn" href="javascript:;">' + KFZ.lang.kfz.confirm + '</a>') +
							(this.hasCancelBtn === false ? '' : '<a class="cancelBtn" href="javascript:;">' + KFZ.lang.kfz.abolish + '</a>') +
						'</div>' +
					'</div>') +
				'</div>' +
				(this.hasCloseBtn === false ? '' : '<div class="closeBtn"><a href="javascript:;" title="' + KFZ.lang.kfz.cancel + '"></a></div>') +
			'</div>' +
		'</div>';
		$('body').append(html);
	},
	// 生成样式
	setStyle: function(){
		if ($('#overWin_style').length) return;
		var styleHtml = 
		'<style id="overWin_style">' +
		'.overTip,.overWin h3{padding:0;margin:0;}' +
		'.overWin{position:relative;width:408px;background:#fff;border:5px solid #999;}' +
		'.overWin .closeBtn{position:absolute;z-index:10;right:8px;top:8px;width:25px;height:25px;}' +
		'.overWin .closeBtn a{display:block;width:25px;height:25px;background:url(/images/bg_overWin_closeBtn.gif) -8px -8px no-repeat;}' +
		'.overWin .closeBtn a:hover{background:url(/images/bg_overWin_closeBtn.gif) -8px -48px no-repeat;}' +
		'.overWin h3{height:40px;background:#f9f9f9;border-bottom:1px solid #e5e5e5;line-height:40px;text-align:center;color:#999;font-size:16px;font-family:\5FAE\8F6F\96C5\9ED1;overflow:hidden;}' +
		'.overWin .overWinCon{position:relative;padding:10px 0 20px;background:url(/images/bg_overWin.gif) 0 bottom no-repeat;}' +
		'.overWin .overWinTextCon{min-height:70px;height:auto!important;_height:70px;line-height:50px;text-align:center;}' +
		'.overWin .overWinBtn{position:relative;padding:15px 0 0 90px;overflow:hidden;*zoom:1;}' +
		'.overWin .overWinBtn .one{padding-left:150px;}' +
		'.overWin .overWinBtn a{margin:0 10px;float:left;*display:inline;}' +
		'.overWin .disabled,.overWin .disabled:hover{display:block;background:#a2a2a2 url(/images/waiting.gif) center center no-repeat;line-height:25px;border-radius:3px;text-align:center;color:#fff;cursor:default;}' +
		'</style>';
		$('body').append(styleHtml);
	},
	// 重置窗口
	resize: function(){
		var overlay = this.overlay,
			overWin = this.overWin,
			width = this.width,
			disableFixed = this.disableFixed,
			overWinHeight;
		// 遮罩层尺寸
		$(overlay).width($(window).width()).height($(window).height())
				.width($(document).width()).height($(document).height());
		// 按窗口真实高度调整窗口高度
		var overWinRealHeight = $(overWin).css('height', 'auto').height();
		if(overWinRealHeight <= 100){
			if ($(window).height() - 30 < 100) {
				overWinHeight = $(window).height() - 30;
			}else{
				overWinHeight = 100;
			}
		}else{
			if($(window).height() - 30 < overWinRealHeight){
				overWinHeight = $(window).height() - 30;
			}else{
				overWinHeight = overWinRealHeight;
			}
		}
		// 定位
		var	newStyle = {
			'position': disableFixed ? 'absolute' : 'fixed',
			'_position': 'absolute',
			'_overflow': 'visible',
			'z-index':'1000001',
			// 'left': ($(window).width() - width)/2 + 'px',
			// 'top': (($(window).height() - overWinHeight)/2 - 5) + 'px',
			'left': (disableFixed ? document.body.scrollLeft + 10 + ((window.screen.width - width)/2 < 0 ? 0 : (window.screen.width - width)/2) : ($(window).width() - width)/2) + 'px',
			'top': (disableFixed ? document.body.scrollTop + 10 : ($(window).height() - overWinHeight)/2 - 5) + 'px',
			'_top': $(window).scrollTop() + (($(window).height() - overWinHeight)/2 - 5) + 'px',
			'visibility': 'visible'
		};
		KFZ.ui.extendStyle(overWin, newStyle);
		// 显示窗口
		if(!$(overWin).hasClass('open')){
			$(overWin).slideDown('fast').addClass('open');
		}else{
			$(overWin).show();
		}
		return this;
	},
	// 禁用提交
	disableSubmit: function(){
		this.submitBtnText = $(this.submitBtn).text();
		$(this.submitBtn).addClass('disabled').empty();
		return this;
	},
	// 启用提交
	enableSubmit: function(){
		$(this.submitBtn).removeClass('disabled');
		!$(this.submitBtn).html() && this.submitBtnText && $(this.submitBtn).html(this.submitBtnText);
		return this;
	},
	// 关闭窗口及遮罩层
	// @param onlyCloseWin boolean 只关闭弹窗不关闭遮罩层
	// @param noDelay boolean 无关闭延迟（隐退）效果
	close: function(onlyCloseWin, noDelay){
		var that = this,
			overlay = this.overlay,
			overWin = this.overWin,
			afterClose = this.afterClose,
			type = 'fadeOut',
			speed = 'fast';
		if(noDelay){
			type = 'hide';
			speed = null;
		}
		if(!this.onlyCloseWin && !onlyCloseWin) $(overlay)[type](speed);
		$(overWin)[type](speed).removeClass('open');
		$(window).unbind('resize', KFZ.ui.PopWin.resizeHandler).unbind('scroll', KFZ.ui.PopWin.resizeHandler);
		afterClose && afterClose.apply(this, arguments);
		setTimeout(function(){
			that.enableSubmit.call(that);
		}, (speed ? 200 : 0));
		return this;
	}
};

// 确认窗口
// @author lizixu <zixulee@163.com>
KFZ.ui.confirmWin = function(text, onlyCloseWin, afterConfirm){
	if($.isFunction(onlyCloseWin)){
		afterConfirm = onlyCloseWin;
		onlyCloseWin = null;
	}
	KFZ.ui.confirmWin.win = new KFZ.ui.PopWin({
		overWin: '#kfz_confirmWin',
		overTit: false,
		overCon: text || '',
		onlyCloseWin: onlyCloseWin,
		afterOpen: function(){
			$(this.overWin).find('.overWinText').addClass('confirmCon');
		},
		afterSubmit: function(){
			afterConfirm && afterConfirm.apply(this, arguments);
		},
		closeBtn: ['#kfz_confirmWin .closeBtn a', '#kfz_confirmWin .cancelBtn'],
		afterClose: function(){
			KFZ.ui.confirmWin.win = null;
		}
	});
};

// 置顶消息提示
// @author lizixu <zixulee@163.com>
(KFZ.ui.alertWin = function(args){
	var self = arguments.callee;
	if(!args){
		// 关闭方法
		self.close || (self.close = function(){
			self.hideTip && clearTimeout(self.hideTip);
			$('.tiplay').fadeOut();
		});
		return;
	}
	var classType = args.result,
		tipInfo = args.text,
		minWidth = args.minWidth || 300,
		maxWidth = args.maxWidth || 984,
		width = args.width || 984,
		speed = args.speed || 5000,
		errClass = args.errClass || 'tip_err',
		sucClass = args.sucClass || 'tip_suc',
		infoClass = args.infoClass || 'tip_info',
		noFixed = args.noFixed,
		$tiplay = $('.tiplay');
	if(!tipInfo) return;
	// 不存在提示窗节点
	if(!$tiplay.length){
		// 加载提示窗
		var addHtml = '<div class="tiplay"' + (noFixed ? ' style="position:absolute;_top:0;"' : '') + '><div class="tipBox"><div class="tiplay_info"></div></div></div>';
		$('body').append(addHtml).on('click', '.tiplay', self.close);
		$tiplay = $('.tiplay');
		// 绑定事件
		setTimeout(function(){
			$(window).resize(function(){
				$tiplay.css('left', ($(window).width() - width) / 2 + 'px');
			});
		});
		// 设置样式
		if(args.needStyle && !$('#run_alertwin_style').length){
			var styleHtml = '<style id="run_alertwin_style">' +'.tiplay{position:fixed;_position:absolute;top:0;_top:expression(documentElement.scrollTop);left:0;z-index:1000001;height:34px;background:none;line-height:34px;word-wrap:break-word;word-break:break-all;float:left;overflow:hidden;display:none;}' +
			'.tipBox{height:30px;margin:0 auto;background:#ffd;border:1px solid #fdb;float:left;overflow:hidden;}' +
			'.tiplay_info{padding-left:25px;margin:0 10px;line-height:30px;background:url(/images/bg_tip.gif) no-repeat;float:left;*display:inline;cursor:default;}' +
			'.tiplay .tip_suc .tiplay_info{background-position:0 1px;color:#333;}' +
			'.tiplay .tip_err .tiplay_info{background-position:0 -29px;color:#c00;}' +
			'.tiplay .tip_info .tiplay_info{background-position:0 1px;color:#333;}' +
			'</style>';
			$('body').append(styleHtml);
		}
	}
	// 配置样式
	var	className;
	switch (classType){
		case 0:
			className = errClass;
			break;
		case 1:
			className = sucClass;
			break;
		default:
			className = infoClass;
	}
	// 显示
	self.hideTip && clearTimeout(self.hideTip);
	$tiplay.find('.tipBox').attr('class', 'tipBox ' + className);
	var $tipInfo = $tiplay.find('.tiplay_info');
	$tipInfo.html(tipInfo);
	!width && (width = $tiplay.width());
	maxWidth && width > maxWidth && (width = maxWidth);
	minWidth && width < minWidth && (width = minWidth);
	$tiplay.width(width).css('left', ($(window).width() - width) / 2 + 'px').show()
		.find('.tipBox').width(width).css({'position': 'relative', 'float': 'none'});
	var tipInfoWidth = $tipInfo.width('auto').width() + 50;
	KFZ.ui.extendStyle($tipInfo, {'position': 'absolute', 'width': tipInfoWidth + 'px', 'left': (width - tipInfoWidth)/2 +'px', 'float': 'none'});
	// 延迟关闭
	self.hideTip = setTimeout(function(){
		$tiplay.fadeOut();
	}, speed);
})();

// 单一图片最大尺寸限定（等比缩小）
// @author lizixu <zixulee@163.com>
// @param img string|object 图片选择器或图片jQ对象
// @param maxWidth int 最大宽度
// @param maxHeight int 最大高度
// @param isSetPosition boolean 是否设置居中
// @param callback function 图片完成缩小后的回调函数
KFZ.ui.setMaxSize = (function(){
	var start = {}, // 图片开始处理时刻的集合
		count = 0; // 处理的图片计数器
	return function(img, maxWidth, maxHeight, isSetPosition, callback){
		var $img = (typeof img == 'object') ? img : $(img);
		if(!$img.length || $img.attr('imgresized') === '1') return;
		$img.removeAttr('width').removeAttr('height').css({width: 'auto', height: 'auto'});
		(function($img, maxWidth, maxHeight, isSetPosition, callback){
			var ac = arguments.callee,
				w = $img.width(),
				h = $img.height();
			// 未获取宽和高其一-等待并再次获取宽和高
			if(!w || !h){
				start[count] || (start[count] = +new Date());
				//$img.css({width: 'auto', height: 'auto'});
				if(+new Date() - start[count] < 15000){
					setTimeout(function(){
						ac($img, maxWidth, maxHeight, isSetPosition, callback);
					}, 300);
				}else{
					delete start[count];
				}
				return;
			}
			start[count] && delete start[count];
			// 宽和高其一大于最大尺寸-等比缩小
			if(w > maxWidth || h > maxHeight){
				var rateW = w/maxWidth,
					rateH = h/maxHeight;
				if(rateW > 1 || rateH > 1){
					if(rateW/rateH > 1){
						$img.width(maxWidth).height(h/rateW);
					}else{
						$img.width(w/rateH).height(maxHeight);
					}
				}
			}
			// 设置居中
			if(isSetPosition){
				var $imgParent = $img.parent();
				KFZ.ui.extendStyle($img, {'display': 'block', 'position': 'absolute', 'left': (maxWidth + parseInt($imgParent.css('padding-left')) + parseInt($imgParent.css('padding-right')) - $img.width()) / 2 + 'px', 'top' : (maxHeight + parseInt($imgParent.css('padding-top')) + parseInt($imgParent.css('padding-bottom')) - $img.height()) / 2 + 'px'});
				$imgParent.css({'position': 'relative', 'overflow': 'hidden'});
			}
			// 设置完成标志
			$img.removeAttr('imgload').attr('imgresized', '1');
			callback && callback($img, count);
			count ++;
		})($img, maxWidth, maxHeight, isSetPosition, callback);
	};
})();

// 多图片最大尺寸限定（等比缩小）
// @author lizixu <zixulee@163.com>
// @dependent KFZ.ui.setMaxSize
// @param imgs string|object 图片选择器或图片jQ对象
// @param maxWidth int 最大宽度
// @param maxHeight int 最大高度
// @param isSetPosition boolean 是否设置居中
// @param options function 图片完成缩小后的回调函数
KFZ.ui.resizeImage = (function(){
	var count = 0; // 批量处理图片的计数器
	return function(imgs, options){
		options || (options = {});
		var self = arguments.callee,
			maxWidth, maxHeight, isSetPosition, callback, errSrc;
		if(typeof options === 'number' && typeof arguments[2] === 'number'){
			maxWidth = options;
			maxHeight = arguments[2];
			isSetPosition = arguments[3];
			callback = arguments[4];
		}else{
			maxWidth = options.maxWidth;
			maxHeight = options.maxHeight;
			isSetPosition = options.isSetPosition;
			callback = options.callback;
			errSrc = options.errSrc;
		}
		var $imgs = typeof imgs == 'object' ? imgs : $(imgs),
			len = $imgs.length;
		(errSrc || (maxWidth && maxHeight)) && len && $.each($imgs, function(){
			if($(this).attr('imgresized') === '1') return;
			var src = $.trim($(this).attr('src'));
			if(!src){
				if(errSrc){
					$(this).attr('src', (src = errSrc));
				}else{
					return;
				}
			}
			var img = new Image(),
				start = +new Date(),
				stamp = start + '_' + count++,
				isIE = KFZ.util.isIE();
			$(this).attr('imgload', 'img_' + stamp);
			// 非IE赋值
			if(!isIE) img.src = src;
			// 错误url替换处理
			errSrc && (img.onerror = function(){
				var $errImg = $('[imgload="img_' + stamp + '"]');
				if($errImg.attr('imgerr') === '1') return;
				$errImg.attr({'src': errSrc, 'imgerr': '1'});
				maxWidth && maxHeight && setTimeout(function(){
					self($errImg, maxWidth, maxHeight, isSetPosition, callback);
				});
			});
			// 缩放处理
			maxWidth && maxHeight && (function(){
				if(img.complete){
					setTimeout(function(){
						KFZ.ui.setMaxSize($('[imgload="img_' + stamp + '"]').removeAttr('imgerr'), maxWidth, maxHeight, isSetPosition, callback);
					});
					return;
				}
				img.onload = function(){
					setTimeout(function(){
						KFZ.ui.setMaxSize($('[imgload="img_' + stamp + '"]').removeAttr('imgerr'), maxWidth, maxHeight, isSetPosition, callback);
					});
				};
			})();
			// IE赋值
			if(isIE) img.src = src;
		});
	};
})();

// 分页
// @author lizixu <zixulee@163.com>
// @param box string 分页容器选择器，缺省为'#kfz_pager_box'
// @param currClass string 当前页码样式名，缺省为'curr'
// @param pageCurr int 当前页码
// @param pageShow int 单页显示条数（0或空，后端返回后端的默认条数）
// @param recordBefore int 单次请求记录前续条数（0或空，后端不返回）
// @param recordAfter int 单次请求记录后续条数（0或空，后端不返回）
// @param recordCount int 总记录条数
// @param defaults object 默认页码对象{pageCurr|pageShow|recordCount|recordBefore|recordAfter}
// @param isLazy boolean 是否惰性请求，缺省为false
// @param lazyCache int 内存记录条数，缺省为100
// @param getCon function 获取内容处理器
// @param setCon function 渲染内容处理器
// @param afterOpen function 分页打开后处理器
// @param beforeHandleClick function 点击页码后执行处理器前的回调，若返回false将阻止后续处理
// @param afterHandleClick function 点击页码后执行处理器后的回调
KFZ.ui.Pager = function(args){
	if(!(this instanceof arguments.callee)) return new arguments.callee(args);
	this.init(args);
};
KFZ.ui.Pager.prototype = {
	constructor: KFZ.ui.Pager,
	// 初始化
	init: function(args){
		var that = this;
		//$.extend(this, args);
		var argsArr = ['box', 'currClass', 'pageCurr', 'pageShow', 'recordCount', 'recordBefore', 'recordAfter', 'defaults', 'isLazy', 'lazyCache', 'afterOpen', 'getCon', 'setCon', 'beforeHandleClick', 'afterHandleClick'];
		$.each(argsArr, function(){
			if(args[this] !== undefined && args[this] !== null) that[this] = args[this];
		});
		$(this.box = this.box || '#kfz_pager_box').hide();
		this.currClass = this.currClass || 'curr';
		this.pageCurr = this.pageCurr || 1;
		this.isLazy = this.isLazy === true ? true : false;
		this.lazyCache = this.lazyCache || 100;
		// 保存的内容
		this.list = {};
		// 设置默认并打开
		this.open(this.defaults, this.afterOpen);
		// 绑定事件
		this.setEvent();
	},
	// 打开
	open: function(pager, callback){
		if($.isFunction(pager)){
			callback = pager;
			pager = null;
		}
		// 载入模板
		if(!$(this.box).length) return this;
		this.setTemplate();
		// 载入样式
		this.setStyle();
		// 渲染分页及内容
		this.render(pager);
		callback && callback.apply(this, arguments);
		return this;
	},
	// 渲染分页及内容
	render: function(pager, items){
		// 【1】传入了分页信息或已有分页信息
		if(this.hasParams(pager)){
			pager || (pager = {});
			// 参数
			pager.pageCurr = (this.pageCurr = +pager.pageCurr || this.pageCurr);
			pager.pageShow = (this.pageShow = +pager.pageShow || this.pageShow || 10);
			pager.recordCount = (this.recordCount = isNaN(pager.recordCount) ? this.recordCount : +pager.recordCount);
			// 前/后续记录条数实例化对象的值保持不变，当前的实际值由请求后端返回
			pager.recordBefore = +pager.recordBefore || 0;
			pager.recordAfter = +pager.recordAfter || 0;
			// 以下值由计算得出
			// 总页码
			pager.pageCount = pager.pageShow ? Math.ceil(pager.recordCount / pager.pageShow) : 0;
			// 理论截止记录序号
			var recordEndTheory = pager.pageShow * pager.pageCurr;
			// 当前页起始记录序号（从1开始）
			pager.recordStart = recordEndTheory - pager.pageShow + 1;
			// 当前页实际截止记录序号
			pager.recordEnd = recordEndTheory > pager.recordCount ? pager.recordCount : recordEndTheory;
			// 【1.1】有获取方法-需要同时渲染分页和内容
			if(this.getCon && $.isFunction(this.getCon)){
				// 【1.1.1】惰性-首先使用传入内容，其次查找保存内容
				if(this.isLazy){
					// 【1.1.1.1】有传入内容或找到保存内容或在第一页没有内容且总记录数为0(需将内容赋值为数组)-渲染分页和内容
					if((items && items.length) || ((items = this.hasCon(pager)) && items.length) || (+pager.pageCurr === 1 && +pager.recordCount === 0 && (items = []))){
						// 渲染分页
						this.renderPager(pager);
						// 整理内容
						items = [].concat(items);
						items.splice(pager.recordEnd, pager.recordAfter);
						items.splice(0, pager.recordBefore);
						// 渲染内容
						this.renderCon(items);
						return;
					}
					// 【1.1.1.2】无传入内容或未找到保存内容-跳出到【2】
				}
				// 【1.1.2】非惰性-使用传入内容
				else{
					// 【1.1.2.1】有传入内容或在第一页没有内容且总记录数为0(需将内容赋值为数组)-渲染分页和内容
					if(items && items.length || (+pager.pageCurr === 1 && +pager.recordCount === 0 && (items = []))){
						// 渲染分页
						this.renderPager(pager);
						// 整理内容
						items = [].concat(items);
						items.splice(pager.recordEnd, pager.recordAfter);
						items.splice(0, pager.recordBefore);
						// 渲染内容
						this.renderCon(items);
						return;
					}
					// 【1.1.2.2】无传入内容-跳出到【2】
				}
			}
			// 【1.2】无请求内容方法-只渲染分页
			else{
				this.renderPager(pager);
				return;
			}
		}
		// 【2】未传分页信息或没有分页信息
		// 【2.1】有获取方法-请求
		if(this.getCon && $.isFunction(this.getCon)){
			this.requestCon();
		}
		// 【2.2】无获取方法-关闭
		else{
			$(this.box).hide();
		}
		return this;
	},
	// 请求内容
	requestCon: function(callback){
		var that = this;
		// 请求信息
		this.getCon(function(pager, items){
			pager = pager || {};
			items = items || [];
			pager.pageCurr = (that.pageCurr = +pager.pageCurr || that.pageCurr);
			pager.pageShow = (that.pageShow = +pager.pageShow || that.pageShow || 10);
			pager.recordCount = (this.recordCount = isNaN(pager.recordCount) ? this.recordCount : +pager.recordCount);
			// pager.recordCount = (that.recordCount = (isNaN(pager.recordCount) || +pager.recordCount === 0) ? 0 : +pager.recordCount);
			// 以下值由计算得出
			// 总页码
			pager.pageCount = pager.pageShow ? Math.ceil(pager.recordCount / pager.pageShow) : 0;
			// 理论截止记录序号
			pager.recordEndTheory = pager.pageShow * pager.pageCurr;
			// 当前页起始记录序号
			pager.recordStart = pager.recordEndTheory - pager.pageShow + 1;
			// 当前页实际截止记录序号
			pager.recordEnd = pager.recordEndTheory > pager.recordCount ? pager.recordCount : pager.recordEndTheory;
			// 保存内容
			that.isLazy && that.saveCon(pager, items);
			// 渲染
			that.render(pager, items);
			// 回调
			callback && callback.apply(this, arguments);
		});
	},
	// 保存内容
	saveCon: function(pager, items){
		if(!this.isLazy) return;
		var that = this;
		if($.isArray(items) && items.length){
			$.each(items, function(index, item){
				that.list[pager.recordStart - (pager.recordBefore = +pager.recordBefore || 0) + index] = item;
			});
		}
		// 保持内容定量
		this.limitList();
	},
	// 渲染页码
	renderPager: function(pager){
		if(!pager) return;
		var pageCurr = pager.pageCurr,
			pageCount = pager.pageCount,
			recordCount = pager.recordCount,
			recordStart = pager.recordStart,
			recordEnd = pager.recordEnd;
		var $box = $(this.box),
			$pageInfoBox = $box.find('.pager_info_box'),
			$pageNumBox = $box.find('.pager_num_box'),
			$pagePrevBtn = $pageNumBox.find('.pager_prev_btn'),
			$pageNextBtn = $pageNumBox.find('.pager_next_btn') ;
		// 分页信息部分
		$pageInfoBox.find('em').html(recordStart).siblings('i').html(recordEnd).siblings('b').html(recordCount);
		// 分页页码部分
		$pagePrevBtn.siblings('a:not(.pager_next_btn):not(.pager_turn_btn), span:not(.pager_input_box)').remove();
		var pageHtml = '';
		if (pageCount === 0){
			$box.hide();
			return;
		}else if(pageCount < 12){
			for(var i=0; i<pageCount; i++){
				pageHtml += '<a ' + (pageCurr === (i+1) ? 'class="' + this.currClass + '" ' : '') + 'href="javascript:;">' + (i+1) + '</a>';
			}
		}else if(pageCount >= 12){
			for(var i=0; i<pageCount; i++){
				if(i!==0 && i!==pageCount-1){
					if(pageCurr>6 && pageCount-(i+1)>9 && pageCurr-(i+1)>4){
						if(i+1===2){
							pageHtml += '<span>...</span>';
						}
						continue;
					}
					if(pageCount-pageCurr>5 && (i+1)>10 && (i+1)-pageCurr>4){
						if(i+1===pageCount-1){
							pageHtml += '<span>...</span>';
						}
						continue;
					}
				}
				pageHtml += '<a ' + (pageCurr === (i+1) ? 'class="' + this.currClass + '" ' : '') + 'href="javascript:;">' + (i+1) + '</a>';
			}
		}
		$pagePrevBtn.after(pageHtml);
		if(pageCurr < 2){
			$pagePrevBtn.addClass('no_page');
		}else{
			$pagePrevBtn.removeClass('no_page');
		}
		if(pageCurr > pageCount-1){
			$pageNextBtn.addClass('no_page');
		}else{
			$pageNextBtn.removeClass('no_page');
		}
		if (pageCount) $box.show();
		return this;
	},
	// 渲染内容
	renderCon: function(items){
		this.setCon && this.setCon.call(this, items);
	},
	// 是否有参数
	hasParams: function(pager){
		return !!((pager && !isNaN(pager.pageShow) && !isNaN(pager.recordCount)) || (this.pageShow && !isNaN(this.recordCount)));
	},
	// 检测内容
	hasCon: function(pager){
		if(!pager || isNaN(pager.recordStart) || isNaN(pager.recordEnd)) return [];
		// 内容
		var list = this.list,
			items = [];
		for(var i = +pager.recordStart; i < 1 + pager.recordEnd; i ++){
			if(list[i]){
				items.push(list[i]);
			}
			// 只要有一个不存在，即不存在（缓存数据不完全）
			else{
				items = [];
				break;
			}
		}
		// 返回内容
		return items;
	},
	// 清空跳转输入框
	clearTurnInput: function(){
		$(this.box).find('.pager_input_box :text').val('');
	},
	// 获取当前页起始记录序号（从1开始）
	getRecordStart: function(pager){
		pager || (pager = {});
		pager.pageShow || (pager.pageShow = this.pageShow);
		pager.pageCurr || (pager.pageCurr = this.pageCurr);
		return pager.pageShow * (pager.pageCurr - 1) + 1;
	},
	// 获取列表
	getList: function(){
		return $.extend(true, {}, this.list);
	},
	// 获取单项
	get: function(index){
		var type = typeof index,
			item = type === 'object' ? KFZ.util.get(this.list, index) : type === 'number' ? this.list[index] : undefined,
			typeItem = typeof item;
		return typeItem === 'object' ? type$.extend(true, {}, item) : typeItem === 'array' ? [].concat(item) : item;
	},
	// 插入记录
	// @param index {int|string|object|array} 起始序号（从1开始而非0）
	// @param item {object} 需要插入的单条记录对象
	// @param notRender {boolean} 是否不渲染
	add: function(index, item, notRender){
		this.update(index, 1, item, notRender);
	},
	// 顶端插入记录
	// @param item {object} 需要插入的单条记录对象
	// @param notRender {boolean} 是否不渲染
	unshift: function(item, notRender){
		this.update(1, 1, item, notRender);
		return this.list;
	},
	unshiftList: function(item, notRender){
		this.unshift(item, notRender);
	},
	// 删除记录
	// @param index {int|string|object|array} 起始序号（从1开始而非0）
	// @param notRender {boolean} 是否不渲染
	remove: function(index, notRender){
		this.update(index, 0, undefined, notRender);
		return this.list;
	},
	removeList: function(index, notRender){
		this.remove(index, notRender);
	},
	// 更新记录
	// @param index {int|string|object|array} 起始序号（从1开始而非0）
	// @param isInsert {boolean|undefined} 是否插入：true-插入，false-删除，undefined（空）-有item时更新，无item时删除
	// @param item {object} 需要插入的单条记录对象（当isInsert为true时需要）
	// @param notRender {boolean} 是否不渲染
	update: function(index, isInsert, item, notRender){
		var that = this;
		if(typeof isInsert === 'object'){
			notRender = item;
			item = isInsert;
			isInsert = undefined;
		}
		// 更新数据
		!$.isArray(index) && (index = [index]);
		$.each(index, function(i, itemIndex){
			that.updateData(itemIndex, isInsert, item);
		});
		// 更新分页
		!notRender && this.open({recordCount: this.recordCount});
		return this.list;
	},
	updateList: function(index, isInsert, item, notRender){
		this.update(index, isInsert, item, notRender);
	},
	// 更新数据
	// @param index {int|string|object} 起始序号（从1开始而非0）
	// @param isInsert {boolean|undefined} 是否插入：true-插入，false-删除，undefined（空）-有item时更新，无item时删除
	// @param item {object} 需要插入的单条记录对象（当isInsert为true时需要）
	updateData: function(index, isInsert, item){
		// index传入对象 -> 从list中查找位置
		var list = this.list,
			type = typeof index;
		(type === 'string' || type === 'object') && $.each(list, function(k, v){
			if(KFZ.util.compare(v, index) || KFZ.util.index([v], index) > -1){
				index = +k;
				return false;
			}
		});
		if(isNaN(index = +index)) return list;
		var listInfo = this.getListInfo(),
			maxPos = +listInfo.maxPos;
		if(typeof isInsert === 'object'){
			item = isInsert;
			isInsert = undefined;
		}
		// 插入记录
		if(isInsert){
			this.addData(index, maxPos, item);
			// 保持内容定量
			this.limitList(listInfo);
		}
		// 更新/删除记录
		else{
			// 更新记录
			if(item){
				$.extend(list[index] || (list[index] = {}), item);
			}
			// 删除记录
			else{
				this.deleteData(index, maxPos);
			}
		}
		return list;
	},
	// 更新数据-新增记录
	addData: function(index, maxPos, item){
		if(!item) return this.recordCount;
		var list = this.list;
		for(var i = maxPos; i >= index; i--){
			if(list[i] !== undefined){
				list[i + 1] = list[i];
			}else{
				list[i + 1] !== undefined && delete list[i + 1];
			}
		}
		list[index] = item;
		++this.recordCount;
		return list;
	},
	// 更新数据-删除记录
	deleteData: function(index, maxPos){
		var list = this.list;
		for(var i = index; i <= maxPos; i++){
			if(list[i + 1] !== undefined){
				list[i] = list[i + 1];
			}else{
				list[i] !== undefined && delete list[i];
			}
		}
		--this.recordCount;
		return list;
	},
	// 更新数据-限量
	limitList: function(listInfo){
		if(!this.isLazy) return;
		// 当前list信息
		listInfo = listInfo || this.getListInfo();
		var list = this.list,
			leftLen = +listInfo.leftLen,
			rightLen = +listInfo.rightLen,
			maxPos = +listInfo.maxPos;
		// 限制记录条数
		var lazyCache = this.lazyCache,
			pageShow = this.pageShow,
			halfLazyCache = lazyCache / 2,
			halfLazyCacheLeft = Math.ceil(halfLazyCache),
			halfLazyCacheRight = Math.floor(halfLazyCache),
			// 左边溢出数
			removeLeft = 0,
			// 右边溢出数
			removeRight = 0;
		if(leftLen + rightLen > lazyCache){
			// 左边溢出
			if(leftLen > halfLazyCacheLeft && rightLen <= halfLazyCacheRight){
				removeLeft = leftLen + rightLen - lazyCache;
				var hasRemoveLeft = 0,
					i = 1;
				while(hasRemoveLeft < removeLeft){
					if(list[i]){
						delete list[i];
						hasRemoveLeft ++;
					}
					i ++;
				}
			}
			// 右边溢出
			else if(rightLen > halfLazyCacheRight && leftLen <= halfLazyCacheLeft){
				removeRight = leftLen + rightLen - lazyCache;
				var hasRemoveRight = 0,
					j = maxPos + 1;
				while(hasRemoveRight < removeRight){
					if(list[j]){
						delete list[j];
						hasRemoveRight ++;
					}
					j --;
				}
			}
			// 两边溢出
			else{
				// 移除左边溢出
				removeLeft = leftLen - halfLazyCacheLeft;
				var hasRemoveLeft = 0,
					i = 1;
				while(hasRemoveLeft < removeLeft){
					if(list[i]){
						delete list[i];
						hasRemoveLeft ++;
					}
					i ++;
				}
				// 移除右边溢出
				removeRight = rightLen - halfLazyCacheRight;
				var hasRemoveRight = 0,
					j = maxPos + 1;
				while(hasRemoveRight < removeRight){
					if(list[j]){
						delete list[j];
						hasRemoveRight ++;
					}
					j --;
				}
			}
		}
	},
	// 获取列表信息
	getListInfo: function(){
		var // 最大位置的记录序号
			maxPos = 0,
			// 当前记录左边记录条数
			leftLen = 0,
			// 当前记录右边记录条数
			rightLen = 0,
			// 理论截止记录序号
			recordEndTheory = this.pageShow * this.pageCurr,
			// 当前页起始记录序号
			recordStart = recordEndTheory - this.pageShow + 1,
			// 当前页实际截止记录序号
			recordEnd = recordEndTheory > this.recordCount ? this.recordCount : recordEndTheory,
			// 当前记录序号
			currPos = Math.ceil((recordEnd + recordStart) / 2);
		$.each(this.list, function(key, item){
			key = +key;
			if(maxPos < key) maxPos = key;
			if(currPos < key){
				rightLen ++;
			}else{
				leftLen ++;
			}
		});
		return {
			maxPos: maxPos,
			leftLen: leftLen,
			rightLen: rightLen,
			currPos: currPos
		}
	},
	// 重置并打开
	reset: function(pager, callback){
		this.pageCurr = 1;
		this.pageShow = this.recordCount = this.recordBefore = this.recordAfter = 0;
		this.open(pager, callback);
		return this;
	},
	// 处理点击更新
	clickUpdate: function(){
		this.render();
	},
	// 载入模板
	setTemplate: function(){
		var $box = $(this.box);
		if ($box.find('.pager_num_box').length) return;
		$box.addClass('kfz_pager_box');
		var html = 
			'<div class="pager_info_box"><em></em>-<i></i>' + KFZ.lang.kfz.itemsAndAll+ '<b></b>' + KFZ.lang.kfz.items + '</div>' +
			'<div class="pager_num_box">' +
				'<a class="pager_prev_btn" href="javascript:;">' + KFZ.lang.kfz.prevPage + '</a>' +
				'<a class="pager_next_btn" href="javascript:;">' + KFZ.lang.kfz.nextPage + '</a>' +
				'<span class="pager_input_box">' + KFZ.lang.kfz.to + '<input type="text">' + KFZ.lang.kfz.page + '</span>' +
				'<a class="pager_turn_btn" href="javascript:;">' + KFZ.lang.kfz.confirm + '</a>' +
			'</div>';
		$box.append(html);
	},
	// 生成样式
	setStyle: function(){
		if ($('#kfz_pager_style').length) return;
		var styleHtml = 
		'<style id="kfz_pager_style">' +
			'.kfz_pager_box a{margin:0 3px;}' +
			'.kfz_pager_box a.curr{color:#f60;}' +
			'.kfz_pager_box a.no_page,.kfz_pager_box a.no_page:hover{color:#999;text-decoration:none;cursor:text;border:1px solid #cdcdcd;}' + 
			'.kfz_pager_box .pager_input_box input{width:30px;}' +
		'</style>';
		$('body').append(styleHtml);
	},
	// 绑定事件
	setEvent: function(){
		var that = this,
			currClass = this.currClass,
			beforeHandleClick = this.beforeHandleClick,
			afterHandleClick = this.afterHandleClick;
		$('body')
		// 上一页
		.undelegate(this.box + ' a.pager_prev_btn:not(.no_page)', 'click').delegate(this.box + ' a.pager_prev_btn:not(.no_page)', 'click', function(){
			if(beforeHandleClick && beforeHandleClick.apply(this, arguments) === false) return;
			KFZ.ui.alertWin.close();
			that.pageCurr--;
			that.clickUpdate();
			that.clearTurnInput();
			afterHandleClick && afterHandleClick.apply(this, arguments);
		})
		// 下一页
		.undelegate(this.box + ' a.pager_next_btn:not(.no_page)', 'click').delegate(this.box + ' a.pager_next_btn:not(.no_page)', 'click', function(){
			if(beforeHandleClick && beforeHandleClick.apply(this, arguments) === false) return;
			KFZ.ui.alertWin.close();
			that.pageCurr++;
			that.clickUpdate();
			that.clearTurnInput();
			afterHandleClick && afterHandleClick.apply(this, arguments);
		})
		// 页码
		.undelegate(this.box + ' a:not(.' + currClass + '):not(.pager_prev_btn):not(.pager_next_btn):not(.pager_turn_btn)', 'click').delegate(this.box + ' a:not(.' + currClass + '):not(.pager_prev_btn):not(.pager_next_btn):not(.pager_turn_btn)', 'click', function(){
			if(beforeHandleClick && beforeHandleClick.apply(this, arguments) === false) return;
			KFZ.ui.alertWin.close();
			that.pageCurr = Number($(this).html());
			that.clickUpdate();
			that.clearTurnInput();
			afterHandleClick && afterHandleClick.apply(this, arguments);
		})
		// 跳转
		.undelegate(this.box + ' a.pager_turn_btn', 'click').delegate(this.box + ' a.pager_turn_btn', 'click', function(){
			var $input = $(this).siblings('.pager_input_box').find(':text'),
				inputPageCurr = $input.val();
			// 校验输入页码
			if(!inputPageCurr || !KFZ.util.isInt(inputPageCurr = Number(inputPageCurr))){
				KFZ.ui.alertWin({result: 0, text: KFZ.lang.kfz.inputCorrectPage});
				return;
			}
			var pageCount = that.pageShow ? Math.ceil(that.recordCount / that.pageShow) : 0;
			if(!pageCount){
				$(that.box).hide();
				return;
			}
			if(beforeHandleClick && beforeHandleClick.apply(this, arguments) === false) return;
			KFZ.ui.alertWin.close();
			that.pageCurr = pageCount >= inputPageCurr ? inputPageCurr : pageCount;
			that.pageCurr = that.pageCurr < 1 ? 1 : that.pageCurr;
			$input.val(that.pageCurr);
			that.clickUpdate();
			afterHandleClick && afterHandleClick.apply(this, arguments);
		})
		// 回车
		.undelegate(this.box + ' .pager_input_box :text', 'keydown').delegate(this.box + ' .pager_input_box :text', 'keydown', function(event){
			var keyCode = event.which;
			if(keyCode == 13){
				$(that.box).find('a.pager_turn_btn').trigger('click');
			}
		});
	}
};

// 联想输入
// @author lizixu <zixulee@163.com>
// @param input 带联想选项的输入框 选择器
// @param box 联想选项的容器 选择器
// @param getItems 获取联想选项的方法
// @param hasRecommend 是否有推荐（boolean），true：在未输入字符时即推送推荐选项
// @param callback 选择选项后运行的回调
// @param itemsRecords 保存搜索数据的对象
KFZ.ui.AssInput = function(args){
	if(!(this instanceof arguments.callee)) return new arguments.callee(args);
	this.input = args.input;
	this.box = args.box;
	this.getItems = args.getItems;
	this.hasRecommend = args.hasRecommend;
	this.callback = args.callback;
	this.itemsRecords = {};
	this.init();
};
KFZ.ui.AssInput.prototype = {
	constructor: KFZ.ui.assInput,
	// 初始化
	init: function(args){
		this.setEvent(this.input, this.box);
		this.setStyle();
	},
	// 绑定事件
	setEvent: function(input, box){
		var that = this,
			$input = $(input),
			$box = $(box),
			$hidden;
		$('body').delegate(input, {
			keydown: function(event){
				var keyCode = event.which;
				if(keyCode == 38 || keyCode == 40){ // 向上||向下
					that.keySelectItem(keyCode);
				}
			},
			keyup: function(event){
				var val = $(this).val(),
					keyCode = event.which;
				if(keyCode == 13){
					if((($hidden = $box.find(':hidden')).length && $hidden.val() !== val) || !$hidden.length){
						that.itemsHandler(val, function(){
							$box.show();
						});
						return;
					}else{
						that.closeItems();
					}
					// 有回调，检查是否回车执行
					if(that.callback){
						$input.blur();
						that.callback.apply(that, arguments);
					}
					return;
				}
				if (keyCode == 38 || keyCode == 40) return;
				that.itemsHandler(val, function(){
					$box.show();
				});
			},
			blur: function(event){
				setTimeout(function(){
					that.closeItems();
				}, 200);
			}
		}).delegate(box + ' a', {
			mouseenter: function(){
				$(this).addClass('curr').siblings('a.curr').removeClass('curr');
				//$(input).val($(this).html());
			},
			mouseleave: function(){
				$(this).removeClass('curr');
				//$(input).val($(that.box).find(':hidden').val());
			},
			click: function(){
				$(input).val($(this).html());
				that.callback && that.callback.apply(that, arguments);
			}
		});
	},
	// 选项处理
	itemsHandler: function(val, callback){
		var that = this;
		if (!that.hasRecommend && !val) {
			that.clearItems();
			return;
		}
		if(that.itemsRecords[val] !== undefined){
			that.setItems(that.itemsRecords[val]);
			callback && callback(that.itemsRecords[val]);
		}else{
			that.getItems && that.getItems.call(that, val, function(val, items){
				that.setItems(that.itemsRecords[val] = items);
				callback && callback(that.itemsRecords[val]);
			});
		}
	},
	// 设置选项
	setItems: function(items){
		var len = items.length,
			itemsHtml = '';
		if (!len) {
			$(this.box).hide().empty();
			return;
		}
		$.each(items, function(i, val){
			itemsHtml += '<a href="javascript:;">'+ val +'</a>';
		});
		itemsHtml += '<input type="hidden">';
		$(this.box).html(itemsHtml).find('input').val($(this.input).val());
	},
	// 键盘选择选项
	keySelectItem: function(keyCode){
		var $input = $(this.input),
			$box = $(this.box),
			$items = $box.find('a'),
			len = $items.length;
		if(!len) return;
		if ($box.css('display')=='none' && len) {
			$box.show();
			return;
		}
		var	$currItem = $box.find('a.curr'),
			currNum = $currItem.length ? $currItem.index() + 1 : 0;
		if(keyCode == 38){
			currNum --;
		}else if(keyCode == 40){
			currNum ++;
		}
		currNum = currNum > len ? currNum%(len+1) : currNum < 0 ? len+1+currNum%(len+1) : currNum;
		if(currNum > 0){
			$items.eq(currNum-1).addClass('curr').siblings('a.curr').removeClass('curr');
			$input.val($items.eq(currNum-1).html()).focus();
		}else if(currNum === 0){
			$items.removeClass('curr');
			$input.val($box.find(':hidden').val()).focus();
		}
	},
	// 关闭选项
	closeItems: function(){
		var that = this,
			val = $(this.input).val();
		this.itemsHandler(val, function(){
			$(that.box).hide().find(':hidden').val(val);
		});
	},
	// 清除选项
	clearItems: function(){
		$(this.box).empty().hide();
	},
	// 生成样式
	setStyle: function(){
		if ($('#kfz_assInput_style').length) return;
		var styleHtml = 
		'<style id="kfz_assInput_style">' +
			this.box +' a{display:block;}' +
			this.box +' a.curr{color:#f60;}' +
		'</style>';
		$('body').append(styleHtml);
	}
};

// 输入框内容清除
// @author lizixu <zixulee@163.com>
// （可放置多个输入框选择器作为参数）
KFZ.ui.inputClear = function(){
	for(var i = 0,len = arguments.length;i<len;i++){
		if(typeof arguments[i] == 'object'){
			arguments[i].val('');
			arguments[i].prop('checked', false);
		}else{
			$(arguments[i]).val('');
			$(arguments[i]+':checked').prop('checked', false);
		}
	}
};

// 表单验证
// @author lizixu <zixulee@163.com>
// @param items {array} 表单中需验证的各项集合
// @param item {object} items中的一项
// @param el {string|jq节点对象} 需验证项的对应节点
// @param errEl {string|jq节点对象} 需验证项的对应错误提示节点
// @param errClass {string} 添加到el节点上的错误样式类名
// @param sucClass {string} 添加到el节点上的正确样式类名
// @param checks {array} 需要验证的种类集合，如：[{type: 'min', condition: 10, errTip: '不能小于10！'}]
// @param methods {object} 补充的验证方法库，如：{max: function(val, condition, errTip, setErr, setSuc){}}
// @param others {array} 其他项自定义验证的集合，如：[{el: '', errEl: '', errTip: '', method: function(){}}]
// @returns errNum {int} 错误项个数
KFZ.ui.formCheck = function(items, others){
	var self = arguments.callee, errNum = 0;
	// 组件方法
	self.methods || (self.methods = {
		// 最小长度
		'lenMin': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? {val: condition} : condition;
			if((!condition.ifAny || val) && ($.isArray(val) ? val : $.trim('' + val)).length < condition.val) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 最大长度
		'lenMax': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? {val: condition} : condition;
			if((!condition.ifAny || val) && ($.isArray(val) ? val : $.trim('' + val)).length > condition.val) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 最小数值
		'min': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? {val: condition} : condition;
			if((!condition.ifAny || val) && +val < condition.val) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 最大数值
		'max': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? {val: condition} : condition;
			if((!condition.ifAny || val) && +val > condition.val) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 数值
		'number': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && isNaN(val)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 正数
		'positiveNumber': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && (isNaN(val) || +val <= 0)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 整数
		'int': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && !KFZ.util.isInt(val)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 自然数
		'natural': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && !KFZ.util.isNatural(val)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 价格：整数位不超过8位，小数位不超过2位
		'price': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && !KFZ.util.isPrice(val)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 手机号码
		'mobile': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && !KFZ.util.isMobile(val)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 电话号码
		'tel': function(val, condition, errTip, setErr, setSuc){
			condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
			if((!condition.ifAny || val) && !KFZ.util.isTel(val)) return (!setErr(errTip));
			setSuc && setSuc();
		},
		// 非必填 - 直接验证通过
		'pass': function(val, condition, errTip, setErr, setSuc){
			setSuc && setSuc();
		}
	});
	// 常规项验证
	items || (items = []);
	// 采集数据
	var data = {};
	$.each(items, function(key, item){
		var el = item.el,
			$el = typeof el === 'object' ? el : $(el);
		if(!$el.length) return;
		var errEl = item.errEl || $el.parent().siblings('.check_tip'),
			$errEl = typeof errEl === 'object' ? errEl : $(errEl),
			errClass = item.errClass || 'text_err',
			sucClass = item.sucClass || 'text_suc',
			checks = item.checks,
			methods = $.extend(self.methods, (item.methods || {})),
			val = typeof item.val === 'undefined' ? typeof $el.val() === 'undefined' ? '' : $.trim($el.val()) : typeof item.val === 'function' ? item.val() : item.val,
			setErr = item.setErr,
			setSuc = item.setSuc,
			discard = item.discard, // 不采集数据
			isErr = 0;
		if(setErr !== false){
			setErr || (setErr = function(errTip){
				// $el.removeClass(sucClass);
				// $el.is(':text') && $el.addClass(errClass);
				$errEl.removeClass('check_tip_info').removeClass('check_tip_suc').addClass('check_tip_err')
					.find('.tip_err').html(errTip || '');
				return ++isErr;
			});
		}
		if(setSuc !== false){
			setSuc || (setSuc = function(sucTip){
				// $el.addClass(sucClass);
				// $el.is(':text') && $el.removeClass(errClass);
				$errEl.removeClass('check_tip_info').removeClass('check_tip_err').addClass('check_tip_suc')
					.find('.tip_suc').html(sucTip || '');
			});
		}
		checks && checks.length && $.each(checks, function(i, check){
			var type = check.type,
				condition = check.condition,
				errTip = check.errTip,
				method = type === 'special' ? check.method : methods[type];
			if($.isFunction(method)) return method.call(self, val, condition, errTip, setErr, setSuc, data);
		});
		errNum += isErr;
		!discard && (data[key] = val);
	});
	// 其他项验证
	others && $.each(others, function(key, method){
		if($.isFunction(method)){
			var res = method(data);
			res === false ? errNum++ : typeof res === 'undefined' ? '' : data[key] = res;
		}
	});
	// 返回错误或采集数据
	return errNum ? false : data;
};





// hashchange v1.3
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}/msie/.test(navigator.userAgent.toLowerCase())&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

// 路由
// @author lizixu <zixulee@163.com>
// @param args {object} 路由参数，如：{initialize: function(){}, routes: {'/': 'getIndex', 'default': 'getDefault'}, getIndex: function(){}, getDefault: function(){}}
KFZ.Router = function(args){
	if(!(this instanceof arguments.callee)) return new arguments.callee(args);
	this.init(args);
};
KFZ.Router.prototype = {
	constructor: KFZ.Router,
	init: function(args){
		if(!args || !args.routes) return;
		$.extend(this, args);
		// 绑定事件
		var that = this;
		$(window).hashchange(function(){
			that.setRoutes();
		});
		// 初始化触发
		$(window).trigger('hashchange');
	},
	setRoutes: function(){
		this.initialize && this.initialize.apply(null, arguments);
		var hash = window.location.hash.slice(1).replace(/^\/|\/$/, ''),
			routes = this.routes,
			router;
		for(var route in routes){
			// 匹配
			var routeStr = '/' + route.replace(/^\/|\/$/, '').replace(/\//, '\\\/') + '/',
				routeReg = eval(routeStr.replace(/:[\w-]+/g, '[\\\w-]+'));
			if(hash === route.replace(/^\/|\/$/, '') || (routeReg && routeReg.test(hash))){
				// 有路由处理器->执行处理器并退出
				if(router = routes[route]){
					typeof router === 'function' ? router.apply(this, arguments) : (this[router] && this[router].apply(this, arguments));
					return;
				}
				// 无路由处理器->跳出遍历继续走未匹配（默认）
				else{
					break;
				}
			}
		}
		// 未匹配->检测默认
		var def = routes.def;
		def && typeof def === 'function' ? def.apply(this, arguments) : (this['default'] && this['default'].apply(this, arguments));
	}
};





// 视图及其扩展/事件
// @author lizixu <zixulee@163.com>
KFZ.add(['View', 'events']);
KFZ.View.extend = function(object){
	var F = function(){
		if(!(this instanceof arguments.callee)) return new arguments.callee();
		this.init();
	};
	F.prototype = {
		constructor: F,
		init: function(){
			var that = this;
			// 1-el-{string|object}视图节点选择器
			var $doc = $(document),
				el = this.el;
			if(!el){
				if(!(el = this.tagName)) return;
				el = this.el = '<' + el.replace(/^\<|(\/)*\>&/g, '') + ' />';
			}
			this.$el = $(el);
			// 2-initialize-{function}-初始化
			var initialize = this.initialize;
			initialize && initialize.apply(this, arguments);
			// 3-events-{object}-绑定事件
			var events = this.events;
			events && $.each(events, function(key, handler){
				setTimeout(function(){
					if(!handler) return;
					var evtArr = key.split(' '),
						evts = evtArr.shift();
					if(!evts || !evtArr.length) return;
					$.inArray('body', evtArr) < 0 && evtArr.unshift(el);
					var selector = evtArr.join(' '),
						handlerName;
					if(typeof handler === 'string'){
						handlerName = handler;
						handler = that[handler];
					}
					if(!handler || typeof handler !== 'function') return;
					$.each(evts.split(','), function(i, evt){
						if(handlerName){
							var fullEventName = evt + '|' + selector.replace(/\s+/g, '~') + '|' + handlerName;
							if(!KFZ.events[fullEventName]){
								var isSameOne;
								$.each(KFZ.events, function(existOne, hasHandler){
									var existArr = existOne.split('|');
									if(existArr.length < 3) return;
									var existEvt = existArr[0],
										existSelector = existArr[1].replace(/~/, ' '),
										existHandlerName = existArr[2];
									if(evt === existEvt && selector === existSelector && handlerName === existHandlerName){
										isSameOne = true;
										return false;
									}
								});
								if(!isSameOne){
									$.each(evt.split(','), function(i, e){
										$doc.on(e, selector, function(event){
											return handler.apply(that, arguments);
										});
									});
									KFZ.events[fullEventName] = true;
								}
							}
						}else{
							$.each(evt.split(','), function(i, e){
								$doc.on(e, selector, function(event){
									return handler.apply(that, arguments);
								});
							});
						}
					});
				}, 0);
			});
		}
	};
	$.extend(F.prototype, object);
	return F;
};

// 模板
// @param str {string} 模板选择器ID
// @param data {object} 传入模板的数据对象
KFZ.tmpl = KFZ.template = (function(){
	var cache = {};
	return function tmpl(str, data){
		var fn = !/\W/.test(str) ? cache[str] || (cache[str] = tmpl(document.getElementById(str).innerHTML)) :
			new Function('o',
				"var p=[];" +
				"with(o){p.push('" +
				str.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") +
				"');}return p.join('');");
		return data ? fn(data) : fn;
	};
})();






