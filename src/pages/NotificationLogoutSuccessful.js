import React from 'react'
import { Link } from "react-router-dom";
import { homeIcon, browseIcon } from '../assets/icons';
import './pages.css'

export default function NotificationLogoutSuccessful() {
  return (
    <div className='logout-successful-page'>
        <div className='logout-successful-grid'>
        
            <div className='logout-successful-text-container'>
                <h1>Logout Successful!</h1>
                <Link to='/'><span><i className={homeIcon.className}></i>&nbsp;&nbsp;Home </span></Link>
                <Link to='/jobs'><span><i className={browseIcon.className}></i>&nbsp;&nbsp;Browse Jobs </span></Link>
            </div>

            <img src={require('./../assets/images/dog_window.jpg')} alt="photograph of dog looking out a window" className='logout-successful-img'  />

        
        </div>
      
    </div>
  )
}
