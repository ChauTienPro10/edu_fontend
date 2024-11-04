import React,{useEffect, useState} from "react";
import './newTeacher.css';
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../config";
function NewTeacher({setIndedx}){
    const [name,setName]=useState('');
    const [major,setMajor]=useState('');
    const [level,setLevel]=useState('');
    const [error,setError]=useState('');
    const [email,setEmail]=useState('');
    const [loading,setLoading]=useState(false);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;

    const fetchNewTeacher = async (event) => {
        setLoading(true);

        try {
          const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/teacher/new`, { 
            name,
            major,
            level,
            email,
            
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
            setMajor('');
            setLevel('');
            setEmail('');
;            alert("Thêm thành công")
          }
          
          else{
            setError(response.data.message);
          }
      
        } catch (_error) {
            setError(_error);
        }
        setLoading(false);
      };
    return (
        <div className="new-teacher-body">
            <div className="new-teacher-main">
                <label htmlFor="teacher-name">Họ và tên giáo viên</label>
                    <input id="teacher-name" className="input-data"  type="text" placeholder="Họ và tên giáo viên" required  value={name} 
                onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="teacher-email">Email đăng nhập</label>
                    <input id="teacher-email" className="input-data"  type="email" placeholder="email đăng nhập" required  value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="teacher-major">Chuyên môn giảng dạy</label>
                <input id="teacher-major" className="input-data"  type="text" placeholder="Chuyên môn" required  value={major} 
                onChange={(e) => setMajor(e.target.value)}/>
                <label htmlFor="teacher-level">Cấp đào tạo</label>
                <input id="teacher-level" className="input-data"  type="number" placeholder="Cấp bậc học viên đào tạo" required value={level} 
                onChange={(e) => setLevel(e.target.value)}/>
                <button style={{opacity:loading?'0.3':'1'}} onClick={()=>fetchNewTeacher()} className="submit-button">Thêm</button>
                <button onClick={()=>{setIndedx('')}} style={{background:'black'}} className="submit-button">Hủy</button>
                <p style={{display:error===''?'none':'', color:'red', fontSize:'12px', fontWeight:'lighter'}} >Error: {error}</p>
            </div>
            
            
        </div>
    );
}

export default NewTeacher
