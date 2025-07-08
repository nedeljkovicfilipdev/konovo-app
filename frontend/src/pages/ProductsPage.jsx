import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ProductCard from '../components/ProductsCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        setError('Failed to fetch products');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }, [navigate]);

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((p, i) => (
          <ProductCard key={p.sif_product} product={p} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
