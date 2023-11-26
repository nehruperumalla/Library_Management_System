// MyBooks.js

import React, { useState, useEffect } from 'react';

const userData = JSON.parse(localStorage.getItem("user"))

const MyBooks = ({ userId }) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    // Fetch user books based on the userId (You need to implement this)
    // For the sake of this example, let's assume there's a function fetchUserBooks
    // that returns a promise with the user's books.

    const fetchUserBooks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/transactions/search/${userData['user_id']}`);
        const data = await response.json();
        // console.log(data)
        console.log(data)
        setUserBooks(data[0].books);
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <div>
      <h2>My Books</h2>
      <ul>
        {/* Render books using a for loop */}
        {userBooks.map((book) => (
          <li key={book._id}>
            {book.book_title}
            <br></br>
            Cheked In Date: {book.checkin_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBooks;
