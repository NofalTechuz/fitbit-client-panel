import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DecodeToken from '../modules/DecodeToken';

const Sidebar = () => {
  const navigate = useNavigate();
  const isLinkActive = (href) => {
    return window.location.pathname === href;
  };

  const [user, setUser] = useState(null);

  const navigationLinks = [
    { href: `/dashboard/${user?.id}`, text: 'Dashboard', icon: 'bx bxs-dashboard' },
    { href: `/exercisescategory/${user?.id}`, text: 'Exercises', icon: 'bx bx-dumbbell' },
    { href: `/chat/${user?.id}`, text: 'Chat', icon: 'bx bx-message-square-dots' },
    { href: `/dietplan/${user?.id}`, text: 'Diet Plan', icon: 'bx bx-cheese' },
    { href: `/helps/${user?.id}`, text: 'Helps', icon: 'bx bx-donate-heart' },
    { href: `/settings/${user?.id}`, text: 'Settings', icon: 'bx bx-cog' },
  ];

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    navigate('/signin');
  };

  useEffect(() => {
    const token = Cookies.get('token');

    setUser(DecodeToken(token));
  }, []);

  return (
    <div className="sidebar">
      <NavLink to="/dashboard">
        <span className="logo">
          <i className="bx bx-code-alt"></i>
          <div className="logo-name">
            <span>Fit</span>Bit
          </div>
        </span>
      </NavLink>
      <ul className="side-menu">
        {navigationLinks.map((link, index) => (
          <li key={index} className={isLinkActive(link.href) ? 'active' : ''}>
            <NavLink to={link.href}>
              <i className={link.icon}></i>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li onClick={logout}>
          <NavLink to="#" className="logout">
            <i className="bx bx-log-out-circle"></i>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
