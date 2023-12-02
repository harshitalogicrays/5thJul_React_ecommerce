import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../redux/Slices/orderSlice'
import { selectUserId } from '../redux/Slices/authSlice'
import Loader from '../Loader'
const MyOrders = () => {
  const {data,isLoading}=useFetchCollection("orders")
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(store_orders(data))
  },[data])

  const userId=useSelector(selectUserId)
  const orders=useSelector(selectorders)
  const filterOrders=orders.filter((item)=>item.userId==userId)
  return (
    <div className='container shadow mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>My Orders</h1><hr/>
    {filterOrders.length == 0 ? 
      <>No Orders</>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>Order Amount</th>
               <th>Order Status</th>
               <th>View</th>
             </tr>
           </thead>
           <tbody>
             {filterOrders.map((order, index) => {
               const {
                 id, orderDate, orderTime, totalAmount, orderStatus,} = order;
               return (
                 <tr key={id}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td> {"$"}{totalAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                   <td>
                    <button type="button" class="btn btn-primary">View</button>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>   
   </>
    }
  </div>
  )
}

export default MyOrders
