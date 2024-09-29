import React,{useEffect, useState} from "react";
import './newTeacher.css';
import axios from "axios";
import { SERVER_GATEWAY_URL } from "../../config";
function NewCourse({setIndedx}){
   
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState(0);
    const [level,setLevel]=useState(0);
    const [subject,setSubject]=useState('');
    const [teacher,setTeacher]=useState('');
    
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);


    const fetchNewCourse = async (event) => {
        setLoading(true);

        try {
          const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/new`, {
            title,
            description,
            price,
            level,
            teacher,
            subject
            
          });
    
         
          
          if(response.data.code===1000){
            console.log(response.data.result);
            setError('');
          
            alert("Thêm thành công")
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
                <label htmlFor="course-name">Tiêu đề khóa học</label>
                    <input id="course-name" className="input-data"  type="text" placeholder="Tiêu đề" required  value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="course-description">Mô tả khóa học</label>
                <input id="course-description" className="input-data"  type="text" placeholder="Mô tả" required  value={description} 
                onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="course-subject">Thuộc lĩnh vực</label>
                <input id="course-subject" className="input-data"  type="text" placeholder="nhập mã chuyên môn" required  value={subject} 
                onChange={(e) => setSubject(e.target.value)}/>
                <label htmlFor="course-teacher">Giảng viên</label>
                <input id="course-teacher" className="input-data"  type="text" placeholder="nhập mã giáo viên" required  value={teacher} 
                onChange={(e) => setTeacher(e.target.value)}/>
                <label htmlFor="teacher-level">Cấp đào tạo</label>
                <input id="teacher-level" className="input-data"  type="number" placeholder="Cấp bậc học viên đào tạo" required value={level} 
                onChange={(e) => setLevel(e.target.value)}/>
                <button style={{opacity:loading?'0.3':'1'}} onClick={()=>fetchNewCourse()} className="submit-button">Thêm</button>
                <button onClick={()=>{setIndedx('')}} style={{background:'black'}} className="submit-button">Hủy</button>
                <p style={{display:error===''?'none':'', color:'red', fontSize:'12px', fontWeight:'lighter'}} >Error: {error}</p>
            </div>
            
            
        </div>
    );
}

export default NewCourse
