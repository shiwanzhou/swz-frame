

1.SWZ  库


2.核心api:


  (1).工具函数

      .isArray(obj):参数obj；

      .isFunction(obj):参数obj；

      .isWindow(obj):参数obj；

   (2).选择器：

       id选择器：例如$("#test")；

   (3).dom 操作：

      .html():设置或获取DOM元素的innerHTML属性值；无参数,例如$("#test").html()；

      .text():设置或返回当前jQuery对象所匹配的DOM元素内的text内容；无参数,例如$("#test").text()；

      .attr(n,v):设置或获取指定的属性:例如$("#test").attr("ff")；

      .append(str);向每个匹配元素内部的末尾位置追加指定的内容:参数目前仅支持字符串；

      .prepend(str);向每个匹配元素内部的起始位置追加指定的内容:参数目前仅支持字符串；

      .css(obj,value);返回或设置匹配的元素的一个或多个样式属性,例如$("#test").css("color","red"),或者$("#test").css({"color":"red"})；

      .getClass();获取元素class属性的值，例如$("#test").getClass()；

      .hasClass(str);检查被选元素是否包含指定的 class，例如$("#test").hasClass(str)；参数目前仅支持字符串；返回boolean;

      .addClass(class);向被选元素添加一个或多个类，例如$("#test").addClass("ddd")；参数目前仅支持字符串;

      .removeClass(class);向被选元素添加一个或多个类，例如$("#test").removeClass("class")；参数目前仅支持字符串;











