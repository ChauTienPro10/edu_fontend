// src/Home.js
import React from 'react';
import "../assets/images/slide-4.png"
import "./Home.css"
import { IoSearch } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link,useLocation  } from 'react-router-dom';
import { FaFire } from "react-icons/fa6";
import Login from '../login/login';
function Home() {
  
  return (
    <div className='container-home'> 
    <Router>
    <Myheader />
    <Mybody />
    <main>
          <Routes>
           <Route path="/login" element={<Login />} /> 
          </Routes>
        </main>
      </Router>
    </div>
  );
}

function Myheader(){
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
          <div className='loginbox'>
            <button className='loginbut'>Dang Nhap</button>
            <button className='signbox'>Dang Ky</button>
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
            <li className='thpt'>THPT</li>
            <li className='thcs' style={{borderTop: '1px solid grey',borderBottom:'1px solid grey'}}>THCS</li>
            <li className='th'>TH</li>
          </ul>
        </div>
        <div className='menubar'>
          <ul>
            <li><Link to="/login">Gioi thieu</Link></li>
            <li><Link to="/login">Giao vien</Link></li>
            <li><Link to="/login">Tu luyen</Link></li>
            <li><Link to="/login">Huong nghiep</Link></li>
            <li><Link to="/login">Thu vien</Link></li>
            <li><Link to="/login">Huong dan dang ky</Link></li>
            <li><Link to="/login">Ho tro</Link></li>
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

export default Home;
