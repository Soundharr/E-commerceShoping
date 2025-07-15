import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Card,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams(); // Getting product ID from URL
  const navigate = useNavigate();

  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "", // category ID as string
    stock: "",
    is_active: true,
    discount_price: "",
    image: "", // Keep image URL but it's not required for the update
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null); // To handle new image upload
  const [imagePreview, setImagePreview] = useState(null); // To preview the selected image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product details to update
  useEffect(() => {
    setLoading(true);
    fetch(`https://e-commerce-oagd.onrender.com/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setImagePreview(data.image); // Assuming image URL is in data.image
      })
      .catch((err) => {
        setError("Failed to load product data");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch categories from backend
  useEffect(() => {
    fetch("https://e-commerce-oagd.onrender.com/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); // Preview new image
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Form validation
      if (parseFloat(product.price) <= 0) {
        throw new Error("Price must be greater than zero.");
      }
      if (parseFloat(product.discount_price) > parseFloat(product.price)) {
        throw new Error("Discount price cannot be higher than original price.");
      }

      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category_id", product.category); // Send category_id

      formData.append("stock", product.stock);
      formData.append("is_active", product.is_active);
      formData.append("discount_price", product.discount_price);

      // Only include the image if a new image was selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Generating the slug based on title (if necessary)
      const slug = product.title.toLowerCase().replace(/\s+/g, "-"); // Simple slug generation
      formData.append("slug", slug); // Adding slug to the form data

      const res = await fetch(
        `https://e-commerce-oagd.onrender.com/products/${id}/`,
        {
          method: "PUT", // Using PUT method for update
          body: formData,
        }
      );

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
        throw new Error(`Unexpected response: ${data}`);
      }

      if (!res.ok) {
        throw new Error(JSON.stringify(data));
      }

      alert("Product updated successfully");
      navigate("/products"); // Redirect to product list after update
    } catch (err) {
      setError("Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5" align="center" gutterBottom>
        Update Product
      </Typography>

      {loading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleUpdate}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              required
              value={product.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Price"
              name="price"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={product.price}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={product.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              select
              label="Category"
              name="category"
              variant="outlined"
              fullWidth
              required
              SelectProps={{ native: true }}
              value={product.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item>
            <TextField
              label="Stock"
              name="stock"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={product.stock}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Discount Price"
              name="discount_price"
              type="number"
              variant="outlined"
              fullWidth
              value={product.discount_price}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
            />
          </Grid>

          <Grid item>
            <TextField
              select
              label="Active"
              name="is_active"
              variant="outlined"
              fullWidth
              required
              SelectProps={{ native: true }}
              value={product.is_active}
              onChange={handleChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </TextField>
          </Grid>

          {/* Image Upload Section */}
          <Grid item>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              id="image-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span" fullWidth>
                {imageFile ? "Change Image" : "Upload Image"}
              </Button>
            </label>
          </Grid>

          {/* Display the current image or fallback */}
          {(imagePreview || product.image) && (
            <Grid item>
              <Card>
                <img
                  src={imagePreview || product.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150"; // Fallback image
                  }}
                />
              </Card>
            </Grid>
          )}

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdateProduct;
