const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');

router.get('/', async (req, res) => {
  try {
    const summary = await Summary.findOne(); // Assuming single summary document
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

module.exports = router;