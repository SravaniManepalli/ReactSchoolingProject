import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './toastify.css';
import regimg from '../images/regimg.avif';
export default function Reg() {
  const [Signup, setSignup] = useState([]);
  const [newSignup, setNewSignup] = useState({
    id: '',
    name: '',
    role: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  //const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSignup();
  }, []);

  const fetchSignup = () => {
    fetch('http://localhost:3001/regtable')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched signup:', data);
        setSignup(data);
      })
      .catch((error) => console.error('Error fetching regtable:', error));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!/^[a-zA-Z0-9]{10}$/.test(newSignup.id)) {
      formErrors.id = 'Please enter a valid 10 digit ID';
    }
    if (!newSignup.name.trim()) {
      formErrors.name = 'Please enter your name';
    }
    if (!newSignup.email.trim() || !/@gmail\.com$/.test(newSignup.email)) {
      formErrors.email = 'Please enter a valid email (@gmail.com)';
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newSignup.password)) {
      formErrors.password = 'Password should be at least 8 characters, containing an alphabet, a digit, and a special symbol';
    }
    if (newSignup.password !== newSignup.confirm_password) {
      formErrors.confirm_password = 'Passwords do not match';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddSignup = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/regtable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSignup),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Internal Server Error');
      }

      console.log('User signup successfully');
      fetchSignup(); // Refresh the signup list
      setNewSignup({
        id: '',
        name: '',
        role: '',
        email: '',
        password: '',
        confirm_password: '',
      }); // Clear the input fields
      toast.success(`You Registered Successfully ${newSignup.name} !`); // Show success toast
    } catch (error) {
      console.error('Error adding donor:', error.message);
      toast.error('Error adding donor: ' + error.message); // Show error toast

    }
  };

  return (
    <>
    <ToastContainer />
      <nav>
        <div className="logo">Edu Sphere</div>
        <input type="checkbox" id="click" />
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
          <li><Link to="/Login">Login</Link></li>
        </ul>
      </nav>
      <br /><br />
      <h3 className='su2'>Register</h3> <br />
      <p className="hr-line"></p>
      <div className='contain1 su1'>
        <div className='content1'>
          <div className="right-side1">
            <form autoComplete="off">
              <div className="input-box1" style={{ height: "33px" }}>
<i class="fa-regular fa-id-card"></i>                <input
                  type="text"
                  placeholder="Enter your id"
                  value={newSignup.id}
                  onChange={(e) => setNewSignup({ ...newSignup, id: e.target.value })}
                />
                {errors.id && <p className="error">{errors.id}</p>}
              </div>

              <div className="input-box1" style={{ height: "33px" }}>
                <i className="fa-solid fa-user" ></i>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={newSignup.name}
                  onChange={(e) => setNewSignup({ ...newSignup, name: e.target.value })}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="input-box1" style={{ height: "33px" }}>
              <i class="fa-solid fa-briefcase"></i>                <select
                  value={newSignup.role}
                  onChange={(e) => setNewSignup({ ...newSignup, role: e.target.value })}
                >
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="management">Management</option>
                  <option value="non-technical">Non-Technical</option>
                </select>
              </div>

              <div className="input-box1" style={{ height: "33px" }}>
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={newSignup.email}
                  onChange={(e) => setNewSignup({ ...newSignup, email: e.target.value })}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="input-box1" style={{ height: "33px" }}>
              <i class="fa-solid fa-key"></i>                <input
                  type="password"
                  placeholder="Enter your password"
                  value={newSignup.password}
                  onChange={(e) => setNewSignup({ ...newSignup, password: e.target.value })}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <div className="input-box1" style={{ height: "33px" }}>
              <i class="fa-solid fa-key"></i>                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={newSignup.confirm_password}
                  onChange={(e) => setNewSignup({ ...newSignup, confirm_password: e.target.value })}
                />
                {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}
              </div>

              <div className="button1">
                <input type="button" value="Sign Up" onClick={handleAddSignup} />
              </div>

              <br /><br /><br />
              
            </form>
          </div>
        </div>
        <p id="signinstyle">
          If you already have an account <Link to='/Login'>SignIn</Link>
        </p>
      </div>
      <br /><br /><br /><br />
      <img id="regimg" src={regimg}></img>
    </>
  );
}
