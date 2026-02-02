import { api } from "./api";

export const authentication = {
    loginManual: async (email, password) => {
        const response = await api.post('/users/login', { email, password });
        return response.data;
    },
    loginWithGoogle: () => {
        window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
    },
    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/auth';
    },
    registerManual: async (email, password, occupation, name,) => {
        const response = await api.post('/users/register', { email, password, occupation, name });
        return response.data;
    }
}

export const getMe = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}