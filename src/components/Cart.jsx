import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotal } from '../redux/Slices/cartSlice'
import {FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/Slices/authSlice'
const Cart = () => {
  const cart=useSelector(selectCartItems)
  const total=useSelector(selectCartTotal)
  const isLoggedIn=useSelector(selectIsLoggedIn)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(CALCULATE_TOTAL())
  },[cart])
  let url=window.location.href
  let handlecheckout=()=>{
    if(isLoggedIn)
      navigate('/checkout-details')
    else {
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
  }
  return (
    <div className='container shadow p-2 mt-4'>
      <h1>My Cart</h1> <hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.length==0 && <tr><td colSpan={7}>No Product in Cart</td></tr>}
            {cart.map((c,i)=>
              <tr key={i}>
                <td scope="row">{i+1}</td>
                <td>{c.name}</td>
                <td> <img src={c.imageURL}
                            style={{ width: "50px", height: "50px" }} /></td>
                <td scope="row">{c.price}</td>
                <td>
                <button onClick={()=>dispatch(DECREASE(c))}>-</button>
                 <input value={c.cartQuantity} readOnly style={{width:'40px'}} className='text-center'></input>
                  <button onClick={()=>dispatch(ADD_TO_CART(c))}>+</button>
                  </td>
                <td>{c.price * c.cartQuantity}</td> 
                <td>
                  <button type="button" class="btn btn-danger" onClick={()=>dispatch(REMOVE_FROM_CART(i))}><FaTrash/></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='row'>
        <div className='col-2'>
              <button type="button" class="btn btn-danger btn-lg mt-3" onClick={()=>dispatch(EMPTY_CART())}
             >Clear Cart</button>
        </div>
      <div class='col-3 offset-7 shadow p-3'>
        <h3>Total: <span className='float-end'>${total}</span></h3> <hr/>
        <div class="d-grid gap-2">
          <button type="button" name="" id="" class="btn btn-warning" onClick={handlecheckout}>Checkout</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart
