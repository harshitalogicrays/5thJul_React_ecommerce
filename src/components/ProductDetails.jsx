import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectProducts } from '../redux/Slices/productSlice'
import ReactImageMagnify from 'react-image-magnify'
import useFetchDocument from '../customhook/useFetchDocument'
import Loader from '../Loader'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../redux/Slices/cartSlice'

const ProductDetails = () => {
  const {proid}=useParams()
  let [products,setProducts]=useState(null)
  const {document}=useFetchDocument("products",proid) 

  const cartItems=useSelector(selectCartItems)
  const cartIndex=cartItems.findIndex((item)=>item.id==proid)
  const cartData=cartItems.find((item)=>item.id==proid)
  const dispatch=useDispatch()
  useEffect(()=>{
      setProducts(document)
  },[document]) 
  return (
    <>
    {products == null ? <Loader/> :
    <div className='container'>
    <div className='row mt-5 shadow p-2'>
      <div className='col-6'>
              <ReactImageMagnify {...{
      smallImage: {
          alt: products.name,
          isFluidWidth: true,
          src: products.imageURL
      },
      largeImage: {
          src: products.imageURL,
          width: 1200,
          height: 1800
      }
  }} />
      </div>
      <div className='col-6'>
          <h4>{products.name}</h4>
          <p>{products.category} <span> {products.brand}</span></p>
          <p>{products.price}</p>
          <p>{products.desc}</p>
          {cartIndex == -1 ?
          <button class="btn btn-danger" onClick={()=>dispatch(ADD_TO_CART(products))}>
               Add to cart
              </button>
              :
              <>
              <button onClick={()=>dispatch(DECREASE(cartData))}>-</button>
                 <input value={cartData.cartQuantity} readOnly style={{width:'40px'}} className='text-center'></input>
                  <button onClick={()=>dispatch(ADD_TO_CART(cartData))}>+</button>
                </>
}
      </div>
    </div>
    </div>
  }
    </>
  )
}

export default ProductDetails
