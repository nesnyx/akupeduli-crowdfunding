import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Grid3x3, List, TrendingUp, Clock, Zap, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CampaignBrowse() {
    const [viewMode, setViewMode] = useState('grid');
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('trending');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = viewMode === 'grid' ? 12 : 8;

    // Mock data - campaigns
    const allCampaigns = [
        {
            id: 1,
            name: 'Sekolah untuk Anak Desa',
            category: 'Pendidikan',
            description: 'Membangun sarana pendidikan berkualitas untuk anak-anak di daerah terpencil',
            image: 'bg-gradient-to-br from-blue-400 to-blue-600',
            target: 5000000,
            raised: 3600000,
            progress: 72,
            daysLeft: 12,
            donors: 156,
            status: 'active',
            trending: true,
            icon: '🎓'
        },
        {
            id: 2,
            name: 'Kesehatan Ibu Hamil',
            category: 'Kesehatan',
            description: 'Program pemeriksaan kesehatan gratis untuk ibu hamil di daerah pinggiran',
            image: 'bg-gradient-to-br from-pink-400 to-red-600',
            target: 3000000,
            raised: 1900000,
            progress: 63,
            daysLeft: 8,
            donors: 89,
            status: 'active',
            trending: false,
            icon: '🏥'
        },
        {
            id: 3,
            name: 'Makanan Bergizi Anak',
            category: 'Nutrisi',
            description: 'Program pemberian makanan bergizi untuk anak-anak kurang mampu',
            image: 'bg-gradient-to-br from-green-400 to-lime-500',
            target: 2500000,
            raised: 2300000,
            progress: 92,
            daysLeft: 5,
            donors: 234,
            status: 'almost-done',
            trending: true,
            icon: '🍎'
        },
        {
            id: 4,
            name: 'Bantuan Keluarga Korban Banjir',
            category: 'Bencana Alam',
            description: 'Penyediaan kebutuhan dasar dan pemulihan rumah untuk korban banjir',
            image: 'bg-gradient-to-br from-cyan-400 to-blue-500',
            target: 8000000,
            raised: 6560000,
            progress: 82,
            daysLeft: 15,
            donors: 178,
            status: 'active',
            trending: true,
            icon: '💧'
        },
        {
            id: 5,
            name: 'Buku untuk Perpustakaan Sekolah',
            category: 'Pendidikan',
            description: 'Koleksi buku bacaan untuk meningkatkan literasi siswa sekolah dasar',
            image: 'bg-gradient-to-br from-orange-400 to-yellow-500',
            target: 2000000,
            raised: 450000,
            progress: 23,
            daysLeft: 30,
            donors: 45,
            status: 'active',
            trending: false,
            icon: '📚'
        },
        {
            id: 6,
            name: 'Alat Kesehatan Posyandu',
            category: 'Kesehatan',
            description: 'Penyediaan alat kesehatan lengkap untuk posyandu di pedesaan',
            image: 'bg-gradient-to-br from-rose-400 to-pink-500',
            target: 4500000,
            raised: 4200000,
            progress: 93,
            daysLeft: 3,
            donors: 312,
            status: 'almost-done',
            trending: true,
            icon: '💊'
        },
        {
            id: 7,
            name: 'Program Air Bersih',
            category: 'Kesejahteraan',
            description: 'Pembangunan sistem penyediaan air bersih untuk desa terisolir',
            image: 'bg-gradient-to-br from-teal-400 to-cyan-600',
            target: 6000000,
            raised: 2400000,
            progress: 40,
            daysLeft: 25,
            donors: 128,
            status: 'active',
            trending: false,
            icon: '💧'
        },
        {
            id: 8,
            name: 'Beasiswa Anak Yatim',
            category: 'Pendidikan',
            description: 'Program beasiswa penuh untuk anak yatim piatu lanjutkan sekolah',
            image: 'bg-gradient-to-br from-indigo-400 to-purple-600',
            target: 7000000,
            raised: 5600000,
            progress: 80,
            daysLeft: 20,
            donors: 267,
            status: 'active',
            trending: true,
            icon: '🎓'
        },
        {
            id: 9,
            name: 'Pelatihan Usaha Mikro',
            category: 'Pemberdayaan Ekonomi',
            description: 'Program pelatihan dan modal usaha untuk ibu rumah tangga',
            image: 'bg-gradient-to-br from-amber-400 to-orange-500',
            target: 3500000,
            raised: 1750000,
            progress: 50,
            daysLeft: 18,
            donors: 95,
            status: 'active',
            trending: false,
            icon: '💼'
        },
        {
            id: 10,
            name: 'Kursi Roda untuk Penyandang Disabilitas',
            category: 'Kesejahteraan',
            description: 'Donasi kursi roda berkualitas untuk penyandang disabilitas',
            image: 'bg-gradient-to-br from-red-400 to-rose-600',
            target: 5000000,
            raised: 4500000,
            progress: 90,
            daysLeft: 2,
            donors: 423,
            status: 'almost-done',
            trending: true,
            icon: '♿'
        },
        {
            id: 11,
            name: 'Laptop untuk Sekolah Digital',
            category: 'Pendidikan',
            description: 'Penyediaan laptop untuk mendukung pembelajaran digital',
            image: 'bg-gradient-to-br from-slate-400 to-gray-600',
            target: 9000000,
            raised: 2250000,
            progress: 25,
            daysLeft: 35,
            donors: 67,
            status: 'active',
            trending: false,
            icon: '💻'
        },
        {
            id: 12,
            name: 'Vitamin untuk Balita Gizi Buruk',
            category: 'Nutrisi',
            description: 'Program suplemen gizi untuk balita dengan gizi buruk',
            image: 'bg-gradient-to-br from-yellow-400 to-orange-400',
            target: 1500000,
            raised: 1350000,
            progress: 90,
            daysLeft: 4,
            donors: 198,
            status: 'almost-done',
            trending: true,
            icon: '🥗'
        }
    ];

    const categories = ['Pendidikan', 'Kesehatan', 'Nutrisi', 'Bencana Alam', 'Kesejahteraan', 'Pemberdayaan Ekonomi'];
    const statuses = [
        { value: 'active', label: 'Sedang Berlangsung' },
        { value: 'almost-done', label: 'Hampir Selesai' },
        { value: 'completed', label: 'Selesai' }
    ];

    // Filter dan sort campaigns
    const filteredAndSortedCampaigns = useMemo(() => {
        let filtered = allCampaigns.filter(campaign => {
            const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                campaign.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(campaign.category);
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(campaign.status);

            return matchesSearch && matchesCategory && matchesStatus;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'trending':
                    return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.donors - a.donors;
                case 'newest':
                    return b.id - a.id;
                case 'almost-funded':
                    return b.progress - a.progress;
                case 'ending-soon':
                    return a.daysLeft - b.daysLeft;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchQuery, selectedCategories, selectedStatus, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedCampaigns.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedCampaigns = filteredAndSortedCampaigns.slice(startIdx, endIdx);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    const toggleStatus = (status) => {
        setSelectedStatus(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
        setSelectedStatus([]);
        setSortBy('trending');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Jelajahi Kampanye</h1>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Grid3x3 size={20} className={viewMode === 'grid' ? 'text-red-600' : 'text-gray-600'} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                            >
                                <List size={20} className={viewMode === 'list' ? 'text-red-600' : 'text-gray-600'} />
                            </button>
                            <a href="/dashboard" className={"text-white bg-red-400 p-1 rounded"}>Dashboard</a>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari kampanye..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filter - Desktop */}
                <div className="hidden lg:block">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Filter</h2>
                            {(selectedCategories.length > 0 || selectedStatus.length > 0) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Urutkan</h3>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            >
                                <option value="trending">Trending</option>
                                <option value="newest">Terbaru</option>
                                <option value="almost-funded">Hampir Terkumpul</option>
                                <option value="ending-soon">Berakhir Segera</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Kategori</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => toggleCategory(category)}
                                            className="w-4 h-4 rounded border-gray-300 text-red-600"
                                        />
                                        <span className="text-gray-700 text-sm">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                            <div className="space-y-2">
                                {statuses.map(status => (
                                    <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedStatus.includes(status.value)}
                                            onChange={() => toggleStatus(status.value)}
                                            className="w-4 h-4 rounded border-gray-300 text-red-600"
                                        />
                                        <span className="text-gray-700 text-sm">{status.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden mb-4 flex items-center justify-between">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 text-gray-900 font-semibold"
                        >
                            <Filter size={20} />
                            Filter
                        </button>
                        <span className="text-gray-600 text-sm font-semibold">
                            {filteredAndSortedCampaigns.length} kampanye
                        </span>
                    </div>

                    {/* Mobile Filter Modal */}
                    {filterOpen && (
                        <div className="lg:hidden mb-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Filter</h2>
                                <button onClick={() => setFilterOpen(false)}>
                                    <X size={24} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Sort */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Urutkan</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                >
                                    <option value="trending">Trending</option>
                                    <option value="newest">Terbaru</option>
                                    <option value="almost-funded">Hampir Terkumpul</option>
                                    <option value="ending-soon">Berakhir Segera</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Kategori</h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                className="w-4 h-4 rounded border-gray-300 text-red-600"
                                            />
                                            <span className="text-gray-700 text-sm">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                                <div className="space-y-2">
                                    {statuses.map(status => (
                                        <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedStatus.includes(status.value)}
                                                onChange={() => toggleStatus(status.value)}
                                                className="w-4 h-4 rounded border-gray-300 text-red-600"
                                            />
                                            <span className="text-gray-700 text-sm">{status.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setFilterOpen(false)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    )}

                    {/* Results Info */}
                    <div className="mb-6 hidden md:block">
                        <p className="text-gray-600">
                            Menampilkan {startIdx + 1}-{Math.min(endIdx, filteredAndSortedCampaigns.length)} dari {filteredAndSortedCampaigns.length} kampanye
                        </p>
                    </div>

                    {/* Campaign Grid/List */}
                    {paginatedCampaigns.length > 0 ? (
                        <>
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                                : 'space-y-4'
                            }>
                                {paginatedCampaigns.map(campaign => (
                                    <div
                                        key={campaign.id}
                                        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer border border-gray-200 ${viewMode === 'list' ? 'flex' : ''
                                            }`}
                                    >
                                        {/* Image */}
                                        <div className={`${campaign.image} ${viewMode === 'list' ? 'w-48 h-48 shrink-0' : 'h-48 w-full'}`}>
                                            <div className="h-full flex items-end p-4">
                                                {campaign.trending && (
                                                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                        <TrendingUp size={14} /> Trending
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className={`p-4 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                            <div>
                                                <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded inline-block mb-2">
                                                    {campaign.category}
                                                </span>
                                                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{campaign.name}</h3>
                                                {viewMode === 'list' && (
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
                                                )}

                                                {/* Progress */}
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                        <span className="font-semibold">{formatCurrency(campaign.raised)}</span>
                                                        <span className="font-semibold">{campaign.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-red-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${campaign.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Stats */}
                                                <div className={`grid gap-2 text-xs mb-4 ${viewMode === 'list' ? 'grid-cols-4' : 'grid-cols-3'}`}>
                                                    <div>
                                                        <p className="text-gray-600">Target</p>
                                                        <p className="font-bold text-gray-900 text-xs">{formatCurrency(campaign.target)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Hari Lagi</p>
                                                        <p className="font-bold text-gray-900 flex items-center gap-1">
                                                            <Clock size={12} /> {campaign.daysLeft}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Penyumbang</p>
                                                        <p className="font-bold text-gray-900">{campaign.donors}</p>
                                                    </div>
                                                    {viewMode === 'list' && (
                                                        <div>
                                                            <p className="text-gray-600">Status</p>
                                                            <p className={`font-bold text-xs ${campaign.status === 'almost-done' ? 'text-orange-600' : 'text-green-600'}`}>
                                                                {campaign.status === 'active' ? 'Aktif' : 'Hampir Selesai'}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                                                Lihat Detail
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronLeft size={20} className="text-gray-600" />
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`px-3 py-2 rounded-lg font-semibold transition ${currentPage === pageNum
                                                        ? 'bg-red-600 text-white'
                                                        : 'border border-gray-300 text-gray-900 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronRight size={20} className="text-gray-600" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                            <Heart size={48} className="text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada kampanye</h3>
                            <p className="text-gray-600">Coba ubah filter atau search query Anda</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}