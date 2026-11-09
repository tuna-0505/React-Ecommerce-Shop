import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { fetchProducts } from '../api/productsApi.js';
import ProductCard from '../components/ProductCard.jsx';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';

  const fetchFn = useCallback((signal) => fetchProducts(signal), []);
  const { data: products, loading, error } = useFetch(fetchFn, [fetchFn]);

  const categories = products
    ? Array.from(new Set(products.map((p) => p.category)))
    : [];

  const handleSearchChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('category', val);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2>Product Catalogue</h2>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '8px 12px', flex: 1, minWidth: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: '#e74c3c' }}>Error: {error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p>No matching products found.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
