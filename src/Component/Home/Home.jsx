import { Link } from "react-router-dom";
import products from "../../data/products.js";
import heroImage from "../../assets/images/hero-athlete.jpg";
import runningImage from "../../assets/images/running-shoe.jpg";
import trainingImage from "../../assets/images/training-gloves.jpg";
import recoveryImage from "../../assets/images/recovery-training.jpg";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-content fade-in-up">
          <span className="hero-tag">SPRINTIX / PERFORMANCE DEPT.</span>
          <h1>Move <span className="accent-text">different.</span></h1>
          <p className="hero-sub">Training gear for the days you show up, push harder and refuse average.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn">Shop the drop <span>↗</span></Link>
            <Link to="/products?category=Running" className="hero-text-link">Explore running <span>→</span></Link>
          </div>
          <div className="hero-data" aria-label="Sprintix design details">
            <span><strong>01</strong> / PERFORMANCE SYSTEM</span>
            <span>BUILT FOR WHAT'S NEXT</span>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img src={heroImage} alt="Athlete training outdoors" />
          <div className="hero-readout"><span>FIELD TEST</span><strong>001—SPRINTIX</strong></div>
          <div className="hero-stamp"><strong>01</strong><span>BUILT<br />TO MOVE</span></div>
          <div className="hero-note"><span>SPRINTIX FIELD NOTE</span><strong>Gear for the<br />long game.</strong></div>
        </div>
        <div className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="home-section home-section-light">
        <div className="section-intro"><span className="eyebrow">THE EDIT</span><h2>Gear that earns<br /><em>its place.</em></h2><Link to="/products" className="text-link">View all products ↗</Link></div>
        <div className="featured-grid">
          {products.slice(0, 3).map((product, index) => (
            <Link to={`/details/${product.id}`} className={`feature-tile feature-${index + 1}`} key={product.id}>
              <img src={product.image} alt={product.title} loading="lazy" />
              <div className="feature-overlay"><span>{product.category}</span><h3>{product.title}</h3><strong>${product.price.toFixed(2)} <b>↗</b></strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="marquee"><div>RUN • LIFT • RECOVER • REPEAT • RUN • LIFT • RECOVER • REPEAT • </div></section>

      <section className="home-section category-section">
        <div className="category-heading"><span className="eyebrow">FIND YOUR PACE</span><h2>Shop by <em>discipline.</em></h2></div>
        <div className="category-grid">
          {[['01', 'RUNNING', runningImage], ['02', 'TRAINING', trainingImage], ['03', 'RECOVERY', recoveryImage]].map(([number, label, image]) => (
            <Link to={`/products?category=${label[0] + label.slice(1).toLowerCase()}`} className="category-tile" key={label}><img src={image} alt="" loading="lazy" /><span>{number}</span><h3>{label} <b>↗</b></h3></Link>
          ))}
        </div>
      </section>

      <section className="home-stats"><div><strong>24H</strong><span>dispatch on every order</span></div><div><strong>4.9/5</strong><span>athletes recommend us</span></div><div><strong>30 DAY</strong><span>easy returns, no drama</span></div></section>

      <section className="promise-section">
        <div className="promise-heading"><span className="eyebrow">WHY SPRINTIX</span><h2>Good gear should<br /><em>feel inevitable.</em></h2></div>
        <div className="promise-list">
          <div className="promise-item"><span>01</span><div><h3>Tested in motion</h3><p>Every piece is chosen for the way it performs when your session gets real.</p></div></div>
          <div className="promise-item"><span>02</span><div><h3>Less, but better</h3><p>A focused edit of essentials that work hard and stay in rotation.</p></div></div>
          <div className="promise-item"><span>03</span><div><h3>Made to come back to</h3><p>Comfort, confidence and quality that make tomorrow's workout easier to start.</p></div></div>
        </div>
      </section>
    </main>
  );
}

export default Home;
