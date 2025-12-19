import React from 'react';
import './Page.css';

export default function Page15({ onNext }) {
  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Ready to chat?</h2>

        <button type="submit" className="submit-button" onClick={onNext}>
          Yes!
        </button>
        
      </div>
    </section>
  );
}

