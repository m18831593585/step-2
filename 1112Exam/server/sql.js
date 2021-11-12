const mysql = require("mysql");
let db;
init();

async function init() {
    db = mysql.createPool({
        url: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "1112"
    });
}

function insertDB(arr) {
    return new Promise(function (resolve, reject) {
        let sqlStr = "INSERT INTO `user`(`user`,`sex`, `age`, `hobby`, `tel`) VALUES (?,?,?,?,?)";
        db.query(sqlStr, arr, function (err, res) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

function selectPersonBySex(sex) {
    return new Promise(function (resolve, reject) {
        let str = "SELECT * FROM `user` WHERE `sex`=?"
        sex = [sex]
        db.query(str, sex, (err, result) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(result)
            }
        })
    })
}

function deleteItemById(id) {
    return new Promise(function (resolve, reject) {
        let str = "DELETE FROM `user` WHERE `id`=?"
        id = [id]
        db.query(str, id, (err) => {
            if (err) {
                console.log(err)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

exports.db = db;
exports.insertDB = insertDB;
exports.selectPersonBySex = selectPersonBySex;
exports.deleteItemById = deleteItemById;
