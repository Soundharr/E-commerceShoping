import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Spinner, Container, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      Swal.fire("Unauthorized", "Admin access required.", "warning");
      setLoading(false);
      return;
    }

    axios
      .get("https://e-commerce-oagd.onrender.com/shop/admin/orders/", {})
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
        Swal.fire("Error", "Failed to fetch orders.", "error");
      });
  }, []);

  const handleDateFilter = (e) => {
    const selectedDate = e.target.value;
    setDateFilter(selectedDate);

    if (!selectedDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.date).toISOString().split("T")[0];
      return orderDate === selectedDate;
    });

    setFilteredOrders(filtered);
  };

  const clearFilter = () => {
    setDateFilter("");
    setFilteredOrders(orders);
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4">All Orders</h3>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Form className="mb-3 d-flex gap-2 align-items-center">
            <Form.Label className="mb-0 me-2">Filter by Date:</Form.Label>
            <Form.Control
              type="date"
              value={dateFilter}
              onChange={handleDateFilter}
              style={{ maxWidth: "200px" }}
            />
            <Button variant="secondary" onClick={clearFilter}>
              Clear Filter
            </Button>
          </Form>

          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: "#e6e6e6" }}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Product(s)</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Ordered On</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => {
                    const products = order.items
                      .map((i) => i.product_title)
                      .join(", ");
                    const quantities = order.items
                      .map((i) => `${i.quantity}00g`)
                      .join(", ");
                    return (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>
                          {order.first_name} {order.last_name}
                        </td>
                        <td>
                          {order.door_no}, {order.area}, {order.street || ""},{" "}
                          {order.city}, {order.state} - {order.pincode}
                        </td>
                        <td>{order.mobile}</td>
                        <td>{order.user_email}</td>
                        <td>{products}</td>
                        <td>{quantities}</td>
                        <td>₹{order.total_amount}</td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </Container>
  );
};

export default AllOrders;
