import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase/config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import Loader from '../../Loader'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/Slices/productSlice'
const AddProduct = () => {
    const {id}=useParams()
    let categories=["Men","Women","Kids","Electronics","Grocery","Sports","food"]
    let initialState={category:'',name:'',brand:'',price:'',countInStock:'',desc:'',imageURL:''}
    let [product,setProduct]=useState({...initialState})
    let [uploadprogress,SetUploadProgress]=useState(0)
    let [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    let handleImage=(e)=>{
      let file=e.target.files[0]
      const storageRef=ref(storage,`05th-myshop/${Date.now()}${file.name}`)
     const uploadTask= uploadBytesResumable(storageRef,file)
     uploadTask.on("state_changed",(snapshot)=>{
      const progress=(snapshot.bytesTransferred /snapshot.totalBytes)*100
      SetUploadProgress(progress)
     },(error)=>{toast.error(error.message)},
     ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
        setProduct({...product,imageURL:downloadURL})
      })
     }
     ) 
    }

    const products=useSelector(selectProducts)
    const productEdit=products.find((item)=>item.id==id)
    useEffect(()=>{
      if(id){setProduct(productEdit)}
      else {setProduct({...initialState})}
    },[id])

    let handleProduct=(e)=>{
        e.preventDefault()
       setIsLoading(true)
       if(!id){
        try{
        addDoc(collection(db,"products"),{
          category:product.category,
          name:product.name,
          brand:product.brand,
          price:product.price,
          countInStock:product.countInStock,
          desc:product.desc,
          imageURL:product.imageURL,
          createdAt:Timestamp.now().toDate()
        })
        setIsLoading(false)
        toast.success("product added")
        navigate('/admin/viewproducts')
        }
        catch(err){
          setIsLoading(false)
          toast.error(err.message)
        }
      }
      else {
          if(product.imageURL != productEdit.imageURL){
             deleteObject(ref(storage,productEdit.imageURL))
          }
          try{
            setDoc(doc(db,"products",id),{
              category:product.category,
              name:product.name,
              brand:product.brand,
              price:product.price,
              countInStock:product.countInStock,
              desc:product.desc,
              imageURL:product.imageURL,
              createdAt:productEdit.createdAt,
              editedAt:Timestamp.now().toDate()
            })
            setIsLoading(false)
            toast.success("product updated")
            navigate('/admin/viewproducts')
            }
            catch(err){
              setIsLoading(false)
              toast.error(err.message)
            }
      }
    }
  return (
    <div className='shadow p-3'> 
    {isLoading && <Loader/>}
    <form onSubmit={handleProduct}>
        <h1>{id?"Edit":"Add"} Product</h1><hr/>
        <div class="mb-3">
              <select class="form-select" name="category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
                  <option selected disabled value=''>------Choose Category------</option>
                  {categories.map((c,i)=>
                  <option key={i}>{c}</option>
                  )}
               
            </select>
        </div>
        <div className='row'>
        <div class="form-floating mb-3 col-6">
<input type="text"
class="form-control" name="name"  value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
<label>Name</label>
</div>
        <div class="form-floating mb-3 col-6">
          <input type="text"
            class="form-control" name="brand" value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value})}/>
          <label>Brand</label>
        </div></div>
        <div className='row'>
        <div class="form-floating mb-3 col-6">
          <input type="number"
            class="form-control" name="price" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})} />
          <label>Price</label>
        </div>
        <div class="form-floating mb-3  col-6">
          <input type="number"
            class="form-control" name="qty" value={product.countInStock} onChange={(e)=>setProduct({...product,countInStock:e.target.value})} />
          <label>Quantity</label>
        </div></div>
        {uploadprogress==0 ? null :
          <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style={{width:`${uploadprogress}%`}}>
            {uploadprogress < 100 ? `uploading ${uploadprogress}% ` : `upload complete ${uploadprogress}% ` }
          </div>
        </div>
        }
         <div class="form-floating mb-3 mt-3">
          <input type="file"
            class="form-control" name="imageURL" onChange={handleImage}/>
            {id && <img src={product.imageURL} width='100px' height='100px' />}
          <label>Price</label>
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Description</label>
          <textarea class="form-control" name="desc"  rows="3" value={product.desc} onChange={(e)=>setProduct({...product,desc:e.target.value})}>{product.desc}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">{id?"Update ":"Add "}Product </button>
        </form>
</div>
  )
}

export default AddProduct
