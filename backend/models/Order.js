const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: {
  type: String,
  required: true,
  trim: true,
  match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
},
    address: { type: String, default: '' },
    orderType: { type: String, enum: ['Pickup', 'Delivery'], default: 'Pickup' },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Placed', 'Preparing', 'Ready', 'Completed'],
      default: 'Placed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
