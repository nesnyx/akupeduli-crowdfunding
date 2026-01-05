import { LogOut } from "lucide-react"
import { Menu, X, Bell, User, Settings } from "lucide-react"


export default function Navbar({ user, logout, sidebarOpen, setSidebarOpen, dropdownOpen, setDropdownOpen, dropdownRef, getInitials }) {
    return (
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
    )
}