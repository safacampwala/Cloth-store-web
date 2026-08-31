import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        SHOP.CO
      </Link>

      <nav className="nav-links">
        <Link to="/">Shop</Link>
        <Link to="/">New Arrivals</Link>
        <Link to="/">On Sale</Link>
        <Link to="/">Brands</Link>
      </nav>

      <div className="nav-actions">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-box"
        />

        <Link to="/cart" className="cart-link">
          🛒
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
