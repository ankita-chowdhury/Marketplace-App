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

  const updateUserData = (inputVal,inputName) =>{
      if(inputName==='username'){
        setUserData((oldval)=>{
          return{...oldval,username:inputVal};
        })
      }
      else if(inputName==='pass'){
        setUserData((oldval)=>{
          return{...oldval,password:inputVal};
        })
      }
      else if(inputName==='dob'){
        setUserData((oldval)=>{
          return{...oldval,dateOfBirth:inputVal};
        })
      }
      else if(inputName==='address-1'){
        setUserData((oldval)=>{
          return{...oldval,address:{...oldval.address,adressLine1:inputVal}};
        })
      }
      else if(inputName==='city'){
        setUserData((oldval)=>{
          return{...oldval,address:{...oldval.address,city:inputVal}};
        })
      }
      else if(inputName==='state'){
        setUserData((oldval)=>{
          return{...oldval,address:{...oldval.address,state:inputVal}};
        })
      }
      else if(inputName==='country'){
        setUserData((oldval)=>{
          return{...oldval,address:{...oldval.address,country:inputVal}};
        })
      }
      else if(inputName==='zip-code'){
        setUserData((oldval)=>{
          return{...oldval,address:{...oldval.address,zipCode:inputVal}};
        })
      }
      else if(inputName==='contact-no'){
        setUserData((oldval)=>{
          return{...oldval,contactNo:inputVal};
        })
      }
  }

  const saveUserProfile = () => {
    axios.put(`${BASE_URL}/users/${userData.id}`,userData)
    .then((res)=>{
        console.log("response save profile",res.data);
        setEditEnable(true);
    })
    .catch((e)=>{
      console.log(e);
    })
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
            <input type="text" id='username' value={userData.username} disabled={editEnable} name='username' onChange={(e)=>updateUserData(e.target.value,'username')} placeholder='Update your username'/>
          </div>
          <label htmlFor="email">Email</label>
          <div>
            <input type="email" id='email' value={userData.email} disabled={true} name='email' placeholder='Email update is not available'/>
          </div>
          <label htmlFor="pass">Password</label>
          <div>
            <input type={editEnable?"password":"text"} id='pass' value={userData.password} disabled={editEnable} name='pass'
            onChange={(e)=>updateUserData(e.target.value,'pass')} placeholder='Update your password'/>
          </div>
          <label htmlFor="dob">Date-of-Birth</label>
          <div className='dob-div'>
            <input type="date" id='dob' value={userData.dateOfBirth} disabled={editEnable} name='dob' onChange={(e)=>updateUserData(e.target.value,'dob')} placeholder='Update your Date of Birth'/>
          </div>
          <h4 className='address-section'>Address <span className='dropdown-img' onClick={()=>handleDropDown()}><img src={Dropdown} alt="" className={showAddress?"dropdown-hide":"dropdown-show"} /></span></h4>
          {showAddress && <>
            <hr />
          <div className='address-div'>
            <label htmlFor="address-1">Address Line 1</label>
            <div>
              <input type="text" id='address-1' value={userData.address.adressLine1} disabled={editEnable} name='address-1'
              onChange={(e)=>updateUserData(e.target.value,'address-1')} placeholder='Enter Your Address'/>
            </div>
            <label htmlFor="city">City</label>
            <div>
              <input type="text" id='city' value={userData.address.city} disabled={editEnable} name='city' onChange={(e)=>updateUserData(e.target.value,'city')} placeholder='Enter your city name'/>
            </div>
            <label htmlFor="state">State</label>
            <div>
              <input type="text" id='state' value={userData.address.state} disabled={editEnable} name='state' onChange={(e)=>updateUserData(e.target.value,'state')} placeholder='Enter your State'/>
            </div>
            <label htmlFor="country">Country</label>
            <div>
              <input type="text" id='country' value={userData.address.country} disabled={editEnable} name='country' onChange={(e)=>updateUserData(e.target.value,'country')} placeholder='Enter your Country'/>
            </div>
            <label htmlFor="zip-code">Zip-Code</label>
            <div>
              <input type="number" id='zip-code' value={userData.address.zipCode} disabled={editEnable} name='zip-code' onChange={(e)=>updateUserData(e.target.value,'zip-code')} placeholder='Enter your Zip-Code'/>
            </div>
          </div>
          </>}
          <label htmlFor="contact-no">Contact No</label>
          <div>
            <input type="number" id='contact-no' value={userData.contactNo} disabled={editEnable} name='contact-no' onChange={(e)=>updateUserData(e.target.value,'contact-no')} placeholder='Enter your Contact No' />
          </div>
          {!editEnable && <div className='save-profile-div'>
          <button className='save-profile' onClick={()=>saveUserProfile()}>Save</button>
          </div>}
        </div>        
      </div>
    </div>
  )
}

export default Profile
