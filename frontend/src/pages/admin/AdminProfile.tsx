import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './AdminProfile.css';

const AdminProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="admin-profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Admin Profile</h1>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
            <h2>{user.name || 'Admin User'}</h2>
          </div>

          <div className="profile-details">
            <div className="profile-item">
              <span className="profile-label">Name</span>
              <span className="profile-value">{user.name || 'N/A'}</span>
            </div>

            <div className="profile-item">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user.email}</span>
            </div>

            <div className="profile-item">
              <span className="profile-label">Role</span>
              <span className="profile-badge">{user.role}</span>
            </div>

            <div className="profile-item">
              <span className="profile-label">User ID</span>
              <span className="profile-value">#{user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
