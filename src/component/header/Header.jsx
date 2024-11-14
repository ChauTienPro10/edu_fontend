
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import "./header.css"
import { IoMdHome } from "react-icons/io";
import { Logined } from "../home/Home";
import { FaBars } from "react-icons/fa";
import { SERVER_GATEWAY_URL } from "../../config";

import axios from "axios";
function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [searchText, setSearchText] = useState(''); // quan ly tim kiem khoa hoc

  // chuc nang tim kiem khoa hoc
  const findCourse = async () => {
    if (searchText !== '') {
      try {
        const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/search/${searchText}`);

        navigate('/result_search', { state: { listCourse: response.data } });
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  const [isTablet, setIsTablet] = useState(false);


  return (
    <header >
      <div className="search-part">
        <div className="list-course-part">
          <IoMdHome onClick={() => navigate('/')} className="icon" style={{ cursor: 'pointer' }} />
          <p>Các khóa học</p>
        </div>
        <div className="search-box-part">
          <input type="text" placeholder='Tim kiem khoa hoc' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <IoSearch className='icon' onClick={() => findCourse()} />
        </div>
      </div>
      {!isLogin && <div className="button-part">

        <button className="login-but" onClick={() => navigate('/login')}>Đăng nhập</button>
        <button className="sign-but" onClick={() => navigate('/signup')} >Đăng ký</button>
      </div>}

      {!isLogin && <div className="button-part-tablet">
        <FaBars className="icon-bars" onClick={() => setIsTablet(!isTablet)} />
        {isTablet && (
          <div className="icon-bars-show-button">
            <button className="login-but" onClick={() => {navigate('/login'); setIsTablet(false)}}>Đăng nhập</button>
            <button className="sign-but" onClick={() => {navigate('/signup');setIsTablet(false)}} >Đăng ký</button>
          </div>
        )}


      </div>}
      <Logined isLogin={isLogin} setIsLogin={setIsLogin} />

    </header>
  ); 
}

export default Header