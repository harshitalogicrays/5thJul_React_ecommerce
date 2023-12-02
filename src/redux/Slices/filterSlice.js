import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filterProducts:[]},
    reducers:{
        filter_by_search(state,action){
            // console.log(action.payload)
            let {products,search}=action.payload
            let fproducts=products.filter((item)=>item.name.includes(search) 
            ||item.category.includes(search) )
            state.filterProducts=fproducts
        }
    }
})

export const {filter_by_search} =filterSlice.actions
export default filterSlice.reducer
export const selectFilterProducts=(state)=>state.filter.filterProducts