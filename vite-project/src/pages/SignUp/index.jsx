import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        set(ref(db, `users/${user.uid}`), {
          email: user.email,
          createdAt: new Date().toISOString()
        })
          .then(() => {
            alert("Account created successfully!");
            navigate("/Login");
          })
          .catch((error) => {
            alert("Error saving user data: " + error.message);
          });
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
      });
  };

  return (
    <div className="auth-form">
      <h1>Create Account</h1>
      <form onSubmit={handleSignup}>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn"
        
        >
          Sign Up
        </button>
        
        <p className="form-footer">
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
