// App.jsx
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Pages/UserContext'; // Corrected import path
import PolicyScratch from './Pages/PolicyScratch';
import Feed from './Pages/Feed';
import Format from './Pages/Format';
import PolicyDoc from './Pages/PolicyDoc';
import Ranking from './Pages/Ranking';
import LoginSig from './Pages/LoginSig';
import SignUp from './Pages/SignUp';
import Discussion from './Pages/Discussion';



function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
     
          <Route path="/library" element={<PolicyScratch />} />
          <Route path="/Discussion" element={<Discussion />} />
          <Route path="/" element={<Feed />} />
          <Route path="/Format" element={<Format />} />
          <Route path="/policydoc" element={<PolicyDoc />} />
          <Route path="/ranking" element={<Ranking />} />



          <Route path="/login" element={<LoginSig />} />
          <Route path="/signup" element={<SignUp />} />
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
