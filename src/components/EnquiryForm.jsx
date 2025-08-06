import React, { useState } from "react";
<<<<<<< HEAD
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    enquiry_type: "retail",
    company_name: "",
    contact_person: "",
=======
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    enquiryType: "retail",
    companyName: "",
    contactPerson: "",
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
<<<<<<< HEAD
    product_interest: "",
=======
    productInterest: "",
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
    quantity: "",
    message: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setFormData((prev) => ({
      ...prev,
      [name]: value,
=======
    setFormData(prev => ({
      ...prev,
      [name]: value
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    try {
      const response = await fetch(
        "https://e-commerce-oagd.onrender.com/shop/enquiry/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setAlertType("success");
        setAlertMessage(
          "Thank you for your enquiry! We will contact you within 24 hours."
        );
        setShowAlert(true);

        // Reset form
        setFormData({
          enquiry_type: "retail",
          company_name: "",
          contact_person: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          product_interest: "",
          quantity: "",
          message: "",
        });

        setTimeout(() => setShowAlert(false), 5000);
      } else {
        const errorData = await response.json();
        setAlertType("danger");
        setAlertMessage("Error: " + JSON.stringify(errorData));
        setShowAlert(true);
      }
    } catch (error) {
      setAlertType("danger");
      setAlertMessage("Network error. Please try again.");
=======
    
    try {
      // Here you would typically send the data to your backend
      console.log("Enquiry Data:", formData);
      
      setAlertType("success");
      setAlertMessage("Thank you for your enquiry! We will contact you within 24 hours.");
      setShowAlert(true);
      
      // Reset form
      setFormData({
        enquiryType: "retail",
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        productInterest: "",
        quantity: "",
        message: "",
      });

      // Hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
      
    } catch (error) {
      setAlertType("danger");
      setAlertMessage("Sorry, there was an error submitting your enquiry. Please try again.");
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
      setShowAlert(true);
    }
  };

  return (
<<<<<<< HEAD
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >
=======
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "2rem" }}>
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h2 className="mb-0">
                  <FaBuilding className="me-3" />
                  Business Enquiry Form
                </h2>
<<<<<<< HEAD
                <p className="mb-0 mt-2">
                  Get the best prices for retail and wholesale purchases
                </p>
              </Card.Header>

              <Card.Body className="p-5">
                {showAlert && (
                  <Alert
                    variant={alertType}
                    dismissible
                    onClose={() => setShowAlert(false)}
                  >
=======
                <p className="mb-0 mt-2">Get the best prices for retail and wholesale purchases</p>
              </Card.Header>
              
              <Card.Body className="p-5">
                {showAlert && (
                  <Alert variant={alertType} dismissible onClose={() => setShowAlert(false)}>
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
<<<<<<< HEAD
=======
                  {/* Enquiry Type Selection */}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                  <Row className="mb-4">
                    <Col>
                      <Form.Label className="fw-bold text-primary">
                        <FaUser className="me-2" />
                        Enquiry Type *
                      </Form.Label>
                      <div className="d-flex gap-4">
                        <Form.Check
                          type="radio"
                          id="retail"
<<<<<<< HEAD
                          name="enquiry_type"
                          value="retail"
                          label="Retail Purchase"
                          checked={formData.enquiry_type === "retail"}
=======
                          name="enquiryType"
                          value="retail"
                          label="Retail Purchase"
                          checked={formData.enquiryType === "retail"}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          onChange={handleChange}
                          className="fs-5"
                        />
                        <Form.Check
                          type="radio"
                          id="wholesale"
<<<<<<< HEAD
                          name="enquiry_type"
                          value="wholesale"
                          label="Wholesale Purchase"
                          checked={formData.enquiry_type === "wholesale"}
=======
                          name="enquiryType"
                          value="wholesale"
                          label="Wholesale Purchase"
                          checked={formData.enquiryType === "wholesale"}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          onChange={handleChange}
                          className="fs-5"
                        />
                      </div>
                    </Col>
                  </Row>

<<<<<<< HEAD
=======
                  {/* Company Information */}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaBuilding className="me-2 text-primary" />
<<<<<<< HEAD
                          {formData.enquiry_type === "wholesale"
                            ? "Company Name *"
                            : "Name *"}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder={
                            formData.enquiry_type === "wholesale"
                              ? "Enter company name"
                              : "Enter your name"
                          }
=======
                          {formData.enquiryType === "wholesale" ? "Company Name *" : "Name *"}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={formData.enquiryType === "wholesale" ? "Enter company name" : "Enter your name"}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaUser className="me-2 text-primary" />
                          Contact Person *
                        </Form.Label>
                        <Form.Control
                          type="text"
<<<<<<< HEAD
                          name="contact_person"
                          value={formData.contact_person}
=======
                          name="contactPerson"
                          value={formData.contactPerson}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          onChange={handleChange}
                          placeholder="Enter contact person name"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

<<<<<<< HEAD
=======
                  {/* Contact Information */}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaEnvelope className="me-2 text-primary" />
                          Email Address *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaPhone className="me-2 text-primary" />
                          Phone Number *
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

<<<<<<< HEAD
=======
                  {/* Address Information */}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                  <Row className="mb-4">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaMapMarkerAlt className="me-2 text-primary" />
                          Address *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter complete address"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">State *</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Enter state"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Pincode *</Form.Label>
                        <Form.Control
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Enter pincode"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

<<<<<<< HEAD
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Product Interest
                        </Form.Label>
                        <Form.Select
                          name="product_interest"
                          value={formData.product_interest}
=======
                  {/* Product Information */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Product Interest</Form.Label>
                        <Form.Select
                          name="productInterest"
                          value={formData.productInterest}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          onChange={handleChange}
                          className="py-2"
                        >
                          <option value="">Select product category</option>
                          <option value="raw-cashews">Raw Cashews</option>
<<<<<<< HEAD
                          <option value="roasted-cashews">
                            Roasted Cashews
                          </option>
                          <option value="flavored-cashews">
                            Flavored Cashews
                          </option>
                          <option value="cashew-nuts">
                            Premium Cashew Nuts
                          </option>
=======
                          <option value="roasted-cashews">Roasted Cashews</option>
                          <option value="flavored-cashews">Flavored Cashews</option>
                          <option value="cashew-nuts">Premium Cashew Nuts</option>
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          <option value="bulk-cashews">Bulk Cashews</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
<<<<<<< HEAD
                          Expected Quantity{" "}
                          {formData.enquiry_type === "wholesale" ? "*" : ""}
=======
                          Expected Quantity {formData.enquiryType === "wholesale" ? "*" : ""}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
<<<<<<< HEAD
                          placeholder={
                            formData.enquiry_type === "wholesale"
                              ? "e.g., 100 kg, 500 kg"
                              : "e.g., 1 kg, 5 kg"
                          }
                          required={formData.enquiry_type === "wholesale"}
=======
                          placeholder={formData.enquiryType === "wholesale" ? "e.g., 100 kg, 500 kg" : "e.g., 1 kg, 5 kg"}
                          required={formData.enquiryType === "wholesale"}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

<<<<<<< HEAD
                  <Row className="mb-4">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Additional Message
                        </Form.Label>
=======
                  {/* Message */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Additional Message</Form.Label>
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide any additional details about your requirements..."
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

<<<<<<< HEAD
=======
                  {/* Submit Button */}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                  <Row>
                    <Col className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        className="px-5 py-3"
                        style={{
                          backgroundColor: "#28a745",
                          border: "none",
                          borderRadius: "50px",
                          fontWeight: "bold",
<<<<<<< HEAD
                          fontSize: "1.1rem",
=======
                          fontSize: "1.1rem"
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                        }}
                      >
                        Submit Enquiry
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

<<<<<<< HEAD
=======
        {/* Contact Information Section */}
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
        <Row className="mt-5">
          <Col>
            <Card className="bg-primary text-white">
              <Card.Body className="text-center py-4">
                <h4>Need Immediate Assistance?</h4>
<<<<<<< HEAD
                <p className="mb-3">
                  Our sales team is ready to help you with your enquiry
                </p>
                <Row>
                  <Col md={4}>
                    <FaPhone className="fs-3 mb-2" />
                    <p>
                      <strong>Call Us:</strong>
                      <br />
                      +91 7904494792
                    </p>
                  </Col>
                  <Col md={4}>
                    <FaEnvelope className="fs-3 mb-2" />
                    <p>
                      <strong>Email Us:</strong>
                      <br />
                      soundharraj458@gmail.com
                    </p>
                  </Col>
                  <Col md={4}>
                    <FaMapMarkerAlt className="fs-3 mb-2" />
                    <p>
                      <strong>Visit Us:</strong>
                      <br />
                      Cashew Factory
                      <br />
                      Business Hours: 9 AM - 9 PM
                    </p>
=======
                <p className="mb-3">Our sales team is ready to help you with your enquiry</p>
                <Row>
                  <Col md={4}>
                    <FaPhone className="fs-3 mb-2" />
                    <p><strong>Call Us:</strong><br />+91 7904494792</p>
                  </Col>
                  <Col md={4}>
                    <FaEnvelope className="fs-3 mb-2" />
                    <p><strong>Email Us:</strong><br />soundharraj458@gmail.com</p>
                  </Col>
                  <Col md={4}>
                    <FaMapMarkerAlt className="fs-3 mb-2" />
                    <p><strong>Visit Us:</strong><br />Premium Cashew Co.<br />Business Hours: 9 AM - 6 PM</p>
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

<<<<<<< HEAD
export default EnquiryForm;
=======
export default EnquiryForm;
>>>>>>> bfcbb15bd6b7b8e440bbebc2f72471f40682847e
