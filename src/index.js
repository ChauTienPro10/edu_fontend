import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './component/home/Home';
import reportWebVitals from './reportWebVitals';
import Thpt from './component/thpt/thpt';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
reportWebVitals();
