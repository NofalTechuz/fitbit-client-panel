import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            console.log(process.env.REACT_APP_SERVER_URL)
            const response = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/auth/login`,
              values
            );
            const token = response.data.token;
            // const user = response.data.user;

            Cookies.set('token', token, {
              expires: 7,
              path: '/',
              secure: false,
              sameSite: 'Lax',
            });
            navigate('/dashboard');
          } catch (error) {
            console.log(error)
                alert("Invalid credentials")
          }
    };

    return (
        <div className="wrapper">
            <div className="signin-container">
                <form className="signin-form" onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
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
                    <button className='singin-button' type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
