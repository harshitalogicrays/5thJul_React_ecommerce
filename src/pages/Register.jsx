import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import Loader from '../Loader'

const Register = () => {
    const initiState={name:'',email:'',password:'',cpwd:'',role:'user'}
    const[user,setUser]=useState({...initiState})
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async(userCredential) => {
                const user1 = userCredential.user;
                const docref = doc(db,"users",user1.uid)
                await setDoc(docref,{...user,createdAt:Timestamp.now().toDate()})
                setIsLoading(false)
                toast.success("registered successfully")
                navigate('/')
            })
            .catch((error) => {
                setIsLoading(false)
              toast.error(error.message)
            });
    }

  return (
    <div className='container mt-3'>
        {isLoading && <Loader/>}
        <div className='row'>
            <div className='col-6'>
            <img src={require("../assets/register.png")} alt="" width="100%" className='img-fluid' />
            </div>
            
            <div className='col-6'>
            <Form onSubmit={handleSubmit}>
               <div class="form-floating mb-3">
                 <input
                   type="text"
                   class="form-control" name="name" id="formId1" placeholder="" 
                   value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
                 <label for="formId1">Name</label>
               </div><div class="form-floating mb-3">
                 <input
                   type="email"
                   class="form-control" name="email" id="formId1" placeholder=""
                   value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                   
                 <label for="formId1">Email</label>
               </div><div class="form-floating mb-3">
                 <input
                   type="password"
                   class="form-control" name="password" id="formId1" placeholder=""
                   value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                 <label for="formId1">Password</label>
               </div><div class="form-floating mb-3">
                 <input
                   type="password"
                   class="form-control" name="cpwd" id="formId1" placeholder=""
                   value={user.cpwd} onChange={(e)=>setUser({...user,cpwd:e.target.value})}/>
                 <label for="formId1">confirm password</label>
               </div>
               <button type="submit" class="btn btn-primary">submit</button>
            </Form>
            <hr/>
            <p>create account?? <Link to='/login'>SignIn</Link> </p>
            </div>
        </div>
    </div>
  )
}

export default Register
