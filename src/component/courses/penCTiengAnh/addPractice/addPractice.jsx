import './addPractice.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_GATEWAY_URL } from '../../../../config';
import { GiCoinsPile } from 'react-icons/gi';


export default function AddPracticePage({ show, setShow, course }) {
    const [content, setContent] = useState('');
    const [level, setLevel] = useState(0);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;

   
    const addCourse = async () => {
        try {
            const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/practice/addnew`,
                {
                    content:content,
                    courseId: course.id,
                    hardLevel:level,
                }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${user_._jwt}`,
                    },
                }
            );  
            if(response.data.code===1000){
                alert("Đã thêm bài tập")
                setContent('');
                setLevel(0);
            }
            else{
                alert(response.data.message);
            }


        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    return (
        <div style={{ display: show ? '' : 'none' }} className='add-practice-page-body'>
            <div className='main-board'>
                <h3>Thông tin của bài tập</h3>
                <label htmlFor='content-area' style={{ padding: '15px' }}>Đề bài:</label>
                <textarea onChange={(e) => setContent(e.target.value)} id='content-area' className='content-practice' value={content}/>
                <select onChange={(e) => setLevel(e.target.value)} style={{ padding: '5px', margin: '15px' }} id="choices" name="choices" value={level}>
                    <option  >Độ khó</option>
                    <option value="1">Dễ</option>
                    <option value="2">Trung bình</option>
                    <option value="3">Khá</option>
                    <option value="4">Giỏi</option>
                </select>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', padding: '10px' }}>
                    <button style={{
                        padding: '10px', marginRight: '20px', cursor: 'pointer', background: 'rgb(41, 177, 245)',
                        color: 'white', border: 'none'
                    }} onClick={() => addCourse()}>Lưu bài</button>
                    <button onClick={() => setShow(false)} style={{ padding: '10px', cursor: 'pointer', border: 'none' }}>Hủy</button>
                </div>

            </div>
        </div>
    )
}