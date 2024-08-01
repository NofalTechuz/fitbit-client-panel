import React from 'react'
import {NavLink} from 'react-router-dom'


const Navbar = () => {
  return (
    <nav>
    <i className='bx bx-menu'></i>
    <form action="#">
        <div className="form-input">
            <input type="search" placeholder="Search..." />
            <button className="search-btn" type="submit"><i className='bx bx-search'></i></button>
        </div>
    </form>
    <input type="checkbox" id="theme-toggle" hidden />
    <label for="theme-toggle" className="theme-toggle"></label>
    <NavLink to="#" className="notif">
        <i className='bx bx-bell'></i>
        <span className="count">12</span>
    </NavLink>
    <span className="profile">

    <NavLink to="#" >
        <img alt='img' src="/assets/img/logo.png" />
    </NavLink>
    </span>
</nav>

  )
}

export default Navbar