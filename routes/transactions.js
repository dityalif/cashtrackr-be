const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Summary = require('../models/Summary');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, date, amount } = req.body;

    // Save the transaction
    const transaction = new Transaction({ name, category, date, amount });
    await transaction.save();

    // Update the summary
    const summary = await Summary.findOne();
    if (summary) {
      summary.balance += amount; // Update balance
      if (amount < 0) {
        summary.totalExpense += Math.abs(amount); // Add to totalExpense
      } else {
        summary.totalIncome += amount; // Add to totalIncome
      }
      summary.transactionCount += 1; // Increment transaction count
      await summary.save();
    }

    res.status(201).json({ message: 'Transaction added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus transaksi berdasarkan ID
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Perbarui ringkasan (summary)
    const summary = await Summary.findOne();
    if (summary) {
      summary.balance -= transaction.amount; // Kurangi balance
      if (transaction.amount < 0) {
        summary.totalExpense -= Math.abs(transaction.amount); // Kurangi totalExpense
      } else {
        summary.totalIncome -= transaction.amount; // Kurangi totalIncome
      }
      summary.transactionCount -= 1; // Kurangi jumlah transaksi
      await summary.save();
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

module.exports = router;