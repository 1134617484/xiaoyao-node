//db.js


/**
 * 由管理员于2018/5/7创建。
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // 使用链接
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;