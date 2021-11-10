const mysql = require("mysql")
var db

init()

async function init() {
    db = mysql.createConnection({
        url: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "game"
    })
    if (!await isConnected()) return
    console.log("Connected to database")
}

function isConnected() {
    return new Promise((resolve, reject) => {
        db.connect(function (err) {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

function insertDB(arr) {
    return new Promise((resolve, reject) => {
        let sqlStr = "INSERT INTO `user` (`user`, `password`, `name`, `sex`, `age`, `tel`, `email`) VALUES (?,?,?,?,?,?,?)"
        db.query(sqlStr, arr, function (err, res) {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

function selectAll(){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `user` WHERE 1", function (err,res){
            if (err) {
                resolve(false)
            } else {
                resolve(res)
            }
        })
    })
}

exports.db = db
exports.insertDB = insertDB
exports.selectAll = selectAll