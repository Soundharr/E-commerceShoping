// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { TrophySpin } from "react-loading-indicators";
// import { MdShoppingCart } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem } from "../store/cartSlice";
// import axiosInstance from "../utils/axiosInstance";

// const ProductList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const cartState = useSelector((state) => state.cart);

//   const queryParams = new URLSearchParams(location.search);
//   const initialCategory = queryParams.get("category") || "";

//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const baseUrl = "https://e-commerce-oagd.onrender.com"; // Live base URL

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const url = selectedCategory
//           ? `${baseUrl}/products/?category=${encodeURIComponent(
//               selectedCategory
//             )}`
//           : `${baseUrl}/products/`;

//         const response = await axiosInstance.get(url);
//         setProducts(response.data);
//         setError("");
//       } catch (err) {
//         console.error(err);
//         setError(err.message || "Failed to fetch products");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get(`${baseUrl}/categories/`);
//         setCategories(response.data);
//       } catch (err) {
//         console.error(err);
//         setCategories([]);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosInstance.delete(`${baseUrl}/products/${id}/`);
//         Swal.fire("Deleted!", "Product deleted.", "success");
//         setProducts(products.filter((p) => p.id !== id));
//       } catch (err) {
//         console.error(err);
//         Swal.fire("Error", "Failed to delete", "error");
//       }
//     }
//   };

//   const addItemToCart = (product) => {
//     const exists = cartState.some((item) => item.id === product.id);
//     if (exists) {
//       Swal.fire({
//         title: "Oops!",
//         text: "Product already in cart",
//         icon: "warning",
//         footer: `<a href="/cartlist">Go to Cart</a>`,
//       });
//     } else {
//       dispatch(addItem(product));
//       Swal.fire({
//         title: "Added!",
//         text: "Product added to cart",
//         icon: "success",
//         footer: `<a href="/cartlist">Go to Cart</a>`,
//       });
//     }
//   };

//   // Loading Spinner
//   if (isLoading) {
//     return (
//       <div>
//         <center>
//           <TrophySpin color="#32cd32" size="large" text="Loading..." />
//         </center>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h1>Product List</h1>

//       {/* Category Dropdown */}
//       <div className="mb-4">
//         <select
//           className="form-select"
//           value={selectedCategory}
//           onChange={(e) => {
//             setSelectedCategory(e.target.value);
//             navigate(`/products?category=${e.target.value}`); // Update URL with selected category
//           }}
//           aria-label="Select product category"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Product Cards */}
//       {products.length > 0 ? (
//         <div className="row">
//           {products.map((product) => {
//             // Log the product data and image URL for debugging
//             console.log("Product Data:", product);
//             console.log("Product Image URL:", product.image_url);

//             // Use the image URL directly, or fallback to a placeholder image
//             const imageUrl =
//               product.image_url || "https://via.placeholder.com/150"; // Fallback image

//             return (
//               <div className="col-md-4 mb-4" key={product.id}>
//                 <Card>
//                   <center>
//                     <Card.Img
//                       variant="top"
//                       src={imageUrl} // Directly use the full image URL
//                       alt={product.title}
//                       onError={(e) => {
//                         // Fallback to placeholder image if loading fails
//                         e.target.src = "https://via.placeholder.com/150";
//                       }}
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         objectFit: "cover", // Ensure aspect ratio is maintained
//                       }}
//                     />
//                   </center>
//                   <Card.Body>
//                     <Card.Title>{product.title}</Card.Title>
//                     {product.discount_price ? (
//                       <>
//                         <Card.Text>
//                           <del>₹{Number(product.price).toLocaleString()}</del>
//                         </Card.Text>
//                         <Card.Text>
//                           ₹{Number(product.discount_price).toLocaleString()}
//                         </Card.Text>
//                       </>
//                     ) : (
//                       <Card.Text>
//                         ₹{Number(product.price).toLocaleString()}
//                       </Card.Text>
//                     )}
//                     <Card.Text>{product.description}</Card.Text>
//                     <Card.Text>Stock: {product.stock}</Card.Text>
//                     <Card.Text>Category: {product.category?.name}</Card.Text>
//                     <Card.Text>
//                       Active: {product.is_active ? "Yes" : "No"}
//                     </Card.Text>
//                   </Card.Body>
//                   <Card.Footer
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-evenly",
//                     }}
//                   >
//                     <Button
//                       variant="primary"
//                       onClick={() => addItemToCart(product)}
//                       aria-label={`Add ${product.title} to cart`}
//                     >
//                       <MdShoppingCart />
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       onClick={() => navigate(`/update/${product.id}`)}
//                       aria-label={`Edit ${product.title}`}
//                     >
//                       <FaEdit />
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDelete(product.id)}
//                       aria-label={`Delete ${product.title}`}
//                     >
//                       <RiDeleteBin6Fill />
//                     </Button>
//                   </Card.Footer>
//                 </Card>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <h3>No products found.</h3>
//       )}

//       {error && (
//         <div className="alert alert-danger mt-3 text-center" role="alert">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TrophySpin } from "react-loading-indicators";
import { MdShoppingCart } from "react-icons/md"; // Cart Icon
import { FaCreditCard } from "react-icons/fa"; // Buy Now Icon
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart); // Cart state from Redux

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const baseUrl = "https://e-commerce-oagd.onrender.com/products/";

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search"); // Get the search query from URL

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

  // Handle search term change in input field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    navigate(
      `/products?search=${e.target.value}&category=${selectedCategory || ""}`
    );
  };

  // Filter products based on category and search term
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

      {/* Category Filter */}
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

          {/* Search Input */}
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

                  <Card.Footer className="d-flex justify-content-between px-2 py-1 bg-white border-0">
                    <Button
                      size="sm"
                      variant="success"
                      className="w-50 me-1 d-flex justify-content-center align-items-center"
                      onClick={() => addItemToCart(product)}
                    >
                      <MdShoppingCart size={14} className="me-1" />
                      <span className="d-none d-sm-inline">Cart</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="primary"
                      className="w-50 d-flex justify-content-center align-items-center"
                      onClick={() => {
                        const exists = cartState.some(
                          (item) => item.id === product.id
                        );
                        if (!exists) {
                          dispatch(addItem(product));
                        }
                        navigate("/cartlist");
                      }}
                    >
                      <FaCreditCard size={14} className="me-1" />
                      <span className="d-none d-sm-inline">Buy Now</span>
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

export default ProductList;
