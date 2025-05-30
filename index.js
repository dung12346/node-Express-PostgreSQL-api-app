const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Kết nối PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render cung cấp biến này
  ssl: {
    rejectUnauthorized: false
  }
});

// API: GET /
app.get('/', (req, res) => {
  res.send('Welcome to Node.js API on Render!');
});

// API: GET /users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
