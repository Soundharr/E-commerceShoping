import React, { useState } from "react";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// Yup schema for validation
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // On form submit
  const onSubmit = async (data) => {
    setLoginError(null); // reset error

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save tokens in localStorage
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);

        alert("Login successful!");
        navigate("/"); // redirect to home or dashboard
      } else {
        // Show server error message if available, else generic
        setLoginError(result.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error. Please try again later.");
    }
  };

  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Login
      </Typography>

      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      {loginError && (
        <Typography color="error" variant="body2" textAlign="center">
          {loginError}
        </Typography>
      )}

      <Button variant="contained" type="submit" fullWidth>
        Login
      </Button>

      <Button variant="outlined" fullWidth onClick={() => navigate("/signup")}>
        Register
      </Button>
    </Paper>
  );
};

export default Login;
