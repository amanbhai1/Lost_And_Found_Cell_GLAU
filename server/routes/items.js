const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');

// Get single item details
router.get('/getItemDetails/:id', async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router; 