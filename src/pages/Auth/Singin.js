import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        // Add your form submission logic here
        console.log('Email:', email);
        console.log('Password:', password);
        const values = { email, password };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/auth/login`,
                values
            );
            const token = response.data.token;

            Cookies.set('token', token, {
                expires: 7,
                path: '/',
                secure: false,
                sameSite: 'Lax',
            });
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="wrapper">
            <div className="signin-container">
                <div className='signin-logo'>
                <img src="logo512.png" alt="Logo" style={{ width: '50px', paddingRight: '10px'}} />
                <h1>FitBit </h1>
                </div>
                <p style={{marginTop: '20px'}}>Sign into your account</p>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Or Username:</label>
                        <input 
                            type="text" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
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
                            <span style={{marginLeft:5}}>
                            Remember me
                            </span>
                        </label>
                        <NavLink to="/forgetpassword">Forgot Password?</NavLink>
                    </div>
                    <button className="singin-button" type="submit">Sign In</button>
                </form>
                <div className="signup-link">
                    <p>Don’t have an account yet? <NavLink to="/signup">Sign Up</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
