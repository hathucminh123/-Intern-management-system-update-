import httpClient from "../httpClient/httpClient";

const baseURL = process.env.NODE_ENV !== "production"
    ? "https://localhost:7251/api"
    : "https://intern-management.onrender.com/api";


 export const apiLinks = {
    auth: {
        login: `${baseURL}/Auth/login`,
    },
    Campaign:{
        get:  `${baseURL}/Auth/Campaign`,
    }

}

export const login = async (user) => {
    const response = await httpClient.post({
      url: `${apiLinks.auth.login}`,
      data: user,
    });
    
    return response.data;
  };
  