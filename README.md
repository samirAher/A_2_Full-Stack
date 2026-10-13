# Bean & Brew – Coffee Shop Website (MERN)

A mini project built with **React** (Vite), **Node.js + Express** and **MongoDB (Mongoose)**.

## Features
- Home page, Menu with category filter, Contact page
- Shopping cart (saved in localStorage) with quantity controls
- Checkout: pickup or delivery order saved in MongoDB
- Order total is calculated on the server from database prices
- Contact form messages saved in MongoDB
- REST API for products, orders and messages

## Folder structure
```
coffee-shop/
├── backend/   Express API + MongoDB models
└── frontend/  React app (Vite)
```

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Run it

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env     # edit MONGO_URI if using Atlas
npm run seed             # adds sample menu items
npm run dev              # API on http://localhost:5000
```

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev              # app on http://localhost:5173
```

## API endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products?category=Coffee | List menu items |
| POST | /api/products | Add menu item |
| PUT / DELETE | /api/products/:id | Update / delete item |
| POST | /api/orders | Place an order |
| GET | /api/orders | List orders |
| PATCH | /api/orders/:id/status | Update order status |
| POST | /api/contact | Save contact message |

## Ideas to extend (for extra marks)
- User login/signup with JWT
- Admin dashboard to manage products and orders
- Online payment (Razorpay/Stripe)
- Product images and search
