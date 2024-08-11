import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const Login = () => {
  
  const navigate = useNavigate();
  const[errMsg,setErrMsg]=useState("");
  const[loginData,setLoginData] = useState({
    email: "",
    password: ""
  })

  useEffect(()=>{
    const localData=localStorage.getItem('loginKey');
    if(localData){
      navigate('/home');
    }
  },[])

  const handleChangeLogin = (inputValue,inputName) =>{
    if(inputName==='email'){
      setLoginData((oldItems)=>{
        return{...oldItems,email:inputValue};
      })
    }
    else if(inputName==='password'){
      setLoginData((oldItems)=>{
        return{...oldItems,password:inputValue};
      })
    }
  }

const checkLogin = async() =>{
 if(loginData.userName!=="" && loginData.password!=""){
  try{
    const response = await axios.get(`http://localhost:4500/users?email=${loginData.email}`);
    const user=response.data[0];
    if(user.password===loginData.password){
      
      localStorage.setItem('loginKey',JSON.stringify({user:user.username,email:user.email}));
      navigate('/home');
    }
    else if(user.password!==loginData.password){
      setErrMsg("wrong password!");
    }
    
  }
  catch(e){
    setErrMsg("User not found!");
  }
 }
 else{
    setErrMsg("Username and Password should not be blank!");
 }
  setTimeout(()=>{
    setErrMsg("");
  },4000);
  
}
  return (
    <div className="outer-container">
        <div className="inner-container">
            <div className="heading-container">
                <h2>Welcome Back!</h2>
                <p>Enter Your Credentials to access your account</p>
                {errMsg!=="" && <div className="err-container"><div className="error-msg">{errMsg}</div ></div>}
            </div>
            <div className="login-form">
                    <label htmlFor="email">Email address</label>
                    <div className="input-div">
                    <input type="email" name="email" id="email" placeholder="Enter your email" onChange={(e)=>handleChangeLogin(e.target.value,'email')}/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="input-div">
                    <input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e)=>handleChangeLogin(e.target.value,'password')}/>
                    </div>
                    <div className="login-btn">
                        <button onClick={()=>checkLogin()}>Login</button>
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                    </div>
            </div>
        </div>
     
    </div>
  )
}

export default Login
