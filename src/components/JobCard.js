
import React from 'react'
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';

import "./Card.css"

export default function JobCard(props) {
  const navigate = useNavigate();
  const params = useParams()

  const { currentUser } = useContext(LoginContext);
  const { userLoggedIn } = useContext(LoginContext);

  const handleDelete = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id) {
        navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/delete`)
    }
}

const handleEdit = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id)
    navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/edit`)
}
  let buttons;

  if (userLoggedIn && currentUser) {
    if (currentUser.id == props.job.user_id) {
    buttons = <div> <button className='btn-delete-job' onClick={handleDelete}>delete</button>
        <button className='btn-edit-job' onClick={handleEdit}>edit</button></div>
  } else {
    buttons = <button>Apply</button>
  }}

  return (
    <div>
    {params.job_id ? <h3>{props.job.title}</h3> :  <Link to={`/users/${props.job.user_id}/jobs/${props.job.id}`}><h3>{props.job.title}</h3></Link>}
   
        <p>description: {props.job.description}</p>
        <p>location: {props.job.location}</p>
        <p>pay: {props.job.pay}</p>
        <p>details: {props.job.description}</p>
        <p>type: {props.job.job_type}</p>
        <p>start date: {props.job.start_date}</p>
        <p>start time: {props.job.start_time}</p>
        <p>end date: {props.job.end_date}</p>
        <p>end time: {props.job.end_time}</p>
        <p>job posted: {props.job.created_at}</p>

        <div>{buttons}</div>
    </div>
  )
}
