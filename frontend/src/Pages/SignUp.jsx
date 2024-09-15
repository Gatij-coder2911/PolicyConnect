// LoginSig.jsx
import './SignUp.css';
import { useState, useContext } from 'react'; // Import useContext
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';  // Import UserContext

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [email, setEmail] = useState('');
  const [user_type, setUser_type] = useState('');
  const [ministry_name, setministry_name] = useState('');
  const [department_name, setdepartment_name] = useState('');
  const [department_desc, setdepartment_desc] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/register", {
      username,
      password,
      user_type,
      email,
      ministry_name,
      department_name,
      department_desc
      
    }).then((response) => {
      // Assuming the login was successful
      console.log(response);
      if (response.data.message=="Registration successful") {
        navigate('/login');
      } else {
        console.log("Registration failed");
        alert(response.data.message);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
      <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <div className="loginsignup-fields">
            <div className='full'>
            
            </div>
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="text" 
              name="user_type" 
              placeholder="user type" 
              value={user_type} 
              onChange={(e) => setUser_type(e.target.value)} 
            />
            <input 
              type="text" 
              name="ministry_name" 
              placeholder="ministry_name" 
              value={ministry_name} 
              onChange={(e) => setministry_name(e.target.value)} 
            />
            
            <input 
              type="text" 
              name="department_name" 
              placeholder="department_name" 
              value={department_name} 
              onChange={(e) => setdepartment_name(e.target.value)} 
            />
            <input 
              type="text" 
              name="department_desc" 
              placeholder="department_desc" 
              value={department_desc} 
              onChange={(e) => setdepartment_desc(e.target.value)} 
            />
            
          </div>
          <button type="submit" className='btn'>
            Continue
          </button>
          <p className="loginsignup-login">Already have an account <a href='/login'>Login here</a></p>
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <div className="impline">By continuing I agree to the terms of use & privacy policy</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
