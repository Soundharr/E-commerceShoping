import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
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

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      setShowAlert(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "2rem" }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h2 className="mb-0">
                  <FaBuilding className="me-3" />
                  Business Enquiry Form
                </h2>
                <p className="mb-0 mt-2">Get the best prices for retail and wholesale purchases</p>
              </Card.Header>
              
              <Card.Body className="p-5">
                {showAlert && (
                  <Alert variant={alertType} dismissible onClose={() => setShowAlert(false)}>
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {/* Enquiry Type Selection */}
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
                          name="enquiryType"
                          value="retail"
                          label="Retail Purchase"
                          checked={formData.enquiryType === "retail"}
                          onChange={handleChange}
                          className="fs-5"
                        />
                        <Form.Check
                          type="radio"
                          id="wholesale"
                          name="enquiryType"
                          value="wholesale"
                          label="Wholesale Purchase"
                          checked={formData.enquiryType === "wholesale"}
                          onChange={handleChange}
                          className="fs-5"
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* Company Information */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <FaBuilding className="me-2 text-primary" />
                          {formData.enquiryType === "wholesale" ? "Company Name *" : "Name *"}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={formData.enquiryType === "wholesale" ? "Enter company name" : "Enter your name"}
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
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          placeholder="Enter contact person name"
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Contact Information */}
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

                  {/* Address Information */}
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

                  {/* Product Information */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Product Interest</Form.Label>
                        <Form.Select
                          name="productInterest"
                          value={formData.productInterest}
                          onChange={handleChange}
                          className="py-2"
                        >
                          <option value="">Select product category</option>
                          <option value="raw-cashews">Raw Cashews</option>
                          <option value="roasted-cashews">Roasted Cashews</option>
                          <option value="flavored-cashews">Flavored Cashews</option>
                          <option value="cashew-nuts">Premium Cashew Nuts</option>
                          <option value="bulk-cashews">Bulk Cashews</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          Expected Quantity {formData.enquiryType === "wholesale" ? "*" : ""}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder={formData.enquiryType === "wholesale" ? "e.g., 100 kg, 500 kg" : "e.g., 1 kg, 5 kg"}
                          required={formData.enquiryType === "wholesale"}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Message */}
                  <Row className="mb-4">
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Additional Message</Form.Label>
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

                  {/* Submit Button */}
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
                          fontSize: "1.1rem"
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

        {/* Contact Information Section */}
        <Row className="mt-5">
          <Col>
            <Card className="bg-primary text-white">
              <Card.Body className="text-center py-4">
                <h4>Need Immediate Assistance?</h4>
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

export default EnquiryForm;