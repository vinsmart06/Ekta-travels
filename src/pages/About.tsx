
import React from 'react'
import { useNavigate } from '../router'

export default function About() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="sec-eyebrow">Our Story</span>
          <h1 className="sec-heading">About <strong>EKTA Travels</strong></h1>
        </div>
      </div>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <div className="about-content">
            <div>
              <span className="sec-eyebrow">Pioneer Since 2004</span>
              <h2 className="sec-heading">Crafting <strong>Extraordinary Journeys</strong></h2>
              <p className="sec-body" style={{marginBottom:18}}>EKTA Travels is a premier Destination Management Company operating private tours, small group expeditions and tailor-made holidays across India, Nepal, Bhutan, Tibet, Sri Lanka and Bangladesh.</p>
              <p style={{fontSize:'.92rem',color:'var(--muted)',lineHeight:1.85,marginBottom:28}}>Founded in 2004, we have curated over 78,000 tour packages and guided millions of travellers through the wonders of South Asia. Our philosophy: design journeys that go beyond tourism and become genuine life experiences.</p>
              <button className="btn btn-gold" onClick={() => navigate('/enquiry')}>Plan Your Journey</button>
            </div>
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80" alt="Taj Mahal" style={{width:'100%',borderRadius:'var(--radius)',boxShadow:'var(--shadow-lg)'}} />
          </div>
          <div className="about-stats">
            {[['78,000+','Tours Sold'],['700+','Itineraries'],['20+','Years of Excellence'],['4.8/5','Average Rating']].map(([n,l]) => (
              <div key={l} className="about-stat">
                <span className="about-stat-num">{n}</span>
                <span className="about-stat-label">{l}</span>
              </div>
            ))}
          </div>
          <div style={{background:'var(--deep)',padding:'44px 40px',borderRadius:'var(--radius)'}}>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.7rem',color:'var(--gold-light)',marginBottom:18}}>Certifications & Awards</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:24}}>
              {[['🏆','ASTA Certified','American Society of Travel Advisors — Gold Member'],
                ['🏆','PATA Member','Pacific Asia Travel Association'],
                ['🏆','TAAI Member','Travel Agents Association of India'],
                ['⭐','Asia Pacific Award','Excellence in Travel Services 2022–2024']].map(([i,t,d]) => (
                <div key={t as string} style={{display:'flex',gap:14,color:'rgba(255,255,255,.7)'}}>
                  <span style={{fontSize:'1.4rem',flexShrink:0}}>{i}</span>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1rem',color:'var(--gold-light)',marginBottom:3}}>{t}</div>
                    <div style={{fontSize:'.8rem',color:'rgba(255,255,255,.42)'}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
