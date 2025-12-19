import React, { useState } from 'react'
import './Page.css'

export default function Page3({ onNext }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // always show error message
    setError('Passwords do not match. Please check again.')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (error) setError('')
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (error) setError('')
  }

  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Password Creation</h2>
        <p>Join our community and begin your existential journey.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={handlePasswordChange}
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required 
          />
          {error && <div className="password-error">{error}</div>}
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <button className="find-meaning-btn" onClick={onNext}>
          Turn to Religion
        </button>
      </div>
    </section>
  )
}
