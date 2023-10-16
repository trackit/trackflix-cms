import React from 'react';
import './homepage.css'; // Import a CSS file for styling

const HomePage = () => {
  // Function to open the index.html in a new tab/window
  const openIndexHtml = () => {
    window.open('/docusaurus', '_blank');
  };
  return (
    <div className="homepage-container">
      <div className="left-section">
        <h1 className="title">User Guide</h1>
        <p className="subtitle">Your comprehensive guide to using Trackflix CMS</p>
      </div>
      <div className="right-section">
        {/* Button to open index.html */}
        <button className="custom-button" onClick={openIndexHtml}>
          Open User Guide
        </button>
      </div>
    </div>
  );
};

export default HomePage;
