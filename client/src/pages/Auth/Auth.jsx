import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import AboutAuth from "./AboutAuth";
import toast from "react-hot-toast";
import { signup, login } from '../../actions/auth';
import './Auth.css'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setAnswer("");
  }
  const handleForgetPassword = () => {
    // Navigate to the forget password route
    navigate('/forgetpassword');
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email && !password) {
      return toast.error("Please enter email and password");
    }
    if (isSignup) {
      if (!name) {
        return toast.error("Please enter name")
      }
      dispatch(signup({ name, answer,email, password }, navigate))
      toast.success('Redirecting...')
      toast.success('User registered successfully')
      toast.success('Logged in successfully')
    } else {
      dispatch(login({ email, password }, navigate))
      toast.success('Redirecting...')
      toast.success('Logged in successfully')
    }

  }

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
       
        <h1>QUEST</h1>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
            <label htmlFor="name">
              <h4>Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label htmlFor="answer">
          <h4>What is your best friend's name?</h4>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
            </>
            
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <Link to="/forgetpassword" onClick={handleForgetPassword}>
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  Forgot password?
                </p>
                </Link>
              )} 
             </div>
            <input
              
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  )
}

export default Auth