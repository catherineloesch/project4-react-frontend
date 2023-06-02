import React from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import "./Nav.css"

export default function Nav() {
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

  
  return (
    <nav className='nav'>
        <Link to="/"><div>Home</div></Link>
        <Link to="/jobs"><div>Jobs</div></Link>
        {/**If user is NOT logged in: show Login + Sign In links **/}
        {!userLoggedIn && <Link to="/users/login"><div>Login</div></Link>}
        {!userLoggedIn && <Link to="/users/signup"><div>Sign Up</div></Link>}
        
        {/** If user is logged in: show Log Out + Dashboard links **/}
         {userLoggedIn && <Link to="/"><div onClick={handleLogOut}>Log Out</div></Link>}
        {userLoggedIn && <Link to={`/users/${id}/dashboard`}><div>Dashboard</div></Link>}
    </nav>
  )
}
