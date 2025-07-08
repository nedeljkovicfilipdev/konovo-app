import { useState } from 'react';
import axios from 'axios';

const styles = {
  form: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: '24px',
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '16px',
    fontWeight: '600',
    textAlign: 'center',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1.5px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#007bff',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('zadatak');
  const [password, setPassword] = useState('zadatak');
  const [error, setError] = useState(null);

  const [focusedInput, setFocusedInput] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });
      const token = res.data.access_token || res.data.token;
      if (token) {
        localStorage.setItem('token', token);
        onLogin(token);
      } else {
        setError('Token not received');
      }
    } catch {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.field}>
        <label style={styles.label}>Username:</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(focusedInput === 'username' ? styles.inputFocus : {}),
          }}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput(null)}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(focusedInput === 'password' ? styles.inputFocus : {}),
          }}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
        />
      </div>

      <button
        type="submit"
        style={{
          ...styles.button,
          ...(btnHover ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
