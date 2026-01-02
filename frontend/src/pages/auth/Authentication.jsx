import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Heart, Users, Zap, BriefcaseBusiness, Loader2, AlertCircle } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { authentication } from '../../integration/auth';
import useAuthStore from '../../store/authStore';

export default function Authentication() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State untuk form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        occupation: '',
        password: '',
        confirmPassword: ''
    });

    // State untuk error handling
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState('');

    const handleGoogleLogin = () => {
        setIsLoading(true);
        authentication.loginWithGoogle();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Bersihkan error per field saat user mengetik
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (globalError) setGlobalError('');
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGlobalError('');

        const newErrors = {};

        // --- VALIDASI CLIENT SIDE ---
        if (!formData.email) {
            newErrors.email = 'Email harus diisi';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password harus diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        if (!isLogin) {
            if (!formData.name) newErrors.name = 'Nama lengkap harus diisi';
            if (!formData.occupation) newErrors.occupation = 'Pekerjaan harus diisi';
            if (!formData.phone) newErrors.phone = 'Nomor telepon harus diisi';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // --- PROSES API ---
        setIsLoading(true);
        try {
            if (isLogin) {
                const response = await authentication.loginManual(formData.email, formData.password);

                // Simpan Token & Redirect
                const token = response.data.token;
                localStorage.setItem('token', token);

                // Gunakan navigate agar lebih smooth daripada window.location
                await useAuthStore.getState().checkAuth();
                navigate('/campaign/browse');
            } else {
                // Implementasi Register Manual kamu di sini
                // const response = await authentication.registerManual(formData);
                console.log('Registering user...', formData);
                alert('Fitur registrasi sedang disiapkan');
            }
        } catch (error) {
            console.error("Auth Error:", error);
            // Menangkap pesan dari helper.APIResponse backend (meta.message)
            const backendMessage = error.response?.data?.meta?.message || "Terjadi kesalahan pada server. Silakan coba lagi.";
            setGlobalError(backendMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', phone: '', occupation: '', password: '', confirmPassword: '' });
        setErrors({});
        setGlobalError('');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">

                    {/* Left Side - Branding (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-col justify-center">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-red-600 mb-4">AkuPeduli</h1>
                            <p className="text-2xl font-semibold text-gray-900 mb-4">
                                {isLogin ? 'Selamat Kembali!' : 'Mulai Berbagi Kebaikan'}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {isLogin
                                    ? 'Masuk ke akun Anda untuk melanjutkan perjalanan amal dan berbagi kasih kepada sesama.'
                                    : 'Bergabunglah dengan komunitas yang telah membuat perbedaan nyata dalam kehidupan banyak orang.'}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Heart, title: "Dampak Nyata", desc: "Donasi Anda langsung membantu mereka yang membutuhkan" },
                                { icon: Users, title: "Komunitas Peduli", desc: "Terhubung dengan jutaan orang berhati mulia" },
                                { icon: Zap, title: "Proses Cepat", desc: "Donasi mudah dan pantau dampak secara real-time" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                        <item.icon className="text-red-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                            </h2>
                            <p className="text-gray-600 italic">
                                {isLogin ? 'Gunakan email dan password untuk masuk' : 'Lengkapi data diri Anda'}
                            </p>
                        </div>

                        {/* Alert Error Global */}
                        {globalError && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-center gap-3 animate-pulse">
                                <AlertCircle size={20} className="shrink-0" />
                                <span>{globalError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Signup Fields */}
                            {!isLogin && (
                                <>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                                            placeholder="Nama Lengkap" className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div className="relative">
                                        <BriefcaseBusiness className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange}
                                            placeholder="Pekerjaan (e.g. Dokter, Designer)" className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${errors.occupation ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                            placeholder="Nomor Telepon" className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </>
                            )}

                            {/* Email & Password (Always Shown) */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                                    placeholder="Alamat Email" className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange}
                                    placeholder="Password" className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {!isLogin && (
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
                                        placeholder="Konfirmasi Password" className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400">
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            )}

                            {/* Action Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition duration-300 mt-6 text-white shadow-lg ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:scale-95'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    isLogin ? 'Masuk ke Akun' : 'Daftar Sekarang'
                                )}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-gray-500 font-medium">Atau</span></div>
                        </div>

                        {/* Google Social Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            type="button"
                            className="w-full border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FcGoogle size={24} />
                            <span>Lanjutkan dengan Google</span>
                        </button>

                        <div className="text-center mt-8 space-y-4">
                            <p className="text-gray-600 font-medium">
                                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                                <button onClick={handleToggleMode} className="text-red-600 hover:underline font-bold">
                                    {isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
                                </button>
                            </p>
                            <a href="/" className="inline-block text-gray-400 hover:text-red-600 transition text-sm">Kembali ke Beranda</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}