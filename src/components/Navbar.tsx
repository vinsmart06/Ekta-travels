import React, { useState } from 'react'
import { useNavigate, useLocation } from '../router'
import { destinations } from '../data/data'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const a = (p: string) => location.pathname === p || location.pathname.startsWith(p + '/') ? 'active' : ''

  const go = (path: string) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <div>
      <div className="announce-bar">
        🕉️ <strong>Kailash Mansarovar Yatra 2026</strong> — Registration Open Now · Call <strong>+91 98765 43210</strong>
      </div>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-logo" onClick={() => go('/')}>
            <div className="nav-logo-icon">✦</div>
            <div>
              <div className="nav-logo-name">EKTA <span>Travels</span></div>
              <div className="nav-logo-tagline">Explore the World</div>
            </div>
          </div>

          {/* Desktop links */}
          <ul className="nav-links">
            <li className="nav-item">
              <button className={`nav-link ${a('/destinations')}`} onClick={() => go('/destinations')}>Destinations ▾</button>
              <div className="dropdown">
                {destinations.map(d => (
                  <button key={d.slug} onClick={() => go(`/destinations/${d.slug}`)}>📍 {d.name}</button>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${a('/packages')}`} onClick={() => go('/packages')}>Tour Packages ▾</button>
              <div className="dropdown">
                <button onClick={() => go('/packages')}>🌏 All Tour Packages</button>
                <hr className="dropdown-divider" />
                <button onClick={() => go('/packages?theme=culture')}>🏯 Cultural Tours</button>
                <button onClick={() => go('/packages?theme=nature')}>🐅 Nature & Wildlife</button>
                <button onClick={() => go('/packages?theme=adventure')}>🏔️ Adventure & Trekking</button>
                <button onClick={() => go('/packages?theme=spiritual')}>🕉️ Spiritual & Pilgrimage</button>
              </div>
            </li>
            <li><button className={`nav-link ${a('/about')}`} onClick={() => go('/about')}>About</button></li>
            <li><button className={`nav-link ${a('/reviews')}`} onClick={() => go('/reviews')}>Reviews</button></li>
            <li><button className="nav-link nav-cta" onClick={() => go('/enquiry')}>Get a Quote</button></li>
          </ul>

          {/* Hamburger button - mobile only */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">

            <div className="mobile-section-title">Destinations</div>
            {destinations.map(d => (
              <button key={d.slug} className="mobile-link" onClick={() => go(`/destinations/${d.slug}`)}>
                📍 {d.name}
              </button>
            ))}

            <div className="mobile-divider" />

            <div className="mobile-section-title">Tour Packages</div>
            <button className="mobile-link" onClick={() => go('/packages')}>🌏 All Tour Packages</button>
            <button className="mobile-link" onClick={() => go('/packages?theme=culture')}>🏯 Cultural Tours</button>
            <button className="mobile-link" onClick={() => go('/packages?theme=nature')}>🐅 Nature & Wildlife</button>
            <button className="mobile-link" onClick={() => go('/packages?theme=adventure')}>🏔️ Adventure & Trekking</button>
            <button className="mobile-link" onClick={() => go('/packages?theme=spiritual')}>🕉️ Spiritual & Pilgrimage</button>

            <div className="mobile-divider" />

            <button className="mobile-link" onClick={() => go('/about')}>About Us</button>
            <button className="mobile-link" onClick={() => go('/reviews')}>Guest Reviews</button>

            <div className="mobile-divider" />

            <button className="mobile-cta" onClick={() => go('/enquiry')}>✈️ Get a Free Quote</button>
          </div>
        </div>
      </nav>
    </div>
  )
}
