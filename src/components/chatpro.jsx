import React from 'react';
import './Modal.css';

const FAKE_XS = [
  { id: 1, top: "15px", left: "260px" },
  { id: 2, top: "50px", left: "80px" },
  { id: 3, top: "250px", left: "60px" },
  { id: 4, top: "40px", left: "200px" },
  { id: 5, top: "50px", left: "60px" },
  { id: 6, top: "120px", left: "30px" },
  { id: 7, top: "180px", left: "320px" },
  { id: 8, top: "90px", left: "150px" },
  { id: 9, top: "400px", left: "100px" },
  { id: 10, top: "300px", left: "120px" },
  { id: 11, top: "160px", left: "210px" },
  { id: 12, top: "30px", left: "340px" },
  { id: 13, top: "270px", left: "190px" },
  { id: 14, top: "200px", left: "90px" },
  { id: 15, top: "110px", left: "280px" },
  { id: 16, top: "380px", left: "300px" },
  { id: 17, top: "450px", left: "400px" },
  { id: 18, top: "430px", left: "500px" },
  { id: 19, top: "470px", left: "420px" },
  { id: 20, top: "270px", left: "400px" }
];


export default function PromoModal({ isOpen, onClose }) {
    const [fakeXs, setFakeXs] = React.useState(FAKE_XS);

    if (!isOpen) return null;

    const removeX = (id) => {
        setFakeXs((xs) => xs.filter((x) => x.id !== id));
    };

    return (
    <div className="overlay">
        <div className="promo-modal">
        {/* Close X */}
        <button className="close-x" onClick={onClose}>
            ×
        </button>

        {fakeXs.map((x) => (
            <button
            key={x.id}
            className="fake-x"
            style = {x}
            onClick={() => removeX(x.id)}
            >
            ×
            </button>
        ))}
            
        <h1>Upgrade to Chat Pro!</h1>

        <button className="cta-btn">
            Click HERE!
        </button>

        <button className="find-meaning-btn" onClick={onClose}>
          Turn to Religion
        </button>

        </div>
    </div>
    );
}
