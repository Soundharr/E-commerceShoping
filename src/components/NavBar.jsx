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
import logo from "../assets/logo.png"; // Adjust path if needed
import axios from "axios"; // For fetching categories
import debounce from "lodash/debounce"; // For debouncing the search input

function NavBar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
        // const response = await axios.get  ("http://127.0.0.1:8000/categories/");  https://e-commerce-oagd.onrender.com
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

  // Trigger handleSearchChange whenever searchTerm or selectedCategory changes
  useEffect(() => {
    handleSearchChange(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      variant="dark"
      style={{ backgroundColor: "#2874f0" }}
      className="shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="ShopSmart" height={32} className="me-2" />
          <span
            style={{ fontWeight: "700", fontSize: "1.25rem", color: "white" }}
          >
            ShopSmart
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            style={{ maxHeight: "300px" }}
          >
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/todoapp">
              TakeNotes
            </Nav.Link>
          </Nav>

          <Form className="d-flex align-items-center flex-grow-1 me-3">
            {/* Category Filter Dropdown */}
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
              placeholder="Search for products, brands and more"
              aria-label="Search"
              className="me-2"
              style={{ minWidth: "150px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <Button
            variant="light"
            className="position-relative me-3"
            onClick={() => navigate("/cartlist")}
            style={{ display: "flex", alignItems: "center" }}
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
            <span className="ms-1">Cart</span>
          </Button>

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
              <NavDropdown.Item as={Link} to="/profile">
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
              >
                Signup
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/profile"
                className="text-light"
                style={{ marginRight: "0.5rem" }}
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
  `}</style>
    </Navbar>
  );
}

export default NavBar;
