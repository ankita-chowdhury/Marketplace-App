import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Dropdown from "../assets/images/Dropdown.png"
import Edit from "../assets/images/Edit-icon.png"
import axios from 'axios'
import BASE_URL from './ApiServices'

const Profile = () => {
  const[showAddress,setShowAddress]=useState(false);
  const[userData,setUserData]=useState([]);
  const[editEnable,setEditEnable]=useState(true);

  useEffect(()=>{
    getProfileDetails();
    console.log("userData",userData);
  },[])



  const getProfileDetails = async() =>{
    const localData=localStorage.getItem('loginKey');
    const user=JSON.parse(localData);
    try{
      const response = await axios.get(`${BASE_URL}/users`,{
        params:{
          email:user.email
        }
      });
      setUserData(response.data[0]);
    }
    catch(e){
      console.log(e);
    }
  }

  const handleDropDown = () =>{
    if(showAddress===true){
      setShowAddress(false);
    }
    else if(showAddress===false){
      setShowAddress(true);
    }
  }

  const handleEditEnable = () =>{
    setEditEnable(false);
  }
  return (
    <div className='box-container'>
      <Navbar/>
      <div className="outer-profile-div">
        <div className="inner-profile-right-div">

          <h2 className='heading-profile'>My Profile <span onClick={()=>handleEditEnable()}><img src={Edit} alt="" /></span></h2>
          <hr />
          <label htmlFor="username">Username</label>
          <div>
            <input type="text" id='username' value={userData.username} disabled={editEnable} name='username' placeholder='Update your username'/>
          </div>
          <label htmlFor="email">Email</label>
          <div>
            <input type="email" id='email' value={userData.email} disabled={editEnable} name='email' placeholder='Update your email'/>
          </div>
          <label htmlFor="pass">Password</label>
          <div>
            <input type={editEnable?"password":"text"} id='pass' value={userData.password} disabled={editEnable} name='pass' placeholder='Update your password'/>
          </div>
          <label htmlFor="dob">Date-of-Birth</label>
          <div className='dob-div'>
            <input type="date" id='dob' value={userData.dateOfBirth} disabled={editEnable} name='dob' placeholder='Update your Date of Birth'/>
          </div>
          <h4 className='address-section'>Address <span className='dropdown-img' onClick={()=>handleDropDown()}><img src={Dropdown} alt="" className={showAddress?"dropdown-hide":"dropdown-show"} /></span></h4>
          {showAddress && <>
            <hr />
          <div className='address-div'>
            <label htmlFor="address-1">Address Line 1</label>
            <div>
              <input type="text" id='address-1' value={userData.address.adressLine1} disabled={editEnable} name='address-1' placeholder='Enter Your Address'/>
            </div>
            <label htmlFor="city">City</label>
            <div>
              <input type="text" id='city' value={userData.address.city} disabled={editEnable} name='city' placeholder='Enter your city name'/>
            </div>
            <label htmlFor="state">State</label>
            <div>
              <input type="text" id='state' value={userData.address.state} disabled={editEnable} name='state' placeholder='Enter your State'/>
            </div>
            <label htmlFor="country">Country</label>
            <div>
              <input type="text" id='country' value={userData.address.country} disabled={editEnable} name='country' placeholder='Enter your Country'/>
            </div>
            <label htmlFor="zip-code">Zip-Code</label>
            <div>
              <input type="number" id='zip-code' value={userData.address.zipCode} disabled={editEnable} name='zip-code' placeholder='Enter your Zip-Code'/>
            </div>
          </div>
          </>}
          <label htmlFor="contact-no">Contact No</label>
          <div>
            <input type="number" id='contact-no' value={userData.contactNo} disabled={editEnable} name='contact-no' placeholder='Enter your Contact No' />
          </div>
          {!editEnable && <div className='save-profile-div'>
          <button className='save-profile'>Save</button>
          </div>}
        </div>        
      </div>
    </div>
  )
}

export default Profile
