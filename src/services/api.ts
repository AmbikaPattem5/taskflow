import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('taskflow_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

api.interceptors.response.use((response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem('taskflow_token');
            if (window.location.pathname.includes('/login')) {
                window.location.href = window.location.origin + '/#/login';
            } else {
                window.location.hash = '#/login';
            }
        }
        return Promise.reject(error);
    }


)

export default api;