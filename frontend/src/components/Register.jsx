// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [userName, setUserName] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [address, setAddress] = useState('');
//   const [phoneNum, setPhoneNum] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
//       const response = await axios.post('http://localhost:5000/auth/register', {
//         username: userName,
//         name: name,
//         email: email,
//         password: password,
//         address: address,
//         phone: phoneNum
//       });

//       console.log('Registration successful:', response.data);
//       // You can redirect or perform other actions after successful registration
//     } catch (error) {
//       console.error('Registration failed:', error.message);
//       // Handle registration failure, e.g., show an error message to the user
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Registration</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <label style={styles.label}>
//           User Name
//           <input
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Full Name
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Email
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Address
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <label style={styles.label}>
//           Phone Num
//           <input
//             type="text"
//             value={phoneNum}
//             onChange={(e) => setPhoneNum(e.target.value)}
//             style={styles.input}
//           />
//         </label>
//         <button type="submit" style={styles.button}>
//           Register
//         </button>
//       </form>
//       <div style={styles.linkContainer}>
//         <Link to="/login" style={styles.link}>
//           Back to Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     width: '300px',
//     margin: 'auto',
//     marginTop: '50px',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     margin: '10px 0',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '8px',
//     margin: '5px 0',
//     borderRadius: '3px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     backgroundColor: '#4caf50',
//     color: 'white',
//     padding: '10px',
//     borderRadius: '3px',
//     cursor: 'pointer',
//     marginTop: '10px',
//   },
//   linkContainer: {
//     marginTop: '10px',
//     textAlign: 'center',
//   },
//   link: {
//     textDecoration: 'none',
//     color: '#3498db',
//     cursor: 'pointer',
//   },
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
      const response = await axios.post('http://localhost:5000/auth/register', {
        username: userName,
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phoneNum,
      });

      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle registration failure, e.g., show an error message to the user
    }
  };

  const handleClosePopup = () => {
    setRegistrationSuccess(false);
    navigate('/login'); // Redirect to the home page after successful registration
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          User Name
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Full Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <label style={styles.label}>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Phone Num
          <input
            type="text"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
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

      {/* Registration Success Popup */}
      {registrationSuccess && (
        <div style={styles.popup}>
          <p>Registration successful!</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
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
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: '999',
  },
};

export default Register;

