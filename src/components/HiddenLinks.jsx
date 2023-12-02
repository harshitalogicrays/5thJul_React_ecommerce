import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/Slices/authSlice'

export const ShowOnLogin = ({children}) => {
    let isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn)
        return children
    else 
        return null
}

export const ShowOnLogout = ({children}) => {
    let isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn==false)
        return children
    else 
        return null
  }

