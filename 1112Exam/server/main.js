const http = require("http");
const {insertDB, selectPersonBySex: select, deleteItemById} = require("./sql");

http.createServer(function (req, res) {
    var type = req.url.split("?")[0];
    console.log("type: " + type)
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    })
    router(type, req, res)

}).listen(8080);

function getData(req) {
    return new Promise(function (resolve, reject) {
        var data = "";
        req.on("data", function (chunk) {
            data += chunk;
        })
        req.on("end", function () {
            resolve(data);
        })
    })
}

function router(type, req, res) {
    switch (type) {
        case "/insert":
            return insert(req, res);
        case "/select":
            return selectBySex(req, res);
        case "/delete":
            return deleteById(req, res);
    }
}

async function insert(req, res) {
    var data = await getData(req);
    let arr = data.split(",");
    if (!Array.isArray(arr)) {
        return res.end(JSON.stringify({result: false}));
    }
    let result = await insertDB(arr);
    res.end(JSON.stringify({result}));
}

async function selectBySex(req, res) {
    let sex = Number(req.url.split("=")[1]) ? "男" : "女"
    let data = await select(sex);
    res.end(JSON.stringify({data}));
}

async function deleteById(req, res) {
    var data = await getData(req);
    try {
        data = JSON.parse(data);
    } catch (e) {
    }
    let result = await deleteItemById(data);
    res.end(JSON.stringify({result}));
}
