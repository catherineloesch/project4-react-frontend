import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import UserJobCard from '../components/UserJobCard'
import { fetchUserJobs } from '../api/job_api'
import { authenticateUser } from './../api/user_api'

export default function UserJobs() {

  const { currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn } = useContext(LoginContext);
  
  const navigate = useNavigate();
  const params = useParams()
  const [jobs, setJobs] = useState(null);

  useEffect(
    () => {
      const auth = authenticateUser()

      if (auth === true) {
          console.log('User authenticated:', auth)
      } else {
        setUserLoggedIn(false)
        setCurrentUser(null)
        navigate(`/users/login`)
      }
      
    fetchUserJobs(params.id)
    .then(res => res.json())
    .then(data => setJobs(data))}
    , [params.id])

  const handleAddNewJob = () => {
    (currentUser && userLoggedIn) ? navigate(`/users/${params.id}/jobs/new`) : navigate('/users/login')
  }

  let display;

  if (jobs === null) {
    display = <p>Loading...</p>
  } else if (jobs === []) {
    display = <p>You haven't posted any jobs yet!</p>
  } else {
    display = jobs.map(job => <UserJobCard key={job.id} job={job}/>)
  }

  return (
    <div>
        <h1>My Jobs:</h1>
        {display}
        <button className='btn btn-add-job' onClick={handleAddNewJob}>Add new Job Posting</button>
    </div>
  )
}
