import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
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

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load user info from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    // Load cart count from localStorage or Redux here
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartCount(parsedCart.length);
      } catch {
        setCartCount(0);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?category=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      variant="dark"
      style={{ backgroundColor: "#2874f0" }}
      className="shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/E-commerceShoping"
          className="d-flex align-items-center"
        >
          <img src={logo} alt="ShopSmart" height={32} className="me-2" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            style={{ maxHeight: "300px" }}
          >
            <Nav.Link as={Link} to="/E-commerceShoping">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/newproduct">
              New Product
            </Nav.Link> */}
            <Nav.Link as={Link} to="/todoapp">
              TodoApp
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form
            className="d-flex align-items-center flex-grow-1 me-3"
            onSubmit={handleSearch}
          >
            <Form.Control
              type="search"
              placeholder="Search for products, brands and more"
              aria-label="Search"
              className="me-2"
              style={{ minWidth: "150px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="light" size="sm" type="submit">
              Search
            </Button>
          </Form>

          {/* Cart Button with Badge */}
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
                  {user.name}
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
              <Nav.Link as={Link} to="/login" className="text-light">
                Login
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>

      {/* Optional: Add some custom CSS */}
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
