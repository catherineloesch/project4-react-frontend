import React from 'react'
import Nav from "./Nav";
import "./Header.css"

import { LoginContext } from "../contexts/LoginContext"
import { useContext } from 'react';

export default function Header() {
  const {currentUser, setCurrentUser} = useContext(LoginContext);
  const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

  return (
    <div className='header'>
        <h1 className="app-title">Pawnee's Pets</h1>
        <Nav />
        {currentUser&&userLoggedIn ? <h1>welcome {currentUser.username}</h1> : <h1>Please sign in</h1>}
    </div>
  )
}
