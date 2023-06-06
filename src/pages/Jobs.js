import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { fetchAllJobs } from '../api/job_api';
import JobCard from '../components/JobCard'
import "./pages.css"

export default function Jobs() {
  const {currentUser, userLoggedIn, API_URL} = useContext(LoginContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(null);

  useEffect(() => {
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
    display = jobs.map(job => <JobCard key={job.id} job={job}/>)
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
