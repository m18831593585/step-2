var http=require("http");
var querystring=require("querystring");
http.createServer(function(req,res){
    var obj=querystring.parse(req.url.split("?")[1]);
    console.log(obj)
    var data={a:1,b:2};
    res.end(`${obj.callback}(${JSON.stringify(data)})`);
}).listen(4050);