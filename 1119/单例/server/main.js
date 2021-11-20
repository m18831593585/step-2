const http=require("http");
var arr=["a","b","c","d","e"];
const querystring=require("querystring");
http.createServer(async function(req,res){ 
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin":"*",
    })
  
    res.end(JSON.stringify(arr));
   
}).listen(4020);

