import axios from 'axios';


const request = (arg) => {
    //   const { token, documentToken ,cookieValue } = store.getState().auth;
    const token = localStorage.getItem("token");
    //   const cookie = getCookie(CookiesName.NAME);

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
        throw new Error(e);
    });
};

const httpClient = {
    request,
    get: (arg) => {
        return request({ ...arg, method: 'GET' });
    },
    post: (arg) => {
        return request({ ...arg, method: 'POST' });
    },
    put: (arg) => {
        return request({ ...arg, method: 'PUT' });
    },
    delete: (arg) => {
        return request({ ...arg, method: 'DELETE' });
    },
    option: (arg) => {
        return request({ ...arg, method: 'OPTIONS' });
    },
    patch: (arg) => {
        return request({ ...arg, method: 'PATCH' });
    },
};

export default httpClient;