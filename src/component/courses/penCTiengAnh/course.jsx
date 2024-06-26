import React from "react";
import './course.css';
import Header from "../../header/Header";
import { IoIosHome } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
function Course(){
    return(
        <div className="course-container">
            <Header />
            <Body />
            <ContentCourse />
        </div>
    );
}
function Body(){
    return (
        <div className="course-body">
           <nav className="Breadcrumb-container" aria-label="Breadcrumb">
                <ol id="breadcrumb">
                    <IoIosHome />
                    <li><a href="/">Home</a><p>{' > '}</p></li>
                    <li><a href="/khoa-hoc">khoa hoc</a></li>
                </ol>
            </nav>
            <div className="ad-board"></div>
            <div className="more-infor">
                <div className="infor-left">
                    <h4 style={{color:'gray'}}>{'PEN-C TIENG ANH- THẦY PHẠM TRỌNG HIẾU'}</h4>
                    <p><a style={{color:'blue'}} href="#">Luyện thi đại học môn Tiếng Anh</a>{' hiệu quả và dễ dàng hơn cùng thầy Phạm Trọng Hiếu. Với phương pháp tiếp cận thú vị, khóa học này sẽ giúp các em bớt sợ Tiếng Anh và cảm thấy gần gũi như tiếng Việt, từ đó đạt điểm cao trong bài thi tốt nghiệp THPT.'}</p>
                    <p>{'Giáo viên '}<a href="#" style={{color:'blue'}} >Thầy Phạm Trọng Hiếu</a></p>
                    <div className="video-container">
                        <iframe width="650" height="350" src="https://www.youtube.com/embed/VIDEO_ID" 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                        <p style={{color:'red'}}>Vui lòng không chia sẻ tài khoản cho người khác. Tài khoản vi phạm sẽ bị khóa vĩnh viễn.HOCMAI chúc bạn học tập hiệu quả!</p>
                    </div>
                    <ul className="more-list"> 
                        <li><a href="#">Mô tả khóa học</a></li>
                        <li><a href="#">Đề cương khóa học</a></li>
                        <li><a href="#">Bài giảng miễn phí</a></li>
                        <li><a href="#">Giảng viên giảng dạy</a></li>
                    </ul>
                </div>
                <div className="infor-right">
                    <h3 style={{marginTop:'60px'}}>Khóa học đã hết hạn đăng ký</h3>
                    <ul style={{width:'100%',marginLeft:'0',listStyle:'none'}} >
                        <li className="li-container">Mục tiêu khóa học
                            <ul style={{paddingLeft:'40px',listStyle:'square'}}>
                                <li className="li-content">Nắm vững kiến thức và đạt điểm cao trong bài thi tốt nghiệp THPT môn Tiếng Anh.</li>
                            </ul>
                        </li>
                        <li className="li-container">Cấu trúc khóa học 
                            <ul style={{paddingLeft:'40px',listStyle:'square'}}>
                                <li className="li-content">5 chuyên đề</li>
                                <li className="li-content">62 bài giảng</li>
                                <li className="li-content">Hơn 1500 bài tập</li>
                            </ul>
                        </li>
                        <li className="li-container">Dịch vụ 
                            <ul style={{paddingLeft:'40px',listStyle:'square'}}>
                                <li className="li-content"><a style={{color:'rgb(0, 81, 255)'}} href="#">Các kênh hỗ trợ học tập</a></li>
                                <li className="li-content">Thảo luận trong từng bài giảng <FaQuestionCircle style={{color:'rgb(0, 81, 255)',cursor:'pointer'}}/></li>
                                <li className="li-content">Chương trình kiểm tra năng lực thường xuyên  <FaQuestionCircle style={{color:'rgb(0, 81, 255)',cursor:'pointer'}}/></li>
                            </ul>
                            
                        </li>
                        <li className="li-container">Thời gian
                            <ul style={{paddingLeft:'40px',listStyle:'square'}}>
                            <li className="li-content">Hạn đăng ký: 31/05/2024 <FaQuestionCircle style={{color:'rgb(0, 81, 255)',cursor:'pointer'}}/></li>
                            <li className="li-content">Ngày bế giảng: 31/08/2024  <FaQuestionCircle style={{color:'rgb(0, 81, 255)',cursor:'pointer'}}/></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
                
        </div>
            
    )
}

