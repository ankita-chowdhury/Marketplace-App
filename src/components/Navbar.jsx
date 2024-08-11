import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Search from "../assets/images/Search.svg"
import ProfileIcon from "../assets/images/User-icon.png"
import LogoutIcon from "../assets/images/Logout-icon.png"

const Navbar = () => {
  const navigate=useNavigate();
  const[logoutPopup,setLogoutPopup]=useState(false);
  const handleShow = () =>{
    if(logoutPopup===true){
      setLogoutPopup(false);
    }
    else{
      setLogoutPopup(true);
    }
  }
  const handleLogout = () =>{
    localStorage.removeItem('loginKey');
    navigate("/login");
  }
  return (
    <nav className='nav-component'>
      <div className='logo-container'>
        <p>
        <span className='logo-icon'>go</span>
        Mart
        </p>
      </div>
      <div className='nav-link'>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/transaction">Transaction</Link>
      </div>
      <div className='search-container'><img src={Search} alt="" /><input type="text" /></div>
      <div className="profile-icon" onClick={()=>handleShow()}><img src={ProfileIcon} alt="" />
      {logoutPopup && <div className='logout-div'><p onClick={()=>handleLogout()}>Logout <img src={LogoutIcon} alt="" /></p></div>}
      </div>
    </nav>
  )
}

export default Navbar
