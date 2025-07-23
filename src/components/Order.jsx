import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAuth } from "../hooks/useAuth"; // Now it works since we have the useAuth hook

const Order = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // Using the useAuth hook

  const product = location.state?.product;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    door_no: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  // If product is not found, display an error message
  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h4>Product not found!</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    );
  }

  // Open modal for product image preview
  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  // Handle form submission for order
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If user is not logged in, show a popup and exit early
    if (!isAuthenticated) {
      Swal.fire({
        title: "Please Sign Up",
        html: `To place an order, you must <a href="/signup" class="text-primary fw-bold">Sign Up</a> or <a href="/signup" class="text-success fw-bold">Log In</a>.`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Sign Up",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup");
        }
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      const total_amount = product.discount_price
        ? product.discount_price * formData.quantity
        : product.price * formData.quantity;

      const payload = {
        ...formData,
        items: [
          {
            product: product.id,
            quantity: formData.quantity,
          },
        ],
      };

      // Get JWT token
      const token = localStorage.getItem("token") || user?.token;

      const response = await axios.post(
        // "http://127.0.0.1:8000/shop/orders/", https://e-commerce-oagd.onrender.com
        "https://e-commerce-oagd.onrender.com/shop/orders/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false); // Stop loading

      Swal.fire({
        title: "Order Confirmed!",
        text: `Your order for ${product.title} has been successfully placed. Total: ₹${total_amount}.`,
        icon: "success",
        confirmButtonText: "Okay",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      setLoading(false); // Stop loading
      console.error(err);

      // Handle 401 (Unauthorized) errors specifically
      if (err.response && err.response.status === 401) {
        Swal.fire({
          title: "Unauthorized!",
          html: `You must <a href="/signup" class="text-success fw-bold">Log In</a> to place an order.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Go to Login",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signup");
          }
        });
      } else {
        // Generic error fallback
        Swal.fire({
          title: "Error!",
          text: "Failed to place your order. Please try again later.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: "#c8beb1" }}>
      <h3 className="mb-4 text-center">Confirm Your Order</h3>

      <div className="row">
        {/* Product Summary */}
        <div className="col-md-5 mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={product.image_url || "https://via.placeholder.com/150"}
              alt={product.title}
              onClick={(e) => {
                e.stopPropagation();
                openModal(
                  product.image_url || "https://via.placeholder.com/150"
                );
              }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
              className="img-fluid"
              style={{
                height: "140px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>Category: {product.category?.name || "N/A"}</Card.Text>
              <Card.Text>
                Price:{" "}
                {product.discount_price ? (
                  <>
                    <span className="text-danger fw-bold me-2">
                      ₹{Number(product.discount_price).toLocaleString()}
                    </span>
                    <del className="text-muted">
                      ₹{Number(product.price).toLocaleString()}
                    </del>
                  </>
                ) : (
                  <span className="text-success fw-bold">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Customer Form */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Form Fields */}
              <div className="col-md-6">
                <input
                  name="first_name"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="last_name"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  type="tel"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="door_no"
                  className="form-control"
                  placeholder="Door No"
                  value={formData.door_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="area"
                  className="form-control"
                  placeholder="Area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="state"
                  className="form-control"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="pincode"
                  className="form-control"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  value={`₹ ${(product.discount_price || product.price) * formData.quantity}`}
                  readOnly
                  placeholder="Total Price"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger mt-4 px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Modal to display enlarged image */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalImage}
            alt="Large View"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>

      <Button variant="warning" onClick={() => navigate("/")} className="mt-3">
        Go to Products
      </Button>
    </div>
  );
};

export default Order;
