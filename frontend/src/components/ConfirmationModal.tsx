import React from 'react';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  message: string;
  productName: string;
  quantity: number;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  message, 
  productName, 
  quantity, 
  onClose 
}) => {
  return (
    <div className="confirmation-overlay" onClick={onClose}>
      <div className="confirmation-content" onClick={(e) => e.stopPropagation()}>
        <div className="success-checkmark">✓</div>
        <h2>{message}</h2>
        <div className="confirmation-details">
          <p><strong>{productName}</strong></p>
          <p>Quantity: {quantity}</p>
        </div>
        <button className="confirmation-ok-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
