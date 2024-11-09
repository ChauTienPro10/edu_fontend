import './practice.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MathQuill, { addStyles, EditableMathField } from 'react-mathquill';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { SERVER_GATEWAY_URL } from '../../../../config';
import axios from 'axios';

export default function Practice() {
    const { id } = useParams();
    const [result, setResult] = useState('');
    const [comment, setComment] = useState(false);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;

    // xu ly các ký tự toán học 
    const insertSquareRoot = () => { setResult((prevValue) => `${prevValue}\\sqrt{ }`); };
    const binhphuong = () => { setResult((prevValue) => `${prevValue}x^2`); };
    // kết thúc xử lý các ký tự toán học

    const reset = () => {
        setResult('');
    }

    // thêm mới một lời giải
    const addResolve = async () => {
        try {
            const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/practice/resolve/add`,
                {
                    studentEmail: "student@example.com",
                    practiceId: "7fccd39b-91ec-4f62-94f7-ece4a07404d5",
                    result: "a+b=c+20",
                }

            );
            if (response.data.code === 1000) {
                console.log(response.data.result);
            }
            else {
                console.log(response.data.message);
            }
        }
        catch (e) {
            alert(e);
        }
    }
    // Kết thúc xử lý thêm một lời giải mới 

    //Xuwe lý nhận tất cả lời giải của khóa học
    const [resolves,setResolves]=useState([]);
    const getRsolves=async()=>{ 
        try{
            const response=await axios.get();
            
        }
        catch(e){
            alert(e);
        }
    }
    // kết thúc xử lý nhananj tất cả lời giải

    return (
        <div className='practice-body-page'>
            {/* <h1>Practice Page</h1> 
            <p>Practice ID: {id}</p> */}
            <div className='board-left'>
                <div className='practice-content'>
                    <h4>Đề bài:</h4>
                    <p>đề bài số 1 đề bài số 1 đề bài số 1 đề bài số 1 đề bài số 1 đề bài số 1 đề bài số 1 đề bài số 1 đề bài số 1 </p>
                </div>
                <div className='board-resolve'>

                    <div className="math-editor-container">
                        <div className="math-editor">
                            <div className='opt-math'>
                                <button onClick={() => insertSquareRoot()}>Sqrt</button>
                                <button onClick={() => binhphuong()}>^2</button>
                            </div>
                            <textarea className='text-edit-area' onChange={(e) => setResult(e.target.value)} value={result} />
                        </div>
                        <p>kêt quả: </p>
                        <div style={{ maxWidth: '100%', whiteSpace: 'normal', overflowWrap: 'break-word', overflowX: 'scroll' }}>
                            <InlineMath>{result}</InlineMath>
                        </div>

                    </div>
                    <div className='option-button'>
                        <button className='button-write' onClick={() => addResolve()}>Đăng lời giải</button>
                        <button style={{ marginLeft: '20px', fontSize: '10px', padding: '3px 10px' }} onClick={() => reset()}>Đặt lại</button>
                    </div>
                </div>
            </div>


            <div className='board-right'>
                <h3 style={{ color: 'grey', fontSize: '16px', width: '100%', padding: '15px' }}>Danh sách lời giải</h3>
                <div className='result-show'>
                    <h6>From: {'mail@gmmail.com'}</h6>
                    <div style={{ maxWidth: '100%', whiteSpace: 'normal', overflowWrap: 'break-word', overflowX: 'scroll', fontSize: '14px' }}>
                        <InlineMath>{result}</InlineMath>
                    </div>
                    <div className='interaction-opt'>
                        <label style={{ fontSize: '10px', padding: '5px' }} htmlFor='like-icon'>{10}</label>
                        <AiFillLike id='llke-icon' style={{ cursor: 'pointer' }} />
                        <label style={{ fontSize: '10px', padding: '5px', marginLeft: '40px' }} htmlFor='comment-icon'>{1}</label>
                        <FaCommentAlt id='comment-icon' style={{ cursor: 'pointer', fontSize: '14px' }}
                            onClick={() => setComment(!comment)}
                        />
                    </div>
                    <div style={{ display: comment ? '' : 'none' }} className='disscus-area'>
                        <div className='cmt-content'>
                            <p style={{ fontSize: '10px', padding: '5px' }}>a@gmail.com</p>
                            <textarea style={{
                                fontSize: '10px', width: '400px', border: 'none'
                                , marginLeft: '50px'
                            }} value={'nội dung bình luận'}></textarea>

                        </div>


                    </div>

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', paddingTop: '50px' }}>
                        <textarea style={{ width: '80%', padding: '5px', height: '30px' }} />
                        <button style={{ width: '50px', height: '30px', cursor: 'pointer' }}>Gửi</button>
                    </div>
                </div>

            </div>
        </div>
    )
}