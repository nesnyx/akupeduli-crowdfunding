import { Clock, Edit3, Loader2 } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Plus } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Users } from "lucide-react";
import { useMyCampaigns } from "../../../../hooks/useCampaigns";


export default function Campaings({ setIsCreateModalOpen, formatCurrency, setSelectedCampaign, user }) {
    const { data, isLoading, isError, error } = useMyCampaigns(user?.id);
    if (isLoading) return <Loader2 className="animate-spin" />;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Kampanye Saya</h2>
                    <p className="text-gray-500 text-sm">Kelola dan pantau progress penggalangan dana Anda.</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-100 active:scale-95">
                    <Plus size={20} />
                    Buat Kampanye
                </button>
            </div>

            {/* Stats Ringkas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center"><TrendingUp size={24} /></div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Total Dana Terkumpul</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(47500000)}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Users size={24} /></div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Total Donatur</p>
                        <p className="text-lg font-bold text-gray-900">231 Orang</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><Clock size={24} /></div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Kampanye Aktif</p>
                        <p className="text-lg font-bold text-gray-900">1 Kampanye</p>
                    </div>
                </div>
            </div>

            {/* Table / List Kampanye */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Kampanye</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Progress</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data?.data.map((cp) => {
                                const percentage = Math.min((cp.CurrentAmount / cp.GoalAmount) * 100, 100);
                                return (
                                    <tr key={cp.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 line-clamp-1">{cp.Name}</span>
                                                <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                    <Users size={12} /> {cp.BackerCount} Donatur • {cp.Deadline}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 w-64">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between text-xs font-bold">
                                                    <span className="text-red-600">{formatCurrency(cp.CurrentAmount)}</span>
                                                    <span className="text-gray-400">{Math.round(percentage)}%</span>
                                                    <span className="text-gray-400">{formatCurrency(cp.GoalAmount)}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-red-500 h-full rounded-full transition-all duration-1000"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700`}>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => setSelectedCampaign(cp)} title="Lihat Detail" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <ExternalLink size={18} />
                                                </button>
                                                <button title="Edit Kampanye" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Edit3 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}