
import React,{useState,useEffect} from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import "./header.css"
import { IoMdHome } from "react-icons/io";
import { Logined } from "../home/Home";
function Header(){
  const navigate = useNavigate(); 
  const [isLogin,setIsLogin]=useState(false);
    
     
      return(
          <header>
              <div className="search-part">
                <div className="list-course-part">
                  <IoMdHome onClick={()=>navigate('/')} className="icon" style={{cursor:'pointer'}}/>
                  <p>Các khóa học</p>
                </div>
                <div className="search-box-part">
                  <input type="text"  placeholder='Tim kiem khoa hoc'/>
                  <IoSearch className='icon' />
                </div>
              </div>
              {!isLogin && <div className="button-part">
                
                <button className="login-but" onClick={()=>navigate('/login')}>Đăng nhập</button>
                <button  className="sign-but" onClick={()=>navigate('/signup')} >Đăng ký</button>
              </div>}
              <Logined isLogin={isLogin} setIsLogin={setIsLogin}/>

            </header>
      );
  }

  export default Header