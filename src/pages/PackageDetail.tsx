
import React, { useState } from 'react'
import { useParams, useNavigate } from '../router'
import { packages } from '../data/data'
import PackageCard from '../components/PackageCard'

export default function PackageDetail() {
  const { slug } = useParams<{slug:string}>()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [showEnq, setShowEnq] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const pkg = packages.find(p => p.slug === slug)
  if (!pkg) return (
    <div className="empty-state" style={{paddingTop:120}}>
      <span className="empty-state-icon">🗺️</span><p>Tour not found.</p>
      <button className="btn btn-gold" style={{marginTop:20}} onClick={() => navigate('/packages')}>Back to Packages</button>
    </div>
  )
  const related = packages.filter(p => p.id !== pkg.id && p.theme === pkg.theme).slice(0,3)
  const up = (k: string, v: string) => setForm(f => ({...f,[k]:v}))
  const submit = async () => {
    if (!form.name || !form.email) { setStatus('error'); return }
    setStatus('loading')
    try {
      const r = await fetch('/api/enquiry', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, tourName: pkg.name}) })
      const d = await r.json()
      setStatus(d.success ? 'success' : 'error')
    } catch { setStatus('error') }
  }
  return (
    <div>
      <div className="detail-hero">
        <img src={pkg.image} alt={pkg.name} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate('/')}>Home</button>
            <span className="breadcrumb-sep">›</span>
            <button className="breadcrumb-link" onClick={() => navigate('/packages')}>Packages</button>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item">{pkg.name}</span>
          </div>
          <h1 className="detail-hero-title">{pkg.name}</h1>
          <div className="detail-hero-meta">
            <div className="detail-hero-meta-item"><span className="icon">⏱</span> {pkg.days} days</div>
            <div className="detail-hero-meta-item"><span className="icon">📍</span> {pkg.destination}</div>
            <div className="detail-hero-meta-item"><span className="icon">⭐</span> {pkg.rating}/5 ({pkg.reviews} reviews)</div>
            {pkg.badge && <span style={{background:'var(--gold)',color:'var(--deep)',fontSize:'.65rem',padding:'4px 12px',borderRadius:2,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase'}}>{pkg.badge}</span>}
          </div>
        </div>
      </div>

      <div style={{background:'#fff',borderBottom:'1px solid rgba(0,0,0,.08)'}}>
        <div className="container">
          <div className="detail-tabs">
            {['overview','itinerary','included','gallery'].map(t => (
              <button key={t} className={`detail-tab ${tab===t?'active':''}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="detail-layout">
          <div>
            {tab === 'overview' && <>
              <div className="detail-section">
                <h2 className="detail-section-title">Tour Overview</h2>
                <p className="overview-text">{pkg.overview}</p>
              </div>
              <div className="detail-section">
                <h2 className="detail-section-title">Tour Highlights</h2>
                <div className="highlights-grid">{pkg.highlights.map(h => <div key={h} className="highlight-item">{h}</div>)}</div>
              </div>
            </>}
            {tab === 'itinerary' && (
              <div className="detail-section">
                <h2 className="detail-section-title">{pkg.days}-Day Detailed Itinerary</h2>
                {pkg.itinerary.map(item => (
                  <div key={item.day} className="itinerary-item">
                    <div className="itin-day">Day {item.day}</div>
                    <div className="itin-title">{item.title}</div>
                    <div className="itin-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'included' && <>
              <div className="detail-section">
                <h2 className="detail-section-title">What's Included</h2>
                <div className="incl-grid">{pkg.included.map(i => <div key={i} className="incl-item">✅ &nbsp;{i}</div>)}</div>
              </div>
              <div className="detail-section">
                <h2 className="detail-section-title">Not Included</h2>
                <div className="incl-grid">{pkg.excluded.map(i => <div key={i} className="incl-item excl">❌ &nbsp;{i}</div>)}</div>
              </div>
            </>}
            {tab === 'gallery' && (
              <div className="detail-section">
                <h2 className="detail-section-title">Photo Gallery</h2>
                <div className="gallery-grid">{pkg.gallery.map((img,i) => <img key={i} src={img} alt={`Photo ${i+1}`} loading="lazy" />)}</div>
              </div>
            )}
            {related.length > 0 && (
              <div className="detail-section" style={{marginTop:40}}>
                <h2 className="detail-section-title">You May Also Like</h2>
                <div className="pkg-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
                  {related.map(p => <PackageCard key={p.id} pkg={p} />)}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="sidebar-card">
              <div className="sidebar-rating">
                <span className="sidebar-rating-score">{pkg.rating}</span>
                <div>
                  <div className="sidebar-rating-stars">{'★'.repeat(Math.round(pkg.rating))}</div>
                  <div className="sidebar-rating-count">{pkg.reviews} reviews</div>
                </div>
              </div>
              <span className="sidebar-price-from">Starting From</span>
              <div className="sidebar-price">${pkg.price.toLocaleString()} <span>USD / person</span></div>
              <div className="sidebar-meta">
                {[['⏱️','Duration',`${pkg.days} days`],['👥','Type',pkg.type==='group'?`Group (${pkg.groupSize})`:'Private'],
                  ['📍','Places',`${pkg.destination.split(',').length} cities`],['🏅','Rating',`${pkg.rating}/5`]].map(([i,l,v]) => (
                  <div key={l as string} className="sidebar-meta-item">
                    <span className="sidebar-meta-label">{i} {l}</span>
                    <span className="sidebar-meta-value">{v}</span>
                  </div>
                ))}
              </div>
              <div className="sidebar-actions">
                <button className="btn btn-gold btn-full" onClick={() => setShowEnq(!showEnq)}>{showEnq ? '▲ Close' : '📋 Book / Enquire Now'}</button>
                <button className="btn btn-outline-gold btn-full" onClick={() => navigate('/enquiry')}>Get Custom Quote</button>
              </div>
              {showEnq && (
                <div className="quick-enq">
                  <div className="quick-enq-title">Quick Enquiry <button className="quick-enq-close" onClick={() => setShowEnq(false)}>✕</button></div>
                  {status === 'success'
                    ? <div className="form-success">✅ Sent! We'll be in touch within 24 hours.</div>
                    : <>
                        {(['name','email','phone'] as const).map(k => (
                          <input key={k} className="form-input" type={k==='email'?'email':k==='phone'?'tel':'text'}
                            placeholder={k==='name'?'Your Name':k==='email'?'Email Address':'Phone / WhatsApp'}
                            value={form[k]} onChange={e => up(k,e.target.value)} />
                        ))}
                        <textarea className="form-textarea" style={{minHeight:70}} placeholder="Message"
                          value={form.message} onChange={e => up('message',e.target.value)} />
                        {status === 'error' && <div className="form-error">⚠️ Please fill in your name and email.</div>}
                        <button className="btn btn-gold btn-full" onClick={submit} disabled={status==='loading'}>
                          {status === 'loading' ? '⌛ Sending...' : 'Send Enquiry →'}
                        </button>
                      </>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
