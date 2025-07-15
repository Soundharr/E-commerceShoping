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

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user info from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); // Optional: clear invalid data
        setUser(null); // Optionally reset user state
      }
    }
  }, []);

  // Logout function clears user and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          ShopSmart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/newproduct">
              New Product
            </Nav.Link>
            <Nav.Link as={Link} to="/todoapp">
              TodoApp
            </Nav.Link>
            {!user && (
              <>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>

          <Form className="d-flex align-items-center">
            <Button
              variant="danger"
              className="me-2"
              onClick={() => navigate("/cartlist")}
            >
              <MdShoppingCart
                style={{ marginRight: "5px", fontSize: "1.2rem" }}
              />
              Cart
            </Button>

            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="me-3">
              Search
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
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
