import "./learning.css";
import React,{useState,useEffect} from "react";
import YoutubePlayer from "../videos/youtube";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import Header from "../header/Header";
import { useLocation } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';



function Learning(){
    const location = useLocation();
    const { videos } = location.state || {};
    const [comments,setComment]=useState({});
    const [cmt,setCmt]=useState('');
    const[idVideo,setIdVideo]=useState('7KDRqBpT8NA');



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
            stompClientInstance.subscribe('/topic/messages', (message) => {
                console.log('Received: ' + message.body);
                
            });
           
        });

        // Cleanup: ngắt kết nối khi component unmount
        return () => {
            if (stompClientInstance) {  
                stompClientInstance.disconnect();
            }
        };
        
    }, []);

    
    
    const sendMessage = (message) => {
        if (stompClient) {
            stompClient.send("/app/sendMessage", {}, message);
        } else {
            console.error("Chưa có kết nối STOMP!");
        }
    };

    return (
        <div>
            <Header/>
        
        <div className="learning-body">
            
            <div className="video-player">
                 <YoutubePlayer videoId={idVideo} _height={'350'} _width={'600'}/>
                 <p style={{color:'grey',fontSize:'16px'}}>Video bai học số 1</p>
                 <div className="comment-body">
                    <div className="comment">
                        <FaUserGraduate style={{}}/>
                        <div className="content">
                            <p style={{fontSize:'14px'}}>tuan@gmail.com</p>
                            <p style={{fontSize:'12px'}}>ngày 2 tháng 9 năm 1945 bác Hò đọc Tuyên Ngôn Độc Lập</p>
                        </div>
                        <MdOutlineMoreHoriz style={{cursor:'pointer'}}/>
                    </div>

                    <div className="comment">
                        <FaUserGraduate style={{}}/>
                        <div className="content">
                            <p style={{fontSize:'14px'}}>tuan@gmail.com</p>
                            <p style={{fontSize:'12px'}}>ngày 2 tháng 9 năm 1945 bác Hò đọc Tuyên Ngôn Độc Lập khai sinh ra nước Việt Nam ngày 2 tháng 9 năm 1945 bác Hò đọc Tuyên Ngôn Độc Lập khai sinh ra nước Việt Nam</p>
                        </div>
                        <MdOutlineMoreHoriz style={{cursor:'pointer'}}/>
                    </div>
                    <div className="comment">
                        <FaUserGraduate style={{}}/>
                        <div className="content">
                            <p style={{fontSize:'14px'}}>tuan@gmail.com</p>
                            <p style={{fontSize:'12px'}}>ngày 2 tháng 9 năm 1945 bác Hò đọc Tuyên Ngôn Độc Lập khai sinh ra nước Việt Nam ngày 2 tháng 9 năm 1945 bác Hò đọc Tuyên Ngôn Độc Lập khai sinh ra nước Việt Nam</p>
                        </div>
                        <MdOutlineMoreHoriz style={{cursor:'pointer'}}/>
                    </div>
                   
                    
                 </div>
                 <div className="push-comment">
                    <textarea id="cmt" name="multiText" rows="2" cols="30" placeholder="ý kiến vủa bạn" 
                    value={cmt}
                    onChange={(e)=>setCmt(e.target.value)}></textarea>
                    <button onClick={()=>sendMessage("hello")} id="submit-cmt">Gửi</button>
                 </div>
            </div>
            <div className="list-videos" >
            { videos!==null && videos.map((video, index)=>(
                <div onClick={()=>setIdVideo(video.link)}  className="video-element">
                <div className="img-div"></div>
                <div className="video-description">
                    <h4 style={{color:'grey'}}>{video.title}</h4>
                    <p style={{color:'grey',fontSize:'13px'}}>{video.description}</p>
                </div>
            </div>
            ) )}
            </div>
        </div>
        </div>
    );
}

export default Learning