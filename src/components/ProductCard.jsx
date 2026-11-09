import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore.js';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'inherit'
  };

  return (
    <div style={cardStyle}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ fontSize: '16px', margin: '12px 0 6px 0' }}>{product.title}</h3>
      <p style={{ fontWeight: 'bold', color: '#27ae60', margin: '0 0 10px 0' }}>${product.price}</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <Link
          to={`/products/${product.id}`}
          style={{ textDecoration: 'none', padding: '6px 12px', background: '#3498db', color: '#fff', borderRadius: '4px', fontSize: '14px' }}
        >
          View Details
        </Link>
        <button
          onClick={() => addItem(product)}
          style={{ padding: '6px 12px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
