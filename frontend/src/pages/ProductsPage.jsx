import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ProductCard from '../components/ProductsCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // dodaj search state
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchProducts();   // inicijalni poziv za proizvode i kategorije
    fetchCategories();
  }, [navigate, token]);

  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: search || undefined,
          category: selectedCategory || undefined,
        },
      })
      .then(res => {
        setProducts(res.data);
        setError(null);
      })
      .catch(err => {
        setError('Failed to fetch products');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  };

  const fetchCategories = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  };

  const handleSearch = () => {
    fetchProducts();
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' , justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} style={{ marginLeft: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}>Search</button>
      </div>

      {products.length === 0 && <p>No products found.</p>}

      { /* Display products in grid filling available space */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
        {products.map(p => (
          <ProductCard key={p.sif_product} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
