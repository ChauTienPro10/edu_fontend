import './My_course.css';
import React,{useState, useEffect} from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/footer';
import { FaYoutube } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import axios from 'axios';
import { SERVER_GATEWAY_URL } from '../../config';

export default function MyCourse(){
    const [courses,setCourses]=useState([{}]);
    const location = useLocation();
    const { email } = location.state || {};
    const navigate=useNavigate();
    function toCoursePage(course){
        navigate('/course', { state: { course } });
    }
    const fetchGetYourCours=async ()=>{
        try {
           
            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/student/register/getyourcourse?email=${email}`);
            await setCourses(response.data.result);
            
            } catch (error) {
            console.error('Error fetching courses:', error);
            }
    }
    useEffect(()=>{
        fetchGetYourCours();
    },[]) 
    return (
        <div className='my-course-body'>
            <Header/>
            <div className='my-course-body-main'>
                {courses && courses.map((course,index)=>(
                    <div className='course-item'>
                    <div className="course-dt">
                        
                        <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                        <h4>{course.title}</h4>
                        <div className="baigiang" >
                            <FaYoutube style={{color:'red'}}/>
                            <a href="#">61 bài giảng</a></div>
                        <div className="baigiang" >
                            <FaQuestionCircle style={{color:'rgb(0, 119, 255)'}}/>
                            <a  href="#">1000 câu hỏi</a></div>
                        <button className="but-moreinfor" onClick={()=>toCoursePage(course)}>ĐẾN KHÓA HỌC</button>
                    </div>
                </div>
                ))}
                
                
            </div>
            <Footer/>
        </div>
    );
}