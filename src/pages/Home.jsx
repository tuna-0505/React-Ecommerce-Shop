import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1>Welcome to University Campus Shop</h1>
      <p>Explore our wide collection of high-quality products.</p>
      <Link
        to="/products"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: '#3498db',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold'
        }}
      >
        Browse Catalogue
      </Link>
    </div>
  );
};

export default Home;
