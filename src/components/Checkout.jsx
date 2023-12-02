import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../redux/Slices/cartSlice'
import { selectcheckouts } from '../redux/Slices/checkoutSlice'
import { selectEmail } from '../redux/Slices/authSlice'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
const stripePromise=loadStripe('pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw')
const Checkout = () => {
  const [message,setMessage]=useState("Initialzing checkout")
  const [clientSecret,setClientSecret]=useState('')

  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectCartTotal)
  const shippingAddress=useSelector(selectcheckouts)
  const userEmail=useSelector(selectEmail)
  const description=`myshop description email: ${userEmail}`
  useEffect(()=>{
      fetch("http://localhost:1000/payment",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({cartItems,userEmail,shippingAddress,description,totalAmount})
      }).then((res)=>{
        return res.json().then((data)=>{
          console.log(data)
          setClientSecret(data.clientSecret)
        })
      }).catch(()=>{
        setMessage("something went wrong")
        toast.error("something went wrong")})
  },[])
  const apperance={theme:'stripe'}
  const options={clientSecret,apperance}
  return (
    <div className='container'>
        {!clientSecret && <h3>{message}</h3>}
        {clientSecret && 
        <Elements options={options} stripe={stripePromise} >
            <CheckoutForm/>
        </Elements>
    }
    </div>
  )
}

export default Checkout
