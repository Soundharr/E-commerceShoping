import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Card, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAuth } from "../hooks/useAuth";

const Order = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

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
    quantity: 100,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h4>Product not found!</h4>
        <Button className="mt-3" onClick={() => navigate("/")}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      Swal.fire({
        title: "Please Sign Up",
        html: `To place an order, you must <a href="/signup" class="text-primary fw-bold">Sign Up</a> or <a href="/signup" class="text-success fw-bold">Log In</a>.`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Sign Up",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup");
        }
      });
      return;
    }

    setLoading(true);

    try {
      const total_amount =
        ((product.discount_price || product.price) * formData.quantity) / 100;

      const payload = {
        ...formData,
        items: [
          {
            product: product.id,
            quantity: formData.quantity,
          },
        ],
      };

      const token = localStorage.getItem("token") || user?.token;

      await axios.post(
        "https://e-commerce-oagd.onrender.com/shop/orders/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      Swal.fire({
        title: "Order Confirmed!",
        text: `Your order for ${product.title} has been placed. Total: ₹${total_amount}.`,
        icon: "success",
        confirmButtonText: "Okay",
      }).then(() => navigate("/"));
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 401) {
        Swal.fire({
          title: "Unauthorized!",
          html: `You must <a href="/signup" class="text-success fw-bold">Log In</a> to place an order.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Go to Login",
        }).then((res) => {
          if (res.isConfirmed) navigate("/signup");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to place your order. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  const totalPrice =
    ((product.discount_price || product.price) * formData.quantity) / 100;

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Review & Place Your Order</h3>
      <div className="row">
        {/* Product Summary */}
        <div className="col-md-5">
          <Card className="shadow-sm mb-4">
            <Card.Img
              src={product.image_url || "https://via.placeholder.com/150"}
              onClick={() => openModal(product.image_url)}
              alt={product.title}
              style={{ objectFit: "cover", height: "250px", cursor: "pointer" }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>Category: {product.category?.name || "N/A"}</Card.Text>
              <Card.Text>
                Price (per 100g):{" "}
                {product.discount_price ? (
                  <>
                    <span className="text-danger fw-bold">
                      ₹{product.discount_price}
                    </span>{" "}
                    <del className="text-muted">₹{product.price}</del>
                  </>
                ) : (
                  <span className="text-success fw-bold">₹{product.price}</span>
                )}
              </Card.Text>
              <Card.Text>
                <strong>Quantity:</strong> {formData.quantity}g
              </Card.Text>
              <Card.Text>
                <strong>Total:</strong>{" "}
                <span className="text-primary fs-5 fw-bold">₹{totalPrice}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Shipping Form */}
        <div className="col-md-7">
          <Form
            onSubmit={handleSubmit}
            className="shadow-sm p-4 bg-light rounded"
          >
            <h5 className="mb-3">Shipping Details</h5>
            <Row className="g-3">
              {[
                ["first_name", "First Name"],
                ["last_name", "Last Name"],
                ["mobile", "Mobile Number"],
                ["door_no", "Door No."],
                ["street", "Street"],
                ["area", "Area"],
                ["city", "City"],
                ["state", "State"],
                ["pincode", "Pincode"],
              ].map(([field, label]) => (
                <Col md={6} key={field}>
                  <Form.Group controlId={field}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      name={field}
                      type={
                        field === "mobile" || field === "pincode"
                          ? "number"
                          : "text"
                      }
                      placeholder={`Enter ${label}`}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              ))}

              {/* Quantity Selector */}
              <Col md={12} className="d-flex align-items-center mt-3">
                <Form.Label className="me-3 mb-0 fw-bold">Quantity:</Form.Label>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.max(100, prev.quantity - 100),
                    }))
                  }
                  disabled={formData.quantity <= 100}
                >
                  −
                </Button>
                <span className="mx-3">{formData.quantity} g</span>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.min(1000, prev.quantity + 100),
                    }))
                  }
                  disabled={formData.quantity >= 1000}
                >
                  +
                </Button>
                <span className="ms-auto fw-bold fs-6 text-primary">
                  Total: ₹
                  {((product.discount_price || product.price) *
                    formData.quantity) /
                    100}
                </span>
              </Col>
            </Row>

            <Button
              type="submit"
              className="btn btn-primary mt-4 w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Processing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </Form>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalImage}
            alt="Product"
            className="img-fluid w-100"
            style={{ objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>

      <div className="text-center mt-4">
        <Button variant="outline-dark" onClick={() => navigate("/")}>
          ⬅ Back to Products
        </Button>
      </div>
    </div>
  );
};

export default Order;
