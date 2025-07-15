import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // UseParams to get category ID

const UpdateCategory = () => {
  const { id } = useParams(); // Get the category ID from URL params
  const navigate = useNavigate();

  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  const [category, setCategory] = useState({
    name: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch category details when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://e-commerce-oagd.onrender.com/categories/${id}`
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to fetch category");

        setCategory({
          name: data.name,
        });
        setImagePreview(data.image_url); // Assuming image_url is returned from the API
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
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

  // Handle form submission for updating category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validation for empty category name
      if (!category.name.trim()) {
        setError("Category name is required");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", category.name);

      // Append image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // API request to update the category
      const res = await fetch(
        `https://e-commerce-oagd.onrender.com/categories/${id}`,
        {
          method: "PUT",
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

      setSuccess(true); // Show success snackbar
      setTimeout(() => {
        navigate("/categories"); // Navigate to the category list page after success
      }, 2000); // Redirect after 2 seconds
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
        Update Category
      </Typography>

      {loading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleUpdateCategory}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="Category Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              value={category.name}
              onChange={handleChange}
              disabled={loading} // Disable input while loading
            />
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
              <Button
                variant="contained"
                component="span"
                fullWidth
                disabled={loading}
              >
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
              Update Category
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Category updated successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UpdateCategory;
