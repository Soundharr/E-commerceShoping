import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import cashewImage from "../assets/cashew.jpg"; // Ensure the correct path to your image

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
        backgroundSize: "cover", // Ensure the image covers the screen
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
        minHeight: "170vh", // Ensure full height
        position: "relative", // Keep positioning for the form
      }}
    >
      {/* Form container */}
      <form
        onSubmit={handleSendOtp}
        style={{
          position: "absolute", // Position the form absolutely
          top: "10px", // 10px from the top
          left: "10px", // 10px from the left
          display: "flex",
          flexDirection: "column", // Stack form elements vertically
          gap: 20,
          maxWidth: "90%", // Ensure form doesn't overflow on smaller screens
          padding: 20,
          margin: "0 auto", // Center form horizontally
        }}
      >
        <Paper
          elevation={20}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background for the form
            padding: 20,
            display: "grid",
            borderRadius: "8px", // Add rounded corners to the paper
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{ color: "#040404ff" }} // Apply color using sx prop
          >
            Enter your email
          </Typography>

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
            style={{ marginBottom: "20px" }} // Margin for input field
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !isValidEmail(email)}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </Paper>
      </form>
    </div>
  );
}
