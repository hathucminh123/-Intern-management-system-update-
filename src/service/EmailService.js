import httpClient from "../httpClient/httpClient";
import { apiLinks } from "./authService";
export const sendEmail=async(eventData)=> {
  try {
    const response = await httpClient.post({
        url: `${apiLinks.Email.post}`,
        data: eventData,
    });

    if (response.status !== 200 && response.status !== 201) {
      const error = new Error('Gửi mail thất bại');
      error.code = response.status;
      error.info = await response.data;
      console.error('Server response:', response.data); // Log the server response
      throw error;
    }

    return response.data;
  } catch (error) {
    console.error('Gửi mail thất bại:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
}
