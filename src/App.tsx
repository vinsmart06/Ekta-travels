
import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from './router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Packages from './pages/Packages'
import PackageDetail from './pages/PackageDetail'
import Enquiry from './pages/Enquiry'
import About from './pages/About'
import Reviews from './pages/Reviews'
import './styles.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function NotFound() {
  const navigate = (to: string) => window.location.href = to
  return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,textAlign:'center',padding:40}}>
      <div style={{fontSize:'4rem'}}>🗺️</div>
      <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'3rem',color:'var(--deep)'}}>Page Not Found</h1>
      <p style={{color:'var(--muted)',maxWidth:400}}>The page you are looking for does not exist.</p>
      <div style={{display:'flex',gap:12,marginTop:8}}>
        <button className="btn btn-gold" onClick={() => navigate('/')}>Go Home</button>
        <button className="btn btn-outline-gold" onClick={() => navigate('/packages')}>Browse Tours</button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:slug" element={<PackageDetail />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <button className="wa-float" onClick={() => window.open('https://wa.me/919876543210','_blank')} title="Chat on WhatsApp">💬</button>
    </BrowserRouter>
  )
}
