
import React from 'react'
import { useNavigate, useLocation } from '../router'
import { destinations } from '../data/data'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const a = (p: string) => location.pathname === p || location.pathname.startsWith(p + '/') ? 'active' : ''
  return (
    <div>
      <div className="announce-bar">
        🕉️ <strong>Kailash Mansarovar Yatra 2026</strong> — Registration Open Now · Call <strong>+91 98765 43210</strong>
      </div>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-logo" onClick={() => navigate('/')}>
            <div className="nav-logo-icon">✦</div>
            <div>
              <div className="nav-logo-name">EKTA <span>Travels</span></div>
              <div className="nav-logo-tagline">India's Finest Travel</div>
            </div>
          </div>
          <ul className="nav-links">
            <li className="nav-item">
              <button className={`nav-link ${a('/destinations')}`} onClick={() => navigate('/destinations')}>Destinations ▾</button>
              <div className="dropdown">
                {destinations.map(d => (
                  <button key={d.slug} onClick={() => navigate(`/destinations/${d.slug}`)}>📍 {d.name}</button>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${a('/packages')}`} onClick={() => navigate('/packages')}>Tour Packages ▾</button>
              <div className="dropdown">
                <button onClick={() => navigate('/packages')}>🌏 All Tour Packages</button>
                <hr className="dropdown-divider" />
                <button onClick={() => navigate('/packages?theme=culture')}>🏯 Cultural Tours</button>
                <button onClick={() => navigate('/packages?theme=nature')}>🐅 Nature & Wildlife</button>
                <button onClick={() => navigate('/packages?theme=adventure')}>🏔️ Adventure & Trekking</button>
                <button onClick={() => navigate('/packages?theme=spiritual')}>🕉️ Spiritual & Pilgrimage</button>
              </div>
            </li>
            <li><button className={`nav-link ${a('/about')}`} onClick={() => navigate('/about')}>About</button></li>
            <li><button className={`nav-link ${a('/reviews')}`} onClick={() => navigate('/reviews')}>Reviews</button></li>
            <li><button className="nav-link nav-cta" onClick={() => navigate('/enquiry')}>Get a Quote</button></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
