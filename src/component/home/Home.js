// src/Home.js
import React from 'react';
import "../assets/images/slide-4.png"
import "./Home.css"
import { IoSearch } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link,useLocation,useNavigate,Switch   } from 'react-router-dom';
import { FaFire } from "react-icons/fa6";
import Login from '../login/login';
import "./rzus2lc6.png"
import { FaUserGraduate } from "react-icons/fa";
import { GiMedal } from "react-icons/gi";
import Signup from '../login/signup';
import Alert from '../alert/alert';
import { FaBook } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaMessage } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import Footer from '../footer/footer';
import Thpt from '../thpt/thpt';
function Home() {
  
  
  return (
    
    <div className='container-home'> 
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <>
            <Alert />
            <Myheader />
            <Mybody />
            <Courses />
            <Footer/>
          </>
        } />
      </Routes>
    </Router>
  </div>
  );
}

function Myheader(){
  const navigate = useNavigate();
  const [isLogin,setIslogin]=useState(false);
  const [email,setEmail]=useState('email@gmail.comm')
  // xu ly xac thuc dang nhap
  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;
    if (user_!==null) {
      setEmail(user_._username);
      setIslogin(true);
    }
  }, []);
  const ToNavigate = (path) => {
    navigate(path);
  };
  const handleLogout=()=>{
    setIslogin(false);
  }
  const [isSmaller, setIsSmaller] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= 10) {
        setIsSmaller(true);
      } else {
        setIsSmaller(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return(
    
      <div className='header'>
        <div className='left-bar navbar'>
        <div
      className={`imagelogo ${isSmaller ? 'smaller' : ''}`}></div>
          <div className='search-box'>
            <IoSearch className='icon'/>
            <input type='text' placeholder='Tim kiem khoa hoc'/>
          </div>
        </div>
        <div className='right-bar navbar'>
          <div className='contactphone'><FaPhoneAlt className='icon'/><p>0812788212</p></div>
          <div className={`loginbox ${isLogin!==false?'hiden':''}`}>
            <button onClick={() => ToNavigate('/login')} className='loginbut'>Dang Nhap</button>
            <button onClick={() => ToNavigate('/signup')} className='signbox'>Dang Ky</button>
          </div>
          <Logined isLogin={isLogin} email={email} onLogout={handleLogout}/>
        </div>
      </div>
      


      
    
  );
}

function Logined({isLogin,email,onLogout}){
  const [showDetail, setShowDetail]=useState(false);
  const [showNotify, setShowNotify]=useState(false);
  const [showCart,setShowCart]=useState(false);
  return (
    <div className={`container-infor ${isLogin!==true?'hiden':''}`}>
      <div className='to-course'>
        <FaBook style={{marginRight:'10px',fontSize:'22px',color:'gray'}}/>
        <a  href='#'>Khóa học của tôi</a>
      </div>
      <div className='cart' onMouseEnter={()=>{setShowCart(true)}} onMouseLeave={()=>{setShowCart(false)}}>
       <FaShoppingCart style={{fontSize:'22px',color:'gray'}}/>
       <div className='dt-cart' style={{display:showCart?'':'none'}}>
        <ul>
          <li><a href='#'>Giỏ hàng trống</a></li>
        </ul>
       </div>
      </div>
      <div className='notify' onMouseEnter={()=>{setShowNotify(true)}} onMouseLeave={()=>{setShowNotify(false)}}>
        <IoNotifications style={{fontSize:'22px',color:'gray'}}/>
        <div className='dt-notify' style={{display:showNotify?'':'none'}}>
          <h4 style={{padding:'5px 0 10px 0'}}>Thông báo</h4>
          <div className='content-notify'>
            <ul>
              <li><a href='#'>Bạn chưa có thông báo nào.</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='yours' onMouseEnter={()=>{setShowDetail(true)}} onMouseLeave={()=>{setShowDetail(false)}}>
        <div className='avatar'></div>
        <RiArrowDownSFill />
        <div onMouseEnter={()=>{setShowDetail(true)}} onMouseLeave={()=>{setShowDetail(false)}} 
        className='detail' style={{display:showDetail?'':'none'}}>
          <div>
            <div className='avatar'></div>
            <div className='name-email'>
              <h4 style={{color:'black'}}>{email}</h4>
  
            </div>
          </div>
          <div>
            <FaMessage style={{marginRight:'10px',color:'gray'}}/>
            <p>Tin nhắn</p>
            <p style={{marginLeft:'150px',padding:'1px 10px 1px 10px',background:'red'
              ,borderRadius:'30px', alignItems:'center', color:'white',fontWeight:'700', fontSize:'12px'
            }}>0</p>
          </div>
          <div>
            <FaUser style={{color:'gray',marginRight:'10px'}}/>
            <p>Thông tin cá nhân</p>
          </div>
          <div>
            <FaKey style={{color:'gray',marginRight:'10px'}}/>
            <p>Đổi mật khẩu</p>
          </div>
          <div onClick={()=>{sessionStorage.clear(); onLogout()}}>
            <IoMdExit style={{color:'gray',fontSize:'20px',marginRight:'10px'}}/>
            <p>Đăng xuất</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mybody(){
  // ==========================================================================
  const [indexID, setIndexId]=useState(0);
  const [isHovered, setIsHovered] = useState(false);// xu ly hien thi show-detail  
  const handleMouseEnter = (id) => { // chuyen ve true neu re chuot vao
    setIsHovered(true);
    setIndexId(id);

  };

  const handleMouseLeave = () => { // chuyen ve false ne roi khoi
    setIsHovered(false);
  };
  // ========================================================================

  
  
  
  const [contentadv, setContentadv] = useState('Initial content');
  useEffect(() => {
    const intervalId = setInterval(() => {
      setContentadv(`New content at ${new Date().toLocaleTimeString()}`);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

 
  return (
    <div className='body'>
        <div className='select-level-bar'>
          <ul>
            <li className='thpt'><a href='#thpt'>THPT</a></li>
            <li className='thcs' style={{borderTop: '1px solid grey',borderBottom:'1px solid grey'}}><a href='#thcs'>THCS</a></li>
            <li className='th'><a href='#th'>TH</a></li>
          </ul>
        </div>
        <div className='menubar'>
          <ul>
            <li><Link to="/login">Giới thiệu</Link></li>
            <li><Link to="/login">Giáo viên</Link></li>
            <li><Link to="/login">Tự luyện</Link></li>
            <li><Link to="/login">Hướng nghiệp</Link></li>
            <li><Link to="/login">Thư viện</Link></li>
            <li><Link to="/login">Hướng dẫn đăng ký</Link></li>
            <li><Link to="/login">Hỗ trợ</Link></li>
          </ul>
        </div>
        <div className='container-content'>
          <div className='adverstion'>
            <div className="content">
              <FaFire className='icon-adverst'/>
              <p>{contentadv}Deal hôm nay: 10 mã giảm đến 40% danh cho 100 người nhanh tay nhất<Link to="">Nhân ngay</Link></p>
            </div>
          </div>
          <div className='list-course'>
            <div style={{display:"flex", justifyContent:'left' , alignItems:'center', fontSize:"18px"
              ,padding:'10px 0 5px 0', background:'rgba(184, 174, 174,0.3)',width:'100%'}}>
              <MdOutlineMenu className='iconmenu-listcource' style={{fontSize:'25px'}} />
              <p>Các khóa học</p>
            </div>
            
            <ul>
              <li onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave} 
                
                style={{display:'flex',alignItems:'center'}}>
                <RiGraduationCapFill /><p>Đại học-Cao đẳng</p></li>
              <li onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex',alignItems:'center'}}><RiGraduationCapFill /><p>Bổ trợ phương pháp-kỹ năng</p></li>
              <li onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex',alignItems:'center'}}><RiGraduationCapFill /><p>Bồi dưỡng học sinh giỏi</p></li>
              <li onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex', alignItems:'center'}}><RiGraduationCapFill /><p>LUYỆN THI ĐẠI HỌC</p></li>
              <li onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex',alignItems:'center'}}><RiGraduationCapFill /><p>Lơp 10-Lớp 11- Lớp 12</p></li>
              <li onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex', alignItems:'center'}}><RiGraduationCapFill /><p>Luyện thi vào 10</p></li>
              <li onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex', alignItems:'center'}}><RiGraduationCapFill /><p>Lớp 6- Lớp 7- Lớp 8- Lớp 9</p></li>
              <li onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex', alignItems:'center'}}><RiGraduationCapFill /><p>Luyện thi vào 6</p></li>
              <li onMouseEnter={() => handleMouseEnter(9)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex', alignItems:'center'}}><RiGraduationCapFill /><p>Lớp 1- Lớp 2- Lớp 3- Lớp 4- Lớp 5</p></li>
              <li onMouseEnter={() => handleMouseEnter(10)}
                onMouseLeave={handleMouseLeave} 
                style={{display:'flex', alignItems:'center'}}><RiGraduationCapFill /><p>Tiền tiểu học</p></li>
            </ul>
          </div>
          <div onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter(indexID)} className={`show-detail ${isHovered ? '' : 'hiden'}`}>
            <div className='show-detail-header'>
              <ShowDetailHeaderlist index={indexID}/>
            </div>
          </div>
          <AdverstBoard />
          <Certificate />
          <div className='information-plus'>
            <div className='years infor '>
              <h2>17 Năm</h2>
              <h3>Giáo dục trực tuyến</h3>
            </div>
            <div className='members infor'>
              <FaUserGraduate style={{color:"white", fontSize:'50px',marginRight:'15px'}}/>
              <div className='member-text'>
                <h2>6.909.535</h2>
                <h3>Thành viên</h3>
              </div>
            </div>
            <div className='forward infor'>
              <GiMedal  style={{color:"white", fontSize:'50px',marginRight:'15px'}}/>
              <div className='forward-text'>
                <h3>Nền tảng học trực tuyến</h3>
                <h2>Số 1 tại VIỆT NAM</h2>
              </div>
            </div>
          </div>
        </div>
        
      </div>
  )
}


function ShowDetailHeaderlist({ index }){
  // =======================================================================
  // const [itemsHeader, setItemsHeader] = useState([]);
  // =======================================================================
  if(index === 1){
    return(
      <ul>
        <li>KHÓA HỌC</li>
      </ul>
    );
  }
  if(index=== 2){
    return(
      <ul>
        <li>KIẾN THỨC</li>
        <li>PHƯƠNG PHÁP KỸ NĂNG</li>
        <li>TƯ DUY THỜI ĐẠI SỐ</li>
      </ul>
    );
  }
  if(index=== 3){
    return(
      <ul>
        <li>ILEARN</li>
        <li>ILIVE</li>
      </ul>
    );
  }
  if(index=== 4){
    return(
      <ul>
        <li>TOPONI</li>
        <li>SÁCH</li>
      </ul>
    );
  }
  if(index=== 5){
    return(
      <ul>
        <li>ILEARN</li>
        <li>SÁCH</li>
        <li>ILIVE</li>
      </ul>
    );
  }
  if(index=== 6){
    return(
      <ul>
        <li>KHÓA HỌC</li>
        <li>SÁCH</li>
      </ul>
    );
  }
  if(index=== 7){
    return(
      <ul>
        <li>ILEARN</li>
        <li>SÁCH</li>
        <li>ILIVE</li>
      </ul>
    );
  }
  if(index=== 8){
    return(
      <ul>
        <li>KHÓA HỌC</li>
        <li>SÁCH</li>
      </ul>
    );
  }
  if(index=== 9){
    return(
      <ul>
        <li>ILEARN</li>
        <li>ILIVE</li>
      </ul>
    );
  }
  if(index=== 10){
    return(
      <ul>
        <li>KHÓA HỌC</li>
      </ul>
    );
  }
  return(
    <ul>
      <li>Khoa hoc</li>
      <li>Khoa hoc</li>
    </ul>
  );
}

function AdverstBoard(){
  const [links, setLinks] = useState(['https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/rzus2lc6.png?raw=true'
    ,'https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'
  ]);
  const addLink = (url) => {
    setLinks([...links, url]);
  };
  const removeLink = (index) => {
    const newItems = [...links];
    newItems.splice(index, 1);
    setLinks(newItems);
  };
  const [focus,setFocus]=useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFocus((prevFocus) => {
        if (prevFocus === links.length - 1) {
          return 0;
        } else {
          return prevFocus + 1;
        }
      });
    }, 15000);
  
    return () => clearInterval(intervalId);
  }, [links.length]);
  return(
      <div className='adverst-board'>
        
        {links.map((link,index)=>(
            <><img src={link} className={` ${index===focus ? 'show-ad' : 'hiden'}`}/></>
          ))}
        <ul>
          {links.map((link,index)=>(
            <><li key={index}><input type='radio' value={index} name='pageIndex' 
            style={{backgroundColor: index===focus?'blue': 'transparent'}}/></li></>
          ))}
        </ul>
      </div>
  );
}


function Certificate(){
  return(
    <div className='certificate-board'>
      <div className='certificate-img'></div>
      <button onClick={()=>{
        const userJSON = sessionStorage.getItem('user');
        const user_ = userJSON ? JSON.parse(userJSON) : null;
        alert(user_._jwt);
      }}>TẢI ỨNG DỤNG HỌC MÃI</button>
    </div>
  );
}



function Courses(){
  return(
    <div className='courses-container'>
      <div className='thpt-thcs-th thpt-content' id='thpt'>
        <h4 style={{color:'gray',padding:'10px'}}>TRUNG HỌC PHỔ THÔNG</h4>
        <Thpt /></div>
      <div className='thpt-thcs-th thcs-content' id='thcs'>
      <h4 style={{color:'gray',padding:'10px'}}>TRUNG HỌC CƠ SỞ</h4>
        <Thpt /></div>
      <div className='thpt-thcs-th th-content' id='th'>
      <h4 style={{color:'gray',padding:'10px'}}>TIỂU HỌC</h4>
        <Thpt /></div>
      
    </div>
  );
}


export default Home;
