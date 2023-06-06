import React from 'react'
import { useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { getCurrentUser, authenticateUser } from './../api/user_api'
import './pages.css'

export default function Dashboard({ verifyToken }) {
  const { currentUser, setCurrentUser, setUserLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();
  const params = useParams()

  const getUser = async() => {
    const apiResponse = await getCurrentUser()
    if (apiResponse !== null && apiResponse !== undefined) {
    setCurrentUser(apiResponse)
    setUserLoggedIn(true)
  }}

  useEffect(() => {
    const auth = authenticateUser()

    if (auth === true) {
        getUser()
        console.log('User authenticated:', auth)
    } else {
      setUserLoggedIn(false)
      setCurrentUser(null)
      navigate(`/users/login`)
      console.log(currentUser)
    }

  }, [])



  return (
    <div>
        {currentUser ? 
          <h1 className='page-title'>{currentUser.display_name}'s Dashboard</h1> : 
          <h1 className='page-title'>Dashboard</h1> }

        <Link to={`/users/${params.id}/jobs/new`}><div>Post new job</div></Link>
        <Link to={`/users/${params.id}/jobs`}><div>View my current job listings</div></Link>
        
        <Link to={`/`}><div>Change Password</div></Link>
        <Link to={`/`}><div>Change Username</div></Link>
        <Link to={`/`}><div>Edit Profile</div></Link>
        <Link to={`/users/${params.id}/delete`}><div>Delete Account</div></Link>
        
    </div>
  )
}
