import React from "react";
import './alert.css';
import { useState } from "react";
function Alert(){
    const [close,setClose]=useState(false);
    return(
        <div  className={`alert-body ${close?'hiden':''}`}>
            <div className="content">
                <img src="https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/popup-top-uni3.png?raw=true"/>
                <button onClick={()=>setClose(true)}></button>
            </div>
        </div>
    );
}

export default Alert