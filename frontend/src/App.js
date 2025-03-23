// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <Router>
      <div>
        <nav style={navStyles}>
          <Link to="/" style={linkStyles}>Create User</Link>
          <Link to="/update" style={linkStyles}>Update User</Link>
        </nav>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

const navStyles = {
  display: 'flex',
  justifyContent: 'center',
  margin: '20px'
};

const linkStyles = {
  margin: '0 10px',
  textDecoration: 'none',
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  borderRadius: '4px'
};

export default App;
