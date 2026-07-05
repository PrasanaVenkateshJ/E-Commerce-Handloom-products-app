const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items } = req.body;

    const newOrder = new Order({
      user: userId,
      items,
      status: 'Pending'
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
