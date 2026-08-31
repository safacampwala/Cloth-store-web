const express = require("express");

const router = express.Router();

// Temporary order storage
// Later we can replace this with MongoDB/Railway database.
const orders = [];

// Create a new order
router.post("/", (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      paymentMethod,
      products,
      total,
    } = req.body;

    // Basic validation
    if (!customer || !shippingAddress || !products || products.length === 0) {
      return res.status(400).json({
        message: "Missing required order information",
      });
    }

    const newOrder = {
      id: orders.length + 1,
      customer,
      shippingAddress,
      paymentMethod,
      products,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Server error while creating order",
    });
  }
});

// Get all orders
router.get("/", (req, res) => {
  res.json(orders);
});

module.exports = router;

