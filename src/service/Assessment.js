import httpClient from "../httpClient/httpClient";
 import { apiLinks } from "./authService";


export const  AddAssessment =async(data) =>{
 try {
    const response = await httpClient.post({
       url: `${apiLinks.Assessment.post}`,
       data:data,


    });

    if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while creating the Task');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); // Log the server response
        throw error;
      }

    
      return response.data;
 }
 catch (error) {
    console.error('Error creating Task:', error.response ? error.response.data : error.message);
    throw new Error(`Error: ${error.message}`);
  }
}


export const  InternAddAssessment =async(data) =>{
  try {
     const response = await httpClient.post({
        url: `${apiLinks.Assessment.InternPost}`,
        data:data,
 
 
     });
 
     if (response.status !== 200 && response.status !== 201) {
         const error = new Error('An error occurred while Post Task');
         error.code = response.status;
         error.info = await response.data;
         console.error('Server response:', response.data); 
         throw error;
       }
 
     
       return response.data;
  }
  catch (error) {
     console.error('Error Post task:', error.response ? error.response.data : error.message);
     throw new Error(`Error: ${error.message}`);
   }
 }
 export const  InternDeleteAssessment =async (id) =>{
  try {
     const response = await httpClient.delete({
        url: `${apiLinks.Assessment.InternDelete}`,
        params:{ id},
 
 
     });
 
     if (response.status !== 200 && response.status !== 201) {
         const error = new Error('An error occurred delete Task');
         error.code = response.status;
         error.info = await response.data;
         console.error('Server response:', response.data);
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
         const error = new Error('An error occurred while Deleting the Task');
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
         const error = new Error('An error occurred while Edit the Task');
         error.code = response.status;
         error.info = await response.data;
         console.error('Server response:', response.data);
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
        const error = new Error('An error occurred while get Task');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data);
        throw error;
      }
const Assessment=response.data
    return {
      events:Assessment.result,

    }
        
    
  }catch(error){

  }


}


export const GetAssessmentbyTraining =async(id)=>{
  try{
    const response =await httpClient.get({
        url: `${apiLinks.Assessment.getByTraining}?programId=${id}`,
        params:{id},
    })

    if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while get the Task by training program');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data);
        throw error;
      }
const Assessment=response.data
    return {
      events:Assessment.result,

    }
        
    
  }catch(error){

  }


}

export const GetAssessmentSubmissions =async (id)=>{
  try{
    const response =await httpClient.get({
        url: `${apiLinks.Assessment.getIntern}`,
        params: {id},
    })

    if (response.status !== 200 && response.status !== 201) {
        const error = new Error('An error occurred while get the Task');
        error.code = response.status;
        error.info = await response.data;
        console.error('Server response:', response.data); 
        throw error;
      }
const Assessment=response.data
    return {
      events:Assessment.result,

    }
        
    
  }catch(error){

  }


}