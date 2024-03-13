import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/reset_password/', { email });
      toast.success('Please check your email for the password reset link.');
    } catch (error) {
      console.error('Password reset request failed', error);
      toast.error('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Password Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
