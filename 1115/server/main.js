const http=require("http");
// const {insertDB,selectAll:select,selectItem}=require("./sql");

const querystring=require("querystring");
http.createServer(async function(req,res){
    // 在这里获取请求头的数据
    // console.log(req.headers)
    console.log(req.headers["x-name"])
    var type=req.url.split("?")[0];
    console.log(req.url)
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8",
        // 允许跨域访问发送数据
        "Access-Control-Allow-Origin":"*",
        // 允许跨域时修改请求方式
        "Access-Control-Allow-Methods":"PUT",
        // 允许前端发送来自定义的请求头
        "Access-Control-Allow-Headers":"X-Name",
        // 如果需要发送自定义响应头，需要浏览器可以获取必须使用这个来设置需要发送的自定义响应头
        "Access-Control-Expose-Headers":"X-Session-Id",
        "X-Session-Id":"1011101"
    })
    // router(type,req,res)
    var data=await getData(req);
    console.log(data);
    res.end(JSON.stringify({a:1,b:2}));
   
}).listen(4020);

function getData(req){
    return new Promise(function(resolve,reject){
        var data="";
        req.on("data",function(chunk){
            data+=chunk;
        //    for(var i=0;i<chunk.length;i++){
        //         data+=String.fromCharCode(chunk[i]^2345);
        //    }
            // for(var i=0;i<chunk.length;i+=2){
            //     data+=String.fromCharCode(parseInt(chunk[i+1].toString(16).padStart(2,"0")+chunk[i].toString(16).padStart(2,"0"),16))
            // }
        })
        req.on("end",function(){
            resolve(data);
        })
    })
}

function router(type,req,res){
    switch(type){
        case "/signUp":
        return signup(req,res);
        case "/signIn":
        return signIn(req,res);
        case "/selectAll":
        return selectAll(req,res);
    }
}
async function signup(req,res){
    var data=await getData(req);
    try{
        data=JSON.parse(data);
    }catch(e){};
    if(!Array.isArray(data)){
        return res.end(JSON.stringify({result:false}));
    }
    var result=await insertDB(data);
    res.end(JSON.stringify({result}));
}

async function signIn(req,res){
    var data=await getData(req);
    var result=await selectItem(JSON.parse(data));
    res.end(JSON.stringify({result}));
}

async function selectAll(req,res){
    var data=await getData(req);
    res.end(JSON.stringify({a:1,b:2}));
}
