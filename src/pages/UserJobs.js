import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import UserJobCard from '../components/UserJobCard'

export default function UserJobs() {

    const {currentUser, userLoggedIn} = useContext(LoginContext);
    const navigate = useNavigate();
    const params = useParams()
    const [jobs, setJobs] = useState(null);


    useEffect(() => {
            fetchJobs(params.id)
            .then(res => res.json())
            .then(data => setJobs(data))
        }, [])

  const fetchJobs = async (id) => {
    return fetch(`http://project4-rails-api.herokuapp.com/users/${id}/jobs`)

  }

  const handleAddNewJob = () => ((currentUser && userLoggedIn) ? navigate(`/users/${params.id}/jobs/new`) : navigate('/users/login'))



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
        <button onClick={handleAddNewJob}>Add new Job Posting</button>
    </div>
  )
}
