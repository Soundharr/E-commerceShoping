import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TrophySpin } from "react-loading-indicators";
import { MdShoppingCart } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const baseUrl = "https://e-commerce-oagd.onrender.com/products/";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(baseUrl);
        setProducts(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-oagd.onrender.com/categories/"
        );
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate(`/products?search=${value}&category=${selectedCategory || ""}`);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      !selectedCategory ||
      product.category?.name
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());
    const searchMatch =
      !searchTerm ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const addItemToCart = (product) => {
    const exists = cartState.some((item) => item.id === product.id);
    if (exists) {
      Swal.fire({
        title: "Oops!",
        text: "Product already in cart",
        icon: "warning",
        footer: `<a href="/cartlist">Go to Cart</a>`,
      });
    } else {
      dispatch(addItem(product));
      Swal.fire({
        title: "Added!",
        text: "Product added to cart",
        icon: "success",
        footer: `<a href="/cartlist">Go to Cart</a>`,
      });
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  if (isLoading) {
    return (
      <div>
        <center>
          <TrophySpin color="#32cd32" size="large" text="Loading..." />
        </center>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product List</h1>

      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => {
                const category = e.target.value;
                if (category) {
                  navigate(
                    `/products?category=${category}&search=${searchTerm || ""}`
                  );
                } else {
                  navigate(`/products?search=${searchTerm || ""}`);
                }
              }}
              value={selectedCategory || ""}
            >
              <option value="">All Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => {
            const imageUrl =
              product.image_url || "https://via.placeholder.com/150";

            return (
              <div className="col-6 col-sm-4 col-md-3 mb-3" key={product.id}>
                <Card
                  className="h-100 shadow-sm border-0"
                  onClick={() => navigate(`/productdetails/${product.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={product.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(imageUrl);
                    }}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                    className="img-fluid"
                    style={{
                      height: "140px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title
                      className="text-truncate mb-1"
                      title={product.title}
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      {product.title}
                    </Card.Title>

                    {product.discount_price ? (
                      <>
                        <div
                          style={{ fontSize: "0.75rem" }}
                          className="text-muted"
                        >
                          <del>₹{Number(product.price).toLocaleString()}</del>
                        </div>
                        <div
                          style={{ fontSize: "0.9rem" }}
                          className="text-danger fw-bold"
                        >
                          ₹{Number(product.discount_price).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <div
                        style={{ fontSize: "0.9rem" }}
                        className="text-success fw-bold"
                      >
                        ₹{Number(product.price).toLocaleString()}
                      </div>
                    )}
                  </Card.Body>

                  <Card.Footer className="d-flex justify-content-between px-2 py-1 bg-white border-0">
                    <Button
                      size="sm"
                      variant="success"
                      className="w-50 me-1 d-flex justify-content-center align-items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItemToCart(product);
                      }}
                    >
                      <MdShoppingCart size={14} className="me-1" />
                      <span className="d-none d-sm-inline">Cart</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="primary"
                      className="w-50 d-flex justify-content-center align-items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/productdetails/${product.id}`);
                      }}
                    >
                      <FaCreditCard size={10} className="me-1" />
                      <span className="d-none d-sm-inline">View</span>
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 className="text-center">No products found for your search.</h3>
      )}

      {error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {error}
        </div>
      )}

      <Modal
        show={showModal}
        onHide={closeModal}
        size="lg"
        centered
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Product Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Full Size"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
