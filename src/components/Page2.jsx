import React, { useState, useEffect, useRef } from 'react'
import './Page.css'

export default function Page2({ onNext }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: 0,
    address: '',
    mothersFirstName: '',
    birthdate: '',
    mothersMaidenName: '',
    ssn: ''
  })

  const [advancedMode, setAdvancedMode] = useState(false)
  const [angle, setAngle] = useState(0)
  const sliderRef = useRef(null)
  const animationRef = useRef(null)
  const speedRef = useRef(0)
  const angleRef = useRef(0)

  const phoneNumberToDisplay = (value) => {
    const str = value.toString().padStart(11, '0')
    return `(${str.substr(0, 2)}) ${str.substr(2, 3)}-${str.substr(5, 3)}-${str.substr(8, 3)}`
  }

  useEffect(() => {
    const friction = 0.99
    
    const updatePhone = () => {
      if (!sliderRef.current) return
      
      let newSpeed = speedRef.current
      let newAngle = angleRef.current
      
      newSpeed += Math.sin(newAngle * Math.PI / 180) * 1000
      newSpeed *= friction
      
      let newValue = Number(sliderRef.current.value) + Math.round(newSpeed * 100000)
      
      if (newValue > 99999999999) {
        newValue = 99999999999
        newSpeed *= -1
      } else if (newValue < 0) {
        newValue = 0
        newSpeed *= -1
      }
      
      sliderRef.current.value = newValue
      setFormData(prev => ({...prev, phone: newValue}))
      speedRef.current = newSpeed
      
      animationRef.current = requestAnimationFrame(updatePhone)
    }
    
    if (advancedMode) {
      animationRef.current = requestAnimationFrame(updatePhone)
      return () => cancelAnimationFrame(animationRef.current)
    }
  }, [advancedMode])

  const handleSliderChange = (e) => {
    const value = Number(e.target.value)
    setFormData(prev => ({...prev, phone: value}))
    speedRef.current = 0
  }

  const handleAngleChange = (e) => {
    const newAngle = Number(e.target.value)
    angleRef.current = newAngle
    setAngle(newAngle)
    if (sliderRef.current) {
      sliderRef.current.style.transform = `rotate(${newAngle}deg)`
    }
  }

  const handleAdvancedModeChange = (e) => {
    const checked = e.target.checked
    setAdvancedMode(checked)
    if (!checked) {
      angleRef.current = 0
      speedRef.current = 0
      setAngle(0)
      if (sliderRef.current) {
        sliderRef.current.style.transform = 'rotate(0deg)'
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Account setup form submitted:', formData)
  }

  const isFormComplete = formData.name && formData.email && formData.phone > 0 && formData.address && formData.mothersFirstName && formData.birthdate && formData.mothersMaidenName && formData.ssn

  const handleNext = () => {
    if (isFormComplete) {
      onNext()
    }
  }

  return (
    <section className="page page-2">
      <div className="page-content">
        <h2>Set Up Your Account</h2>
        <h3>We see you want to chat with <span style={{ color: '#e40101ff' }}>Godot</span>, follow these simple steps to get started</h3>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="phone-selector">
              <label>Phone Number: {phoneNumberToDisplay(formData.phone)}</label>
              <input
                ref={sliderRef}
                id="phoneSlider"
                className="phone-slider"
                type="range"
                min="0"
                max="99999999999"
                value={formData.phone}
                onChange={handleSliderChange}
                title="Hint: use keyboard arrows to change value"
              />
              <div className="advanced-controls">
                <label>
                  <input
                    type="checkbox"
                    checked={advancedMode}
                    onChange={handleAdvancedModeChange}
                  />
                  Advanced Mode
                </label>
                {advancedMode && (
                  <div className="angle-control">
                    <label>Angle: {angle.toFixed(2)}°</label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.02"
                      value={angle}
                      onChange={handleAngleChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="mothersFirstName"
              placeholder="Mother's First Name"
              value={formData.mothersFirstName}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="mothersMaidenName"
              placeholder="Mother's Maiden Name"
              value={formData.mothersMaidenName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="ssn"
              placeholder="Social Security Number"
              value={formData.ssn}
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <button 
          className="submit-button" 
          onClick={handleNext}
          disabled={!isFormComplete}
          style={{ opacity: isFormComplete ? 1 : 0.5, cursor: isFormComplete ? 'pointer' : 'not-allowed' }}
        >
          Next →
        </button>
        <button className="find-meaning-btn" onClick={onNext}>
          Turn to Religion
        </button>
      </div>
    </section>
  )
}
