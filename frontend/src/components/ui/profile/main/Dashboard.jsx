import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


export default function Dashboard({ donorData, formatCurrency, activeCampaigns, recentDonations }) {
    const [showBalance, setShowBalance] = useState(true);
    return (
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
    )
}