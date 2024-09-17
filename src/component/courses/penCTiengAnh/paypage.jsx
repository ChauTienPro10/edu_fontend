import './paypage.css';
import React from 'react';
import { RiCopperCoinFill } from "react-icons/ri";
import { GiBatMask } from "react-icons/gi";

function Paypage({show,setShow}){
    return (
        <div style={{display:show?'':'none'}} className='pay-body'>
            <div className='pay-main'>
                <div className='header-pay'>
                    <p>Thanh toán</p>
                </div>
                <div className='body-pay'>
                    <p style={{fontSize:'13px',padding:'5px',fontWeight:'lighter'}}>{`Email: ${"test@gmail.com"}`}</p>
                    <p style={{fontSize:'13px',padding:'5px',fontWeight:'lighter'}}>{`Tài khoản: ${"0x00Av..."}`}</p>
                    <div style={{display:'flex',alignItems:'center'}}><p style={{fontSize:'13px',padding:'5px'}}>{`Số dư: ${"100"} `}</p>
                    <RiCopperCoinFill style={{color:'gold'}}/></div>
                    <div style={{display:'flex' , justifyContent:'center',alignItems:'center',padding:'20px'
                        ,flexDirection:'column'
                    }}><GiBatMask style={{fontSize:'100px', color:'rgb(156, 60, 4)'}}/>
                        <p style={{color:'gray',fontSize:'15px'}}>Hệ thống thanh toán CDToken</p>
                    </div>
                    <input style={
                        {
                            width:'100%',
                            height:'30px',
                            background:'transparent',
                            border:'none',
                            outline:'none',
                            color:'grey',
                            padding:'20px'
                        }
                    } type='password' placeholder='mật khẩu của bạn'/>

                    <div className='option-but'>
                        <button onClick={()=>setShow(false)} style={{background:'rgb(255, 62, 62)',color:'white'}}>Hủy</button>
                        <button style={{background:'rgb(41, 228, 72)'}}>Mua</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paypage