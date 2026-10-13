require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Espresso', category: 'Coffee', price: 120, icon: '☕', description: 'Rich, bold single shot pulled fresh.' },
  { name: 'Cappuccino', category: 'Coffee', price: 180, icon: '☕', description: 'Espresso with steamed milk and thick foam.' },
  { name: 'Caffe Latte', category: 'Coffee', price: 190, icon: '🥛', description: 'Smooth espresso with silky steamed milk.' },
  { name: 'Mocha', category: 'Coffee', price: 210, icon: '🍫', description: 'Espresso, chocolate and steamed milk.' },
  { name: 'Filter Coffee', category: 'Coffee', price: 90, icon: '☕', description: 'Classic South Indian style filter coffee.' },
  { name: 'Masala Chai', category: 'Tea', price: 80, icon: '🍵', description: 'Spiced milk tea brewed with ginger and cardamom.' },
  { name: 'Green Tea', category: 'Tea', price: 100, icon: '🍃', description: 'Light and refreshing with a hint of lemon.' },
  { name: 'Iced Coffee', category: 'Cold Drinks', price: 170, icon: '🧊', description: 'Cold brewed coffee over ice.' },
  { name: 'Cold Coffee Frappe', category: 'Cold Drinks', price: 220, icon: '🥤', description: 'Blended coffee with ice cream.' },
  { name: 'Lemon Iced Tea', category: 'Cold Drinks', price: 130, icon: '🍋', description: 'Chilled black tea with fresh lemon.' },
  { name: 'Butter Croissant', category: 'Snacks', price: 110, icon: '🥐', description: 'Flaky, buttery and baked every morning.' },
  { name: 'Veg Sandwich', category: 'Snacks', price: 140, icon: '🥪', description: 'Grilled sandwich with fresh veggies and cheese.' },
  { name: 'Chocolate Brownie', category: 'Desserts', price: 150, icon: '🍰', description: 'Warm, fudgy brownie with chocolate chunks.' },
  { name: 'Blueberry Muffin', category: 'Desserts', price: 120, icon: '🧁', description: 'Soft muffin packed with blueberries.' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coffeeshop');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