function ContentCourse(){
    return (
        <div className="content-course-body">
            <div className="course-body-left">
                <div className="descrip-cource">
                    <div className="descrip-title">
                        <h4 style={{color:'rgba(0,0,0,0.7)',marginTop:"20px"}}>Mô tả khóa học</h4>
                        <p style={{fontSize:'14px',marginTop:'40px',color:'gray'}}>
                        Trong khóa Luyện thi PEN-C - tổng ôn toàn diện, Thầy Phạm Trọng Hiếu sẽ giúp học sinh có lộ trình ôn thi môn Tiếng Anh bằng phương pháp của riêng thầy, bao gồm:</p>
                        <ul style={{paddingLeft:'50px',fontSize:'14px',color:'gray'}}>
                            <li>Phương pháp phân tích tổng quát một câu chuẩn.</li>
                            <li>Ứng dụng của việc xác định thành phần câu vào kĩ năng đọc và cải thiện từ vựng.</li>
                            <li>Phân tích chi tiết các thành phần câu trong Tiếng Anh.</li>
                            <li>Tăng cường vốn từ vựng qua các chủ đề thân thuộc với học sinh.</li>
                        </ul>
                        <p style={{fontSize:'14px',marginTop:'0',color:'gray'}}>
                            Với lộ trình ôn thi bài bản cùng phong cách giảng dạy độc đáo, sáng tạo, quá trình luyện thi của học sinh sẽ đạt được hiệu quả cao và đạt được điểm số tốt nhất trong kỳ thi tốt nghiệp THPT 2023.</p>

                        <p style={{color:'blue',fontSize:'14px',marginTop:'20px'}}>Đặc biệt, cuối mỗi chuyên đề đều có đề kiểm tra năng lực được chia thành 4 level để học sinh thử 
                            thách và đánh giá mức độ nắm vững kiến thức ở từng chuyên đề của mình. Đề thi 4 level được xây dựng theo 4 cấp độ câu hỏi Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.
                             Để vượt qua level ở mỗi cấp độ, các em cần đạt điểm số như sau:</p>
                        <ul style={{marginTop:'30px',paddingLeft:'50px'}}>
                            <li style={{display:'flex',justifyContent:'left',alignItems:'center',fontSize:'12px'
                                ,height:'20px',fontStyle:'italic'
                            }}>{" "}<p style={{color:'red',fontSize:'12px'}}>{"Cấp độ Khởi động, Vượt rào, Tăng tốc: "}</p> Học sinh cần đạt trên 8 điểm</li>
                            <li style={{display:'flex',justifyContent:'left',alignItems:'center',fontSize:'12px'
                                ,height:'20px',fontStyle:'italic'
                            }}>{" "}<p style={{color:'red'}}>{"Cấp độ Về đích: "}</p> Học sinh cần đạt điểm tuyệt đối là 10 điểm</li>
                        </ul>
                        <p style={{fontSize:'14px',color:'gray',fontStyle:'italic',marginTop:'20px'}}>Vượt qua level thấp mới được thi tiếp level cao hơn. Học sinh vượt qua cả 4 level đồng nghĩa với việc đã nắm vững kiến thức trong chuyên đề đó và có thể học thẳng sang chuyên đề tiếp theo.</p>
                    </div>
                    <div className="require-title">
                        <h4 style={{color:'rgba(0,0,0,0.7)',marginTop:"20px"}}>Yêu cầu khóa học</h4>
                        <p style={{fontStyle:'italic',fontSize:'14px',fontWeight:'bold',marginTop:'20px'}}>Yêu cầu đầu vào của khóa học</p>
                        <ul style={{color:"gray",fontSize:'14px',paddingLeft:'50px'}}>
                            <li>Học sinh hiểu về cấu trúc câu, kết cấu câu trong tiếng Việt. Từ đó học sinh mới có sự đối chiếu sang Tiếng Anh.</li>
                            <li>
                            Trong quá trình luyện thi, cần chăm chỉ, nghiêm túc thực hành, đối chiếu và học theo thầy trong từng bài để rèn luyện.
                            </li>
                        </ul>

                        <p style={{fontStyle:'italic',fontSize:'14px',fontWeight:'bold',marginTop:'20px'}}>Kết quả học tập</p>
                        <p style={{color:'gray',fontSize:'14px'}}>Sau khi hoàn thành khóa học, học sinh sẽ nhận được:</p>
                        <ul style={{color:"gray",fontSize:'14px',paddingLeft:'50px'}}>
                            
                            <li>Được cung cấp một lượng từ vựng nhất định thuộc các chủ đề quen thuộc của kì thi đại học.</li>
                            <li>
                            Nắm được các hiện tượng ngữ pháp phổ biến trong môn Tiếng Anh và cách xử lí khi gặp các câu hỏi về ngữ pháp quá trình luyện đề.
                            </li>
                            <li>Làm được một số câu chỉ dựa vào việc phân tích thành phần câu dù câu đó có nhiều từ mới.</li>

                        </ul>
                    </div>
                    <div className="object-title">
                        <h4 style={{color:'rgba(0,0,0,0.7)',marginTop:"20px"}}>Đối tượng</h4>
                        <p style={{color:'gray',fontSize:'14px'}}>Khóa học phù hợp hơn với những học sinh học chưa tốt Tiếng Anh, học mãi không hiểu, muốn thử những phương pháp học mới</p>
                    </div>
                </div>
                <ListVideo />
            </div>
            <div className="course-body-right"></div>
        </div>


    )


}




function ListVideo(){
    return(
        <div className="list-video-body">
            <div className="head-list">
                <h4 style={{color:'white',padding:'5px 10px 5px 10px',background:'rgb(5, 40, 116)',fontWeight:'800',
                    width:'200px' ,borderRadius:'5px 5px 0 2px',border:'traparent',height:'100%'
                }}>Đề cương khóa học</h4>
            </div>
        </div>
    )
}
export default Course