import httpClient from "../httpClient/httpClient";

const baseURL = process.env.NODE_ENV !== "production"
  ? "https://localhost:7251/api"
  : "https://intern-management.onrender.com/api";

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
  },
  Campaign: {
    get: `${baseURL}/TrainingProgram`,
  },
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
  
  export const fetchJobs = async () => {
    try {
      const response = await httpClient.get({
        url: `${apiLinks.Campaign.get}`,
      });
  
      // Check if the response status is not OK (200)
      if (response.status !== 200) {
        const error = new Error('An error occurred while fetching the jobs');
        error.code = response.status;
        error.info = response.data;
        throw error;
      }
  
      // Assuming the response is already JSON parsed
      const job = response.data;
      return {
        events: job.result, 
        total: job.total,  
      };
    } catch (error) {
      console.error("Fetching jobs failed", error);
      throw error;
    }
  };