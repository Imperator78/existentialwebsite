import React from 'react'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Existential</h1>
          <p>Explore the depths of existence and meaning</p>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
    </section>
  )
}
