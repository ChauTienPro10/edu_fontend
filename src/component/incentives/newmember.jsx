import React,{useEffect,useState} from "react";
import './newmember.css';
import Header from "../header/Header";
import { FaFire } from "react-icons/fa6";

export default function NewMember(){
    return (
        <div className="incentive-newmember-body">
            <Introduce/>
        </div>
    );
}


const Introduce=()=>{
    return (
        <div className='intro-content' >
            <div className="main-board">
                <div className="main-content">
                    <h1 style={{color:'yellow'}}>Ưu đãi cho người mới</h1>
                    <FaFire style={{color:'red', fontSize:'50px'}} className="sale-icon-fire"/>
                    <div className="logo-voucher"></div>
                    <p className="text-content" style={{color:'white', padding:'30px',fontSize:'16px'}}>Dành cho lần liên kết tài khoảng thanh toán đầu tiên</p>
                    <button className="button-getvoucher">Nhận ngay</button>
                </div>
            </div>
        </div>
    )
}