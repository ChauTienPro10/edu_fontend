import { jwtDecode } from 'jwt-decode';

const MyJwtDecoder = ( token, privateKey ) => {

    if (token) {
      try {
        const decoded = jwtDecode(token);  // Decode JWT
        
        return decoded;
      } catch (error) {
        console.error('Invalid token', error);  // Xử lý lỗi nếu JWT không hợp lệ
      }
    }
}

export default MyJwtDecoder;

