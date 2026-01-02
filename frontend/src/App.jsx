import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import CrowdfundingPlatform from "./pages/dashboard/LandingPage"
import Authentication from "./pages/auth/Authentication"
import DasboardDonatur from "./pages/profile/Dashboard"
import ProtectedLayout from "./components/layout/ProtectedLayout"
import CampaignBrowse from "./pages/campaign/CampaignBrowse"
import AuthGoogleSuccess from "./pages/auth/AuthGoogleSuccess"
import GuestLayout from "./components/layout/GuestLayout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<CrowdfundingPlatform />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/auth-success" element={<AuthGoogleSuccess />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/campaign/browse" element={<CampaignBrowse />} />
          <Route path="/dashboard" element={<DasboardDonatur />} />
        </Route>
        {/* Fallback: Jika rute tidak ditemukan, lempar ke /auth */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
