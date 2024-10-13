
import React,{useState,useEffect} from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import "./header.css"
import { IoMdHome } from "react-icons/io";
import { Logined } from "../home/Home";
import { SERVER_GATEWAY_URL } from "../../config";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from "axios";
function Header(){
  const navigate = useNavigate(); 
  const [isLogin,setIsLogin]=useState(false);
  const [searchText,setSearchText]=useState(''); // quan ly tim kiem khoa hoc
  const [stompClient, setStompClient] = useState(null);
  
    
 // chuc nang tim kiem khoa hoc
 const findCourse=async ()=>{
  if(searchText!==''){
    try{
      const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/search/${searchText}`);
      
      navigate('/result_search', { state: { listCourse: response.data} });
    }
    catch(e){
      console.log(e);
    }
  }
}
///
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


      const sendMessage = () => {
        if(true){
            const messageObj = {
                content:"chau duong phat tien"
            };
            
            if (stompClient) {
                const message = JSON.stringify(messageObj); // Convert the object to a JSON string
                stompClient.send("/app/notify", {}, message);
            } else {
                console.error("Chưa có kết nối STOMP!");
            }
        }
        
    };
      
      return(
          <header >
              <div className="search-part">
                <div className="list-course-part">
                  <IoMdHome onClick={()=>navigate('/')} className="icon" style={{cursor:'pointer'}}/>
                  <p>Các khóa học</p>
                </div>
                <div className="search-box-part">
                  <input type="text"  placeholder='Tim kiem khoa hoc' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                  <IoSearch className='icon'  onClick={()=>findCourse()}/>
                </div>
              </div>
              {!isLogin && <div className="button-part">
                
                <button className="login-but" onClick={()=>navigate('/login')}>Đăng nhập</button>
                <button  className="sign-but" onClick={()=>navigate('/signup')} >Đăng ký</button>
              </div>}
              <Logined isLogin={isLogin} setIsLogin={setIsLogin}/>

            </header>
      );
  }

  export default Header