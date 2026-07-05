// src/components/UploadProduct.jsx
import React, { useState } from 'react';
import axios from '../api/axios';

const UploadProduct = ({ onUploaded }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const inputStyle = { display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' };
  const buttonStyle = {
    backgroundColor: '#ff6f61',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/products/upload', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product uploaded!');
      setForm({ name: '', description: '', price: '', image: '' });
      if (onUploaded) onUploaded();
    } catch (err) {
      alert(err?.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload New Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <button style={buttonStyle} type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadProduct;
