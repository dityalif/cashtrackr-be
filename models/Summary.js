const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  totalIncome: { type: Number, required: true },
  totalExpense: { type: Number, required: true },
  transactionCount: { type: Number, required: true },
});

module.exports = mongoose.model('Summary', summarySchema);