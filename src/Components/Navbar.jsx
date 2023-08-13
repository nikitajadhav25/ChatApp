import React,{ useContext } from 'react'
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='navlogo'>Chat App</span> 
      <div className='navuser'>
        <img className='navimg' src={currentUser.photoURL} alt=""/>
        <span>{currentUser.displayName}</span>
        <button className="logoutbtn" onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar;
