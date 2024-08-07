import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';
import DecodeToken from '../../modules/DecodeToken';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isbtndisabled, setIsbtndisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsbtndisabled(true);
    const values = { email, password };

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, values);
      const token = response.data.token;

      Cookies.set('token', token, {
        expires: 7,
        path: '/',
        secure: false,
        sameSite: 'Lax',
      });

      const userDetail = await DecodeToken(token);

      navigate(`/dashboard/${userDetail.id}`);
    } catch (error) {
      console.log(error);
      alert('Invalid credentials');
    }

    setIsbtndisabled(false);
  };

  const responseMessage = async (response) => {
    setIsbtndisabled(true);
    try {
      const googleToken = response.credential;
      const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/google-login`, { token: googleToken });
      const token = result.data.token;

      Cookies.set('token', token, {
        expires: 7,
        path: '/',
        secure: false,
        sameSite: 'Lax',
      });

      const userDetail = await DecodeToken(token);

      navigate(`/dashboard/${userDetail.id}`);
    } catch (error) {
      console.log(error);
      alert('Google login failed');
    }

    setIsbtndisabled(false);
  };
  const errorMessage = (error) => {
    alert(error);
    console.log(error);
  };

  return (
    <div className="wrapper">
      <div className="signin-container">
        <div className="signin-logo">
          <img src="logo512.png" alt="Logo" style={{ width: '50px', paddingRight: '10px' }} />
          <h1>FitBit </h1>
        </div>
        <p style={{ marginTop: '20px' }}>Sign into your account</p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Or Username:</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              <span style={{ marginLeft: 5 }}>Remember me</span>
            </label>
            <NavLink to="/forgetpassword">Forgot Password?</NavLink>
          </div>
          <button
            disabled={isbtndisabled}
            style={isbtndisabled ? { cursor: 'not-allowed' } : null}
            className="singin-button"
            type="submit"
          >
            {isbtndisabled ? (
              <div className="singin-spinner">
                <div className="singin-spinner-child"></div>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
          <div className="or">
            <span>or</span>
          </div>
          <div className="signin-button">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} useOneTap />
          </div>
        </form>

        <div className="signup-link">
          <p>
            Don’t have an account yet? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
