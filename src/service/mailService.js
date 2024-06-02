// service/userService.js
import axios from 'axios';


export const postmail = async () => {
    const response = await axios.post('https://intern-management.onrender.com/api/Mail');
    console.log(response.data);
    return response.data.result; // Lấy dữ liệu từ phản hồi API
};
