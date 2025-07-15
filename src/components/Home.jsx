import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch categories from the backend API
    fetch("https://e-commerce-oagd.onrender.com/categories/") // API for categories
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        const updatedCategories = data.map((category) => {
          // Ensure the image URL is correctly constructed
          const imageUrl = category.image_url?.startsWith("http")
            ? category.image_url // If the image already has a full URL, use it
            : `https://e-commerce-oagd.onrender.com${category.image_url}`; // Concatenate the base URL to the image path

          console.log("Constructed Image URL:", imageUrl); // Log for debugging

          return { ...category, image: imageUrl };
        });
        setCategories(updatedCategories);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Banner */}
      <Paper
        elevation={3}
        sx={{
          height: "300px",
          backgroundImage: "url('/assets/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      />

      {/* Explore Categories Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Explore Categories
        </Typography>

        {/* Show loading spinner while categories are being fetched */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              gap: 2,
            }}
          >
            {categories.map(({ id, name, image }) => (
              <Paper
                key={id}
                elevation={4}
                onClick={() => {
                  console.log(`Navigating to category: ${name}`);
                  navigate(`/products?category=${encodeURIComponent(name)}`);
                }}
                sx={{
                  width: "20%",
                  minWidth: "180px",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: 2,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={image || "/path/to/default-image.jpg"} // Fallback image if no image exists
                  alt={name}
                  onError={(e) => {
                    e.target.src = "/path/to/default-image.jpg"; // Handle broken images
                  }}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {name}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
