import { BrowserRouter, Routes, Route } from "react-router-dom"
import CrowdfundingPlatform from "./pages/dashboard/LandingPage"
import Authentication from "./pages/auth/Authentication"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrowdfundingPlatform />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
