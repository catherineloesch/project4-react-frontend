import React from 'react'
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { homeIcon} from './../assets/icons'

import "./Header.css"

export default function Nav(props) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

  const handleLogOut = () => {
    localStorage.removeItem("petsJWT")
    setUserLoggedIn(false)
    setCurrentUser(null)
    navigate('/')

  }

  let id;
  if (currentUser) {
     id = currentUser.id
  } else {
    id = ""
  }



  const navLinks = [
    // Home + Job links are always displayed
    (<Link to="/" className='nav-link'><div><i className={homeIcon.className}></i></div></Link>),
    (<Link to="/jobs" className='nav-link'><div>Jobs</div></Link>),
    
    // If user is NOT logged in: show Login + Sign In links
    (!userLoggedIn && <Link to="/users/signup" className='nav-link'><div>Sign Up</div></Link>),
    (!userLoggedIn && <Link to="/users/login" className='nav-link'><div>Login</div></Link>),
    
    // If user IS logged in: show Log Out + Dashboard links
    (userLoggedIn && <Link to={`/users/${id}/dashboard`} className='nav-link'><div>Dashboard</div></Link>),
    (userLoggedIn && <Link to="/" className='nav-link'><div onClick={handleLogOut}>Log Out</div></Link>),
  ]

  
  return (
    <nav className='nav'>
      <ul className={props.showHamburgerMenu ? 'nav-list active' : 'nav-list'} >
          {navLinks.map((navLink, index) => (navLink ? <li key={index} onClick={()=>(props.setShowHamburgerMenu(false))}>{navLink}</li> : null))}
      
          {/* toggle menu: when hamburger menu is visble, cross icon will display, when it's not visible, hamburger icon will display */}
      </ul>

    
  </nav>
  )
}
