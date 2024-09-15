import React from "react";
import "./PolicyScratch.css";
import "./PolicyDoc.css"
import { useNavigate } from 'react-router-dom';




// import agent1 from '../../Bssets/agent1.png'; // go up two levels

const PolicyMaker = () => {
  const navigate = useNavigate();
  function gotoHome(){
    navigate('/')
  }
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
        <div className="inputfeild">
          <h1>Enter Government</h1>
          <input type="text" className="input" placeholder="  for eg. Government of India" />
        </div>
        <div className="inputfeild">
          <h1>Enter Ministry Name</h1>
          <input type="text" className="input" placeholder="  for eg. Ministry wants to issue the policy" />
        </div>
        <div className="inputfeild">
          <h1>Enter Department involved Name</h1>
          <input type="text" className="input" placeholder="  for eg. Department who proposed the policy " />
        </div>
        <div className="inputfeild">
          <h1>Enter Department Description</h1>
          <input type="text" className="input1" placeholder="  for eg. Description about Department" />
        </div>
        <div className="inputfeild">
          <h1>Enter Title of Scheme</h1>
          <input type="text" className="input" placeholder="  for eg. Import and Export Duties " />
        </div>
        <div className="inputfeild">
          <h1>Enter Description of policy</h1>
          <input type="text" className="input1" placeholder="  for eg. Description of policy" />
        </div>
        <div className="input11">
            <h2>Upload your Document</h2>
            <button className="Upload">Upload</button>
        </div>
        




      </div>
      

      </div>
    
  );
};

export default PolicyMaker;
