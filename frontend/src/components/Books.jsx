import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {

  // State for managing books data
  const [books, setBooks] = useState([]);

  // State for managing modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // State for managing form data in the modal
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    ISBN: '',
    description:'',
    genre:'',
    published_year:null
  });
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books/fetch');
        console.log(response)
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching Books:', error.message);
        // Handle error, e.g., show an error message to the user
      }
      
    };

    fetchData();
  }, []);

  // Function to open the modal for adding a new book
  const openModalForAdd = () => {
    setFormData({title: '', author: '', ISBN: '', description:'', genre:'', published_year:null });
    setModalOpen(true);
  };

  // Function to open the modal for editing a book
  const openModalForEdit = (book) => {
    setSelectedBook(book)
    setFormData({id:book._id, title: book.title, author: book.author, ISBN:book.ISBN, description:book.description, genre:book.genre, published_year:book.published_year });
    setModalOpen(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission (add/edit book)
  const handleUpdate = async (e) => {
    console.log(formData)
    e.preventDefault();
    console.log(books)
    // Check if it's an edit or add operation
      // Edit existing book
      await axios.put(`http://localhost:5000/books/update`, formData);
      
      const updatedBooks = books.map((book) =>
        book.id === formData.id ? formData : book
      );
      setBooks(updatedBooks);

    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleAdd = async (e) => {
    try {
        // Implement Axios POST request to send data to the backend
        const response = await axios.post('http://localhost:5000/books/add', formData);
  
        // Assuming the backend responds with the newly created location
        const newBook = { ...response.data, id: books.length + 1 };
  
        setBooks([...books, newBook]);

        setFormData({title: '', author: '', ISBN:'', description:'', genre:'', published_year:null });

      } catch (error) {
        console.error('Error adding book:', error.message);
      }
      setModalOpen(false);
  }

  // Function to handle delete book
  const handleDelete = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:5000/books/delete/${id}`);
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
        } catch(error) {
          console.error('Error deleting book:', error.message);
        }
    
  };

  const handleCancel = async () => {
    setModalOpen(false)
    setSelectedBook(null)
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <button
        style={{
          fontSize: '1.5rem',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={openModalForAdd}
      >
        +
      </button>
      {books.map((book) => (
        <div
          key={book._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#f8f9fa',
          }}
        >
          <h3 style={{ marginBottom: '10px', color: '#007BFF' }}>{book.title}</h3>
          <p style={{ marginBottom: '15px', color: '#6c757d' }}>{book.author}</p>
          <p style={{ marginBottom: '15px', color: '#6c757d' }}>{book.description}, {book.genre}, {book.published_year}, {book.ISBN}</p>
          <button
            style={{
              padding: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              marginRight: '10px',
              cursor: 'pointer',
            }}
            onClick={() => openModalForEdit(book)}
          >
            Edit
          </button>
          <button
            style={{
              padding: '10px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(book._id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Modal for adding/editing books */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            background: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '999',
            borderRadius: '5px',
            width: '300px',
          }}
        >
          <form>
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#007BFF',
              }}
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#007BFF',
              }}
            >
              Author:
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#007BFF',
              }}
            >
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#007BFF',
              }}
            >
              Genre:
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#007BFF',
              }}
            >
              Published Year:
            </label>
            <input
              type="text"
              name="published_year"
              value={formData.published_year}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#007BFF',
              }}
            >
              ISBN:
            </label>
            <input
              type="text"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
            />
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '10px',
                  marginRight: '10px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              {
                selectedBook ? (<button
                    type="button"
                    onClick={handleUpdate}
                    style={{
                      padding: '10px',
                      backgroundColor: '#007BFF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Update
                  </button>) : (<button
                type="button"
                onClick={handleAdd}
                style={{
                  padding: '10px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>)
              }
              
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Books;
