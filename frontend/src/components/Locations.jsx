// Inside Locations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({ id:'', name: '', address: '', city:'', state:'', zipcode:'' });
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/locations/fetch');
        console.log(response)
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error.message);
        // Handle error, e.g., show an error message to the user
      }
      
    };

    fetchData();
  }, []);

  const handleEdit = (location) => {
    // Set the selected location for editing
    setSelectedLocation(location);
    console.log(location)
    // Pre-fill the modal with the data of the selected location
    setNewLocation({id:location._id, name: location.name, address: location.address, city: location.city, state:location.state, zipcode:location.zipcode });
    // Open the modal
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    // Implement delete functionality
    console.log(`Delete location with ID ${id}`);
    try{
    const response = await axios.delete(`http://localhost:5000/locations/delete/${id}`);
    setLocations(locations => locations.filter((data) => data._id != id))
    } catch(error) {
      console.error('Error deleting location:', error.message);
    }
  };

  const handleAdd = async () => {
    try {
      // Implement Axios POST request to send data to the backend
      const response = await axios.post('http://localhost:5000/locations/add', newLocation);

      // Assuming the backend responds with the newly created location
      const createdLocation = response.data;

      setLocations([...locations, createdLocation]);
      setModalOpen(false);
      setNewLocation({name: '', address: '', city:'', state:'', zipcode:'' });
    } catch (error) {
      console.error('Error adding location:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleUpdate = async () => {
    try {
      // Implement Axios PUT request to update data on the backend
      console.log(newLocation)
      await axios.put(`http://localhost:5000/locations/update`, newLocation);

      // Update the location in the local state
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === selectedLocation.id ? { ...location, ...newLocation } : location
        )
      );

      setModalOpen(false);
      setNewLocation({ name: '', address: '', city:'', state:'', zipcode:'' });
      setSelectedLocation(null);
    } catch (error) {
      console.error('Error updating location:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleCancel = async () => {
    setNewLocation({ name: '', address: '', city:'', state:'', zipcode:'' });
    setModalOpen(false);
    setSelectedLocation(null);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Locations</h2>
      <button style={styles.addButton} onClick={() => setModalOpen(true)}>
        +
      </button>
      {isModalOpen && (
        <div style={styles.modal}>
          <h3 style={styles.modalTitle}>
            {selectedLocation ? 'Edit Location' : 'Add New Location'}
          </h3>
          <label style={styles.modalLabel}>
            Name:
            <input
              type="text"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              style={styles.modalInput}
            />
          </label>
          <label style={styles.modalLabel}>
            Address:
            <input
              type="text"
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              style={styles.modalInput}
            />
          </label>
          <label style={styles.modalLabel}>
            City:
            <input
              type="text"
              value={newLocation.city}
              onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
              style={styles.modalInput}
            />
          </label>
          <label style={styles.modalLabel}>
            State:
            <input
              type="text"
              value={newLocation.state}
              onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
              style={styles.modalInput}
            />
          </label>
          <label style={styles.modalLabel}>
            Zipcode:
            <input
              type="text"
              value={newLocation.zipcode}
              onChange={(e) => setNewLocation({ ...newLocation, zipcode: e.target.value })}
              style={styles.modalInput}
            />
          </label>
          {selectedLocation ? (
            <button onClick={handleUpdate} style={styles.modalButton}>
              Update
            </button>
          ) : (
            <button onClick={handleAdd} style={styles.modalButton}>
              Add
            </button>
          )}
          <button onClick={handleCancel} style={styles.modalButton}>
            Cancel
          </button>
        </div>
      )}
      <div style={styles.cardContainer}>
        {locations.map((location) => (
          <div key={location._id} style={styles.card}>
            <h3>{location.name}</h3>
            <p>{location.address}, {location.city}, {location.state}, {location.zipcode}</p>
            <div style={styles.buttonContainer}>
              <button onClick={() => handleEdit(location)}>Edit</button>
              <button onClick={() => handleDelete(location._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    zIndex: '1', // Ensure modal is above other content
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  modalLabel: {
    marginBottom: '10px',
  },
  modalInput: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '20px',
  },
  modalButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100px',
    margin: '5px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    margin: '20px',
    borderRadius: '10px',
    width: '300px',
  },
  buttonContainer: {
    marginTop: '15px',
  },
};

export default Locations;
