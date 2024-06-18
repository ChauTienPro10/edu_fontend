
import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaUserGraduate ,FaAddressCard } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import "./signup.css";

function Signup(){
    return(
        <div className="container"> 
            <form action="" >
                <h1>Sign Up</h1>
                <div className="input-box">
                    <p>*</p>
                    <input type="text" placeholder="Your full name" required 
                    />
                    <FaUserGraduate  className="icon"/>
                </div>
                <div className="input-box">
                    <p>*</p>
                    <input type="text" placeholder="Citizen ID" required 
                    />
                    <FaAddressCard className="icon"/>
                </div>
                <div className='contact'>
                <div className="input-box">
                    <p>*</p>
                    <input type="email" placeholder="@gmail.com" required 
                   />
                    <IoIosMail className="icon"/>
                </div>
                <div className="input-box"><p>*</p>
                    <input type="tel" placeholder="phone" required 
                   />
                    <select name='country'><option value={+84}>VIETNAM</option></select>
                </div>
                </div>
                <div className="input-box"><p>*</p>
                    <input type="password" placeholder="password" required 
                    />
                    <IoKey className="icon"/>
                </div>
                <div className="input-box"><p>*</p>
                    <input type="password" placeholder="confirm password" required 
                    />
                    <IoKey className="icon"/>
                </div>
                <div className="policy">
                    <label><input type="checkbox"/>I argee with your cookies</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Sign Up</button>
                <div className="register-link">
                    <p>Back <a href="#">Login</a></p>    
                </div>    
            </form>
        </div>
    );
}


export default Signup;


