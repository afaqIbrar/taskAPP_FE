import axios from 'axios';
import { getUserToken } from './utils';

const baseInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH
});

baseInstance.defaults.headers.common['Accept'] = 'application/json';
baseInstance.defaults.headers.common['Content-Type'] = 'application/json';
baseInstance.defaults.withCredentials = true;

baseInstance.interceptors.request.use(async function (config) {
    const token = getUserToken();
    if (config.url !== '/' && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default baseInstance;
