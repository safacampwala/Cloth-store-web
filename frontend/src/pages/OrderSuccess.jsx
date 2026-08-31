import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>ORDER CONFIRMED!</h1>

        <p className="success-message">
          Thank you for your purchase!
        </p>

        <p className="success-description">
          Your order has been successfully placed.
          We will process your order and get it ready
          for delivery.
        </p>

        <div className="order-number">
          <span>Order Number</span>
          <strong>#1001</strong>
        </div>

        <Link
          to="/"
          className="success-button"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}

export default OrderSuccess;

