import React from 'react'
import { LoginContext } from "../contexts/LoginContext"
import { useContext } from 'react';
import { useState, useEffect } from 'react';

import './pages.css'
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Dashboard({ verifyToken }) {
  const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

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
        <Link to="/"><div>Account settings</div></Link>
    </div>
  )
}
