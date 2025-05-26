const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 8080;

//Health check endpoint
app.get('/_health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Test DB connection
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => { // Tambahkan '0.0.0.0'
  console.log(`Server running on port ${PORT}`);
  // Test database connection
  pool.query('SELECT 1')
    .then(() => console.log('Database connected'))
    .catch(err => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
});
