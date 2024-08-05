import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const isLinkActive = (href) => {
    return window.location.pathname === href;
  };

  const navigationLinks = [
    { href: '/dashboard', text: 'Dashboard', icon: 'bx bxs-dashboard' },
    { href: '/exercisescategory', text: 'Exercises', icon: 'bx bx-dumbbell' },
    { href: '/chat', text: 'Chat', icon: 'bx bx-message-square-dots' },
    { href: '/dietplan', text: 'Diet Plan', icon: 'bx bx-cheese' },
    { href: '/helps', text: 'Helps', icon: 'bx bx-donate-heart' },
    { href: '/settings', text: 'Settings', icon: 'bx bx-cog' },
  ];

  return (
    <div className="sidebar">
      <NavLink to="#">
        <span className="logo">
          <i className="bx bx-code-alt"></i>
          <div className="logo-name">
            <span>Asmr</span>Prog
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
        <li>
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
