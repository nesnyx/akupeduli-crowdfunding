import { Briefcase, Camera, Mail, Phone, Save, ShieldCheck, User } from "lucide-react"




export default function Profile({ user, isSaving, handleUpdateProfile }) {
    return (
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
    )
}