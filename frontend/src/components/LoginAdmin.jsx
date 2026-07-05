// src/components/LoginAdmin.jsx
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    try {
      const res = await axios.post('/auth/login/admin', payload);
      localStorage.setItem('token', res.data.token);
      alert('Admin logged in!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0px 8px 16px rgba(0,0,0,0.15)', 
        width: '350px', 
        textAlign: 'center',
        animation: 'fadeIn 0.6s ease-in-out'
      }}>
        <h2 style={{ 
          marginBottom: '20px', 
          color: '#333', 
          fontWeight: '600' 
        }}>
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => e.target.style.border = '1px solid #ff6f61'}
            onBlur={(e) => e.target.style.border = '1px solid #ccc'}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => e.target.style.border = '1px solid #ff6f61'}
            onBlur={(e) => e.target.style.border = '1px solid #ccc'}
          />
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#ff6f61',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff4a3d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff6f61'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
