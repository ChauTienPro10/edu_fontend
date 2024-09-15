
import React,{useState} from "react";



import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import { GiBatMask } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import "./header.css"
import { IoMdHome } from "react-icons/io";
import Wallet from "../metamask/wallet";

function Header(){
  const navigate = useNavigate(); 
    const [isShow,setIsShow]=useState(false);
      // const navigate = useNavigate();

      // const toOtherSite = (path) => {
      //   navigate(path);
      // };
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
              <div className="button-part">
                <GiBatMask onClick={()=>setIsShow(!isShow)} style={{
                  fontSize:'20px',
                  color:'rgb(156, 60, 4)',
                  cursor:'pointer'
                }}/>
                <button className="login-but" onClick={()=>navigate('/login')}>Đăng nhập</button>
                <button  className="sign-but" onClick={()=>navigate('/signup')} >Đăng ký</button>
              </div>
              <Wallet isShow={isShow} setIsShow={setIsShow}/>
            </header>
      );
  }

  export default Header