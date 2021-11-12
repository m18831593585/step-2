const mysql = require('mysql');
let connection
init()

function init() {
    connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'game'
    });
    connectSQL()

}

function connectSQL() {
    return new Promise(resolve => {
        connection.connect(err => {
            if (err) resolve(false)
            else resolve(true)
        })
    })
}
