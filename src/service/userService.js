import httpClient from "../httpClient/httpClient";



export const gettest = async () => {
    const response = await httpClient.get({
      url: `https://dummyjson.com/test`,
      
      
    });
    
    return response.data;
  };
  