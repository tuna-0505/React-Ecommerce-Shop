import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore.js';

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" style={{ color: '#3498db', fontWeight: 'bold' }}>
          Back to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>{item.title}</h4>
              <p style={{ margin: 0, color: '#7f8c8d' }}>${item.price} each</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              <button
                onClick={() => removeItem(item.id)}
                style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #ccc', paddingTop: '15px' }}>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <div>
          <button
            onClick={clear}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
