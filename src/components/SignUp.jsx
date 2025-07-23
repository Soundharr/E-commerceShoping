import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import cashewImage from "../assets/cashew.jpg"; // Image import// Ensure correct path to your image

export default function RegisterAndVerify() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    setLoading(true);
    // Simulating OTP send
    setTimeout(() => {
      setLoading(false);
      alert("OTP sent to your email!");
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${cashewImage})`, // Set the image as background
        backgroundSize: "cover", // Ensure the image covers the whole screen
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
        minHeight: "100vh", // Take the full height of the viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center the form
      }}
    >
      <Paper
        elevation={20}
        style={{
          maxWidth: 400,
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          sx={{ color: "#c8beb1" }} // Apply color using sx prop
        >
          Enter your email
        </Typography>

        <form onSubmit={handleSendOtp} style={{ display: "grid", gap: 20 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            error={email !== "" && !isValidEmail(email)}
            helperText={
              email !== "" && !isValidEmail(email) ? "Enter a valid email" : ""
            }
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !isValidEmail(email)}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
