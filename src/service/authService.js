import httpClient from "../httpClient/httpClient";

const baseURL = "https://intern-management.onrender.com/api"



const apiLinks = {
    auth: {
        login: `${baseURL}/Auth/login`,
    },

}

export const login = async (user) => {
    const response = await httpClient.post({
        url: `${apiLinks.auth.login}`,
        data: user,
    });

    return response.data;
};
