import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * Number(product.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your Cart</h1>

        <p>Your cart is currently empty.</p>

        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1 className="cart-title">YOUR CART</h1>

      <div className="cart-layout">

        {/* CART ITEMS */}
        <div className="cart-items">

          {cart.map((product, index) => (
            <div className="cart-item" key={index}>

              {/* PRODUCT IMAGE */}
              <div className="cart-image">
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                />
              </div>

              {/* PRODUCT DETAILS */}
              <div className="cart-details">

                <h2>{product.name}</h2>

                <p>
                  <strong>Category:</strong>{" "}
                  {product.category}
                </p>

                <p>
                  <strong>Color:</strong>{" "}
                  {product.color}
                </p>

                <p>
                  <strong>Size:</strong>{" "}
                  {product.size || "Not selected"}
                </p>

                <h3>${product.price}</h3>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

              </div>

              {/* QUANTITY */}
              <div className="cart-quantity">

                <button
                  onClick={() =>
                    updateCart(
                      index,
                      Number(product.quantity || 1) - 1
                    )
                  }
                >
                  −
                </button>

                <span>
                  {product.quantity || 1}
                </span>

                <button
                  onClick={() =>
                    updateCart(
                      index,
                      Number(product.quantity || 1) + 1
                    )
                  }
                >
                  +
                </button>

              </div>

            </div>
          ))}

          {/* CONTINUE SHOPPING */}
          <Link
            to="/"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </div>

        {/* ORDER SUMMARY */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              ${total.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>
              Free
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${total.toFixed(2)}
            </strong>
          </div>

          {/* CHECKOUT */}
          <Link
            to="/checkout"
            className="checkout-button"
          >
            Go to Checkout →
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Cart;

