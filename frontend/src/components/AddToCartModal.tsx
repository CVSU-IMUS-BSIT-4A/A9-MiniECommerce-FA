import React, { useState } from 'react';
import { Product } from '../api';
import './AddToCartModal.css';

interface AddToCartModalProps {
  product: Product;
  onClose: () => void;
  onAdd: (quantity: number) => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ product, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(quantity);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-product-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="modal-placeholder">No Image</div>
          )}
        </div>

        <h2>{product.name}</h2>
        <p className="modal-description">{product.description}</p>
        
        <div className="modal-price-stock">
          <span className="modal-price">₱{Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className="modal-stock">{product.stock} available</span>
        </div>

        <div className="quantity-selector">
          <label>Quantity:</label>
          <div className="quantity-controls-modal">
            <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={handleIncrease} disabled={quantity >= product.stock}>+</button>
          </div>
        </div>

        <button className="add-to-cart-modal-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
