import { BrowserRouter, Routes, Route } from "react-router-dom"
import CrowdfundingPlatform from "./pages/dashboard/LandingPage"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrowdfundingPlatform />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
