import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./ui/molecules/Navbar/Index"
import Footer from "./ui/molecules/Footer/Index"
import RevenuePotentialPage from "./ui/pages/InfluencerRevenue/Index"
import BrandRevenuePotential from "./ui/pages/BrandRevenue/Index"
import RevenueCalculator from "./ui/pages/RevenueCalculator/Index"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/calculator" element={<RevenueCalculator />} />
            <Route path="/influencer" element={<RevenuePotentialPage />} />
            <Route path="/brand" element={<BrandRevenuePotential />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App