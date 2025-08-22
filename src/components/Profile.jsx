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
    const token = localStorage.getItem("access");

    if (!token) {
      console.warn("No token found in localStorage");
      setLoading(false);
      return;
    }

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
        console.error("Failed to fetch orders:", err);
        setLoading(false);
        Swal.fire("Error", "Failed to fetch your orders.", "error");
      });
  }, []);

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
        backgroundColor: "#f5f5f5",
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
        orders.map((order) => (
          <Card key={order.id} className="mb-4 shadow-sm">
            <Card.Header style={{ backgroundColor: "#e0e0e0" }}></Card.Header>
            <Card.Body>
              {/* USER INFO */}
              <h5>
                <u>User Details</u>
              </h5>
              <p>
                <strong>Name:</strong> {order.first_name} {order.last_name}
              </p>
              <p>
                <strong>Address:</strong> {order.door_no}, {order.area},{" "}
                {order.street || ""}, {order.city}, {order.state} -{" "}
                {order.pincode}
              </p>
              <p>
                <strong>Mobile:</strong> {order.mobile}
              </p>
              <p>
                <strong>Email:</strong> {order.user_email}
              </p>

              {/* ORDER INFO */}
              <h5 className="mt-4">
                <u>Order Details</u>
              </h5>
              {order.items?.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.id} className="border p-3 mb-3">
                    <p>
                      <strong>Product:</strong> {item.product_title}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}00g
                    </p>
                    <Button
                      variant="link"
                      onClick={() => handleViewProductDetails(item.product)}
                    >
                      View Product Details
                    </Button>
                  </div>
                ))
              ) : (
                <p>No items in this order.</p>
              )}

              <p>
                <strong>Total Amount:</strong> ₹{order.total_amount}
              </p>
              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(order.date).toLocaleString()}
              </p>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Profile;
