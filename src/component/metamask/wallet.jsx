import './wallet.css';
import React,{useState,useRef,useEffect} from 'react';
import { RiCopperCoinFill } from "react-icons/ri";
import { GiBatMask } from "react-icons/gi";
import { SERVER_STUDENT } from '../../config';
import axios from 'axios';
import { PiHandDeposit } from "react-icons/pi"; 
import { PiHandWithdraw } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { SERVER_GATEWAY_URL } from '../../config';
import BuyToken from './buyToken';

function Wallet({isShow,setIsShow}){
    const [isFocus,setIsFocus]=useState(false);
    const [password,setPassword]=useState('');
    const divRef = useRef(null);
    const [isShowPolicy,setIsShowPolicy]=useState(false);
    const [policyCheck,setPolicyCheck]=useState(false);
    const [authened,setAuthened]=useState(false); // quan ly xac thuc lien ket vi
    const [user,setUser]=useState({});
    const [loading,setLoading]=useState(false); // quan ly cho tai
    const handleClickOutside = (event) => {
        // Check if the clicked element is outside the referenced div
        if (divRef.current && !divRef.current.contains(event.target)) {
          setIsShow(false);
          setIsShowPolicy(false);
        }
      };
      ////////////////////////////////////////////////////
      const fetchLinkAccount = async () => {
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/pay/new`,{},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                if(response.data.code===2000){
                    alert("bạn chỉ có thể kích hoạt một tài khoản thanh toán hệ thống")
                }
                setLoading(false);
                setIsShowPolicy(false);
            }
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);

        }
    };
    ///////////////////////////////////////////////////
   
    const checkAccPay = async (user) => {
        try {
            setLoading(true);
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            const data={
                username:user_._username,
                password:password
            }
            const response = await axios.post(
                `${SERVER_GATEWAY_URL}/api/student/pay/account.pay.check`, 
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${user_._jwt}`, // JWT token để xác thực
                    },
                }
            );
            // Trả về kết quả từ response
            if(response.data.code===1000){
                setAuthened(true);
                setUser(response.data.result)
            }
            else alert(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error("Error in checkAccPay:", error.response ? error.response.data : error.message);
            throw error; // Nếu có lỗi, ném ra lỗi để xử lý bên ngoài
        }
    };

    //////////////////////////////////////////////////////////////////////////

    const handleLinkAccount=()=>{ //lioen key tai khoan
        if(policyCheck===true){
            setLoading(true);
            fetchLinkAccount();
        }
    }
      useEffect(() => {
        // Add event listener to detect clicks anywhere in the document
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          // Clean up the event listener on component unmount
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
      ////////////////////////////////////////////////////////////////
    return (
        <div className='wallet-container' ref={divRef}  style={{display:isShow?'':'none'}}> 
            <div className='wallet-header'>
                <div style={{display:'flex', alignItems:'center',padding:'5px 10px 5px 10px', borderRadius:'10px',
                    background:'rgb(10, 10, 10)',marginLeft:'10px',border:'1px solid '
                }}>
                <p style={{color:'white',fontSize:'10px',textAlign:'center'
                  
                }}>CDToken </p>
                <RiCopperCoinFill style={{ marginLeft:'2px',fontSize:'15px', color:'white'
                    
                }}/>
                </div>
                <div className='account-name'>
                    <p style={{color:'grey',fontSize:'16px'}}>{user.email}</p>
                    <p style={{color:'grey',fontSize:'12px', maxWidth:'100px', overflow:'hidden'}}>{user.address}</p>
                </div>  
                <GiBatMask style={{fontSize:'50px', marginRight:'20px', color:'rgb(156, 60, 4)'}} />
                
            </div>
            <Logined_wallet_body authened={authened} user={user}/>
            <div style={{display:authened?'none':''}} className='wallet-body'>
                <div className="body-welcome">
                    <div className='logo'>
                        <GiBatMask style={{fontSize:'150px', color:'rgb(156, 60, 4)'}}/>
                    </div>
                    <h3 style={{fontSize:'35px', fontWeight:'bolder'}}>Welcome back!</h3>
                    <p style={{color:'white'}}>The decentralized web awaits</p>
                </div>
                <div className="body-loginform">
                    <div className='input-box'>
                    <label className="label" style={{fontSize:isFocus?'10px':'16px'}}  >Password</label>
                    <input onBlur={()=>{}} value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onFocus={()=>setIsFocus(true)} id="inputField" type="password" placeholder="" />
                    <button onClick={()=>checkAccPay()} className='submit-login'>Đăng nhập</button>
                    {loading && <GiBatMask className="bat-mask-icon" style={{fontSize:'20px', color:'rgb(156, 60, 4)',margin:'20px auto'}}/>}
                    <p style={{color:'gray', fontSize:'12px',margin:'20px auto',cursor:'pointer'}}>Quên mật khẩu?</p>
                    <p style={{color:'rgb(53, 133, 219)', fontSize:'14px',margin:'20px auto',cursor:'pointer'}}
                        onClick={()=>setIsShowPolicy(true)}
                    >Kích hoạt tài khoản Token?</p>
                    </div>
                    
                </div>
            </div>
            <div style={{display:isShowPolicy?'':'none'}} className='wallet-footer'>
                <div className='wallet-header-child'>
                    <div style={{display:'flex', alignItems:'center',padding:'5px 10px 5px 10px', borderRadius:'10px',
                        background:'rgb(10, 10, 10)',marginLeft:'10px',border:'1px solid '
                    }}>
                    <p style={{color:'white',fontSize:'10px',textAlign:'center'
                    
                    }}>CDToken </p>
                    <RiCopperCoinFill style={{ marginLeft:'2px',fontSize:'15px', color:'white'
                        
                    }}/>
                    </div>
                    <GiBatMask style={{fontSize:'50px', marginRight:'20px', color:'rgb(156, 60, 4)'}} />
                    
                </div>
                <GiBatMask style={{fontSize:'150px', color:'rgb(156, 60, 4)',marginTop:'20px'}}/>
                <div className='policy-container'>
                    <input onChange={()=>setPolicyCheck(!policyCheck)}  checked={policyCheck} type="checkbox" id="myCheckbox_policy" name="myCheckbox_policy" />
                    <label style={{color:'white',fontSize:'14px'}} for="myCheckbox_policy" class="checkbox-label">Bạn đồng ý với tát cả điều khoản của chúng tôi</label>
                </div>
                <button style={{background:'rgb(53, 133, 219)',cursor:'pointer'
                    ,padding:'10px 20px 10px 20px',  border:'none'
                }} onClick={()=>handleLinkAccount()}>Liên kết</button>
                {loading && <GiBatMask className="bat-mask-icon" style={{fontSize:'20px', color:'rgb(156, 60, 4)',marginTop:'20px'}}/>}
                <p style={{display:policyCheck?'none':'', color:'red', fontSize:'12px', marginTop:'20px'
                    ,padding:'20px'
                }}>bạn cần đông ý với chính sách của chúng tôi trước khi thực hiện yêu cầu này!</p>
            </div>
        </div>
    );
}

function Logined_wallet_body({authened,user}){
    return (
        <div style={{display:authened?'':'none'}} className='logined-wallet-body'>
            <h3 style={{fontSize:'50px'}}>{user.balance} CDT</h3>
            <div className='transaction'>
                <button><PiHandDeposit/></button>
                <button><PiHandWithdraw/></button>
                <button><AiOutlineTransaction/></button>
            </div>
            <BuyToken/>
        </div>
    );
}

export default Wallet