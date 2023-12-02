import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {FaArrowAltCircleLeft, FaSearch, FaShoppingCart} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, LogoutUser, selectRole, selectUserName } from '../redux/Slices/authSlice'
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks'
import { selectCartItems } from '../redux/Slices/cartSlice'
import { filter_by_search } from '../redux/Slices/filterSlice'
import useFetchCollection from '../customhook/useFetchCollection'
import { selectProducts, store_products } from '../redux/Slices/productSlice'
const Header = () => {
    let [search,setSearch]=useState("")
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    const username=useSelector(selectUserName)
    const role=useSelector(selectRole)
    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
             const uid = user.uid;
             const docref = doc(db,"users",user.uid)
             const docSnap=await getDoc(docref)
              let obj={role:docSnap.data().role,email:docSnap.data().email,userName:docSnap.data().name,userId:uid} 
                dispatch(LoginUser(obj))
            } else {
              dispatch(LogoutUser())
            }
          });
          
    },[auth,dispatch])
    const navigate=useNavigate()
    let logoutUser=()=>{
        signOut(auth).then(() => {
            toast.success("loggedOut successfully")
            navigate('/')
          }).catch((error) => {
            toast.error(error.message)
        });
    }
    const {data,isLoading}=useFetchCollection("products")
    const products=useSelector(selectProducts)
    useEffect(()=>{
      dispatch(store_products({productlist:data}))
    },[data,dispatch])
  
    useEffect(()=>{
        dispatch(filter_by_search({products,search}))
    },[products,search])
    
    let searchProducts=(e)=>{
        e.preventDefault()
        dispatch(filter_by_search({products,search}))
    }
  return (
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">myShop</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <Link class="nav-link active" to='/' aria-current="page">Home <span class="visually-hidden">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/products'>Products</Link>
                </li>
            </ul>
            <form class="d-flex my-2 my-lg-0" onSubmit={searchProducts}>
                <div className='input-group'>
                <input class="form-control " type="text" placeholder="Search" 
                value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button class="btn btn-danger my-2 my-sm-0" type="submit">
                    <FaSearch/>
                </button>
                </div>
            </form>
            <ul class="navbar-nav mt-2 mt-lg-0">
                {role !='admin' &&
            <li class="nav-item">
                    <Link class="nav-link" to='/cart'><FaShoppingCart size={30}/>
                    <span class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}>{cartItems.length}</span>
                    </Link>
                </li>
}
                <ShowOnLogout>
                <li class="nav-item">
                    <Link class="nav-link" to='register'>Register </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/login'>Login</Link>
                </li>
                </ShowOnLogout>
             
                <ShowOnLogin>
                {role =='user' && 
                <li class="nav-item">
                    <Link class="nav-link" to='/myorders'>My Orders</Link>
                </li> }
                <li class="nav-item">
                        <a class="nav-link">Welcome {username}</a>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" onClick={logoutUser}><FaArrowAltCircleLeft/> Logout</button>
                    </li>
                </ShowOnLogin>
            </ul>
        </div>
    </div>
  </nav>
  
  )
}

export default Header
