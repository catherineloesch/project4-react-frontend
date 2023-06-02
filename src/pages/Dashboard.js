import React from 'react'
import { useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import './pages.css'

export default function Dashboard({ verifyToken }) {
  const {userLoggedIn} = useContext(LoginContext);

  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    if (!userLoggedIn) {
      navigate(`/users/login`)
    }})



  return (
    <div>
        <h1 className='page-title'>Dashboard</h1>
        <Link to={`/users/${params.id}/jobs/new`}><div>Post new job</div></Link>
        <Link to={`/users/${params.id}/jobs`}><div>View my current job listings</div></Link>
        
        <Link to={`/`}><div>Change Password</div></Link>
        <Link to={`/`}><div>Change Username</div></Link>
        <Link to={`/`}><div>Edit Profile</div></Link>
        <Link to={`/users/${params.id}/delete`}><div>Delete Account</div></Link>
        
    </div>
  )
}
