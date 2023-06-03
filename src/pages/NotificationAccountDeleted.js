import React from 'react'
import { Link } from "react-router-dom";
import './pages.css'

export default function NotificationAccountDeleted() {

  return (
    <div className='notification-account-deleted'>

      <div className='account-deleted-img-container'>
        <img src={require('./../assets/images/dog_window.jpg')} alt="photograph of dog looking out a window" className='account-deleted-img'  />
        <img src={require('./../assets/images/dog_sad.jpg')} alt="black and white dog photograph" className='account-deleted-img'  />
      </div>

      <div className='account-deleted-text-container'>
        <p>Your account has successfully been deleted!</p>
        <Link to='/'>Home</Link>
        <Link to='/jobs'>Browse Jobs</Link>
      </div>
      
    </div>
  )
}
