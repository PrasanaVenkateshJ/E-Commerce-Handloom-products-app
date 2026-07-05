// src/components/ArtisanDashboard.jsx
import React, { useState } from 'react';
import UploadProduct from './UploadProduct';
import ProductList from './ProductList';

const ArtisanDashboard = () => {
  const [view, setView] = useState('upload');

  const containerStyle = { padding: '2rem', fontFamily: 'Arial, sans-serif' };
  const navStyle = { marginBottom: '1rem' };
  const buttonStyle = {
    marginRight: '0.5rem',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#ff6f61',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      <h2>Welcome to Artisan Dashboard</h2>
      <div style={navStyle}>
        <button style={buttonStyle} onClick={() => setView('upload')}>Upload Product</button>
        <button style={buttonStyle} onClick={() => setView('list')}>View Products</button>
      </div>

      {view === 'upload' && <UploadProduct onUploaded={() => setView('list')} />}
      {view === 'list' && <ProductList />}
    </div>
  );
};

export default ArtisanDashboard;
