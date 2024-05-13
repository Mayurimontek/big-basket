import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProductList: [],
    },
    reducers: {
        setCartProductList: (state, action) => {
            state.cartProductList = action.payload;
        }
    },
});

export const { setCartProductList } = cartSlice.actions;
export const selectCartProductList = (state) => state.cart.cartProductList;

export const cartProductSlice = createSlice({
    name: 'cartProduct',
    initialState: {
        cartProductListByCust: [],
    },
    reducers: {
        setcartProductListByCust: (state, action) => {
            state.cartProductListByCust = action.payload;
        }
    },
});

export const { setcartProductListByCust } = cartProductSlice.actions;
export const selectCartProductListByCust = (state) => state.cartProduct.cartProductListByCust;

export default { cartSlice, cartProductSlice };
