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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  useEffect(() => {
    fetchOrders();
    // Mark orders as viewed when user visits dashboard
    markOrdersAsViewed();
    // Refresh orders every 10 seconds to get latest status
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const markOrdersAsViewed = () => {
    // Store viewed timestamp in localStorage to clear notification
    localStorage.setItem('lastViewedOrders', new Date().toISOString());
  };

  const fetchOrders = async () => {
    try {
      const response = await api.getOrders();
      console.log('All orders from API:', response.data);
      // Filter orders by user email
      const userOrders = response.data.filter(
        (order: Order) => order.customerEmail === user?.email
      );
      // Sort by createdAt ascending (oldest first)
      const sortedOrders = userOrders.sort((a: Order, b: Order) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      console.log('Filtered user orders:', sortedOrders);
      console.log('User email:', user?.email);
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReceiveOrder = async (orderId: number) => {
    try {
      await api.receiveOrder(orderId);
      // Update the order status locally
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'completed' } : order
      ));
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error receiving order:', error);
      alert('Failed to receive order');
    }
  };

  const handleCancelClick = (orderId: number) => {
    setOrderToCancel(orderId);
    setCancelReason('');
    setOtherReason('');
    setShowCancelModal(true);
  };

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;
    
    const reason = cancelReason === 'Other' ? otherReason : cancelReason;
    if (!reason) {
      alert('Please select or enter a cancellation reason');
      return;
    }

    try {
      await api.updateOrderStatus(orderToCancel, 'cancelled');
      setOrders(orders.map(order => 
        order.id === orderToCancel ? { ...order, status: 'cancelled' } : order
      ));
      setShowCancelModal(false);
      setOrderToCancel(null);
      setCancelReason('');
      setOtherReason('');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
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
              {orders.map((order, index) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{index + 1}</span>
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
                  {order.status.toLowerCase() === 'receiving' && (
                    <button 
                      className="receive-order-btn"
                      onClick={() => handleReceiveOrder(order.id)}
                    >
                      Order Received
                    </button>
                  )}
                  {(order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'processing') && (
                    <button 
                      className="cancel-order-btn"
                      onClick={() => handleCancelClick(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2>Order Received Successfully!</h2>
            <p>Thank you for confirming your order receipt. Your order is now complete.</p>
            <button className="ok-btn" onClick={() => setShowSuccessModal(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal-content cancel-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cancel Order</h2>
              <button className="close-btn" onClick={() => setShowCancelModal(false)}>×</button>
            </div>
            <hr className="modal-divider" />
            <div className="modal-body">
              <p className="cancel-message">Please select a reason for cancelling this order:</p>
              <div className="cancel-reasons">
                <label className="reason-option">
                  <input
                    type="radio"
                    name="cancelReason"
                    value="Changed my mind"
                    checked={cancelReason === 'Changed my mind'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Changed my mind</span>
                </label>
                <label className="reason-option">
                  <input
                    type="radio"
                    name="cancelReason"
                    value="Found a better price"
                    checked={cancelReason === 'Found a better price'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Found a better price</span>
                </label>
                <label className="reason-option">
                  <input
                    type="radio"
                    name="cancelReason"
                    value="Ordered by mistake"
                    checked={cancelReason === 'Ordered by mistake'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Ordered by mistake</span>
                </label>
                <label className="reason-option">
                  <input
                    type="radio"
                    name="cancelReason"
                    value="Delivery time too long"
                    checked={cancelReason === 'Delivery time too long'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Delivery time too long</span>
                </label>
                <label className="reason-option">
                  <input
                    type="radio"
                    name="cancelReason"
                    value="Other"
                    checked={cancelReason === 'Other'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Other</span>
                </label>
                {cancelReason === 'Other' && (
                  <div className="other-reason-input">
                    <textarea
                      placeholder="Please specify your reason..."
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowCancelModal(false)}>
                Back
              </button>
              <button className="confirm-cancel-btn" onClick={handleCancelOrder}>
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
