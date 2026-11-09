import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { fetchProduct } from '../api/productsApi.js';
import { useCartStore } from '../store/cartStore.js';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fetchFn = useCallback(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const { data: product, loading, error } = useFetch(fetchFn, [id, fetchFn]);

  return (
    <div>
      <button
        onClick={() => navigate('/products')}
        style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        &larr; Back to Products
      </button>

      {loading && <p>Loading product details...</p>}
      
      {error && (
        <div style={{ padding: '16px', backgroundColor: '#fde8e8', color: '#e74c3c', borderRadius: '6px' }}>
          <h3>Product Not Found</h3>
          <p>{error}</p>
        </div>
      )}

      {product && (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div style={{ flex: 1 }}>
            <h2>{product.title}</h2>
            <p style={{ textTransform: 'capitalize', color: '#7f8c8d' }}>Category: {product.category}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>${product.price}</p>
            <p style={{ lineHeight: '1.6' }}>{product.description}</p>
            <button
              onClick={() => addItem(product)}
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#2ecc71',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
