const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Coffee', 'Tea', 'Cold Drinks', 'Snacks', 'Desserts'],
      required: true,
    },
    icon: { type: String, default: '☕' },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
