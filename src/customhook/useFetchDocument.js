import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const useFetchDocument = (collectionname,documentId) => {
    let [document,setDocument]=useState(null)
    useEffect(()=>{getDocumentData()},[])
    let getDocumentData=async()=>{
            const docref=doc(db,collectionname,documentId)
            const docSnap = await getDoc(docref)
            if(docSnap.exists()){
            const obj={id:documentId,...docSnap.data()}
            setDocument(obj)
            console.log(obj)
            }
            else
            {toast.error("Document Not Found")}
        }
  return (
    {document}
  )
}

export default useFetchDocument
