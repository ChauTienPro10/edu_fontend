import "./learning.css";
import React,{useState,useEffect} from "react";
import YoutubePlayer from "../videos/youtube";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import Header from "../header/Header";
import { useLocation } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { SERVER_GATEWAY_URL } from "../../config";




function Learning(){
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;
   
    
    
    const location = useLocation();
    const { videos } = location.state || {};
    const [comments,setComments]=useState([]);
    const [cmt,setCmt]=useState('');
    const[idVideo,setIdVideo]=useState('7KDRqBpT8NA');



    const [stompClient, setStompClient] = useState(null);

    const fetchComment=async ()=>{
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            if(user_._jwt!==undefined){
                const response = await axios.get(`${SERVER_GATEWAY_URL}/api/student/comment/get.comment?idcourse=${videos[0].course}`);
                console.log(response.data);
                setComments(response.data);
            }
           
            } catch (error) {
            console.error('Error :', error);
            }
    }

    useEffect(()=>{
        fetchComment();
    },[])

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
                setComments((prev) => [...prev, JSON.parse(message.body)]);
                setCmt('');
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
        if(cmt!==''){
            const messageObj = {
                username: user_._username,
                content: cmt,
                courseid:videos[0].course,
            };
            
            if (stompClient) {
                const message = JSON.stringify(messageObj); // Convert the object to a JSON string
                stompClient.send("/app/sendMessage", {}, message);
            } else {
                console.error("Chưa có kết nối STOMP!");
            }
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
                    {comments && comments.map((cmt, index) => {
                        return (
                            <div className="comment" key={index}>
                                <FaUserGraduate />
                                <div className="content">
                                    <p style={{ fontSize: '14px' ,display:'flex'}}>{cmt.email}<p style={{fontSize:'8px'}}>{cmt.time}</p></p>  {/* Assuming 'email' field is present */}
                                    <p style={{ fontSize: '12px' }}>{cmt.content}</p>   {/* Assuming 'text' field is present */}
                                </div>
                                <MdOutlineMoreHoriz style={{ cursor: 'pointer' }} />
                            </div>
                        );
                    })}
                    

                    
                   
                    
                 </div>
                 <div className="push-comment">
                    <textarea id="cmt" name="multiText" rows="2" cols="30" placeholder="ý kiến vủa bạn" 
                    value={cmt}
                    onChange={(e)=>setCmt(e.target.value)}></textarea>
                    <button onClick={()=>sendMessage()} id="submit-cmt">Gửi</button>
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