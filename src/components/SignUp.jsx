import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const[userData,setUserData]=useState([]);
    const[errMsg,setErrMsg]=useState("");
    const[user,setUser]=useState({
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
        address: "",
        contactNo: ""
    })

    const handleChange = (inputvalue,inputName) =>{
        if(inputName==='username'){
            setUser((olditems)=>{
                return{...olditems,username:inputvalue};
            })
        }
        else if(inputName==='email'){
            setUser((olditems)=>{
                return{...olditems,email:inputvalue};
            })
        }
        else if(inputName==='password'){
            setUser((olditems)=>{
                return{...olditems,password:inputvalue};
            })
        }
    }

    const handleSignUp = async() =>{
        if(user.username!=="" && user.email!=="" && user.password!==""){
            try{
                const tempUserData=await axios.get(`http://localhost:4500/users?email=${user.email}`);
                if(tempUserData.data.length===0){
                    const response=await axios.post(`http://localhost:4500/users`,user);
                console.log("response",response);
                const localData={user:user.username,email:user.email};
                localStorage.setItem('loginKey',JSON.stringify(localData));
                navigate('/home');
                }
                else{
                    setErrMsg("User already exist! try to Sign in");
                }
            } 
            catch(e){
                setErrMsg("Something went wrong! Please try again");
            }
        }
        else{
            setErrMsg("Username, Email and Password should not be blank!")
        }
        setTimeout(()=>{
            setErrMsg("");
        },4000);
    }

  return (
    <div className="outer-container">
        <div className="inner-container">
            <div className="heading-container">
                <h2>Get Started Now</h2>
                {errMsg!=="" && <div className="err-container"><div className="error-msg">{errMsg}</div ></div>}
            </div>
            <div className="login-form">
                    <label htmlFor="username">Name</label>
                    <div className="input-div">
                    <input type="text" name="username" id="username" placeholder="Enter your name" onChange={(e)=>handleChange(e.target.value,'username')}/>
                    </div>
                    <label htmlFor="email">Email address</label>
                    <div className="input-div">
                    <input type="email" name="email" id="email" placeholder="Enter your email" onChange={(e)=>handleChange(e.target.value,'email')}/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="input-div">
                    <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e)=>handleChange(e.target.value,'password')}/>
                    </div>
                    <div className="login-btn">
                        <button onClick={()=>handleSignUp()}>Sign Up</button>
                        <p>Already registered? <Link to='/login'>Login</Link></p>
                    </div>
            </div>
        </div>
      
    </div>
  )
}

export default SignUp
