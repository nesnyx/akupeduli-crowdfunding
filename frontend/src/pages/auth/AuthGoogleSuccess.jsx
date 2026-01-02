import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGoogleSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Ambil token dari URL fragment (#token=...)
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', '?'));
        const token = params.get('token');

        if (token) {
            // 2. Simpan token ke storage
            localStorage.setItem('token', token);

            // 3. Langsung arahkan ke dashboard
            navigate('/dashboard');
        } else {
            // Jika token tidak ada, balik ke login
            navigate('/auth');
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans">
            {/* Loading Spinner Standar */}
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>

            <h1 className="text-lg font-medium text-gray-700">
                Menyambungkan akun...
            </h1>
            <p className="text-sm text-gray-400 mt-2">
                Mohon tunggu sebentar.
            </p>
        </div>
    );
};

export default AuthGoogleSuccess;