import React,{ useState ,useEffect} from "react";
import  './course.css';
import { color } from "chart.js/helpers";
import { IoEyeSharp } from "react-icons/io5";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { FaPencil } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import axios from 'axios';
import { SERVER_GATEWAY_URL } from "../../config";
function Teacher(){
    const [filter,setFilter]=useState({level:0,subject:''})

    const [openPanel,setOpenPanel]=useState(false); // quan ly dong mo bang dieu chinh khoa hoc
    //  khu vuc su ly lua chon cap bac -start
    const [selectedValueLevel, setSelectedValuelevel] = useState(''); //khai bao biên quan lý lựa chọn cấp bậc

    const handleSelectChangeLevel = async(event) => {  // xu ly sthay doi luaawj chọn
        await setSelectedValuelevel(event.target.value);
    };
    const optionsLevel = [  // data set thay bang data tuu csdl
        { value: 0, label: 'Chọn' },
        { value: 1, label: 'Tiểu học' },
        { value: 2, label: 'Thcs' },
        { value: 3, label: 'Thpt' },
        { value: 4, label: 'Đại học' },
    ];
     //  khu vuc su ly lua chon cap bac -end

     // khu vuc xu ly lua chon mon hoc -start
    const [selectedcodeSubj,setSelectedcodeSubj]=useState('');
    
    
      // khu vuc xu ly lua chon mon hoc -end


     const handleSelectFil=async() => {
        // Lấy danh sách khóa học từ API hoặc backend
        await setFilter({level:selectedValueLevel,subject:selectedcodeSubj});
        
      }
    return (
        <div className="course-body">
            <div className="course-body-filter">
                <div className="course-body-filter-container">
                <label htmlFor="dropdown" style={{color:'grey',fontSize:'13px'}}>Chọn cấp bậc đào tạo: </label>
                <select style={{outline:'none'
                    , border:'none',color:'grey',padding:'10px'
                }} id="dropdown" value={selectedValueLevel} onChange={handleSelectChangeLevel}>
                    {optionsLevel.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                </div>

                <div className="course-body-filter-container">
                <label htmlFor="code-subj" style={{color:'grey',fontSize:'13px'}}>Chọn theo mã chuyên môn: </label>
                <input type="text" style={{outline:'none'
                    , border:'none',color:'grey',padding:'10px', background:'wheat'
                }} id="code-subj" value={selectedcodeSubj} onChange={(e)=>setSelectedcodeSubj(e.target.value)}>
                    
                </input>
                </div>
                <div className="course-body-filter-container"><button style={{background:'rgb(77, 121, 214)',
                    border:'transparent', padding:'5px 15px 5px 15px', color:'white', cursor:'pointer'
                }}
                    onClick={()=>handleSelectFil()}
                >Lọc</button>
                    <button style={{background:'rgb(236, 70, 58)',
                    border:'transparent', padding:'5px 15px 5px 15px', color:'white', cursor:'pointer',marginLeft:'10px'
                }} onClick={()=>setFilter({level:0,subject:''})}>Tất cả</button>
                </div>

                
            </div>
            <DataTable openPanel={openPanel} setOpenPanel={setOpenPanel} filter={filter}/>
            <PanelControl openPanel={openPanel} setOpenPanel={setOpenPanel}/>
            
        </div>
        
    )
}


const DataTable = ({openPanel,setOpenPanel,filter}) => {
    const [dataList,setDataList]=useState([]);// quan ly dasnh sach khoa hoc
    const fetchTeacher = async () => { // lay tat ca khoa hoc
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/teacher/getall`,{},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                setDataList(response.data.result);
                
                
            }
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);


        }
    };

    //////////////////////////////////////////////////////////

    const fetchTeacherByFilter = async () => { // lay tat ca khoa hoc
        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            
            if(user_._jwt!==undefined){
                const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/teacher/get.by.level?level=${filter.level}&code=${filter.subject}`,{},
                    {
                        headers: {
                            'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                            'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                          },
                    },
                );
                setDataList(response.data.result);
                
                
            }
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);


        }
    };
