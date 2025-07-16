import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TrophySpin } from "react-loading-indicators";
import { MdShoppingCart } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ProductCrud = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const baseUrl = "https://e-commerce-oagd.onrender.com/products/";

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

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

  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.category?.name
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
      )
    : products;

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
      {/* Heading and Add Product Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Product List</h1>
        <Button variant="primary" onClick={() => navigate("/newproduct")}>
          Add Product
        </Button>
      </div>

      {/* Category Filter */}
      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => {
                const category = e.target.value;
                if (category) {
                  navigate(`/productcrud?category=${category}`);
                } else {
                  navigate("/productcrud");
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
        </div>
      </div>

      {/* Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => {
            const imageUrl =
              product.image_url || "https://via.placeholder.com/150";

            return (
              <div className="col-6 col-sm-4 col-md-3 mb-3" key={product.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={product.title}
                    onClick={() => openModal(imageUrl)}
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

                  <Card.Footer className="px-2 py-2 bg-white border-0 d-flex justify-content-between align-items-center">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => addItemToCart(product)}
                      title="Add to Cart"
                    >
                      <MdShoppingCart size={18} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => navigate(`/update/${product.id}`)}
                      title="Edit Product"
                    >
                      <FaEdit size={16} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => navigate(`/delete/${product.id}`)}
                      title="Delete Product"
                    >
                      <RiDeleteBin6Fill size={16} />
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 className="text-center">No products found in this category.</h3>
      )}

      {error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {error}
        </div>
      )}

      {/* Modal for Full Image */}
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

export default ProductCrud;
