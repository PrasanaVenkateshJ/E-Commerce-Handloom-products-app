import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UploadProduct from './components/UploadProduct';
import ProductList from './components/ProductList';
import LoginAdmin from './components/LoginAdmin';
import PrivateRoute from './components/PrivateRoute';
import ArtisanDashboard from './components/ArtisanDashboard';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import UserDashboard from './components/UserDashboard';
import AdminOrders from './components/AdminOrders';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />    
          <Route path="/upload" element={<UploadProduct />} />
          <Route path="/artisan/products" element={<ProductList />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<LoginAdmin />} /> 
          <Route
            path="/artisan/dashboard"
            element={
              <PrivateRoute role="artisan">
                <ArtisanDashboard />
              </PrivateRoute>
            }
          />
        
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
  path="/admin/orders"
  element={
    <PrivateRoute role="admin">
      <AdminOrders />
    </PrivateRoute>
  }
/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
