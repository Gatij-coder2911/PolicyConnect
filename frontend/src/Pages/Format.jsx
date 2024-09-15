import React, { useState } from "react";
import "./PolicyScratch.css";
import "./Format.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

const Format = () => {
  const navigate = useNavigate();
  const [details_type, setdetails_type] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const [error, setError] = useState(null);

  function gotoHome() {
    navigate('/');
  }
    const handleFormatSelection = async (format) => {
      setdetails_type(format);
      setIsLoading(true);
      setError(null);









      try {
        const details_type = format === 'manual' ? 'manual' : 'upload';
        console.log('Format selection:', details_type);
        console.log(format);
        // const response = await axios.post('http://127.0.0.1:5000/api/policy', { details_type });
        // console.log('Format selection submitted successfully:', response.data);
      





        // Navigate based on the selected format
        if (format === 'manual') {
          navigate('/library', {state:{details_type:details_type}});
        } else if (format === 'upload') {
          navigate('/policydoc');
        }
      } catch (err) {
        setError('Failed to submit format selection. Please try again.');
        console.error('Error submitting format selection:', err);
      } finally {
        setIsLoading(false);
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
      <div className="mainbar1">
        <h1>Select a Format </h1>
        <p>To start making Your Policy</p>
        <div className="Format">
          <button 
            className={`Formatbtn ${details_type === 'manual' ? 'selected' : ''}`} 
            onClick={() => handleFormatSelection('manual')}
            disabled={isLoading}
          >
            Create from Scratch
          </button>
          <button 
            className={`Formatbtn ${details_type === 'upload' ? 'selected' : ''}`} 
            onClick={() => handleFormatSelection('upload')}
            disabled={isLoading}
          >
            Create by uploading Doc
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      </div>
      
    </div>
  );
};

export default Format;