import React, { useState } from 'react'
import Navbar from './Navbar'
import Dropdown from "../assets/images/Dropdown.png"
import Edit from "../assets/images/Edit-icon.png"

const Profile = () => {
  const[showAddress,setShowAddress]=useState(false);

  const handleDropDown = () =>{
    if(showAddress===true){
      setShowAddress(false);
    }
    else if(showAddress===false){
      setShowAddress(true);
    }
  }
  return (
    <div className='box-container'>
      <Navbar/>
      <div className="outer-profile-div">
        <div className="inner-profile-right-div">

          <h2 className='heading-profile'>My Profile <span><img src={Edit} alt="" /></span></h2>
          <hr />
          <label htmlFor="username">Username</label>
          <div>
            <input type="text" id='username' name='username' placeholder='Update your usernamename'/>
          </div>
          <label htmlFor="email">Email</label>
          <div>
            <input type="email" id='email' name='email' placeholder='Update your email'/>
          </div>
          <label htmlFor="pass">Password</label>
          <div>
            <input type="password" id='pass' name='pass' placeholder='Update your password'/>
          </div>
          <label htmlFor="dob">Date-of-Birth</label>
          <div className='dob-div'>
            <input type="date" id='dob' name='dob' placeholder='Update your Date of Birth'/>
          </div>
          <h4 className='address-section'>Address <span className='dropdown-img' onClick={()=>handleDropDown()}><img src={Dropdown} alt="" className={showAddress?"dropdown-hide":"dropdown-show"} /></span></h4>
          {showAddress && <>
            <hr />
          <div className='address-div'>
            <label htmlFor="address-1">Address Line 1</label>
            <div>
              <input type="text" id='address-1' name='address-1' placeholder='Enter Your Address'/>
            </div>
            <label htmlFor="city">City</label>
            <div>
              <input type="text" id='city' name='city' placeholder='Enter your city name'/>
            </div>
            <label htmlFor="state">State</label>
            <div>
              <input type="text" id='state' name='state' placeholder='Enter your State'/>
            </div>
            <label htmlFor="country">Country</label>
            <div>
              <input type="text" id='country' name='country' placeholder='Enter your Country'/>
            </div>
            <label htmlFor="zip-code">Zip-Code</label>
            <div>
              <input type="number" id='zip-code' name='zip-code' placeholder='Enter your Zip-Code'/>
            </div>
          </div>
          </>}
          <label htmlFor="contact-no">Contact No</label>
          <div>
            <input type="number" id='contact-no' name='contact-no' placeholder='Enter your Contact No' />
          </div>
          <div className='save-profile-div'>
          <button className='save-profile'>Save</button>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Profile
