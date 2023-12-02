import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import productSlice from "./Slices/productSlice";
import cartSlice from "./Slices/cartSlice";
import checkoutSlice from "./Slices/checkoutSlice";
import orderSlice from "./Slices/orderSlice";
import filterSlice from "./Slices/filterSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        order:orderSlice,
        filter:filterSlice
    }
})
export default store