// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center'
  };
  const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '0.5rem'
  };

  return (
    <div>
      <h3>Your Products</h3>
      <div style={gridStyle}>
        {products.map(p => (
          <div key={p._id} style={cardStyle}>
            <strong>{p.name}</strong>
            <p>₹{p.price}</p>
            {p.image && <img src={p.image} alt={p.name} width="100%" style={{ borderRadius: '5px' }} />}
            <button style={deleteButtonStyle} onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
