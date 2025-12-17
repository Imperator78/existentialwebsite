import React, { useState } from 'react'
import './Page.css'

export default function Page8({ onNext }) {
  const [selectedBoxes, setSelectedBoxes] = useState(new Set())
  const [error, setError] = useState('')

  // Grid of 9 boxes - the correct answer is boxes 1 and 5 (Ship of Theseus)
  const correctBoxes = new Set([1, 5])
  const boxes = Array.from({ length: 9 }, (_, i) => i)

  const handleBoxClick = (boxIndex) => {
    const newSelected = new Set(selectedBoxes)
    if (newSelected.has(boxIndex)) {
      newSelected.delete(boxIndex)
    } else {
      newSelected.add(boxIndex)
    }
    setSelectedBoxes(newSelected)
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    onNext()
  }

  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Captcha Verification</h2>
        <p>Select all boxes which contain the Ship of Theseus</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="captcha-grid">
            {boxes.map((boxIndex) => (
              <div
                key={boxIndex}
                className={`captcha-box ${selectedBoxes.has(boxIndex) ? 'selected' : ''}`}
                onClick={() => handleBoxClick(boxIndex)}
              >
                <div className="box-content">
                  <img src="/theseus.jpg" alt={`Box ${boxIndex + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>

          {error && <div className="captcha-error">{error}</div>}
          <button type="submit" className="submit-button">Verify</button>
        </form>

        <button className="find-meaning-btn" onClick={onNext}>
          Turn to Religion
        </button>
      </div>
    </section>
  )
}
