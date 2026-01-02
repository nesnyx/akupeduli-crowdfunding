import { BrowserRouter, Routes, Route } from "react-router-dom"
import CrowdfundingPlatform from "./pages/dashboard/LandingPage"
import Authentication from "./pages/auth/Authentication"
import DasboardDonatur from "./pages/profile/Dashboard"
import ProtectedLayout from "./components/layout/ProtectedLayout"
import CampaignBrowse from "./pages/campaign/CampaignBrowse"
import AuthGoogleSuccess from "./pages/auth/AuthGoogleSuccess"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrowdfundingPlatform />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/auth-success" element={<AuthGoogleSuccess />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/campaign/browse" element={<CampaignBrowse />} />
          <Route path="/dashboard" element={<DasboardDonatur />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
