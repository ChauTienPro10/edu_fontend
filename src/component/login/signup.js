import React from "react";
import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaYahoo } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Footer from "../footer/footer";
import { SERVER_GATEWAY_URL } from "../../config";
import MyLoading from "../alert/loading";
import LoginSucces from "../alert/LoginSucces";
import LoginFailue from "../alert/loginFailue";
import "./login.css"
import Login from "./login";
function Signup(){
    return(
      
          <div className="login-body">
            
          <Header />
          <Body />
          <Footer />
        </div>
        
        
   
    );
}
function Header(){
  const navigate = useNavigate();

  const ToLogin = (path) => {
    navigate(path);
  };
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
            <button onClick={() => ToLogin('/login')} className="login-but">Đăng nhập</button>
            <button className="sign-but">Đăng ký</button>
          </div>
        </header>
  );
}
function Body(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password,setPassword]=useState('');
  const [validpass,setValidpass]=useState(false);
  const [isLoading,setIsLoading]=useState(false); // quan ly loading 
  const [loginState,setLoginState]=useState(0); // quan ly dang ky thanh cong hoac that bai copy tu login.js k doi ten
  const handleSignup = async (event) => {
    setIsLoading(true); // hien loading
    event.preventDefault(); 

    try {
      const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/profile/new`, {
        name,
        email,
        phone,
        password
      });

      // Xử lý dữ liệu trả về từ server
      console.log(response.data);

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      if(response.data.code===1000){
        setIsLoading(false); // an loading
        setLoginState(1); // dang ky tai khoang moi thanh cong
      }
      else{
        setIsLoading(false);
        setLoginState(2);
      }
  
    } catch (error) {
      // Xử lý lỗi
      setIsLoading(false);
       // dang ky tai khoan moi that bai
    }
  };
  return(
    <div className="body-container">
      <div style={{display:`${isLoading?'':'none'}`}}><MyLoading/></div>
      <div onClick={()=>{setLoginState(0);}} style={{display:`${loginState!==2?'none':''}`}}>
        <LoginFailue message={'Đăng ký thất bại'} />
      </div>
      <div onClick={async ()=>{await setLoginState(0);}} style={{display:`${loginState!==1?'none':''}`}}>
        <LoginSucces message={'Đăng ký thành công'} />
      </div>
      <div className="title">
        <h2>Tạo tài khoản của bạn</h2>
        <p>Học tập và giao lưu với hàng triệu học </p>
        <p>viên trên mọi miền đất nước.</p>
      </div>
      <div className="face-google">
        <div className="button facebook">
          <FaFacebookF className="icon"/>
          <h4>Đăng ký qua facebook</h4>
        </div>
        <div className="button google">
          <FaGoogle  className="icon"/>
          <h4>Đăng ký qua google</h4>
        </div>
      </div>
      <div className="face-google yahoo-apple">
        <div className="button facebook yahoo">
          <FaYahoo className="icon"/>
          <h4>Đăng ký qua Yahoo</h4>
        </div>
        <div className="button google apple">
          <FaApple  className="icon"/>
          <h4>Đăng ký qua Apple</h4>
        </div>
      </div>
      <div className="border-line"></div>
      <form onSubmit={handleSignup}>
        <input id="namebox" type="text" placeholder="Họ và tên" required name="name" value={name} 
        onChange={(e) => setName(e.target.value)}/>
        <input id="emailbox" type="email" placeholder="Email" required name="email" value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input id="telbox" type="tel" required placeholder="Số điện thoại" name="phone" value={phone}
        onChange={(e) => setPhone(e.target.value)}/>
        <div className="password">
          <input id="pass" type="password" required name="password" placeholder="Mật khẩu" value={password}
          onChange={(e)=> setPassword(e.target.value)}/>
          <input id="passagainbox" type="password" required name="password-cfỉrm" placeholder="Xác nhận mật khẩu"
          onChange={(e)=> {e.target.value===password?setValidpass(true):setValidpass(false)}}/>
        </div>
        <p style={{color:'red',fontSize:'12px',display:validpass===false?'':'none'}}>Mật khâu không khớp!</p>
        <div className="policy">
        <p>(*) Khi bấm vào đăng ký tài khoản, bạn chắn chắc đã đọc và đông ý với {" "}
          <a href="#">chính sách bảo mật, điều khoảng dịch vụ và chính sách tư vấn</a>{" "}  của chúng tôi</p>
      </div>
      <button type="submit">Đăng ký</button>
      </form>
      
    </div>
    
  );
}


export default Signup