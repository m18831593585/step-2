const mysql = require('mysql')

init()
var db

function init() {
    db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'collect'
    })
}

function judgeURL(url) {
    return new Promise((resolve, reject) => {
        let str = "SELECT * FROM `data` WHERE url =?"
        db.query(str, [url], (err, data) => {
            console.log(data)
            if (data) {
                // console.log(data, Boolean(data))
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

function judgeName(name){
    return new Promise(resolve => {
        let str = "SELECT * FROM `data` WHERE `name`=?"
        db.query(str, [name], (err, data) => {
            if (data) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

function insertData(values) {
    if (!Array.isArray(values)) return "数据不为数组"
    if (values.length !== 2) return "数据长度不合法"
    if (typeof values[0] !== "string" || typeof values[1] !== "string") return "数据类型不合法"

    return new Promise((resolve, reject) => {
        let str = "INSERT INTO `data` (`name`, `url`) VALUES (?,?)"
        db.query(str, values, err => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

function selectAll() {
    return new Promise(resolve => {
        let str = "SELECT * FROM `data`"
        db.query(str, (err, data) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(data)
            }
        })
    })
}

exports.insertData = insertData
exports.selectAll = selectAll
exports.judgeURL = judgeURL
exports.judgeName = judgeName