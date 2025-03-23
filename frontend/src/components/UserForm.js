// frontend/src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/users', { name, zipcode });
      const userId = response.data.id;
      setMessage(`User created with ID: ${userId}`);
      // Show a pop-up alert with the created user ID
      alert(`User created successfully with ID: ${userId}`);
      // Optionally, reset the form fields
      setName('');
      setZipcode('');
    } catch (error) {
      console.error("Error creating user:", error.response || error.message);
      setMessage('Error creating user: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
            required
            placeholder="Enter your zip code"
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UserForm;
