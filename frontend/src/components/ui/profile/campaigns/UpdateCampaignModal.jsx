import { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Target, Calendar, Info, Gift, Save } from 'lucide-react';
import { useUpdateCampaign } from '../../../../hooks/useCampaigns';


export function UpdateCampaignModal({ isOpen, onClose, campaign }) {
    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        description: '',
        goal_amount: '',
        perks: ''
    });

    useEffect(() => {
        if (campaign && isOpen) {
            setFormData({
                name: campaign.Name || '',
                short_description: campaign.ShortDescription || '',
                description: campaign.Description || '',
                goal_amount: campaign.GoalAmount || '',
                perks: campaign.Perks || ''
            });
        }
    }, [campaign, isOpen]);

    const mutation = useUpdateCampaign(() => {
        onClose();
    });
    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'goal_amount' ? (parseInt(value) || 0) : value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ id: campaign.ID, ...formData });
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Edit Campaign</h3>
                        <p className="text-xs text-gray-500">Sesuaikan informasi penggalangan dana Anda</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} id="update-form" className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Input Nama */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Judul Campaign</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Contoh: Renovasi Musholla Al-Ikhlas"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Input Target Dana */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Target size={16} className="text-red-500" /> Target Dana (IDR)
                            </label>
                            <input
                                type="number"
                                name="goal_amount"
                                value={formData.goal_amount}
                                onChange={handleChange}
                                placeholder="50000000"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Input Perks */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Gift size={16} className="text-red-500" /> Perks
                            </label>
                            <input
                                type="text"
                                name="perks"
                                value={formData.perks}
                                onChange={handleChange}
                                placeholder="Contoh: Doa Bersama, Kaos, dll"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Deskripsi Singkat */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Info size={16} className="text-orange-500" /> Cerita Singkat
                        </label>
                        <textarea
                            rows="2"
                            name="short_description"
                            value={formData.short_description}
                            onChange={handleChange}
                            placeholder="Ringkasan campaign..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none transition-all"
                            required
                        ></textarea>
                    </div>

                    {/* Deskripsi Lengkap */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Info size={16} className="text-orange-500" /> Deskripsi Lengkap
                        </label>
                        <textarea
                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Jelaskan secara detail..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none transition-all"
                            required
                        ></textarea>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50/30">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        Batalkan
                    </button>
                    <button
                        type="submit"
                        form="update-form"
                        disabled={mutation.isPending}
                        className="flex-1 py-3 font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        {mutation.isPending ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <><Save size={18} /> Simpan Perubahan</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}