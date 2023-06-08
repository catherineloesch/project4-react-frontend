import React from 'react'
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJob } from "../api/job_api"
import JobCard from '../components/JobCard'
import { LoginContext } from '../contexts/LoginContext';
import { Link } from "react-router-dom";

import { authenticateUser } from './../api/user_api'

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
    console.log('Is user logged in?')
    console.log(userLoggedIn)

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
      {userLoggedIn && currentUser ? <Link className='btn-all-jobs' to={`/users/${currentUser.id}/jobs`}>See all my job listings</Link> : null}
        {display}
    </div>
  )
}
