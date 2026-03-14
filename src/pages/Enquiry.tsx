
import React, { useState } from 'react'
import { useNavigate } from '../router'

export default function Enquiry() {
  const navigate = useNavigate()
  const [form, setForm] = useState({name:'',email:'',phone:'',country:'',destination:'',dates:'',travellers:'2',tourType:'',budget:'',message:''})
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const up = (k: string, v: string) => setForm(f => ({...f,[k]:v}))
  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus('error'); return }
    setStatus('loading')
    try {
      const r = await fetch('/api/enquiry', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const d = await r.json()
      setStatus(d.success ? 'success' : 'error')
    } catch { setStatus('error') }
  }
  if (status === 'success') return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:'80px 20px',textAlign:'center'}}>
      <div style={{fontSize:'3.5rem'}}>🎉</div>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'2.2rem',color:'var(--deep)'}}>Enquiry Received!</h2>
      <p style={{color:'var(--muted)',maxWidth:440}}>Our travel experts will get back to you within 24 hours with a personalised itinerary.</p>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginTop:8}}>
        <button className="btn btn-gold" onClick={() => navigate('/')}>Back to Home</button>
        <button className="btn btn-outline-gold" onClick={() => navigate('/packages')}>Browse More Tours</button>
      </div>
    </div>
  )
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="sec-eyebrow">Get In Touch</span>
          <h1 className="sec-heading">Plan Your <strong>Dream Trip</strong></h1>
          <p className="sec-body">Fill in your preferences and our experts will craft a personalised itinerary — completely free, no obligation.</p>
        </div>
      </div>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:44,alignItems:'start'}}>
            <div className="form-card">
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.7rem',fontWeight:600,color:'var(--deep)',marginBottom:28}}>Your Travel Details</h3>
              <div className="form-grid-2" style={{marginBottom:18}}>
                {[['name','Full Name','text'],['email','Email Address','email'],['phone','Phone / WhatsApp','tel'],['country','Your Country','text']].map(([k,ph,t]) => (
                  <div key={k} className="form-group">
                    <label className="form-label">{ph}</label>
                    <input className="form-input" type={t} placeholder={ph} value={(form as any)[k]} onChange={e => up(k,e.target.value)} />
                  </div>
                ))}
              </div>
              <div className="form-grid-3" style={{marginBottom:18}}>
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <select className="form-select" value={form.destination} onChange={e => up('destination',e.target.value)}>
                    <option value="">Select</option>
                    {['India','Rajasthan','Kerala','Ladakh','Goa','Nepal','Bhutan'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Travel Month</label>
                  <input className="form-input" type="month" value={form.dates} onChange={e => up('dates',e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Travellers</label>
                  <input className="form-input" type="number" min="1" value={form.travellers} onChange={e => up('travellers',e.target.value)} />
                </div>
              </div>
              <div className="form-grid-2" style={{marginBottom:18}}>
                <div className="form-group">
                  <label className="form-label">Tour Type</label>
                  <select className="form-select" value={form.tourType} onChange={e => up('tourType',e.target.value)}>
                    <option value="">Select</option>
                    {['Cultural & Heritage','Nature & Wildlife','Adventure & Trekking','Spiritual & Pilgrimage','Honeymoon','Luxury'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget per Person (USD)</label>
                  <select className="form-select" value={form.budget} onChange={e => up('budget',e.target.value)}>
                    <option value="">Select</option>
                    {['Under $500','$500–$1,000','$1,000–$2,000','$2,000–$5,000','$5,000+'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group" style={{marginBottom:24}}>
                <label className="form-label">Message / Special Requirements</label>
                <textarea className="form-textarea" style={{minHeight:110}} placeholder="Any special interests, dietary needs, specific places you want to visit..." value={form.message} onChange={e => up('message',e.target.value)} />
              </div>
              {status === 'error' && <div className="form-error" style={{marginBottom:16}}>⚠️ Please fill in your name, email and message.</div>}
              <button className="btn btn-gold btn-full btn-lg" onClick={submit} disabled={status==='loading'}>
                {status === 'loading' ? '⌛ Sending...' : "✈️ Send My Enquiry — It's Free!"}
              </button>
            </div>
            <div>
              <div style={{background:'var(--deep)',padding:28,borderRadius:'var(--radius)',marginBottom:20}}>
                <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.25rem',color:'var(--gold-light)',marginBottom:18}}>📞 Reach Us Directly</h4>
                {[['📞','Phone','+91 98765 43210'],['📱','WhatsApp','+91 98765 43210'],['✉️','Email','info@ektatravels.in'],['⏰','Hours','Mon–Sat 9 AM – 7 PM IST']].map(([i,l,v]) => (
                  <div key={l as string} style={{display:'flex',gap:12,marginBottom:14,fontSize:'.84rem',color:'rgba(255,255,255,.7)'}}>
                    <span style={{color:'var(--gold)'}}>{i}</span>
                    <div><div style={{fontSize:'.62rem',letterSpacing:'.09em',textTransform:'uppercase',color:'rgba(255,255,255,.38)',marginBottom:2}}>{l}</div>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#fff',padding:24,borderRadius:'var(--radius)',boxShadow:'var(--shadow-md)'}}>
                <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.15rem',fontWeight:600,color:'var(--deep)',marginBottom:14}}>✦ Why Enquire With Us?</h4>
                {['Free itinerary design — no commitment','Response within 24 hours guaranteed','Fully customisable tour plans','Best price guarantee','Award-winning service since 2004'].map(x => (
                  <div key={x} style={{display:'flex',gap:10,marginBottom:11,fontSize:'.84rem',color:'var(--text)'}}>
                    <span style={{color:'var(--gold)',flexShrink:0}}>✦</span>{x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
