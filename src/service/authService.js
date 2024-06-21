
import httpClient from "../httpClient/httpClient";

const baseURL = 
   "https://intern-management-35fd3e77666d.herokuapp.com/api";

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
  },
  Jobs: {
    get: `${baseURL}/Job`,
    post: `${baseURL}/Job`,
  },
  Campaigns:{
    get: `${baseURL}/Campaign`,
    post: `${baseURL}/Campaign`,
  },
   Candidates:{
      get:`${baseURL}/Candidate`,
      post:`${baseURL}/Candidate`,
   },
   Email:{
    post:`${baseURL}/Mail`,
   },
   TrainingProgram:{
    get:`${baseURL}/TrainingProgram`,
      post:`${baseURL}/TrainingProgram`,
   },
   Resource:{
    
    get:`${baseURL}/Resource`,
      post:`${baseURL}/Resource`,
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
  
