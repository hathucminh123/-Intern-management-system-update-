import httpClient from "../httpClient/httpClient";

const baseURL = process.env.NODE_ENV !== "production"
    ? "https://localhost:7251/api"
    : "https://fa-training-management.somee.com/api";


const apiLinks = {
    auth: {
        login: `${baseURL}/Auth/login`,
    },

}

export const login = async (user) => {
    const response = await httpClient.post({
      url: `${apiLinks.auth.login}`,
      data: user,
    });
    
    return response.data;
  };
  