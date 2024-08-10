import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="outer-container">
        <div className="inner-container">
            <div className="heading-container">
                <h2>Welcome Back!</h2>
                <p>Enter Your Credentials to access your account</p>
            </div>
            <div className="login-form">
                
                    <label htmlFor="email">Email address</label>
                    <div className="input-div">
                    <input type="email" name="email" id="email" placeholder="Enter your email"/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="input-div">
                    <input type="password" name="password" id="password" placeholder="Enter your password"/>
                    </div>
                    <div className="login-btn">
                        <button>Login</button>
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                    </div>
            </div>
        </div>
      
    </div>
  )
}

export default Login
