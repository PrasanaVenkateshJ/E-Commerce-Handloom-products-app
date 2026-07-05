const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const Order = require('../models/Order');

const {
  getUnapprovedArtisans,
  approveArtisan,
} = require('../controllers/adminController');

// 🛡️ Protected admin routes
router.get('/unapproved-artisans', verifyToken, adminOnly, getUnapprovedArtisans);
router.put('/approve-artisan/:id', verifyToken, adminOnly, approveArtisan);

// Get all orders
router.get('/orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
