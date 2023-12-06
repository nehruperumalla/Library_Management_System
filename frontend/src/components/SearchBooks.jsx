import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component

const SearchBooks = () => {
  // const [searchType, setSearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [cart, setCart] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/locations/fetch');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = async () => {
    console.log(selectedLocation)
    try {
      const response = await axios.get('http://127.0.0.1:5000/books/search', {
        params: {
          // searchKey: searchType,
          searchVal: searchValue,
          location: selectedLocation,
        },
      });
      console.log(response.data)
      setSearchResults(response.data);
      setSelectedResult(null); // Reset selected result when performing a new search
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleResultClick = (result) => {
    // Set the selected result when a result is clicked
    setSelectedResult(result);
  };

  const addToCart = (result) => {
    // Check if the book is not already in the cart before adding
    const isBookInCart = cart.some((book) => String(book._id) === String(result._id));

    if (!isBookInCart) {
      setCart((prevCart) => [...prevCart, result]);
    }
  };

  const checkIn = async (cart) => {
    let checkedInData = {
      user_id: userData['user_id'],
      user_name: userData['username'],
      location_name: selectedLocation,
      books: [],
    };

    for (let i = 0; i < cart.length; i++) {
      checkedInData['books'][i] = {
        book_id: cart[i]['book_id'],
        book_title: cart[i]['book_title'],
        store_id:cart[i]['_id'],
      };
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/transactions/checkin', checkedInData);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error performing check in', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      {/* <label style={{ marginRight: '10px' }}>
        Search By:
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">Book Title</option>
          <option value="author">Book Author</option>
          <option value="isbn">ISBN</option>
        </select>
      </label> */}
      <label style={{ marginRight: '10px' }}>
        Location:
        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location._id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={`Enter Title`}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Search
      </button>

      {searchResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Search Results:</h2>
          {searchResults
            .filter(result => result.location_name === selectedLocation).map((result) => (
            <div
              key={result._id}
              onClick={() => handleResultClick(result)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
            <>    
            <h3>{result.book_title}</h3>
            <p>{result.description}</p>
            <p>Authors: {result.author.join(', ')}</p>
            <p>Published Year: {result.published_year}</p>
            <p>Available at: {result.location_name}</p>

            <button
              onClick={() => addToCart(result)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>
            </>
              
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Books in Cart:</h2>
          {cart.map((book) => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{book.book_title}</h3>
              <p>{book.description}</p>
              <p>Authors: {book.author.join(', ')}</p>
              <p>Published Year: {book.published_year}</p>
              <p>Location: {book.location_name}</p>
            </div>
          ))}
          <button
            onClick={() => checkIn(cart)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Check In ({cart.length} {cart.length === 1 ? 'book' : 'books'})
          </button>
        </div>
      )}
      {/* Render the modal if showModal is true */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default SearchBooks;
