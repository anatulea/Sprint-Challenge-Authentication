import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar, Nav } from 'reactstrap';

const Navigation = () => {
    const history = useHistory()
    const logout = e => {
        e.preventDefault()
        localStorage.clear()
        history.push('/api/auth/login')
      }
return(
  <div className="navigation">
    <Navbar>
      <NavbarBrand tag={Link} to="/" className="mr-auto">
      Dad jokes
      </NavbarBrand>

      {localStorage.getItem('token') ? (
           <Nav className='nav-links'>
          <NavLink tag={Link} to="/api/users">Jokes</NavLink> 
          <NavLink onClick={logout} tag={Link} to="/api/auth/login" >LogOut</NavLink>
          </Nav>
      ) : (
        <Nav className='nav-links'>
        <NavLink tag={Link} to="/api/auth/register">Register</NavLink>
        <NavLink tag={Link} to="/api/auth/login">LogIn</NavLink>
        </Nav>
      )}
    </Navbar>
  </div>
)};
export default Navigation;