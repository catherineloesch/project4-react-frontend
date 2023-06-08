import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { getCurrentUser, authenticateUser, logUserOut } from './../api/user_api'

import { homeIcon} from './../assets/icons'
import "./Header.css"

export default function Nav(props) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn, API_URL} = useContext(LoginContext);
  const [errors, setErrors] = useState(null)


  const getUser = async() => {
    const apiResponse = await getCurrentUser()
    if (apiResponse !== null && apiResponse !== undefined) {
    setCurrentUser(apiResponse)
    setUserLoggedIn(true)
  }}

  useEffect(() => {
    const auth = authenticateUser()
    console.log('auth is...', auth)

    if (auth === true) {
      console.log('auth is true')

        getUser().then((user) => {
          setCurrentUser(user)
          setUserLoggedIn(true)
        })
        console.log('User authenticated:', auth)
        console.log(currentUser)
    } else {
      console.log('auth failed')
      setUserLoggedIn(false)
      setCurrentUser(null)
    }


  }, [])


  const handleLogOut = async () => {
    console.log('logging out ....')
    const apiResponse = await logUserOut()
    console.log('api resp', apiResponse)

    if (apiResponse.error) {
      console.log(apiResponse)
      await setCurrentUser(null)
      await setUserLoggedIn(false)
      localStorage.removeItem("petsJWT")
      navigate('/')

    } else {

      await setCurrentUser(null)
      await setUserLoggedIn(false)
      localStorage.removeItem("petsJWT")
      navigate('/')
    }
  }
  
  let id;
  if (currentUser) {
     id = currentUser.id
  } else if (props.userId)
  {
    id = props.userId
  }
  else {
    id = null
  }

  const navLinks = [
    // Home + Job links are always displayed
    (<Link to="/" className='nav-link'><div><i className={homeIcon.className}></i></div></Link>),
    (<Link to="/jobs" className='nav-link'><div>Jobs</div></Link>),
    
    // If user is NOT logged in: show Login + Sign In links
    (!userLoggedIn && <Link to="/users/signup" className='nav-link'><div>Sign Up</div></Link>),
    (!userLoggedIn && <Link to="/users/login" className='nav-link'><div>Login</div></Link>),
    
    // If user IS logged in: show Log Out + Dashboard links
    (userLoggedIn && <Link to={id ? `/users/${id}/dashboard` : "/users/login"} className='nav-link'><div>Dashboard</div></Link>),
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
