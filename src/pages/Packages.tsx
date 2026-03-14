
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from '../router'
import { packages } from '../data/data'
import PackageCard from '../components/PackageCard'

export default function Packages() {
  const navigate = useNavigate()
  const [sp, setSp] = useSearchParams()
  const [search, setSearch] = useState('')
  const theme = sp.get('theme') || ''
  const country = sp.get('country') || ''
  const maxDays = sp.get('maxDays') || ''
  const maxPrice = sp.get('maxPrice') || ''
  const setParam = (k: string, v: string) => {
    const p = new URLSearchParams(sp); v ? p.set(k,v) : p.delete(k); setSp(p)
  }
  const list = packages.filter(p => {
    if (theme && p.theme !== theme) return false
    if (country && p.country.toLowerCase() !== country.toLowerCase()) return false
    if (maxDays && p.days > parseInt(maxDays)) return false
    if (maxPrice && p.price > parseInt(maxPrice)) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.destination.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate('/')}>Home</button>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item" style={{color:'rgba(255,255,255,.5)'}}>Tour Packages</span>
          </div>
          <h1 className="sec-heading">Tour <strong>Packages</strong></h1>
          <p className="sec-body">{list.length} tours found</p>
        </div>
      </div>
      <div className="filter-bar">
        <div className="container">
          <div className="filter-inner">
            <div className="filter-group" style={{flex:2}}>
              <label className="filter-label">Search</label>
              <input className="form-input" placeholder="Search tours, destinations..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="filter-group">
              <label className="filter-label">Country</label>
              <select className="form-select" value={country} onChange={e => setParam('country',e.target.value)}>
                <option value="">All Countries</option>
                <option value="India">India</option><option value="Nepal">Nepal</option><option value="Bhutan">Bhutan</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Theme</label>
              <select className="form-select" value={theme} onChange={e => setParam('theme',e.target.value)}>
                <option value="">All Themes</option>
                <option value="culture">Cultural</option><option value="nature">Nature & Wildlife</option>
                <option value="adventure">Adventure</option><option value="spiritual">Spiritual</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Max Days</label>
              <input className="form-input" type="number" placeholder="e.g. 10" value={maxDays} onChange={e => setParam('maxDays',e.target.value)} />
            </div>
            <div className="filter-group">
              <label className="filter-label">Max Budget (USD)</label>
              <input className="form-input" type="number" placeholder="e.g. 1000" value={maxPrice} onChange={e => setParam('maxPrice',e.target.value)} />
            </div>
            {(theme||country||maxDays||maxPrice||search) && (
              <div className="filter-group" style={{justifyContent:'flex-end'}}>
                <button className="btn btn-outline-gold btn-sm" onClick={() => { setSearch(''); setSp(new URLSearchParams()) }}>Clear</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <div className="pkg-tabs">
            {[['','🌏 All'],['culture','🏯 Cultural'],['nature','🐅 Nature'],['spiritual','🕉️ Spiritual'],['adventure','🏔️ Adventure']].map(([k,l]) => (
              <button key={k} className={`pkg-tab ${theme===k?'active':''}`} onClick={() => setParam('theme',k)}>{l}</button>
            ))}
          </div>
          {list.length === 0
            ? <div className="empty-state"><span className="empty-state-icon">🗺️</span><p>No tours match your filters.</p><button className="btn btn-gold" style={{marginTop:20}} onClick={() => { setSearch(''); setSp(new URLSearchParams()) }}>Clear Filters</button></div>
            : <div className="pkg-grid">{list.map(p => <PackageCard key={p.id} pkg={p} />)}</div>
          }
        </div>
      </section>
    </div>
  )
}
