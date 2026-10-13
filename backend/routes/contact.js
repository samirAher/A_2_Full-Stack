const router = require('express').Router();
const Message = require('../models/Message');

router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    await Message.create({ name, email, message });
    res.status(201).json({ message: 'Thanks! We will get back to you soon.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
