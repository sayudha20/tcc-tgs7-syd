const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

// Test DB connection
pool.query('SELECT 1')
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });