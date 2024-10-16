import './student.css';
import React,{useState,useEffect} from 'react';

export default function Student(){
    const [findData,setFindData]=useState('')
    return (
        <div className='student-body'>
            <div className='student-body-option'>
                <div className='find-by-name'>
                    <input placeholder='Tên,email hoặc số điện thoại' className='name-find' type='text' value={findData} onChange={(e)=>setFindData(e.target.value)}/>
                    <button className='find-button'>Tìm kiếm</button>
                </div>
                <div className='trans-page'>
                    <button>{'<'}</button>
                    <p>...</p>
                    <button>{'>'}</button>

                </div>
            </div>
            <div className='student-body-main'>
                <DataTable/>
            </div>
        </div>
    );
}
const DataTable=()=>{
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
              <tr >
                         <td style={tdStyle}>{'item.id'}</td>
                          <td style={tdStyle}>{'item.name'}</td>
                          <td style={tdStyle}>{'item.major'}</td>
                          <td style={tdStyle}>{'item.level'}</td>
                          <td style={tdStyle}><button style={{background:'transparent',border:'transparent',cursor:'pointer'}}></button></td>
                      </tr>
                  {/* {dataList.map((item) => (
                      <tr key={item.id}>
                         <td style={tdStyle}>{item.id}</td>
                          <td style={tdStyle}>{item.name}</td>
                          <td style={tdStyle}>{item.major}</td>
                          <td style={tdStyle}>{item.level}</td>
                          <td style={tdStyle}><button style={{background:'transparent',border:'transparent',cursor:'pointer'}}></button></td>
                      </tr>
                  ))} */}
              </tbody>
          </table>
      </div>
      );
}