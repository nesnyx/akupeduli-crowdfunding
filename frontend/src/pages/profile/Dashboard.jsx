import React, { useEffect, useRef, useState } from 'react';
import { Mail, Menu, X, Save, Briefcase, Bell, User, LogOut, Heart, ShieldCheck, TrendingUp, Eye, EyeOff, ChevronRight, Phone, Camera, Settings } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function DasboardDonatur() {
    const { user, logout } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isSaving, setIsSaving] = useState(false);
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500); // Simulasi loading
    };
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.split(" ");
        return parts.map(p => p[0]).join("").toUpperCase().substring(0, 2);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const donorData = {
        name: user.name,
        email: user.email,
        totalDonated: 2850000,
        activeCampaigns: 5,
        completedCampaigns: 12,
        thisMonth: 650000
    };

    const recentDonations = [
        {
            id: 1,
            campaign: 'Sekolah untuk Anak Desa',
            amount: 500000,
            date: '5 Jan 2025',
            status: 'success',
            icon: '🎓'
        },
        {
            id: 2,
            campaign: 'Kesehatan Ibu Hamil',
            amount: 150000,
            date: '3 Jan 2025',
            status: 'success',
            icon: '🏥'
        },
        {
            id: 3,
            campaign: 'Makanan Bergizi Anak',
            amount: 300000,
            date: '1 Jan 2025',
            status: 'success',
            icon: '🍎'
        },
        {
            id: 4,
            campaign: 'Bantuan Korban Banjir',
            amount: 1000000,
            date: '28 Des 2024',
            status: 'success',
            icon: '💧'
        }
    ];

    const activeCampaigns = [
        {
            id: 1,
            name: 'Sekolah untuk Anak Desa',
            category: 'Pendidikan',
            image: 'bg-gradient-to-br from-blue-400 to-blue-600',
            target: 5000000,
            raised: 3600000,
            progress: 72,
            daysLeft: 12,
            yourDonation: 500000,
            status: 'ongoing'
        },
        {
            id: 2,
            name: 'Kesehatan Ibu Hamil',
            category: 'Kesehatan',
            image: 'bg-gradient-to-br from-pink-400 to-red-600',
            target: 3000000,
            raised: 1900000,
            progress: 63,
            daysLeft: 8,
            yourDonation: 150000,
            status: 'ongoing'
        },
        {
            id: 3,
            name: 'Makanan Bergizi Anak',
            category: 'Nutrisi',
            image: 'bg-gradient-to-br from-green-400 to-lime-500',
            target: 2500000,
            raised: 2300000,
            progress: 92,
            daysLeft: 5,
            yourDonation: 300000,
            status: 'almost-done'
        }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden text-gray-700 hover:bg-gray-100 p-1 rounded-lg"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h1 className="text-2xl font-bold text-red-600">AkuPeduli</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifikasi */}
                        <button className="relative text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-50 transition">
                            <Bell size={24} />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>

                        {/* Avatar Dropdown Wrapper */}
                        <div className="relative" ref={dropdownRef}>
                            <div
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-10 h-10 bg-linear-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-all active:scale-95 select-none"
                            >
                                {getInitials(user?.name)}
                            </div>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>

                                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                                        <User size={18} /> Profil Saya
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                                        <Settings size={18} /> Pengaturan
                                    </button>

                                    <div className="border-t border-gray-50 mt-1 pt-1">
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-100 transition"
                                        >
                                            <LogOut size={18} /> Keluar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'w-64' : 'w-0'
                    } bg-gray-900 text-white transition-all duration-300 overflow-hidden lg:w-64`}>
                    <div className="p-6 space-y-8">
                        <div>
                            <p className="text-gray-400 text-sm mb-2">Profil</p>
                            <h2 className="text-xl font-bold">{donorData.name}</h2>
                            <p className="text-gray-400 text-sm">{donorData.email}</p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'overview'
                                    ? 'bg-red-600'
                                    : 'hover:bg-gray-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <TrendingUp size={20} />
                                    <span>Dashboard</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('donations')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'donations'
                                    ? 'bg-red-600'
                                    : 'hover:bg-gray-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Heart size={20} />
                                    <span>Riwayat Donasi</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('favorites')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'favorites'
                                    ? 'bg-red-600'
                                    : 'hover:bg-gray-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Heart size={20} />
                                    <span>Kampanye Favorit</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'profile'
                                    ? 'bg-red-600'
                                    : 'hover:bg-gray-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <User size={20} />
                                    <span>Profil Saya</span>
                                </div>
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-700">
                            <button onClick={logout} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3 text-red-400">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Balance Card */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-gray-600 text-sm mb-2">Total Donasi</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-900">
                                                {showBalance ? formatCurrency(donorData.totalDonated) : '••••••••'}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1">Sepanjang masa</p>
                                        </div>
                                        <button
                                            onClick={() => setShowBalance(!showBalance)}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-gray-600 text-sm mb-2">Bulan Ini</p>
                                    <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(donorData.thisMonth)}</h3>
                                    <p className="text-green-600 text-sm mt-1">📈 +15% dari bulan lalu</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-gray-600 text-sm mb-2">Kontribusi</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Kampanye Aktif</span>
                                            <span className="font-bold text-gray-900">{donorData.activeCampaigns}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Selesai</span>
                                            <span className="font-bold text-gray-900">{donorData.completedCampaigns}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Active Campaigns */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Kampanye yang Anda Dukung</h2>
                                    <button className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2">
                                        Lihat Semua <ChevronRight size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {activeCampaigns.map((campaign) => (
                                        <div key={campaign.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
                                            <div className={`${campaign.image} h-40`}></div>
                                            <div className="p-4">
                                                <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded inline-block mb-2">
                                                    {campaign.category}
                                                </span>
                                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{campaign.name}</h3>

                                                <div className="mb-3">
                                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                        <span>{formatCurrency(campaign.raised)}</span>
                                                        <span>{campaign.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-red-500 h-2 rounded-full"
                                                            style={{ width: `${campaign.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                    <div>
                                                        <p className="text-gray-600">Hari lagi</p>
                                                        <p className="font-bold text-gray-900">{campaign.daysLeft}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Donasi Anda</p>
                                                        <p className="font-bold text-red-600">{formatCurrency(campaign.yourDonation)}</p>
                                                    </div>
                                                </div>

                                                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                                                    Tambah Donasi
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Donations */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Riwayat Donasi Terbaru</h2>
                                    <button className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2">
                                        Lihat Semua <ChevronRight size={20} />
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                    {recentDonations.map((donation) => (
                                        <div key={donation.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl">
                                                    {donation.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{donation.campaign}</h3>
                                                    <p className="text-sm text-gray-600">{donation.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">{formatCurrency(donation.amount)}</p>
                                                <span className="text-xs text-green-600 font-semibold">✓ Berhasil</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other Tabs */}
                    {activeTab === 'donations' && (
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Donasi Lengkap</h2>
                            <p className="text-gray-600">Fitur ini akan menampilkan semua riwayat donasi Anda</p>
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kampanye Favorit Saya</h2>
                            <p className="text-gray-600">Kampanye yang Anda tandai sebagai favorit akan muncul di sini</p>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Header Profil */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    {/* Avatar dengan Edit Overlay */}
                                    <div className="relative group">
                                        <div className="w-28 h-28 bg-linear-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-red-100 transition-transform group-hover:scale-105">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg shadow-md border border-gray-100 text-gray-600 hover:text-red-600 transition-colors">
                                            <Camera size={18} />
                                        </button>
                                    </div>

                                    <div className="text-center md:text-left space-y-1">
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                                            <ShieldCheck size={20} className="text-blue-500" title="Akun Terverifikasi" />
                                        </div>
                                        <p className="text-gray-500 font-medium">{user?.occupation || 'Relawan AkuPeduli'}</p>
                                        <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full w-fit mx-auto md:mx-0">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            AKTIF
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Detail */}
                            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-3">Informasi Personal</h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                            <User size={16} /> Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                            <Briefcase size={16} /> Pekerjaan
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={user?.occupation}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-3">Kontak & Keamanan</h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                            <Mail size={16} /> Alamat Email
                                        </label>
                                        <input
                                            type="email"
                                            value={user?.email}
                                            disabled
                                            className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                        />
                                        <p className="text-[10px] text-gray-400 italic">*Email tidak dapat diubah untuk keamanan</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                            <Phone size={16} /> Nomor Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+62"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        Batalkan
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 disabled:opacity-70"
                                    >
                                        {isSaving ? 'Menyimpan...' : (
                                            <>
                                                <Save size={18} /> Simpan Perubahan
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}