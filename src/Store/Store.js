import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, cartProductSlice,productByCategorySlice, selectedCategoryIdSlice } from "../Features/CartSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        cartProduct: cartProductSlice.reducer,
        productByCategory :productByCategorySlice.reducer,
        selectedCategoryId:selectedCategoryIdSlice.reducer
    },
});
