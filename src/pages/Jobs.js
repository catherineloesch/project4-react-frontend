import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard'

export default function Jobs() {

    const [jobs, setJobs] = useState(null);
    const {currentUser, setCurrentUser} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState('false');
    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
            fetchAllJobs(params.id)
            .then(res => res.json())
            .then(data => setJobs(data))
        }, [])

  const fetchAllJobs = async (id) => {
    return fetch(`http://project4-rails-api.herokuapp.com/jobs`)

  }

  const handleAddNewJob = () => {
    if (currentUser && userLoggedIn) {
      console.log(currentUser)
      console.log(userLoggedIn)
      navigate(`/users/${currentUser.id}/jobs/new`)
    }
      else {
        console.log(currentUser)
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
    <div>
        <h1>Browse Jobs:</h1>
        {display}
        <button onClick={handleAddNewJob}>Add new Job Posting</button>

    </div>
  )
}
