
import React from 'react'
import { useNavigate } from '../router'
import { Package } from '../data/data'

interface Props { pkg: Package }

export default function PackageCard({ pkg }: Props) {
  const navigate = useNavigate()
  const badgeClass = pkg.badge === 'Best Seller' ? 'gold' : pkg.badge === 'Popular' ? 'teal' : ''
  return (
    <div className="pkg-card" onClick={() => navigate(`/packages/${pkg.slug}`)}>
      <div className="pkg-card-img">
        <img src={pkg.image} alt={pkg.name} loading="lazy" />
        {pkg.badge && <span className={`pkg-badge ${badgeClass}`}>{pkg.badge}</span>}
        <span className="pkg-rating">⭐ {pkg.rating}/5</span>
      </div>
      <div className="pkg-card-body">
        <div className="pkg-tags">{pkg.tags.map(t => <span key={t} className="pkg-tag">{t}</span>)}</div>
        <div className="pkg-name">{pkg.name}</div>
        <div className="pkg-overview">{pkg.overview}</div>
        <div className="pkg-card-footer">
          <div className="pkg-meta">
            <div className="pkg-meta-item"><span className="icon">⏱</span> {pkg.days} {pkg.days === 1 ? 'day' : 'days'}</div>
            <div className="pkg-meta-item"><span className="icon">👥</span> {pkg.type === 'group' ? `Group (${pkg.groupSize})` : 'Private'}</div>
          </div>
          <div className="pkg-price">
            <span className="pkg-price-from">From</span>
            <span className="pkg-price-amount">USD ${pkg.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
