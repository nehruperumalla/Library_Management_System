import React from 'react';

const HomePage = ({ firstName }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.greeting}>Hi, {firstName}</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button}>
          <img
            src="https://example.com/search-icon.svg" // Replace with your search button image URL
            alt="Search"
            style={styles.buttonImage}
          />
          Search
        </button>
        <button style={styles.button}>My Books</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  greeting: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '15px',
    margin: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    width: '150px', // Adjust the width as needed
  },
  buttonImage: {
    marginRight: '5px',
    width: '20px', // Adjust the width as needed
    height: '20px', // Adjust the height as needed
  },
};

export default HomePage;
