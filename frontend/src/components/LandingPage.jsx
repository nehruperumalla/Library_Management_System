// LibraryManagementSystem.js

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Library Management System</h1>
      <img
        src= {require("../static/lms.png")}  // Replace with the path to your banner image
        alt="Library Banner"
        style={styles.banner}
      />
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/register" style={styles.link}>
          <button style={styles.button}>Register</button>
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
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    banner: {
      width: '100%',
      maxWidth: '800px',
      height: 'auto',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px 20px',
      margin: '0 10px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
    },
  };
export default LandingPage;
