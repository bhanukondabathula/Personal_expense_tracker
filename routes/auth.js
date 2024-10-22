const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key_here';

// Signup route
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Server error' });

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.run(query, [email, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ error: 'User already exists' });
      }
      res.json({ message: 'User created successfully' });
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
