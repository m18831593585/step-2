const http = require("http");
const {insertDB, selectAll: select, selectItem} = require("./sql");

const querystring = require("querystring");
http.createServer(function (req, res) {
    var type=req.url.split("?")[0];
    console.log(type)
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    })
    router(type,req,res)
    // res.end("hello world")

}).listen(4020);

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
        case "/signUp":
            return signup(req, res);
        case "/signIn":
            return signIn(req, res);
        case "/selectAll":
            return selectAll(req, res);
    }
}

async function signup(req, res) {
    var data = await getData(req);
    try {
        data = JSON.parse(data);
    } catch (e) {
    }

    if (!Array.isArray(data)) {
        return res.end(JSON.stringify({result: false}));
    }
    var result = await insertDB(data);
    res.end(JSON.stringify({result}));
}

async function signIn(req, res) {
    var data = await getData(req);
    var result = await selectItem(JSON.parse(data));
    res.end(JSON.stringify({result}));
}

async function selectAll(req, res) {
    // var data = await getData(req);

    let data = await select();
    console.log(data)


    res.end(JSON.stringify({data}));
}
