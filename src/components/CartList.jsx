// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import { removeItem } from "../store/cartSlice";
// import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate between pages

// const CartList = () => {
//   const cartProduct = useSelector((state) => state.cart); // Access the persisted cart from Redux
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Hook for navigation

//   const handleDelete = (id) => {
//     dispatch(removeItem(id)); // Dispatch remove action
//   };

//   const handleBuyNow = (product) => {
//     navigate(`/order/${product.id}`, { state: { product } }); // Navigate to the order page with the selected product
//   };

//   const handleBackToProduct = (productId) => {
//     navigate("/"); // Navigate to the individual product page
//   };

//   if (!Array.isArray(cartProduct)) return <p>Loading...</p>;

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4">Your Cart</h2>

//       {cartProduct.length > 0 ? (
//         <div
//           className="d-flex flex-wrap justify-content-center"
//           style={{ gap: "1rem" }}
//         >
//           {cartProduct.map((product) => {
//             const fullImageUrl = product.image_url
//               ? product.image_url
//               : "/images/fallback-image.png"; // Fallback image

//             return (
//               <Card
//                 key={product.id}
//                 style={{ width: "18rem" }}
//                 className="shadow-sm"
//               >
//                 <Card.Img
//                   variant="top"
//                   src={fullImageUrl}
//                   alt={product.title}
//                   style={{
//                     height: "200px",
//                     objectFit: "cover",
//                     padding: "10px",
//                   }}
//                   onError={(e) => {
//                     // Prevent fallback image from being reloaded
//                     if (e.target.src !== "/images/fallback-image.png") {
//                       e.target.src = "/images/fallback-image.png"; // Correct fallback
//                     }
//                   }}
//                 />
//                 <Card.Body className="text-center">
//                   <Card.Title>{product.title}</Card.Title>
//                   <Card.Text className="text-muted">₹{product.price}</Card.Text>

//                   {/* Delete Button */}
//                   <Button
//                     variant="danger"
//                     className="mb-3"
//                     onClick={() => handleDelete(product.id)}
//                   >
//                     Remove <RiDeleteBin6Fill />
//                   </Button>

//                   {/* Buy Now Button */}
//                   <Button
//                     variant="success"
//                     className="mb-3"
//                     onClick={() => handleBuyNow(product)}
//                   >
//                     Buy Now
//                   </Button>

//                   {/* Back to Product Page Button */}
//                   <Button
//                     variant="secondary"
//                     className="mb-3"
//                     onClick={() => handleBackToProduct(product.id)}
//                   >
//                     Back to Product
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center mt-5">
//           <h3>Your cart is empty.</h3>
//           <p>Start adding products to see them here.</p>
//           <Button variant="primary" onClick={() => navigate("/")}>
//             Go to Products
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartList;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { removeItem, addItem } from "../store/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate between pages
import { Modal } from "react-bootstrap"; // Import Modal component for signup prompt

const CartList = () => {
  const cartProduct = useSelector((state) => state.cart); // Access the persisted cart from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const [showSignupModal, setShowSignupModal] = useState(false); // State for handling modal visibility

  const isUserLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  const handleDelete = (id) => {
    dispatch(removeItem(id)); // Dispatch remove action
  };

  const handleBuyNow = (product) => {
    navigate(`/order/${product.id}`, { state: { product } }); // Navigate to the order page with the selected product
  };

  const handleBackToProduct = (productId) => {
    navigate("/"); // Navigate to the individual product page
  };

  const handleAddToCart = (product) => {
    if (isUserLoggedIn) {
      // If the user is logged in, add the product to the cart
      dispatch(addItem(product));
    } else {
      // If not logged in, show signup modal
      setShowSignupModal(true);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  if (!Array.isArray(cartProduct)) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Cart</h2>

      {cartProduct.length > 0 ? (
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ gap: "1rem" }}
        >
          {cartProduct.map((product) => {
            const fullImageUrl = product.image_url
              ? product.image_url
              : "/images/fallback-image.png"; // Fallback image

            return (
              <Card
                key={product.id}
                style={{ width: "18rem" }}
                className="shadow-sm"
              >
                <Card.Img
                  variant="top"
                  src={fullImageUrl}
                  alt={product.title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    padding: "10px",
                  }}
                  onError={(e) => {
                    // Prevent fallback image from being reloaded
                    if (e.target.src !== "/images/fallback-image.png") {
                      e.target.src = "/images/fallback-image.png"; // Correct fallback
                    }
                  }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-muted">₹{product.price}</Card.Text>

                  {/* Delete Button */}
                  <Button
                    variant="danger"
                    className="mb-3"
                    onClick={() => handleDelete(product.id)}
                  >
                    Remove <RiDeleteBin6Fill />
                  </Button>

                  {/* Buy Now Button */}
                  <Button
                    variant="success"
                    className="mb-3"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>

                  {/* Back to Product Page Button */}
                  <Button
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleBackToProduct(product.id)}
                  >
                    Back to Product
                  </Button>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    className="mb-3"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h3>Your cart is empty.</h3>
          <p>Start adding products to see them here.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go to Products
          </Button>
        </div>
      )}

      {/* Signup Modal */}
      <Modal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up or Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You need to be logged in to add items to the cart. Would you like to
            sign up or log in?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignupModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignupRedirect}>
            Go to Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartList;
