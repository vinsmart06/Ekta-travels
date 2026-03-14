
import React from 'react'
import { useNavigate } from '../router'
import { destinations } from '../data/data'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <div className="nav-logo-icon">✦</div>
              <div>
                <div className="nav-logo-name">EKTA <span>Travels</span></div>
                <div className="nav-logo-tagline">India's Finest Travel</div>
              </div>
            </div>
            <p className="footer-about-desc">Pioneer destination management company for private tours and tailor-made holidays across India, Nepal, Bhutan and beyond since 2004.</p>
            <div className="footer-contact-item"><span className="icon">📍</span> 301, Crown Tower, Connaught Place, New Delhi 110001</div>
            <div className="footer-contact-item"><span className="icon">📞</span> +91 98765 43210</div>
            <div className="footer-contact-item"><span className="icon">✉️</span> info@EKTATravels.in</div>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>{destinations.map(d => <li key={d.slug}><button onClick={() => navigate(`/destinations/${d.slug}`)}>{d.name}</button></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Tour Types</h4>
            <ul>
              {[['Cultural & Heritage','/packages?theme=culture'],['Nature & Wildlife','/packages?theme=nature'],
                ['Adventure & Trekking','/packages?theme=adventure'],['Spiritual & Pilgrimage','/packages?theme=spiritual'],
                ['Group Tours','/packages'],['Luxury Tours','/packages']].map(([l,p]) => (
                <li key={l}><button onClick={() => navigate(p)}>{l}</button></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {[['About Us','/about'],['Guest Reviews','/reviews'],['Plan a Trip','/enquiry'],
                ['All Packages','/packages'],['All Destinations','/destinations']].map(([l,p]) => (
                <li key={l}><button onClick={() => navigate(p)}>{l}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2004–2026 EKTA Travels India Pvt. Ltd. All rights reserved.</div>
          <div className="footer-legal">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
