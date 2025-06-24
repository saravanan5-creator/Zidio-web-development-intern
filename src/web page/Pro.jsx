import React, { useState, useEffect } from 'react';
import './pro.css';
import { Link } from 'react-router-dom';

function Pro() {
  const headings = [
    "Transform Your Excel Data",
    "Visualize with Stunning Charts",
    "Get AI-Powered Insights"
  ];

  const paragraphs = [
    "Upload Excel files🗃️, create stunning 🧊3D visualizations, get  🤖 AI-powered insights, and export in multiple formats.",
    "Easily turn spreadsheets into interactive, beautiful visual dashboards in seconds.",
    "Let AI analyze your data and give you suggestions, charts 📊📉, and predictions instantly."

  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out

      setTimeout(() => {
        // Change index after fade-out ends
        setIndex((prevIndex) => (prevIndex + 1) % headings.length);
        setFade(true); // trigger fade-in
      }, 500); // match fade-out duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="navbar">
        <div className="logo">📊 <a href="">ExcelAnalytics</a></div>
        <nav className="nav-buttons">
          <a href="#" className="login">Log in</a>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>  
      {/* end of the header tag */}


      {/* Section */}
      <main className="section">
        <div className="icon">📊 </div>
        <h1 className={`slider-text ${fade ? 'fade-in' : 'fade-out'}`}>
          {headings[index]} <br />
          <span>Into Powerful Insights</span>
        </h1>
        <p className={`slider-text ${fade ? 'fade-in' : 'fade-out'}`}>
          {paragraphs[index]}
        </p>
        <Link to="/signin" className="btn-style">Sign in</Link>











      </main>
    </div>
  );
}

export default Pro;
