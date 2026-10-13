import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { placeOrder } from '../api.js';

export default function Cart() {
  const { items, setQty, remove, clear, total } = useCart();
  const [form, setForm] = useState({ customerName: '', phone: '', orderType: 'Pickup', address: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const order = await placeOrder({
        ...form,
        items: items.map((i) => ({ product: i._id, qty: i.qty })),
      });
      setPlaced(order);
      clear();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <section className="section narrow center">
        <div className="card">
          <h2>Order placed! 🎉</h2>
          <p>Thanks, {placed.customerName}. Your order total is <strong>₹{placed.total}</strong>.</p>
          <p className="muted">Order ID: {placed._id}</p>
          <Link to="/menu" className="btn">Order more</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section narrow center">
        <h2>Your cart is empty</h2>
        <Link to="/menu" className="btn">Browse the menu</Link>
      </section>
    );
  }

  return (
    <section className="section narrow">
      <h2>Your Cart</h2>
      <div className="card">
        {items.map((i) => (
          <div className="cart-row" key={i._id}>
            <span className="cart-name">{i.icon} {i.name}</span>
            <div className="qty">
              <button onClick={() => setQty(i._id, i.qty - 1)} aria-label="Decrease">−</button>
              <span>{i.qty}</span>
              <button onClick={() => setQty(i._id, i.qty + 1)} aria-label="Increase">+</button>
            </div>
            <span className="cart-price">₹{i.price * i.qty}</span>
            <button className="link-btn" onClick={() => remove(i._id)}>Remove</button>
          </div>
        ))}
        <div className="cart-total">
          <span>Total</span>
          <strong>₹{total}</strong>
        </div>
      </div>

      <form className="card form" onSubmit={submit}>
        <h3>Checkout</h3>
        <label>
          Name
          <input name="customerName" value={form.customerName} onChange={onChange} required />
        </label>
        <label>
  Phone (10 digits)
  <input
    name="phone"
    type="tel"
    inputMode="numeric"
    maxLength={10}
    pattern="\d{10}"
    title="Enter Mobile No:"
    placeholder=""
    value={form.phone}
    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
    required
  />
</label>
        <label>
          Order type
          <select name="orderType" value={form.orderType} onChange={onChange}>
            <option>Pickup</option>
            <option>Delivery</option>
          </select>
        </label>
        {form.orderType === 'Delivery' && (
          <label>
            Address
            <textarea name="address" rows="3" value={form.address} onChange={onChange} required />
          </label>
        )}
        {error && <p className="error">{error}</p>}
        <button className="btn" disabled={submitting}>
          {submitting ? 'Placing order…' : `Place order · ₹${total}`}
        </button>
      </form>
    </section>
  );
}
