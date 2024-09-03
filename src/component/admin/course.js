import React,{ useState } from "react";
import  './course.css';
import { color } from "chart.js/helpers";
import { IoEyeSharp } from "react-icons/io5";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
function Course(){
    //  khu vuc su ly lua chon cap bac -start
    const [selectedValueLevel, setSelectedValuelevel] = useState(''); //khai bao biên quan lý lựa chọn cấp bậc

    const handleSelectChangeLevel = (event) => {  // xu ly sthay doi luaawj chọn
        setSelectedValuelevel(event.target.value);
    };
    const optionsLevel = [  // data set thay bang data tuu csdl
        { value: '', label: 'Chọn' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];
     //  khu vuc su ly lua chon cap bac -end

     // khu vuc xu ly lua chon mon hoc -start
    const [selectedNameCourse,setSelectedNameCourse]=useState('');
    const handleSelectNameCourse = (event) => {  // xu ly sthay doi luaawj chọn
        setSelectedNameCourse(event.target.value);
    };
    const optionsName = [  // data set thay bang data tuu csdl
        { value: '', label: 'Chọn' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];
      // khu vuc xu ly lua chon mon hoc -end
    return (
        <div className="course-body">
            <div className="course-body-filter">
                <div className="course-body-filter-container">
                <label htmlFor="dropdown" style={{color:'grey',fontSize:'13px'}}>Chọn cấp bậc đào tạo: </label>
                <select style={{outline:'none'
                    , border:'none',color:'grey',padding:'10px'
                }} id="dropdown" value={selectedNameCourse} onChange={handleSelectNameCourse}>
                    {optionsLevel.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                </div>

                <div className="course-body-filter-container">
                <label htmlFor="dropdown" style={{color:'grey',fontSize:'13px'}}>Chọn môn học: </label>
                <select style={{outline:'none'
                    , border:'none',color:'grey',padding:'10px'
                }} id="dropdown" value={selectedValueLevel} onChange={handleSelectChangeLevel}>
                    {optionsName.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                </div>
                <div className="course-body-filter-container"><button style={{background:'rgb(77, 121, 214)',
                    border:'transparent', padding:'5px 15px 5px 15px', color:'white', cursor:'pointer'
                }}>Lọc</button>
                    <button style={{background:'rgb(236, 70, 58)',
                    border:'transparent', padding:'5px 15px 5px 15px', color:'white', cursor:'pointer',marginLeft:'10px'
                }}>Tất cả</button>
                </div>

                
            </div>
            <DataTable />
        </div>
    )
}


const DataTable = () => {
    const dataList = [
        { id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' },{ id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' },
        { id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' },
        { id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' },
        { id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' },
        { id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' },
        { id: 1, name: 'Toán', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 2, name: 'English', teacher: "Châu Dương Phát Tiến", level: 'ĐH' },
        { id: 3, name: 'Vật lý', teacher: "Trần Quang Duy", level:'ĐH' }
    ];
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
                    <th style={thStyle}>Tên khóa học</th>
                    <th style={thStyle}>Giáo viên</th>
                    <th style={thStyle}>Cấp bậc</th>
                    <th style={thStyle}></th>
                </tr>
            </thead>
            <tbody >
                {dataList.map((item) => (
                    <tr key={item.id}>
                       <td style={tdStyle}>{item.id}</td>
                        <td style={tdStyle}>{item.name}</td>
                        <td style={tdStyle}>{item.teacher}</td>
                        <td style={tdStyle}>{item.level}</td>
                        <td style={tdStyle}><button style={{background:'transparent',border:'transparent',cursor:'pointer'}}><IoEyeSharp /></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};
export default Course