// import { Button, Paper, TextField, Typography } from "@mui/material";
// import React from "react";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";

// let schema = Yup.object().shape({
//   name: Yup.string()
//     .required("Name is required")
//     .matches(/^[A-Z][a-z]+ [A-Za-z]+$/, "Enter your full name"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   age: Yup.number()
//     .integer("Must be integer")
//     .positive("Must be positive")
//     .required("Age is required")
//     .min(18, "Age must be at least 18")
//     .max(30, "Age must be at most 30"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 chars"),
//   cpassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const SignUp = () => {
//   const navigate = useNavigate();
//   const paperStyle = {
//     width: 400,
//     margin: "20px auto",
//     padding: "20px",
//     display: "grid",
//     gap: "20px",
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const handleData = async (data) => {
//     try {
//       const res = await fetch("http://localhost:8000/register/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const json = await res.json();
//       if (res.ok) {
//         alert("Registration successful!");
//         navigate("/login");
//       } else {
//         alert("Error: " + JSON.stringify(json));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Try again.");
//     }
//   };

//   return (
//     <Paper
//       elevation={20}
//       style={paperStyle}
//       component="form"
//       onSubmit={handleSubmit(handleData)}
//     >
//       <Typography variant="h5" textAlign="center">
//         Create Account
//       </Typography>
//       <TextField
//         label="Full Name"
//         {...register("name")}
//         error={!!errors.name}
//         helperText={errors.name?.message}
//       />
//       <TextField
//         label="Email"
//         {...register("email")}
//         error={!!errors.email}
//         helperText={errors.email?.message}
//       />
//       <TextField
//         label="Age"
//         type="number"
//         {...register("age")}
//         error={!!errors.age}
//         helperText={errors.age?.message}
//       />
//       <TextField
//         label="Password"
//         type="password"
//         {...register("password")}
//         error={!!errors.password}
//         helperText={errors.password?.message}
//       />
//       <TextField
//         label="Confirm Password"
//         type="password"
//         {...register("cpassword")}
//         error={!!errors.cpassword}
//         helperText={errors.cpassword?.message}
//       />
//       <Button variant="contained" type="submit">
//         Register
//       </Button>
//       <Button variant="outlined" fullWidth onClick={() => navigate("/login")}>
//         Login
//       </Button>
//     </Paper>
//   );
// };

// export default SignUp;

import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function RegisterAndVerify() {
  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'done'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
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

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      alert("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://e-commerce-oagd.onrender.com/register/verify-otp/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (res.ok) {
        alert("Verification successful! You are logged in.");

        // Save user info in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ name: email, email: email, avatar: "" }) // avatar empty for now
        );

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

  // Step 3: Done message
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

  // Step 1: Email input form
  if (step === "email") {
    return (
      <Paper
        elevation={20}
        style={{ maxWidth: 400, margin: "20px auto", padding: 20 }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Enter your email
        </Typography>
        <form
          onSubmit={handleSendOtp}
          style={{ display: "grid", gap: 20 }}
          noValidate
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </Paper>
    );
  }

  // Step 2: OTP input form
  if (step === "otp") {
    return (
      <Paper
        elevation={20}
        style={{ maxWidth: 400, margin: "20px auto", padding: 20 }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Enter OTP
        </Typography>
        <form
          onSubmit={handleVerifyOtp}
          style={{ display: "grid", gap: 20 }}
          noValidate
        >
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
            disabled={loading}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Paper>
    );
  }

  return null; // fallback
}
