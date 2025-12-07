import React from 'react'
import './Features.css'

export default function Features() {
  const features = [
    {
      id: 1,
      title: 'Deep Insights',
      description: 'Explore philosophical concepts and gain deeper understanding of existence.'
    },
    {
      id: 2,
      title: 'Community',
      description: 'Connect with like-minded individuals interested in existential questions.'
    },
    {
      id: 3,
      title: 'Resources',
      description: 'Access a curated collection of articles, books, and discussions.'
    },
    {
      id: 4,
      title: 'Growth',
      description: 'Develop your perspective and expand your philosophical horizons.'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.id}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
