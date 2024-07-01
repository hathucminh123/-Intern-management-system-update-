import httpClient from "../httpClient/httpClient";
import { apiLinks } from "./authService";

export const createNewJobs = async (jobData) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.Jobs.post}`,
      data: jobData,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while creating the job');
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
};

export const editNewJobs = async (jobData) => {
  try {
    const response = await httpClient.put({
      url: `${apiLinks.Jobs.put}`,
      data: jobData,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while editing the job');
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

export const deleteNewJobs = async (id) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Jobs.delete}`,
      params: { id },
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while deleting the job');
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

export const fetchJobs = async () => {
  try {
    const response = await httpClient.get({
      url: apiLinks.Jobs.get,
    });

    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the jobs');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    const job = response.data;
    return {
      events: job.result,
    };
  } catch (error) {
    console.error("Fetching jobs failed", error);
    throw error;
  }
};

export const createTrainingNewJobs = async (data) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.Jobs.postTrainingProgram}`,
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

export const deleteTrainingNewJobs = async (data) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Jobs.deleteTrainingProgram}`,
      data: data,
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while deleting the training program');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting training program:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};
