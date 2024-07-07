import httpClient from "../httpClient/httpClient";
import { apiLinks } from "./authService";

export const createNewSchedule = async (jobData) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.Meetings.post}`,
      data: jobData,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while creating the schedule');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error creating Schedule:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const editNewSchedule = async (jobData) => {
  try {
    const response = await httpClient.put({
      url: `${apiLinks.Meetings.put}`,
      data: jobData,
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while editing the schedule');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error editing schedule:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const deleteNewSchedule = async (id) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Meetings.delete}?meetingId=${id}`,
      params: { id },
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while deleting the schedule');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting schedule:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const fetchSchedule = async () => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Meetings.get}`,
  
    });

    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the schedule');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    const job = response.data;
    return {
      events: job.result,
    };
  } catch (error) {
    console.error("Fetching schedule failed", error);
    throw error;
  }
};

export const createUserNewSchedule = async (meetingId,userId) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.Meetings.postUser}?meetingId=${meetingId}&userId=${userId}`,
  
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while add User to the schedule');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error Add User to  Schedule:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};


export const deleteUserNewSchedule = async (meetingId,userId) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Meetings.deleteUser}?meetingId=${meetingId}&userId=${userId}`,
  
    });

    if (![200, 201].includes(response.status)) {
      const error = new Error('An error occurred while add User to the schedule');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error Add User to  Schedule:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};
