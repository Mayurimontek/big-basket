import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, cartProductSlice } from "../Features/CartSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        cartProduct: cartProductSlice.reducer,
    },
});
