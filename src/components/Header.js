import React from 'react'
import { useContext } from 'react';
import { LoginContext } from "../contexts/LoginContext"
import Nav from "./Nav";
import "./Header.css"



export default function Header() {
  const {currentUser, userLoggedIn} = useContext(LoginContext);

  return (
    <div className='header'>
        <div className='title-container'>
          <span className="app-title">Pawnee Pets</span>
          <img src={require('./../assets/images/paw_yellow.png')} alt="yellow paw print" className='title-image-paw'  />
        </div>
        
        <Nav />
        {currentUser&&userLoggedIn ? <h1>welcome {currentUser.username}</h1> : <h1>Please sign in</h1>}
    </div>
  )
}
