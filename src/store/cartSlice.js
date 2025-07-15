import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : []; // Parse the cart if it exists, or return an empty array
};

const initialState = loadCartFromLocalStorage(); // Load initial cart from localStorage

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state)); // Save updated cart to localStorage
    },
    removeItem: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedState)); // Save updated cart to localStorage
      return updatedState;
    },
    clearCart: (state) => {
      localStorage.removeItem("cart"); // Remove cart from localStorage
      return [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
