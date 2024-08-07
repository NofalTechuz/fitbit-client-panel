import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';
import DecodeToken from '../../modules/DecodeToken';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [coutnryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [isbtndisabled, setIsbtndisabled] = useState(false);
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryData = data
          .map((country) => ({
            name: country.name.common,
            isd_code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryData);
      })
      .catch((error) => console.error('Error fetching country data:', error));
  }, []);

  function validateForm(values) {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.isdCode) {
      errors.isdCode = 'Country code is required';
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(values.mobileNumber)) {
      errors.mobileNumber = 'Phone number must be 10 digits';
    }

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.gender) {
      errors.gender = 'Gender is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    setIsbtndisabled(true);
    const data = {
      firstName,
      lastName,
      email,
      username,
      isdCode: coutnryCode,
      mobileNumber: phone,
      gender,
      password,
      uuid: uuidv4(),
      role: '2',
    };

    const formerror = validateForm(data);
    if (Object.keys(formerror).length > 0) {
      alert(Object.values(formerror)[0]);
      return;
    }
    console.log(data);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/user`, data);
      navigate('/signin');
    } catch (error) {
      alert(error?.response?.data?.message || error?.message || error);
      // toast.error(error?.response?.data?.message || error?.message || error);
      console.error(error);
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
        <p style={{ marginTop: '20px' }}>Create a new account</p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="countryCode">Country:</label>
              <select id="countryCode" value={coutnryCode} onChange={(e) => setCountryCode(e.target.value)}>
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.isd_code}>
                    {country.name} ({country.isd_code})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <div className="radio-group">
              <label htmlFor="gender">Gender:</label>
              <div className="radio-child">
                <input type="radio" id="male" name="gender" value="1" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radio-child">
                <input type="radio" id="female" name="gender" value="2" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="female">Female</label>
              </div>
              <div className="radio-child">
                <input type="radio" id="other" name="gender" value="3" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
              'Sign Up'
            )}
          </button>
          <div className="or">
            <span>or</span>
          </div>
          <div className="signin-button">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </form>
        <p style={{ textAlign: 'left', fontSize: '12px', marginTop: '20px', color: '#363949' }}>
          By signing up, you agree to the Website.com Service Terms & Conditions and the Privacy Policy.
        </p>
        <div className="signup-link">
          <p>
            Already have an account? <NavLink to="/signin">SignIn</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
