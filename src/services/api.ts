import axios from 'axios';

const ip = '10.136.64.17'; 

const api = axios.create({
    baseURL: `http://${ip}:8080`,
    timeout: 10000,
});

export default api;