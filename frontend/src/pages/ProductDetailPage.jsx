import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const found = res.data.find(p => String(p.sif_product) === id);
        if (found) {
          setProduct(found);
        } else {
          setError('Error 404: Product not found.');
        }
      })
      .catch(() => setError('Error loading product.'));
  }, [id, navigate, token]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '24px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: '16px' }}>{product.naziv}</h2>
      
      <img
        src={product.imgsrc}
        alt={product.naziv}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', marginBottom: '16px' }}
      />

      <div style={{ marginBottom: '12px' }}>
        <strong>Description:</strong>
        <p dangerouslySetInnerHTML={{ __html: product.description }} style={{ marginTop: '6px' }} />
      </div>

      <p><strong>SKU:</strong> {product.sku}</p>
      <p><strong>EAN:</strong> {product.ean || 'N/A'}</p>
      <p><strong>Category:</strong> {product.categoryName}</p>
      {product.brandName && <p><strong>Brand:</strong> {product.brandName}</p>}
      <p><strong>In Stock:</strong> {product.stock}</p>
      <p><strong>Price:</strong> {product.price.toFixed(2)} RSD (including VAT)</p>
      <p><strong>PDV:</strong> {product.vat}%</p>

      <button
        onClick={() => navigate('/products')}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        BACK
      </button>
    </div>
  );
};

export default ProductDetailPage;
