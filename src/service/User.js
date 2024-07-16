import httpClient from "../httpClient/httpClient";
import { apiLinks } from "./authService";

export const editNewUser = async (userData) => {
    try {
      const response = await httpClient.put({
        url: `${apiLinks.User.put}`,
        data: userData,
      });
  
      if (![200, 201].includes(response.status)) {
        const error = new Error('An error occurred while editing the user');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data);
        throw error;
      }
  
      return response.data;
    } catch (error) {
      console.error('Error editing User:', error.response ? error.response.data : error.message);
      throw new Error(`Error: ${error.message}`);
    }
  };



  export const fetchUserListCampaignJob= async( campaignId,jobId) => {
    try {
      const response = await httpClient.get({
        url: `${apiLinks.User.getUserCampainJob}?campaignId=${campaignId}&jobId=${jobId}`, 
  
      });
  
      // Check if the response status is not OK (200)
      if (response.status !== 200) {
        const error = new Error('An error occurred while fetching the user list in Campaign jobs');
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

  export const AddNewStudentinCampaignJob=async(eventData)=> {
    try {
      const response = await httpClient.post({
          url: `${apiLinks.User.postUserCampainJob}`,
          data: eventData,
      });
  
      if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while add user into the  campaign job');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); // Log the server response
        throw error;
      }
  
      return response.data;
    } catch (error) {
      console.error('Error Add user into the  campaign job:', error.response ? error.response.data : error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }

  export const   PostReportStudent =async(eventData)=> {
    try {
      const response = await httpClient.post({
          url: `${apiLinks.User.postUserResult}`,
          data: eventData,
      });
  
      if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while add report to User');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); // Log the server response
        throw error;
      }
  
      return response.data;
    } catch (error) {
      console.error('Error  add report to User:', error.response ? error.response.data : error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }


  export const fetchUserListReport= async( userId,programId) => {
    try {
      const response = await httpClient.get({
        url: `${apiLinks.User.getUserResult}?userId=${userId}&programId=${programId}`, 
  
      });
  
      // Check if the response status is not OK (200)
      if (response.status !== 200) {
        const error = new Error('An error occurred while fetching the user list Report Details');
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
      console.error("Fetching the user list Report Details", error);
      throw error;
    }
  };
