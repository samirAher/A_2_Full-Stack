const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  -> price is always calculated on the server from the DB
router.post('/', async (req, res, next) => {
  try {
    const { customerName, phone, address, orderType, items } = req.body;
    if (!customerName || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }
    if (!/^\d{10}$/.test(String(phone).trim())) {
  return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
}
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    if (orderType === 'Delivery' && !address) {
      return res.status(400).json({ message: 'Address is required for delivery' });
    }

    const ids = items.map((i) => i.product);
    const products = await Product.find({ _id: { $in: ids }, available: true });
    const byId = new Map(products.map((p) => [String(p._id), p]));

    const orderItems = [];
    let total = 0;
    for (const item of items) {
      const p = byId.get(String(item.product));
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);
      if (!p) return res.status(400).json({ message: 'An item in your cart is unavailable' });
      orderItems.push({ product: p._id, name: p.name, price: p.price, qty });
      total += p.price * qty;
    }

    const order = await Order.create({
      customerName,
      phone,
      address,
      orderType,
      items: orderItems,
      total,
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders  (simple admin view, newest first)
router.get('/', async (req, res, next) => {
  try {
    res.json(await Order.find().sort({ createdAt: -1 }).limit(100));
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
