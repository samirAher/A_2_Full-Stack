import { Link } from 'react-router-dom';

const features = [
  { icon: '🌱', title: 'Freshly roasted', text: 'Single-origin beans roasted in small batches every week.' },
  { icon: '🥐', title: 'Baked daily', text: 'Croissants, muffins and brownies made fresh each morning.' },
  { icon: '🚀', title: 'Order ahead', text: 'Place your order online and pick it up without waiting.' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Welcome to Bean &amp; Brew</p>
          <h1>Great coffee,<br />made with care.</h1>
          <p>
            A cozy corner for coffee lovers. Browse our menu, add your favourites to the cart and
            order in just a few clicks.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn">Order now</Link>
            <Link to="/contact" className="btn btn-ghost">Visit us</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">☕</div>
      </section>

      <section className="section">
        <h2>Why you'll love us</h2>
        <div className="grid3">
          {features.map((f) => (
            <div className="card feature" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section hours">
        <h2>Opening hours</h2>
        <p>Mon – Fri: 7:00 AM – 10:00 PM</p>
        <p>Sat – Sun: 8:00 AM – 11:00 PM</p>
      </section>
    </>
  );
}
