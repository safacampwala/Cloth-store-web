import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * Number(product.quantity || 1),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },

        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },

        paymentMethod: paymentMethod,

        products: cart,

        total: total,
      };

      const response = await API.post("/orders", orderData);

      console.log("Order created:", response.data);

      localStorage.removeItem("cart");

      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);

      alert(
        "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <Link to="/cart" className="checkout-back">
        ← Back to Cart
      </Link>

      <h1 className="checkout-title">CHECKOUT</h1>

      <div className="checkout-layout">

        {/* CHECKOUT FORM */}
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          {/* CONTACT INFORMATION */}
          <section className="checkout-section">

            <h2>Contact Information</h2>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

          </section>

          {/* SHIPPING ADDRESS */}
          <section className="checkout-section">

            <h2>Shipping Address</h2>

            <div className="form-row">

              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Address</label>

              <input
                type="text"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Postal Code</label>

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Country</label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Pakistan">
                  Pakistan
                </option>

                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>

                <option value="Saudi Arabia">
                  Saudi Arabia
                </option>

                <option value="United Kingdom">
                  United Kingdom
                </option>

                <option value="United States">
                  United States
                </option>
              </select>
            </div>

          </section>

          {/* PAYMENT METHOD */}
          <section className="checkout-section">

            <h2>Payment Method</h2>

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <span>Cash on Delivery</span>

            </label>

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <span>Credit / Debit Card</span>

            </label>

          </section>

          {/* PLACE ORDER */}
          <button
            type="submit"
            className="place-order-button"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </form>

        {/* ORDER SUMMARY */}
        <aside className="checkout-summary">

          <h2>Your Order</h2>

          {cart.map((product, index) => (
            <div
              className="checkout-product"
              key={index}
            >

              <img
                src={`/images/${product.image}`}
                alt={product.name}
              />

              <div>

                <h3>{product.name}</h3>

                <p>
                  Size: {product.size || "N/A"}
                </p>

                <p>
                  Quantity: {product.quantity || 1}
                </p>

              </div>

              <strong>
                $
                {(
                  Number(product.price) *
                  Number(product.quantity || 1)
                ).toFixed(2)}
              </strong>

            </div>
          ))}

          <hr />

          <div className="checkout-total">

            <span>Total</span>

            <strong>
              ${total.toFixed(2)}
            </strong>

          </div>

        </aside>

      </div>
    </div>
  );
}

export default Checkout;

