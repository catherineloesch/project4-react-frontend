import React from 'react'
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { LoginContext } from "../contexts/LoginContext"
import { pawIcon, hamburgerIcon, closeIcon } from './../assets/icons'
import Nav from "./Nav";
import "./Header.css"


export default function Header() {
  const {currentUser, userLoggedIn} = useContext(LoginContext);
  const navigate = useNavigate();

   const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  return (
    <header className='header'>
      
        <div onClick={() => (navigate('/'))}>
          <h1 className='app-title'>Pawnee Pets <i className={pawIcon.className}></i></h1>
        </div>

        <div className='mobile-toggle-icons' onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}>
          <i className={showHamburgerMenu ? closeIcon.className : hamburgerIcon.className}></i>
        </div>
     
        <Nav showHamburgerMenu={showHamburgerMenu} setShowHamburgerMenu={setShowHamburgerMenu}/>

        {/*currentUser&&userLoggedIn ? <h1>welcome {currentUser.username}</h1> : <h1>Please sign in</h1>*/}

    </header>
  )
}
