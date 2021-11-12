const http = require('http')

http.createServer((req, res) => {
    // 配置cors解决跨域问题
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    })

    let data
    if(/get/i.test(req.method)){
        data=req.url.split('?')[1]
    } else if (/post/i.test(req.method)) {
        data=req.url.split('?')[1]
    }


    req.on('data', (chunk) => {
        console.log(chunk.toString())
    });

    res.end('Hello World')
}).listen(8080)