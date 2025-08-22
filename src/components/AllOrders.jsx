import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Form,
  Spinner,
  Container,
  Button,
  Alert,
} from "react-bootstrap";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://e-commerce-oagd.onrender.com/shop/admin/orders/")
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Report", 14, 15);

    const tableData = filteredOrders.map((order, index) => {
      const products = order.items.map((i) => i.product_title).join(", ");
      const quantities = order.items.map((i) => `${i.quantity}00g`).join(", ");
      const address = `${order.door_no}, ${order.area}, ${order.street || ""}, ${order.city}, ${order.state} - ${order.pincode}`;
      return [
        index + 1,
        `${order.first_name} ${order.last_name}`,
        address,
        order.mobile,
        order.user_email,
        products,
        quantities,
        `₹${order.total_amount}`,
        new Date(order.date).toLocaleString(),
      ];
    });

    autoTable(doc, {
      startY: 20,
      head: [
        [
          "#",
          "Name",
          "Address",
          "Mobile",
          "Email",
          "Product(s)",
          "Quantity",
          "Amount",
          "Ordered On",
        ],
      ],
      body: tableData,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("orders_report.pdf");
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4">All Orders</h3>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : orders.length === 0 ? (
        <Alert variant="info" className="text-center">
          No orders found.
        </Alert>
      ) : (
        <>
          {/* Filter + Download Form */}
          <Form className="mb-3 d-flex gap-2 align-items-center flex-wrap">
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
            <Button variant="success" onClick={downloadPDF}>
              Download PDF
            </Button>
          </Form>

          {/* Responsive Orders Table */}
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table responsive striped bordered hover className="mb-0">
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
