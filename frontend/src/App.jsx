import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;