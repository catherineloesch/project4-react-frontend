import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { getCurrentUser, authenticateUser } from './../api/user_api'
import { plusIcon, profileIcon, viewIcon, editIcon, deleteIcon } from '../assets/icons';
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
      console.log('user is not authenticated')
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
            <Link to={`/users/${params.id}/jobs/new`}><span><i className={plusIcon.className}></i>&nbsp;&nbsp;Post new job </span></Link>
            <Link to={`/users/${params.id}/jobs`}><span><i className={viewIcon.className}></i>&nbsp;&nbsp; View my current job posts</span></Link>
            <Link to={`/users/${params.id}/profile`}><span><i className={profileIcon.className}></i>&nbsp;&nbsp; View my Profile</span></Link>
            <Link to={`/users/${params.id}/edit`}><span><i className={editIcon.className}></i>&nbsp;&nbsp; Edit Profile</span></Link>
            <Link to={`/users/${params.id}/delete`}><span><i className={deleteIcon.className}></i>&nbsp;&nbsp; Delete Account</span></Link>
          </div>

          <img src={require('./../assets/images/dog_computer.jpg')} alt="photograph of dog with computer"  className='dog-pc-img2' />

        </div>
      
        
    </div>
  )
}
