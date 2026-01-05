import { X, Users } from "lucide-react";

export function CampaignDetailPanel({ isOpen, onClose, campaign }) {
    if (!isOpen || !campaign) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-red-600 text-white">
                        <h3 className="font-bold text-lg">Detail Kampanye</h3>
                        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><X /></button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Info Utama */}
                        <div className="space-y-4">
                            <div className="h-40 bg-gray-200 rounded-2xl overflow-hidden">
                                <div className="w-full h-full bg-linear-to-br from-red-100 to-red-300 flex items-center justify-center text-red-500 italic text-sm">Preview Gambar</div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{campaign.Name}</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Terkumpul</p>
                                    <p className="text-sm font-bold text-red-600">Rp {campaign.CurrentAmount.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Donatur</p>
                                    <p className="text-sm font-bold text-gray-900">{campaign.BackerCount} Orang</p>
                                </div>
                            </div>
                        </div>

                        {/* Daftar Donatur Terbaru */}
                        <div className="space-y-4">
                            <h5 className="font-bold text-gray-900 flex items-center gap-2">
                                <Users size={18} className="text-red-500" /> Riwayat Donasi
                            </h5>
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">D</div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">Donatur #{i}</p>
                                                <p className="text-[10px] text-gray-400">2 jam yang lalu</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-green-600">+Rp 500.000</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}