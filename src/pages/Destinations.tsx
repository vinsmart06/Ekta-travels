
import React, { useState } from 'react'
import { useNavigate } from '../router'
import { destinations } from '../data/data'

export default function Destinations() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const list = destinations.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="sec-eyebrow">Explore South Asia</span>
          <h1 className="sec-heading">Our <strong>Destinations</strong></h1>
          <p className="sec-body">Every corner of South Asia holds a story. Find yours.</p>
        </div>
      </div>
      <div style={{background:'#fff',padding:'20px 0',boxShadow:'var(--shadow-sm)'}}>
        <div className="container">
          <input className="form-input" style={{maxWidth:400}} placeholder="🔍  Search destinations..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          {list.length === 0
            ? <div className="empty-state"><span className="empty-state-icon">🗺️</span><p>No destinations found.</p></div>
            : <div className="dest-grid">
                {list.map((d,i) => (
                  <div key={d.slug} className={`dest-tile ${i===0?'large':''}`} onClick={() => navigate(`/destinations/${d.slug}`)}>
                    <img src={d.image} alt={d.name} loading="lazy" />
                    <div className="dest-tile-overlay" />
                    <div className="dest-tile-info">
                      <span className="dest-tile-name">{d.name}</span>
                      <span className="dest-tile-count">{d.country} · {d.packages}+ Packages</span>
                    </div>
                    <div className="dest-tile-arrow">→</div>
                  </div>
                ))}
              </div>
          }
        </div>
      </section>
    </div>
  )
}
