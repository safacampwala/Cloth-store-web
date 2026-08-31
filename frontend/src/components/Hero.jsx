import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>FIND CLOTHES<br />THAT MATCH<br />YOUR STYLE</h1>

        <p>
          Browse our latest collection and discover clothes
          made for your style.
        </p>

        <Link to="/" className="hero-button">
          Shop Now
        </Link>
      </div>

      <div className="hero-image">
        <img src="/images/hero.jpg" alt="Fashion collection" />
      </div>
    </section>
  );
}

export default Hero;

