import httpClient from "../httpClient/httpClient";
import { apiLinks } from "./authService";

export const createNewKPI = async (eventData) => {
  try {
    const response = await httpClient.post({
      url: `${apiLinks.KPI.post}`,
      data: eventData,
    });

    if (response.status !== 200 && response.status !== 201) {
      const error = new Error('An error occurred while creating the KPI');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error creating KPI:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const deleteKPI = async (id) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.KPI.delete}`,
      params: { id },
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while deleting the KPI');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting KPI:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const editKPI = async (data) => {
  try {
    const response = await httpClient.put({
      url: `${apiLinks.KPI.put}`,
      data: data,
    });

    if (![200, 204].includes(response.status)) {
      const error = new Error('An error occurred while editing the KPI');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data);
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Error editing KPI:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const fetchKPI = async () => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.KPI.get}`,
    });

    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the KPIs');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    return {
      events: response.data.result,
    };
  } catch (error) {
    console.error("Fetching KPIs failed", error);
    throw error;
  }
};
