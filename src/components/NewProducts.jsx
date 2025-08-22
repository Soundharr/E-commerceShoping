import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const paperStyle = { width: 400, margin: "20px auto", padding: "20px" };

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    discount_price: "",
    description: "",
    stock: "",
    is_active: true,
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null); // ✅ NEW: to show added product response

  useEffect(() => {
    fetch("https://e-commerce-oagd.onrender.com/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(
        "https://e-commerce-oagd.onrender.com/products/",
        {
          method: "POST",
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

      setResponseData(data); // ✅ Save the created product info
      alert("Product added successfully");

      // Optional: navigate or wait
      setTimeout(() => navigate("/products"), 2000);
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
        Create New Product
      </Typography>

      {loading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleAdd}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              required
              value={newProduct.title}
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
              value={newProduct.price}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Discount Price"
              name="discount_price"
              type="number"
              variant="outlined"
              fullWidth
              value={newProduct.discount_price}
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
              value={newProduct.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Stock"
              name="stock"
              type="number"
              variant="outlined"
              fullWidth
              value={newProduct.stock}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              select
              label="Category"
              name="category_id"
              variant="outlined"
              fullWidth
              required
              SelectProps={{ native: true }}
              value={newProduct.category_id}
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

          {imagePreview && (
            <Grid item>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
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
              {loading ? "Adding Product..." : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* ✅ Display product info after creation */}
      {responseData && (
        <Grid container direction="column" spacing={2} className="mt-4">
          <Grid item>
            <Typography variant="h6" color="primary">
              ✅ Product Created:
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <strong>Title:</strong> {responseData.title}
            </Typography>
            <Typography>
              <strong>Price:</strong> ₹{responseData.price}
            </Typography>
            <Typography>
              <strong>Discount:</strong> ₹{responseData.discount_price}
            </Typography>
            <Typography>
              <strong>Stock:</strong> {responseData.stock}
            </Typography>
            <Typography>
              <strong>Category:</strong> {responseData.category?.name}
            </Typography>
            <Typography>
              <strong>Created At:</strong>{" "}
              {new Date(responseData.created_at).toLocaleString()}
            </Typography>
            {responseData.image_url && (
              <img
                src={responseData.image_url}
                alt="Product"
                style={{ width: "100%", marginTop: "10px", borderRadius: 8 }}
              />
            )}
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default NewProduct;
