import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder, Order } from '../api';
import './OrderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      fetchOrder(parseInt(orderId));
    }
  }, [orderId]);

  const fetchOrder = async (id: number) => {
    try {
      const response = await getOrder(id);
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load order details');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!order) return <div className="error-message">Order not found</div>;

  return (
    <div className="order-confirmation-container">
      <div className="success-icon">✓</div>
      <h1>Order Confirmed!</h1>
      <p className="confirmation-message">
        Thank you for your order, {order.customerName}!
      </p>

      <div className="order-details">
        <div className="order-info-section">
          <h2>Order Information</h2>
          <div className="info-row">
            <span className="info-label">Order ID:</span>
            <span className="info-value">#{order.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className={`status-badge status-${order.status}`}>{order.status}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Order Date:</span>
            <span className="info-value">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        <div className="customer-info-section">
          <h2>Customer Details</h2>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{order.customerName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{order.customerEmail}</span>
          </div>
          {order.customerAddress && (
            <div className="info-row">
              <span className="info-label">Address:</span>
              <span className="info-value">{order.customerAddress}</span>
            </div>
          )}
        </div>

        <div className="order-items-section">
          <h2>Order Items</h2>
          <div className="order-items-list">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.productName}</span>
                  <span className="item-quantity">Quantity: {item.quantity}</span>
                </div>
                <div className="item-price">
                  ₱{(Number(item.price) * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total Amount:</span>
            <span className="total-amount">₱{Number(order.totalAmount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
