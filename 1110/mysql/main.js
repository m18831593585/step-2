var http=require("http");
const {insertDB,selectAll}=require("./sql");
http.createServer(async(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })
//     var arr=['xie12','xie1234','李四','男',21,'18766542340','19876232@qq.com'];
//    var bool=await insertDB(arr)
//    res.end(bool ? "插入成功" : "插入失败");
    var result=await selectAll();
    if(!result){
        res.end("没有查到数据");
        return;
    }
    res.write(`<style>
    table{
        border-collapse: collapse;
        width: 1200px;
    }
    th,td{
        border: 1px solid #000;
    }
</style>`)
    res.write("<table>");
    res.write("<tr><th>用户名</th><th>姓名</th><th>性别</th><th>年龄</th><th>电话</th><th>邮箱</th></tr>");
    for(var i=0;i<result.length;i++){
        res.write("<tr>");
        for(var key in result[i]){
            if(/^pid$|^password$/.test(key)) continue;
            res.write(`<td>${result[i][key]}</td>`)
        }
        res.write("</tr>")
    }
    res.write("</table>");
    res.end();
}).listen(4020);