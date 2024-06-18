import React from "react";
import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { useState } from "react";
import { SERVER_URL } from "../../config";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import "./login.css"
function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${SERVER_URL}/user/login`, {
            username,
            password,
          }); 
          console.log(username+password);

          if(response.data!==null){
            sessionStorage.setItem('JWT_TOKEN', response.data.jwt);
            console.log(sessionStorage.getItem('JWT_TOKEN'));
            navigate('/home');
          }
        } catch (error) { 
          console.error(error);
        }
      };
    return(
        <div className="container-login"> 
            <form className="form-login" action="" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <IoKey className="icon"/>
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="#">Sign up</a></p>    
                </div>    
            </form>
        </div>
    );
}



export default Login