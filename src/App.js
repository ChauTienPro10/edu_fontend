import logo from './logo.svg';
import './App.css';
import Home from './component/home/Home'; 
import { MdOutlineMenu } from "react-icons/md";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link,useLocation  } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Login from './component/login/login';
function App() {
  return (
    <div className="App">
      <Router>
        <header className='header'>
          <div className='nav'>
          
          <Navigation className="pc-screen"/>
          <div className="mobile-screen"><Menubar /></div>
          <Usermanager />
          </div>
        </header>
        <main>
          <Routes>
           <Route path="/login" element={<Login />} />
           <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}


function Navigation(){
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  return (
    <ul className='nav-left'>
      <li className={activeLink === '/' ? 'active' : ''}>
        <Link to="/" onClick={() => handleLinkClick('/')}>Home</Link>
      </li>
      <li className={activeLink === '/about' ? 'active' : ''}>
        <Link to="/about" onClick={() => handleLinkClick('/about')}>About</Link>
      </li>
      <li className={activeLink === '/contact' ? 'active' : ''}>
        <Link to="/contact" onClick={() => handleLinkClick('/contact')}>Contact</Link>
      </li>
    </ul>

    
  );
}
function Usermanager(){
  
  return(
    <ul className='nav-right'>
      
      <li> <FaUser style={{color: 'red'}}/></li>
      <li style={{ fontWeight: '800'}}><Link to="/login">Login</Link></li>
    </ul>
  );
}
function Menubar(){
  return(
      <div>
          <ul>
              <li><MdOutlineMenu /></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
          </ul>
      </div>
  );
}
export default App;
