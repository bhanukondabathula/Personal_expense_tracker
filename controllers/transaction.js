const db = require('../db');

// Get all transactions for a specific user
exports.getAllTransactions = (req, res) => {
  const userId = req.user.userId;
  const query = 'SELECT * FROM transactions WHERE user_id = ?';
  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get a single transaction by ID
exports.getTransactionById = (req, res) => {
  const transactionId = req.params.id;
  const userId = req.user.userId;
  const query = 'SELECT * FROM transactions WHERE id = ? AND user_id = ?';
  db.get(query, [transactionId, userId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(row);
  });
};

// Add a new transaction
exports.addTransaction = (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const userId = req.user.userId;

  const query = `INSERT INTO transactions (type, category, amount, date, description, user_id)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [type, category, amount, date, description, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Transaction added successfully', id: this.lastID });
  });
};

// Update a transaction by ID
exports.updateTransaction = (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const transactionId = req.params.id;
  const userId = req.user.userId;

  const query = `UPDATE transactions
                 SET type = ?, category = ?, amount = ?, date = ?, description = ?
                 WHERE id = ? AND user_id = ?`;
  db.run(query, [type, category, amount, date, description, transactionId, userId], function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ error: 'Transaction not found or not updated' });
    }
    res.json({ message: 'Transaction updated successfully' });
  });
};

// Delete a transaction by ID
exports.deleteTransaction = (req, res) => {
  const transactionId = req.params.id;
  const userId = req.user.userId;

  const query = 'DELETE FROM transactions WHERE id = ? AND user_id = ?';
  db.run(query, [transactionId, userId], function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  });
};

// Get summary of transactions (total income, total expenses)
exports.getSummary = (req, res) => {
  const userId = req.user.userId;
  const query = `SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ? GROUP BY type`;
  
  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const summary = rows.reduce((acc, row) => {
      acc[row.type] = row.total;
      return acc;
    }, {});

    summary.balance = (summary.income || 0) - (summary.expense || 0);
    res.json(summary);
  });
};
