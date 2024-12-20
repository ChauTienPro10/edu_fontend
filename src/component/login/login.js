import React from "react";
import { useState } from "react";
import { SERVER_GATEWAY_URL } from "../../config";
import {  useNavigate   } from 'react-router-dom';

import axios from "axios";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaYahoo } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Footer from "../footer/footer";
import "./login.css"
import LoginResponse from "../../object/loginRespone";
import LoginSucces from "../alert/LoginSucces";
import LoginFailue from "../alert/loginFailue";
import MyLoading from "../alert/loading";
import Header from "../header/Header";
import MyJwtDecoder from "../../object/JwtDecoder ";
function Login(){
  
    return(
      
          <div className="login-body">
          <Header />
          <Body />
          <Footer />
        </div>
    
    );
}

function Body(){
  
  const [loginState,setLoginState]=useState(0);
  const [isLoading,setIsLoading]=useState(false);
    const navigate = useNavigate();
    const [username,setUsername]=useState('');
    const [password, setPassword]=useState('');
    const handleLogin=async(event) =>{
      event.preventDefault();
      setIsLoading(true)
      try {
        const response = await axios.post(`${SERVER_GATEWAY_URL}/api/identity/auth/token`, {
          username,
          password
        }); 
        const user = new LoginResponse(
          response.data.result.token,
          response.data.result.username,
          response.data.id
        );
        sessionStorage.setItem('user', JSON.stringify(user));
        const userJSON = sessionStorage.getItem('user');
        const user_ = userJSON ? JSON.parse(userJSON) : null;
        console.log(user_._jwt);
        sessionStorage.setItem('role',MyJwtDecoder(response.data.result.token,'').scope);
        if(user._jwt!==undefined){
          setIsLoading(false);
          setLoginState(1);
          
        }
        else{
          setIsLoading(false);
          setLoginState(2);
        } 
      } catch (error) {
        console.log(error);
        setLoginState(2);
        setIsLoading(false)
      }
    }
    return(
      <div className="body-container">
      <div style={{display:`${isLoading?'':'none'}`}}><MyLoading/></div>
      <div  onClick={()=>{setLoginState(0);}} style={{display:`${loginState!==2?'none':''}`}}>
        <LoginFailue message={'Đăng nhập thất bại'} />
      </div>
      <div id="loginSuccess" onClick={async ()=>{await setLoginState(0);navigate('/')}} style={{display:`${loginState!==1?'none':''}`}}>
        <LoginSucces message={'Đăng nhập thành công'} />
      </div>

        <div className="title">
          <h2>Đăng nhập tài khoản của bạn</h2>
          <p>Học tập và giao lưu với hàng triệu học </p>
          <p>viên trên mọi miền đất nước.</p>
        </div>
        <div className="face-google">
          <div className="button facebook">
            <FaFacebookF className="icon"/>
            <h4>Đăng nhập qua facebook</h4>
          </div>
          <div className="button google">
            <FaGoogle  className="icon"/>
            <h4>Đăng nhập qua google</h4>
          </div>
        </div>
        <div className="face-google yahoo-apple">
          <div className="button facebook yahoo">
            <FaYahoo className="icon"/>
            <h4>Đăng nhập qua Yahoo</h4>
          </div>
          <div className="button google apple">
            <FaApple  className="icon"/>
            <h4>Đăng nhập qua Apple</h4>
          </div>
        </div>
        <div className="border-line"></div>
        <form onSubmit={handleLogin}>
          <input id="email" type="email" placeholder="Email" required name="email" value={username}
          onChange={(e)=>setUsername(e.target.value)}/>
          <input id="pass" type="password" placeholder="Mật khẩu" required name="password" value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
          
        <button type="submit">Đăng nhập</button>
        <a href="#" style={{marginTop:'20px',fontSize:'14px',textDecoration:'none',color:'rgb(0, 162, 255)'}}>Quên mật khẩu?</a>
        </form>
        
      </div>
      
    );
  }
  export default Login
