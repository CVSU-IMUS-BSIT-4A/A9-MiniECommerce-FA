import React, { useEffect, useState } from 'react';
import { getProducts, addToCart, Product } from '../api';
import AddToCartModal from './AddToCartModal';
import ConfirmationModal from './ConfirmationModal';
import './ProductList.css';

interface ProductListProps {
  searchQuery?: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchQuery = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const [addedQuantity, setAddedQuantity] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async (quantity: number) => {
    if (!selectedProduct) return;

    try {
      await addToCart(selectedProduct.id, quantity);
      setAddedProductName(selectedProduct.name);
      setAddedQuantity(quantity);
      
      // Update stock in the product list immediately
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, stock: p.stock - quantity }
          : p
      ));
      
      setSelectedProduct(null);
      setShowConfirmation(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add to cart');
      setTimeout(() => setError(''), 3000);
      setSelectedProduct(null);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list-container">
      <h1>Our Products</h1>
      {searchQuery && (
        <p className="search-results">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
        </p>
      )}
      {error && <div className="error-message">{error}</div>}
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
            {!product.imageUrl && (
              <div className="product-image-placeholder">No Image</div>
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">₱{Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Sold out'}
                </span>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleOpenModal(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <div className="no-products">
          {searchQuery ? `No products found for "${searchQuery}"` : 'No products available'}
        </div>
      )}

      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAdd={handleAddToCart}
        />
      )}

      {showConfirmation && (
        <ConfirmationModal
          message="Added to Cart!"
          productName={addedProductName}
          quantity={addedQuantity}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

export default ProductList;
