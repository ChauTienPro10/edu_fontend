import React, { useState, useEffect } from "react";
import './course.css';
import Header from "../../header/Header";
import { FaQuestionCircle } from "react-icons/fa";
import YoutubePlayer from "../../videos/youtube";
import { FaPencil } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SERVER_GATEWAY_URL } from "../../../config";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Videoslist from "./videosContainer";
import MyLoading from "../../alert/loading";
import { useNavigate } from "react-router-dom";
import AddPracticePage from "./addPractice/addPractice";
import Paypage from "./paypage";
function Course() {
    const location = useLocation();
    const { course } = location.state || {};
    const [desContent, setDesContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userJSON = sessionStorage.getItem('user');
    const user_ = userJSON ? JSON.parse(userJSON) : null;
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === undefined) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="course-container">
            <Header />
            <Body _course={course} desContent={desContent} setDesContent={setDesContent} />
            <ContentCourse _course={course} desContent={desContent} setDesContent={setDesContent} setIsLoading={setIsLoading} />
            <div style={{ display: `${isLoading ? '' : 'none'}` }}><MyLoading /></div>
        </div>
    );
}
function Body({ _course, desContent, setDesContent }) {
    const [desMod, setDesmod] = useState(false) // quan ly bat tat mode phan mo ta
    const role = sessionStorage.getItem('role');
    return (
        <div className="course-body">
            <nav className="Breadcrumb-container" aria-label="Breadcrumb">
                <ol id="breadcrumb">
                    {/* <IoIosHome />
                    <li><a href="/">Home</a><p>{' > '}</p></li>
                    <li><a href="/khoa-hoc">khoa hoc</a></li> */}
                </ol>
            </nav>
            <div className="ad-board"></div>
            <div className="more-infor">
                <div className="infor-left">
                    <h4 style={{ color: 'gray' }}>{_course.title}</h4>
                    <p><a style={{ color: 'blue' }} href="#">{_course.description}</a><p style={{ display: desMod ? 'none' : '' }}>{desContent} </p>
                        <textarea
                            value={desContent}
                            onChange={(e) => setDesContent(e.target.value)}
                            rows="5"  // Number of rows visible
                            cols="40" // Number of columns visible
                            placeholder="Enter your text here"
                            style={{ display: !desMod ? 'none' : '', background: 'rgba(255, 255, 255, 0.8)' }}
                        />
                        <FaPencil style={{ display: desMod || role !== 'ROLE_TEACHER' ? 'none' : '', cursor: 'pointer' }} onClick={() => { setDesmod(!desMod) }} />
                        <IoCheckmarkDoneCircle style={{ display: !desMod ? 'none' : '', cursor: 'pointer' }} onClick={() => { setDesmod(!desMod) }} />
                    </p>
                    {/* ket thuc phan thay doi noi dung mo ta */}
                    <p>{'Giáo viên '}<a href="#" style={{ color: 'blue' }} >{_course.teacher}</a></p>
                    <div className="video-container">
                        {/* <iframe width="650" height="350" src="https://www.youtube.com/watch?v=1nA33oSe0Qc&pp=ygUCZjg%3D" 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe> */}
                        <YoutubePlayer videoId="7KDRqBpT8NA" _height={'390'} _width={'640'} />
                        <p style={{ color: 'red' }}>Vui lòng không chia sẻ tài khoản cho người khác. Tài khoản vi phạm sẽ bị khóa vĩnh viễn.HOCMAI chúc bạn học tập hiệu quả!</p>
                    </div>
                    <ul className="more-list">
                        <li><a href="#">Mô tả khóa học</a></li>
                        <li><a href="#">Đề cương khóa học</a></li>
                        <li><a href="#">Bài giảng miễn phí</a></li>
                        <li><a href="#">Giảng viên giảng dạy</a></li>
                    </ul>
                </div>
                <div className="infor-right">
                    <h3 style={{ marginTop: '60px' }}>Bài tập tự luyện</h3>
                    <Practice isTeacher={role==='ROLE_TEACHER'?true:false} course={_course} />
                </div>
            </div>

        </div>

    )
}


