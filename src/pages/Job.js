import React from 'react'
import JobCard from '../components/JobCard'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Job() {
    const params = useParams()

    const [job, setJob] = useState(null);

    const fetchJob = async (id, job_id) => {
        return fetch(`http://project4-rails-api.herokuapp.com/users/${id}/jobs/${job_id}`)
    
    }
    useEffect(() => {
       fetchJob(params.id, params.job_id)
        .then(res => res.json())
        .then(data => setJob(data))
    }, [])
   

    let display;

    if (job === null) {
      display = <p>Loading...</p>
    } else if (job === []) {
      display = <p>Job Not Found!</p>
    } else {
      display = <JobCard key={job.id} job={job}/>
    }

  return (
    <div>
        <h1>Job</h1>
        {display}
    </div>
  )
}
