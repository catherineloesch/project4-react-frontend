import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import UserJobCard from '../components/UserJobCard'
import { fetchUserJobs } from '../api/job_api'
import { authenticateUser } from './../api/user_api'
import CardGrid from '../components/CardGrid';

export default function UserJobs() {

  const { currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn } = useContext(LoginContext);
  
  const navigate = useNavigate();
  const params = useParams()
  const [jobs, setJobs] = useState(null);

  

  useEffect(
   
    () => {
      const auth = authenticateUser()
      if (auth) {
          console.log('User authenticated:', auth)
          setUserLoggedIn(true)



      } else {
        localStorage.removeItem("petsJWT")

        setUserLoggedIn(false)
        setCurrentUser(null)
        navigate(`/users/login`)
      }
      
    fetchUserJobs(params.id)
    .then(res => res.json())
    .then(data => setJobs(data))}
    , [params.id])

  const handleAddNewJob = () => {
    userLoggedIn ? navigate(`/users/${params.id}/jobs/new`) : navigate('/users/login')
  }

  let display;

  if (jobs === null) {
    display = <p>Loading...</p>
  } else if (jobs === []) {
    display = <p>You haven't posted any jobs yet!</p>
  } else {
    display = <CardGrid jobs={jobs}/>
  }

  return (
    <div className='my-jobs-page'>
      <section className='jobs-title-container'>
        <h1 className='my-jobs-title'>My Jobs Listings</h1>
        <button className='btn btn-add-job' onClick={handleAddNewJob}>Add new Job Posting</button>
      </section>
        {display}
      </div>
  )
}
