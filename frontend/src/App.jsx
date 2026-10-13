import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Cart from './pages/Cart.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const { count } = useCart();
  return (
    <>
      <header className="nav">
        <Link to="/" className="logo">☕ Bean &amp; Brew</Link>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart{count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<p className="center">Page not found.</p>} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Bean &amp; Brew Cafe · Mini project built with React, Node.js &amp; MongoDB
      </footer>
    </>
  );
}
