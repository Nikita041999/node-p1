const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_p1",
  password: "root@123",
});

module.exports = pool.promise();
