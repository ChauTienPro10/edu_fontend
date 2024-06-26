import React,{ useState ,useEffect} from "react";
import './thpt.css';
import Slider from "react-slick";
import { FaYoutube } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import axios from 'axios';
import { SERVER_URL } from "../../config";

function Thpt(){
    const [countTHPT,setCountTHPT]=useState(5);
    const [position, setPosition] = useState({ x: 0, y: 0 });
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

    //   lay danh sach khoa hoc
    const [courses,setCourses]=useState([]);
    useEffect(() => {
        // Lấy danh sách khóa học từ API hoặc backend
        fetchCourses();
      }, []);
    const fetchCourses = async () => {
        try {
        const response = await axios.get(`${SERVER_URL}/course/getCourse`);
        await setCourses(response.data);
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };
    
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
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                    ,padding:'4px',background:'blue',color:'white',fontSize:'10px'
                                }}>NEW</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>{courses[0].name}</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button onClick={()=>{alert('l')}} className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'blue',color:'white',fontSize:'10px'
                                }}>NEW</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button onClick={()=>{alert('l')}} className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'blue',color:'white',fontSize:'10px'
                                }}>NEW</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'blue',color:'white',fontSize:'10px'
                                }}>NEW</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'blue',color:'white',fontSize:'10px'
                                }}>NEW</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="hot-content">
            <div className="slider-container">
                    <div className="but-tran prevous">
                        <div className="circle"><FaChevronLeft style={{color:'gray'}}/></div>
                    </div>
                    <div className="but-tran next">
                        <div className="circle-right"><FaChevronRight  style={{color:'gray'}}/></div>
                    </div>
                    <div className="slider">
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                    ,padding:'4px',background:'red',color:'white',fontSize:'10px'
                                }}>HOT</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'red',color:'white',fontSize:'10px'
                                }}>HOT</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'red',color:'white',fontSize:'10px'
                                }}>HOT</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'red',color:'white',fontSize:'10px'
                                }}>HOT</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="course">
                            <div className="course-dt">
                                <p style={{position:'absolute',top:'0',left:'0'
                                        ,padding:'4px',background:'red',color:'white',fontSize:'10px'
                                }}>HOT</p>
                                <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                                <h4>PEN-C TIẾNG ANH</h4>
                                <p>Giáo viên:<a href="#">thầy Châu Dương Phát Tiến</a></p>
                                <div className="baigiang" >
                                    <FaYoutube style={{color:'red'}}/>
                                    <a href="#">61 bài giảng</a></div>
                                <div className="baigiang" >
                                    <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                                    <a  href="#">1000 câu hỏi</a></div>
                                <button className="but-moreinfor">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Thpt