import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Marks from './Marks';
import Home from './Home';
import About from './About';
import Stumarks from './Stumarks';
import Reg from './Reg';
import Login from './Login';
import Gallery from './Gallery';
import { FaUserCircle } from 'react-icons/fa';
import './sty.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Clear user data from local storage or any authentication tokens
    localStorage.removeItem('userRole');
    localStorage.removeItem('username'); // Assuming username is stored
    // Redirect to login page
    navigate('/Login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const username = localStorage.getItem('username'); // Assuming username is stored in localStorage

  return (
    <>
      <nav>
        <div className="logo">Edu Sphere</div>
        <input type="checkbox" id="click" />
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Marks">Marks</Link></li>
          <li><Link to="/Stumarks">My Marks</Link></li>
          <li><Link to="/Gallery">Gallery</Link></li>
          
          <li className="profile-icon" onClick={toggleDropdown}>
            <FaUserCircle size={30} />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p>{username}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Marks' element={<Marks />} />
        <Route exact path='/Stumarks' element={<Stumarks />} />
        <Route exact path='/Reg' element={<Reg />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Gallery' element={<Gallery />} />
      </Routes>
    </>
  );
}
