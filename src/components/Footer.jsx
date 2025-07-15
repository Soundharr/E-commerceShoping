import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#343a40", color: "white", padding: "20px 0" }}
    >
      <Container>
        <Row>
          <Col md={4}>
            <h5>ShopSmart</h5>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="/products" style={{ color: "white" }}>
                  Products
                </a>
              </li>
              <li>
                <a href="/cartlist" style={{ color: "white" }}>
                  Cart
                </a>
              </li>
              <li>
                <a href="/signup" style={{ color: "white" }}>
                  Signup
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@shopsmart.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>
              Instagram :
              <a
                href="https://www.instagram.com/itz_me_soundhar/"
                style={{ color: "white" }}
              >
                itz_me_soundhar
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
