import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {  Link } from "react-router-dom";
import React from 'react'

const Header = () => {
  const handleLogout=()=>{
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/")
}
  return (
    <div className='header'>
{/* 
      <div className='logo'>
          Brand Event
      </div>
      <nav className='item'>
        <ul className='ul'>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/bands">bands</Link>
          </li>
          <li>
            <Link to="/events">events</Link>
          </li>
          <li>
            <Link to="/registerband">register   band</Link>
          </li>
          
        </ul>
        <div class="navigation">
          <button className="button" onClick={handleLogout}>
          <img src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg"/>
          <div className="logout">LOGOUT</div>
        </button>
        </div>
  
      </nav> */}
      

  

  

  

      {/* <div className='site-info header-content'>
    

       
        <h3>MUSE - find local live music</h3>
        <li>
       
      <Link to="/home">home</Link>
    </li>
    <li>
      <Link to="/bands">bands</Link>
    </li>
    <li>
      <Link to="/events">events</Link>
    </li>
    <li>
      <Link to="/registerband">registerband</Link>
    </li>
  
      </div>
   
      <div className='user-side header-content'>
        <div className='user'>
          <div className='user-avatar'><h4>M</h4></div>
          <h3 className='user-name'>User Info</h3>
        </div>
        <div className='sign-in'>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        <i class="fa fa-sign-out" aria-hidden="true"></i>
          <button className='btn' onClick={handleLogout}>
            Logout
        </button>
      
        </div>
      </div> */}
    </div>
  )
}

export default Header