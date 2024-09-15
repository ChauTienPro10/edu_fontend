import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes, Link,useLocation,useNavigate,Switch   } from 'react-router-dom';
import Home from './component/home/Home';
import Supporter from './component/supporter/supporter';
import reportWebVitals from './reportWebVitals';
import Course from './component/courses/penCTiengAnh/course';
import Admin from './component/admin/admin';
import Botchat from './component/chatbot/botchat';
import Wallet from './component/metamask/wallet';
import Header from './component/header/Header';
import Login from './component/login/login';
import Signup from './component/login/signup';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/supporter" element={<Supporter />} />
        <Route path="/course" element={<Course />} />
        <Route path="/" element={<Home />} />
        <Route path="/management" element={<Admin />} />
      </Routes>
    </Router>
    <Botchat />
    
    

  </React.StrictMode>
);
reportWebVitals();
