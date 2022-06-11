import React from 'react'
import { Outlet } from 'react-router-dom'
import Signup from './pages/Signup/Signup'


const ProtectedRoute=()=> {
    const myuser= localStorage.getItem("token")


  return myuser ? <Outlet /> : <Signup />
}

export default ProtectedRoute