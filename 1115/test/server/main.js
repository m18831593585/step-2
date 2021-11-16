const http = require('http')

let message = []

http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    })

    let type = req.url.split('?')[0]
    router(type, req, res)


}).listen(8080)


function router(type, req, res) {
    switch (type) {
        case '/getMsg' :
            getMsg(req, res)
            break
        case '/postMsg' :
            postMsg(req, res)
            break
        default :
            res.end('404')
    }
}

function getMsg(req, res) {
    if (req.method !== 'GET') {
        res.end(JSON.stringify({"result": false, "err": "请求方法错误"}))
        return
    }

    res.end(JSON.stringify({"result": true, "data": message}))

}

async function postMsg(req, res) {
    if (req.method !== 'POST') {
        res.end(JSON.stringify({"result": false, "err": "请求方法错误"}))
        return
    }
    let data = await getData(req, res)
    try {
        data = JSON.parse(data)
    } catch (e) {
    }
    if (!data.msg || !data.user) {
        res.end(JSON.stringify({"result": false, "err": "用户名或内容不能为空"}))
        return
    }
    message.push(data)
    res.end(JSON.stringify({"result":true}))
}

function getData(req, res) {
    return new Promise((resolve, reject) => {
        let data = ''
        req.on('data', (chunk) => {
            data += chunk
        })
        req.on('end', () => {
            resolve(data)
        })
    })
}