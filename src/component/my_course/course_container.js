import './My_course.css';
import React,{useState, useEffect} from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/footer';
import { FaYoutube } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import axios from 'axios';
import { SERVER_GATEWAY_URL } from '../../config';

export default function Container_course(){
    const location = useLocation();
    const { listCourse } = location.state || {};
    console.log(listCourse);
    return (
        <div className='my-course-body'>
            <Header/>
            <div className='my-course-body-main'>
                {(listCourse===undefined || listCourse===null) && (<p>Không có nội dung thích hợp</p>)}
                {listCourse && listCourse.map((course,index)=>(
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
                        <button className="but-moreinfor" >ĐẾN KHÓA HỌC</button>
                    </div>
                </div>
                ))}
                
                
            </div>
            <Footer/>
        </div>
    );
}