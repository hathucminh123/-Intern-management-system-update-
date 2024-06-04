import axios from 'axios';

const request = (arg) => {
  const token = localStorage.getItem("token");
  const {
    method,
    contentType = 'application/json',
    url,
    data,
    params,
    signal,
    responseType = 'json',
    authorization = `bearer ${token ?? ''}`,
  } = arg;

  const source = axios.CancelToken.source();
  if (signal) {
    signal.addEventListener('abort', () => {
      source.cancel();
    });
  }

  return axios.request({
    method,
    headers: {
      'content-type': contentType,
      Authorization: authorization
    },
    url: url,
    data,
    params,
    responseType,
    cancelToken: source.token,
  }).catch((e) => {
    if (e.response) {
      console.error("Axios request failed with response:", e.response);
    } else if (e.request) {
      console.error("Axios request failed with request:", e.request);
    } else {
      console.error("Axios request failed with error message:", e.message);
    }
    console.error("Axios request failed config:", e.config); // Log chi tiết config
    throw new Error(e);
  });
};

const httpClient = {
  request,
  get: (arg) => request({ ...arg, method: 'GET' }),
  post: (arg) => request({ ...arg, method: 'POST' }),
  put: (arg) => request({ ...arg, method: 'PUT' }),
  delete: (arg) => request({ ...arg, method: 'DELETE' }),
  option: (arg) => request({ ...arg, method: 'OPTIONS' }),
  patch: (arg) => request({ ...arg, method: 'PATCH' }),
};

export default httpClient;
