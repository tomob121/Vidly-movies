import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a href='' className='navbar-brand p-2'>
          Vidly
        </a>
        <ul className='navbar-nav mr-auto'>
          <li>
            {
              <NavLink className='nav-link nav=item' to='/component/home'>
                Movies
              </NavLink>
            }
          </li>
          <li>
            <NavLink className='nav-link nav=item' to='customers'>
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink className='nav-link nav=item' to='rentals'>
              Rentals
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
