import httpClient from "../httpClient/httpClient";
import axios from "axios";


export const gettest = async () => {
    const response = await httpClient.get({
      url: `https://dummyjson.com/test`,
      
      
    });
    
    return response.data;
  };
  
  export const loginUser = async (data) => {
    const res = await axios.post(`https://intern-management.onrender.com/api/Auth/login`, data)
    return res.data
}

