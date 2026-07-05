import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './UserDashboard.css'; // Import CSS

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'shop') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/orders',
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed!');
      setCart([]);
      localStorage.removeItem('cart');
    } catch (err) {
      alert('Checkout failed');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, User!</h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === 'shop' ? 'active' : ''}
          onClick={() => setActiveTab('shop')}
        >
          🛍 Shop
        </button>
        <button
          className={activeTab === 'cart' ? 'active' : ''}
          onClick={() => setActiveTab('cart')}
        >
          🛒 Cart
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
      </div>

      {/* SHOP */}
      {activeTab === 'shop' && (
        <div>
          <h3>Available Products</h3>
          <div className="product-grid">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">₹{product.price}</p>
                  <button onClick={() => addToCart(product)}>🛒 Add to Cart</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CART */}
      {activeTab === 'cart' && (
        <div>
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item._id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-details">
                      <strong>{item.name}</strong>
                      <span>₹{item.price} x {item.quantity}</span>
                      <div className="cart-buttons">
                        <button onClick={() => updateQuantity(item._id, -1)} disabled={item.quantity === 1}>➖</button>
                        <button onClick={() => updateQuantity(item._id, 1)}>➕</button>
                        <button onClick={() => removeFromCart(item._id)} className="remove-btn">❌ Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <h4 className="total">
                Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </h4>
              <button className="checkout-btn" onClick={handleCheckout}>✅ Checkout</button>
            </div>
          )}
        </div>
      )}

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div>
          <h3>Your Orders</h3>
          {orders.length === 0 ? (
            <p>No orders placed.</p>
          ) : (
            <ul className="order-list">
              {orders.map((order) => (
                <li key={order._id} className="order-card">
                  <strong>Order ID:</strong> {order._id} <br />
                  <strong>Status:</strong> {order.status}
                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.name} - ₹{item.price} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
