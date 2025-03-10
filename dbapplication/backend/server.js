const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware for handling JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

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
  age INTEGER,
  country TEXT
)`);

// Create a new user (Create)
app.post('/users', (req, res) => {
  const { name, age, country } = req.body;
  if (!name || !age || !country) {
    return res.status(400).json({ error: 'Name, age, and country are required' });
  }

  const query = `INSERT INTO users (name, age, country) VALUES (?, ?, ?)`;
  db.run(query, [name, age, country], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, age, country });
  });
});

// Read all users (Read)
app.get('/users', (req, res) => {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Update a user (Update)
app.put('/users/:id', (req, res) => {
  const { name, age, country } = req.body;
  const { id } = req.params;

  if (!name && !age && !country) {
    return res.status(400).json({ error: 'At least one field (name, age, country) must be provided for update' });
  }

  let query = `UPDATE users SET `;
  let params = [];
  if (name) {
    query += `name = ?, `;
    params.push(name);
  }
  if (age) {
    query += `age = ?, `;
    params.push(age);
  }
  if (country) {
    query += `country = ? `;
    params.push(country);
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
// Update a user (Update)
app.put('/users/:id', (req, res) => {
  const { name, age, country } = req.body;
  const { id } = req.params;

  if (!name && !age && !country) {
    return res.status(400).json({ error: 'At least one field (name, age, country) must be provided for update' });
  }

  let query = `UPDATE users SET `;
  let params = [];
  if (name) {
    query += `name = ?, `;
    params.push(name);
  }
  if (age) {
    query += `age = ?, `;
    params.push(age);
  }
  if (country) {
    query += `country = ? `;
    params.push(country);
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
