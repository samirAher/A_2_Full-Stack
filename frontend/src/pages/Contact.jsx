import { useState } from 'react';
import { sendMessage } from '../api.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendMessage(form);
      setStatus({ type: 'ok', text: res.message });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <section className="section narrow">
      <h2>Contact Us</h2>
      <div className="card">
        <p>📍 12 Coffee Street, Your City</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ hello@beanandbrew.example</p>
      </div>

      <form className="card form" onSubmit={submit}>
        <h3>Send us a message</h3>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" value={form.message} onChange={onChange} required />
        </label>
        {status.text && <p className={status.type === 'ok' ? 'success' : 'error'}>{status.text}</p>}
        <button className="btn">Send message</button>
      </form>
    </section>
  );
}
