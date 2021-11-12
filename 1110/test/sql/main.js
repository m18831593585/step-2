let http = require("http")
let {getUserById, getUserBySex, updateUserTelById, insertUser} = require("./sql")

http.createServer(async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8;"
    })


    console.log(await getUserById(1))
    // console.log(await getUserBySex("男"))
    // console.log(await updateUserTelById(1, "15555555556") ? "修改成功" : "修改失败")
    console.log(await insertUser(["wangwu", "slfsefsse", "王五", "男", 10, "15555555556", "wangwu@gmail.com"]))


    res.end()
}).listen(8080)