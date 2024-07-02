import httpClient from "../httpClient/httpClient";
 import { apiLinks } from "./authService";

export const   createNewTraining= async (eventData)=> {
  try {
    const response = await httpClient.post({
        url: `${apiLinks.TrainingProgram.post}`,
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

export const   DeleteResourceNewTraining= async (eventData)=> {
  try {
    const response = await httpClient.delete({
        url: `${apiLinks.TrainingProgram.deleteResource}`,
        data: eventData,
    });

    if (response.status !== 200 && response.status !== 201) {
      const error = new Error('An error occurred while deleteting Resource');
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


export const fetchTraining= async() => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.TrainingProgram.get}`,
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