const mysql = require("mysql")

let db

init()

async function init() {
    db = mysql.createConnection({
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "root",
        "database": "game"
    })

    if (await connectSql()) console.log("Connected to Mysql")
    else console.log("Failed to connect to Mysql")
}

function connectSql() {
    return new Promise((resolve, reject) => {
        db.connect(err => {
            if (err) resolve(false)
            else resolve(true)
        })
    })
}


function getUserById(id) {
    let str = "SELECT * FROM `user` WHERE `pid`=?"
    let arr = [id]
    return new Promise((resolve, reject) => {
        db.query(str, arr, (err, result) => {
            if (err) {
                resolve(false)
            } else {
                resolve(result)
            }
        })
    })
}

function getUserBySex(sex) {
    let str = "SELECT * FROM `user` WHERE `sex`=?"
    let arr = [sex]
    return new Promise(resolve => {
        db.query(str, arr, (err, result) => {
            if (err) resolve(false)
            else resolve(result)
        })
    })
}

function updateUserTelById(id, tel) {
    return new Promise((resolve, reject) => {
        let str = "UPDATE `user` SET `tel`=? WHERE `pid`=?"
        let arr = [tel, id]
        db.query(str, arr, err => {
            if (err) reject(false)
            else reject(true)
        })
    })
}

function insertUser(arr) {
    return new Promise(resolve => {
        let str = "INSERT INTO `user` (`user`, `password`, `name`, `sex`, `age`, `tel`, `email`) VALUES (?)"
        db.query(str, [arr], err => {
            if (err) {
                console.log(err)
                resolve(false)
            }
            else resolve(true)
        })
    })
}

exports.getUserById = getUserById
exports.getUserBySex = getUserBySex
exports.updateUserTelById = updateUserTelById
exports.insertUser = insertUser