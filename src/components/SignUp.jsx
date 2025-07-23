import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterAndVerify() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0); // State to hold countdown time
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      // const res = await fetch("http://127.0.0.1:8000/register/request-otp/", {
      const res = await fetch(
        "https://e-commerce-oagd.onrender.com/register/request-otp/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        alert("OTP sent to your email!");
        setStep("otp");

        // Start the countdown timer (5 minutes = 300 seconds)
        setCountdown(300);
      } else {
        const err = await res.json();
        alert("Error: " + (err.detail || JSON.stringify(err)));
      }
    } catch (error) {
      alert("Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://e-commerce-oagd.onrender.com/register/verify-otp/",
        {
          // const res = await fetch("http://127.0.0.1:8000/register/verify-otp/",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access); // JWT token
        localStorage.setItem("refresh", data.refresh); // optional
        localStorage.setItem(
          "user",
          JSON.stringify({ name: email, email: email, avatar: "" })
        );
        alert("Verification successful!");
        setStep("done");
      } else {
        const err = await res.json();
        alert("Verification failed: " + (err.detail || JSON.stringify(err)));
      }
    } catch (error) {
      alert("Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "done") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }

    // If countdown is active, start the timer
    if (countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Clear the timer when countdown reaches 0
      if (countdown === 0) {
        clearInterval(timerId);
      }

      return () => clearInterval(timerId); // Clean up on unmount
    }
  }, [step, countdown, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (step === "done") {
    return (
      <Paper style={{ maxWidth: 400, margin: "20px auto", padding: 20 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Success!
        </Typography>
        <Typography textAlign="center">
          You are now registered and logged in.
        </Typography>
      </Paper>
    );
  }

  if (step === "email") {
    return (
      <Paper
        elevation={20}
        style={{ maxWidth: 400, margin: "20px auto", padding: 20 }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
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
    );
  }

  if (step === "otp") {
    return (
      <Paper
        elevation={20}
        style={{ maxWidth: 400, margin: "20px auto", padding: 20 }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Enter OTP
        </Typography>
        {countdown > 0 && (
          <Typography
            variant="body2"
            color="error"
            textAlign="center"
            gutterBottom
          >
            Time left to enter OTP: {formatTime(countdown)}
          </Typography>
        )}
        <form onSubmit={handleVerifyOtp} style={{ display: "grid", gap: 20 }}>
          <TextField
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            inputProps={{
              maxLength: 6,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            disabled={loading || countdown === 0}
            error={otp !== "" && (otp.length !== 6 || !/^\d+$/.test(otp))}
            helperText={
              otp !== "" && (otp.length !== 6 || !/^\d+$/.test(otp))
                ? "OTP must be exactly 6 digits"
                : ""
            }
          />
          <Button
            variant="contained"
            type="submit"
            disabled={
              loading ||
              otp.length !== 6 ||
              !/^\d+$/.test(otp) ||
              countdown === 0
            }
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Paper>
    );
  }

  return null;
}
