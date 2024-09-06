import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './component/home/Home';
import Supporter from './component/supporter/supporter';
import reportWebVitals from './reportWebVitals';
import Course from './component/courses/penCTiengAnh/course';
import Admin from './component/admin/admin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
reportWebVitals();
