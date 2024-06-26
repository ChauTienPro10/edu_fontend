import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './component/home/Home';
import reportWebVitals from './reportWebVitals';
import Course from './component/courses/penCTiengAnh/course';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Course />
  </React.StrictMode>
);
reportWebVitals();
