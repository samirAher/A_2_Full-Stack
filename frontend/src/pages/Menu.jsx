import { useEffect, useState } from 'react';
import { getProducts } from '../api.js';
import { useCart } from '../CartContext.jsx';

const categories = ['All', 'Coffee', 'Tea', 'Cold Drinks', 'Snacks', 'Desserts'];

export default function Menu() {
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    setLoading(true);
    setError('');
    getProducts(category)
      .then(setProducts)
      .catch(() => setError('Could not load the menu. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [category]);

  const handleAdd = (p) => {
    add(p);
    setJustAdded(p._id);
    setTimeout(() => setJustAdded(null), 800);
  };

  return (
    <section className="section">
      <h2>Our Menu</h2>
      <div className="tabs">
        {categories.map((c) => (
          <button key={c} className={c === category ? 'tab active' : 'tab'} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="center">Loading menu…</p>}
      {error && <p className="error center">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="center">No items yet. Run <code>npm run seed</code> in the backend.</p>
      )}

      <div className="grid">
        {products.map((p) => (
          <div className="card product" key={p._id}>
            <div className="product-icon">{p.icon}</div>
            <h3>{p.name}</h3>
            <p className="muted">{p.description}</p>
            <div className="product-foot">
              <strong>₹{p.price}</strong>
              <button className="btn btn-small" onClick={() => handleAdd(p)}>
                {justAdded === p._id ? 'Added ✓' : 'Add'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
