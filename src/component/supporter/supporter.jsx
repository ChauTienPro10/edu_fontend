
import React,{ useState } from "react";
import "./supporter.css";
import Header from "../header/Header";
import { GoTriangleRight } from "react-icons/go";
import { faBullseye } from "@fortawesome/free-solid-svg-icons/faBullseye";


function Supporter(){

    class title_content {
        constructor(id,name, list) {
            this.id=id;
            this.name = name;
            this.list = list;
            this.state=false;
        }
        
    }

    const contentList=[new title_content(1,"Quy định và chính sách",["Quy định khi tham gia hoc tập","Chính sách miễn giảm học phí"]
       
    ),
    new title_content(2,"Hướng dẫn đăng ký học",["Hướng dẫn chung về tài khoản","Hướng dẫn đăng ký khóa học và thanh toán"]
        
    )
];
    
   
    const [a, setA]=useState(false);


    return(
      
    <div className="support-page">
        <Header />
        <div className="wrapper">

        </div>
        <div className="container-content">
            <div className="left">
                <h3 style={{color:"black",marginTop:"50px",marginBottom:"10px"}}>Nội dung cần hổ trợ</h3>
                <ul className="ul-parent">
                    {contentList.map((i,index) => (
                        <li className="li-big" key={index}>
                        <h5 onClick={() => {
                            i.state = !i.state;
                            setA(!a);
                            console.log(i.state)
                        }}>
                            {i.name}
                            <GoTriangleRight style={{
                            position: "absolute",
                            right: "5px",
                            top: "50%",
                            transform: 'translateY(-50%)',
                            }} />
                        </h5>
                        <ul
                            className={`ul-child ${!a ? 'hide' : ''}`}
                        >
                            {i.list.map((j) => (
                            <li key={j}>{j}</li>
                            ))}
                        </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right"></div>
        </div>
    </div>
  
  );
}




export default Supporter