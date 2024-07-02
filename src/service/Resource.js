import httpClient from "../httpClient/httpClient";
 import { apiLinks } from "./authService";

export const   createNewResource= async (eventData)=> {
  try {
    const response = await httpClient.post({
        url: `${apiLinks.Resource.post}`,
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
export const deleteResource = async (id) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Resource.delete}`,
      params: { id },
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while deleting the Resource');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting Resource:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const editResource = async (data) => {
  try {
    const response = await httpClient.put({
      url: `${apiLinks.Resource.put}`,
      data:data
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while Edit the Resource');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error Edit Resource:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};




export const fetchResource= async() => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Resource.get}`,
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