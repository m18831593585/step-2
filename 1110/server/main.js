var http=require("http");
// var https=require("https");
// createServer 创建服务
// createServer中参数是一个回调函数，而回调函数中参数有两个，一个是req,res
// req 请求  类型IncomingMessage  请求头
// res 响应  类型ServerResponse   响应头
// 消息分为两个部分，一个叫消息头，一个叫消息体
http.createServer(function(req,res){
    // 写入响应的消息
    // res.write("你好");
    // res.write("你好1");
    // res.write("你好2");
    // res.end();//结束发送
    // 这种写法一次只能设置一个头消息，必须只能写在writeHead前面
    // res.setHeader("Content-Type","text/html;charset=utf-8");
    // 可以设置很多头消息，并且包含了返回状态码
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })
    res.write("<ul>");
    for(var i=0;i<10;i++){
        res.write("<li>"+i+"</li>")
    }
    res.write("</ul>");
    res.end();
    // res.end("你好");
    // end必须最后执行
}).listen(4010)
