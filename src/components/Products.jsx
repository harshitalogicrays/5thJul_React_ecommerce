import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/Slices/productSlice'
import ProductList from './ProductList'
import { selectFilterProducts } from '../redux/Slices/filterSlice'
const Products = () => {
  const {data,isLoading}=useFetchCollection("products")
  const products=useSelector(selectProducts)
  const fproducts=useSelector(selectFilterProducts)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_products({productlist:data}))
  },[data,dispatch])
  return (
    <>  
      {fproducts.length !=0 ? 
       <ProductList products={fproducts}/>
       :
       <ProductList products={products}/>    
      }
           
    </>
  )
}

export default Products
