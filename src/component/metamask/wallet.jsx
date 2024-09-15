import './wallet.css';
import React,{useState,useRef,useEffect} from 'react';
import { RiCopperCoinFill } from "react-icons/ri";
import { GiBatMask } from "react-icons/gi";
function Wallet({isShow,setIsShow}){
    const [isFocus,setIsFocus]=useState(false);
    const [password,setPassword]=useState('');
    const divRef = useRef(null);
    const handleClickOutside = (event) => {
        // Check if the clicked element is outside the referenced div
        if (divRef.current && !divRef.current.contains(event.target)) {
          setIsShow(false);
        }
      };
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
                    <p style={{color:'rgb(53, 133, 219)', fontSize:'14px',margin:'20px auto',cursor:'pointer'}}>Kích hoạt tài khoản Token?</p>
                    </div>
                    
                </div>
            </div>
            <div className='wallet-footer'></div>
        </div>
    );
}

export default Wallet