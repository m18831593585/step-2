const http = require('http')
const {insertData, selectAll, judgeURL, judgeName} = require('./sql')

http.createServer((req, res) => {
    let type = req.url.split('/')[1].split('?')[0]
    console.log("type: "+type)
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });
    router(type, req, res)

}).listen(8080);

function router(type, req, res) {
    switch (type) {
        case "insert":
            insertHandler(req, res);
            break
        case "select":
            selectAllHandler(req, res);
            break;
        case "judge":
            judgeHandler(req, res);
            break;
    }
}

async function insertHandler(req, res) {
    let data = await getData(req)
    let arr = Object.values(JSON.parse(data))

    if (await judgeURL(arr[1]) || await judgeName(arr[0])) res.end(JSON.stringify("ERROR: URL or Name Already Exists!"))
    else {
        res.write(JSON.stringify(await insertData(arr) ? "INSERT SUCCESS" : "INSERT FAIL"))
        res.end()
    }
}

async function selectAllHandler(req, res) {
    res.write(JSON.stringify(await selectAll()))
    res.end()
}

async function judgeHandler(req, res) {
    let url = req.url.split('?')[1].split('=')[1]
    console.log(url)
    res.end(JSON.stringify(await judgeURL(url)))
}


function getData(req) {
    return new Promise(resolve => {
        let data = ""
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            resolve(data)
        })
    })
}
