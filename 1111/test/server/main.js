let http = require('http');

http.createServer((req, res) => {

    res.writeHead(200,{
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    })

    res.end("hello world")

}).listen(8080)
