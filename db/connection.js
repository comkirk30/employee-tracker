const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PPi83cmk1!!17',
  database: 'employee_tracker'
});

module.exports = db;