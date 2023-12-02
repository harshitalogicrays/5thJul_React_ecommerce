import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../../redux/Slices/productSlice'
import Loader from '../../Loader'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'
const ViewProducts = () => {
  const {data,isLoading}=useFetchCollection("products")
  const products=useSelector(selectProducts)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_products({productlist:data}))
  },[data,dispatch])

  let deleteProduct=async(id,imageURL)=>{
    if(window.confirm('Are you sure you want to delete this')){
        try{
            await deleteDoc(doc(db,"products",id))
            await deleteObject(ref(storage,imageURL))
            toast.success("product deleted successfully")
        }
        catch(err){
          toast.error(err.message)
        }
    }
  }
  return (
    <div className='shadow p-2'>
      {isLoading && <Loader/>}
    <h1>All Products</h1>
        <hr/>
        <table class="table table-bordered table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {products.length == 0 && <
                tr><td colSpan={6}>No Product Found</td></tr>}
    {products.map((product)=>{
            let {id,name,imageURL,price,countInStock}=product                 
            return(
                <React.Fragment key={id}> 
                    <tr >
                        <td>{id}</td> <td>{name}</td>
                        <td> <img src={imageURL}
                        style={{ width: "50px", height: "50px" }} /> </td> <td>{price}</td>
                        <td>{countInStock}</td>
                        <td>
                          <Link type="button" class="btn btn-success me-2"
                          to={`/admin/edit/${id}`}>
                            <FaPenAlt/>
                          </Link>
                          <button type="button" class="btn btn-danger" onClick={()=>deleteProduct(id,imageURL)}><FaTrashAlt/></button>
                        </td>
                    </tr>
                </React.Fragment>
            )
             } )}
        </tbody>
    </table>

    </div>
  )
}

export default ViewProducts
