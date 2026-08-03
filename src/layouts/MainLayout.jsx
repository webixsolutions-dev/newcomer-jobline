import { Outlet } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import useScrollToTop from "../hooks/useScrollToTop"

const MainLayout = () => {
  useScrollToTop()

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
