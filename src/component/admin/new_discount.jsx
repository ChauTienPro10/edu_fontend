import React,{useEffect, useState} from "react";
import './newTeacher.css';
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../config";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";

export default function Discount({setIndedx}){
    const [error,setError]=useState('');
    const [name,setName]=useState('');
    const [type,setType]=useState('');
    const [value,setValue]=useState(0);
    const [start,setStart]=useState(null)
    const [end,setEnd]=useState(null)
    const [applies,setApplies]=useState([]);
    const [apply,setApply]=useState('');
    const [condition,setCondition]=useState('');
    const [code,setCode]=useState('');
  


      
   const add_apply=async()=>{
    if(applies){
        setApplies((pre)=>[apply,...pre]);
        
    }
   }

    const show_detail={
        
        background:'white',
        marginLeft:'20px',
        

    }
    return (
        <div className="new-teacher-body">
            <div className="new-teacher-main">
                
                    <input onChange={(e)=>setName(e.target.value)} value={name} className="input-data"  type="text" placeholder="Tên gọi" required/>
                    <input onChange={(e)=> setType(e.target.value)} className="input-data"  type="text" placeholder="loại khuyến mãi" required/>
                    <input onChange={(e)=>setValue(e.target.value)} className="input-data"  type="number" placeholder="Giá trị" required/>
                    <div style={{display:'flex',width:'100%'}}>
                        <label htmlFor="start">Ngày bắt đầu</label>
                        <input onChange={(e)=>setStart(e.target.value)} value={start} id="start" className="input-data-start"  type="date" placeholder="ngày bắt đầu" required/>
                        <label htmlFor="end">Ngày kết thúc</label>
                        <input onChange={(e)=>setEnd(e.target.value)} value={end} id="end" className="input-data-end"  type="date" placeholder="ngày kết thúc" required/>
                    </div>
                    
                    <input onChange={(e)=>setCondition(e.target.value)} value={condition} className="input-data"  type="text" placeholder="đối tượng được sử dụng" required/>
                    <div>
                    <input onChange={(e)=>setApply(e.target.value)} value={apply} className="input-data"  type="text" placeholder="Áp dụng cho" required/>
                    <button style={{padding:'10px', background:'rgb(63, 140, 202)',color:'white'
                        ,border:'none', cursor:'pointer'
                    }} onClick={()=>add_apply()}>+</button>
                    </div>
                    
                    <input onChange={(e)=>setCode(e.target.value)} value={code} className="input-data"  type="text" placeholder="mã xác định" required/>
                <button   className="submit-button">Thêm</button>
                <button onClick={()=>{setIndedx('')}} style={{background:'black'}} className="submit-button">Hủy</button>
                <p style={{display:error===''?'none':'', color:'red', fontSize:'12px', fontWeight:'lighter'}} >Error: {error}</p>
            </div>
            <div style={show_detail} className="new-teacher-main ">
                <p className="show-detail">Tên gọi: {name}</p>
                <p className="show-detail">Loại khuyến mãi: {type}</p>
                <p className="show-detail">Giá trị: {value}</p>
                <p className="show-detail">Ngày bắt đầu: {start}</p>
                <p className="show-detail">Ngày kết thúc: {end}</p>
                <p className="show-detail">đối tượng sử dụng: {condition}</p>
                <p className="show-detail">Áp dụng cho: </p>
                <p className="show-detail">Mã xác định: {code}</p>
            </div>
            
        </div>
    );
}

