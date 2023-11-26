import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [searchType, setSearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [cart, setCart] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"))
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/books/search', {
        params: {
          searchKey: searchType,
          searchVal: searchValue,
        },
      });
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
    console.log(result)
    const isBookInCart = cart.some((book) => String(book._id) === String(result._id));
  
    if (!isBookInCart) {
      setCart((prevCart) => [...prevCart, result]);
    }
  };

  const checkIn = async (cart) => {

    console.log(cart)
    let checkedInData = {"user_id":userData['user_id'], "user_name":userData['username'], "location_name":cart[0]['location_name'], "books":[]}
    // new_docs = []
    for(let i = 0; i < cart.length; i++){
        checkedInData["books"][i] = {
            "book_id":cart[i]['_id'],
            "book_title":cart[i]['title']
        }
    }
    console.log(checkedInData)
    try {
        const response = await axios.post('http://127.0.0.1:5000/transactions/checkin', checkedInData)
    }
    catch (error) {
        console.error("Error performing check in", error)
    }
  }

  return (
    <div>
      <label>
        Search By:
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">Book Title</option>
          <option value="author">Book Author</option>
          <option value="isbn">ISBN</option>
        </select>
      </label>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={`Enter ${searchType === 'isbn' ? 'ISBN' : 'Search Value'}`}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((result) => (
            <div key={result.id} onClick={() => handleResultClick(result)}>
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <p>Authors: {result.author.join(', ')}</p>
              <p>Published Year: {result.published_year}</p>
              <p>Location Name: {result.location_name}</p>
              {result.location_name !== "NA" && <button onClick={() => addToCart(result)}>Add to Cart</button>}
              
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div>
          <h2>Books in Cart:</h2>
          {cart.map((book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Authors: {book.author.join(', ')}</p>
              <p>Published Year: {book.published_year}</p>
              <p>Location: {book.location_name}</p>
            </div>
          ))}
          <button onClick={() => checkIn(cart)}>
            Check In ({cart.length} {cart.length === 1 ? 'book' : 'books'})
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
