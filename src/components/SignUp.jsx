import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="outer-container">
        <div className="inner-container">
            <div className="heading-container">
                <h2>Get Started Now</h2>
            </div>
            <div className="login-form">
                    <label htmlFor="username">Name</label>
                    <div className="input-div">
                    <input type="text" name="username" id="username" placeholder="Enter your name"/>
                    </div>
                    <label htmlFor="email">Email address</label>
                    <div className="input-div">
                    <input type="email" name="email" id="email" placeholder="Enter your email"/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="input-div">
                    <input type="password" name="password" id="password" placeholder="Enter your password"/>
                    </div>
                    <div className="login-btn">
                        <button>Sign Up</button>
                        <p>Already registered? <Link to='/login'>Login</Link></p>
                    </div>
            </div>
        </div>
      
    </div>
  )
}

export default SignUp
