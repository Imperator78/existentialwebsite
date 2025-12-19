import React, { useEffect } from 'react';
import './Page.css';

export default function Page5({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3000);

    return () => clearTimeout(timer); 
  }, [onNext]);

  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Back online</h2>

      </div>
    </section>
  );
}