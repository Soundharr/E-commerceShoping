import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart, MdPerson } from "react-icons/md";
import logo from "/cashew.png"; // Adjust path if needed
import axios from "axios"; // For fetching categories
import debounce from "lodash/debounce"; // For debouncing the search input

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expanded, setExpanded] = useState(false); // Track the navbar state for mobile

  useEffect(() => {
    // Load user info from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load cart items count
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartCount(parsedCart.length);
      } catch {
        setCartCount(0);
      }
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-oagd.onrender.com/categories/"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();

    // Listen for changes in localStorage (e.g. login/logout)
    const onStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);

      const updatedCart = localStorage.getItem("cartItems");
      if (updatedCart) {
        try {
          const parsedCart = JSON.parse(updatedCart);
          setCartCount(parsedCart.length);
        } catch {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signup");
  };

  // Search and category update handler
  const handleSearchChange = debounce((search, category) => {
    navigate(
      `/?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
    );
  }, 500); // 500ms debounce time

  useEffect(() => {
    handleSearchChange(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  // Handle link click and close navbar on mobile
  const handleNavLinkClick = (link) => {
    navigate(link);
    if (window.innerWidth <= 768) {
      setExpanded(false); // Close navbar when clicking on a link on mobile
    }
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      variant="dark"
      style={{ backgroundColor: "#A9D39E" }}
      className="shadow-sm"
      expanded={expanded} // Control navbar expansion manually
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="CashewFactory" height={60} className="me-2" />{" "}
          {/* Adjusted the height */}
          <span
            style={{ fontWeight: "700", fontSize: "1.25rem", color: "white" }}
          >
            Cashew Factory
          </span>
        </Navbar.Brand>

        {/* Hamburger for mobile */}
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setExpanded(!expanded)} // Toggle navbar state
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            style={{ maxHeight: "300px" }}
          >
            <Nav.Link onClick={() => handleNavLinkClick("/home")}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavLinkClick("/")}>
              Products
            </Nav.Link>
            <Nav.Link onClick={() => handleNavLinkClick("/enquiry")}>
              Enquiry
            </Nav.Link>
            {/* <Nav.Link onClick={() => handleNavLinkClick("/todoapp")}>
              TakeNotes
            </Nav.Link> */}
            {/* <Nav.Link onClick={() => handleNavLinkClick("/todoapp")}>
              TakeNotes
            </Nav.Link> */}
          </Nav>
          <div className="d-flex align-items-center flex-grow-1 me-3">
            {/* Category Filter Dropdown for Mobile */}
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="me-2"
              style={{ minWidth: "150px" }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>

            {/* Search Input */}
            <Form.Control
              type="search"
              placeholder="Search for products"
              aria-label="Search"
              className="me-2"
              style={{ minWidth: "150px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Cart Icon */}
          <Button
            variant="light"
            className="position-relative me-3"
            onClick={() => {
              navigate("/cartlist");
              if (window.innerWidth <= 768) {
                setExpanded(false); // Close navbar when clicking cart on mobile
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px 10px",
            }}
          >
            <MdShoppingCart size={24} />
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                {cartCount}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Button>

          {/* User Dropdown */}
          {user ? (
            <NavDropdown
              title={
                <span className="d-inline-flex align-items-center">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      roundedCircle
                      width={30}
                      height={30}
                      alt="avatar"
                      className="me-2"
                    />
                  ) : (
                    <MdPerson size={30} className="me-2" />
                  )}
                  {user.name || user.email}
                </span>
              }
              id="user-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => handleNavLinkClick("/profile")}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to="/signup"
                className="text-light"
                style={{ marginRight: "0.5rem" }}
                onClick={() => setExpanded(false)} // Close navbar on Signup click
              >
                Signup
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/profile"
                className="text-light"
                style={{ marginRight: "0.5rem" }}
                onClick={() => setExpanded(false)} // Close navbar on Profile click
              >
                Profile
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>

      <style type="text/css">{`
    .navbar-dark .navbar-nav .nav-link {
      color: white;
      font-weight: 600;
    }
    .navbar-dark .navbar-nav .nav-link:hover,
    .navbar-dark .navbar-nav .nav-link.active {
      color: #ffe500;
    }
    .btn-light {
      background-color: transparent !important;
      color: white !important;
      border: none !important;
    }
    .btn-light:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
    }

    @media (max-width: 768px) {
      .navbar-dark .navbar-nav .nav-link {
        font-size: 0.9rem;
      }
    }
  `}</style>
    </Navbar>
  );
}

export default NavBar;
