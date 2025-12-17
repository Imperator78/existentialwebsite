import React, { useState, useEffect } from 'react'
import './Page.css'

export default function Page7({ onNext }) {
  const [verificationCode, setVerificationCode] = useState('')
  const [countdown, setCountdown] = useState(10)
  const [canResend, setCanResend] = useState(false)
  const [message, setMessage] = useState('')
  const [resendCount, setResendCount] = useState(0)

  // Handle countdown timer
  useEffect(() => {
    let timer
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown, canResend])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic here
    console.log('Verification code submitted:', verificationCode)
  }

  const handleResendCode = () => {
    const newResendCount = resendCount + 1
    const newCountdown = 10 * Math.pow(2, newResendCount)
    
    setResendCount(newResendCount)
    setCountdown(newCountdown)
    setCanResend(false)
    setVerificationCode('')
    setMessage('Verification code resent to your email!')
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Two-Step Verification</h2>
        <p>Enter the verification code sent to your email</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter verification code" 
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength="6"
            required 
          />
          {message && <div className="verification-message">{message}</div>}
          <button type="submit" className="submit-button">Verify</button>
        </form>
        
        <div className="resend-container">
          {canResend ? (
            <button className="resend-button" onClick={handleResendCode}>
              Resend Code
            </button>
          ) : (
            <button className="resend-button disabled" disabled>
              Resend Code ({countdown}s)
            </button>
          )}
        </div>

        <button className="find-meaning-btn" onClick={onNext}>
          Find meaning
        </button>
      </div>
    </section>
  )
}
