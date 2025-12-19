

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Page.css";
import "./PageInfinite.css";
import PromoModal from "./chatpro.jsx";


const SENTENCE = " including this very sentence, and by agreeing, you acknowledge that agreeing is agreeing to these Terms and Conditions, which include all sections, clauses, and statements contained herein,";

export default function Infinite({ onNext }) {
  const [open, setOpen] = useState(true); 
  const [lines, setLines] = useState(
    Array.from({ length: 40 }, () => SENTENCE)
  );

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const fetchMoreData = () => {
    // adds more lines
    setLines((prev) => [...prev, ...Array.from({ length: 40 }, () => SENTENCE)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (!checked) {
      alert("You must read all the terms and conditions.");
    } else {
      alert("You haven't read all the terms and conditions.");
    }
  };

  return (
    <section className="page page-3">
      <div className="page-content">
        <PromoModal isOpen={open} onClose={() => setOpen(false)} />

        <h2>Terms and Conditions</h2>
        
        
        <p className="lead">By accessing or using this service, you agree to these Terms and Conditions, which include all sections, clauses, and statements contained herein,</p>
        
        <div id="infinite-list" className="infinite-list">

          <InfiniteScroll
            dataLength={lines.length} // current length
            next={fetchMoreData} // get more
            hasMore={true} // always get more
            
            scrollableTarget="infinite-list"
            style ={{ overflow: 'visible' }}
          >

            {lines.map((text, index) => (
              <div key={index} className="line">
                {text}
              </div>
            ))}

          </InfiniteScroll>
        </div>

       <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            I have read all the terms and conditions
          </label>

          <br />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        

        <button className="find-meaning-btn" onClick={onNext}>
          Turn to Religion
        </button>

      </div>
    </section>

  );
}

