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

export const productByCategorySlice = createSlice({
    name: 'productByCategory',
    initialState:{cartProductListByCategory:[]} ,
    reducers: {
        setProductByCategory: (state, action) => {
            state.cartProductListByCategory = action.payload;
        },
    },
});

export const { setProductByCategory } = productByCategorySlice.actions;
export const selectCartProductListByCategory = (state) => state.productByCategory.cartProductListByCategory;

export const selectedCategoryIdSlice = createSlice({
    name: 'selectedCategoryId',
    initialState: null,
    reducers: {
        setSelectedCategoryId: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedCategoryId } = selectedCategoryIdSlice.actions;
export const selectSelectedCategoryId = (state) => state.selectedCategoryId;

export default { cartSlice, cartProductSlice,productByCategorySlice ,selectedCategoryIdSlice};
