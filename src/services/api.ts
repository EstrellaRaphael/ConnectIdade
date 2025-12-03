import axios from 'axios';

const ip = '192.168.0.19'; 

const api = axios.create({
    baseURL: `http://${ip}:4502`,
    timeout: 10000,
});

export default api;