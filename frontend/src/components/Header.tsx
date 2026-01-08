import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getOrders } from '../api';
import './Header.css';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [receivingOrdersCount, setReceivingOrdersCount] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceivingOrders = async () => {
      if (isAuthenticated && user?.role !== 'admin') {
        try {
          const response = await getOrders();
          const userOrders = response.data.filter(
            (order: any) => order.customerEmail === user?.email && order.status.toLowerCase() === 'receiving'
          );
          setReceivingOrdersCount(userOrders.length);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchReceivingOrders();
    // Refresh every 30 seconds
    const interval = setInterval(fetchReceivingOrders, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">TechHub PH</span>
        </Link>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>
        
        <nav className="nav">
          {isAuthenticated && user?.role === 'admin' ? (
            // Admin navigation
            <>
              <Link 
                to="/admin/profile" 
                className="nav-link user-info clickable"
              >
                {user?.name || user?.email} (Admin)
              </Link>
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </>
          ) : (
            // Regular user navigation
            <>
              <Link to="/" className="nav-link">Products</Link>
              <Link to="/cart" className="nav-link cart-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Cart
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/user/dashboard" 
                    className="nav-link user-info clickable"
                  >
                    {user?.name || user?.email}
                    {receivingOrdersCount > 0 && (
                      <span className="notification-badge">{receivingOrdersCount}</span>
                    )}
                  </Link>
                  <button onClick={handleLogout} className="nav-link logout-button">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-link">Register</Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
