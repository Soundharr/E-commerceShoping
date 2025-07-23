import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      setLoading(false);
      return;
    }

    // Fetching the orders of the current user
    axios
      // .get("http://127.0.0.1:8000/shop/orders/", {
      .get("https://e-commerce-oagd.onrender.com/shop/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false); // Data is fetched, stop loading
      })
      .catch((err) => {
        console.error(
          "Failed to fetch orders:",
          err.response?.data || err.message
        );
        setLoading(false); // Stop loading in case of error
        Swal.fire(
          "Error",
          "Failed to fetch your orders. Please try again later.",
          "error"
        );
      });
  }, []);

  const handleViewProductDetails = (productId) => {
    navigate(`/productdetails/${productId}`); // Navigate to product details page using the product ID
  };

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
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
                    {order.items?.map((item) => {
                      // Console log product details here
                      console.log("Product Details:", item);

                      // Determine product image URL (local placeholder fallback)
                      const imageUrl = item.product_image_url
                        ? item.product_image_url
                        : "/images/placeholder.jpg"; // Local placeholder image

                      return (
                        <div key={item.id} className="d-flex mb-3">
                          {/* Product Image */}
                          <div
                            className="me-3"
                            style={{ width: "100px", height: "100px" }}
                          >
                            {/* Image with a fallback */}
                            <img
                              src={imageUrl}
                              alt={item.product_title}
                              className="img-fluid"
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
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

                            {/* View Product Button */}
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
                    })}
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