const Practice = ({ isTeacher, course }) => {
    const [practices, setPractices] = useState([]);
    const [show, setShow] = useState(false);
    const getAllPractice = async () => {
        try {

            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/practice/getAllCourseById?id=${course.id}`);
            console.log(response.data);
            setPractices(response.data)



        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
    useEffect(() => {
        getAllPractice();
    }, []);

    const toPractice=async(practiceId,content)=>{ // đii đến trang thảo luận bài tập
        window.open(`/course/practice/${practiceId}?content=${encodeURIComponent(content)}`, '_blank');

    }


    return (
        <div className="practice-body">
            <AddPracticePage show={show} setShow={setShow} course={course} />
            <ul className="list-container-practice">
                {practices && practices.map((prac,index)=>(
                    <li onClick={()=>toPractice(prac.id,prac.content)}>
                    <p style={{fontSize:'12px'}}>{prac.content}</p>
                    <div> <p style={{fontWeight:'bolder',fontSize:'14px'}}>Độ khó</p>
                     {Array.from({ length: prac.hardLevel }, (_, idx) => ( <span style={{color:'orange'}} key={idx}>&#9733;</span> // Hiển thị biểu tượng ngôi sao 
                    ))} 
                    </div>
                </li>
                ))}
            </ul>

            {isTeacher && (
                <button style={{
                    padding: '15px', border: 'none', background: 'rgb(98, 201, 233)',
                    color: 'white', cursor: 'pointer'
                }} onClick={() => setShow(true)}>Đăng một bài tập mới</button>
            )}
        </div>
    )
}

function ContentCourse({ _course, desContent, setDesContent, setIsLoading }) {
    const role = sessionStorage.getItem('role');
    const [inforCourse, setInforCourse] = useState(null); // quan ly thong khoa hoc
    const [methods, setMethods] = useState(['']) // phuong thuc hoc tap
    const [methodMod, setMethodMod] = useState(false);// dieu kihen bac tat mode
    const [reqMod, setReqMod] = useState(false);
    const [newReq, setNewReq] = useState('')
    const [newMethod, setNewMethod] = useState('');// luu tru phuong thuc ,moi
    const [requires, setRequires] = useState(['']) // quan ly yeu cau khoa hoc
    const getInforOfCourse = async () => {
        try {

            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/getInforCourse?id=${_course.id}`);
            await setInforCourse(response.data);


        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    useEffect(() => {
        const fetchCourseInfo = async () => {
            // Fetch information of the course by course id
            await getInforOfCourse();
        };
        fetchCourseInfo();
    }, []); // Empty dependency array to ensure this runs only once on mount


    useEffect(() => {
        if (inforCourse != null) {

            setMethods(inforCourse.methods); // Use optional chaining in case inforCourse is null initially
            setRequires(inforCourse.requires);
            setDesContent(inforCourse.descripContent);
        }

    }, [inforCourse]);

    async function handleAddmethod(data) {
        if (methodMod === true && data !== '' && data !== null) { // ham xu ly them phuong thuc hoc tap moi

            setMethods((prevMethods) => [...prevMethods, data]);
        }
    }

    async function handleAddRequire(data) {
        if (reqMod === true && data !== '' && data !== null) { // ham xu ly them yeu cau  moi
            setRequires((prev) => [...prev, data]);
        }
    }
    const modifyCourseInfor = async () => {
        const newInfor =
        {
            id: inforCourse.id,
            methods: methods,
            requires: requires,
            course: inforCourse.course,
            descripContent: desContent,
        }

        try {
            const userJSON = sessionStorage.getItem('user');
            const user_ = userJSON ? JSON.parse(userJSON) : null;
            const response = await axios.post(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/modifyInforCourse`, newInfor,
                {
                    headers: {
                        'Authorization': `Bearer ${user_._jwt}`, // Thêm JWT token vào header
                        'Content-Type': 'application/json', // Đảm bảo header đúng loại dữ liệu bạn đang gửi
                    },
                }
            );
            const { code, message, result } = response.data;

            if (code === 1000) {
            } else {
                alert("that bai!")
            }
        } catch (error) {

            console.error('Error:', error);
        }
    };
    const [showPay, setShowPay] = useState(false);

    return (

        <div className="content-course-body">
            <div className="course-body-left">
                <div className="descrip-cource">
                    <div className="descrip-title">
                        <h4 style={{ color: 'rgba(0,0,0,0.7)', marginTop: "20px" }}>Mô tả khóa học</h4>
                        <p style={{ fontSize: '14px', marginTop: '40px', color: 'gray' }}>
                            {`Trong khóa ${_course.title} , Thầy ${_course.teacher} sẽ giúp học sinh có lộ trình ôn thi môn học bằng phương pháp của riêng thầy, bao gồm:`}</p>
                        <ul style={{ paddingLeft: '50px', fontSize: '14px', color: 'gray' }}>
                            {methods !== null &&
                                methods.map((method, index) => (
                                    <li key={index}>{method}</li>
                                ))
                            }
                            <input style={{ display: !methodMod ? 'none' : '', background: 'rgba(255, 255, 255, 0.8)' }} type="text" placeholder={'phương thức mới'}
                                value={newMethod} onChange={(e) => setNewMethod(e.target.value)} />
                            <button style={{
                                display: role !== 'ROLE_TEACHER' ? 'none' : '', background: 'grey', border: 'traparent', padding: '1px 3px 1px 3px', borderRadius: '50%'
                                , cursor: 'pointer', color: 'white'
                            }} onClick={async (e) => {
                                await handleAddmethod(newMethod);
                                setMethodMod(!methodMod);
                            }}>+</button>
                        </ul>
                        <p style={{ fontSize: '14px', marginTop: '0', color: 'gray' }}>
                            Với lộ trình ôn thi bài bản cùng phong cách giảng dạy độc đáo, sáng tạo, quá trình luyện thi của học sinh sẽ đạt được hiệu quả cao và đạt được điểm số tốt nhất trong kỳ thi tốt nghiệp THPT 2023.</p>

                        <p style={{ color: 'blue', fontSize: '14px', marginTop: '20px' }}>Đặc biệt, cuối mỗi chuyên đề đều có đề kiểm tra năng lực được chia thành 4 level để học sinh thử
                            thách và đánh giá mức độ nắm vững kiến thức ở từng chuyên đề của mình. Đề thi 4 level được xây dựng theo 4 cấp độ câu hỏi Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.
                            Để vượt qua level ở mỗi cấp độ, các em cần đạt điểm số như sau:</p>
                        <ul style={{ marginTop: '30px', paddingLeft: '50px' }}>
                            <li style={{
                                display: 'flex', justifyContent: 'left', alignItems: 'center', fontSize: '12px'
                                , height: '20px', fontStyle: 'italic'
                            }}>{" "}<p style={{ color: 'red', fontSize: '12px' }}>{"Cấp độ Khởi động, Vượt rào, Tăng tốc: "}</p> Học sinh cần đạt trên 8 điểm</li>
                            <li style={{
                                display: 'flex', justifyContent: 'left', alignItems: 'center', fontSize: '12px'
                                , height: '20px', fontStyle: 'italic'
                            }}>{" "}<p style={{ color: 'red' }}>{"Cấp độ Về đích: "}</p> Học sinh cần đạt điểm tuyệt đối là 10 điểm</li>
                        </ul>
                        <p style={{ fontSize: '14px', color: 'gray', fontStyle: 'italic', marginTop: '20px' }}>Vượt qua level thấp mới được thi tiếp level cao hơn. Học sinh vượt qua cả 4 level đồng nghĩa với việc đã nắm vững kiến thức trong chuyên đề đó và có thể học thẳng sang chuyên đề tiếp theo.</p>
                    </div>
                    <div className="require-title">
                        <h4 style={{ color: 'rgba(0,0,0,0.7)', marginTop: "20px" }}>Yêu cầu khóa học</h4>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', fontWeight: 'bold', marginTop: '20px' }}>Yêu cầu đầu vào của khóa học</p>
                        <ul style={{ color: "gray", fontSize: '14px', paddingLeft: '50px' }}>
                            {requires !== null &&
                                requires.map((rq, index) => (
                                    <li key={index}>{rq}</li>
                                ))
                            }
                            <input style={{ display: !reqMod ? 'none' : '', background: 'rgba(255, 255, 255, 0.8)' }} type="text" placeholder={'phương thức mới'}
                                value={newReq} onChange={(e) => setNewReq(e.target.value)} />
                            <button style={{
                                display: role !== 'ROLE_TEACHER' ? 'none' : '', background: 'grey', border: 'traparent', padding: '1px 3px 1px 3px', borderRadius: '50%'
                                , cursor: 'pointer', color: 'white'
                            }} onClick={async (e) => {
                                await handleAddRequire(newReq);
                                setReqMod(!reqMod);
                            }}>+</button>
                        </ul>

                        <p style={{ fontStyle: 'italic', fontSize: '14px', fontWeight: 'bold', marginTop: '20px' }}>Kết quả học tập</p>
                        <p style={{ color: 'gray', fontSize: '14px' }}>Sau khi hoàn thành khóa học, học sinh sẽ nhận được:</p>
                        <ul style={{ color: "gray", fontSize: '14px', paddingLeft: '50px' }}>

                            <li>Được cung cấp một lượng từ vựng nhất định thuộc các chủ đề quen thuộc của kì thi đại học.</li>
                            <li>
                                Nắm được các hiện tượng ngữ pháp phổ biến trong môn Tiếng Anh và cách xử lí khi gặp các câu hỏi về ngữ pháp quá trình luyện đề.
                            </li>
                            <li>Làm được một số câu chỉ dựa vào việc phân tích thành phần câu dù câu đó có nhiều từ mới.</li>

                        </ul>
                    </div>
                    <div className="object-title">
                        <h4 style={{ color: 'rgba(0,0,0,0.7)', marginTop: "20px" }}>Đối tượng</h4>
                        <p style={{ color: 'gray', fontSize: '14px' }}>Khóa học phù hợp hơn với những học sinh học chưa tốt Tiếng Anh, học mãi không hiểu, muốn thử những phương pháp học mới</p>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '20px' }}> {/* danhh cho hoc vien*/}
                    <button style={{
                        display: role !== 'ROLE_TEACHER' ? '' : 'none', background: 'rgb(77, 121, 214)', padding: '15px 35px 15px 35px',
                        border: 'none', color: 'white', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
                        , cursor: 'pointer'
                    }}
                        onClick={() => { setShowPay(true) }}
                    >Mua khóa học</button>
                    {sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== undefined && (<Paypage show={showPay} setShow={setShowPay} course={_course} />)}

                </div>
                <div style={{ display: 'flex', marginTop: '20px' }}> {/* danhh cho giao  vien*/}
                    <button style={{
                        display: role !== 'ROLE_TEACHER' ? 'none' : '', background: 'rgb(77, 121, 214)', padding: '3px 5px 3px 5px',
                        border: 'none', color: 'white', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
                        , cursor: 'pointer'
                    }}
                        onClick={() => { modifyCourseInfor() }}
                    >Cập nhật</button>

                </div>
                <ListVideo isTeacher={role === 'ROLE_TEACHER'} setIsLoading={setIsLoading} _course={_course} setShowPay={setShowPay} />
            </div>
            <div className="course-body-right">
                <RelaxtiveVideo title_course={_course.title} />
            </div>

        </div>

    )


}




function ListVideo({ isTeacher, setIsLoading, _course, setShowPay }) {
    // isTeacher kiem tra co quyern teacher khong
    // setShowPay cho phep bat tat trang thanh toan
    // _course cho phep xu dung thong tin khoa hoc
    return (
        <div className="list-video-body">
            <div className="head-list">
                <h4 style={{
                    color: 'white', padding: '5px 10px 5px 10px', background: 'rgb(5, 40, 116)', fontWeight: '800',
                    width: '200px', borderRadius: '5px 5px 0 2px', border: 'traparent', height: '100%'
                }}>Đề cương khóa học</h4>
            </div>
            <Videoslist isTeacher={isTeacher} setIsLoading={setIsLoading} _course={_course} setShowPay={setShowPay} />
        </div>
    )
}
function RelaxtiveVideo({ title_course }) {
    const navigate = useNavigate();
    const [relateCourse, setRelateCourse] = useState([])
    const get_relate_course = async () => {
        try {
            const response = await axios.get(`${SERVER_GATEWAY_URL}/api/elasticSearch/course/search/${title_course}`);
            setRelateCourse(response.data);
        }
        catch (e) {
            console.log(e);
        }
    }
    const toNewCourse = (course) => {

        navigate('/course', { state: { course } });
        window.location.reload();
    }
    useEffect(() => {
        get_relate_course();
    }, [])
    const [isMore, setIsMore] = useState(false);

    return (
        <div className="relative-container" style={{
            height: `${isMore ? '200vh' : '100vh'}`,
            overflowY: `${isMore ? 'auto' : ''}`
        }}>
            <h4 style={{ color: 'rgba(0,0,0,0.8)', marginBottom: '20px' }}>Khóa học liên quan</h4>
            <ul>
                {relateCourse && relateCourse.map((course, index) => (
                    <li onClick={() => toNewCourse(course)}><div className="div-container-relate">
                        <div className="img-div"></div>
                        <a>{course.title}</a>
                    </div></li>
                ))}


            </ul>
            <button onClick={() => { setIsMore(true) }} style={{ display: `${isMore ? 'none' : ''}` }}>XEM THÊM</button>
        </div>
    );
}
export default Course