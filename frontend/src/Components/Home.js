import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import './sty.css';

export default function Home() {
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


  return (
    <>
      <nav>
        <div className="logo">
          Edu Sphere
        </div>
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
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        
        </ul>
      </nav>

      <div className='responsive-container-block bigContainer'>
        <div>
          <div className="carouseldon">
            <ul className="slides">
              <input type="radio" name="radio-buttons" id="img-1" checked />
              <li className="slide-container">
                <div className="slide-image">
                  <img src="https://www.hurix.com/wp-content/w3-webp/uploads/2022/01/Future-of-higher-education-1200x565.jpgw3.webp" />
                </div>
                <div className="carousel-controls">
                  <label htmlFor="img-3" className="prev-slide">
                    <span>&lsaquo;</span>
                  </label>
                  <label htmlFor="img-2" className="next-slide">
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
              <input type="radio" name="radio-buttons" id="img-2" />
              <li className="slide-container">
                <div className="slide-image">
                  <img src="https://www.hurix.com/wp-content/w3-webp/uploads/2022/01/Future-of-higher-education-1200x565.jpgw3.webp" />
                </div>
                <div className="carousel-controls">
                  <label htmlFor="img-1" className="prev-slide">
                    <span>&lsaquo;</span>
                  </label>
                  <label htmlFor="img-3" className="next-slide">
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
              <input type="radio" name="radio-buttons" id="img-3" />
              <li className="slide-container">
                <div className="slide-image">
                  <img src="https://speakzeasy.files.wordpress.com/2015/05/twa_blogpic_timisoara-4415.jpg" />
                </div>
                <div className="carousel-controls">
                  <label htmlFor="img-2" className="prev-slide">
                    <span>&lsaquo;</span>
                  </label>
                  <label htmlFor="img-1" className="next-slide">
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
              <div className="carousel-dots">
                <label htmlFor="img-1" className="carousel-dot" id="img-dot-1"></label>
                <label htmlFor="img-2" className="carousel-dot" id="img-dot-2"></label>
                <label htmlFor="img-3" className="carousel-dot" id="img-dot-3"></label>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-list">
        <a href="#" className="card-item">
          <img src="https://www.shutterstock.com/image-vector/happy-children-enjoy-holidays-school-260nw-2393040703.jpg" alt="Card Image" />
          <span className="developer">Holidays</span>
        </a>
        <a href="#" className="card-item">
          <img src="https://img.freepik.com/free-vector/hand-drawn-college-entrance-exam-illustration_23-2150359350.jpg" alt="Card Image" />
          <span className="designer">Assignments</span>
        </a>
        <a href="#" className="card-item">
          <img src="https://img.freepik.com/free-vector/hand-drawn-report-card-illustration_23-2150985083.jpg" alt="Card Image" />
          <span className="editor">Score card</span>
        </a>
      </div>

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
              <h4>Important Information</h4>
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
              <h4>Follow Us</h4>
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
