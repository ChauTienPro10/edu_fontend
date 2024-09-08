import React ,{ useState ,useEffect}from "react";
import './videoList.css';
import YoutubePlayer from "../../videos/youtube";


function Videoslist({isTeacher}){
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
                <Addvideo />
            </div>
        </div>
    );
}

function Addvideo(){
    return(
       
            <div className="panel-container">
                <div className="title-video">
                    <label style={{color:'grey',fontSize:'13px'}}  htmlFor="videoTitle">Tiêu đề:</label>
                    <input style={{width:'400px',height:'80%', border:'none',outline:'none',background:'rgba(0, 0, 0, 0.274)'
                        ,padding:'0 10px 0 10px',color:'grey'
                    }} 
                    id="videoTitle" type="text" placeholder="Nhập tiêu đề video"/>
                </div>
                <div className="title-video">
                    <label style={{color:'grey',fontSize:'13px'}}  htmlFor="videoTitle">Mô tả:</label>
                    <input style={{width:'400px',height:'80%', border:'none',outline:'none',background:'rgba(0, 0, 0, 0.274)'
                        ,padding:'0 10px 0 10px',color:'grey'
                    }} 
                    id="videoTitle" type="text" placeholder="nhập mô tả "/>
                </div>
                <div className="title-video">
                    <label style={{color:'grey',fontSize:'13px'}}  htmlFor="videoTitle">Liên kết:</label>
                    <input style={{width:'350px',height:'80%', border:'none',outline:'none',background:'rgba(0, 0, 0, 0.274)'
                        ,padding:'0 10px 0 10px',color:'grey'
                    }} 
                    id="videoTitle" type="text" placeholder="Thêm liên kết"></input><button style={{width:'50px',
                        height:'80%', cursor:'pointer', border:'none'
                    }}>Ok</button>
                </div>
                <div className="video-check">
                    <YoutubePlayer videoId="7KDRqBpT8NA" _height={'100'} _width={'120'}/>
                </div>
            </div>
        
    );
}

export default Videoslist