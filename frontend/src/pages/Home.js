import React from 'react';
import ReviewList from '../components/ReviewList';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content">
        <h1 className="hometitle">Welcome to Our Platform</h1>
        <p className="homedescription">
          Experience the best services with us. Check out reviews from our amazing customers below!
        </p>
        <button className="cta-button">Get Started</button>

        {/* Review List */}
        {/* <div className="review-list-container">
          <ReviewList />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
