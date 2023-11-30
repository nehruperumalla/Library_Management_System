// Modal.js
import React from 'react';

const Modal = ({ onClose }) => (
  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
    <p>Check-in successful!</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default Modal;