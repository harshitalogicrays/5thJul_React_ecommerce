import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../redux/Slices/cartSlice'
import { Link } from 'react-router-dom'
import {FaArrowAltCircleLeft} from 'react-icons/fa'
const CheckoutSummary = () => {
    const cartItem=useSelector(selectCartItems)
    const total=useSelector(selectCartTotal)
  return (
    <>
         <h1>Checkout Summary</h1><hr/>
         {cartItem.length==0 ? 
         <>
            No item in Cart <br/>
            <Link to='/' className='btn btn-primary'><FaArrowAltCircleLeft/> Back to Shopping</Link>
         </>
         :<>
            <div className='card p-2'>
                <h4>Cart Total:{total} </h4>
                <h4>Total Items: {cartItem.length}</h4>
                {
                     cartItem.map((c,index)=>
                        <div className='card mb-2 p-1' key={index}>
                            <p>Item Name : {c.name}</p>
                            <p>Unit Price {c.price}</p>
                            <p>Total Quantity : {c.cartQuantity}</p>
                        </div>
                     )}
            </div>
         </>
         }

    </>
  )
}

export default CheckoutSummary
