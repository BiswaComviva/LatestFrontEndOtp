import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'; 
import './App.css';
import Navbar from '../src/pages/Navbar';
import Landing from '../src/pages/LandingPage';
import Login from '../src/pages/Login';
import Profile from '../src/pages/userPage';
import OTPPage from '../src/pages/otpPage';

function App() {
  return (
    
      <Router>

        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
          <Route exact path="/login" component={Login} />
          <Route exact path="/OTPPage" component={OTPPage} />
          <Route exact path="/profile" component={Profile} />
          </div>
        </div>
        
    </Router>
  );
}

export default App;
