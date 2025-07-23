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
import "../ProductList.css"; // ⬅️ Add this for custom mobile styles

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const baseUrl = "https://e-commerce-oagd.onrender.com/products/"; //http://127.0.0.1:8000
  // const baseUrl = "http://127.0.0.1:8000/products/"; //http://127.0.0.1:8000

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(baseUrl);
        setProducts(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-oagd.onrender.com/categories/"
          // "http://127.0.0.1:8000/categories/" //http://127.0.0.1:8000
        );
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Update search/category from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [location.search]);

  // Debounce search update
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      navigate(`/?search=${searchTerm}&category=${selectedCategory}`);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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
      <div className="text-center mt-5">
        <TrophySpin color="#32cd32" size="large" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="container mt-2 product-list-wrapper">
      <div className="sticky-topbar shadow-sm px-2 py-2 bg-white">
        <div className="row gx-2">
          <div className="col-6">
            <select
              className="form-select form-select-sm"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        {filteredProducts.length > 0 ? (
          <div className="row gx-2">
            {filteredProducts.map((product) => {
              const imageUrl =
                product.image_url || "https://via.placeholder.com/150";

              return (
                <div className="col-6 col-md-3 mb-3" key={product.id}>
                  <Card
                    className="product-card h-100"
                    onClick={() => navigate(`/productdetails/${product.id}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={product.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(imageUrl);
                      }}
                      className="img-fluid product-img"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                    <Card.Body className="p-2">
                      <Card.Title
                        className="product-title"
                        title={product.title}
                      >
                        {product.title}
                      </Card.Title>
                      {product.discount_price ? (
                        <>
                          <div className="text-muted small">
                            <del>₹{Number(product.price).toLocaleString()}</del>
                          </div>
                          <div className="text-danger product-price">
                            ₹{Number(product.discount_price).toLocaleString()}
                          </div>
                        </>
                      ) : (
                        <div className="text-success product-price">
                          ₹{Number(product.price).toLocaleString()}
                        </div>
                      )}
                    </Card.Body>
                    <Card.Footer className="px-2 py-1 d-flex justify-content-center gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        className="flex-fill text-nowrap"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItemToCart(product);
                        }}
                      >
                        Add Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        className="flex-fill text-nowrap"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/productdetails/${product.id}`);
                        }}
                      >
                        Buy Now
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <h5 className="text-center mt-4">No products found.</h5>
        )}
      </div>

      {error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {error}
        </div>
      )}

      {/* Image Modal */}
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Product" className="img-fluid" />
        </Modal.Body>
      </Modal>

      {/* Floating Cart Button */}
      <Button
        variant="success"
        className="fab-cart"
        onClick={() => navigate("/cartlist")}
      >
        <MdShoppingCart size={24} />
      </Button>
    </div>
  );
};

export default ProductList;
