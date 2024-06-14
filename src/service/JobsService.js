
import httpClient from "../httpClient/httpClient";
import { apiLinks } from "./authService";

export  const createNewJobs = async(jobData) =>{
  try {
      const response = await httpClient.post({
          url: `${apiLinks.Jobs.post}`,
          data: jobData,
      });

      if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while creating the job');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); // Log the server response
        throw error;
      }
  
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error.response ? error.response.data : error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }


  // export async function fetchJobs({ searchTerm, max }) {
    
  export const fetchJobs = async () => {
    try {
      const response = await httpClient.get({
        url: `${apiLinks.Jobs.get}`,
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
     
      };
    } catch (error) {
      console.error("Fetching jobs failed", error);
      throw error;
    }
  };
  