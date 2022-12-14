import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/movies' className='navbar-brand p-2'>
          Vidly
        </Link>
        <ul className='navbar-nav mr-auto'>
          <NavLink className='nav-link nav=item' to='movies'>
            Movies
          </NavLink>
          <NavLink className='nav-link nav=item' to='customers'>
            Customers
          </NavLink>
          <NavLink className='nav-link nav=item' to='rentals'>
            Rentals
          </NavLink>
          {!user ? (
            <React.Fragment>
              <NavLink className='nav-link nav=item' to='login'>
                Login
              </NavLink>
              <NavLink className='nav-link nav=item' to='register'>
                Register
              </NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className='nav-link nav=item' to='user'>
                {user.name}
              </NavLink>
              <NavLink className='nav-link nav=item' to='logout'>
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
