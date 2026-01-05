import { HandHeart, TrendingUp, LogOut, User } from "lucide-react"

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, donorData, logout }) {
    return (
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
                        onClick={() => setActiveTab('campaigns')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'campaigns'
                            ? 'bg-red-600'
                            : 'hover:bg-gray-800'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <HandHeart size={20} />
                            <span>Campaigns</span>
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
    )
}