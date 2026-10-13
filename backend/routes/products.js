const router = require('express').Router();
const Product = require('../models/Product');

// GET /api/products?category=Coffee
router.get('/', async (req, res, next) => {
  try {
    const filter = { available: true };
    if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
    const products = await Product.find(filter).sort({ category: 1, name: 1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// POST /api/products  (add a new menu item)
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
