import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      alert('Failed to load orders');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/admin/orders/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert('Status update failed');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>📦 All Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <p><strong>User:</strong> {order.userId.name} ({order.userId.email})</p>
          <p><strong>Status:</strong> {order.status}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.productId}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
