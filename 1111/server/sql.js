const mysql = require("mysql");
var db;
init();

async function init() {
    db = mysql.createPool({
        url: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "game"
    });
    // if (!await isConnect()) return;
    // console.log("数据库连接成功!");
}

function isConnect() {
    return new Promise(function (resolve, reject) {
        db.connect(function (err) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

function insertDB(arr) {
    return new Promise(function (resolve, reject) {
        var sqlStr = "INSERT INTO `user`(`user`, `password`, `name`, `sex`, `age`, `tel`, `email`) VALUES (?,?,?,?,?,?,?)";
        db.query(sqlStr, arr, function (err, res) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

function selectItem(data) {
    return new Promise(function (resolve, reject) {
        var str = Object.keys(data).reduce((v, t, i) => {
            return v + "`" + t + "`='" + data[t] + "'" + (i === 0 ? "AND" : "");
        }, "SELECT * FROM `user` WHERE ")
        console.log(str)
        db.query(str, function (err, res) {
            resolve(err ? false : true);
        })
    })
}

function selectAll() {
    return new Promise(function (resolve, reject) {
        db.query("SELECT * FROM `user` WHERE 1", function (err, res) {
            if (err) {
                console.log(err);
                resolve(false);
            } else {
                resolve(res);
            }
        })
    })
}

exports.db = db;
exports.insertDB = insertDB;
exports.selectAll = selectAll;
exports.selectItem = selectItem;
