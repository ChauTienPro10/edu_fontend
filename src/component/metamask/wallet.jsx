import './wallet.css';
import React,{useState,useRef,useEffect} from 'react';
import { RiCopperCoinFill } from "react-icons/ri";
import { GiBatMask } from "react-icons/gi";
import { SERVER_STUDENT } from '../../config';
import axios from 'axios';

function Wallet({isShow,setIsShow}){
    const [isFocus,setIsFocus]=useState(false);
    const [password,setPassword]=useState('');
    const divRef = useRef(null);
    const [isShowPolicy,setIsShowPolicy]=useState(false);
    const [policyCheck,setPolicyCheck]=useState(false);
    const [accPay,setAccPay]=useState({

    })
    const handleClickOutside = (event) => {
        // Check if the clicked element is outside the referenced div
        if (divRef.current && !divRef.current.contains(event.target)) {
          setIsShow(false);
          setIsShowPolicy(false);
        }
      };
      const fetchLinkAccount = async () => {
        try {
        const response = await axios.post(`${SERVER_STUDENT}/student/pay/new`,{},
            {
                headers: {
                    'Authorization': `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGF1ZHVvbmdwaGF0dGllbi5jb20iLCJzdWIiOiJjaGF1ZHVvbmdwaGF0dGllbjIwMDNAZ21haWwuY29tIiwiZXhwIjoxNzI2NTYxNzQ1LCJpYXQiOjE3MjY1NTA5NDUsImp0aSI6IjhiMDY5ODI0LWUyNzYtNGRjNS1iMjFlLWI4ODFlN2FkN2I5YSIsInNjb3BlIjoiUk9MRV9VU0VSIn0.ePVD5_OuD1UxM7gd3gPNZRQUJDdEbRbPkvTqkkYOaDdd7Kvzky3KikA5jp_xQSFD6K1C0n_PqixR0pjXX6zK3A"}`, // Thêm JWT token vào header
                    'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                  },
            },
        );
        console.log(response.data);
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };
    const handleLinkAccount=()=>{
        if(policyCheck===true){
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
                <GiBatMask style={{fontSize:'50px', marginRight:'20px', color:'rgb(156, 60, 4)'}} />
                
            </div>
            <div className='wallet-body'>
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
                    <input onBlur={()=>{setIsFocus(false);setPassword('')}} value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onFocus={()=>setIsFocus(true)} id="inputField" type="password" placeholder="" />
                    <button className='submit-login'>Đăng nhập</button>
                    <p style={{color:'gray', fontSize:'12px',margin:'20px auto',cursor:'pointer'}}>Quên mật khẩu?</p>
                    <p style={{color:'rgb(53, 133, 219)', fontSize:'14px',margin:'20px auto',cursor:'pointer'}}
                        onClick={()=>setIsShowPolicy(true)}
                    >Kích hoạt tài khoản Token?</p>
                    </div>
                    
                </div>
            </div>
            <div style={{display:isShowPolicy?'':'none'}} className='wallet-footer'>
                <div className='wallet-header'>
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
                <p style={{display:policyCheck?'none':'', color:'red', fontSize:'12px', marginTop:'20px'
                    ,padding:'20px'
                }}>bạn cần đông ý với chính sách của chúng tôi trước khi thực hiện yêu cầu này!</p>
            </div>
        </div>
    );
}

export default Wallet