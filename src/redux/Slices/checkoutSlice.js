import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{checkouts:sessionStorage.getItem("shippingAddress")?JSON.parse(sessionStorage.getItem("shippingAddress")):{}},
    reducers:{
        store_checkouts(state,action){
            state.checkouts=action.payload
            sessionStorage.setItem("shippingAddress",JSON.stringify(state.checkouts))
        }
    }
})
export const {store_checkouts}=checkoutSlice.actions
export default checkoutSlice.reducer
export const selectcheckouts=(state)=>state.checkout.checkouts