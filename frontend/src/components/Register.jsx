import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
      const response = await axios.post('http://localhost:5000/auth/register/', {
        firstName,
        lastName,
        email,
        password,
      });

      console.log('Registration successful:', response.data);
      // You can redirect or perform other actions after successful registration
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle registration failure, e.g., show an error message to the user
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <div style={styles.linkContainer}>
        <Link to="/login" style={styles.link}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
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
    marginTop: '10px',
  },
  linkContainer: {
    marginTop: '10px',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#3498db',
    cursor: 'pointer',
  },
};

export default Register;