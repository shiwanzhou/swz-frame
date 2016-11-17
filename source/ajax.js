var http=require("http");
var url = require('url');
var qs = require('querystring');
var server=http.createServer(function(req,res){
    console.log(req.url)
    if(req.url!=="/favicon.ico"){
        res.statusCode=200;
        res.sendDate=false;
        res.setHeader("Content-Type","text/plain");
        res.setHeader("Access-Control-Allow-Origin","http://localhost:63342");
        var str = '{"name":"456"}';
        if (req.method.toUpperCase() == 'POST') {
            var postData = "";
            /**
             * 因为post方式的数据不太一样可能很庞大复杂，
             * 所以要添加监听来获取传递的数据
             * 也可写作 req.on("data",function(data){});
             */
            req.addListener("data", function (data) {
                postData += data;
            });
            /**
             * 这个是如果数据读取完毕就会执行的监听方法
             */
            req.addListener("end", function () {
                var query = qs.parse(postData);
                console.log(query)
            });
        }
        else if (req.method.toUpperCase() == 'GET') {
            /**
             * 也可使用var query=qs.parse(url.parse(req.url).query);
             * 区别就是url.parse的arguments[1]为true：
             * ...也能达到‘querystring库’的解析效果，而且不使用querystring
             */
            var param = url.parse(req.url, true);
            console.log(param);
            if (param.query && param.query.callback) {
                //console.log(params.query.callback);
                var str =  param.query.callback + '(' + JSON.stringify(str) + ')';//jsonp
                console.log(str);
                res.end(str);
            } else {
                console.log(222);
                res.end(str);//普通的json
            }
           /* var query = qs.parse(url.parse(req.url).query);
            console.log(query);
            res.write(str);*/
        }

    }
    res.end();
});
server.listen(1338,"localhost",function(){
    console.log("开始监听...");
});