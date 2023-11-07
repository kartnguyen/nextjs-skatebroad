"use client";

import { IProduct } from "@/app/_assets/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: IProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

let storedCartData = null;

if (typeof window !== "undefined") {
  storedCartData = localStorage.getItem("cart");
}

let initialState: CartState = {
  items: [],
};

if (storedCartData) {
  const parsedCartData = JSON.parse(storedCartData);
  initialState = {
    items: parsedCartData,
  };
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    remove: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    update: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeAll: (state) => {
      state.items = [];

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const selectCartTotalQuantity = (state: CartState) => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
};

export const { add, remove, update, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
