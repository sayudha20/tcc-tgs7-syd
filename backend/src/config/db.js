const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Error Handling 
pool.getConnection((err, connection) => {
  if (err) {
    console.log('Database connection failed:', err)
    process.exit(1);
  }
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;
