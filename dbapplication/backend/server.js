const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware for handling JSON requests
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create table if it doesn’t exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  course TEXT
)`);

// Create a new user (Create)
app.post('/users', (req, res) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course) {
    return res.status(400).json({ error: 'Name, email, and course are required' });
  }

  const query = `INSERT INTO users (name, email, course) VALUES (?, ?, ?)`;
  db.run(query, [name, email, course], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, course });
  });
});

// Fetch all users (Read)
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update a user (Update)
app.put('/users/:id', (req, res) => {
  const { name, email, course } = req.body;
  const { id } = req.params;

  if (!name && !email && !course) {
    return res.status(400).json({ error: 'At least one field (name, email, course) must be provided for update' });
  }

  let query = `UPDATE users SET `;
  let params = [];
  if (name) {
    query += `name = ?, `;
    params.push(name);
  }
  if (email) {
    query += `email = ?, `;
    params.push(email);
  }
  if (course) {
    query += `course = ? `;
    params.push(course);
  }
  query += `WHERE id = ?`;
  params.push(id);

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete a user (Delete)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});