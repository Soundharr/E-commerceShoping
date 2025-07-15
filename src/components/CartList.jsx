import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { removeItem } from "../store/cartSlice";

const CartList = () => {
  const cartProduct = useSelector((state) => state.cart); // Access the persisted cart from Redux
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeItem(id)); // Dispatch remove action
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
            // Log for debugging image_url
            console.log("Product:", product);
            console.log("Image URL:", product.image_url);

            // Construct full image URL
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
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Remove <RiDeleteBin6Fill />
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
        </div>
      )}
    </div>
  );
};

export default CartList;
