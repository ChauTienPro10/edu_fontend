import React from "react";
import './statistic.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);// Đăng ký các components của Chart.js
function Statistic(){
    return(
        <div className="statistic-body">
            <div className="statistic-body-table">
                <DataTableOut/>
                <DataTablein/>
            </div>
            <div className="statistic-body-table">
                <LineChart />
                <div className="result">
                    <p style={{color:'grey'}}> Tổng lợi nhuận :{20000000} triệu đồng</p>
                </div>
            </div>
            
        </div>
    );
}


const DataTableOut = () => {
    const dataList = [
        { month: 1, total: 20000000 },
        { month: 2, total: 20000000 },
        { month: 3, total: 20000000 },
        
      
    ];
    const containerStyle = {
        width:'45%',
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
                    <th style={thStyle}>Tháng</th>
                    <th style={thStyle}>Tổng lương</th>
                    
                </tr>
            </thead>
            <tbody >
                {dataList.map((item) => (
                    <tr key={item.id}>
                       <td style={tdStyle}>{item.id}</td>
                        <td style={tdStyle}>{item.month}</td>
                        <td style={tdStyle}>{item.total}.triệu đồng </td>
                        {/* <td style={tdStyle}>{item.level}</td> */}
                        {/* <td style={tdStyle}><button style={{background:'transparent',border:'transparent',cursor:'pointer'}}><IoEyeSharp /></button></td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

const DataTablein = () => {
    const dataList = [
        { month: 1, total: 20000000 },
        { month: 2, total: 20000000 },
        { month: 3, total: 20000000 },
        
      
    ];
    const containerStyle = {
        width:'45%',
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
                    <th style={thStyle}>Tháng</th>
                    <th style={thStyle}>Tổng lương</th>
                    
                </tr>
            </thead>
            <tbody >
                {dataList.map((item) => (
                    <tr key={item.id}>
                       <td style={tdStyle}>{item.id}</td>
                        <td style={tdStyle}>{item.month}</td>
                        <td style={tdStyle}>{item.total}.triệu đồng </td>
                        {/* <td style={tdStyle}>{item.level}</td> */}
                        {/* <td style={tdStyle}><button style={{background:'transparent',border:'transparent',cursor:'pointer'}}><IoEyeSharp /></button></td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};


const LineChart = () => {
    const _return=[4,5,1,6,4,-4];
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Thu vào (M)',
                data: [3, 2, 2, 1, 5, 4],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Chi ra (M)',
                data: [1, 3, 2, 4, 2, 5],
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Lợi nhuận (M)',
                data: _return,
                borderColor: 'green',
                backgroundColor: 'green',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê chi phí',
            },
        },
    };

    const chartContainerStyle = {
        width: '600px',  // Đặt chiều rộng cố định
        height: '300px', // Đặt chiều cao cố định
        margin: 'auto',  // Căn giữa biểu đồ nếu cần
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
    };

    return (
        <div style={chartContainerStyle}>
            <Line data={data} options={options} />
        </div>
    );
};
export default Statistic