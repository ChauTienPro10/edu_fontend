import './buyToken.css';
import React,{useEffect,useState} from 'react';
import { SERVER_GATEWAY_URL } from '../../config';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const BuyToken=({setBalance})=>{
    const [base64String,setBase64String]=useState('');
    const [code,setCode]=useState('');
    const [amount,setAmount]=useState(0);
    const [loadingDeposit,setLoadingDeposit]=useState(false);// quan ly tien trinh nap token
    

    const fetchauthenCode = async () => {
        try {
            setLoadingDeposit(true);
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/email/authenCode`,{code},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
               
                if(response.data.result===true){
                    fetchDeposit(amount);
                }
                else{
                    alert("xác thực thất bại");
                }
            }
            setLoadingDeposit(false);
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        setLoadingDeposit(false);

        }
    };
    
    const fetchDeposit=async (amount)=>{
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/pay/deposit`,{amount:amount,email:user_._username},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                console.log(response.data.result);
                alert("Nạp thành công");
                setBalance(response.data.result.result);
                sessionStorage.setItem('balance', response.data.result.result);
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
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/pay/generateQR`,{amount:amount,email:user_._username},
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

    // const [stompClient, setStompClient] = useState(null);

    // useEffect(() => {
    //     // Kết nối với SockJS server
    //     const socket = new SockJS('http://localhost:8081/student/ws');
    //     const stompClientInstance = Stomp.over(socket);

    //     // Kết nối STOMP
    //     stompClientInstance.connect({}, (frame) => {
    //         console.log('Connected: ' + frame);

    //         // Sau khi kết nối, lưu stompClient vào state
    //         setStompClient(stompClientInstance);

    //         // Đăng ký nhận tin nhắn từ server
    //         stompClientInstance.subscribe('/topic/messages', (message) => {
    //             console.log('Received: ' + message.body);
                
    //         });
           
    //     });

    //     // Cleanup: ngắt kết nối khi component unmount
    //     return () => {
    //         if (stompClientInstance) {  
    //             stompClientInstance.disconnect();
    //         }
    //     };
        
    // }, []);

    
    // Hàm gửi tin nhắn đến server
    // const sendMessage = (message) => {
    //     if (stompClient) {
    //         stompClient.send("/app/sendMessage", {}, message);
    //     } else {
    //         console.error("Chưa có kết nối STOMP!");
    //     }
    // };

 
    return (
        <div  style={{width:'100%'}}>
            <div  className='buy-form-container' >
                <div className='price-label-container'>
                    <button onClick={()=>{fetchGenQR(50); setAmount(50);}}>50 CDT</button>
                    <button onClick={()=>{fetchGenQR(100);setAmount(100);}}>100 CDT</button>
                    <button onClick={()=>{fetchGenQR(500); setAmount(500);}}>500 CDT</button>
                </div>
                <div style={{display:base64String===''?'none':''}} className='deposit-body'>
                    <img style={{margin:'10px',width:'150px',height:'150px'}} src={`data:image/png;base64,${base64String}`} alt="QR Code" />
                    <input onChange={(e)=>setCode(e.target.value)} value={code} style={{height:'30px', border:'none'
                        ,padding:'5px', width:'100px', margin:'3px'
                    }} type='text' id='ver-code' placeholder='Mã xác thực'/>
                    <button style={{width:'100%',background:'rgb(33, 174, 230)',opacity:loadingDeposit?'0.5':'1'}} onClick={()=>fetchauthenCode()} id='submit-trans' >Xác thực</button>
                </div>
               
            </div>
        </div>
    );
}


export default BuyToken