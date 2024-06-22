import React from "react";
import './loginFailue.css';
import { BiSolidError } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";

function LoginFailue({message}){
    return(
        <div className="container">
            <div className="content">
                <h3>THÔNG BÁO</h3>
                
                <div className="icon-content">
                    <h5 style={{}}>{message}</h5>
                     <BiSolidError className="icon"/>
                </div>
                
            </div>
            <div className="button"><IoIosCloseCircle className="close"/></div>
            
        </div>
    );
}


export default LoginFailue