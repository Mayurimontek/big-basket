import { createSlice } from "@reduxjs/toolkit";

export const CartProductListByCustomerSlice = createSlice({
    name: 'cartProductListByCustomer',
    initialState: {
        cartProductListByCustomer: [],
    },
    reducers: {
        setCartProductListByCustomer: (state, action) => {
            state.cartProductListByCustomer = action.payload;
        },
        clearCartProductListByCustomer: (state) => {
            state.cartProductListByCustomer = [];
        },
    },
});

export const { setCartProductListByCustomer, clearCartProductListByCustomer } = CartProductListByCustomerSlice.actions;
export const selectCartProductListByCustomer = (state) => state.cartProductListByCustomer.cartProductListByCustomer;
export default CartProductListByCustomerSlice.reducer;
