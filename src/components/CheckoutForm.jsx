import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from './CheckoutSummary'
import { toast } from 'react-toastify'
import { selectEmail, selectUserId } from '../redux/Slices/authSlice'
import { EMPTY_CART, selectCartItems, selectCartTotal } from '../redux/Slices/cartSlice'
import { selectcheckouts } from '../redux/Slices/checkoutSlice'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser';

const CheckoutForm = () => {
    let [message ,setMessage]=useState(null)
    let [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        const clientSecret=new URLSearchParams(window.location.search).get('payment_intent_client_secret')
    },[stripe])

    let handleSubmit=async(e)=>{
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
        const confirmpayment=await stripe.confirmPayment({
                elements,
                confirmParams:{
                    return_url:"http://localhost:3000/checkout-success"  },
                redirect:"if_required"
        }).then((result)=>{
            if(result.error){
                toast.error(result.error.message)
                setMessage(result.error.message)
                return ;  }
            if(result.paymentIntent){
                if(result.paymentIntent.status=='succeeded'){
                    setIsLoading(false)
                    toast.success('payment success') 
                    saveorder()
                } }
        })
        setIsLoading(false)
    }

    const userEmail=useSelector(selectEmail)
    const userId=useSelector(selectUserId)
    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectCartTotal)
    const shippingAddress=useSelector(selectcheckouts)
    let saveorder=()=>{
        const today=new Date()
        const date=today.toLocaleDateString()
        const time=today.toLocaleTimeString()
        const orderConfig={
            userId,userEmail,totalAmount,cartItems,shippingAddress,orderDate:date,orderTime:time,
            orderStatus:"Order Placed",createdAt:Timestamp.now().toDate()
        }
        try{
                addDoc(collection(db,"orders"),orderConfig)
                dispatch(EMPTY_CART())
              

                emailjs.send('service_f690f5a', 'template_3f6n0hd',{user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
                .then((result) => {
                    toast.success("order placed")
                    navigate('/checkout-success')
                }, (error) => {
                    console.log(error.text);
                });

               
        }
        catch(err){
            toast.error(err.message)
        }
    }
  return (
    <div className='row mt-5 shadow'>
        <div className='col-6'>
        <CheckoutSummary/>
        </div>
        <div className='col-6'>
            <form onSubmit={handleSubmit}>
                <h1>Stripe Checkout</h1><hr/>
                <PaymentElement id="payment_element"></PaymentElement>
                <div class="d-grid gap-2 mt-2">
                  <button type="submit" name="" id="" class="btn btn-primary">
                   {isLoading ? <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div> : <span>(Pay Now)</span>}
                                    </button>
                                    </div>
               </form> 
               {message && <h5>{message}</h5>}
         </div>
    
    </div>
  )
}

export default CheckoutForm
