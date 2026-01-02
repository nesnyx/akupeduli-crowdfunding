import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthGoogleSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Ambil token dari hash
        const hash = location.hash;
        const params = new URLSearchParams(hash.replace('#', '?'));
        const token = params.get('token');

        if (token) {
            // 1. Simpan token
            localStorage.setItem('token', token);

            // 2. Beri sedikit jeda agar storage tersinkronisasi (opsional tapi membantu)
            const timeout = setTimeout(() => {
                // 3. Gunakan replace agar tidak balik lagi ke sini saat klik back
                navigate('/campaign/browse', { replace: true });

                // Jika kamu pakai reload untuk refresh state auth global:
                // window.location.href = '/campaign/browse'; 
            }, 100);

            return () => clearTimeout(timeout);
        } else {
            navigate('/auth', { replace: true });
        }
    }, [navigate, location]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <h1 className="text-xl font-bold text-gray-800">Autentikasi Berhasil!</h1>
            <p className="text-gray-500 mt-2">Mengalihkan Anda ke dashboard...</p>
        </div>
    );
};

export default AuthGoogleSuccess;