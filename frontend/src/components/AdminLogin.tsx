import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Check if user is admin after login
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Admin credentials required.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-header">
        <div className="admin-badge">🔐 ADMIN ACCESS</div>
      </div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label htmlFor="email">Admin Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter admin email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Admin Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter admin password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="admin-login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>
      </form>
      <div className="user-login-link">
        Not an admin? <Link to="/login">Login as User</Link>
      </div>
    </div>
  );
};

export default AdminLogin;
