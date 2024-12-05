import React ,{useState,useEffect}from "react";
import './ad_login.css'
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../../config";
import MyJwtDecoder from "../../../object/JwtDecoder ";
import LoginResponse from "../../../object/loginRespone";
export default function AdLogin(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [login,setLogin]=useState(false);
    const [error,setError]=useState('');
    const role = sessionStorage.getItem('role');
    // xử lý đăng nhâp cho admin
    const handleLogin=async(event) =>{
       
        event.preventDefault();

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
          sessionStorage.setItem('role',MyJwtDecoder(response.data.result.token,'').scope);

          if((MyJwtDecoder(response.data.result.token,'').scope)==='ROLE_ADMIN'){
            setLogin(true);
            setError("xác thực thành công")
          }

          else{
                setError("Xác thực thất bại");
          } 

        } catch (error) {

          console.log(error);
         

        }

      }
    return(
        <div style={{display:(login||role==="ROLE_ADMIN")?'none':''}} className="ad-login-body">
            <div className="main-board">
                <input type="text" className="input input-username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" className="input input-password"  placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <p style={{color:'red', fontSize:'14px', margin:"10px"}}>{error}</p>
                <button onClick={(event)=>handleLogin(event)} className="button">Xác nhận</button>
            </div>
        </div>
    );
}