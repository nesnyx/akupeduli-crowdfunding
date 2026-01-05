import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../store/authStore';
import { CreateCampaignModal } from "../../components/ui/profile/campaigns/CreateCampaignModal"
import { CampaignDetailPanel } from "../../components/ui/profile/campaigns/CampaignDetailPanel"
import Navbar from '../../components/ui/profile/navbar/Navbar';
import Sidebar from '../../components/ui/profile/sidebar/Sidebar';
import Dashboard from '../../components/ui/profile/main/Dashboard';
import Campaings from '../../components/ui/profile/main/Campaigns';
import Profile from '../../components/ui/profile/main/Profile';
export default function DasboardDonatur() {
    const { user, logout } = useAuthStore();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500); // Simulasi loading
    };
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.split(" ");
        return parts.map(p => p[0]).join("").toUpperCase().substring(0, 2);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const donorData = {
        name: user.name,
        email: user.email,
        totalDonated: 2850000,
        activeCampaigns: 5,
        completedCampaigns: 12,
        thisMonth: 650000
    };

    const recentDonations = [
        {
            id: 1,
            campaign: 'Sekolah untuk Anak Desa',
            amount: 500000,
            date: '5 Jan 2025',
            status: 'success',
            icon: '🎓'
        },
        {
            id: 2,
            campaign: 'Kesehatan Ibu Hamil',
            amount: 150000,
            date: '3 Jan 2025',
            status: 'success',
            icon: '🏥'
        },
        {
            id: 3,
            campaign: 'Makanan Bergizi Anak',
            amount: 300000,
            date: '1 Jan 2025',
            status: 'success',
            icon: '🍎'
        },
        {
            id: 4,
            campaign: 'Bantuan Korban Banjir',
            amount: 1000000,
            date: '28 Des 2024',
            status: 'success',
            icon: '💧'
        }
    ];

    const activeCampaigns = [
        {
            id: 1,
            name: 'Sekolah untuk Anak Desa',
            category: 'Pendidikan',
            image: 'bg-gradient-to-br from-blue-400 to-blue-600',
            target: 5000000,
            raised: 3600000,
            progress: 72,
            daysLeft: 12,
            yourDonation: 500000,
            status: 'ongoing'
        },
        {
            id: 2,
            name: 'Kesehatan Ibu Hamil',
            category: 'Kesehatan',
            image: 'bg-gradient-to-br from-pink-400 to-red-600',
            target: 3000000,
            raised: 1900000,
            progress: 63,
            daysLeft: 8,
            yourDonation: 150000,
            status: 'ongoing'
        },
        {
            id: 3,
            name: 'Makanan Bergizi Anak',
            category: 'Nutrisi',
            image: 'bg-gradient-to-br from-green-400 to-lime-500',
            target: 2500000,
            raised: 2300000,
            progress: 92,
            daysLeft: 5,
            yourDonation: 300000,
            status: 'almost-done'
        }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    const myCampaigns = [
        {
            id: 1,
            title: "Bantu Renovasi Sekolah di Pelosok",
            goal: 50000000,
            current: 32500000,
            donors: 142,
            status: "Active",
            deadline: "12 Hari lagi"
        },
        {
            id: 2,
            title: "Operasi Mata untuk Pak Aris",
            goal: 15000000,
            current: 15000000,
            donors: 89,
            status: "Success",
            deadline: "Selesai"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar user={user} logout={logout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} dropdownRef={dropdownRef} getInitials={getInitials} />

            <div className="flex">

                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} donorData={donorData} logout={logout} />

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8">
                    {activeTab === 'overview' && (
                        <Dashboard donorData={donorData} formatCurrency={formatCurrency} activeCampaigns={activeCampaigns} recentDonations={recentDonations} />
                    )}

                    {activeTab === 'campaigns' && (
                        <Campaings user={user} setIsCreateModalOpen={setIsCreateModalOpen} formatCurrency={formatCurrency} myCampaigns={myCampaigns} setSelectedCampaign={setSelectedCampaign} />
                    )}

                    {activeTab === 'profile' && (
                        <Profile user={user} isSaving={isSaving} handleUpdateProfile={handleUpdateProfile} />
                    )}
                </div>
            </div>
            <CreateCampaignModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            <CampaignDetailPanel
                isOpen={!!selectedCampaign}
                campaign={selectedCampaign}
                onClose={() => setSelectedCampaign(null)}
            />
        </div>

    );
}