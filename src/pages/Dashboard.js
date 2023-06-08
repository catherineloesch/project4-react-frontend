import React from 'react'
import { useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { getCurrentUser, authenticateUser } from './../api/user_api'
import './pages.css'

export default function Dashboard(props) {
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
      localStorage.removeItem("petsJWT")
      setUserLoggedIn(false)
      setCurrentUser(null)
      navigate(`/users/login`)
    }

  }, [])

  let dashBoardTitleText;


  if (currentUser && currentUser.display_name) {
    dashBoardTitleText = currentUser.display_name;
  } else if (props.userName) {
    dashBoardTitleText = props.userName;
  } else {
    dashBoardTitleText = null
  }



  return (
    <div className='dashboard-page'>
        {
          dashBoardTitleText ? 
          <h1 className='page-title' id='dashboard-title'>{dashBoardTitleText}'s Dashboard</h1> : 
          <h1 className='page-title' id='dashboard-title'>Dashboard</h1>
        }

        <div className='dashboard-grid'>
          
        <img src={require('./../assets/images/dog_computer.jpg')} alt="photograph of dog with computer"  className='dog-pc-img' />

            <div className='dashboard-links'>
              <Link to={`/users/${params.id}/jobs/new`}><div>Post new job</div></Link>
              <Link to={`/users/${params.id}/jobs`}><div>View my current job posts</div></Link>
              <Link to={`/users/${params.id}/profile`}><div>View my Profile</div></Link>
              <Link to={`/users/${params.id}/edit`}><div>Edit Profile</div></Link>
              <Link to={`/users/${params.id}/delete`}><div>Delete Account</div></Link>
          </div>
        </div>
      
        
    </div>
  )
}
