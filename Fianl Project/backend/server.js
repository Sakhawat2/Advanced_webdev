const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite Database Setup
const db = new sqlite3.Database('./database/expense_tracker.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);
});

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API!');
});

// Register user
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.run(query, [name, email, password], function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(409).json({ message: 'Email already exists' });
      } else {
        res.status(500).json({ message: 'Error registering user', error: err });
      }
    } else {
      res.status(201).json({ message: 'User registered successfully!', id: this.lastID });
    }
  });
});

// Add expense
app.post('/api/expenses', (req, res) => {
  const { userId, amount, date, category, description } = req.body;

  const query = `INSERT INTO expenses (userId, amount, date, category, description) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [userId, amount, date, category, description], function (err) {
    if (err) {
      res.status(500).json({ message: 'Error adding expense', error: err });
    } else {
      res.status(201).json({ message: 'Expense added successfully!', id: this.lastID });
    }
  });
});

// View expenses
app.get('/api/expenses/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `SELECT * FROM expenses WHERE userId = ?`;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching expenses', error: err });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Delete expense
app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM expenses WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ message: 'Error deleting expense', error: err });
    } else {
      res.status(200).json({ message: 'Expense deleted successfully!' });
    }
  });
});


// login user
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.get(query, [email, password], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error logging in', error: err });
    } else if (row) {
      res.status(200).json({ message: 'Login successful!', user: row });
    } else {
      res.status(404).json({ message: 'Invalid credentials' });
    }
  });
});

// Update expense

app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { amount, date, category, description } = req.body;

  const query = `UPDATE expenses SET amount = ?, date = ?, category = ?, description = ? WHERE id = ?`;
  db.run(query, [amount, date, category, description, id], function (err) {
    if (err) {
      res.status(500).json({ message: 'Error updating expense', error: err });
    } else {
      res.status(200).json({ message: 'Expense updated successfully!' });
    }
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
