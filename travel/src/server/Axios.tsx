import axios from 'axios';
const Axios = axios.create({
    baseURL: 'http://darxaz-001-site5.itempurl.com/api/v1',
    // baseURL: 'https://localhost:7154/api/v1',
});

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

export default Axios;