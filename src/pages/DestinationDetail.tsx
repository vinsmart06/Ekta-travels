
import React from 'react'
import { useParams, useNavigate } from '../router'
import { destinations, packages } from '../data/data'
import PackageCard from '../components/PackageCard'

export default function DestinationDetail() {
  const { slug } = useParams<{slug:string}>()
  const navigate = useNavigate()
  const dest = destinations.find(d => d.slug === slug)
  if (!dest) return (
    <div className="empty-state" style={{paddingTop:120}}>
      <span className="empty-state-icon">🗺️</span><p>Destination not found.</p>
      <button className="btn btn-gold" style={{marginTop:20}} onClick={() => navigate('/destinations')}>Back to Destinations</button>
    </div>
  )
  const related = packages.filter(p => p.destSlug === dest.slug).slice(0, 4)
  return (
    <div>
      <div className="detail-hero">
        <img src={dest.heroImg} alt={dest.name} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate('/')}>Home</button>
            <span className="breadcrumb-sep">›</span>
            <button className="breadcrumb-link" onClick={() => navigate('/destinations')}>Destinations</button>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item">{dest.name}</span>
          </div>
          <h1 className="detail-hero-title">{dest.name}</h1>
          <div className="detail-hero-meta">
            <div className="detail-hero-meta-item"><span className="icon">📍</span> {dest.country}</div>
            <div className="detail-hero-meta-item"><span className="icon">📦</span> {dest.packages}+ Packages</div>
            <div className="detail-hero-meta-item"><span className="icon">📅</span> Best Time: {dest.bestTime}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="dest-detail-grid">
          <div>
            <div className="dest-stat-bar">
              {[[`${dest.packages}+`,'Packages'],['Year Round','Travel'],['4.8★','Rating']].map(([n,l]) => (
                <div key={l} className="dest-stat"><span className="dest-stat-num">{n}</span><span className="dest-stat-label">{l}</span></div>
              ))}
            </div>
            <div className="detail-section">
              <h2 className="detail-section-title">About {dest.name}</h2>
              <p className="overview-text">{dest.description}</p>
            </div>
            <div className="detail-section">
              <h2 className="detail-section-title">Top Highlights</h2>
              <ul className="dest-highlights-list">{dest.highlights.map(h => <li key={h}>{h}</li>)}</ul>
            </div>
            {related.length > 0 && (
              <div className="detail-section">
                <h2 className="detail-section-title">Popular Tours to {dest.name}</h2>
                <div className="pkg-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
                  {related.map(p => <PackageCard key={p.id} pkg={p} />)}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="dest-info-card">
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2rem',fontWeight:600,color:'var(--maroon)'}}>{dest.packages}+</div>
              <div style={{fontSize:'.72rem',letterSpacing:'.1em',textTransform:'uppercase',color:'var(--muted)',margin:'4px 0 20px'}}>Tours Available</div>
              <button className="btn btn-gold btn-full" style={{marginBottom:10}} onClick={() => navigate('/packages')}>View All {dest.name} Tours</button>
              <button className="btn btn-maroon btn-full" onClick={() => navigate('/enquiry')}>Plan Custom Trip</button>
            </div>
            <div className="dest-info-card">
              <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.15rem',fontWeight:600,color:'var(--deep)',marginBottom:14}}>📅 Best Time to Visit</h4>
              <p style={{fontSize:'.88rem',color:'var(--text)',marginBottom:18}}>{dest.bestTime}</p>
              <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.15rem',fontWeight:600,color:'var(--deep)',marginBottom:14}}>✦ Top Experiences</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {dest.highlights.map(h => (
                  <li key={h} style={{display:'flex',gap:9,fontSize:'.83rem',color:'var(--text)'}}><span style={{color:'var(--gold)',flexShrink:0}}>✦</span>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
