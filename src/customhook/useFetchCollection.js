import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchCollection = (collectionName) => {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        getCollection() },[])
    let getCollection=()=>{
        setIsLoading(true)
        try{
            const docref=collection(db,collectionName)
            const q=query(docref,orderBy('createdAt','desc'))
            onSnapshot(q,(snapshot)=>{
                const allData=snapshot.docs.map((doc)=>
                ({id:doc.id,...doc.data()})
                )
                setData(allData)
                setIsLoading(false)  })
        }catch(err){setIsLoading(false) 
            console.log(err.message)}
    }
  return ( {data,isLoading} )
}

export default useFetchCollection
