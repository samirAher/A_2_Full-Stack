async function request(url, options) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const getProducts = (category = 'All') =>
  request(`/api/products?category=${encodeURIComponent(category)}`);

export const placeOrder = (order) =>
  request('/api/orders', { method: 'POST', body: JSON.stringify(order) });

export const sendMessage = (msg) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(msg) });
