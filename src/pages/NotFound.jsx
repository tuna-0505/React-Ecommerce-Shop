import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#e74c3c' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#3498db', fontWeight: 'bold' }}>
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
