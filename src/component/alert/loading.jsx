import React from "react";
import "./loading.css";


function MyLoading(){
    return(
        <div className="loading-container">
            <div className="content">
                <div className="parent pr1"><div className=" node node-1"></div></div>
                <div className="parent pr2"><div className="node node-2"></div></div>
                <div className="parent pr3"><div className="node node-3"></div></div>
                <div className="parent pr4"><div className="node node-4"></div></div>
                <div className="parent pr5"><div className="node node-5"></div></div>
            </div>
        </div>
    );
}


export default MyLoading