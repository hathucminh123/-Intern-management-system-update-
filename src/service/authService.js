import httpClient from "../httpClient/httpClient";

const baseURL = 
   "https://intern-management.onrender.com/api";

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
  },
  Jobs: {
    get: `${baseURL}/TrainingProgram`,
    post: `${baseURL}/TrainingProgram`,
  },
  Campaigns:{
    get: `${baseURL}/Campaign`,
    post: `${baseURL}/Campaign`,
  },
   Candidates:{
      get:`${baseURL}/Candidate`,
      post:`${baseURL}/Candidate`,
   }
};



    
export const login = async (user) => {
    try {
      const response = await httpClient.post({
        url: `${apiLinks.auth.login}`,
        data: user,
      });
      return response.data;
    } catch (error) {
      console.error("Login request failed", error);
      throw error;
    }
  };
  
