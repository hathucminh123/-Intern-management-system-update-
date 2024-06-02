// const baseURL = process.env.NODE_ENV !== "production"
//     ? "https://localhost:7251/api"
//     : "https://intern-management.onrender.com/api";

const baseURL = "https://localhost:7251/api"
   


export const apiLinks = {
    auth: {
        login: `${baseURL}/Auth/login`,
    },
    cadidate: `${baseURL}/Candidate`,
}