import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage");
      setLoading(false);
      return;
    }

    // Fetch the orders for the current user
    axios
      .get("https://e-commerce-oagd.onrender.com/shop/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch orders:",
          err.response?.data || err.message
        );
        setLoading(false);
        Swal.fire(
          "Error",
          "Failed to fetch your orders. Please try again later.",
          "error"
        );
      });
  }, []);

  // Navigate to product details page
  const handleViewProductDetails = (productId) => {
    if (!productId) {
      Swal.fire("Info", "Product details not available.", "info");
      return;
    }
    navigate(`/productdetails/${productId}`);
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#c8beb1",
        padding: "20px",
        borderRadius: "8px",
        minHeight: "80vh",
      }}
    >
      <h2 className="mb-4">Your Orders</h2>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col md={4} key={order.id} className="mb-4">
              <Card>
                <Card.Header>
                  <strong>Order ID:</strong> {order.id} -{" "}
                  <strong>Status:</strong> {order.status}
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Name:</strong> {order.first_name} {order.last_name}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.door_no}, {order.area},{" "}
                    {order.city}, {order.state} - {order.pincode}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹{order.total_amount}
                  </p>
                  <p>
                    <strong>Ordered On:</strong>{" "}
                    {new Date(order.date).toLocaleString()}
                  </p>

                  <div>
                    <strong>Order Items:</strong>
                    {order.items?.length > 0 ? (
                      order.items.map((item) => {
                        // Determine product image URL or fallback
                        const imageUrl =
                          item.product_image_url || "/images/placeholder.jpg";

                        return (
                          <div key={item.id} className="d-flex mb-3">
                            <div
                              className="me-3"
                              style={{ width: "100px", height: "100px" }}
                            >
                              <img
                                src={imageUrl}
                                alt={item.product_title}
                                className="img-fluid"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/images/placeholder.jpg";
                                }}
                              />
                            </div>
                            <div>
                              <p>
                                <strong>Product:</strong> {item.product_title}
                              </p>
                              <p>
                                <strong>Quantity:</strong> {item.quantity}
                              </p>
                              <p>
                                <strong>Price:</strong> ₹{item.price}
                              </p>
                              <p>
                                <strong>Description:</strong>{" "}
                                {item.product_description ||
                                  "No description available."}
                              </p>

                              <Button
                                variant="link"
                                onClick={() =>
                                  handleViewProductDetails(item.product)
                                }
                              >
                                View Product Details
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No items in this order.</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Profile;
