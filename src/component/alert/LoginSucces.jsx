import React from "react";
import './loginFailue.css';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

function LoginSucces({message}){
    return(
        <div className="container">
            <div className="content">
                <h3 style={{color:'green'}}>THÔNG BÁO</h3>
                
                <div className="icon-content">
                    <h5 style={{}}>{message}</h5>
                     <FaCheckCircle className="icon" style={{color:'green',marginTop:'10px'}}/>
                </div>
                
            </div>
            <div className="button"><IoIosCloseCircle className="close" style={{color:'green'}}/></div>
            
        </div>
    );
}


export default LoginSucces