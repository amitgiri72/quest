// ForgetPassword.js
import React, { useState } from 'react';

import axios from 'axios';
import './Auth.css'
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  console.log(currentProfile?.question)

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/forgot-password', {
        email,
        answer,
        newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    
    }
  };

  return (
    <section className="auth-section">
    <div className="auth-container-2">
      <h2>Forget Password</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">
          <h4>Email:</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="answer">
          <h4>Answer to Security Question:</h4>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
        <label htmlFor="newPassword">
          <h4>New Password:</h4>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="auth-btn">Reset Password</button>

     
        
      </form>
    </div>
    </section>
  );
};

export default ForgetPassword;
