
let http = require("http")

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    })



    res.end()
}).listen(8080)