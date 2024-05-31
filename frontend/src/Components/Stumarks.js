import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './sty.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Stumarks() {


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

  
  const [studentId, setStudentId] = useState('');
  const [markById, setMarkById] = useState(null);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [isMarksDisplayed, setMarksDisplayed] = useState(false);

// fetchbyid------------------------------------------------
const getMarkById = () => {
  // Check if the student ID is empty
  if (!studentId) {
    toast.error('Please enter a Student ID', {
      style: {
        backgroundColor: 'white',
        color: 'black',
      },
    });
    return;
  }

  axios.get(`http://localhost:3001/marks/${studentId}`)
    .then(response => {
      const fetchedMark = response.data;
      setMarkById(fetchedMark);
      setShowNoDataMessage(false);
      setMarksDisplayed(true);

      // Check if no data is available for the specified ID
      if (Object.keys(fetchedMark).length === 0) {
        setShowNoDataMessage(true);
        toast.error('No data available for the specified ID', {
          style: {
            backgroundColor: 'white',
            color: 'black',
          },
        });
      }
    })
    .catch(error => {
      console.error('Error fetching mark:', error);
      setMarkById(null);
      setShowNoDataMessage(true);
      toast.error('Error fetching mark', {
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
      });
    });
};



  // Function to close displayed marks
  const closeDisplayedMarks = () => {
    setMarksDisplayed(false);
    setMarkById(null); // Clear markById state when closing
  };

  return (
    <>
      <nav>
        <div className="logo">
          Edu Sphere
        </div>
        <input type="checkbox" id="click"/>
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
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <ToastContainer autoClose={3000} />

      <h1 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>Score Card</h1>
      <label htmlFor="studentId">Student ID:</label>
      <input
        type="text"
        id="studentId"
        placeholder='Student ID'
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={getMarkById}>Display Marks</button>

      {isMarksDisplayed && (
        <button onClick={closeDisplayedMarks}>Close</button>
      )}

      {markById ? (
        <div className="centered-container">
          <div className="fetched-student-data">
            <h3>Score Card</h3>
            <p>Student ID: {markById[0]}</p>
            <p>Telugu: {markById[1]}</p>
            <p>English: {markById[2]}</p>
            <p>Science: {markById[3]}</p>
            <p>Maths: {markById[4]}</p>
            <p>Social: {markById[5]}</p>
            <p>Exam type: {markById[6]}</p>
          </div>
        </div>
      ) : showNoDataMessage ? (
        <p className="no-data-message"></p>
      ) : null}

      <footer className="footer">
        <div className="footercontainer">
          <div className="footerrow">
            <div className="footer-col">
              <h4>Institution</h4>
              <ul>
                <li><Link to="/About">About</Link></li>
                <li><a href="#">Our Services</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Affiliate Program</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Important information</h4>
              <ul>
                <li><a href="#">Our Policies</a></li>
                <li><a href="#">Terms and Conditions</a></li>
                <li><a href="#">Legal Disclaimers</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">IT Support</a></li>
                <li><a href="#">Alumni Network</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow us</h4>
              <div className="social-links">
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-github"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
