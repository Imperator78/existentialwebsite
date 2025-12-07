import React from 'react'
import './Page.css'

export default function Page3({ onNext }) {
  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Get Started Today</h2>
        <p>Join our community and begin your existential journey.</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Tell us about your interests..." rows="5"></textarea>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <button className="find-meaning-btn" onClick={onNext}>
          Find meaning
        </button>
      </div>
    </section>
  )
}
