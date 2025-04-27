import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config.js"; 
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("User Logged In Successfully");
        navigate("/"); 
      })
      .catch((error) => {
        alert(error.message); 
      });
  };

  return (
    <div className="auth-form">
      <h1>Welcome Back</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn">
          Login
        </button>
        
        <p className="form-footer">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
