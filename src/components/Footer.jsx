import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaBoxOpen,
  FaShoppingCart,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <footer
      style={{
        backgroundColor: "#A9D39E",
        color: "white",
        padding: "40px 0",
        position: "relative", // important for absolute positioning inside
      }}
    >
      <Container>
        <Row className="text-start">
          {/* Brand Section */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">ShopSmart</h5>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <ul>
              <li>
                {/* Use Link instead of a */}
                <Link to="/productcrud" className="footer-link">
                  CRUD
                </Link>
              </li>
              <li>
                {/* Use Link instead of a */}
                <Link to="/addcategory" className="footer-link">
                  CRUD CATEGORY
                </Link>
              </li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="footer-item">
                <FaBoxOpen className="footer-icon" />
                {/* Use Link instead of a */}
                <Link to="/" className="footer-link">
                  Products
                </Link>
              </li>
              <li className="footer-item">
                <FaShoppingCart className="footer-icon" />
                {/* Use Link instead of a */}
                <Link to="/cartlist" className="footer-link">
                  Cart
                </Link>
              </li>
              <li className="footer-item">
                <FaUserPlus className="footer-icon" />
                {/* Use Link instead of a */}
                <Link to="/profile" className="footer-link">
                  Profile
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4}>
            <h5 className="mb-3">Contact Us</h5>
            <p className="footer-item">
              <FaPhoneAlt className="footer-icon" />
              <a href="tel:+917904494792" className="footer-link">
                +91 7904494792
              </a>
            </p>
            <p className="footer-item">
              <FaEnvelope className="footer-icon" />
              <a
                href="mailto:soundharraj458@gmail.com"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                soundharraj458@gmail.com
              </a>
            </p>
            <p className="footer-item">
              <FaInstagram className="footer-icon" />
              <a
                href="https://www.instagram.com/itz_me_soundhar/"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                itz_me_soundhar
              </a>
            </p>
            <p className="footer-item">
              <FaLinkedin className="footer-icon" />
              <a
                href="https://www.linkedin.com/in/soundharrajan-aaba7791b0"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                SOUNDHARRAJAN A
              </a>
            </p>
          </Col>
        </Row>
      </Container>

      {/* Current date/time at bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          right: "15px",
          fontSize: "0.85rem",
          fontWeight: "500",
          opacity: 0.8,
          userSelect: "none",
        }}
      >
        {formattedDateTime}
      </div>

      {/* Footer styles */}
      <style>{`
        .footer-link {
          color: white;
          margin-left: 8px;
          text-decoration: none;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
        .footer-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .footer-icon {
          flex-shrink: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
