import React from 'react';
import { useLocation, /* other hooks */ } from 'react-router-dom';
import bg_img from '../static/lms_bg.png';
// Inside HomePage.js

const HomePage = () => {
    //   const firstName = user ? user.firstName : 'Guest';
    const location = useLocation()

    return (
            <div style={{backgroundImage: `url(${bg_img})`, backgroundRepeat:'no-repeat',backgroundSize:'100% 100%', backgroundPosition:'center', minHeight:'100vh', minWidth:'200vh'}}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.greeting}>Hi, {location.state.data}</div>
                    <div style={styles.title}>Library Management System</div>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.button}>Search</button>
                    <button style={styles.button}>My Books</button>
                </div>
            </div>
            </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    greeting: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        marginLeft: '620px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    button: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '50px', // Make the buttons exact square
        margin: '10px',
        marginTop:'150px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        width: '150px', // Adjust the width as needed
        fontSize: '16px',
    },
};

export default HomePage;
