import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Heart, Users, Zap, BriefcaseBusiness } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
export default function Authentication() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        occupation: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (isLogin) {
            if (!formData.email) newErrors.email = 'Email harus diisi';
            else if (!validateEmail(formData.email)) newErrors.email = 'Email tidak valid';

            if (!formData.password) newErrors.password = 'Password harus diisi';
            else if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
        } else {
            if (!formData.name) newErrors.name = 'Nama harus diisi';
            if (!formData.occupation) newErrors.occupation = 'occupation/Pekerjaan harus diisi';
            if (!formData.email) newErrors.email = 'Email harus diisi';
            else if (!validateEmail(formData.email)) newErrors.email = 'Email tidak valid';

            if (!formData.phone) newErrors.phone = 'Nomor telepon harus diisi';
            else if (!/^(\+62|0)[0-9]{9,12}$/.test(formData.phone)) newErrors.phone = 'Nomor telepon tidak valid';

            if (!formData.password) newErrors.password = 'Password harus diisi';
            else if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter';

            if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password harus diisi';
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Password tidak cocok';
        }

        if (Object.keys(newErrors).length === 0) {
            alert(isLogin ? 'Login berhasil!' : 'Akun berhasil dibuat!');
            console.log('Form submitted:', formData);
        } else {
            setErrors(newErrors);
        }
    };

    const handleToggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            name: '',
            email: '',
            phone: '',
            occupation: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Branding & Info */}
                    <div className="hidden md:flex flex-col justify-center">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-red-600 mb-4">AkuPeduli</h1>
                            <p className="text-2xl font-semibold text-gray-900 mb-4">
                                {isLogin ? 'Selamat Kembali!' : 'Mulai Berbagi Kebaikan'}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {isLogin
                                    ? 'Masuk ke akun Anda untuk melanjutkan perjalanan amal dan berbagi kasih kepada sesama yang membutuhkan.'
                                    : 'Bergabunglah dengan jutaan orang berhati mulia yang telah membuat perbedaan nyata dalam kehidupan banyak orang.'
                                }
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Heart className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Dampak Nyata</h3>
                                    <p className="text-gray-600 text-sm">Setiap donasi Anda langsung membantu mereka yang membutuhkan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Users className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Komunitas Peduli</h3>
                                    <p className="text-gray-600 text-sm">Terhubung dengan jutaan orang yang berbagi nilai kemanusiaan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Zap className="text-red-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Proses Mudah</h3>
                                    <p className="text-gray-600 text-sm">Donasi, pantau kampanye, dan lihat dampak secara real-time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                            </h2>
                            <p className="text-gray-600">
                                {isLogin
                                    ? 'Gunakan email dan password Anda untuk masuk'
                                    : 'Isi data lengkap Anda untuk memulai'
                                }
                            </p>
                        </div>

                        <div onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field - Signup Only */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan nama lengkap Anda"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="nama@email.com"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone Field - Signup Only */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nomor Telepon
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="08xxxxxxxxxx atau +62xxxxxxxxxx"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            )}

                            {/* Occupation Field - Signup Only */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Occupation
                                    </label>
                                    <div className="relative">
                                        <BriefcaseBusiness className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.occupation}
                                            onChange={handleInputChange}
                                            placeholder="Sofware Engineer, Doctor, etc."
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.occupation ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                                </div>
                            )}

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Minimal 6 karakter"
                                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            {/* Confirm Password - Signup Only */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Ulangi password Anda"
                                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                            )}

                            {/* Remember Me / Forgot Password - Login Only */}
                            {/* {isLogin && (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                                    </label>
                                    <button type="button" className="text-sm text-red-600 hover:text-red-700 font-semibold">
                                        Lupa password?
                                    </button>
                                </div>
                            )} */}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition mt-6"
                            >
                                {isLogin ? 'Masuk ke Akun' : 'Daftar Sekarang'}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">atau</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-1 gap-4 mb-8">
                            <button type="button" className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-gray-400 transition flex items-center justify-center gap-2">
                                <FcGoogle size={24} />
                            </button>

                        </div>

                        {/* Toggle Login/Signup */}
                        <div className="text-center">

                            <p className="text-gray-600">
                                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                                <button
                                    type="button"
                                    onClick={handleToggleMode}
                                    className="text-red-600 hover:text-red-700 font-semibold"
                                >
                                    {isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
                                </button>
                            </p>
                            <a className='text-gray-600' href="/">Beranda</a>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Info */}
                <div className="md:hidden mt-8 text-center">
                    <p className="text-gray-600 text-sm mb-4">
                        Dengan melanjutkan, Anda menyetujui Syarat Layanan dan Kebijakan Privasi kami
                    </p>
                </div>
            </div>
        </div>
    );
}