import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import TodoApp from "./components/TodoApp";
import Home from "./components/Home";
import Login from "./components/Login";
import Products from "./components/Products";
import SignUp from "./components/SignUp";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import NewProducts from "./components/NewProducts";
import UpdateProduct from "./components/UpdateProduct";
import CartList from "./components/CartList";
import Footer from "./components/Footer";
import AddCategory from "./components/AddCategory";
import UpdateCategory from "./components/UpdateCategory";
import ProductCrud from "./components/ProductCrud";
import Order from "./components/Order";

// 👇 Create UserContext
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("Soundhar");
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="app">
      {/* 👇 Important: Add basename for GitHub Pages */}
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/productcrud" element={<ProductCrud />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todoapp" element={<TodoApp />} />
            <Route path="/newproduct" element={<NewProducts />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/cartlist" element={<CartList />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/updatecategory/:id" element={<UpdateCategory />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
