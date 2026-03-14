
import React, { useState, useEffect } from 'react'
import { useNavigate } from '../router'
import { destinations, packages, testimonials } from '../data/data'
import PackageCard from '../components/PackageCard'

const SLIDES = [
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=85',
  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600&q=85',
  'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?w=1600&q=85',
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=85',
]

export default function Home() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [tab, setTab] = useState('all')

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const pkgs = (tab === 'all' ? packages : packages.filter(p => p.theme === tab)).slice(0, 6)

  return (
    <div>
      <section className="hero">
        {SLIDES.map((url, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`} style={{ backgroundImage: `url(${url})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content animate-in">
          <div className="hero-badge">✦ &nbsp; 20 Years of Crafting Journeys</div>
          <h1>Discover the Soul of <em>Incredible India</em></h1>
          <p className="hero-desc">Handcrafted private tours, small-group expeditions & tailor-made holidays across India, Nepal, Bhutan, Tibet & beyond.</p>
          <div className="hero-actions">
            <button className="btn btn-gold btn-lg" onClick={() => navigate('/packages')}>Explore Tours</button>
            <button className="btn btn-outline-white btn-lg" onClick={() => navigate('/enquiry')}>Plan My Trip</button>
          </div>
        </div>
        <div className="hero-indicators">
          {SLIDES.map((_, i) => <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />)}
        </div>
        <div className="hero-stats">
          {[['78K+','Tours Sold'],['700+','Itineraries'],['4.8★','Avg Rating']].map(([n,l]) => (
            <div key={l}><span className="hero-stat-num">{n}</span><span className="hero-stat-label">{l}</span></div>
          ))}
        </div>
      </section>

      <div className="search-section">
        <div className="search-inner">
          <div className="search-field">
            <span className="search-field-icon">📍</span>
            <div style={{flex:1}}>
              <span className="search-field-label">Destination</span>
              <select onChange={e => e.target.value && navigate(`/packages?country=${e.target.value}`)}>
                <option value="">All Destinations</option>
                <option value="India">India</option>
                <option value="Nepal">Nepal</option>
                <option value="Bhutan">Bhutan</option>
              </select>
            </div>
          </div>
          <div className="search-field">
            <span className="search-field-icon">🎯</span>
            <div style={{flex:1}}>
              <span className="search-field-label">Tour Type</span>
              <select onChange={e => e.target.value && navigate(`/packages?theme=${e.target.value}`)}>
                <option value="">All Types</option>
                <option value="culture">Cultural</option>
                <option value="nature">Nature & Wildlife</option>
                <option value="adventure">Adventure</option>
                <option value="spiritual">Spiritual</option>
              </select>
            </div>
          </div>
          <div className="search-field">
            <span className="search-field-icon">⏱️</span>
            <div style={{flex:1}}>
              <span className="search-field-label">Duration</span>
              <select><option>Any Duration</option><option>1–5 Days</option><option>6–10 Days</option><option>11–20 Days</option><option>20+ Days</option></select>
            </div>
          </div>
          <button className="search-submit" onClick={() => navigate('/packages')}>🔍 Search Tours</button>
        </div>
      </div>

      <section className="section dest-dark">
        <div className="container">
          <span className="sec-eyebrow">Explore South Asia</span>
          <h2 className="sec-heading">Our <strong>Destinations</strong></h2>
          <p className="sec-body" style={{color:'rgba(255,255,255,.5)'}}>From snow-crowned Himalayas to tropical backwaters — every corner of South Asia holds a story.</p>
          <div className="dest-grid" style={{marginTop:48}}>
            {destinations.slice(0,6).map((d,i) => (
              <div key={d.slug} className={`dest-tile ${i===0?'large':''}`} onClick={() => navigate(`/destinations/${d.slug}`)}>
                <img src={d.image} alt={d.name} loading="lazy" />
                <div className="dest-tile-overlay" />
                <div className="dest-tile-info">
                  <span className="dest-tile-name">{d.name}</span>
                  <span className="dest-tile-count">{d.packages}+ Packages</span>
                </div>
                <div className="dest-tile-arrow">→</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:36}}>
            <button className="btn btn-outline-gold" onClick={() => navigate('/destinations')}>View All Destinations →</button>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:16,marginBottom:32}}>
            <div>
              <span className="sec-eyebrow">Handcrafted For You</span>
              <h2 className="sec-heading">Featured <strong>Tour Packages</strong></h2>
            </div>
            <button className="btn btn-outline-gold btn-sm" onClick={() => navigate('/packages')}>View All →</button>
          </div>
          <div className="pkg-tabs">
            {[['all','🌏 All Tours'],['culture','🏯 Cultural'],['nature','🐅 Nature'],['spiritual','🕉️ Spiritual'],['adventure','🏔️ Adventure']].map(([k,l]) => (
              <button key={k} className={`pkg-tab ${tab===k?'active':''}`} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <div className="pkg-grid">{pkgs.map(p => <PackageCard key={p.id} pkg={p} />)}</div>
        </div>
      </section>

      <section className="section themes-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:48}}>
            <span className="sec-eyebrow">Browse by Passion</span>
            <h2 className="sec-heading">Travel <strong>Themes & Ideas</strong></h2>
          </div>
          <div className="themes-grid">
            {[['culture','🏯','Culture & Heritage','120+ tours'],['nature','🐅','Nature & Wildlife','65 tours'],
              ['adventure','🏔️','Trekking','48 tours'],['spiritual','🕉️','Spiritual','55 tours'],
              ['honeymoon','💑','Honeymoon','40 tours'],['festival','🎪','Fairs & Festivals','32 tours']].map(([k,i,l,c]) => (
              <div key={k} className="theme-card" onClick={() => navigate(`/packages?theme=${k}`)}>
                <span className="theme-card-icon">{i}</span>
                <div className="theme-card-name">{l}</div>
                <div className="theme-card-count">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container" style={{textAlign:'center'}}>
          <span className="sec-eyebrow" style={{display:'block'}}>Why Thousands Choose Us</span>
          <h2 className="sec-heading">The Ekta Travels <strong style={{color:'var(--gold)'}}>Difference</strong></h2>
          <div className="why-grid">
            {[['🎨','Authentic Experiences','Carefully curated journeys that reveal the real soul of each destination.'],
              ['✂️','Total Flexibility','Start with any package and reshape it entirely to your wishes.'],
              ['🧭','Expert Guides','First-hand knowledge, local connections, and genuine passion.'],
              ['💎','Best Value','Premium experiences at competitive prices with no hidden costs.'],
              ['🛡️','Peace of Mind','24/7 in-destination support and a team that cares about every detail.']].map(([i,t,d]) => (
              <div key={t as string} className="why-card">
                <span className="why-icon">{i}</span>
                <div className="why-title">{t}</div>
                <div className="why-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:52}}>
            <span className="sec-eyebrow">What Our Travellers Say</span>
            <h2 className="sec-heading">Stories From the <strong>Road</strong></h2>
          </div>
          <div className="testi-grid">
            {testimonials.slice(0,3).map(t => (
              <div key={t.id} className="testi-card">
                <div className="testi-quote">"</div>
                <span className="testi-tour">{t.tour}</span>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-origin">{t.flag} {t.country}</div>
                    <div className="testi-stars">{'★'.repeat(t.rating)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <div className="cta-inner">
          <h2 className="cta-heading">Let Us Craft Your <em>Perfect Journey</em></h2>
          <p className="cta-sub">Share your preferences and our experts will design a bespoke itinerary — free, no obligation.</p>
          <div className="cta-actions">
            <button className="btn btn-gold btn-lg" onClick={() => navigate('/enquiry')}>Plan My Trip Now →</button>
            <button className="btn btn-outline-white" onClick={() => navigate('/packages')}>Browse All Tours</button>
          </div>
        </div>
      </div>
    </div>
  )
}
