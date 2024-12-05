import './practice.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MathQuill, { addStyles, EditableMathField } from 'react-mathquill';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { SERVER_GATEWAY_URL } from '../../../../config';
import { FaUser } from "react-icons/fa";
import axios from 'axios';

export default function Practice() {
    const { id } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const practice = urlParams.get('content'); // Lấy giá trị của tham số content

    const [comment, setComment] = useState({ state: false, idResolve: '' });
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;

    // xu ly các ký tự toán học 
    const insertSquareRoot = () => { setResult((prevValue) => `${prevValue}\\sqrt{ }`); };
    const binhphuong = () => { setResult((prevValue) => `${prevValue}x^2`); };
    const sin = () => {
        setResult((prevValue) => `${prevValue}\\sin()`);
    };
    const cos = () => {
        setResult((prevValue) => `${prevValue}\\cos(x)`);
    };
    
    const tan = () => {
        setResult((prevValue) => `${prevValue}\\tan()`);
    };
    
    const cot = () => {
        setResult((prevValue) => `${prevValue}\\cot()`);
    };
    const integral = () => {
        setResult((prevValue) => `${prevValue}\\int_{a}^{b}()`);
    };
    const lim = (a, b) => {
        setResult((prevValue) => `${prevValue}\\lim_{a \\to b}()`);
    };
    const derivative = () => {
        setResult((prevValue) => `${prevValue}\\frac{d}{dx} (f(x))`);
    };
    const An = () => {
        setResult((prevValue) => `${prevValue}A_n`); // Sử dụng ký hiệu LaTeX
    };
    const infinity = () => {
        setResult((prevValue) =>`${prevValue}\\infty`); // Cú pháp LaTeX cho vô cùng
    };
    // kết thúc xử lý các ký tự toán học

    const reset = () => {
        setResult('');
    }

    const setShowCmt = async (idResolve) => {
        const newstate = !comment.state;
        await setComment({ state: newstate, idResolve: idResolve });
    }
   

    // thêm mới một lời giải
    const [result, setResult] = useState('');

    const addResolve = async () => {
        try {
            const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/practice/resolve/add`,
                {
                    studentEmail: user_._username,
                    practiceId: id,
                    content: result,
                }

            );
            if (response.data.code === 1000) {
                getRsolves();
                alert("Đã đăng lời giải của bạn")
                setResult('');
            }
            else {
                alert(response.data.message);
            }
        }
        catch (e) {
            alert(e);
        }
    }
    // Kết thúc xử lý thêm một lời giải mới 

    //Xuwe lý nhận tất cả lời giải của khóa học
    const [resolves, setResolves] = useState([]);
    const getRsolves = async () => {
        try {
            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/practice/resolve/getAll?idPractice=${id}`);
            setResolves(response.data);
            console.log(response.data)
        }
        catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        getRsolves();
    }, [])
    // kết thúc xử lý nhananj tất cả lời giải


    //  Xử lý like mộ lời giải


    const isLiked = async (likes) => {

        if (likes.length > 0) {
            for (const like of likes) {
                if (like.email === user_._username) {

                    return true; // Dừng hàm và trả về true khi tìm thấy một mục khớp
                }
            }
        }
        return false; // Trả về false nếu không tìm thấy mục nào khớp
    };
    const likeActive = async (likes, resolveId) => {


        // Kiểm tra nếu danh sách likes trống hoặc người dùng chưa thích (like) bài này
        if ((await isLiked(likes)) === false) {
            try {
                const response = await axios.post(
                    `${SERVER_GATEWAY_URL}/api/elasticSearch/practice/resolve/like`,
                    {
                        resolveId: resolveId,
                        email: user_._username
                    }
                );
                if (response) {
                    getRsolves();
                }
            } catch (e) {
                alert(e);
            }
        }
    };

    const [likedStates, setLikedStates] = useState({});
    useEffect(() => {
        const fetchLikedStates = async () => {
            const newLikedStates = {};
            for (const resolve of resolves) {
                const isLikedByUser = await isLiked(resolve.likes);
                newLikedStates[resolve.id] = isLikedByUser;
            }
            setLikedStates(newLikedStates);
        };

        fetchLikedStates();
    }, [resolves]);



    // kết thúc xử lý like một lời giải


    // gửi bình luân
    const [cmtContent, setCmtContent] = useState('');
    const sendCmt = async (resolveId) => {
        try {
            const response = await axios.post(
                `${SERVER_GATEWAY_URL}/api/elasticSearch/practice/resolve/comment/new`,
                {
                    content: cmtContent,
                    resolveId: resolveId,
                    email: user_._username
                }
            );
            getRsolves();
            setCmtContent('');

        } catch (e) {
            alert(e);
        }
    }



    //  kết thúc xử lý gửi bình luận

    return (
        <div className='practice-body-page'>
            {/* <h1>Practice Page</h1> 
            <p>Practice ID: {id}</p> */}
            <div className='board-left'>
                <div className='practice-content'>
                    <h4>Đề bài:</h4>
                    <p>{practice}</p>
                </div>
                <div className='board-resolve'>

                    <div className="math-editor-container">
                        <div className="math-editor">
                            <div className='opt-math'>
                                <button onClick={() => insertSquareRoot()}>Sqrt</button>
                                <button onClick={() => binhphuong()}>^2</button>
                                <button onClick={() => sin()}>sin()</button>
                                <button onClick={() => cos()}>cos()</button>
                                <button onClick={() => tan()}>tan()</button>
                                <button onClick={() => cot()}>cotan()</button>
                                <button onClick={() => integral()}>integral</button>
                                <button onClick={() => lim()}>lim</button>
                                <button onClick={() => derivative()}>d/dx</button>
                                <button onClick={() => An()}>An</button>
                                <button onClick={() => infinity()}>infinity</button>
                                
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
                {resolves && resolves.map((resolve, index) => (
                    <div key={resolve.id} className='result-show'>
                        <h6>From: {resolve.studentEmail}</h6>
                        <div style={{ maxWidth: '100%', whiteSpace: 'normal', overflowWrap: 'break-word', overflowX: 'scroll', fontSize: '14px' }}>
                            <InlineMath>{resolve.content}</InlineMath>
                        </div>
                        <div className='interaction-opt'>
                            <label style={{ fontSize: '10px', padding: '5px' }} htmlFor='like-icon'>{resolve.likes.length}</label>
                            <AiFillLike id='llke-icon' style={{ cursor: 'pointer', color: likedStates[resolve.id] ? 'blue' : 'black' }}
                                onClick={() => likeActive(resolve.likes, resolve.id)}
                            />
                            <label style={{ fontSize: '10px', padding: '5px', marginLeft: '40px' }} htmlFor='comment-icon'>{''}</label>
                            <FaCommentAlt id='comment-icon' style={{ cursor: 'pointer', fontSize: '14px' }}
                                onClick={() => setShowCmt(resolve.id)}
                            />
                        </div>
                        <div style={{ display: (comment.state && comment.idResolve === resolve.id) ? '' : 'none' }} className='disscus-area'>
                            {resolve.comment && resolve.comment.map((cmt, index) => (
                                <div className='cmt-content'>
                                    <FaUser style={{ color: 'gray', fontSize: '14px', marginRight: '10px' }} />
                                    <div >
                                        <p style={{ fontSize: '10px', padding: '5px', fontStyle: 'italic' }}>{cmt.email}</p>
                                        <p style={{
                                            fontSize: '10px', width: '400px', border: 'none'
                                            , marginLeft: '5px'
                                        }}>{cmt.content}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div style={{
                            width: '100%', display: 'flex', alignItems: 'center', paddingTop: '50px', justifyContent: 'center'
                            , display: (comment.state && comment.idResolve === resolve.id) ? '' : 'none'
                        }}>
                            <input value={cmtContent} onChange={(e) => setCmtContent(e.target.value)} type='text' style={{ width: '80%', padding: '5px', height: '30px' }} />
                            <button style={{ width: '60px', height: '30px', cursor: 'pointer' }} onClick={() => sendCmt(resolve.id)}>Gửi</button>
                        </div>
                    </div>
                ))}



            </div>
        </div>
    )
}