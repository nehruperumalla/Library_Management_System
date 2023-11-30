import React, { useState } from 'react';
import axios from 'axios';
import { Link,  useNavigate} from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // Login successful, navigate to the home page
        console.log(response.data)
        let userData = response.data
        localStorage.setItem("user", JSON.stringify(userData))
        console.log(localStorage.getItem("user"))
        if(username === 'admin') {
          navigate('/admin')
        } else {
        navigate('/home');

        }
        console.log('Login successful');
      } else {
        // Login failed, show an error message
        setLoginError('Username or password is incorrect');
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network errors or other issues
       // Login failed, show an error message
       setLoginError('Username or password is incorrect');
       console.error('Login failed');
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form style={styles.form}>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {loginError && <p style={styles.error}>{loginError}</p>}
      </form>
      <div style={styles.linkContainer}>
        <Link to="/register" style={styles.link}>
          Not a user? Register here
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    width: '300px',
    margin: 'auto',
  },
  label: {
    display: 'block',
    margin: '10px 0',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '3px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px',
    borderRadius: '3px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  linkContainer: {
    marginTop: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#3498db',
    cursor: 'pointer',
  },
};

export default LoginPage;
