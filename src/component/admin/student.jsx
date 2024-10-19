import './student.css';
import React,{useState,useEffect} from 'react';
import { SERVER_GATEWAY_URL } from '../../config';
import axios from 'axios';

export default function Student(){
    const [amountStudent,setAmountStudent]=useState(0);
    const [indexPage,setIndexPage]=useState(0); // quan ly chi muc cua danh sach sinh vien
    const [findData,setFindData]=useState('');
    const [pageStudent,setPageStudent]=useState(0); // luu so trang
    const [showPage,setShowPage]=useState([]); // luu tru 5 phan tu cua mang pageStudent
    const get_amount_student=async()=>{ // goi den dichh vu lay so luong cua student
        try{
            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/student/profile/amount_of_student`);
            setAmountStudent(response.data);
            if(response.data%10!=0){
                setPageStudent(Math.floor(response.data/10+1))
            }
            else{
                setPageStudent(response.data/10); 
            }
        }
        catch(e){
            console.log(e);
        }
    };
    useEffect(()=>{ // lay so luong cua student ngay khi trang tai xong
        get_amount_student();
    },[])

    const page_number=[];
    const set_page_number=async(start,end)=>{
         // lay so luong sinh vien sau do chia ra de tinh so trang de hien thi
        // page_number.splice(0, page_number.length);
        for (let i = start; i <= end; i++) {
            
            page_number.push(<p 
                onClick={()=>setIndexPage(i)}
                style={{fontSize:'10px',padding:'2px 5px 2px 5px' ,lineHeight:'30px', margin:'1px'
                , cursor:'pointer',textAlign:'center'
                    ,background:i===indexPage?'grey':''
            }} key={i}>{i}</p>);
            
        }
        
    }
    set_page_number(1,pageStudent);
    

    const trans_left=async()=>{ // di chuyen sang trai
        if(indexPage>1){
            setIndexPage(indexPage-1);
        }
    }
    const trans_right=async()=>{  // di chuyen sang phai
        if(indexPage<pageStudent){
            setIndexPage(indexPage+1);
        }
      
        
    }
 
    useEffect(() => {
        if(indexPage<5){
            setShowPage(page_number.slice(0, 5));
        }
        else if(indexPage >=5){
            setShowPage(page_number.slice(indexPage-4, indexPage+1));
        }
    }, [indexPage]);

    const [students,setStudents]=useState([{}]);
    const find_by_data=async()=>{ // tim kiem student
        try{
            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/student/profile/find_student?data=${findData}`);
            setStudents(response.data);
        }
        catch(e){
            console.log(e);
        }
    };
    
    
    return (
        <div className='student-body'>
            <div className='student-body-option'>
                <div className='find-by-name'>
                    <input placeholder='Tên,email hoặc số điện thoại' className='name-find' type='text' value={findData} onChange={(e)=>setFindData(e.target.value)}/>
                    <button onClick={()=>find_by_data()} className='find-button'>Tìm kiếm</button>
                </div>
                <div className='trans-page'>
                    <button onClick={()=>trans_left()}>{'<'}</button>
                    {showPage}
                    
                    <button onClick={()=>trans_right()}>{'>'}</button>

                </div>
            </div>
            <div className='student-body-main'>
                <DataTable indexPage={indexPage} students={students} setStudents={setStudents}/>
            </div>
        </div>
    );
}

const DataTable=({indexPage,students,setStudents})=>{
    
    const get_student_by_index=async(index)=>{
        try{
            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/student/profile/get_by_index`, {
                params: {
                    index: index-1, // Vị trí bắt đầu
                    size: 10      // Số lượng sinh viên muốn lấy
                }
            });
            setStudents(response.data);
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        get_student_by_index(indexPage);
    },[indexPage]);
    const containerStyle = {
        width:'90%',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
        maxHeight: '500px', // Chiều cao cố định cho bảng
        overflowY: 'auto',  // Kích hoạt thanh cuộn dọc nếu nội dung vượt quá chiều cao
        // Đường viền cho div chứa bảng
       
    };
    const tableStyle = {
        width: '100%', // Kích thước chiều rộng của bảng
        
        
        borderCollapse: 'collapse', // Loại bỏ khoảng trống giữa các ô trong bảng
        
    };

    const thStyle = {
        padding: '10px',
        background: 'rgb(77, 121, 214)',
        textAlign: 'left',
        color:'white',
        position: 'sticky',          // Làm cho tiêu đề cố định
        top: 0,                      // Vị trí cố định là trên cùng
        zIndex: 1, 
    };

    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        fontSize:'12px',
        color:'grey',
    };

    return (
        <div style={containerStyle}>
          <table style={tableStyle}>
              <thead>
                  <tr>
                  <th style={thStyle}>ID</th>
                      <th style={thStyle}>Tên </th>
                      <th style={thStyle}>email</th>
                      <th style={thStyle}>Điện thoại</th>
                      <th style={thStyle}></th>
                  </tr>
              </thead>
              <tbody >
             
                   {students.map((item) => (
                      <tr key={item.id}>
                         <td style={tdStyle}>{item.id}</td>
                          <td style={tdStyle}>{item.fullname}</td>
                          <td style={tdStyle}>{item.email}</td>
                          <td style={tdStyle}>{item.phone}</td>
                          <td style={tdStyle}><button style={{background:'transparent',border:'transparent',cursor:'pointer'}}></button></td>
                      </tr>
                  ))} 
              </tbody>
          </table>
      </div>
      );
}