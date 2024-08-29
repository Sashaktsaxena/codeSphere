import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful: ', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = 'http://localhost:3000/dashboard';
    } catch (error) {
      console.error('There was an error logging in: ', error.response.data);
    }
  };

  return (
    <div className="register-container">
    <div className="leftlogin">
      <div className="login-header">
        <img src="../public/images/logo.jpg" alt="Logo" className="login-logo" />
        <h1>Welcome Back!</h1>
        <p>Please enter login details below</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter the email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter the Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <a href="#" className="forgot-password">Forgot password?</a>
        <button type="submit" className="login-btn">Sign in</button>
        <div className="or-divider">
          <span>Or continue</span>
        </div>

        <div className="signup-link">
          <p>Don’t have an account? <Link to="/">Sign Up</Link></p>
        </div>
      </form>
      </div>
      <div className="rightlogin">

      </div>
    </div>
  );
}

export default Login;
