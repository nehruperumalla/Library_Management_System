import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBooks = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [checkoutLocations, setCheckoutLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [checkoutWarnings, setCheckoutWarnings] = useState({});

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
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const checkinDateObj = new Date(checkinDate);
    const timeDiff = sevenDaysAgo.getTime() - checkinDateObj.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // If check-in date is more than 7 days ago, calculate late fee
    return Math.max(0, daysDiff) * 10;
  };

  const handleCheckout = async (bookId) => {
    const selectedLocation = selectedLocations[bookId];

    if (bookId && selectedLocation) {
      // Perform checkout logic here

      // Update userBooks after checkout
      const updatedUserBooks = userBooks.map((books) => {
        return {
          ...books,
          books: books.books.filter((book) => book._id !== bookId),
        };
      });
      setUserBooks(updatedUserBooks);

      // Remove the selected location for the checked-out book
      setSelectedLocations((prevSelectedLocations) => {
        const updatedLocations = { ...prevSelectedLocations };
        delete updatedLocations[bookId];
        return updatedLocations;
      });

      // Reset the checkout warning state for the specific book
      setCheckoutWarnings((prevCheckoutWarnings) => ({
        ...prevCheckoutWarnings,
        [bookId]: false,
      }));
    } else {
      // Set the checkout warning state for the specific book
      setCheckoutWarnings((prevCheckoutWarnings) => ({
        ...prevCheckoutWarnings,
        [bookId]: true,
      }));
    }
  };

  const handlePay = (book) => {
    // Perform payment logic here
    alert(`Paid late fee for ${book.title}`);
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
        userBooks.map((books) => (
          <ul style={{ listStyleType: 'none', padding: '0' }} key={books._id}>
            {books.books.map((book) => (
              <li key={book.book_id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                <h3>{book.book_title}</h3>
                <p>Check-in Date: {new Date(book.checkin_time).toLocaleString()}</p>
                <p>Check-in Location: {books.location_name}</p>
                <p>Late Fee: ${calculateLateFee(book.checkin_time)}</p>
                <label style={{ marginRight: '10px' }}>
                  Checkout Location:
                  <select
                    value={selectedLocations[book._id] || ''}
                    onChange={(e) => handleLocationChange(book._id, e.target.value)}
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
                {calculateLateFee(book.checkin_time) === 0 ? (
                  <>
                  <button onClick={() => handleCheckout(book.book_id)} style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Check Out</button>

                  {checkoutWarnings[book.book_id] && (
                      <p style={{ color: 'red', marginLeft: '10px' }}>Please select a checkout location before checking out.</p>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={() => handlePay(book)} style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Pay</button>
                    
                  </>
                )}
              </li>
            ))}
          </ul>
        ))
      ) : (
        <p>No books checked in.</p>
      )}
    </div>
  );
};

export default MyBooks;
