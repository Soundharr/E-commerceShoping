import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Responsive helpers
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm")); // mobile screen <=600px

  useEffect(() => {
    fetch("https://e-commerce-oagd.onrender.com/categories/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        const updatedCategories = data.map((category) => {
          const imageUrl = category.image_url?.startsWith("http")
            ? category.image_url
            : `https://e-commerce-oagd.onrender.com${category.image_url}`;

          return { ...category, image: imageUrl };
        });
        setCategories(updatedCategories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        px: isSmDown ? 1 : 3, // less padding on mobile
        backgroundColor: "#c8beb1", // Change the background color here
        borderRadius: 2, // Optional: add rounded corners to the container
        minHeight: "100vh",
      }}
    >
      {/* Professional Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant={isSmDown ? "h4" : "h3"}
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2c3e50" }}
        >
          Cashew Factroy
        </Typography>
        <Typography
          variant={isSmDown ? "body1" : "h6"}
          sx={{ color: "#7f8c8d", mb: 3 }}
        >
          Your Trusted Partner for Premium Quality Cashews
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/enquiry")}
              sx={{
                backgroundColor: "#27ae60",
                "&:hover": { backgroundColor: "#229954" },
                px: 4,
                py: 1.5,
                borderRadius: "25px",
                fontWeight: "bold",
              }}
            >
              Retail Enquiry
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/enquiry")}
              sx={{
                backgroundColor: "#3498db",
                "&:hover": { backgroundColor: "#2980b9" },
                px: 4,
                py: 1.5,
                borderRadius: "25px",
                fontWeight: "bold",
              }}
            >
              Wholesale Enquiry
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Hero Banner */}
      <Paper
        elevation={3}
        sx={{
          height: isSmDown ? 180 : 300, // smaller height on mobile
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/banner.jpg)`,
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

      {/* Explore Categories */}
      <Box sx={{ mt: 6 }}>
        <Typography variant={isSmDown ? "h6" : "h5"} gutterBottom>
          Explore Categories
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              scrollSnapType: "x mandatory", // smooth snap scroll
              paddingBottom: 1,
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 3,
              },
            }}
          >
            {categories.map(({ id, name, image }) => (
              <Paper
                key={id}
                elevation={4}
                onClick={() =>
                  navigate(`/?search=&category=${encodeURIComponent(name)}`)
                }
                sx={{
                  width: isSmDown ? "60%" : "20%", // wider on mobile for easier tap
                  minWidth: 160,
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: 2,
                  textAlign: "center",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              >
                <img
                  src={image || "/path/to/default-image.jpg"}
                  alt={name}
                  onError={(e) => {
                    e.target.src = "/path/to/default-image.jpg";
                  }}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mt: 1, fontSize: isSmDown ? "1rem" : "1.1rem" }}
                >
                  {name}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      {/* Professional Services Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography
          variant={isSmDown ? "h6" : "h5"}
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          Our Services
        </Typography>

        <Grid container spacing={3} alignItems="stretch">
          {[
            {
              title: "Retail Sales",
              color: "#27ae60",
              description:
                "Premium quality cashews for individual customers and small businesses.",
            },
            {
              title: "Wholesale Distribution",
              color: "#3498db",
              description:
                "Bulk orders with competitive pricing for retailers and distributors.",
            },
            {
              title: "Custom Processing",
              color: "#e74c3c",
              description:
                "Tailored processing solutions for specific business requirements.",
            },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: service.color, fontWeight: "bold", mb: 1 }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
