import axios from 'axios';
import useAuthStore from '../store/authStore';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Sesi telah berakhir. Mengalihkan ke halaman login...");
            useAuthStore.getState().logout();
            alert("Sesi Anda telah berakhir, silakan login kembali.");
        }
        return Promise.reject(error);
    }
);


