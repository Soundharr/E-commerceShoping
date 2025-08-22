// src/pages/Signup.jsx

import React, { useState, useEffect, useRef } from "react";
import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cashewImage from "../assets/cashew.jpg";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const timerRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidOtp = (otp) => /^\d{4,6}$/.test(otp);

  useEffect(() => {
    if (otpSent && countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    if (countdown === 0) {
      setOtpSent(false);
      setOtp("");
      setCountdown(300);
    }
    return () => clearTimeout(timerRef.current);
  }, [otpSent, countdown]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://e-commerce-oagd.onrender.com/register/request-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send OTP");
      }
      setOtpSent(true);
      alert("OTP sent to your email!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || !isValidOtp(otp)) {
      alert("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://e-commerce-oagd.onrender.com/register/verify-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();
      console.log("✅ OTP Verification Response:", data);

      if (!response.ok) {
        throw new Error(data.detail || "OTP verification failed");
      }

      // ✅ Check if access token is present
      if (!data.access || !data.refresh) {
        throw new Error(
          "No access/refresh token returned. Please contact support."
        );
      }

      // ✅ Save token & user to localStorage
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔔 Let other components know the auth state has changed
      window.dispatchEvent(new Event("authChanged"));

      alert("OTP verified successfully!");
      navigate("/");
    } catch (err) {
      console.error("❌ OTP verification failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${cashewImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={20}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          {otpSent ? "Enter OTP" : "Register with Email"}
        </Typography>

        {error && (
          <Typography variant="body2" color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          {!otpSent && (
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              disabled={loading}
              error={email !== "" && !isValidEmail(email)}
              helperText={
                email !== "" && !isValidEmail(email)
                  ? "Enter a valid email"
                  : ""
              }
              sx={{ mb: 3 }}
            />
          )}

          {otpSent && (
            <>
              <TextField
                label="OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                fullWidth
                disabled={loading}
                error={otp !== "" && !isValidOtp(otp)}
                helperText={
                  otp !== "" && !isValidOtp(otp) ? "Enter a valid OTP" : ""
                }
                inputProps={{ maxLength: 6 }}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" textAlign="center" mb={2}>
                Time remaining: {formatTime(countdown)}
              </Typography>
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              loading || (otpSent ? !isValidOtp(otp) : !isValidEmail(email))
            }
          >
            {loading
              ? otpSent
                ? "Verifying..."
                : "Sending..."
              : otpSent
                ? "Verify OTP"
                : "Send OTP"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
