import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const Layout = () => {
  const [theme, setTheme] = useLocalStorage('app_theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const layoutStyle = {
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa',
    color: theme === 'dark' ? '#e0e0e0' : '#333333',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={layoutStyle}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
        <Outlet />
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #ccc', marginTop: '40px' }}>
        <p>&copy; 2026 University Web Tech Laboratory Shop</p>
      </footer>
    </div>
  );
};

export default Layout;
