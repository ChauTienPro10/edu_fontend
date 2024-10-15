import "./change_pass.css";
import React,{useEffect,useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link,useLocation,useNavigate,Switch   } from 'react-router-dom';
import Header from "../header/Header";
import Footer from "../footer/footer";
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../config";

export default function ChangePassPage(){
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;
    
    const navigate=useNavigate();
    const [psswd,setPsswd]=useState('');
    const [againPass, setAgainPass]=useState('');
    const [err,setErr]=useState('');
    const [authen,setAuthen]=useState(false);
    const [oldPass,setOldPass]=useState('');
    const Fetch_authen=async ()=>{ // xac thuc truoc khi doi mat khau
        try{
            const response = await axios.post(`${SERVER_GATEWAY_URL}/api/identity/auth/authenpassword`, {
                username:user_._username,
                password:oldPass
              });
              if(response.data===true){
                setAuthen(true);
              }
              else{
                setErr('Xác thực thất bại ')
              }
        }
        catch(e){
            setErr(e);
        }
    }

    const change_password=async()=>{ // doi mat khau
        try{
            if(psswd===againPass){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/identity/users/user_change_pass`, {
                    username:user_._username,
                    password:psswd
                  });
                  if(response.data===true){
                    alert("Đã đổi mật khẩu");
                    navigate("/login");
                  }
                  else{
                    setErr('Đổi mật khẩu thất bại ')
                  }
            }
           
        }
        catch(e){
            setErr(e);
        }
    }
    useEffect(()=>{
        if(psswd!==againPass){
            setErr("Mật khẩu không khớp!");
        }
        else{
            setErr('');
        }
    },[psswd,againPass]);
    return (
        <div>
        <Header/>
        <div className="change-pass-body">
            
            <h3 style={{color:'grey'}}>Đổi mật khẩu</h3>
            {!authen && (
                <div className="change-pass-panel">
                    <div className="container-input">
                        <label htmlFor="psswd">Mật khẩu:</label>
                        <input type="password" id="psswd" value={oldPass} onChange={(e)=>setOldPass(e.target.value)}/>
                    </div>
                    <div className="container-input container-button">
                    <button onClick={()=>Fetch_authen()} style={{background:'rgb(82, 222, 247)'}}>Xác nhận</button>
                    <button onClick={()=>navigate(-1)}>Quay về</button>    
                </div>
                <p style={{color:'red' , margin:'20px' ,fontSize:'14px'}}>{err}</p>
                </div>
                
            )}
            {authen && (
            <div className="change-pass-panel">
                <div className="container-input">
                    <label htmlFor="psswd">Mật khẩu mới:</label>
                    <input type="password" id="psswd" value={psswd} onChange={(e)=>setPsswd(e.target.value)}/>
                </div>
                <div className="container-input">
                    <label htmlFor="psswd">Xác nhận mật khẩu:</label>
                    <input type="password" id="psswd-again" value={againPass} onChange={(e)=>setAgainPass(e.target.value)}/>
                </div>
                <div className="container-input container-button">
                    <button onClick={()=>change_password()} style={{background:'rgb(82, 222, 247)'}}>Xác nhận</button>
                    <button onClick={()=>navigate(-1)}>Quay về</button>    
                </div>
                <p style={{color:'red' , margin:'20px' ,fontSize:'14px'}}>{err}</p>
            
            </div>
            )}
        </div>
        <Footer/>
        </div>
        
    );
}