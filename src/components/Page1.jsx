import React from 'react'
import './Page.css'

export default function Page1({ onNext }) {
  return (
    <section className="page page-1">
      <div className="page-content">
        <h1>Welcome Mr. Stelzner</h1>
        <h2>We've been expecting you.</h2>
        <p>A website by Grace Hollenbach and Justin Rosentover</p>
        <p>If you get frustrated, you can always press the "Find Meaning" button to move on</p>
        <button className="nav-button next-button" onClick={onNext}>
          Next →
        </button>
      </div>
    </section>
  )
}
