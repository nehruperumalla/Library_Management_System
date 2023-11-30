import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stores = () => {
  const [locations, setLocations] = useState([]);
  const [books, setBooks] = useState([]);
  const [locationBookPairs, setLocationBookPairs] = useState([]);
  const [currentLocationId, setCurrentLocationId] = useState('');
  const [currentBookId, setCurrentBookId] = useState('');

  // Fetch data from the APIs on component load
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/locations/fetch');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/books/fetch');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fechLocationBookPairs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/stores/fetch');
        setLocationBookPairs(response.data)
      } catch (error) {
        console.error('Error Fetching Location Book Pairs', error)
      }
    }

    fetchLocations();
    fetchBooks();
    fechLocationBookPairs();
  }, []);

  const addBookToLocation = async () => {
    if (currentLocationId && currentBookId) {
      // Find the location and book objects based on their IDs
      const selectedLocation = locations.find((loc) => loc._id === currentLocationId);
      const selectedBook = books.find((book) => book._id === currentBookId);

      const req_data = {"location_id":selectedLocation._id, "book_id":selectedBook._id, "location_name":selectedLocation.name, "book_title":selectedBook.title}

      try {
        const response = await axios.post('http://127.0.0.1:5000/stores/create', req_data);

        // Update the local state with the new location-book pair
        setLocationBookPairs([
          ...locationBookPairs,
          {_id:response.data, location_id: selectedLocation._id, book_id: selectedBook._id, location_name:selectedLocation.name, book_title:selectedBook.title },
        ]);
        setCurrentLocationId('');
        setCurrentBookId('');

      } catch (error) {
        console.error('Error fetching books:', error);
      }

    } else {
      alert('Please select both location and book.');
    }
  };

  const deleteLocationBookPair = async (pairIndex) => {
    const pairToDelete = locationBookPairs[pairIndex];

    try {
      await axios.delete(`http://127.0.0.1:5000/stores/delete/${pairToDelete._id}`);

      setLocationBookPairs((prevPairs) =>
        prevPairs.filter((pair, index) => index !== pairIndex)
      );
    } catch (error) {
      console.error('Error deleting location-book pair:', error);
    }
  };

  const availableBooks = books.filter(
    (book) => !locationBookPairs.some((pair) => pair.book_id === book._id)
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        Stores
      </h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Location:
          <select
            value={currentLocationId}
            onChange={(e) => setCurrentLocationId(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginRight: '10px' }}>
          Book:
          <select
            value={currentBookId}
            onChange={(e) => setCurrentBookId(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="">Select Book</option>
            {availableBooks.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={addBookToLocation}
          style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
        >
          Add Book
        </button>
      </div>

      <h3 style={{ color: '#333' }}>Location-Book Pairs</h3>
      <ul>
        {locationBookPairs.map((pair, index) => (
          <li
          key={index}
          style={{
            marginBottom: '5px',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{pair.location_name} - {pair.book_title}</span>
          <div>
            <button
              onClick={() => deleteLocationBookPair(index)}
              style={{ marginRight: '5px', cursor: 'pointer' }}
            >
              Delete
            </button>
            {/* Add an edit button here with appropriate functionality */}
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Stores;
