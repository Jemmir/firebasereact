import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import { logOut } from '../firebase/Firebase'

const SignOut = () => {

  const navigate = useNavigate()
  const handleUserLoggedIn = async (user) =>{
   await logOut()
    
}
 
const handleUserNotRegistered = (user) =>{
    navigate("/login")
    
 
}

const handleUserNotLoggedIn = (user) =>{
    navigate("/login")
}
  return (
    <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotRegistered} onUserNotRegistered={handleUserNotLoggedIn}>

    </AuthProvider>
  )
}

export default SignOut