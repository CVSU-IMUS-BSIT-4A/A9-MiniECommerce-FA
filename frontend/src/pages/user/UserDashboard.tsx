import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as api from '../../api';
import './UserDashboard.css';

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: {
    id: number;
    productName: string;
    price: number;
    quantity: number;
  }[];
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.getOrders();
      // Filter orders by user email
      const userOrders = response.data.filter(
        (order: Order) => order.customerEmail === user?.email
      );
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.name || user?.email}!</p>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Account Information</h2>
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user?.name || 'Not set'}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Account Type:</span>
            <span className="value badge">{user?.role}</span>
          </div>
        </div>

        <div className="orders-section">
          <h2>My Orders ({orders.length})</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="no-orders">You haven't placed any orders yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="order-total">₱{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <span>{item.productName}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
