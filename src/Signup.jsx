
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('signupUsername', username);
    localStorage.setItem('signupPassword', password);

    alert('Signup successful! Now please sign in.');

    setTimeout(() => {
      navigate('/signin');
    }, 100); 
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="on">
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit" style={styles.button}>Sign Up</button> {/* ✅ NO <Link> */}
        <p>Already have account 
          <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f0f0',
    color: 'black'
  },
  form: {
    padding: 20,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: 300,
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  toggleButton: {
    marginLeft: 8,
    padding: '0 10px',
    fontSize: 14,
    cursor: 'pointer',
    border: 'none',
    background: '#ddd',
    borderRadius: 4,
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default Signup;
