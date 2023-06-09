import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { authenticateUser } from './../api/user_api'
import { fetchJob } from "../api/job_api"
import JobCard from '../components/JobCard'
import "./../components/Card.css"


export default function Job(props) {
    const params = useParams()
    const [job, setJob] = useState(null);
    const { userLoggedIn, currentUser, setUserLoggedIn } = useContext(LoginContext);


    useEffect(() => {
      const auth = authenticateUser()
      if (auth) {
          console.log('User authenticated:', auth)
          setUserLoggedIn(true)
      } 
       fetchJob(params.job_id)
        .then(res => res.json())
        .then(data => {
          setJob(data)
          props.setUserId(params.id)
        }
          
          )
    }, [params.id, params.job_id])


    let display;

    if (job === null) {
      display = <p>Loading...</p>
    } else if (job === []) {
      display = <p>Job Not Found!</p>
    } else {
      display = <JobCard key={job.id} job={job}/>
    }

  return (
    <div className='job-page'>
      {userLoggedIn && currentUser ? <Link className='btn-all-jobs' to={`/users/${currentUser.id}/jobs`}>See all my job listings</Link> : null}
        {display}
    </div>
  )
}
