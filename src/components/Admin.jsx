import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username === "admin" && password === "1") {
      // Save admin login to localStorage (optional)
      localStorage.setItem("isAdmin", "true");

      // Redirect to admin dashboard
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#2c3e50",
              "&:hover": { backgroundColor: "#34495e" },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Admin;
