import httpClient from "../httpClient/httpClient";

const baseURL = "https://intern-management-35fd3e77666d.herokuapp.com/api";

export const apiLinks = {
  auth: {
    login: `${baseURL}/Auth/login`,
  },
  Jobs: {
    get: `${baseURL}/Job`,
    post: `${baseURL}/Job`,
    delete: `${baseURL}/Job`,
    put: `${baseURL}/Job`,
    postTrainingProgram: `${baseURL}/Job/TrainingProgram`,
    deleteTrainingProgram: `${baseURL}/Job/TrainingProgram`,
  },
  Campaigns: {
    get: `${baseURL}/Campaign`,
    post: `${baseURL}/Campaign`,
    delete: `${baseURL}/Campaign`,
    put: `${baseURL}/Campaign`,
    postJob: `${baseURL}/Campaign/Job`,
    deleteJob: `${baseURL}/Campaign/Job`,
  },
  Candidates: {
    get: `${baseURL}/Candidate`,
    post: `${baseURL}/Candidate`,
  },
  Email: {
    post: `${baseURL}/Mail`,
  },
  TrainingProgram: {
    get: `${baseURL}/TrainingProgram`,
    post: `${baseURL}/TrainingProgram`,
    put: `${baseURL}/TrainingProgram`,
    delete: `${baseURL}/TrainingProgram`,
    deleteResource: `${baseURL}/TrainingProgram/Resource`,
    postResource: `${baseURL}/TrainingProgram/Resource`,
  },
  Resource: {
    get: `${baseURL}/Resource`,
    post: `${baseURL}/Resource`,
    put: `${baseURL}/Resource`,
    delete: `${baseURL}/Resource`,
  },
  Assessment: {
    get: `${baseURL}/Assessment`,
    post: `${baseURL}/Assessment`,
    put: `${baseURL}/Assessment`,
    delete: `${baseURL}/Assessment`,
  },
  KPI: {
    get: `${baseURL}/KPI`,
    post: `${baseURL}/KPI`,
    put: `${baseURL}/KPI`,
    delete: `${baseURL}/KPI`,
  },



};
export const login = async (user) => {
  try {
    const response = await httpClient.post({
      url: apiLinks.auth.login,
      data: user,
    });
    return response.data;
  } catch (error) {
    console.error("Login request failed", error);
    throw error;
  }
};