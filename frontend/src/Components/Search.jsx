import './Search.css';
import { useNavigate } from 'react-router-dom';

function Search(){
  const navigate = useNavigate();
  
  
  
  return (
    <div className='searchBar' >
      <input
        type="text"
        placeholder="   Search here"  

        className='searchInput1'
      />
      
      
      
    </div>
    
  );
};

export default Search;