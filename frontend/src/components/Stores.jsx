import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stores = () => {
  const [stores, setStores] = useState([
    { id: 1, name: 'Bookstore A', location: 'City A' },
    { id: 2, name: 'Bookstore B', location: 'City B' },
    // Add more stores as needed
  ]);

  const [selectedStore, setSelectedStore] = useState(null);

  // Maintain a state for pairs for each store
  const [storePairs, setStorePairs] = useState({});

  const [books, setBooks] = useState([
    'Book 1',
    'Book 2',
    'Book 3',
    // Add more books as needed
  ]);

  const [locations, setLocations] = useState([
    'Location A',
    'Location B',
    'Location C',
    // Add more locations as needed
  ]);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Initialize the storePairs state based on the stores
    const initialPairs = {};
    stores.forEach((store) => {
      initialPairs[store.id] = [];
    });
    setStorePairs(initialPairs);
  }, [stores]);

  const openModalForEdit = (store) => {
    const pairsForStore = storePairs[store.id] || [];
    setSelectedStore(store);
    setStorePairs({ ...storePairs, [store.id]: pairsForStore });
    setModalOpen(true);
  };

  const handleAddPair = () => {
    // Update the state using the selected store's ID
    setStorePairs({
      ...storePairs,
      [selectedStore.id]: [...(storePairs[selectedStore.id] || []), { book: '', location: '' }],
    });
  };

  const handleDeletePair = (index) => {
    // Update the state using the selected store's ID
    const updatedPairs = [...storePairs[selectedStore.id]];
    updatedPairs.splice(index, 1);
    setStorePairs({ ...storePairs, [selectedStore.id]: updatedPairs });
  };

  const handleSubmit = () => {
    // Handle saving the pairs to the backend or perform other necessary actions
    // ...

    // Close the modal
    setModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      {stores.map((store) => (
        <div
          key={store.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#f8f9fa',
          }}
        >
          <h3 style={{ marginBottom: '10px', color: '#007BFF' }}>{store.name}</h3>
          <p style={{ marginBottom: '15px', color: '#6c757d' }}>Location: {store.location}</p>
          <p style={{ marginBottom: '5px', color: '#007BFF' }}>Books:</p>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {storePairs[store.id]?.map((pair, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  Book: {pair.book}, Location: {pair.location}
                </span>
                <button
                  onClick={() => handleDeletePair(index)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => openModalForEdit(store)}
            style={{
              padding: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        </div>
      ))}

      {/* Modal for editing book-location pairs */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '999',
            borderRadius: '5px',
            width: '300px',
            padding: '20px',
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#007BFF' }}>
            Edit Book-Location Pairs for {selectedStore.name}
          </h2>
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '20px' }}>
            {storePairs[selectedStore.id]?.map((pair, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  Book:{' '}
                  <select
                    value={pair.book}
                    onChange={(e) => {
                      const updatedPairs = [...storePairs[selectedStore.id]];
                      updatedPairs[index].book = e.target.value;
                      setStorePairs({ ...storePairs, [selectedStore.id]: updatedPairs });
                    }}
                    style={{ marginLeft: '5px', width: '100px' }}
                  >
                    <option value="">Select Book</option>
                    {books.map((book) => (
                      <option key={book} value={book}>
                        {book}
                      </option>
                    ))}
                  </select>
                  , Location:{' '}
                  <select
                    value={pair.location}
                    onChange={(e) => {
                      const updatedPairs = [...storePairs[selectedStore.id]];
                      updatedPairs[index].location = e.target.value;
                      setStorePairs({ ...storePairs, [selectedStore.id]: updatedPairs });
                    }}
                    style={{ marginLeft: '5px', width: '100px' }}
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </span>
                <button
                  onClick={() => handleDeletePair(index)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddPair}
            style={{
              padding: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Pair
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            Save Changes
          </button>
          <button
            onClick={() => setModalOpen(false)}
            style={{
              padding: '10px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Stores;
