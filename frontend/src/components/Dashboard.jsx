// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState('');

  const fetchArtisans = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/admin/unapproved-artisans', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArtisans(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch artisans or not authorized');
    }
  };

  const approveArtisan = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/admin/approve-artisan/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArtisans(prev => prev.filter(a => a._id !== id));
      alert('Artisan approved!');
    } catch (err) {
      console.error(err);
      alert('Approval failed');
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '50px',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
        width: '600px'
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: '#333',
          borderBottom: '2px solid #ff9a9e',
          paddingBottom: '8px'
        }}>Admin Dashboard</h2>

        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

        {artisans.length === 0 ? (
          <p style={{ color: '#555' }}>No pending artisan requests.</p>
        ) : (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {artisans.map(artisan => (
              <li key={artisan._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff8e1',
                padding: '12px 15px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.05)'
              }}>
                <span>
                  <strong>{artisan.name}</strong>  
                  <br />
                  <span style={{ fontSize: '0.9em', color: '#777' }}>{artisan.email}</span>
                </span>
                <button
                  onClick={() => approveArtisan(artisan._id)}
                  style={{
                    background: '#ff6f61',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: '0.3s',
                    fontWeight: '500'
                  }}
                  onMouseOver={e => e.target.style.background = '#ff6f61'}
                  onMouseOut={e => e.target.style.background = '#ff6f61'}
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
