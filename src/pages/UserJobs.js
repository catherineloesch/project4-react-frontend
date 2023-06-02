import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard'

export default function UserJobs() {

    const {currentUser, setCurrentUser} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState('false');
    const navigate = useNavigate();

    const [jobs, setJobs] = useState(null);

    const params = useParams()

    useEffect(() => {
            fetchJobs(params.id)
            .then(res => res.json())
            .then(data => setJobs(data))
        }, [])

  const fetchJobs = async (id) => {
    return fetch(`http://project4-rails-api.herokuapp.com/users/${id}/jobs`)

  }

  const handleAddNewJob = () => {
      if (currentUser && userLoggedIn) {
        navigate(`/users/${params.id}/jobs/new`)
      }
        else {
            navigate('/users/login')
        }
    }

  let display;

  if (jobs === null) {
    display = <p>Loading...</p>
  } else if (jobs === []) {
    display = <p>You haven't posted any jobs yet!</p>
  } else {
    display = jobs.map(job => <JobCard key={job.id} job={job}/>)
  }

  return (
    <div>
        <h1>My Jobs:</h1>
        {display}
        <button onClick={handleAddNewJob}>Add new Job Posting</button>
    </div>
  )
}
