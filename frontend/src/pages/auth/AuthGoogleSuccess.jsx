import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const AuthGoogleSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { checkAuth } = useAuthStore();
    useEffect(() => {
        // Ambil token dari hash
        const hash = location.hash;
        const params = new URLSearchParams(hash.replace('#', '?'));
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            const timeout = setTimeout(() => {
                checkAuth().then(() => {
                    navigate('/campaign/browse', { replace: true });
                });
            }, 100);

            return () => clearTimeout(timeout);
        } else {
            navigate('/auth', { replace: true });
        }
    }, [navigate, location, checkAuth]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <h1 className="text-xl font-bold text-gray-800">Autentikasi Berhasil!</h1>
            <p className="text-gray-500 mt-2">Mengalihkan Anda ke dashboard...</p>
        </div>
    );
};

export default AuthGoogleSuccess;