import React, { useState, useMemo } from 'react';
import {
    Search, Grid3x3, List, TrendingUp, Heart,
    ChevronLeft, ChevronRight, Loader2, LayoutDashboard,
    User, LogOut, Bell, Menu
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import { useBrowseCampaigns } from '../../hooks/useCampaigns';

export default function CampaignBrowse() {
    const navigate = useNavigate();

    // 1. Data Fetching & States
    const { data: apiResponse, isLoading } = useBrowseCampaigns();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('trending');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = viewMode === 'grid' ? 9 : 6;

    // 2. Logic Filter
    const filteredCampaigns = useMemo(() => {
        const campaigns = apiResponse?.data || [];
        let filtered = campaigns.filter(cp =>
            cp.Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategories.length === 0 || selectedCategories.includes(cp.Category))
        );

        if (sortBy === 'trending') filtered.sort((a, b) => b.BackerCount - a.BackerCount);
        if (sortBy === 'newest') filtered.sort((a, b) => b.ID - a.ID);

        return filtered;
    }, [apiResponse, searchQuery, selectedCategories, sortBy]);

    const paginatedData = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-red-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* --- HEADER NAVIGASI (YANG TADI TERTINGGAL) --- */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-2 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition text-sm font-bold border border-gray-200"
                        >
                            <LayoutDashboard size={18} />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>

                        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>



                        <div className="flex items-center gap-2 pl-2">
                            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs border-2 border-white shadow-sm">
                                JD
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- SUB-HEADER: SEARCH & VIEW TOGGLE --- */}
            <div className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Cari Peluang Kebaikan</h1>
                            <p className="text-sm text-gray-500 mt-1">Pilih kampanye yang ingin kamu bantu hari ini.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative group flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition" size={18} />
                                <input
                                    type="text"
                                    placeholder="Cari sekolah, masjid..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500 transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
                                className="p-2.5 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition"
                            >
                                {viewMode === 'grid' ? <List size={20} /> : <Grid3x3 size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filter */}
                    <aside className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-red-600" /> Urutkan
                            </h3>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full p-3 bg-gray-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-red-500 transition"
                            >
                                <option value="trending">Paling Populer</option>
                                <option value="newest">Terbaru</option>
                            </select>

                            <div className="mt-8">
                                <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
                                <div className="space-y-3">
                                    {['Pendidikan', 'Sosial', 'Kesehatan'].map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-lg border-gray-200 text-red-600 focus:ring-red-500"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => {
                                                    setSelectedCategories(prev =>
                                                        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                                                    );
                                                }}
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Campaign List */}
                    <div className="lg:col-span-3">
                        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                            {paginatedData.map(cp => {
                                const progress = Math.min(Math.round((cp.CurrentAmount / cp.GoalAmount) * 100), 100);
                                return (
                                    <Link
                                        to={`/campaign/${cp.ID}`}
                                        key={cp.ID}
                                        className={`group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col sm:flex-row h-full sm:h-48' : ''}`}
                                    >
                                        <div className={`relative bg-gray-200 overflow-hidden ${viewMode === 'list' ? 'sm:w-64 h-48 sm:h-full' : 'h-48'}`}>
                                            <img
                                                src={cp.CampaignImages?.[0]?.FileName ? `http://localhost:8080/${cp.CampaignImages[0].FileName}` : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400'}
                                                alt={cp.Name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col justify-between flex-1">
                                            <div>
                                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{cp.Category || 'Campaign'}</span>
                                                <h3 className="font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-red-600 transition">{cp.Name}</h3>
                                            </div>
                                            <div className="mt-4">
                                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                                    <span className="text-gray-900">{progress}%</span>
                                                    <span className="text-gray-400">Target: Rp {cp.GoalAmount.toLocaleString()}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {filteredCampaigns.length > itemsPerPage && (
                            <div className="mt-12 flex justify-center items-center gap-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-30"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <span className="text-sm font-bold text-gray-900">Halaman {currentPage}</span>
                                <button
                                    disabled={currentPage * itemsPerPage >= filteredCampaigns.length}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-30"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}