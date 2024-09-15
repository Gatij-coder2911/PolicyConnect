import React, { useState, useEffect } from "react";
import "./PolicyScratch.css";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios




// import agent1 from '../../Bssets/agent1.png'; // go up two levels

const PolicyMaker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ministryName, setMinistryName] = useState('');
  const [formData, setFormData] = useState({
    government: "",
    ministryName: "",
    departmentName: "",
    departmentDescription: "",
    title: "",
    description: "",
    details_type: "",
    details: "",
    remainingPolicyDescription: "",
    authorities: ["", "", ""],
    otherApprovalAuthorities: ["", "", ""],
    reference: ["", "", ""]
  });

  useEffect(() => {
    if(location.state){
      console.log("details_type : ", location.state.details_type);}
      formData.details_type=location.state.details_type;
      fetchData();
  }, [navigate, location.state]); //

  function gotoHome(){
    navigate('/')
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/policy', formData);

      console.log('Policy submitted successfully:', response.data);
      // Optionally, navigate to a success page or clear the form
      navigate('/Feed');
    } catch (err) {
      setError('Failed to submit policy. Please try again.');
      console.error('Error submitting policy:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/user_details');
      setMinistryName(response.data.ministry_name);
      console.log('Fetched data:', ministryName);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div className="contain">
      <div className="sidebar">
        <li className="list">
          <button className="listbtn" onClick={gotoHome}>Home</button>
          <button className="listbtn">Ranking Board</button>
          <button className="listbtn">Library</button>


        </li>
        
      </div>
      <div className="mainbar">
        <form onSubmit={handleSubmit}>
          <div className="inputfeild">
            <h1>Enter Government</h1>
            <input 
              type="text" 
              className="input" 
              name="government"
              value="Government of India"
              readOnly
            />
          </div>
          <div className="inputfeild">
            <h1>Enter Ministry Name</h1>
            <input 
              type="text" 
              className="input" 
              name="ministry_name"
              value={ministryName}
              readOnly
              onChange={handleInputChange}
              placeholder="for eg. Ministry wants to issue the policy" 
            />
          </div>
          <div className="inputfeild">
            <h1>Enter Department involved Name</h1>
            <input 
              type="text" 
              className="input" 
              name="department_name"
              value={formData.department_name}
              onChange={handleInputChange}
              placeholder="for eg. Department who proposed the policy" 
            />
          </div>
          <div className="inputfeild">
            <h1>Enter Department Description</h1>
            <input 
              type="text" 
              className="input1" 
              name="department_description"
              value={formData.department_description}
              onChange={handleInputChange}
              placeholder="for eg. Description about Department" 
            />
          </div> 
          <div className="inputfeild">
            <h1>Enter Title of Scheme</h1>
            <input 
              type="text" 
              className="input" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="for eg. Import and Export Duties" 
            />
          </div>
          <div className="inputfeild">
            <h1>Enter Description of policy</h1>
            <input 
              type="text" 
              className="input1" 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="for eg. Description of policy" 
            />
          </div>
          
         
          
         
          <div className="inputfeild">
            <h1>Enter Main authority of Approval</h1>
            <input 
              type="text" 
              className="input" 
              name="authorities"
              value={formData.authorities}
              onChange={handleInputChange}
              placeholder="for eg. Import and Export Duties" 
            />
          </div>
          
          
          <div className="inputfeild">
            <h1>Enter References</h1>
            <input 
              type="text" 
              className="input1" 
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              placeholder="for eg. References" 
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Policy'}
          </button>
        </form>




      </div>
      

      </div>
  
  );
};

export default PolicyMaker;
