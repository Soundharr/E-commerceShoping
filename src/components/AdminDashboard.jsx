import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [priceTrend, setPriceTrend] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const mockData = [
      { month: "Jan", price: 120 },
      { month: "Feb", price: 130 },
      { month: "Mar", price: 125 },
      { month: "Apr", price: 140 },
      { month: "May", price: 135 },
    ];
    setPriceTrend(mockData);
    setCurrentPrice(mockData[mockData.length - 1].price);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "#2c3e50",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h3 style={{ marginBottom: "2rem", textAlign: "center" }}>
          🛠 Admin Panel
        </h3>
        <nav style={{ flexGrow: 1 }}>
          <div onClick={() => navigate("/enquirydetails")} style={navItemStyle}>
            📋 Enquiries
          </div>
          <div onClick={() => navigate("/productcrud")} style={navItemStyle}>
            🖋 Product CRUD
          </div>
          <div onClick={() => navigate("/crudcategory")} style={navItemStyle}>
            🗂️ Category CRUD
          </div>
        </nav>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            backgroundColor: "#e74c3c",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          🔒 Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          padding: "30px",
          backgroundColor: "#ecf0f1",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
          {/* Current Price Card */}
          <div
            style={{
              flex: "1 1 300px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h4>Current Cashew Price</h4>
            <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 20 }}>
              ₹ {currentPrice} / 100g
            </p>
          </div>

          {/* Graph Card */}
          <div
            style={{
              flex: "2 1 500px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              minWidth: "300px",
            }}
          >
            <h4>Price Trend (Monthly)</h4>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={priceTrend}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2980b9"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Render Nested Routes Below */}
        <div style={{ marginTop: "40px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const navItemStyle = {
  padding: "12px 16px",
  borderRadius: "6px",
  marginBottom: "10px",
  backgroundColor: "#34495e",
  cursor: "pointer",
  fontWeight: "500",
};

export default AdminDashboard;
