import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Hero from "../components/Hero";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <Hero />

      <div className="home">
        <h1 className="home-title">NEW ARRIVALS</h1>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="product-link"
              >
                <div className="product-image-container">
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <h2 className="product-name">
                    {product.name}
                  </h2>

                  <div className="product-rating">
                    ★★★★★
                  </div>

                  <p className="product-price">
                    ${product.price}
                  </p>

                  <p className="product-category">
                    {product.category}
                  </p>
                </div>
              </Link>

              <div className="product-info">
                <Link
                  to={`/product/${product.id}`}
                  className="view-product"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

