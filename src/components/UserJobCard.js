import React from 'react'
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { authenticateUser } from './../api/user_api'

import "./Card.css"

export default function UserJobCard(props) {
    const navigate = useNavigate();
    const { currentUser, userLoggedIn, setCurrentUser, setUserLoggedIn } = useContext(LoginContext);

    const handleDelete = () => {
        const auth = authenticateUser()

        if (auth === true) {
            console.log('User authenticated:', auth)
            navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/delete`)
        } else {
          setUserLoggedIn(false)
          setCurrentUser(null)
          navigate(`/users/login`)
        }  
    }
    const displayDate = (d) => {
      return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`
    }
    const displayTime = (t) => {
      return `${t.slice(11, 13)}:${t.slice(14, 16)}`
    }

    const handleEdit = () => {
        if (currentUser && currentUser.id == props.job.user_id)
        navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/edit`)
    }

  return (
    <div>
    <Link to={`/users/${props.job.user_id}/jobs/${props.job.id}`}><h3>{props.job.title}</h3></Link>
        <p>details: {props.job.description}</p>
        {props.job.location && <p>location: {props.job.location}</p>}
        {props.job.pay && <p>pay: {props.job.pay}</p>}
        {props.job.job_type && <p>type: {props.job.job_type}</p>}
        {props.job.start_date && <p>start date: {displayDate(props.job.start_date)}</p>}
        {props.job.start_time && <p>start time: {displayTime(props.job.start_time)}</p>}
        {props.job.end_date && <p>end date: {displayDate(props.job.end_date)}</p>}
        {props.job.end_time && <p>end time: {displayTime(props.job.end_time)}</p>}
        <p>job posted: {displayDate(props.job.created_at)}</p>

        <button className='btn btn-delete-job' onClick={handleDelete}>delete</button>
        <button className='btn btn-edit-job' onClick={handleEdit}>edit</button>
    </div>
  )
}
