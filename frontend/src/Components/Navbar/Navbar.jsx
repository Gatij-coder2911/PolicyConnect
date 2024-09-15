import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "./Navbar.css";
import { UserContext } from '../../Pages/UserContext';
import axios from 'axios';
import Search from '../Search';

const Navbar = () => {
  // const [response, setResponse] = useState([])
  const { username, logout } = useContext(UserContext); // Access username and logout function from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  // Handle logout action
  const handleLogout = () => {
    axios.get(`http://127.0.0.1:5000/api/logout`); // Use parameters in the API endpoint
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page after logout
  };
  function gotoCreate() {
    navigate('/Format');
  }

  return (
    <>
      <div className="navbar">
      <div className="nav-create-btn">
          {/* Conditionally render Login or Logout button */}
          
            <button>Logo</button> 
          
            
        </div>

        <ul className='nav-menu'>
        
          <Search/>

        

          

          
          

          

          
          
        </ul>
        <div className='flexx'>
        <div className="nav-create-btn">
          {/* Conditionally render Login or Logout button */}
          
            <button onClick={gotoCreate}>Create</button> 
        </div>

        <div className="nav-logo-btn">
          {/* Conditionally render Login or Logout button */}
          {username ? (
            <button onClick={handleLogout}>Logout</button> // Show Logout button if user is logged in
          ) : (
            <Link to='/Login'><button>Login</button></Link> // Show Login button if user is not logged in
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
