import React from 'react'
import { Link } from "react-router-dom";
import { homeIcon, browseIcon } from '../assets/icons';
import './pages.css'


export default function NotificationAccountDeleted() {

  return (
    <div className='account-deleted-page'>
      <div className='account-deleted-grid'>
          <img src={require('./../assets/images/dog_sad.jpg')} alt="black and white dog photograph" className='account-deleted-img'  />
        <div className='account-deleted-text-container'>
          <h1>Your account has successfully been deleted!</h1>
          <Link to='/'><span><i className={homeIcon.className}></i>&nbsp;&nbsp;Home </span></Link>
          <Link to='/jobs'><span><i className={browseIcon.className}></i>&nbsp;&nbsp;Browse Jobs </span></Link>
        </div>
      </div>
    </div>
  )
}
