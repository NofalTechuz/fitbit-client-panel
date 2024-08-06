// import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const ForgetPassword = () => {
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // const values = {  password, confirmPassword };

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // try {
        //     const response = await axios.post(
        //         `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        //         values
        //     );
        //     const token = response.data.token;

        //     Cookies.set('token', token, {
        //         expires: 7,
        //         path: '/',
        //         secure: false,
        //         sameSite: 'Lax',
        //     });
        //     navigate('/dashboard');
        // } catch (error) {
        //     console.log(error);
        //     alert("Invalid credentials");
        // }
    };

    return (
        <div className="wrapper">
            <div className="signin-container">
                <div className='signin-logo'>
                <img src="logo512.png" alt="Logo" style={{ width: '50px', paddingRight: '10px'}} />
                <h1>FitBit </h1>
                </div>
                <p style={{marginTop: '20px'}}>Change your password</p>
                <form className="signin-form" onSubmit={handleSubmit}>
               
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    
                    <button className="singin-button" type="submit">Fprget Password</button>
                </form>
                <div className="signup-link">
                    <p>Back to sing in? <NavLink to="/signin">Sign In</NavLink></p>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword