import React from "react";
import './admin.css';
import { RiAdminFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FcStatistics } from "react-icons/fc";
import { IoMdArrowDropright } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";
import { Pie } from 'react-chartjs-2';
import { IoSettings } from "react-icons/io5";
import Course from "./course";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement);
function Admin(){
    return(
        <div className="main-body">
            <Taskbar/>
            <Content/>
        </div>
    );
}


function Taskbar(){
    return(
        <div className="task-bar">
          
                <div className="logo"><RiAdminFill style={{color:'rgb(77, 121, 214)', fontSize:'50px'}}/>
                    <h5 style={{color:'rgb(77, 121, 214)'}}>Admin</h5>
                </div>
                <div className="list-task">
                    <ul className="list-task-ul">
                        <li><IoHome style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Trang chủ</p>
                           <IoMdArrowDropright style={{marginLeft:'90px'}}/>
                        </li>
                        <li><FaBookMedical style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Khóa học</p>
                           <IoMdArrowDropright style={{marginLeft:'90px'}}/>
                        </li>
                        <li><FaChalkboardTeacher style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Giáo viên</p>
                        <IoMdArrowDropright style={{marginLeft:'90px'}}/></li>
                        <li><PiStudentFill style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Học viên</p>
                        <IoMdArrowDropright style={{marginLeft:'90px'}}/></li>
                        <li><FcStatistics style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Doanh số</p>
                        <IoMdArrowDropright style={{marginLeft:'90px'}}/></li>
                    </ul>
              
                </div>
           
        </div>
    );
    
}
function Content(){
    return(
        <div className="content-side">
            <div className="top-side">
                <div className="top-side-search">
                    <p style={{fontSize:'15px',marginRight:'10px'}}>🔍</p>
                    <input type="text" placeholder="Tiềm kiếm"/>
                    <button class="search-button"><CiSearch style={{color:'white'}}/></button>
                </div>
                <div className="top-side-setting"><IoSettings style={{fontSize:'25px',marginRight:'20px',
                    color:'gray'
                }}/></div>
            </div>
            <div className="content-side-board">
                <Course/>
            </div>
        </div>
    )
}

function Homecomponent(){
    return(
        <div className="dash-board-home">
            <div className="board board-1">
                <div className="board-teacher board-statistic">
                    <p style={{fontSize:'13px', color:'white'}}>Số lượng giảng viên</p>
                    <p style={{fontSize:'20px',color:'white'}}>100 giảng viên</p>
                    <FaChalkboardTeacher style={{color:'white',fontSize:'30px',marginBottom:'10px'}}/>
                </div>
                <div className="board-student board-statistic">
                    <p style={{fontSize:'13px', color:'white'}}>Số lượng học viên</p>
                    <p style={{fontSize:'20px',color:'white'}}>100 học viên</p>
                    <PiStudentFill style={{color:'white',fontSize:'30px',marginBottom:'10px'}}/>
                </div>
            </div>
            <div className="board board-2">
            <div className="board-course board-statistic">
                    <p style={{fontSize:'13px', color:'white'}}>Số lượng khóa học</p>
                    <p style={{fontSize:'20px',color:'white'}}>100 khóa học</p>
                    <FaBookMedical style={{color:'white',fontSize:'30px',marginBottom:'10px'}}/>
            </div>
            <div className="board-registration board-statistic">
                    <p style={{fontSize:'13px', color:'white'}}>Số lượng khóa học đã được đăng ký</p>
                    <p style={{fontSize:'20px',color:'white'}}>100 khóa học</p>
                    <GiArchiveRegister style={{color:'white',fontSize:'30px',marginBottom:'10px'}}/>
            </div>
            </div>
            <div className=" board-3">
                <PieChartTeacher th={40} thcs={20} thpt={30} dh={10}/>
                <PieChartStudent th={40} thcs={20} thpt={30} dh={10}/>
                <PieChartCourse th={40} thcs={20} thpt={30} dh={10}/>
            </div>
        </div>
    );
}


const PieChartTeacher = ({th,thcs,thpt,dh}) => {
    const _th=(th*100)/(th+thcs+thpt+dh);
    const _thcs=(thcs*100)/(th+thcs+thpt+dh);

    const _thpt=(thpt*100)/(th+thcs+thpt+dh);
    const _dh=(dh*100)/(th+thcs+thpt+dh);

    const data = {
      labels: ['Tiểu học','Thcs','Thpt','Đại học'],
      datasets: [
        {
          label: 'Số lượng %',
          data: [_th,_thcs,_thpt,_dh],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(245, 12, 12, 0.7)',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255,255,255,1)',
           
          ],
          borderWidth: 1
        }
      ]
    };
  
    return (
        <div style={{ width: '200px', height: '200px',display:'flex',alignItems:'center',flexDirection:'column' }}>
          <h2 style={{fontSize:'14px'}}>Thống kê giảng viên</h2>
          <Pie data={data} />
        </div>
      );
  };


  const PieChartStudent = ({th,thcs,thpt,dh}) => {
    const _th=(th*100)/(th+thcs+thpt+dh);
    const _thcs=(thcs*100)/(th+thcs+thpt+dh);

    const _thpt=(thpt*100)/(th+thcs+thpt+dh);
    const _dh=(dh*100)/(th+thcs+thpt+dh);

    const data = {
      labels: ['Tiểu học','Thcs','Thpt','Đại học'],
      datasets: [
        {
          label: 'Số lượng %',
          data: [_th,_thcs,_thpt,_dh],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(245, 12, 12, 0.7)',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255,255,255,1)',
           
          ],
          borderWidth: 1
        }
      ]
    };
  
    return (
        <div style={{ width: '200px', height: '200px',display:'flex',alignItems:'center',flexDirection:'column' }}>
          <h2 style={{fontSize:'14px'}}>Thống kê học viên</h2>
          <Pie data={data} />
        </div>
      );
  };


  const PieChartCourse = ({th,thcs,thpt,dh}) => {
    const _th=(th*100)/(th+thcs+thpt+dh);
    const _thcs=(thcs*100)/(th+thcs+thpt+dh);

    const _thpt=(thpt*100)/(th+thcs+thpt+dh);
    const _dh=(dh*100)/(th+thcs+thpt+dh);

    const data = {
      labels: ['Tiểu học','Thcs','Thpt','Đại học'],
      datasets: [
        {
          label: 'Số lượng %',
          data: [_th,_thcs,_thpt,_dh],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(245, 12, 12, 0.7)',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255,255,255,1)',
           
          ],
          borderWidth: 1
        }
      ]
    };
  
    return (
        <div style={{ width: '200px', height: '200px',display:'flex',alignItems:'center',flexDirection:'column' }}>
          <h2 style={{fontSize:'14px'}}>Thống kê khóa học</h2>
          <Pie data={data} />
        </div>
      );
  };
export default Admin