import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch, useSelector } from 'react-redux'
import { selectcheckouts, store_checkouts } from '../redux/Slices/checkoutSlice'
import { useNavigate } from 'react-router-dom'
const CheckoutDetails = () => {
    let initialState={name:'',line1:'',line2:'',mobile:'',city:'',state:'',country:'',postal_code:''}
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let [shippingAddress,setShippingAddress]=useState({...initialState})
    let address=useSelector(selectcheckouts)
    useEffect(()=>{
        setShippingAddress({...address})
    },[])

    let handlesubmit = (e)=>{
        e.preventDefault()
        // fetch('http://localhost:1000')
        // .then((res)=>res.json().then((data)=>console.log(data)))
        // .catch((err)=>{console.log(err)})
        
        dispatch(store_checkouts(shippingAddress))
        navigate('/checkout')
    }
  return (
    <div className='container'>
    <div className='row p-2 shadow mt-5'>
        <div className='col-6'>
              <h1>Checkout Details</h1><hr/>
              <form onSubmit={handlesubmit}>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control" name="name" placeholder="" value={shippingAddress.name} onChange={(e)=>setShippingAddress({...shippingAddress,name:e.target.value})}/>
                  <label>Name</label>
                </div>
                <div className='row'>
                <div class="form-floating mb-3 col-6">
                  <input
                    type="text"
                    class="form-control" name="line1" placeholder="" value={shippingAddress.line1} onChange={(e)=>setShippingAddress({...shippingAddress,line1:e.target.value})}/>
                  <label>Line1</label>
                </div>
                <div class="form-floating mb-3 col-6">
                  <input
                    type="text"
                    class="form-control" name="line2" placeholder="" value={shippingAddress.line2} onChange={(e)=>setShippingAddress({...shippingAddress,line2:e.target.value})}/>
                  <label>Line2</label>
                </div></div>
                <div className='row'>
               
                <div class="form-floating mb-3 col-6">
                  <input
                    type="text"
                    class="form-control" name="city" placeholder="" value={shippingAddress.city} onChange={(e)=>setShippingAddress({...shippingAddress,city:e.target.value})}/>
                  <label>City</label>
                </div>
             
                <div class="form-floating mb-3 col-6">
                  <input
                    type="text"
                    class="form-control" name="state" placeholder=""value={shippingAddress.state} onChange={(e)=>setShippingAddress({...shippingAddress,state:e.target.value})}/>
                  <label>state</label>
                </div>   </div>

                <div class="mb-3">
                <label>Country</label>
                    <CountryDropdown value={shippingAddress.country}  onChange={(val) => setShippingAddress({...shippingAddress,country:val})} class="form-select" valueType="short"/>
               
                </div>
                <div className='row'>
                <div class="form-floating mb-3 col-6">
                  <input
                    type="number"
                    class="form-control" name="postal_code" placeholder="" value={shippingAddress.postal_code} onChange={(e)=>setShippingAddress({...shippingAddress,postal_code:e.target.value})}/>
                  <label>Postal_Code</label>
                </div>
                <div class="form-floating mb-3 col-6">
                  <input
                    type="number"
                    class="form-control" name="mobile" placeholder="" value={shippingAddress.mobile} onChange={(e)=>setShippingAddress({...shippingAddress,mobile:e.target.value})}/>
                  <label>Mobile No</label>
                </div>
                </div>
                <div class="d-grid gap-2">
                  <button type="submit" name="" id="" class="btn btn-primary">Proceed to Checkout</button>
                </div>
              </form>
        </div>
        <div className='col-6'>
            <CheckoutSummary/>
        </div>
        </div>
    </div>
  )
}

export default CheckoutDetails
