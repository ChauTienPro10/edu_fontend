import './buyToken.css';
import React,{useEffect,useState} from 'react';
import { SERVER_GATEWAY_URL } from '../../config';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const BuyToken=()=>{
    const [base64String,setBase64String]=useState('');

    const fetchDeposit=async ()=>{
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/pay/deposit`,{amount:10,email:user_._username},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                console.log(response.data.result);
                alert("Nạp thành công");
                sendMessage("deposited");
            }
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);

        }
    }
    
    const fetchGenQR = async (amount) => {
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/pay/generateQR`,{data:amount},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                console.log(response.data.result);
                setBase64String(response.data.result);
            }
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);

        }
    };

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

    
    // Hàm gửi tin nhắn đến server
    const sendMessage = (message) => {
        if (stompClient) {
            stompClient.send("/app/sendMessage", {}, message);
        } else {
            console.error("Chưa có kết nối STOMP!");
        }
    };

 
    return (
        <div className='' style={{width:'100%'}}>
            <div  className='buy-form-container' >
                <div className='price-label-container'>
                    <button onClick={()=>fetchGenQR(50)}>50 CDT</button>
                    <button onClick={()=>fetchGenQR(100)}>100 CDT</button>
                    <button onClick={()=>fetchGenQR(500)}>500 CDT</button>
                </div>
                <img style={{margin:'10px',width:'150px',height:'150px'}} src={`data:image/png;base64,${base64String}`} alt="QR Code" />
                <button onClick={() => fetchDeposit()}  id='submit-trans' >Nhận mã</button>
            </div>
        </div>
    );
}


export default BuyToken