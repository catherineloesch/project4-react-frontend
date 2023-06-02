import React from 'react'
import { Link } from "react-router-dom";

export default function NotificationAccountDeleted() {

  return (
    <div>
        <p>Your Account has successfully been deleted!</p>
        <Link to='/'>Home</Link>
        <br></br>
        <Link to='/jobs'>Browse Jobs</Link>
      
    </div>
  )
}
