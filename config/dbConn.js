const mysql = require("mysql2");

// Connect to MySQL
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "bsghd1ohgovjblcstago-mysql.services.clever-cloud.com",
  user: "uu421pflxkdpnfje",
  password: "KbFysvS34GyqdHLCOX6x",
  database: "bsghd1ohgovjblcstago",
  port: "3306",
});

module.exports = pool.promise();
