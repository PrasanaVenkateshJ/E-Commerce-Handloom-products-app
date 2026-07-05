import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
    try {
      const res = await axios.post('/auth/login/user', payload);
      const { token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'user');
      alert('Login successful!');
      navigate('/user/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Login</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button style={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '350px',
    margin: '60px auto',
    padding: '20px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.8rem',
    color: '#444',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#ff6f61',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  }
};

export default UserLogin;
