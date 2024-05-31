import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './sty.css';
import { Routes, Route, Link,useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';



export default function Marks() {

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
  const [allMarks, setAllMarks] = useState([]);
  const [isTableVisible, setTableVisibility] = useState(false);

  const [studentId, setStudentId] = useState('');
  const [markById, setMarkById] = useState(null);
  const [newMark, setNewMark] = useState({
    student_id: '',
    telugu: '',
    english: '',
    science: '',
    maths: '',
    social: '',
    exam_type: '', // Changed from exam_date to exam_type
  });
  const [updateMarkData, setUpdateMarkData] = useState({
    student_id: '',
    telugu: '',
    english: '',
    science: '',
    maths: '',
    social: '',
    exam_type: '', // Changed from exam_date to exam_type
  });

  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isMarksDisplayed, setMarksDisplayed] = useState(false);

  // fetchall---------------------------------------------------
  const fetchallMarks = () => {
    axios.get('http://localhost:3001/marks')
      .then(response => {
        setAllMarks(response.data);
        setTableVisibility(true);
      })
      .catch(error => {
        console.error('Error fetching marks:', error);
      });
  };

  // fetchbyid------------------------------------------------
  const getMarkById = () => {
    axios.get(`http://localhost:3001/marks/${studentId}`)
      .then(response => {
        const fetchedMark = response.data;
        setMarkById(fetchedMark);
        setUpdateMarkData({
          student_id: fetchedMark[0],
          telugu: fetchedMark[1],
          english: fetchedMark[2],
          science: fetchedMark[3],
          maths: fetchedMark[4],
          social: fetchedMark[5],
          exam_type: fetchedMark[6], // Changed from exam_date to exam_type
        });
        setShowNoDataMessage(false);
      })
      .catch(error => {
        console.error('Error fetching donor:', error);
        setMarkById(null);
        setShowNoDataMessage(true);
      });
  };

  // inserting marks--------------------------------
  const addNewMark = () => {
    axios.post('http://localhost:3001/marks', newMark)
      .then(response => {
        setNewMark({ student_id: '', telugu: '', english: '', science: '', maths: '', social: '', exam_type: '' }); // Changed from exam_date to exam_type
        setMarkById(null); // Clear the markById state
        toast.success('Mark added successfully!',
          {
            style: {
              backgroundColor: 'white',
              color: 'black',
            },
          });
      })
      .catch(error => {
        console.error('Error adding donor:', error);
        toast.error('Error adding mark');
      });
  };

  // update mark--------------------------------------
  const updateMark = async () => {
    try {
      await axios.put(`http://localhost:3001/marks/${updateMarkData.student_id}`, updateMarkData);
      toast.success('Mark updated successfully!',
        {
          style: {
            backgroundColor: 'white',
            color: 'black',
          },
          onClose: () => {
            // Set isUpdateMode to false when the toast is closed
            setIsUpdateMode(false);
          },
        });
    } catch (error) {
      console.error('Error updating mark:', error);
      toast.error('Error updating mark');
    }
  };

  // delete mark---------------------------------------
  const deleteMark = async () => {
    try {
      await axios.delete(`http://localhost:3001/marks/${studentId}`);
      fetchallMarks(); // Refresh the marks list after successful deletion
      toast.success('Mark deleted successfully!',
        {
          style: {
            backgroundColor: 'white',
            color: 'black',
          },
        });
    } catch (error) {
      console.error('Error deleting mark:', error);
      toast.error('Error deleting mark');
    }
  };

  // delete confirmation----------------
  const handleDeleteConfirmation = (studentId) => {
    setStudentId(studentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    deleteMark(studentId);
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  // Function to close displayed marks
  const closeDisplayedMarks = () => {
    setMarksDisplayed(false);
    setMarkById(null); // Clear markById state when closing
  };
  const handleCloseTable = () => {
    setTableVisibility(false);
  };

  return (
    <>
      <nav>
         <div class="logo">
            Edu Sphere
         </div>
         <input type="checkbox" id="click"/>
         <label for="click" class="menu-btn">
         <i class="fas fa-bars"></i>
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
          </li>         </ul>
      </nav>

      <ToastContainer autoClose={3000} />

      <h1 style={{ textAlign: 'center', marginTop: '40px',marginBottom: '30px' }}>My Student Grades Hub</h1>
      <div className='page-container'>
        <button className='get-marks-button' onClick={fetchallMarks}>View All Marks</button>
        {isTableVisible && (
          <div className='table-container'>
            <button className='close-button' onClick={handleCloseTable}>Close</button>
            {allMarks.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Telugu</th>
                  <th>English</th>
                  <th>Science</th>
                  <th>Maths</th>
                  <th>Social</th>
                  <th>Exam Type</th> {/* Changed from Exam Date to Exam Type */}
                </tr>
              </thead>
              <tbody>
                {allMarks.map((data, index) => (
                  <tr key={index}>
                    <td>{data[0]}</td>
                    <td>{data[1]}</td>
                    <td>{data[2]}</td>
                    <td>{data[3]}</td>
                    <td>{data[4]}</td>
                    <td>{data[5]}</td>
                    <td>{data[6]}</td> {/* Changed from formatDate(data[6]) to data[6] */}
                  </tr>
                ))}
              </tbody>
            </table>
            ) : (
              <p className="no-data-message">Data not available</p>
            )}
          </div>
        )}
      </div>
      <br></br>

      <div id="displaymarks">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          placeholder='Student ID'
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={() => { getMarkById(); setMarksDisplayed(true); }}>Display Marks</button>

        {isMarksDisplayed && (
          <>
            <button onClick={closeDisplayedMarks}>Close</button>
          </>
        )}
      </div>

      {markById ? (
        <div className="centered-container">
          <div className="fetched-student-data">
            <h3>Fetched Student Data</h3>
            <p>Student ID: {markById[0]}</p>
            <p>Telugu: {markById[1]}</p>
            <p>English: {markById[2]}</p>
            <p>Science: {markById[3]}</p>
            <p>Maths: {markById[4]}</p>
            <p>Social: {markById[5]}</p>
            <p>Exam Type: {markById[6]}</p> {/* Changed from Exam Date to Exam Type */}
          </div>
          <div className="update-delete-buttons">
            <div className="update-mark-section">
              <button onClick={() => { setIsUpdateMode(true); getMarkById(); }}>Update Mark</button>
              <button onClick={() => handleDeleteConfirmation(markById[0])}>Delete Mark</button>
            </div>

            {isUpdateMode && (
              <>
                <label htmlFor="updateTelugu">Telugu:</label>
                <input
                  type="text"
                  id="updateTelugu"
                  value={updateMarkData.telugu}
                  onChange={(e) => setUpdateMarkData({ ...updateMarkData, telugu: e.target.value })}
                />

                <label htmlFor="updateEnglish">English:</label>
                <input
                  type="text"
                  id="updateEnglish"
                  value={updateMarkData.english}
                  onChange={(e) => setUpdateMarkData({ ...updateMarkData, english: e.target.value })}
                />

                <label htmlFor="updateScience">Science:</label>
                <input
                  type="text"
                  id="updateScience"
                  value={updateMarkData.science}
                  onChange={(e) => setUpdateMarkData({ ...updateMarkData, science: e.target.value })}
                />

                <label htmlFor="updateMaths">Maths:</label>
                <input
                  type="text"
                  id="updateMaths"
                  value={updateMarkData.maths}
                  onChange={(e) => setUpdateMarkData({ ...updateMarkData, maths: e.target.value })}
                />

                <label htmlFor="updateSocial">Social:</label>
                <input
                  type="text"
                  id="updateSocial"
                  value={updateMarkData.social}
                  onChange={(e) => setUpdateMarkData({ ...updateMarkData, social: e.target.value })}
                />

                <label htmlFor="updateExamType">Exam Type:</label>
                <select
                  id="updateExamType"
                  value={updateMarkData.exam_type}
                  onChange={(e) => setUpdateMarkData({ ...updateMarkData, exam_type: e.target.value })}
                >
                  <option value="">Select Exam Type</option>
                  <option value="mid">Mid</option>
                  <option value="final">Final</option>
                  <option value="advanced">Advanced</option>
                </select>

                <button onClick={updateMark}>Save Changes</button>
              </>
            )}
          </div>
        </div>
      ) : showNoDataMessage ? (
        <p className="no-data-message">No data available for the specified ID</p>
      ) : null}

      <img id="picdisplaymarks" src='https://t4.ftcdn.net/jpg/05/03/24/53/360_F_503245337_SOBZipgPlrvEsxTZ1Fgpp6dyoBlTDlTF.jpg'></img>
      <div className="containertable">
        
        <table id="containertable1">
        <h3>Add Student marks</h3>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="ID"
                  value={newMark.student_id}
                  onChange={(e) => setNewMark({ ...newMark, student_id: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  placeholder="Telugu"
                  value={newMark.telugu}
                  onChange={(e) => setNewMark({ ...newMark, telugu: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="English"
                  value={newMark.english}
                  onChange={(e) => setNewMark({ ...newMark, english: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  placeholder="Science"
                  value={newMark.science}
                  onChange={(e) => setNewMark({ ...newMark, science: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Maths"
                  value={newMark.maths}
                  onChange={(e) => setNewMark({ ...newMark, maths: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  placeholder="Social"
                  value={newMark.social}
                  onChange={(e) => setNewMark({ ...newMark, social: e.target.value })}
                />
              </td>
              <td>
                <select
                  value={newMark.exam_type}
                  onChange={(e) => setNewMark({ ...newMark, exam_type: e.target.value })}
                >
                  <option value="">Select Exam Type</option>
                  <option value="mid">Mid</option>
                  <option value="final">Final</option>
                  <option value="advanced">Advanced</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={addNewMark}>Add New Mark</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="containertable3">
          <img src="https://img.freepik.com/free-vector/tiny-people-analysts-evaluating-ability-prospective-debtor-pay-debt-credit-rating-credit-risk-control-credit-rating-agency-concept-illustration_335657-2393.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701302400&semt=ais" width="650" alt="Illustration"></img>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="confirmation-modal">
          <p>
            <i className="fas fa-exclamation-triangle"></i> Are you sure you want to delete this mark?
          </p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
      <br></br>

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
