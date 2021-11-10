var http = require("http")
const {db} = require("./sql")
const {insertDB} = require("./sql")
const {selectAll} = require("./sql")

http.createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    // let arr = ["xiet", "xiexi", "谢天", "男", 27, "18888888666", "123123@163.com"]
    // let bool =  await insertDB(arr)
    // res.end(bool ? "success" : "failed")

    let result = await selectAll()
    if (!result) {
        res.end("未查询到数据")
        return
    }

    res.write("<table>")
    res.write("<tr><th>用户名</th><th>姓名</th><th>性别</th><th>年龄</th><th>电话</th><th>邮箱</th></tr>")
    for (let i = 0; i < result.length; i++) {
        res.write("<tr>")
        for (let key in result[i]) {
            if (/^pid$|^password$/.test(key)) continue
            res.write(`<td>"${result[i][key]}"</td>`)
        }
        res.write("</tr>")
    }
    res.write("</table>")

}).listen(8081)