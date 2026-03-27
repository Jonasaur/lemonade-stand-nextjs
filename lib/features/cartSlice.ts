import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  lemonCost: number;
  profit: number;
}

interface CartState {
  items: CartItem[];
  lifetimeProfit: number; 
}

const initialState: CartState = {
  items: [],
  lifetimeProfit: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    checkoutOrder: (state) => {
      const sessionProfit = state.items.reduce((acc, item) => acc + item.profit, 0);
      
      state.lifetimeProfit = parseFloat((state.lifetimeProfit + sessionProfit).toFixed(2));
      
      state.items = [];
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, checkoutOrder, clearCart } = cartSlice.actions;
export default cartSlice.reducer;