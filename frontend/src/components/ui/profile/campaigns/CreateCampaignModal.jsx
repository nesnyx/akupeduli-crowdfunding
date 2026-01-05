import { useState } from 'react';
import { X, Image as ImageIcon, Target, Calendar, Info, Gift } from 'lucide-react';
import { useCreateCampaign } from '../../../../hooks/useCampaigns';



export function CreateCampaignModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        description: '',
        goal_amount: '',
        perks: ''
    });


    // Inisialisasi Mutation
    const mutation = useCreateCampaign(() => {
        onClose(); // Tutup modal jika sukses
        setFormData({ name: '', short_description: '', description: '', goal_amount: '', perks: '' }); // Reset form
    });
    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'goal_amount' ? parseInt(value) : value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Eksekusi pengiriman data
        mutation.mutate(formData);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900">Buat Campaign Baru</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <form className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Judul Campaign</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Contoh: Renovasi Musholla Al-Ikhlas"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Target size={16} className="text-red-500" /> Target Dana (IDR)
                            </label>
                            <input type="number" name="goal_amount" value={formData.goal_amount} onChange={handleChange} placeholder="50.000.000"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Gift size={16} className="text-red-500" /> Perks
                        </label>
                        <input type="text" name="perks" value={formData.perks} onChange={handleChange} placeholder="Contoh: Yatim Piatu, Bencana Alam, dll"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Info size={16} className="text-orange-500" />  Deskripsi
                        </label>
                        <textarea rows="4" name="description" value={formData.description} onChange={handleChange} placeholder="Jelaskan mengapa kampanye ini penting..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Info size={16} className="text-orange-500" /> Cerita Singkat / Deskripsi
                        </label>
                        <textarea rows="4" name="short_description" value={formData.short_description} onChange={handleChange} placeholder="singkat saja mengapa campaign ini penting..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"></textarea>
                    </div>


                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex gap-3">
                    <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                        Batalkan
                    </button>
                    <button type="submit" onClick={handleSubmit} className="flex-1 py-3 font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95">
                        Publikasi Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}