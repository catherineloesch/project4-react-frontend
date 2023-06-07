import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { fetchAllJobs } from '../api/job_api';
import { getCurrentUser, authenticateUser } from './../api/user_api'
import JobData from '../components/JobData'
import "./pages.css"

export default function Jobs(props) {
  
  const {currentUser, userLoggedIn, setCurrentUser, setUserLoggedIn  } = useContext(LoginContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState(null);

  const getUser = async() => {
    const apiResponse = await getCurrentUser()
    if (apiResponse !== null && apiResponse !== undefined) {
    setCurrentUser(apiResponse)
    setUserLoggedIn(true)
    props.setUserId(apiResponse.id)
}}

  useEffect(() => {
    const auth = authenticateUser()
     if (auth === true) {
       getUser()
      }
      
    fetchAllJobs()
    .then(res => res.json())
    .then(data => setJobs(data))
      }, [])

  const handleAddNewJob = () => {
    if (currentUser && userLoggedIn) { //valid token?
      navigate(`/users/${currentUser.id}/jobs/new`)
    } else {
        navigate('/users/login')
      }
  }

  let display;

  if (jobs === null) {
    display = <p>Loading...</p>
  } else if (jobs === []) {
    display = <p>No Jobs Found!</p>
  } else {
    display = jobs.map(job => <JobData key={job.id} job={job}/>)
  }

  return (
    <div className='jobs'>
        <section className='jobs-title-container'>
          <h1 className='browse-jobs-title'>Browse Jobs:</h1>
          <button className='btn btn-add-job' onClick={handleAddNewJob}>Add new Job Posting</button>
        </section>

        <section>
          {display}
        </section>
        

    </div>
  )
}
