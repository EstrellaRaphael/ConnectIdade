import axios from 'axios';

const ip = '10.136.64.116'; 

const api = axios.create({
    baseURL: `http://${ip}:4502`,
    timeout: 10000,
});

export default api;