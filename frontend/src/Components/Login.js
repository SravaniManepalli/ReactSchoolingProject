import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the popstate event
    const handlePopState = (event) => {
      if (!window.confirm('Are you sure you want to leave this page?')) {
        // Prevent navigation
        navigate('/Login', { replace: true });
      }
    };

    // Listen for popstate events
    window.addEventListener('popstate', handlePopState);

    // Push a new state to the history stack to manage navigation
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginDetails.email,
          password: loginDetails.password,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Internal Server Error');
        } else {
          const errorText = await response.text();
          throw new Error(errorText);
        }
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Login successful');
        window.location.href = '/Home';
      } else {
        throw new Error(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <nav>
        <div className="logo">Edu Sphere</div>
        <input type="checkbox" id="click"/>
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
          <li><Link to="/Reg">Register</Link></li>
        </ul>
      </nav>

      <br /><br />
      <h3 className='su2'>Sign In</h3> <br />
      <p className="hr-line"></p>

      <ToastContainer autoClose={5000} />

      <div className="login-page">
        <div className="login-container">
          {/* <h2 className="login-title">Sign In</h2> */}
          <form autoComplete="off">
            <div className="input-box">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={loginDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-box">
              <i className="fa-solid fa-key"></i>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginDetails.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="button">
              <input type="button" value="Sign In" onClick={handleLogin} />
            </div>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/Reg">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
