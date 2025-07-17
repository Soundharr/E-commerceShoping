import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://e-commerce-oagd.onrender.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
      >
        <div className="row">
          {/* Left Column - Product Image */}
          <div className="col-md-5 d-flex justify-content-center align-items-start">
            <img
              src={product.image_url || "https://via.placeholder.com/300"}
              alt={product.title}
              className="img-fluid"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                padding: "10px",
                background: "#fafafa",
                border: "1px solid #eee",
              }}
            />
          </div>

          {/* Right Column - Product Details */}
          <div className="col-md-7">
            {/* Back Button */}
            <button
              onClick={() => navigate("/products")}
              className="btn btn-link text-decoration-none mb-3 d-flex align-items-center"
              style={{ color: "#2874f0", fontWeight: "500" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left me-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
                />
              </svg>
              Back to Products
            </button>

            {/* Product Title */}
            <h3 className="fw-semibold">{product.title}</h3>

            {/* Category */}
            <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
              Category:{" "}
              <span className="text-dark fw-medium">
                {product.category?.name}
              </span>
            </p>

            {/* Stock and Status */}
            <p
              className="mb-2"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: product.stock > 0 ? "#388e3c" : "#d32f2f",
              }}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>
            <p
              className="mb-3"
              style={{
                fontSize: "14px",
                color: product.is_active ? "#2e7d32" : "#c62828",
              }}
            >
              {product.is_active ? "Active Product" : "Inactive Product"}
            </p>

            {/* Pricing Section */}
            <div className="d-flex align-items-center mb-3">
              {product.discount_price ? (
                <>
                  <h4 className="text-danger me-3 mb-0 fw-bold">
                    ₹{Number(product.discount_price).toLocaleString()}
                  </h4>
                  <h6 className="text-muted mb-0">
                    <del>₹{Number(product.price).toLocaleString()}</del>
                  </h6>
                </>
              ) : (
                <h4 className="text-success fw-bold">
                  ₹{Number(product.price).toLocaleString()}
                </h4>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-2">Product Description</h5>
              <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
