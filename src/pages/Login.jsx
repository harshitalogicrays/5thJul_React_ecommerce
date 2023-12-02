import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase/config'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import Loader from '../Loader'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/Slices/cartSlice'

const Login = () => {
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const previousUrl=useSelector(selectURL)
    let redirectUser=()=>{
        if(previousUrl.includes('cart')){
          navigate('/cart')
        }
        else {
          navigate('/')
        }
    }

    let loginUser=(e)=>{
      e.preventDefault()
      setIsLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            const docref = doc(db,"users",user.uid)
            const docSnap=await getDoc(docref)
            let role=docSnap.data().role
            if(role=="admin")
          { setIsLoading(false)
            toast.success("login successfully")
            navigate('/admin')

          }
            else 
            {
              setIsLoading(false)
              toast.success("login successfully")
              redirectUser()
            }
            
           
        })
        .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
        });  
    }
    const provider = new GoogleAuthProvider();
    let googleLogin=()=>{
      signInWithPopup(auth, provider)
      .then(async(result) => {
       const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const docref = doc(db,"users",user.uid)
        await setDoc(docref,{email:user.email,role:"user",name:user.displayName,createdAt:Timestamp.now().toDate()})
        toast.success("login successfully")
        redirectUser()
      }).catch((error) => {
        toast.error(error.message)
      });
    
    }
    return (
      <div className='container mt-5 shadow p-3'>
        {isLoading && <Loader/>}
        <h1>Login Page</h1> <hr/>
          <div className='row'>
              <div className='col-6'>
              <img src={require('../assets/login.png')} className='img-fluid'
              height='300px' width='300px'/>
              </div>
              <div className='col-6'>
                  <form onSubmit={loginUser}>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control" name="email" placeholder="" value={email}
                          onChange={(e)=>setEmail(e.target.value)}/>
                        <label for="formId1">Email</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control" name="password" placeholder=""
                          value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <label for="formId1">Password</label>
                      </div>
                      <div class="d-grid gap-2">
                        <button type="submit" name="" id="" class="btn btn-primary">Login</button>
                      </div>
                     <hr/>
                      <div class="d-grid gap-2">
                        <button type="button" name="" id="" class="btn btn-danger" onClick={googleLogin}>Login With google</button>
                      </div>
                      <hr/>
                      <p>create account?? <Link to='/register'>SignUp</Link> </p>
                  </form>
              </div>
          </div>
  
      </div>
    )
  }
  

export default Login
