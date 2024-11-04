import React,{useEffect, useState} from "react";
import './newTeacher.css';
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../config";
function NewSubject({setIndedx}){
    const [code,setCode]=useState('');
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;

    const fetchNewSubject = async (event) => {
        setLoading(true);
        try {
          const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/subject/new`, {
            code,
            name,
          },
          {
            headers: {
              Authorization: `Bearer ${user_._jwt}`,
            },
          }
        
        );
          if(response.data.code===1000){
            console.log(response.data.result);
            setError('');
            setName('');
            setCode('');
            alert('Thêm thành công');
          }
          
          else{
            setError(response.data.message);
          }
      
        } catch (_error) {
            setError("Lỗi server");
        }
        setLoading(false);
      };
    return (
        <div className="new-teacher-body">
            <div className="new-teacher-main">
                <label htmlFor="subject-name">Tên môn học</label>
                    <input id="subject-name" className="input-data"  type="text" placeholder="Tên môn học " required  value={name} 
                onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="subject-code">Mã môn học</label>
                <input id="subject-code" className="input-data"  type="text" placeholder="Mã môn học" required value={code} 
                onChange={(e) => setCode(e.target.value)}/>
                
                <button style={{opacity:loading?'0.3':'1'}} onClick={()=>fetchNewSubject()} className="submit-button">Thêm</button>
                <button onClick={()=>{setIndedx('')}}  style={{background:'black'}} className="submit-button">Hủy</button>
                <p style={{display:error===''?'none':'', color:'red', fontSize:'12px', fontWeight:'lighter'}} >Error: {error}</p>
            </div>
            
            
        </div>
    );
}

export default NewSubject
