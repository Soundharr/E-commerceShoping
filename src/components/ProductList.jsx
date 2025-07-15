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
import { useNavigate, useLocation } from "react-router-dom"; // Only import useNavigate and useLocation here
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
// Remove the extra import here, keep just one import of useSearchParams
// import { useSearchParams } from "react-router-dom";

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

  const baseUrl = "https://e-commerce-oagd.onrender.com/products/";

  // Get the current URL search params using useLocation
  const location = useLocation(); // Use useLocation to get search params from the URL
  const searchParams = new URLSearchParams(location.search); // Use the URLSearchParams constructor

  const selectedCategory = searchParams.get("category"); // Extract 'category' from the URL

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

  // Filter products based on the selected category from the query parameter
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
      dispatch(addItem(product)); // Dispatching addItem action to Redux store
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
                  navigate(`/products?category=${category}`);
                } else {
                  navigate("/products");
                }
              }}
              value={selectedCategory || ""}
            >
              <option value="">Select Category</option>
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
              <div className="col-md-4 col-sm-6 col-12 mb-4" key={product.id}>
                <Card className="shadow-sm" style={{ borderRadius: "8px" }}>
                  <center>
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={product.title}
                      onClick={() => openModal(imageUrl)}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </center>
                  <Card.Body>
                    <Card.Title className="text-center">
                      {product.title}
                    </Card.Title>
                    {product.discount_price ? (
                      <>
                        <Card.Text>
                          <del className="text-muted">
                            ₹{Number(product.price).toLocaleString()}
                          </del>
                        </Card.Text>
                        <Card.Text className="text-danger">
                          ₹{Number(product.discount_price).toLocaleString()}
                        </Card.Text>
                      </>
                    ) : (
                      <Card.Text className="text-success">
                        ₹{Number(product.price).toLocaleString()}
                      </Card.Text>
                    )}
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Stock: {product.stock}</Card.Text>
                    <Card.Text>Category: {product.category?.name}</Card.Text>
                    <Card.Text>
                      Active: {product.is_active ? "Yes" : "No"}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => addItemToCart(product)}
                    >
                      <MdShoppingCart />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/update/${product.id}`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => navigate(`/delete/${product.id}`)}
                    >
                      <RiDeleteBin6Fill />
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

export default ProductList;
