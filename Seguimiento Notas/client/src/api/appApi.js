import axios from 'axios';

import { getEnvVariables } from '../helpers';
import { ShowToast } from '../components/alerts';

const { VITE_API_URL } = getEnvVariables();

const appApi = axios.create({
    baseURL: VITE_API_URL,
});

appApi.interceptors.request.use(
    config => {
        config.headers = {
            ...config.headers,
            'x-token': localStorage.getItem('token'),
        };
        return config;
    },

    error => {
        ShowToast('error', error.response.data.title, error.response.data.message);
        return Promise.reject(error);
    },
);

appApi.interceptors.response.use(
    response => {
        response.data.title !== "token" && ShowToast('success', response.data.title, response.data.message);
        return response;
    },

    error => {
        if (error.response) {
            ShowToast('error', error.response.data.title, error.response.data.message);
        } else {
            ShowToast('error', error.code, error.message);
        };
        return Promise.reject(error);
    },
);

export default appApi;