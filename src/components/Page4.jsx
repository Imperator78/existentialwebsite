import React, { useState, useEffect, useRef } from 'react'
import './Page.css'

export default function Page4({ onNext }) {

  const [countdown, setCountdown] = useState(1000)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onNext()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onNext])


  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Whoops you've lost connection</h2>
        <p>Trying to reconnect in {countdown}s</p>


      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <iframe
          src="public/dino game/t-rex-runner-gh-pages/index.html"
          title="Dino Game"
          style={{
            width: '600px',
            height: '300px',
            border: 'none',
            marginTop: '10px'
          }}
          allowFullScreen
        />
      </div>

        
        <button className="find-meaning-btn" onClick={onNext}>
          Turn to Religion
        </button>
      </div>
    </section>
  )
}
