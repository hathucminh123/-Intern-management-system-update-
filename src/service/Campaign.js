import httpClient from "../httpClient/httpClient";
 import { apiLinks } from "./authService";

export const   createNewCampaign= async (eventData)=> {
  try {
    const response = await httpClient.post({
        url: `${apiLinks.Campaigns.post}`,
        data: eventData,
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

export const EditNewCampaign= async (eventData)=> {
  try {
    const response = await httpClient.put({
        url: `${apiLinks.Campaigns.put}`,
        data: eventData,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while editing the Campaign');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error editing job:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const deleteNewCampaign = async (id) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Campaigns.delete}`,
      params: { id },
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while deleting the Campaign');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const fetchCampaigns= async() => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Campaigns.get}`,
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

export const addJobsNewCampaign = async (data) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.Campaigns.postJob}`,
      data: data,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while creating the training program');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error creating training program:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};
export const deleteJobsNewCampaign = async (data) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Campaigns.deleteJob}`,
      data: data,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while creating the training program');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error creating training program:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};