/////////////////////////////////////////////////
    useEffect(() => {
        // Lấy danh sách khóa học từ API hoặc backend
        fetchTeacher();
      }, []);

      useEffect(() => {
        // Lấy danh sách khóa học từ API hoặc backend theo level
        if(filter.level===0){
            fetchTeacher();
        }
        else fetchTeacherByFilter();
      }, [filter]);
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
                    <th style={thStyle}>Chuyên môn</th>
                    <th style={thStyle}>Cấp bậc</th>
                    <th style={thStyle}></th>
                </tr>
            </thead>
            <tbody >
                {dataList.map((item) => (
                    <tr key={item.id}>
                       <td style={tdStyle}>{item.id}</td>
                        <td style={tdStyle}>{item.name}</td>
                        <td style={tdStyle}>{item.major}</td>
                        <td style={tdStyle}>{item.level}</td>
                        <td style={tdStyle}><button onClick={()=>{setOpenPanel(!openPanel)}} style={{background:'transparent',border:'transparent',cursor:'pointer'}}><IoEyeSharp /></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

function PanelControl({openPanel,setOpenPanel}){
    const [nameCourse,setNameCourse]=useState("PEN C-Tiếng anh");// quan ly ten khoa hoc
    const [nameMod , setNameMod]=useState(false); // quan ly bat tat sua ten khoa hoc
    const [price,setPrice]=useState(1000) //quan ly gia
    const [priceMod,setPriceMod]=useState(false); // quan ly che do chinh sua gia
    return (
        <div className={`control-body ${openPanel ?'':'hiden'}`}>
            <div className="control-body-container">
                <div onClick={()=>{setOpenPanel(false)}} className="close">x</div>
                <div className="control-body-container-both control-body-container-left">
                    <img src='https://github.com/ChauTienPro10/Core-Infrastructure-Fundamentals-/blob/main/46banner-webphuongpa-715x400-1.png?raw=true'/>
                    <div className="input-name input-container">
                        <input  style={{ display: !nameMod ? 'none' : '' ,background:'rgba(255, 255, 255, 0.8)'}} type="text" placeholder={nameCourse}
                        value={nameCourse} onChange={(e)=>setNameCourse(e.target.value)}/>
                        <h4 style={{ display: nameMod ? 'none' : '' }}>{nameCourse}</h4>
                        <button  onClick={()=>{setNameMod(!nameMod)}} style={{marginLeft:'10px',border:'transparent',
                            background:'transparent', color:'grey',cursor:'pointer'
                        }}>{nameMod ? <IoCheckmarkDoneCircle /> : <FaPencil />}</button>
                    </div>

                    <div className="input-price input-container">
                        <input  style={{ display: !priceMod ? 'none' : '',background:'rgba(255, 255, 255, 0.8)' }} type="number" placeholder={price}
                        value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        <p style={{ display: priceMod ? 'none' : '' ,color:'grey'}}>Giá :{price} đ</p>
                        <button  onClick={()=>{setPriceMod(!priceMod)}} style={{marginLeft:'10px',border:'transparent',
                            background:'transparent', color:'grey',cursor:'pointer'
                        }}>{priceMod ? <IoCheckmarkDoneCircle /> : <FaPencil />}</button>
                    </div>
                    <div className="submit-options">
                        <button style={{background:'  rgb(77, 121, 214)'}}>Xác nhận</button>
                        <button style={{background:'rgb(248, 140, 52)'}}>Hủy bỏ</button>
                    </div>
                    
                </div>
                <div className="control-body-container-both control-body-container-right">
                    <div className="avt-container"></div>
                    <h4 style={{color:'grey', marginTop:'20px'}}>Giáo viên : {' Châu Dương Phát Tiến'}</h4>
                    <h4 style={{color:'grey', marginTop:'20px'}}>Cấp bậc đào tạo : {' ĐH'}</h4>
                    <FaTrashCan style={{color:'red',width:'50px',height:'50px', cursor:'pointer',marginTop:'50px'}}/>
                </div>
            </div>
        </div>
    )
}
export default Teacher