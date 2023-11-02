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

const initialState: CartState = {
  items: [],
};

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
    },
    remove: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
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
    },
  },
});

export const selectCartTotalQuantity = (state: CartState) => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
};

export const { add, remove, update } = cartSlice.actions;

export default cartSlice.reducer;
