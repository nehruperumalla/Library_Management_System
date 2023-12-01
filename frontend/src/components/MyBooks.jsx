import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBooks = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [checkoutLocations, setCheckoutLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [checkoutWarnings, setCheckoutWarnings] = useState({});
  const [showModal, setShowModal] = useState(false); // New state for the modal
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    desc:''
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const user_data = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchUserBooks = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.get(`http://127.0.0.1:5000/transactions/search/` + userData['user_id']);
        setUserBooks(response.data);
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };

    const fetchCheckoutLocations = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/locations/fetch`);
        setCheckoutLocations(response.data);
      } catch (error) {
        console.error('Error fetching checkout locations:', error);
      }
    };

    fetchUserBooks();
    fetchCheckoutLocations();
  }, []);

  const calculateLateFee = (checkinDate) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 15);

    const checkinDateObj = new Date(checkinDate);
    const timeDiff = sevenDaysAgo.getTime() - checkinDateObj.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // If check-in date is more than 7 days ago, calculate late fee
    return Math.max(0, daysDiff) * 10;
  };

  const handleCheckout = async (book, trans) => {

    
    let bookId = book.book_id
    const selectedLocation = selectedLocations[bookId];
    console.log(book)

    setSelectedBook({'book':book, 'transaction':trans});
    if (bookId && selectedLocation) {
      // Perform checkout logic here
      let lateFee = calculateLateFee(book.checkin_time)
      if(lateFee > 0) {
        setPaymentDetails((prevDetails) => ({
          ...prevDetails,
          amount: lateFee.toString(), // Set the late fee as the amount
        }));
        // Open the payment modal
        setShowModal(true);
      }
      // await new Promise(resolve => setTimeout(resolve, 1000));
      performCheckout_2(book, trans)

    } else {
      console.log("Not selected location")

      // Set the checkout warning state for the specific book
      setCheckoutWarnings((prevCheckoutWarnings) => ({
        ...prevCheckoutWarnings,
        [bookId]: true,
      }));
    }
  };

  const handlePay = (book, trans) => {
    // Set the selected book and its amount to the state
    setSelectedBook({'book':book, 'transaction':trans});
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      amount: calculateLateFee(book.checkin_time).toString(), // Set the late fee as the amount
    }));

    // Open the payment modal
    setShowModal(true);
  };

  // Function to close the payment modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePaymentSubmit = async () => {

    // Add logic to handle payment submission
    console.log(selectedBook)
    console.log(user_data)
    const req_data = {
      "user_id" : user_data['user_id'],
      "username" : user_data['username'],
      'amount' : calculateLateFee(selectedBook['book'].checkin_time),
      'description':paymentDetails['desc'],
      'card': {
        "card_no":paymentDetails['cardNumber'],
        "expiry_date":paymentDetails['expiryDate'],
        "cvv":paymentDetails['cvv'],
        "card_holder":paymentDetails['cardName']
      }
    }

    const response = await axios.post('http://127.0.0.1:5000/payments/create', req_data)
    if(response.status === 200) {
      performCheckout()
      alert('Payment submitted successfully');
      // Close the modal after payment submission
      setShowModal(false);
      setPaymentDetails({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        amount: '',
        desc:''
      });
      setSelectedBook(null);
    }
  };

  const performCheckout = async() => {
    try {
    console.log(selectedBook)
    const return_location = checkoutLocations.filter(location => location._id === selectedLocations[selectedBook['book']['book_id']])
    console.log(return_location)
    let req_data = {
      "_id":selectedBook['transaction']['_id'],
      'book_id':selectedBook['book']['book_id'],
      "returned_location":return_location[0]['name']
    }
    console.log(req_data)

      const response = await axios.post('http://127.0.0.1:5000/transactions/checkout', req_data)
      console.log("After Checking out")
      console.log(response.data)
      setUserBooks(response.data);

    } catch(error) {
      console.error("Error Occured while checking out", error)
    }
  }

  const performCheckout_2 = async(book, trans) => {
    try {
    console.log(selectedBook)
    const return_location = checkoutLocations.filter(location => location._id === selectedLocations[book['book_id']])
    console.log(return_location)
    let req_data = {
      "_id":trans['_id'],
      'book_id':book['book_id'],
      "returned_location":return_location[0]['name']
    }
    console.log(req_data)

      const response = await axios.post('http://127.0.0.1:5000/transactions/checkout', req_data)
      console.log("After Checking out")
      console.log(response.data)
      setUserBooks(response.data);

    } catch(error) {
      console.error("Error Occured while checking out", error)
    }
  }

  const handleInputChange = (field, value) => {
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleLocationChange = (bookId, locationId) => {
    setSelectedLocations((prevSelectedLocations) => ({
      ...prevSelectedLocations,
      [bookId]: locationId,
    }));

    // Reset the checkout warning state when a location is selected
    setCheckoutWarnings((prevCheckoutWarnings) => ({
      ...prevCheckoutWarnings,
      [bookId]: false,
    }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>My Books</h2>
      {userBooks.length > 0 ? (
        userBooks.map((books, index) => (
          <ul style={{ listStyleType: 'none', padding: '0' }} key={index}>
            {books.books.map((book) => (
              <li key={book.book_id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                <h3>{book.book_title}</h3>
                <p>Check-in Date: {new Date(book.checkin_time).toLocaleString()}</p>
                <p>Check-in Location: {books.location_name}</p>
                {book.checkout_time !== '' ? (
                <>
                  <p>Late Fee: $0</p>
                  <p>Check-out Date: {new Date(book.checkout_time).toLocaleString()}</p>
                  <p>Check-out Location: {book.returned_location}</p>
                </>) : (
                <>
                   <p>Late Fee: ${calculateLateFee(book.checkin_time)}</p>
                <label style={{ marginRight: '10px' }}>
                  Checkout Location:
                  <select
                    value={selectedLocations[book.book_id] || ''}
                    onChange={(e) => handleLocationChange(book.book_id, e.target.value)}
                    style={{ marginLeft: '10px' }}
                  >
                    <option value="">Select Location</option>
                    {checkoutLocations.map((location) => (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </label>
                  <button onClick={() => handleCheckout(book, books)} style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Check Out</button>

                  {checkoutWarnings[book.book_id] && (
                      <p style={{ color: 'red', marginLeft: '10px' }}>Please select a checkout location before checking out.</p>
                    )}
                </>
                )}
               
              </li>
            ))}
          </ul>
        ))
      ) : (
        <p>No books checked in.</p>
      )}

{showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', maxWidth: '400px', width: '100%' }}>
            <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={handleCloseModal}>&times;</span>
            <h2>Payment Details</h2>
            <p>Amount: ${paymentDetails.amount}</p>
            <label>
              Card Number:
              <input type="text" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={paymentDetails.cardNumber} onChange={(e) => handleInputChange('cardNumber', e.target.value)} />
            </label>
            <label>
              Name on Card:
              <input type="text" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={paymentDetails.cardName} onChange={(e) => handleInputChange('cardName', e.target.value)} />
            </label>
            <label>
              Expiry Date:
              <input type="text" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={paymentDetails.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} />
            </label>
            <label>
              CVV:
              <input type="text" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={paymentDetails.cvv} onChange={(e) => handleInputChange('cvv', e.target.value)} />
            </label>
            <label>
              Description:
              <input type="text" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} value={paymentDetails.desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
            </label>
            {/* Add other input fields for card details */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleCloseModal} style={{ flex: 1, padding: '8px', marginRight: '5px' }}>Cancel</button>
              <button onClick={handlePaymentSubmit} style={{ flex: 1, padding: '8px', marginLeft: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default MyBooks;
