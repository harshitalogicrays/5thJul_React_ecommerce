import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :[],
        total:localStorage.getItem("total") ? localStorage.getItem("total")  : 0,previousURL:''},
    reducers:{
        ADD_TO_CART(state,action){
            let productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(productIndex == -1){
                state.cartItems.push({...action.payload,cartQuantity:1})
                toast.success(`${action.payload.name} added to cart`)
            }
            else {//increase 
                if(state.cartItems[productIndex].cartQuantity  < action.payload.countInStock    ){
                state.cartItems[productIndex].cartQuantity+=1
                toast.success((`${action.payload.name} qty increased by 1`))
                }
                else
                {
                    toast.error(`only ${action.payload.countInStock} qty available`)
                }
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        DECREASE(state,action){
            let productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(state.cartItems[productIndex].cartQuantity > 1){
                state.cartItems[productIndex].cartQuantity-=1               
            }
            else {
                state.cartItems[productIndex].cartQuantity=1
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
  
        },
        REMOVE_FROM_CART(state,action){
           state.cartItems.splice(action.payload,1)
           localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
  
        },
        EMPTY_CART(state,action){
            state.cartItems=[]
            localStorage.removeItem("cartItems")
        },
        CALCULATE_TOTAL(state,action){
            let t = state.cartItems.reduce((prev,item)=>{return prev += item.price * item.cartQuantity},0)
            state.total=t
            localStorage.setItem('total',state.total)
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        }
    }
})
export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_TOTAL,SAVE_URL}=cartSlice.actions
export default cartSlice.reducer

export const selectCartItems=state=>state.cart.cartItems
export const selectCartTotal=state=>state.cart.total
export const selectURL=state=>state.cart.previousURL
