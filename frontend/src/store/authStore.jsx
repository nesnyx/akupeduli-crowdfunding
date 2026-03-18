import { create } from 'zustand';
import { getMe } from '../integration/auth';


const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ user: null, isAuthenticated: false, loading: false });
            return;
        }
        try {
            const response = await getMe();
            set({ user: response.data, isAuthenticated: true, loading: false });
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem('token');
            set({ user: null, isAuthenticated: false, loading: false });
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
        window.location.href = '/auth';
    }
}))

export default useAuthStore