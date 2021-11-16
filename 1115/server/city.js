const http=require("http");
const cityData=require("./cityData");
http.createServer(async function(req,res){
    var type=req.url.split("?")[0];
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin":"*",
    })
    router(type,req,res)


}).listen(4020);

function getData(req){
    return new Promise(function(resolve,reject){
        var data="";
        req.on("data",function(chunk){
            data+=chunk;
        })
        req.on("end",function(){
            resolve(data);
        })
    })
}

function router(type,req,res){
    switch(type){
        case "/province":
            return getProvince(req,res);
        case "/city":
            return getCity(req,res);
        case "/county":
            return getCounty(req,res);
    }
}

async function  getProvince(req,res){
    res.end(JSON.stringify( cityData["86"]));
}

async function  getCity(req,res){
    var data=await  getData(req);
    data=JSON.parse(data);
    res.end(JSON.stringify(cityData[data.provinceId]));
}
async function  getCounty(req,res){
    var data=await getData(req);
    data=JSON.parse(data);
    res.end(JSON.stringify(cityData[data.cityId]));
}