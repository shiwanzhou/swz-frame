

1.SWZ  库


2.核心api:


  (1).工具函数

      .isArray(obj):参数obj；

      .isFunction(obj):参数obj；

      .isWindow(obj):参数obj；

      .parseJSON(obj):字符串转JSON 对象；例如：$.parseJSON(obj);

      .stringify(str);JSON 对象转字符串；例如：$.stringify(obj);

   (2).选择器：

       id选择器：例如$("#test")；

   (3).dom 操作：

      .html():设置或获取DOM元素的innerHTML属性值；无参数,例如$("#test").html()；

      .text():设置或返回当前jQuery对象所匹配的DOM元素内的text内容；无参数,例如$("#test").text()；

      .attr(n,v):设置或获取指定的属性:例如$("#test").attr("ff")；

      .append(str);向每个匹配元素内部的末尾位置追加指定的内容:参数目前仅支持字符串；

      .prepend(str);向每个匹配元素内部的起始位置追加指定的内容:参数目前仅支持字符串；

      .css(obj,value);返回或设置元素的一个或多个样式属性,例如$("#test").css("color","red"),或者$("#test").css({"color":"red"})；

      .getClass();获取元素class属性的值，例如$("#test").getClass()；

      .hasClass(str);检查被选元素是否包含指定的 class，例如$("#test").hasClass(str)；参数目前仅支持字符串；返回boolean;

      .addClass(class);向被选元素添加一个或多个类，例如$("#test").addClass("ddd")；参数目前仅支持字符串;

      .removeClass(class);向被选元素添加一个或多个类，例如$("#test").removeClass("class")；参数目前仅支持字符串;

      .val(str);方法返回或设置被选元素的值, 元素的值是通过 value 属性设置的。该方法大多用于 input 元素;

      .ready():函数规定当 ready 事件发生时执行的代码,函数仅能用于当前文档，因此无需选择器,允许$(document).ready(function)；

      .ajax();通过 HTTP 请求加载远程数据,目前支持url，type,dataType,data,jsonp,success,fail 参数；
              例如：$.ajax({
                        url:"",
                        type:"",
                        dataType:"",
                        data:"",
                        success:function(res,status){},
                        fail:function(res,status){}
                     })；

      (4).核心api：

         .define("id",function(vm){vm.data = "fff"})：
              (1)定义模块，绑定数据；
              (2)ng-controller指令，例如<div ng-controller="aa"></div>,对应模块中id名字；
              (3)data对应页面中的{{data}},实现单向数据绑定,目前支持当个单个多个{{data}}标签，支持多行或者单行比如：
                               <div>{{data}}--{{data2}}--{{data3}}</div>
                                 对应:
                                define("id",function(vm){
                                     vm.data = "111";
                                     vm.data2 = "222";
                                     vm.data3 = "333";
                                });
              (4)ng-repeat指令，目前支持例如：
                                <ul ng-repeat="arr">
                                   <li class="{{el.aa}}">{{el.bb}}</li>
                                </ul>
                                对应:
                                 define("id",function(vm){
                                      vm.arr = [{"bb":"3323","aa":"iiijj"},{"bb":"666","aa":"8885656"}]
                                 });
               (5)ng-click,ng-mouseover,ng-keydown,ng-blur等事件绑定，目前支持例如：
                            <div ng-click="click()">按钮</div>
                             对应:
                             define("id",function(vm){
                                 vm.click = function(){
                                    console.log(88);
                                 }
                             });
               (6)ng-duplex,data-duplex-changed 指令实现， 目前支持例如：
                           <input ng-duplex="username" data-duplex-changed="callback">
                            对应:
                            define("id",function(vm){
                                 vm.callback = function(val){
                                    console.log(val);
                                    console.log(vm);//input 值更改了vm 自动更新，视图更改后model 自动更新，实现联动；
                                 }
                                 vm.username = "fff";
                             });
               (7)ng-visible 显示隐藏元素实现,目前支持例如：
                           <div ng-visible="isShow"></div>
                           <div ng-click="hide()"></div>
                           <div ng-click="show()"></div>
                            对应:
                            define("id",function(vm){
                                 vm.isShow = true;
                                 vm.tab = function(){
                                     vm.isShow = false; //目前有bug
                                 }
                                  vm.show = function(){
                                      vm.isShow = true; //目前有bug
                                   }
                             });
               (8)ng-html 加载html资源，替换当前标签，目前支持例如：
                           <div ng-html="module/view/test.html"></div>
                           对应:
                                   define("id",function(vm){

                                   });

          .scan(dom):dom 加载时候对节点进行自动扫描，处理数据绑定，渲染页面；

     (5).兼容性：01.目前核心功能兼容到火狐3.5+，IE7,8,9,10,11,chrome4+, opera11+, safari5+, 360安全浏览器5.0+等；

                 02.dom操作api 兼容到IE7,IE8及IE8+;
















