import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import UserJobCard from '../components/UserJobCard'

export default function UserJobs() {

  const {currentUser, userLoggedIn, API_URL} = useContext(LoginContext);
  
  const navigate = useNavigate();
  const params = useParams()
  const [jobs, setJobs] = useState(null);


  const fetchJobs = async (id) => {
    const url = API_URL + `/users/${id}/jobs`
    return fetch(url)
  }

  useEffect(
    () => {fetchJobs(params.id)
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
