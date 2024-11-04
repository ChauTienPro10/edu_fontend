import React,{ useState ,useEffect} from "react";
import './thpt.css';
import Slider from "react-slick";
import { FaYoutube } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import axios from 'axios';
import { SERVER_URL,SERVER_GATEWAY_URL } from "../../config";
import { BrowserRouter as Router, Route, Routes, Link,useLocation,useNavigate,Switch   } from 'react-router-dom';


function Thpt({level}){
    
    const navigate = useNavigate(); 

    //   lay danh sach khoa hoc
    const [courses,setCourses]=useState([]);
    useEffect(() => {
        // Lấy danh sách khóa học từ API hoặc backend
        fetchCourses();
      }, []);
    const fetchCourses = async () => {
        try {
        const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/getLevel?level=${level}`);
        await setCourses(response.data);
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };
    useEffect(() => {
        setCountTHPT(courses.length);
        setCountTHPTHot(courses.length);
    }, []); // Runs every time 'courses' state changes
   
    function toCoursePage(course){
        navigate('/course', { state: { course } });
    }
    
    const [countTHPT,setCountTHPT]=useState(courses.length); // quan ly new
    const [countTHPTHot,setCountTHPTHot]=useState(courses.length); // quan ly hot
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [positionHot, setPositionHot] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event) => {
        const initialX = event.clientX - position.x;
        const handleMouseMove = (event) => {
            if(event.clientX - initialX<=0 && event.clientX - initialX>=(-250*(countTHPT-3))){
                setPosition({
                    x: event.clientX - initialX,
                    y: position.y
                  });
            }
            else{
                if(event.clientX - initialX>0)
                setPosition({
                    x: 0,
                    y: position.y
                  });
                if(event.clientX - initialX<(-250*(countTHPT-3)))
                    setPosition({
                        x: (-250*(countTHPT-3)),
                        y: position.y
                      });
            }
          
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      const handleMouseDownHot = (event) => {
        const initialX = event.clientX - positionHot.x;
        const handleMouseMove = (event) => {
            if(event.clientX - initialX<=0 && event.clientX - initialX>=(-250*(countTHPTHot-5))){
                setPositionHot({
                    x: event.clientX - initialX,
                    y: positionHot.y
                  });
            }
            else{
                if(event.clientX - initialX>0)
                setPositionHot({
                    x: 0,
                    y: positionHot.y
                  });
                if(event.clientX - initialX<(-250*(countTHPTHot-5)))
                    setPositionHot({
                        x: (-250*(countTHPTHot-5)),
                        y: positionHot.y
                      });
            }
          
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

    //    const toCourseMore=async(course)=>{
        
    //     navigate('/course', { state: { course } });
    //   }
    return(
        <div className="thpt-container">
            <div className="hot-content new-content">
                <div className="img-adv"><img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/rzus2lc6.png?raw=true' /></div>
                <div className="slider-container ">
                    
                    <div className="but-tran prevous" onClick={()=>{
                            if(position.x + 250<=0 && position.x+250>=(-250*(countTHPT-3))){
                                setPosition({
                                    x: position.x+250,
                                    y: position.y
                                  });
                            }
                            else{
                                if(position.x +250>0)
                                setPosition({
                                    x: 0,
                                    y: position.y
                                  });
                                
                            }
                        }}>
                        <div className="circle"><FaChevronLeft style={{color:'gray'}}/></div>
                    </div>
                    <div className="but-tran next" onClick={()=>{
                            if(position.x - 250<=0 && position.x-250>=(-250*(countTHPT-3))){
                                setPosition({
                                    x: position.x-250,
                                    y: position.y
                                  });
                            }
                            else{
                                
                                if(position.x-250<(-250*(countTHPT-3)))
                                    setPosition({
                                        x: (-250*(countTHPT-3)),
                                        y: position.y
                                      });
                            }
                        }}>
                        <div className="circle-right"><FaChevronRight  style={{color:'gray'}}/></div>
                    </div>
                    <div className="slider" onMouseDown={handleMouseDown} style={{ left: `${position.x}px`,top: `${position.y}px`}}>
                        {courses.map((course, index) => (
                            <div className="course" key={index}>
                                <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                    ,padding:'4px',background:'blue',color:'white',fontSize:'10px'
                                }}>NEW</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>{course.title}</h4>
                                <p>Giáo viên:<a href="#">{course.teacher}</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button onClick={async ()=>{toCoursePage(course)}} className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
            <div className="hot-content">
            <div className="slider-container">
            <div className="but-tran prevous" onClick={()=>{
                            if(positionHot.x + 250<=0 && positionHot.x+250>=(-250*(countTHPTHot-5))){
                                setPositionHot({
                                    x: positionHot.x+250,
                                    y: positionHot.y
                                  });
                            }
                            else{
                                if(position.x +250>0)
                                setPositionHot({
                                    x: 0,
                                    y: positionHot.y
                                  });
                                
                            }
                        }}>
                        <div className="circle"><FaChevronLeft style={{color:'gray'}}/></div>
                    </div>
                    <div className="but-tran next" onClick={()=>{
                            if(positionHot.x - 250<=0 && positionHot.x-250>=(-250*(countTHPTHot-5))){
                                setPositionHot({
                                    x: positionHot.x-250,
                                    y: positionHot.y
                                  });
                            }
                            else{
                                
                                if(positionHot.x-250<(-250*(countTHPTHot-5)))
                                    setPositionHot({
                                        x: (-250*(countTHPTHot-5)),
                                        y: positionHot.y
                                      });
                            }
                        }}>
                        <div className="circle-right"><FaChevronRight  style={{color:'gray'}}/></div>
                    </div>
                    <div className="slider" onMouseDown={handleMouseDownHot} style={{ left: `${positionHot.x}px`,top: `${positionHot.y}px`}}>
                    {courses.map((course, index) => (
                            <div className="course" key={index}>
                                <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                    ,padding:'4px',background:'red',color:'white',fontSize:'10px'
                                }}>HOT</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>{course.title}</h4>
                                <p>Giáo viên:<a href="#">{course.teacher}</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Thpt