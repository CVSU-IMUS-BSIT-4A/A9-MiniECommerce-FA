import React from 'react';
import { Link } from 'react-router-dom';
import './LoginRequiredModal.css';

interface LoginRequiredModalProps {
  onClose: () => void;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ onClose }) => {
  return (
    <div className="login-required-modal" onClick={onClose}>
      <div className="login-required-content" onClick={(e) => e.stopPropagation()}>
        <div className="login-required-icon">🔒</div>
        <h2>Login Required</h2>
        <p>
          You need to be logged in to add items to your cart. 
          Please login or create an account to continue shopping.
        </p>
        <div className="login-required-buttons">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
        <button className="cancel-button" onClick={onClose}>
          Continue Browsing
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
