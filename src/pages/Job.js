import React from 'react'
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import { fetchJob } from "../api/job_api"
import JobCard from '../components/JobCard'
import "./../components/Card.css"


export default function Job() {
    const params = useParams()
    const [job, setJob] = useState(null);
    const {API_URL} = useContext(LoginContext);

    useEffect(() => {
       fetchJob(params.id, params.job_id)
        .then(res => res.json())
        .then(data => {
          console.log('useEffect')
          console.log(data)
          setJob(data)})
    }, [params.id, params.job_id])
   

    // const handleDelete = () => {
    //   console.log(params)
    //   if (userLoggedIn && currentUser.id == params.id) {
    //       navigate(`/users/${params.id}/jobs/${params.job_id}/delete`)
    //   }
    // }
  

    // const handleEdit = () => {
    //     if (currentUser && currentUser.id == job.user_id)
    //     navigate(`/users/${job.user_id}/jobs/${job.id}/edit`)
    // }

    let display;

    if (job === null) {
      display = <p>Loading...</p>
    } else if (job === []) {
      display = <p>Job Not Found!</p>
    } else {
      display = <JobCard key={job.id} job={job}/>
    }

    // let buttons;

    // if (params.id && currentUser) {
    //   if (currentUser.id == params.id) {
    //    buttons = <div> <button className='btn-delete-job' onClick={handleDelete}>delete</button>
    //       <button className='btn-edit-job' onClick={handleEdit}>edit</button></div>
    // } else {
    //   buttons = <button>Apply</button>
    // }}




  return (
    <div>
    
        {display}

    </div>
  )
}
