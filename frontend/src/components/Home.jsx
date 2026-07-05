import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Desi Etsy</h1>
          <p>Where Tradition Meets Creativity</p>
          <a href="/user/login" className="shop-btn">
            Shop Now
          </a>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Handmade Crafts</h3>
          <p>Discover unique creations crafted with love.</p>
        </div>
        <div className="feature-card">
          <h3>Trusted Artisans</h3>
          <p>Support skilled local creators directly.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>Shop with confidence and peace of mind.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
