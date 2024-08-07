
import httpClient from "../httpClient/httpClient";
import guesthttpClient from "../httpClient/guesthttpClient";
import { apiLinks } from "./authService";
export const createNewCandidate=async(eventData)=> {
  try {
    const response = await guesthttpClient.post({
        url: `${apiLinks.Candidates.post}`,
        data: eventData,
    });

    if (response.status !== 200 && response.status !== 201) {
      const error = new Error('An error occurred while apply candidates');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data); 
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error creating job:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

export const fetchCandidate= async( campaignId,jobId) => {
  try {
    const response = await guesthttpClient.get({
      url: `${apiLinks.Candidates.get}?campaignId=${campaignId}&jobId=${jobId}`, 

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


export const fetchCandidateApplication= async() => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Candidates.getApply}`, 

    });

    // Check if the response status is not OK (200)
    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the application');
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
  