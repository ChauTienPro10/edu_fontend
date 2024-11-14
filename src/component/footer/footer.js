import React from "react";
import "./footer.css"
function Footer(){
    return(
        <div className="container-footer">
            <div className="foot-top">
                <div>
                    <h4>VỀ CHÚNG TÔI</h4>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Giáo viên nổi tiếng</li>
                        <li>Hệ thống trung tâm HOCMAI</li>
                        <li>Học sinh tiêu biểu</li>
                        <li>Điều khoản chính sách</li> 
                        <li>Quy chế hoạt động</li>
                        <li>Tuyển dụng</li>
                    </ul>
                </div>
                <div>
                    <h4>DỊCH VỤ</h4>
                    <ul>
                        <li>Thư viện</li>
                        <li>Ôn luyện</li>
                        <li>Diễn đàn HOCMAI</li>
                        <li>SPEAKING-Tiếng anh 1 kèm 1 Online</li>
                        <li>ICANTECH-Đào tạo công nghệ & lập trình</li>
                    </ul>
                </div>
                <div>
                    <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                    <ul>
                        <li>Tring tâm hỗ trợ</li>
                        <li>Email: hotro@hocmai.vn</li>
                        <li>Đường dây nóng: 0812788212</li>
                    </ul>
                </div>
                <div>
                    <h4>DÀNH CHO ĐỐI TÁC</h4>
                    <ul>
                        <li>Email: infor@hocmai.vn</li>
                        <li>Tel:(+84) 0812788212</li>
                        <li>Fax:(+84) 0812788212</li>
                    </ul>
                </div>
                <div>
                    <h4>TẢI ỨNG DỤNG HOCMAI</h4>
                    <ul>
                        <li><button className="chplay"></button></li>
                        <li><button className="appstore chplay"></button></li>
                        <li><button className="registed chplay"></button></li>
                    </ul>
                </div>
            </div>
            <div className="foot-bottom">
                <p>Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
                MST: 0102183602 do Sở kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 13 tháng 03 năm 2007
                Địa chỉ:
                - Văn phòng Hà Nội: Tầng 4, Tòa nhà 25T2, Đường Nguyễn Thị Thập, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội.
                - Văn phòng TP.HCM: 13M đường số 14 khu đô thị Miếu Nổi, Phường 3, Quận Bình Thạnh, TP. Hồ Chí Minh
                Hotline: 19006933 – Email: hotro@hocmai.vn
                Chịu trách nhiệm nội dung: Phạm Giang Linh</p>
                <p>Giấy phép cung cấp dịch vụ mạng xã hội trực tuyến số 597/GP-BTTTT Bộ Thông tin và Truyền thông cấp ngày 30/12/2016.</p>
            </div>
        </div>
    );
}


export default Footer;