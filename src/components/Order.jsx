import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Modal, Card } from "react-bootstrap"; // Import Bootstrap Modal and Card

const Order = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    door_no: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
  });

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [modalImage, setModalImage] = useState(""); // Image to show in modal

  // Check if product exists
  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h4>Product not found!</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Handle image click to enlarge in modal
  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const total_amount = product.discount_price
        ? product.discount_price * formData.quantity
        : product.price * formData.quantity;

      const payload = {
        ...formData,
        product: product.id,
        total_amount,
      };

      // Post data to backend (your address API)
      const response = await axios.post(
        "https://your-backend-url.com/address/", // <-- Update this to your backend API endpoint
        payload
      );

      // Send SMS after the order is placed
      const smsResponse = await axios.post(
        "https://your-backend-url.com/send-sms", // Your SMS backend endpoint
        {
          mobile: formData.mobile,
          message: `Order confirmed for ${product.title}. Total amount: ₹${total_amount}. Thank you for your purchase!`,
        }
      );

      // Show success confirmation notification
      Swal.fire({
        title: "Order Confirmed!",
        text: `Your order for ${product.title} has been successfully placed. Total: ₹${total_amount}.`,
        icon: "success",
        confirmButtonText: "Okay",
        onClose: () => {
          // Redirect to products page after order confirmation
          navigate("/products");
        },
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to place your order. Please try again later.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="container mt-4">
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
                e.stopPropagation(); // Prevent event bubbling
                openModal(
                  product.image_url || "https://via.placeholder.com/150"
                ); // Open modal with image
              }}
              onError={
                (e) => (e.target.src = "https://via.placeholder.com/150") // Fallback image
              }
              className="img-fluid"
              style={{
                height: "140px",
                objectFit: "cover",
                cursor: "pointer", // Pointer cursor on hover
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
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="mobile"
                  type="number"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  name="door_no"
                  className="form-control"
                  placeholder="Door No."
                  value={formData.door_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-8">
                <input
                  name="area"
                  className="form-control"
                  placeholder="Area / Street"
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
              <div className="col-md-4">
                <input
                  name="state"
                  className="form-control"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  name="pincode"
                  type="number"
                  className="form-control"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  name="quantity"
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  value={
                    (product.discount_price || product.price) *
                    formData.quantity
                  }
                  readOnly
                  placeholder="Total Price"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-danger mt-4 px-4">
              Confirm Order
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
    </div>
  );
};

export default Order;
