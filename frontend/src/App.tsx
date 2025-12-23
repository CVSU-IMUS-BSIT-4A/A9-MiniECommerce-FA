import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import './App.css';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Admin Route wrapper
const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/user/dashboard" replace />;
  }
  
  return children;
};

// Home Route - redirects admin to dashboard
const HomeRoute: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect admin to dashboard
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <ProductList searchQuery={searchQuery} />;
};

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/user/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-confirmation/:orderId" 
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
