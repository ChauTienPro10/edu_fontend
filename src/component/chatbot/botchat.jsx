import './botchat.css';
import React,{useState,useEffect,useRef } from 'react';
import { RiRobot2Fill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { BiSend } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";

function Botchat(){
    const[isShow, setIsShow]=useState(false);
    const [userMess, setUserMess] = useState('');
    const messagesEndRef = useRef(null); // Ref để cuộn đến cuối trang
    const [messages, setMessages] = useState([
      {
        bot: "xin chào! tôi có thể giúp gì cho bạn?",
        user: 'xin chào',
        start: 'BOT'
      }
    ]);
  
    // Hàm gửi tin nhắn
    const sendMessage = async (user, bot) => {
      if (user.trim() === '') return; // Không gửi tin nhắn trống
      const newData = { bot: bot, user: user, start: 'USER' };
      setMessages((pre) => [...pre, newData]);
      setUserMess(''); // Xóa nội dung input sau khi gửi tin

    };
  
    // Hàm bắt sự kiện Enter
    const handleKeyDown = (event, bot) => {
      if (event.key === 'Enter') {
        sendMessage(userMess, bot);
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
                       <div  className='first-mess' style={{justifyContent:mes.start ==='BOT'?'left':'right'}}>
                            <p>{(mes.start==='BOT'&& mes.bot) ||(mes.start!=='BOT' && mes.user) }</p>
                       </div>
                       <div  className='second-mess' style={{justifyContent:mes.start ==='BOT'?'right':'left'}}>
                            <p>{(mes.start==='BOT'&& mes.user) ||(mes.start!=='BOT' && mes.bot) }</p>
                       </div>
                       <div ref={messagesEndRef} />
                    </div>
                ))}
            </div >
            <div className='chatbot-boxtext'>
                <input  onKeyDown={(e) => handleKeyDown(e, "vui lòng đợi")} value={userMess} onChange={(e)=>setUserMess(e.target.value)} type='text' placeholder='nhập vấn đề của bạn '/>
                <button
                
                onClick={()=>sendMessage(userMess,'Vui lòng đợi tôi một lát')}><BiSend style={{color:'blue',fontSize:'20px', fontWeight:'bold'}}/></button>
            </div>
        </div>
        </div>
    );
}
 
export default Botchat