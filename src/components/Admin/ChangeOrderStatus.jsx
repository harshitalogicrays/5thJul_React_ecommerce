import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import emailjs from '@emailjs/browser'
const ChangeOrderStatus = ({id,orderStatus,order}) => {
  let [status,setStatus]=useState(orderStatus)
  const navigate=useNavigate()
  let updateStatus=()=>{
    const orderConfig={
      userId:order.userId,
      userEmail:order.userEmail,
      totalAmount:order.totalAmount,
      cartItems:order.cartItems,
      shippingAddress:order.shippingAddress,
      orderDate:order.orderDate,
      orderTime:order.orderTime,
      orderStatus:status,
      createdAt:order.createdAt,
      editedAt:Timestamp.now().toDate()
  }
  try{
          setDoc(doc(db,"orders",id),orderConfig)
          
          emailjs.send('service_f690f5a', 'template_3f6n0hd',{user_email:orderConfig.userEmail,order_status:status,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
          .then((result) => {         
          }, (error) => {
              console.log(error.text);
          });
          toast.success("order status updated")
          navigate('/admin/orders')
  }
  catch(err){
      toast.error(err.message)
  }
  }
  return (
    <div>
      <h4>Update Order Status :</h4>
      <form onSubmit={updateStatus}>
        <div class="mb-3">
          <label for="" class="form-label" >Status</label>
          <select class="form-select" name="status" value={status} 
          onChange={(e)=>setStatus(e.target.value)}>
                   <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Cancelled</option>
                    <option>Delivered</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Update Status</button>
      </form>
    </div>
  )
}

export default ChangeOrderStatus
