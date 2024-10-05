import './paypage.css';
import React,{useEffect,useState} from 'react';
import { RiCopperCoinFill } from "react-icons/ri";
import { GiBatMask } from "react-icons/gi";
import { SERVER_GATEWAY_URL } from '../../../config';
import { FaCheckCircle } from "react-icons/fa";
import axios from 'axios';
function Paypage({show,setShow,course}){
    const address= sessionStorage.getItem('address');
    const balance= sessionStorage.getItem('balance');
    const email=sessionStorage.getItem('user')._usernaem;
    const [base64String,setBase64String]=useState('');
    const [code,setCode]=useState('');
    const [amount,setAmount]=useState(0);
    const [loadingDeposit,setLoadingDeposit]=useState(false);// quan ly tien trinh nap token
    const [payed,setPayed]=useState(false);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;
    const [boughtRespone,setBoughtResponse]=useState({});

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

    const fetchauthenCode = async () => {
        try {
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
                    fetchBuyCourse(10);
                }
                else{
                    alert("xác thực thất bại");
                }
            }
        
        } catch (error) {
        console.error('Error fetching courses:', error);

        }
    };

    const fetchBuyCourse=async (amount)=>{
        try {
            
            
            if(user_._jwt!==undefined){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/pay/buy.course`,{price:amount
                    ,course:course.id
                    ,email:user_._username},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                console.log(response.data.result);
                if(response.data.code===1000){
                    sessionStorage.setItem('balance', sessionStorage.getItem('balance')-amount);
                    setBoughtResponse(response.data.result);
                    setPayed(true);
                    
                }
            }
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);

        }
    }


    return (
        <div style={{display:show?'':'none'}}  className='pay-body'>
            <div className='pay-main'>
                <div className='header-pay'>
                    <p>Hệ thống thanh toán CDToken</p>
                </div>
                <div style={{display:(base64String==='' && !payed)?'':'none'}} className='body-pay'>
                    <p style={{fontSize:'13px',padding:'5px',fontWeight:'lighter'}}>{`Email: ${email}`}</p>
                    <p style={{fontSize:'13px',padding:'5px',fontWeight:'lighter',maxWidth:'200px',overflow:'hidden' }}>{`Tài khoản: ${address}`}</p>
                    <div style={{display:'flex',alignItems:'center'}}><p style={{fontSize:'13px',padding:'5px'}}>{`Số dư: ${balance} `}</p>
                    <RiCopperCoinFill style={{color:'gold'}}/></div>
                    <div style={{display:'flex' , justifyContent:'center',alignItems:'center',padding:'20px'
                        ,flexDirection:'column'
                    }}><GiBatMask style={{fontSize:'100px', color:'rgb(156, 60, 4)'}}/>
                        <p style={{color:'gray',fontSize:'15px'}}>{course.title}</p>
                    </div>
                    <p>{`Học phí: ${100} CDT`}</p>

                    <div className='option-but'>
                        <button onClick={()=>setShow(false)} style={{background:'rgb(255, 62, 62)',color:'white'}}>Hủy</button>
                        <button style={{background:'rgb(41, 228, 72)'}} onClick={()=>fetchGenQR(100)}>Tiếp tục</button>
                    </div>
                </div>


                <div style={{display:(base64String!=='' && !payed)?'':'none'}} className='deposit-body'>
                    <img style={{margin:'10px',width:'150px',height:'150px'}} src={`data:image/png;base64,${base64String}`} alt="QR Code" />
                    <input onChange={(e)=>setCode(e.target.value)} value={code} style={{height:'30px', border:'none'
                        ,padding:'5px', width:'100px', margin:'3px'
                    }} type='text' id='ver-code' placeholder='Mã xác thực'/>
                    <button style={{width:'60%',background:'rgb(33, 174, 230)',opacity:loadingDeposit?'0.5':'1'}} onClick={()=>fetchauthenCode()}  id='submit-trans' >Thanh toán</button>
                    <button onClick={()=>setBase64String('')} style={{width:'60%',background:'red',opacity:loadingDeposit?'0.5':'1'}}  id='submit-trans' >Quay về</button>

                </div>
                <div style={{display:payed?'':'none'}} className='bill-container'>
                    <FaCheckCircle style={{margin:'auto',color:'green',fontSize:'100px',paddingBottom:'20px'}}/>
                    <p style={{margin:'auto'}}>Mua thành công</p>
                    <div><p>Id: </p><p style={{color:'grey', fontSize:'16px', marginLeft:'20px'}}>{boughtRespone.id}</p></div>
                    <div><p>Khóa học: </p><p  style={{color:'grey', fontSize:'16px', marginLeft:'20px'}}>{course.title}</p></div>
                    <div><p>Email: </p><p  style={{color:'grey', fontSize:'16px', marginLeft:'20px'}}>{user_._username}</p></div>
                    <div><p>Thời gian: </p><p  style={{color:'grey', fontSize:'16px', marginLeft:'20px'}}>{boughtRespone.time}</p></div>
                    <div><p>Tổng token: </p><p  style={{color:'grey', fontSize:'16px', marginLeft:'20px'}}>{boughtRespone.price}</p></div>
                    <button onClick={()=>setShow(false)}
                    style={{
                        height:'50px', border:'none', background:'green', fontSize:'18px', color:'white', marginTop:'20px'
                        ,cursor:'pointer'
                    }}>ok</button>


                </div>
            </div>
        </div>
    );
}

export default Paypage