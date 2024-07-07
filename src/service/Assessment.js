import httpClient from "../httpClient/httpClient";
 import { apiLinks } from "./authService";


export const  AddAssessment =async(data) =>{
 try {
    const response = await httpClient.post({
       url: `${apiLinks.Assessment.post}`,
       data:data,


    });

    if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while creating the job');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); // Log the server response
        throw error;
      }

    
      return response.data;
 }
 catch (error) {
    console.error('Error creating job:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
}


export const  DeleteAssessment =async (id) =>{
  try {
     const response = await httpClient.delete({
        url: `${apiLinks.Assessment.delete}`,
        params:{ id},
 
 
     });
 
     if (response.status !== 200 && response.status !== 201) {
         const error = new Error('An error occurred while creating the job');
         error.code = response.status;
         error.info = await response.data;
         console.error('Server response:', response.data); // Log the server response
         throw error;
       }
 
     
       return response.data;
  }
  catch (error) {
     console.error('Error creating job:', error.response ? error.response.data : error.message);
     throw new Error(`Error: ${error.message}`);
   }
 }
 export const  EditAssessment =async (data) =>{
  try {
     const response = await httpClient.put({
        url: `${apiLinks.Assessment.put}`,
        data:data,
 
 
     });
 
     if (response.status !== 200 && response.status !== 201) {
         const error = new Error('An error occurred while creating the job');
         error.code = response.status;
         error.info = await response.data;
         console.error('Server response:', response.data); // Log the server response
         throw error;
       }
 
     
       return response.data;
  }
  catch (error) {
     console.error('Error creating job:', error.response ? error.response.data : error.message);
     throw new Error(`Error: ${error.message}`);
   }
  }

export const GetAssessment =async()=>{
  try{
    const response =await httpClient.get({
        url: `${apiLinks.Assessment.get}`
    })

    if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while creating the job');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); // Log the server response
        throw error;
      }
const Assessment=response.data
    return {
      events:Assessment.result,

    }
        
    
  }catch(error){

  }


}