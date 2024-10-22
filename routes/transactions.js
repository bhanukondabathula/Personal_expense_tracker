const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
} = require('../controllers/transaction');

router.get('/', authenticateToken, getAllTransactions);
router.get('/:id', authenticateToken, getTransactionById);
router.post('/', authenticateToken, addTransaction);
router.put('/:id', authenticateToken, updateTransaction);
router.delete('/:id', authenticateToken, deleteTransaction);
router.get('/summary', authenticateToken, getSummary);

module.exports = router;
