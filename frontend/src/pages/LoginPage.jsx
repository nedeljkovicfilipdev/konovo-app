import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = token => {
    navigate('/products');
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
