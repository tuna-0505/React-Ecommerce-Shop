import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCartStore } from '../store/cartStore.js';

const NavBar = ({ theme, toggleTheme }) => {
  const { user, logoutUser } = useAuth();
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navStyle = {
    display: 'flex',
    justify-content: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    borderBottom: '1px solid #ccc',
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff'
  };

  const linkStyle = ({ isActive }) => ({
    marginRight: '15px',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#3498db' : theme === 'dark' ? '#ecf0f1' : '#2c3e50'
  });

  return (
    <nav style={navStyle}>
      <div>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/products" style={linkStyle}>Products</NavLink>
        <NavLink to="/cart" style={linkStyle}>Cart ({totalItems})</NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '6px 12px',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: 'none',
            color: theme === 'dark' ? '#fff' : '#000'
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <div>
            <span style={{ marginRight: '10px' }}>User: {user.username}</span>
            <button
              onClick={logoutUser}
              style={{ padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" style={linkStyle}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
