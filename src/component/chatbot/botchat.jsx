import './botchat.css';
import React,{useState,useEffect,useRef } from 'react';
import { RiRobot2Fill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { BiSend } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import axios from 'axios';
import { SERVER_CHATBOT } from '../../config';
import { BrowserRouter as Router, Route, Routes, Link,useLocation,useNavigate,Switch   } from 'react-router-dom';


function Botchat(){
    const navigate = useNavigate(); 

    const[isShow, setIsShow]=useState(false);
    const [userMess, setUserMess] = useState(''); // quan ly tin nhan cua nguoi dung
    const messagesEndRef = useRef(null); // Ref để cuộn đến cuối trang
    const [messages, setMessages] = useState([ // luu noi dung chat bot
      {
        text: "xin chào! tôi có thể giúp gì cho bạn?",
        by: 'BOT',
        obj:null,
      }
    ]);
    function toCoursePage(obj){
      if(obj.type==='course'){ // neu la  khoa hoc thi di den khoa hoc
        navigate('/course', { state: { course:obj } });
      }

  }
  
    const fetchChatBot = async () => {
      try {
      setMessages((pre) => [...pre, {text:"vui lòng đợi một chút...",by:'BOT'}]); // them vao khi bot dang tim cau tra loi
      const response = await axios.post(`${SERVER_CHATBOT}/public/chat`,{message:userMess});
      if(response.data.type==='course'){
        const newData = { text: response.data.title,  by: 'BOT',obj: response.data};
        await setMessages((prev) => prev.slice(0, -1)); // bo phan tu dau tien cua list messages
        setMessages((pre) => [...pre, newData]);
      }
      else{
        const newData = { text: response.data.title,  by: 'BOT'};
        await setMessages((prev) => prev.slice(0, -1)); // bo phan tu dau tien cua list messages
        setMessages((pre) => [...pre, newData]);
      }
      
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };
    // Hàm gửi tin nhắn
    const sendMessage = async () => {
      if (userMess.trim() === '') return; // Không gửi tin nhắn trống
      const newData = { text: userMess, by: 'USER' };
      setMessages((pre) => [...pre, newData]);
      setUserMess(''); // Xóa nội dung input sau khi gửi tin
      await fetchChatBot();
    };
  
    // Hàm bắt sự kiện Enter
    const handleKeyDown = (event, bot) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    };
  
    // Tự động cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    return(
        <div className='body-chatbot'>
            <div className='body-chatbot-min' style={{display:isShow?'none':''}}>
            <AiFillMessage onClick={()=>setIsShow(!isShow)} style={{fontSize:'40px',color:'rgb(32, 131, 245)'}}/>
            </div>

            <div style={{display:isShow?'':'none'}} className='body-chatbot-max'>
            <div className='chatbot-header'>
                <div className='header-left'>
                    <p style={{color:'white', margin:'0 5px 0 5px', fontSize:'13px'}}>RoRo</p> 
                    <RiRobot2Fill style={{color:'white',fontSize:'20px'}}/>
                </div>
                <div className='header-right'>
                      
                    <IoCloseSharp onClick={()=>setIsShow(!isShow)} style={{color:'white', fontSize:'16px' , marginLeft:'10px', cursor:'pointer'}}/>
                </div>
                
                
            </div>
            <div className='chatbot-body' >
                {messages.map((mes, index) => (
                    <div key={index} className='container-message'>
                       <div  className='first-mess' style={{justifyContent:mes.by ==='BOT'?'left':'right'}}>
                            <div><p>{mes.text}</p>{mes.obj && mes.by==='BOT' && (<a style={{textDecoration:'underline',fontSize:'10px', cursor:'pointer'}} 
                              onClick={()=>toCoursePage(mes.obj)}
                            >{`xem : ${mes.obj.id}`} </a>)}</div>
                            
                       </div>
                      
                      
                       <div ref={messagesEndRef} />
                    </div>
                ))}
            </div >
            <div className='chatbot-boxtext'>
                <input  onKeyDown={(e) => handleKeyDown(e, "vui lòng đợi")} value={userMess} onChange={(e)=>setUserMess(e.target.value)} type='text' placeholder='nhập vấn đề của bạn '/>
                <button
                
                onClick={()=>sendMessage()}><BiSend style={{color:'blue',fontSize:'20px', fontWeight:'bold'}}/></button>
            </div>
        </div>
        </div>
    );
}
 
export default Botchat