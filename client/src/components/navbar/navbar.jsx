import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='nav-link'>BlogIt</Link>
      <Link to='/write' className='nav-link'>Write</Link>
      <Link to='/my-blogs' className='nav-link'>My Blogs</Link>
      <Link to='/my-profile' className='nav-link'>My Profile</Link>
      <Link to='/explore' className='nav-link'>Explore</Link>
    </nav>
  );
};

export default Navbar;
