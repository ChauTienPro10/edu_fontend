import React,{useState} from "react";
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
import Statistic from "./statistic";
import NewTeacher from "./newTeacher";
import NewSubject from "./subject";
import NewCourse from "./newCourse";
import Teacher from "./teacher";
import NewNotice from "./newNotify";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement);
function Admin(){
  const [indextask,setIndextask]=useState(0);
    return(
        <div className="main-body">
            <Taskbar indextask={indextask} setIndextask={setIndextask}/>
            <Content indextask={indextask} setIndextask={setIndextask}/>
        </div>
    );
}


function Taskbar({ indextask,setIndextask }){
    const activeStyle = {
        backgroundColor: 'rgb(77, 121, 214)',
        color: 'white',
    };
    
    return(
        <div className="task-bar">
          
                <div className="logo"><RiAdminFill style={{color:'rgb(77, 121, 214)', fontSize:'50px'}}/>
                    <h5 style={{color:'rgb(77, 121, 214)'}}>Admin</h5>
                </div>
                <div className="list-task">
                    <ul className="list-task-ul">
                        <li style={indextask===1?activeStyle:{}} onClick={()=>{setIndextask(1)}}><IoHome style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Trang chủ</p>
                           <IoMdArrowDropright style={{marginLeft:'90px'}}/>
                        </li>
                        <li style={indextask===2?activeStyle:{}} onClick={()=>{setIndextask(2)}}><FaBookMedical style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Khóa học</p>
                           <IoMdArrowDropright style={{marginLeft:'90px'}}/>
                        </li>
                        <li style={indextask===3?activeStyle:{}} onClick={()=>{setIndextask(3)}}><FaChalkboardTeacher style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Giáo viên</p>
                        <IoMdArrowDropright style={{marginLeft:'90px'}}/></li>
                        <li style={indextask===4?activeStyle:{}} onClick={()=>{setIndextask(4)}}><PiStudentFill style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Học viên</p>
                        <IoMdArrowDropright style={{marginLeft:'90px'}}/></li>
                        <li style={indextask===5?activeStyle:{}} onClick={()=>{setIndextask(5)}}><FcStatistics style={{fontSize:'20px',marginRight:'5px'}}/><p style={{fontSize:'14px',width:'100px'}}>Doanh số</p>
                        <IoMdArrowDropright style={{marginLeft:'90px'}}/></li>
                    </ul>
              
                </div>
           
        </div>
    );
    
}
function Content({ indextask,setIndextask }){
   const[setting,setSettting]=useState(false); // quan ly hien thi setting (them giao vien hoac them khoa hoc)
 
  const [indexSetting,setIdexSetting]=useState('');
    return(
      
        <div className="content-side">
            <div style={{display:indexSetting==='TC'?'':'none'}}><NewTeacher setIndedx={setIdexSetting}/></div>
            <div style={{display:indexSetting==='SJ'?'':'none'}}><NewSubject setIndedx={setIdexSetting}/></div>
            <div style={{display:indexSetting==='C'?'':'none'}}><NewCourse setIndedx={setIdexSetting}/></div>
            <div style={{display:indexSetting==='TB'?'':'none'}}><NewNotice setIndedx={setIdexSetting}/></div>
            <div className="top-side">
                <div className="top-side-search">
                    <p style={{fontSize:'15px',marginRight:'10px'}}>🔍</p>
                    <input type="text" placeholder="Tiềm kiếm"/>
                    <button class="search-button"><CiSearch style={{color:'white'}}/></button>
                </div>
                <div onMouseEnter={()=>setSettting(true)} onMouseLeave={()=>setSettting(false)} className="top-side-setting"><IoSettings style={{fontSize:'25px',marginRight:'20px',
                    color:'gray'
                }}/>
                  <div style={{display:setting?'':'none'}} className="setting-mode">
                    <ul>
                      <li onClick={()=>setIdexSetting('TC')}>Thêm giáo viên</li>
                      <li onClick={()=>setIdexSetting('C')}>Thêm khóa học</li>
                      <li onClick={()=>setIdexSetting('SJ')}>Thêm lĩnh vựt giảng dạy</li>
                      <li onClick={()=>setIdexSetting('TB')}>Thêm Thông báo</li>
                    </ul>
                    
                  </div>
                </div>
            </div>
            <div className="content-side-board">
              <div className={`content-side-board-child  ${indextask!==1?'hiden':''} `} ><Homecomponent /></div>
              <div className={ `content-side-board-child  ${indextask!==2?'hiden':''}`} ><Course /></div>
              <div className={`content-side-board-child  ${indextask!==3?'hiden':''}`} ><Teacher /></div>
              <div className={`content-side-board-child  ${indextask!==4?'hiden':''}`} ><Statistic /></div>
              <div className={`content-side-board-child  ${indextask!==5?'hiden':''}`} ><Statistic /></div>
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