import React ,{ useState ,useEffect}from "react";
import './videoList.css';
import YoutubePlayer from "../../videos/youtube";
import { SERVER_ELASTICSEARCH } from "../../../config";
import axios from 'axios';


function Videoslist({isTeacher,setIsLoading}){
    const [modVideo,setModVideo]=useState(false);

    const [videos,setVideos]=useState(['video 1', 'video 2', 'video 3','video 1', 'video 2', 'video 3','video 1', 'video 2', 'video 3']);
    
    return(
        <div className="videos-body">
            { videos!==null && videos.map((video, index)=>(
                <div className="video-element">
                <div className="img-div"></div>
                <div className="video-description">
                    <h4 style={{color:'grey'}}>video 1</h4>
                    <p style={{color:'grey',fontSize:'13px'}}>video giới thiệu về khóa học</p>
                </div>
            </div>
            ) )}

            <button onClick={()=>{setModVideo(!modVideo)}}
             style={{display:isTeacher?'none':'',background:'rgb(77, 121, 214)',border:'none'
                ,color:'white', fontSize:'15px', padding:'10px', cursor:'pointer'
            }}>Thêm nội dung mới</button>
            <div className="panel-body" style={{display:!modVideo?'none':''}}>
                <Addvideo modVideo={modVideo} setModVideo={setModVideo} setIsLoading={setIsLoading} />
            </div>
        </div>
    );
}

function Addvideo({modVideo,setModVideo,setIsLoading}){
    const[videoId,setVideoId]=useState('');
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [stt,setStt]=useState(0);
    const addVideoFunc= async () => {
            setIsLoading(true);
            const data={
                title:title,
                description:description,
                course:"OgxexpEBSmp_U9Ac45Y8",
                stt:stt,
                linkId:videoId
                
            }
            try {
                const response = await axios.post(`${SERVER_ELASTICSEARCH}/elasticSearch/video/new`, data);
                setIsLoading(false);
                setModVideo(false);
                const { code, message, result } = response.data;
    
                if (code === 1000) {
                    console.log('success', result);
                } else {
                    alert("failure")
                }
            } catch (error) {
                setIsLoading(false);
                console.error('Error:', error);
            }

           
        
    };
    
    return(
       
            <div className="panel-container">
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