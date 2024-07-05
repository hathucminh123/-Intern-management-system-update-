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
    deleteKPI: `${baseURL}/TrainingProgram/KPI`,
    postKPI: `${baseURL}/TrainingProgram/KPI`,
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
  User:{
    get: `${baseURL}/User`,
  },
   Meetings:{
    get: `${baseURL}/Meetings`,
    post: `${baseURL}/Meetings`,
    put: `${baseURL}/Meetings`,
    delete: `${baseURL}/Meetings`,
    getUserId: `${baseURL}/Meetings/id`,
    postUser:`${baseURL}/Meetings/add-user`,
    deleteUser:`${baseURL}/Meetings/remove-user`
  }



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

export const fetchUser = async (params) => {
  try {
    const response = await httpClient.get({
      url: apiLinks.User.get,
      params: params,
    });
    if (response.status !== 200) {
      const error = new Error('An error occurred while fetching the users');
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    const user = response.data;
    return {
      events: user.result,
    };
  } catch (error) {
    console.error("Fetching users failed", error);
    throw error;
  }
};
