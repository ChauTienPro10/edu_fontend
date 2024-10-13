import React,{useEffect, useState} from "react";
import './newTeacher.css';
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../config";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
function NewNotice({setIndedx}){
    
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [notice,setNotice]=useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // Kết nối với SockJS server
        const socket = new SockJS('http://localhost:8081/student/ws');
        const stompClientInstance = Stomp.over(socket);

        // Kết nối STOMP
        stompClientInstance.connect({}, (frame) => {
            console.log('Connected: ' + frame);

            // Sau khi kết nối, lưu stompClient vào state
            setStompClient(stompClientInstance);

            // Đăng ký nhận tin nhắn từ server
            stompClientInstance.subscribe('/topic/notifi_client', (message) => {
                alert('Received: ' + JSON.parse(message.body).content);
                
            });
          
        });

        // Cleanup: ngắt kết nối khi component unmount
        return () => {
            if (stompClientInstance) {  
                stompClientInstance.disconnect();
            }
        };
        
      }, []);


      const sendMessage = () => {
        setLoading(true);
        if(notice!==''){
            const messageObj = {
                content: notice,
            };
            
            if (stompClient) {
                const message = JSON.stringify(messageObj); // Convert the object to a JSON string
                stompClient.send("/app/notify", {}, message);
            } else {
                console.error("Chưa có kết nối STOMP!");
            }
        }
        setLoading(false);
    };
   
    return (
        <div className="new-teacher-body">
            <div className="new-teacher-main">
                <label htmlFor="teacher-name">Nội dung thông báo</label>
                    <input id="teacher-name" className="input-data"  type="text" placeholder="nhập nội dung thông báo" required  value={notice} 
                    onChange={(e)=>setNotice(e.target.value)}
                />
                
                <button style={{opacity:loading?'0.3':'1'}} onClick={()=>sendMessage()} className="submit-button">Thêm</button>
                <button onClick={()=>{setIndedx('')}} style={{background:'black'}} className="submit-button">Hủy</button>
                <p style={{display:error===''?'none':'', color:'red', fontSize:'12px', fontWeight:'lighter'}} >Error: {error}</p>
            </div>
            
            
        </div>
    );
}

export default NewNotice
