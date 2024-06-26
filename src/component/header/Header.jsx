
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { useState } from "react";
import { SERVER_URL } from "../../config";
import { BrowserRouter as Router, Route, Routes, Link,useLocation,useNavigate,Switch   } from 'react-router-dom';

import axios from "axios";
import Cookies from 'js-cookie';
import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaYahoo } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Footer from "../footer/footer";

import "./header.css"
import LoginResponse from "../../object/loginRespone";
import LoginSucces from "../alert/LoginSucces";
import LoginFailue from "../alert/loginFailue";
import MyLoading from "../alert/loading";
import ReactDOM from 'react-dom';

function Header(){
    // const navigate = useNavigate();
  
    //   const ToSignup = (path) => {
    //   navigate(path);
    // };
      return(
          <header>
              <div className="search-part">
                <div className="list-course-part">
                  <IoMdMenu className="icon"/>
                  <p>Các khóa học</p>
                </div>
                <div className="search-box-part">
                  <input type="text"  placeholder='Tim kiem khoa hoc'/>
                  <IoSearch className='icon' />
                </div>
              </div>
              <div className="button-part">
                <button className="login-but">Đăng nhập</button>
                <button  className="sign-but">Đăng ký</button>
              </div>
            </header>
      );
  }

  export default Header