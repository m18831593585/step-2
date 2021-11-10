var http = require('http');
var https = require('https');

// 创建服务器
// 参数中是一个回调函数，而回调函数的参数是一个request和response对象
// req请求 类型是IncomingMessage  请求头
// res响应 类型是ServerResponse  响应头
// 消息分为两个部分, 一个叫消息头, 另一个叫消息体
http.createServer(function (req, res) {
    // 写入响应的消息
    // 这种写法一次只能设置一个头消息 需要写在writeHead之前
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // 可以设置很多头消息, 包括状态码
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.write("<ul>")
    for (var i = 0; i < 10; i++) {
        res.write("<li>"+i+"</li>")
    }
    res.write("</ul>")

    // res.write('你好!!\n');

    // end 结束发送, 必须最后调用
    res.end();

}).listen(4000,function () {
    // 创建服务有一个listen方法，开启服务侦听, 端口号设置, 这里是4000
    // 需要有当前服务的地址和端口号
    // 函数是一个回调函数，当服务器开启成功后，会调用这个回调函数
    console.log('创建服务成功');
});