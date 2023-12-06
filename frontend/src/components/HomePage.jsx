import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg_img from '../static/lms_bg.png';

const HomePage = () => {
    // const location = useLocation();
    const navigate = useNavigate()
    let userData = JSON.parse(localStorage.getItem('user'));
    // const history = useHistory();

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        // Redirect to the landing page after logout
        navigate('/');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${bg_img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                minHeight: '100vh',
                minWidth: '200vh',
            }}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.greeting}>Hi, {userData['username']}</div>
                    <div style={styles.title}>Library Management System</div>
                    {/* Add the logout button */}
                    <button style={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div style={styles.buttonContainer}>
                    <Link to="/search">
                        <button style={styles.button}>Search</button>
                    </Link>
                    <Link to="/mybooks">
                        <button style={styles.button}>My Books</button>
                    </Link>
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
        marginLeft: '620px',
    },
    logoutButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        marginLeft: 'auto', // Push the button to the right
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    button: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '50px',
        margin: '10px',
        marginTop: '150px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        width: '150px',
        fontSize: '16px',
    },
};

export default HomePage;
