
import React from 'react'
import { useNavigate } from '../router'
import { testimonials } from '../data/data'

export default function Reviews() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <span className="sec-eyebrow">What Travellers Say</span>
          <h1 className="sec-heading">Guest <strong>Reviews</strong></h1>
          <div className="reviews-header-stats">
            {[['4.8 / 5','Overall Rating'],['98%','Recommend Us'],['78K+','Happy Travellers']].map(([n,l]) => (
              <div key={l}><span className="reviews-stat-big">{n}</span><span className="reviews-stat-lbl">{l}</span></div>
            ))}
          </div>
        </div>
      </div>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <div className="testi-grid">
            {testimonials.map(t => (
              <div key={t.id} className="testi-card">
                <div className="testi-quote">"</div>
                <span className="testi-tour">{t.tour}</span>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-origin">{t.flag} {t.country}</div>
                    <div className="testi-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cta-banner" style={{borderRadius:'var(--radius)',marginTop:60}}>
            <div className="cta-inner">
              <h2 className="cta-heading">Ready to Write <em>Your Story?</em></h2>
              <p className="cta-sub">Join thousands of happy travellers. Start planning your journey today.</p>
              <div className="cta-actions">
                <button className="btn btn-gold btn-lg" onClick={() => navigate('/enquiry')}>Plan My Trip</button>
                <button className="btn btn-outline-white" onClick={() => navigate('/packages')}>Browse Tours</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
