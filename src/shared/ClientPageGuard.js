import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loading from '../Utils/Loading';
// import { ROUTES } from '../../utils/constant';

 
const ClientPageGuard = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if the token exists in cookies using js-cookie
        const token = Cookies.get('token');

        if (token) {
            console.log("token", token);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Loading /> 
    }

    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} replace />; // Redirect if authenticated
    }

    return <div>{children}</div>
}

export default ClientPageGuard