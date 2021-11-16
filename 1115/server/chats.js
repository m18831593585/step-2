const http=require("http");
const msgList=[];
const querystring=require("querystring");
http.createServer(async function(req,res){

    var type=req.url.split("?")[0];
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
    router(type,req,res)
}).listen(4030);

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
        case "/send":
        return sendMsg(req,res);
        case "/":
        return getMsg(req,res);
    }
}
async function sendMsg(req,res){
    var data=await getData(req);
    try{
        data=JSON.parse(data);
    }catch(e){};
    msgList.push(data);
    res.end(JSON.stringify({result:true}))
}

function getMsg(req,res){
    res.end(JSON.stringify(msgList));
}
