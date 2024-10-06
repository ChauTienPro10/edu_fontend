import React ,{ useState ,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import './videoList.css';
import YoutubePlayer from "../../videos/youtube";
import { SERVER_GATEWAY_URL } from "../../../config";
import axios from 'axios';
import LoginSucces from "../../alert/LoginSucces";
import LoginFailue from "../../alert/loginFailue";




function Videoslist({isTeacher,setIsLoading,_course,setShowPay}){
    const navigate = useNavigate();

    const [modVideo,setModVideo]=useState(false);
    const [videos,setVideos]=useState([]);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;
    const getListVideo = async () => {
        try {
           
        const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/video/getListVideo?idcourse=${_course.id}`);
        console.log(_course.id);
        await setVideos(response.data);
        
        
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };

    /// xu ly lua chon video
    const handleCLickOnVideo=async ()=>{
        if(sessionStorage.getItem('role')===null){
            navigate('/login');
        }
        else{
            await fetchRegisterInfor();
        }
        
    }

    const fetchRegisterInfor=async()=>{
        try {
            if(sessionStorage.getItem('role')==='ROLE_TEACHER'){
                navigate("/learning", { state: { videos: videos } });
            }
            else{
                if(user_._jwt!==undefined){
                    const response = await axios.post(`${SERVER_GATEWAY_URL}/api/student/register/check`,{email:user_._username,course:_course.id},
                        {
                            headers: {
                                'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                                'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                              },
                        },
                    );
                    console.log(response.data.code);
                    if(response.data.code===10001){
                        alert("Bạn chưa tham gia khóa học")
                        setShowPay(true);
                    }
                    if(response.data.code===1000){
                        navigate("/learning", { state: { videos: videos } });
                    }
                    
                }
            }
            
           
            } catch (error) {
            console.error('Error :', error);
            }
    }

    useEffect(() => {
        const fetchVideos = async () => {
          // Fetch information of the course by course id
          await getListVideo();
        };
      
        fetchVideos();
      }, []); // Empty dependency array to ensure this runs only once on mount
    
     
    return(
        <div className="videos-body">
            { videos!==null && videos.map((video, index)=>(
                <div onClick={()=>handleCLickOnVideo()} className="video-element">
                <div className="img-div"></div>
                <div className="video-description">
                    <h4 style={{color:'grey'}}>{video.title}</h4>
                    <p style={{color:'grey',fontSize:'13px'}}>{video.description}</p>
                </div>
            </div>
            ) )}

            <button onClick={()=>{setModVideo(!modVideo)}}
             style={{display:isTeacher?'':'none',background:'rgb(77, 121, 214)',border:'none'
                ,color:'white', fontSize:'15px', padding:'10px', cursor:'pointer'
            }}>Thêm nội dung mới</button>
            <div className="panel-body" style={{display:!modVideo?'none':''}}>
                <Addvideo modVideo={modVideo} setModVideo={setModVideo} setIsLoading={setIsLoading} _course={_course}/>
            </div>
        </div>
    );
}

function Addvideo({modVideo,setModVideo,setIsLoading ,_course}){
    const [ isSuccess,setIsSuccess]=useState(false); // quan ly hien thi thong bao
    const [isFailure,setIsFailure]=useState(false); // quan ly hien thi thong bao that bai
    const[videoId,setVideoId]=useState('');
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [stt,setStt]=useState(0);
    const [err,setErr]=useState('');
    const addVideoFunc= async () => {
            setIsLoading(true);
            const data={
                title:title,
                description:description,
                course:_course.id,
                stt:stt,
                link:videoId
                
            }
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            try {
                if(user_._jwt!==undefined){
                    const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/video/new`, data,
                        {
                            headers: {
                                'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                                'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                            },
                        },
                    );
                    setIsLoading(false);
                    
                    const { code, message, result } = response.data;
        
                    if (code === 1000) {
                        setTitle('');
                        setDescription('');
                        setVideoId('');
                        setIsSuccess(true);
                    } else {
                        setIsFailure(true);
                        setErr(message);
                    }
            }
            } catch (error) {
                setIsLoading(false);
                console.error('Error:', error);
            }

           
        
    };
    
    return(
       
            <div className="panel-container">
                <div onClick={()=>{setIsSuccess(false);setModVideo(false);}} style={{display:isSuccess?'':'none'}} className="inform-table">
                    <LoginSucces message={'Đã thêm video'}/>
                </div>
                <div onClick={()=>{setIsFailure(false);}} style={{display:isFailure?'':'none'}} className="inform-table">
                    <LoginFailue message={err}/>
                </div>
                <div className="title-video">
                    <label  style={{color:'grey',fontSize:'13px'}}  htmlFor="videoTitle">Tiêu đề:</label>
                    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} style={{width:'400px',height:'80%', border:'none',outline:'none',background:'rgba(0, 0, 0, 0.274)'
                        ,padding:'0 10px 0 10px',color:'grey'
                    }} 
                    id="videoTitle" type="text" placeholder="Nhập tiêu đề video"/>
                </div>
                <div className="title-video">
                    <label style={{color:'grey',fontSize:'13px'}}  htmlFor="videoTitle">Mô tả:</label>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} style={{width:'400px',height:'80%', border:'none',outline:'none',background:'rgba(0, 0, 0, 0.274)'
                        ,padding:'0 10px 0 10px',color:'grey'
                    }} 
                    id="videoTitle" type="text" placeholder="nhập mô tả "/>
                </div>
                <div className="title-video">
                    <label style={{color:'grey',fontSize:'13px'}}  htmlFor="videoTitle">Liên kết:</label>
                    <input
                        onChange={(e) => {
                            setVideoId(e.target.value);  // Update state
                           
                        }}
                        style={{
                            width: '350px',
                            height: '80%',
                            border: 'none',
                            outline: 'none',
                            background: 'rgba(0, 0, 0, 0.274)',
                            padding: '0 10px',
                            color: 'grey'
                        }}
                        id="videoTitle"
                        type="text"
                        placeholder="Thêm liên kết"
                        value={videoId}
                        /><input value={stt} onChange={(e)=>setStt(e.target.value)}
                        placeholder="stt"
                        style={{width:'50px',
                        height:'80%', cursor:'pointer', border:'none'
                    }} />
                </div>
                <div className="video-check">
                    <p style={{color:'red', fontSize:'12px'}}>Vui lòng chắc chắn rằng bạn nhập đúng id của video!</p>
                    <YoutubePlayer videoId={videoId} _height={'200'} _width={'350'}/>
                </div>
                <div className="options-con">
                    <button style={{background:'rgb(77, 121, 214)'}} onClick={()=>addVideoFunc()}>Thêm video này</button>
                    <button
                        onClick={()=>{setModVideo(!modVideo)}}
                     style={{background:'rgb(230, 132, 75)'}}>Hủy</button>

                </div>
            </div>
        
    );
}

export default Videoslist