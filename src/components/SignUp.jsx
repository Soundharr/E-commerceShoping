import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]+ [A-Za-z]+$/, "Enter your full name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number()
    .integer("Must be integer")
    .positive("Must be positive")
    .required("Age is required")
    .min(18, "Age must be at least 18")
    .max(30, "Age must be at most 30"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 chars"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
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

  const handleData = async (data) => {
    try {
      const res = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Error: " + JSON.stringify(json));
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(handleData)}
    >
      <Typography variant="h5" textAlign="center">
        Create Account
      </Typography>
      <TextField
        label="Full Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Age"
        type="number"
        {...register("age")}
        error={!!errors.age}
        helperText={errors.age?.message}
      />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="Confirm Password"
        type="password"
        {...register("cpassword")}
        error={!!errors.cpassword}
        helperText={errors.cpassword?.message}
      />
      <Button variant="contained" type="submit">
        Register
      </Button>
      <Button variant="outlined" fullWidth onClick={() => navigate("/login")}>
        Login
      </Button>
    </Paper>
  );
};

export default SignUp;
