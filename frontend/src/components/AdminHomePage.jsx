// Inside AdminHomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin</h1>
      <div style={styles.boxContainer}>
        <Link to="/admin/locations" style={styles.box}>
          Locations
        </Link>
        <Link to="/admin/books" style={styles.box}>
          Books
        </Link>
        <Link to="/admin/stores" style={styles.box}>
          Stores
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop:'150px'
  },
  box: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '50px',
    margin: '20px',
    borderRadius: '10px',
    textDecoration: 'none', // Remove default hyperlink styling
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
};

export default AdminHomePage;
