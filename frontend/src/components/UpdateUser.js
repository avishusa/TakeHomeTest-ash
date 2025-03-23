import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

function UpdateUser() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/users/${userId}`);
      setUserData(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching user:', error.response || error.message);
      setMessage('User not found or error fetching user.');
      setUserData(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8800/api/users/${userId}`, userData);
      setUserData(response.data);
      alert(`User updated successfully with ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error updating user:', error.response || error.message);
      setMessage('Error updating user.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2>Update User</h2>
      <div className="form-group">
        <label>User ID:</label>
        <input 
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter user ID"
        />
        <button onClick={handleSearch} className="submit-button" style={{ marginTop: '10px' }}>
          Search
        </button>
      </div>
      {userData && (
        <form onSubmit={handleUpdate} className="user-form">
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text"
              name="name"
              value={userData.name || ''}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input 
              type="text"
              name="zipcode"
              value={userData.zipcode || ''}
              onChange={handleChange}
              placeholder="Enter zipcode"
              required
            />
          </div>
          <div className="form-group">
            <label>Longitude:</label>
            <input 
              type="text"
              name="longitude"
              value={userData.longitude || ''}
              onChange={handleChange}
              placeholder="Enter longitude"
              required
            />
          </div>
          <div className="form-group">
            <label>Latitude:</label>
            <input 
              type="text"
              name="latitude"
              value={userData.latitude || ''}
              onChange={handleChange}
              placeholder="Enter latitude"
              required
            />
          </div>
          <div className="form-group">
            <label>Timezone:</label>
            <input 
              type="text"
              name="timezone"
              value={userData.timezone || ''}
              onChange={handleChange}
              placeholder="Timezone"
              required
            />
          </div>
          <button type="submit" className="submit-button">Update User</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UpdateUser;
